import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { IrField, IrInterface, IrModel, FhirVersion } from "../ir.ts";
import type {
  StructureDefinition,
  FhirElement,
  ValueSet,
  CodeSystem,
  ValueSetInclude,
} from "../fhir-sd.ts";
import { fhirTypeToTs, isFhirPrimitive, choiceFieldName, capitalize } from "./types.ts";

// ---------------------------------------------------------------------------
// Enum resolution
// ---------------------------------------------------------------------------

/** Recursively collect codes from a CodeSystem concept tree */
function collectCodes(concepts: CodeSystem["concept"]): string[] {
  if (!concepts) return [];
  const codes: string[] = [];
  for (const c of concepts) {
    if (c.code) codes.push(c.code);
    if (c.concept) codes.push(...collectCodes(c.concept));
  }
  return codes;
}

export class EnumRegistry {
  private valueSets = new Map<string, string[]>();
  private codeSystems = new Map<string, string[]>();

  loadValueSet(vs: ValueSet): void {
    if (!vs.url) return;
    const codes = this.resolveValueSetCodes(vs);
    // Store under the canonical URL (without version)
    const url = vs.url.replace(/\|.*$/, "");
    this.valueSets.set(url, codes);
  }

  loadCodeSystem(cs: CodeSystem): void {
    if (!cs.url) return;
    this.codeSystems.set(cs.url, collectCodes(cs.concept));
  }

  private resolveValueSetCodes(vs: ValueSet): string[] {
    // Prefer expansion if available
    if (vs.expansion?.contains) {
      return vs.expansion.contains.map((c) => c.code).filter((c): c is string => !!c);
    }
    // Otherwise use compose.include
    const codes: string[] = [];
    for (const inc of vs.compose?.include ?? []) {
      codes.push(...this.codesFromInclude(inc));
    }
    return codes;
  }

  private codesFromInclude(inc: ValueSetInclude): string[] {
    if (inc.concept?.length) {
      return inc.concept.map((c) => c.code).filter(Boolean) as string[];
    }
    if (inc.system) {
      const cs = this.codeSystems.get(inc.system);
      if (cs) return cs;
    }
    return [];
  }

  /** Returns inline TS union type string for a ValueSet URL, or undefined */
  getEnumType(valueSetUrl: string): string | undefined {
    const url = valueSetUrl.replace(/\|.*$/, "");
    const codes = this.valueSets.get(url);
    if (!codes?.length) return undefined;
    return codes.map((c) => `'${c}'`).join("|");
  }
}

// ---------------------------------------------------------------------------
// Element tree processing
// ---------------------------------------------------------------------------

/** Returns the parent path of an element path */
function parentPath(path: string): string {
  return path.split(".").slice(0, -1).join(".");
}

/** Returns true if the element is a direct child of the given parent path */
function isDirectChild(element: FhirElement, ofPath: string): boolean {
  const parent = parentPath(element.path);
  // Handle choice types: the [x] suffix means the path is like Parent.field[x]
  return parent === ofPath;
}

/** Strips the [x] suffix from a choice element path */
function stripChoiceSuffix(path: string): string {
  return path.replace(/\[x\]$/, "");
}

/**
 * Returns the TS interface name for a BackboneElement given the parent
 * interface name and the field name.
 * e.g. parent='Patient', field='contact' → 'PatientContact'
 *      parent='PatientContact', field='name' → 'PatientContactName'  (hypothetical)
 */
function backboneInterfaceName(parentName: string, fieldName: string): string {
  return parentName + capitalize(fieldName);
}

/**
 * Converts a contentReference path (e.g. "Questionnaire.item") to the
 * TypeScript interface name that would have been generated for it.
 * e.g. "Questionnaire.item"  → "QuestionnaireItem"
 *      "Bundle.link"         → "BundleLink"
 *      "ClaimResponse.item.adjudication" → "ClaimResponseItemAdjudication"
 */
function contentReferenceToTypeName(refPath: string): string {
  return refPath.split(".").map(capitalize).join("");
}

/** Normalize text for dedup comparison: trim and strip trailing period */
function normalizeText(s: string): string {
  return s.trim().replace(/\.$/, "");
}

/** Build description string from element */
function elementDescription(el: FhirElement): string | undefined {
  const parts: string[] = [];
  if (el.short) parts.push(el.short);
  if (el.definition && normalizeText(el.definition) !== normalizeText(el.short ?? "")) {
    parts.push(el.definition);
  }
  if (el.comment) parts.push(el.comment);
  return parts.length ? parts.join("\n") : undefined;
}

/**
 * Process a set of elements at a given depth, building IrFields for the current
 * interface and recursively creating sub-interfaces for BackboneElements.
 *
 * @param interfaceName  The name of the interface we are currently building
 * @param elements       All snapshot elements (the full flat list)
 * @param parentPath_    The path prefix of the current interface's elements
 * @param enumRegistry   For resolving required bindings to inline enum types
 * @param allInterfaces  Accumulates all interfaces (appended recursively)
 */
