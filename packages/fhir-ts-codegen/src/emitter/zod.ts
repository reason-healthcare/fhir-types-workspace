import type { IrModel, IrInterface } from "../ir.ts";

// ---------------------------------------------------------------------------
// Type mapping: IR tsType → bare Zod expression (no array/optional wrapping)
// ---------------------------------------------------------------------------

const PRIMITIVE_ZOD: Record<string, string> = {
  string: "z.string()",
  number: "z.number()",
  boolean: "z.boolean()",
};

/**
 * Convert an IR tsType string to a bare Zod schema expression.
 * Inline enum types like `('male'|'female'|'other'|'unknown')` are converted
 * to `z.enum([...])`.
 */
function zodAtom(tsType: string, lazy?: boolean): string {
  // Inline enum: ('a'|'b'|'c')
  const enumMatch = tsType.match(/^\(([^)]+)\)$/);
  if (enumMatch) {
    const values = enumMatch[1]?.split("|").map((v) => v.trim());
    return `z.enum([${values.join(", ")}])`;
  }

  // Literal type: 'Patient'
  if (tsType.startsWith("'") && tsType.endsWith("'")) {
    return `z.literal(${tsType})`;
  }

  // TypeScript primitives
  if (tsType in PRIMITIVE_ZOD) return PRIMITIVE_ZOD[tsType] as string;

  // Complex type reference
  const schemaName = `${tsType}Schema`;
  if (lazy) return `z.lazy(() => ${schemaName})`;
  return schemaName;
}

// ---------------------------------------------------------------------------
// Topological sort with force-lazy cycle detection
// ---------------------------------------------------------------------------

/**
 * Topologically sort interfaces so dependencies come before dependents.
 *
 * Two kinds of edges:
 *   - HARD: A extends B → B must come before A (cannot be lazy)
 *   - SOFT: A has non-lazy field of type B → B should come before A,
 *           but can be deferred with z.lazy() when a cycle exists.
 *
 * When a soft field edge would create a cycle (the field type is in the
 * DFS stack, or transitively extends something in the stack), the field
 * is added to `forceLazy` and excluded from sort consideration so the
 * hard extends edges always win.
 *
 * Returns: sorted interfaces + set of "TypeName.fieldName" (or
 * "TypeName._fieldName" for hasPrimitiveExtension) entries that must
 * be rendered with z.lazy().
 */
function topoSort(interfaces: IrInterface[]): {
  sorted: IrInterface[];
  forceLazy: Set<string>;
} {
  const nameToIface = new Map<string, IrInterface>();
  for (const iface of interfaces) nameToIface.set(iface.name, iface);

  const visited = new Set<string>();
  const result: IrInterface[] = [];
  const forceLazy = new Set<string>();

  /**
   * Returns true if typeName's extends chain (recursively) hits a name
   * currently in the DFS stack. This means visiting typeName as a non-lazy
   * field dep would cause typeName to sort before one of its own base types.
   */
  function ancestorInStack(typeName: string, stack: Set<string>): boolean {
    let current = nameToIface.get(typeName)?.extends;
    const seen = new Set<string>();
    while (current && !seen.has(current)) {
      if (stack.has(current)) return true;
      seen.add(current);
      current = nameToIface.get(current)?.extends;
    }
    return false;
  }

  function visit(name: string, stack: Set<string>) {
    if (visited.has(name)) return;
    if (stack.has(name)) return; // genuine extends cycle — shouldn't happen in valid FHIR
    const iface = nameToIface.get(name);
    if (!iface) return;

    stack.add(name);

    // HARD dependency: visit base type first.
    // ExtendedSchema.extend({}) is not lazy — base MUST be sorted first.
    if (iface.extends) visit(iface.extends, stack);

    for (const field of iface.fields) {
      if (!field.isLazy && field.tsType && !(field.tsType in PRIMITIVE_ZOD)) {
        if (stack.has(field.tsType) || ancestorInStack(field.tsType, stack)) {
          // Soft field edge would violate a hard extends constraint → defer via lazy.
          forceLazy.add(`${name}.${field.name}`);
        } else {
          visit(field.tsType, stack);
        }
      }

      if (field.hasPrimitiveExtension) {
        // Emits `_field: ElementSchema.optional()`.
        // If we are Element, or Element is already in the stack, this is a
        // self/cycle reference → defer via lazy.
        if (name === "Element" || stack.has("Element")) {
          forceLazy.add(`${name}._${field.name}`);
        } else {
          visit("Element", stack);
        }
      }
    }

    stack.delete(name);
    visited.add(name);
    result.push(iface);
  }

  for (const iface of interfaces) visit(iface.name, new Set());
  return { sorted: result, forceLazy };
}

