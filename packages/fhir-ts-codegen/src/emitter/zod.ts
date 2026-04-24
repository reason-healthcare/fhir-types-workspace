import type { IrModel, IrInterface, IrField } from "../ir.ts";

// ---------------------------------------------------------------------------
// Type mapping: IR tsType → Zod expression
// ---------------------------------------------------------------------------

const PRIMITIVE_ZOD: Record<string, string> = {
  string: "z.string()",
  number: "z.number()",
  boolean: "z.boolean()",
};

/**
 * Convert an IR tsType string to a Zod schema expression.
 * Inline enum types like `('male'|'female'|'other'|'unknown')` are converted
 * to `z.enum([...])`.
 */
function tsTypeToZod(tsType: string, isLazy?: boolean): string {
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

  // Complex type reference — wrap in z.lazy() if flagged or always for complex types
  const schemaName = `${tsType}Schema`;
  if (isLazy) {
    return `z.lazy(() => ${schemaName})`;
  }
  return schemaName;
}

// ---------------------------------------------------------------------------
// Circular / lazy reference detection
// ---------------------------------------------------------------------------

/**
 * Determines which interface names are referenced lazily (i.e., require
 * `z.lazy()` at the definition site of the *referencing* schema).
 *
 * Additionally, any schema that is referenced before it is defined in emit
 * order must also use z.lazy(). We use a topological pass to find these.
 */
function buildLazySet(interfaces: IrInterface[]): Set<string> {
  const lazy = new Set<string>();
  for (const iface of interfaces) {
    for (const field of iface.fields) {
      if (field.isLazy) lazy.add(field.tsType);
    }
  }
  return lazy;
}

/**
 * Returns a topologically sorted list of interface names, so schemas that
 * are depended-upon come before schemas that depend on them.
 * Cycles (contentReference) are broken by the z.lazy() wrapping.
 */
function topoSort(interfaces: IrInterface[]): IrInterface[] {
  const nameToIface = new Map<string, IrInterface>();
  for (const iface of interfaces) nameToIface.set(iface.name, iface);

  const visited = new Set<string>();
  const result: IrInterface[] = [];

  function visit(name: string, stack: Set<string>) {
    if (visited.has(name)) return;
    if (stack.has(name)) return; // cycle — broken by z.lazy()
    const iface = nameToIface.get(name);
    if (!iface) return;

    stack.add(name);
    for (const field of iface.fields) {
      if (!field.isLazy && field.tsType && !(field.tsType in PRIMITIVE_ZOD)) {
        // Strip array/optional wrappers — tsType is already just the name
        visit(field.tsType, stack);
      }
    }
    stack.delete(name);
    visited.add(name);
    result.push(iface);
  }

  for (const iface of interfaces) visit(iface.name, new Set());
  return result;
}

// ---------------------------------------------------------------------------
// Field rendering
// ---------------------------------------------------------------------------

function renderZodField(field: IrField): string {
  let zodExpr = tsTypeToZod(field.tsType, field.isLazy);

  if (field.isArray) {
    zodExpr = `z.array(${zodExpr})`;
  }

  if (!field.required) {
    zodExpr = `${zodExpr}.optional()`;
  }

  return `  ${field.name}: ${zodExpr},`;
}

// ---------------------------------------------------------------------------
// Interface rendering
// ---------------------------------------------------------------------------

/**
 * Determines if a schema needs to be declared with an explicit TypeScript type
 * annotation (required when the schema name appears in a z.lazy() somewhere,
 * because TypeScript can't infer the type of a recursive z.lazy() call).
 */
function renderSchema(iface: IrInterface, lazyTargets: Set<string>, allNames: Set<string>): string {
  const lines: string[] = [];
  const schemaName = `${iface.name}Schema`;
  const needsTypeAnnotation = lazyTargets.has(iface.name);

  // JSDoc
  if (iface.description) {
    const desc = iface.description.split("\n").filter(Boolean).slice(0, 3);
    lines.push("/**");
    lines.push(...desc.map((l) => ` * ${l}`));
    lines.push(" */");
  }

  // For schemas that need explicit type annotation (lazy targets), we emit:
  //   export interface IfaceName { ... }   (TypeScript interface for the annotation)
  //   export const IfaceNameSchema: z.ZodType<IfaceName> = z.lazy(() => z.object({...}))
  if (needsTypeAnnotation) {
    // Emit a TypeScript interface declaration so we can annotate the schema type
    const ext = iface.extends ? ` extends ${iface.extends}` : "";
    lines.push(`export interface ${iface.name}${ext} {`);
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
    // Schema with explicit type annotation, wrapped in z.lazy
    lines.push(`export const ${schemaName}: z.ZodType<${iface.name}> = z.lazy(() =>`);
    lines.push("  z.object({");
    for (const field of iface.fields) {
      lines.push(`  ${renderZodField(field)}`);
      // Shadow field for primitives
      if (field.hasPrimitiveExtension) {
        lines.push(`    _${field.name}: ElementSchema.optional(),`);
      }
    }
    lines.push("  })");
    lines.push(")");
  } else {
    // Normal non-lazy schema
    const ext =
      iface.extends && allNames.has(iface.extends) ? `${iface.extends}Schema.extend` : null;

    if (ext) {
      lines.push(`export const ${schemaName} = ${ext}({`);
    } else {
      lines.push(`export const ${schemaName} = z.object({`);
    }
    for (const field of iface.fields) {
      lines.push(renderZodField(field));
      if (field.hasPrimitiveExtension) {
        lines.push(`  _${field.name}: ElementSchema.optional(),`);
      }
    }
    lines.push("})");
    lines.push(`export type ${iface.name} = z.infer<typeof ${schemaName}>`);
  }

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
  const parts: string[] = [];

  parts.push(`import { z } from 'zod'`);
  parts.push("");

  const sorted = topoSort(model.interfaces);
  const lazyTargets = buildLazySet(model.interfaces);
  const allNames = new Set(model.interfaces.map((i) => i.name));

  for (const iface of sorted) {
    parts.push(renderSchema(iface, lazyTargets, allNames));
    parts.push("");
  }

  // Remove trailing blank line
  while (parts[parts.length - 1] === "") parts.pop();

  return `${parts.join("\n")}\n`;
}
