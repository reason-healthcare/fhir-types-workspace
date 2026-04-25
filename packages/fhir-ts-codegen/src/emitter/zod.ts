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
  function extendsInStack(typeName: string, stack: Set<string>): boolean {
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
        if (stack.has(field.tsType) || extendsInStack(field.tsType, stack)) {
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
// Lazy-target set: schemas that need explicit z.ZodType<T> annotation
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
function buildLazySet(interfaces: IrInterface[]): Set<string> {
  const lazy = new Set<string>();
  for (const iface of interfaces) {
    for (const field of iface.fields) {
      if (field.isLazy) lazy.add(field.tsType);
    }
  }
  return lazy;
}

// ---------------------------------------------------------------------------
// Field rendering
// ---------------------------------------------------------------------------

function renderZodField(field: IrField, forceLazyField?: boolean): string {
  const lazy = field.isLazy || forceLazyField;
  let zodExpr = tsTypeToZod(field.tsType, lazy);

  if (field.isArray) {
    if (lazy) {
      // z.lazy(() => Schema) already wraps the inner schema; wrap array outside lazy
      zodExpr = `z.lazy(() => z.array(${tsTypeToZod(field.tsType)}))`;
    } else {
      zodExpr = `z.array(${zodExpr})`;
    }
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
function renderSchema(
  iface: IrInterface,
  lazyTargets: Set<string>,
  allNames: Set<string>,
  forceLazy: Set<string>,
): string {
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

  /** Render the primitive-extension shadow field for a given field name. */
  const renderPrimExt = (fieldName: string) => {
    const key = `${iface.name}._${fieldName}`;
    if (forceLazy.has(key)) {
      return `  _${fieldName}: z.lazy(() => ElementSchema).optional(),`;
    }
    return `  _${fieldName}: ElementSchema.optional(),`;
  };

  if (needsTypeAnnotation) {
    // Emit a TypeScript interface declaration so we can annotate the schema type.
    // The extends keyword is preserved at the TypeScript level.
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

    // Schema with explicit type annotation, wrapped in z.lazy.
    // Preserve extends at the Zod level too when applicable.
    const extZod =
      iface.extends && allNames.has(iface.extends)
        ? `${iface.extends}Schema.extend`
        : null;

    lines.push(`export const ${schemaName}: z.ZodType<${iface.name}> = z.lazy(() =>`);
    if (extZod) {
      lines.push(`  ${extZod}({`);
    } else {
      lines.push("  z.object({");
    }
    for (const field of iface.fields) {
      const fieldKey = `${iface.name}.${field.name}`;
      lines.push(`  ${renderZodField(field, forceLazy.has(fieldKey))}`);
      if (field.hasPrimitiveExtension) {
        lines.push(`    ${renderPrimExt(field.name)}`);
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
      const fieldKey = `${iface.name}.${field.name}`;
      lines.push(renderZodField(field, forceLazy.has(fieldKey)));
      if (field.hasPrimitiveExtension) {
        lines.push(renderPrimExt(field.name));
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

  const { sorted, forceLazy } = topoSort(model.interfaces);
  const lazyTargets = buildLazySet(model.interfaces);
  const allNames = new Set(model.interfaces.map((i) => i.name));

  for (const iface of sorted) {
    parts.push(renderSchema(iface, lazyTargets, allNames, forceLazy));
    parts.push("");
  }

  // Remove trailing blank line
  while (parts[parts.length - 1] === "") parts.pop();

  return `${parts.join("\n")}\n`;
}