// ---------------------------------------------------------------------------
// Lazy-target set: schemas that need z.ZodType<T> = z.lazy(() => ...) wrapping
// ---------------------------------------------------------------------------

/**
 * Builds the set of interface names whose schema declarations must be wrapped
 * in `z.ZodType<T> = z.lazy(() => ...)` because they are referenced via an
 * IR `isLazy: true` field (contentReference, R2 self-references, etc.).
 *
 * NOTE: Self-referential force-lazy fields (e.g. Element._id: ElementSchema)
 * are handled by the force-lazy rendering path — they do NOT add the type to
 * lazyTargets, because wrapping the schema in `z.ZodType<T> = z.lazy(…)`
 * turns it into a ZodLazy which loses the `.extend()` method needed by all
 * derived FHIR types.
 */
function buildLazyTargets(interfaces: IrInterface[]): Set<string> {
  const lazy = new Set<string>();
  for (const iface of interfaces) {
    for (const field of iface.fields) {
      if (field.isLazy) lazy.add(field.tsType);
    }
  }
  return lazy;
}

// ---------------------------------------------------------------------------
// Force-annotated set: schemas with force-lazy fields that need z.ZodType<T>
// ---------------------------------------------------------------------------

/**
 * Builds the set of interface names that have at least one force-lazy field.
 * These schemas participate in a soft-dep cycle (detected by topoSort) and
 * therefore cause TypeScript TS7022 ("implicitly has type 'any' because it
 * does not have a type annotation and is referenced in its own initializer")
 * if left unannotated.
 *
 * Fix: emit `export interface T` + `z.ZodType<T>` annotation, breaking the
 * inference cycle at the annotation boundary.
 */
function buildForceAnnotated(interfaces: IrInterface[], forceLazy: Set<string>): Set<string> {
  const annotated = new Set<string>();
  for (const iface of interfaces) {
    const hasForce = iface.fields.some(
      (f) =>
        forceLazy.has(`${iface.name}.${f.name}`) ||
        (f.hasPrimitiveExtension && forceLazy.has(`${iface.name}._${f.name}`)),
    );
    if (hasForce) annotated.add(iface.name);
  }
  return annotated;
}

/**
 * Returns the subset of forceAnnotated schema names that are used as `.extend()`
 * bases by other schemas.  These need a private `_TBase` ZodObject const so
 * derived schemas can still call `.extend()` (z.ZodType<T> doesn't have it).
 */
function buildUsedAsBases(interfaces: IrInterface[], forceAnnotated: Set<string>): Set<string> {
  const bases = new Set<string>();
  for (const iface of interfaces) {
    if (iface.extends && forceAnnotated.has(iface.extends)) {
      bases.add(iface.extends);
    }
  }
  return bases;
}

// ---------------------------------------------------------------------------
// ZodObject<Shape> annotation string for private base consts
// ---------------------------------------------------------------------------

/**
 * Map an IR field to its TypeScript Zod *annotation* type string (used in
 * the explicit `z.ZodObject<{…}>` annotation on private `_TBase` consts).
 *
 * Force-lazy fields become `z.ZodTypeAny` / `z.ZodArray<z.ZodTypeAny>` — this
 * is intentionally imprecise because the goal is only to break the TS7022
 * inference cycle, not to fully re-type the schema.  Consumers get accurate
 * types via the exported `interface T` declaration.
 */
function zodAnnotationType(
  tsType: string,
  opts: { isArray: boolean; required: boolean; lazy: boolean },
): string {
  const { isArray, required, lazy } = opts;

  let atom: string;
  if (lazy) {
    atom = isArray ? "z.ZodArray<z.ZodTypeAny>" : "z.ZodTypeAny";
  } else {
    const enumMatch = tsType.match(/^\(([^)]+)\)$/);
    if (enumMatch) {
      const values = enumMatch[1]?.split("|").map((v) => v.trim());
      atom = `z.ZodEnum<[${values.join(", ")}]>`;
    } else if (tsType.startsWith("'") && tsType.endsWith("'")) {
      atom = `z.ZodLiteral<${tsType}>`;
    } else if (tsType === "string") {
      atom = "z.ZodString";
    } else if (tsType === "boolean") {
      atom = "z.ZodBoolean";
    } else if (tsType === "number") {
      atom = "z.ZodNumber";
    } else {
      // Non-lazy complex type: use ZodTypeAny to avoid pulling in potentially
      // unannotated forward references into the shape annotation.
      atom = isArray ? "z.ZodArray<z.ZodTypeAny>" : "z.ZodTypeAny";
    }
    if (!lazy && !isArray && atom !== "z.ZodTypeAny") {
      // isArray already handled above for the non-lazy path
    }
  }

  return required ? atom : `z.ZodOptional<${atom}>`;
}