function processLevel(
  interfaceName: string,
  elements: FhirElement[],
  parentPath_: string,
  enumRegistry: EnumRegistry,
  allInterfaces: IrInterface[],
): IrField[] {
  const directChildren = elements.filter((el) => isDirectChild(el, parentPath_));
  const fields: IrField[] = [];

  for (const el of directChildren) {
    const rawFieldName = el.path.split(".").at(-1) ?? "";
    const isChoice = rawFieldName.endsWith("[x]");
    const required = (el.min ?? 0) > 0;
    const isArray = el.max === "*";

    // ContentReference (e.g. "contentReference": "#Questionnaire.item") — reference to another
    // element's backbone type. The type name is derived from the referenced path's interface name.
    if (el.contentReference) {
      // #Questionnaire.item → QuestionnaireItem (parent interface name + PascalCase segment)
      const refPath = el.contentReference.replace(/^#/, "");
      const refTypeName = contentReferenceToTypeName(refPath);
      const fieldName = rawFieldName;
      fields.push({
        name: fieldName,
        tsType: refTypeName,
        required,
        isArray,
        description: elementDescription(el),
        hasPrimitiveExtension: false,
        isLazy: true, // always wrap in z.lazy() — may be self-referential
      });
      continue;
    }

    const types = el.type ?? [];

    // BackboneElement — hoist into a separate interface
    if (types.some((t) => t.code === "BackboneElement" || t.code === "Element") && !isChoice) {
      // Only treat as backbone if it has actual children in the snapshot
      const fieldName = rawFieldName;
      const subName = backboneInterfaceName(interfaceName, fieldName);
      const subFields = processLevel(subName, elements, el.path, enumRegistry, allInterfaces);

      // Only create a sub-interface if there are actual children
      // (avoid hoisting abstract placeholders)
      if (subFields.length > 0) {
        allInterfaces.push({
          name: subName,
          extends: "BackboneElement",
          fields: subFields,
          description: elementDescription(el),
        });
        fields.push({
          name: fieldName,
          tsType: subName,
          required,
          isArray,
          description: elementDescription(el),
          hasPrimitiveExtension: false,
        });
        continue;
      }
      // Fall through if no children
    }

    // Choice type: value[x] with multiple type codes → expand to valueBoolean, valueString, etc.
    if (isChoice) {
      const base = stripChoiceSuffix(rawFieldName);
      for (const t of types) {
        const code = t.code;
        const isPrim = isFhirPrimitive(code);
        const expandedName = choiceFieldName(base, code);
        const tsType = resolveType(t.code, el.binding, enumRegistry);
        fields.push({
          name: expandedName,
          tsType,
          required: false, // choice fields are always optional
          isArray: false, // choice fields are never arrays themselves
          description: elementDescription(el),
          hasPrimitiveExtension: isPrim,
        });
      }
      continue;
    }

    // Normal single-type field
    if (types.length === 0) {
      // FHIR R2 uses empty type arrays for recursive backbone references.
      // If the last segment of this element's path matches the last segment
      // of the parent path, it's a recursive self-reference.
      const lastSegment = el.path.split(".").at(-1) ?? "";
      const parentLastSegment = parentPath_.split(".").at(-1) ?? "";
      if (lastSegment === parentLastSegment) {
        const fieldName = rawFieldName;
        fields.push({
          name: fieldName,
          tsType: interfaceName,
          required,
          isArray,
          description: elementDescription(el),
          hasPrimitiveExtension: false,
          isLazy: true,
        });
      }
      // Otherwise no type info — skip
      continue;
    }

    const fieldName = rawFieldName;

    // Most elements have a single type, but some have multiple (union)
    let tsType: string;
    if (types.length === 1) {
      tsType = resolveType(types[0]?.code, el.binding, enumRegistry);
    } else {
      tsType = types.map((t) => resolveType(t.code, el.binding, enumRegistry)).join(" | ");
    }

    const isPrim = types.length === 1 && isFhirPrimitive(types[0]?.code);

    fields.push({
      name: fieldName,
      tsType,
      required,
      isArray,
      description: elementDescription(el),
      hasPrimitiveExtension: isPrim,
    });
  }

  return fields;
}

/**
 * Resolves a FHIR type code to a TypeScript type string.
 * If a required binding is present, substitutes the inline enum union type.
 */
function resolveType(
  code: string,
  binding: FhirElement["binding"],
  enumRegistry: EnumRegistry,
): string {
  // For required bindings on code/string fields, try to inline the enum
  if (
    binding &&
    binding.strength === "required" &&
    binding.valueSet &&
    (code === "code" || code === "string" || code === "uri")
  ) {
    const enumType = enumRegistry.getEnumType(binding.valueSet);
    if (enumType) return `(${enumType})`;
  }
  return fhirTypeToTs(code);
}

// ---------------------------------------------------------------------------
// Public parse function
// ---------------------------------------------------------------------------

/** Strip UTF-8 BOM if present (common in R2 packages) */
function stripBom(s: string): string {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

/**
 * Load all FHIR JSON resources from a package directory and build an IrModel.
 */
export async function parsePackageDir(packageDir: string, version: FhirVersion): Promise<IrModel> {
  const files = await readdir(packageDir);
  const enumRegistry = new EnumRegistry();

  // First pass (a): collect file names by category
  const codeSystemFiles: string[] = [];
  const valueSetFiles: string[] = [];
  const sdFiles: string[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    if (file.startsWith("CodeSystem-")) codeSystemFiles.push(file);
    else if (file.startsWith("ValueSet-")) valueSetFiles.push(file);
    else if (file.startsWith("StructureDefinition-")) sdFiles.push(file);
  }

  // First pass (b): load CodeSystems before ValueSets so that ValueSets that
  // compose all codes from a system (no explicit concept list) can resolve.
  for (const file of codeSystemFiles) {
    try {
      const raw = stripBom(await readFile(join(packageDir, file), "utf8"));
      const cs = JSON.parse(raw) as CodeSystem;
      if (cs.resourceType === "CodeSystem") enumRegistry.loadCodeSystem(cs);
    } catch {
      /* skip malformed */
    }
  }
  for (const file of valueSetFiles) {
    try {
      const raw = stripBom(await readFile(join(packageDir, file), "utf8"));
      const vs = JSON.parse(raw) as ValueSet;
      if (vs.resourceType === "ValueSet") enumRegistry.loadValueSet(vs);
    } catch {
      /* skip malformed */
    }
  }

  // Second pass: parse StructureDefinitions
  const interfaces: IrInterface[] = [];

  for (const file of sdFiles) {
    const filePath = join(packageDir, file);
    try {
      const raw = stripBom(await readFile(filePath, "utf8"));
      const sd = JSON.parse(raw) as StructureDefinition;

      if (sd.resourceType !== "StructureDefinition") continue;
      // Skip profiles/constraints, but allow canonical FHIR core constraint types
      // (e.g. SimpleQuantity, MoneyQuantity) which have a canonical base spec URL.
      // - R3+: skip if derivation === 'constraint' AND URL is non-canonical
      // - R2: constrainedType is set AND URL is non-canonical (profiles/IGs have
      //   hyphens or lowercase starts). Canonical quantity specialisations like
      //   Age, Count, SimpleQuantity have constrainedType but are base FHIR types.
      if (
        sd.derivation === "constraint" &&
        !/^http:\/\/hl7\.org\/fhir\/StructureDefinition\/[A-Z][A-Za-z0-9]*$/.test(sd.url ?? "")
      )
        continue;
      if (
        sd.constrainedType &&
        !/^http:\/\/hl7\.org\/fhir\/StructureDefinition\/[A-Z][A-Za-z0-9]*$/.test(sd.url ?? "")
      )
        continue;
      // Only process type hierarchy kinds (R2 uses 'datatype' instead of 'complex-type')
      if (!["primitive-type", "complex-type", "resource", "datatype"].includes(sd.kind)) continue;
      if (!sd.differential?.element?.length) continue;

      const iface = parseStructureDefinition(sd, enumRegistry);
      if (iface) interfaces.push(...iface);
    } catch {
      /* skip malformed */
    }
  }

  return { version, interfaces };
}

/**
 * Parse a single StructureDefinition into one or more IrInterfaces
 * (the main interface plus any BackboneElement sub-interfaces).
 */
function parseStructureDefinition(
  sd: StructureDefinition,
  enumRegistry: EnumRegistry,
): IrInterface[] | null {
  const elements = sd.differential?.element;
  if (!elements?.length) return null;

  // The first element may be the root (e.g. "Patient") — skip it if so
  const firstNonRoot = elements[0]?.path.includes(".") ? elements : elements.slice(1);
  const rootPath = sd.name;

  const name = sd.name;

  // Determine the base interface name (R2 uses `base`, R3+ uses `baseDefinition`)
  let baseInterface: string | undefined;
  const baseDefUrl = sd.baseDefinition ?? sd.base;
  if (baseDefUrl) {
    const base = baseDefUrl.split("/").at(-1) ?? "";
    if (base !== name) baseInterface = base;
  }

  const allInterfaces: IrInterface[] = [];

  const fields = processLevel(name, firstNonRoot, rootPath, enumRegistry, allInterfaces);

  // Add `readonly resourceType: 'Name'` for resources (kind === 'resource' and not abstract)
  if (sd.kind === "resource" && !sd.abstract) {
    fields.unshift({
      name: "resourceType",
      tsType: `'${name}'`,
      required: true,
      isArray: false,
      hasPrimitiveExtension: false,
      readonly: true,
      description: "Resource Type Name (for serialization)",
    });
  }

  const mainInterface: IrInterface = {
    name,
    extends: baseInterface,
    fields,
    description: sd.description,
    isPrimitive:
      sd.kind === "primitive-type" ||
      // R2 uses 'datatype' kind for what R3+ calls 'primitive-type' (boolean, string, etc.)
      (sd.kind === "datatype" && /^[a-z]/.test(sd.name)),
    isResource: sd.kind === "resource" && !sd.abstract,
  };

  return [mainInterface, ...allInterfaces];
}