/**
 * Returns per-field Zod type annotation lines for a single IrInterface's
 * OWN fields (does not include inherited fields).
 */
function ownFieldAnnotationLines(iface: IrInterface, forceLazy: Set<string>): string[] {
  const lines: string[] = [];
  for (const field of iface.fields) {
    const isLazy = field.isLazy === true || forceLazy.has(`${iface.name}.${field.name}`);
    const annType = zodAnnotationType(field.tsType, {
      isArray: field.isArray,
      required: field.required,
      lazy: isLazy,
    });
    lines.push(`  ${field.name}: ${annType};`);
    if (field.hasPrimitiveExtension) {
      lines.push(`  _${field.name}: z.ZodOptional<z.ZodTypeAny>;`);
    }
  }
  return lines;
}

/**
 * Recursively collect field annotation lines from the full inheritance chain
 * (parent fields first, own fields last).  Only walks up through schemas that
 * are in usedAsBases — these are the only ones that have a private `_Base`
 * const whose shape we need to describe.
 */
function mergedFieldAnnotationLines(
  iface: IrInterface,
  forceLazy: Set<string>,
  nameToIface: Map<string, IrInterface>,
  usedAsBases: Set<string>,
): string[] {
  const lines: string[] = [];
  if (iface.extends && usedAsBases.has(iface.extends)) {
    const parent = nameToIface.get(iface.extends);
    if (parent) {
      lines.push(...mergedFieldAnnotationLines(parent, forceLazy, nameToIface, usedAsBases));
    }
  }
  lines.push(...ownFieldAnnotationLines(iface, forceLazy));
  return lines;
}

/** Build the `z.ZodObject<{ … }>` annotation string for a private `_Base` const.
 *  Includes all fields from the full inheritance chain so the annotation
 *  exactly matches the value returned by `_ParentBase.extend({…})`. */
function zodObjectShapeStr(
  iface: IrInterface,
  forceLazy: Set<string>,
  nameToIface: Map<string, IrInterface>,
  usedAsBases: Set<string>,
): string {
  const fieldLines = mergedFieldAnnotationLines(iface, forceLazy, nameToIface, usedAsBases);
  return `z.ZodObject<{\n${fieldLines.join("\n")}\n}>`;
}

// ---------------------------------------------------------------------------
// Field rendering
// ---------------------------------------------------------------------------

/**
 * Render a single Zod field line at 2-space indent.
 * Takes primitives (not IrField) to keep it pure and testable.
 */
function renderField(
  name: string,
  tsType: string,
  opts: { isArray: boolean; required: boolean; lazy: boolean },
): string {
  const { isArray, required, lazy } = opts;
  let expr: string;
  if (isArray) {
    // ZodLazy<ZodArray<T>> and ZodArray<ZodTypeAny> don't overlap sufficiently
    // for a direct `as` cast (TS2352).  The double cast through `unknown` is
    // always valid and provides TypeScript with a concrete type without needing
    // to evaluate the lazy target — breaking the TS7022 inference chain when
    // used alongside the explicit ZodObject<Shape> annotation on _TBase consts.
    expr = lazy
      ? `(z.lazy(() => z.array(${zodAtom(tsType)})) as unknown as z.ZodArray<z.ZodTypeAny>)`
      : `z.array(${zodAtom(tsType)})`;
  } else {
    // ZodLazy<T> extends ZodType which extends ZodTypeAny, so a direct `as`
    // cast is valid (no TS2352).
    expr = lazy ? `(z.lazy(() => ${zodAtom(tsType)}) as z.ZodTypeAny)` : zodAtom(tsType, false);
  }
  if (!required) expr = `${expr}.optional()`;
  return `  ${name}: ${expr},`;
}

/**
 * Render all schema body lines for an interface at 2-space indent.
 * Includes both field lines and hasPrimitiveExtension shadow lines.
 */
function renderSchemaFields(iface: IrInterface, forceLazy: Set<string>): string[] {
  const lines: string[] = [];
  for (const field of iface.fields) {
    const fieldKey = `${iface.name}.${field.name}`;
    const lazy = field.isLazy === true || forceLazy.has(fieldKey);
    lines.push(
      renderField(field.name, field.tsType, {
        isArray: field.isArray,
        required: field.required,
        lazy,
      }),
    );
    if (field.hasPrimitiveExtension) {
      const extKey = `${iface.name}._${field.name}`;
      if (forceLazy.has(extKey)) {
        lines.push(`  _${field.name}: (z.lazy(() => ElementSchema) as z.ZodTypeAny).optional(),`);
      } else {
        lines.push(`  _${field.name}: ElementSchema.optional(),`);
      }
    }
  }
  return lines;
}

// ---------------------------------------------------------------------------
// Interface rendering
// ---------------------------------------------------------------------------

interface RenderContext {
  lazyTargets: Set<string>;
  allNames: Set<string>;
  forceLazy: Set<string>;
  forceAnnotated: Set<string>;
  usedAsBases: Set<string>;
  nameToIface: Map<string, IrInterface>;
}

/**
 * Return the `.extend()` expression for `iface`'s base, taking into account
 * whether the base is a force-annotated schema that has a private `_Base`
 * const (in which case we must use `_BaseBase.extend` rather than
 * `BaseSchema.extend` because `z.ZodType<T>` doesn't expose `.extend()`).
 */
function extendExpr(iface: IrInterface, ctx: RenderContext): string | null {
  const { allNames, usedAsBases } = ctx;
  if (!iface.extends || !allNames.has(iface.extends)) return null;
  if (usedAsBases.has(iface.extends)) return `_${iface.extends}Base.extend`;
  return `${iface.extends}Schema.extend`;
}

function renderSchema(iface: IrInterface, ctx: RenderContext): string {
  const { lazyTargets, forceLazy, forceAnnotated, usedAsBases, nameToIface } = ctx;
  const lines: string[] = [];
  const schemaName = `${iface.name}Schema`;

  // JSDoc
  if (iface.description) {
    const desc = iface.description.split("\n").filter(Boolean).slice(0, 3);
    lines.push("/**");
    lines.push(...desc.map((l) => ` * ${l}`));
    lines.push(" */");
  }

  const fieldLines = renderSchemaFields(iface, forceLazy);
  const ext = extendExpr(iface, ctx);

  // ── Path 1: isLazy (contentReference / R2 self-ref) ──────────────────────
  // Wrapped in z.lazy() so the whole schema is ZodLazy<T>, which is fine for
  // schemas that are never used as `.extend()` bases (backbone sub-elements).
  if (lazyTargets.has(iface.name)) {
    const ifaceExt = iface.extends ? ` extends ${iface.extends}` : "";
    lines.push(`export interface ${iface.name}${ifaceExt} {`);
    for (const field of iface.fields) {
      const opt = field.required ? "" : "?";
      const arrSuffix = field.isArray ? "[]" : "";
      const nullSuffix = field.required ? "" : " | undefined";
      lines.push(`  ${field.name}${opt}: ${field.tsType}${arrSuffix}${nullSuffix}`);
      if (field.hasPrimitiveExtension) {
        lines.push(`  _${field.name}?: Element | undefined`);
      }
    }
    lines.push("}");
    lines.push("");

    lines.push(`export const ${schemaName}: z.ZodType<${iface.name}> = z.lazy(() =>`);
    if (ext) {
      lines.push(`  ${ext}({`);
    } else {
      lines.push("  z.object({");
    }
    for (const fl of fieldLines) {
      lines.push(`  ${fl}`);
    }
    lines.push("  })");
    lines.push(")");
    return lines.join("\n");
  }

  // ── Path 2: force-annotated (has force-lazy fields → TS7022 risk) ────────
  // The standard Zod recursive-schema pattern: emit `export interface T` so
  // TypeScript has a concrete type, then annotate the schema const with
  // `z.ZodType<T>` to break the circular-initializer inference chain.
  //
  // For schemas that serve as `.extend()` bases (usedAsBases), we additionally
  // emit a private `_TBase` ZodObject const.  Derived schemas call
  // `_TBase.extend({…})` instead of `TSchema.extend({…})` because
  // `z.ZodType<T>` doesn't expose `.extend()`.
  //
  // When the private base's own initializer would also form a cycle (detected
  // by privateBaseNeedsAnnotation), we add an explicit `z.ZodObject<Shape>`
  // annotation to the private base to break that inner cycle too.
  if (forceAnnotated.has(iface.name)) {
    // 1. TypeScript interface declaration — accurate consumer types.
    const ifaceExt = iface.extends ? ` extends ${iface.extends}` : "";
    lines.push(`export interface ${iface.name}${ifaceExt} {`);
    for (const field of iface.fields) {
      const opt = field.required ? "" : "?";
      const arrSuffix = field.isArray ? "[]" : "";
      const nullSuffix = field.required ? "" : " | undefined";
      lines.push(`  ${field.name}${opt}: ${field.tsType}${arrSuffix}${nullSuffix}`);
      if (field.hasPrimitiveExtension) {
        lines.push(`  _${field.name}?: Element | undefined`);
      }
    }
    lines.push("}");
    lines.push("");

    if (usedAsBases.has(iface.name)) {
      // 2a. Private ZodObject base for .extend() chaining.
      // Always annotate with the full merged shape (own fields + all inherited
      // fields from usedAsBases ancestors) so that TypeScript can stop at this
      // annotation boundary and not trace through the initialiser into cycles.
      const baseName = `_${iface.name}Base`;
      const annStr = zodObjectShapeStr(iface, forceLazy, nameToIface, usedAsBases);

      if (ext) {
        lines.push(`const ${baseName}: ${annStr} = ${ext}({`);
      } else {
        lines.push(`const ${baseName}: ${annStr} = z.object({`);
      }
      for (const fl of fieldLines) lines.push(fl);
      lines.push("})");
      lines.push("");

      // 3a. Public annotated schema — breaks TS7022 for dependents.
      lines.push(`export const ${schemaName}: z.ZodType<${iface.name}> = ${baseName}`);
    } else {
      // 2b. No private base needed — annotate the schema directly.
      if (ext) {
        lines.push(`export const ${schemaName}: z.ZodType<${iface.name}> = ${ext}({`);
      } else {
        lines.push(`export const ${schemaName}: z.ZodType<${iface.name}> = z.object({`);
      }
      for (const fl of fieldLines) lines.push(fl);
      lines.push("})");
    }
    // No `export type T = z.infer<…>` — the interface above already provides T.
    return lines.join("\n");
  }

  // ── Path 3: normal schema ────────────────────────────────────────────────
  if (ext) {
    lines.push(`export const ${schemaName} = ${ext}({`);
  } else {
    lines.push(`export const ${schemaName} = z.object({`);
  }
  for (const fl of fieldLines) {
    lines.push(fl);
  }
  lines.push("})");
  lines.push(`export type ${iface.name} = z.infer<typeof ${schemaName}>`);

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Public emit function
// ---------------------------------------------------------------------------

/**
 * Emit a complete Zod schema module from an IrModel.
 *
 * Output is a `.ts` file that imports `zod` and exports one schema constant
 * per FHIR type along with an inferred TypeScript type alias.
 */
export function emitZod(model: IrModel): string {
  const { sorted, forceLazy } = topoSort(model.interfaces);
  const lazyTargets = buildLazyTargets(model.interfaces);
  const forceAnnotated = buildForceAnnotated(model.interfaces, forceLazy);
  const usedAsBases = buildUsedAsBases(model.interfaces, forceAnnotated);
  const allNames = new Set(model.interfaces.map((i) => i.name));

  const ctx: RenderContext = {
    lazyTargets,
    allNames,
    forceLazy,
    forceAnnotated,
    usedAsBases,
    nameToIface: new Map(model.interfaces.map((i) => [i.name, i])),
  };

  const parts = [
    `import { z } from 'zod'`,
    // Skip FHIR primitive-type StructureDefinitions (boolean, string, integer, …).
    // Their names clash with TypeScript built-ins (TS2457) and they are never
    // referenced as schema types — resource fields use z.string() / z.boolean()
    // directly via PRIMITIVE_ZOD. This mirrors the behaviour of emitTypeScript.
    ...sorted.filter((iface) => !iface.isPrimitive).map((iface) => renderSchema(iface, ctx)),
  ];

  return `${parts.join("\n\n")}\n`;
}
