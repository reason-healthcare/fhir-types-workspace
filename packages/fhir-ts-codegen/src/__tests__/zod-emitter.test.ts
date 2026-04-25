import { describe, it, expect } from "bun:test";
import * as zodLib from "zod";
import { emitZod } from "../emitter/zod.ts";
import type { IrModel, IrField } from "../ir.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Return the line number (1-based) where `text` first appears in `src`. */
function lineOf(src: string, text: string): number {
  const idx = src.indexOf(text);
  if (idx === -1) return -1;
  return src.slice(0, idx).split("\n").length;
}

/** Collect every forward reference in the output: SchemaName used before its
 *  `export const SchemaName` declaration line, excluding z.lazy() bodies. */
function forwardRefs(src: string): string[] {
  const lines = src.split("\n");

  // Map schema name → declaration line (1-based)
  const declared = new Map<string, number>();
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i]?.match(/^export const (\w+Schema)/);
    if (m?.[1]) declared.set(m[1], i + 1);
  }

  // Walk lines; skip lines that are inside z.lazy() (they start with leading spaces
  // and the enclosing const is annotated with z.lazy).
  let inLazy = false;
  const seen = new Set<string>();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    if (/= z\.lazy\(/.test(line)) {
      inLazy = true;
    }
    if (inLazy && /^\)$/.test(line.trim())) {
      inLazy = false;
      continue;
    }
    if (inLazy) continue;

    for (const use of line.matchAll(/\b(\w+Schema)\b/g)) {
      const name = use[1] as string;
      const declLine = declared.get(name);
      if (declLine && declLine > i + 1 && !seen.has(name)) {
        seen.add(name);
      }
    }
  }
  return [...seen];
}

/**
 * Evaluate a generated Zod module string and return all exported schema consts.
 * Strips imports, export type aliases, type annotations, and export modifiers
 * so the code runs inside `new Function("z", ...)`.
 */
function execModule(src: string): Record<string, unknown> {
  const code = src
    .replace(/^import \{ z \} from 'zod'\n?/gm, "")
    .replace(/^export type [^\n]+\n/gm, "")
    .replace(/: z\.ZodType<[^>]+>/g, "")
    // Remove multi-line export interface blocks
    .replace(/export interface \w[^\n]*\n(?: {2}[^\n]*\n)*\}\n/g, "")
    .replace(/^export /gm, "");
  const constNames = [...code.matchAll(/^const (\w+)/gm)].map((m) => m[1] as string);
  const body = `${code}\nreturn { ${constNames.join(", ")} };`;
  return new Function("z", body)(zodLib.z) as Record<string, unknown>;
}

/** Build a minimal single-field IrModel for field expression tests. */
function fieldModel(
  tsType: string,
  opts: Partial<IrField> = {},
  extraInterfaces: IrModel["interfaces"] = [],
): IrModel {
  return {
    version: "r4",
    interfaces: [
      {
        name: "Foo",
        fields: [
          {
            name: "field",
            tsType,
            required: opts.required ?? false,
            isArray: opts.isArray ?? false,
            hasPrimitiveExtension: opts.hasPrimitiveExtension ?? false,
            isLazy: opts.isLazy,
          },
        ],
      },
      ...extraInterfaces,
    ],
  };
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

/** Minimal model: primitive type with hasPrimitiveExtension listed AFTER a
 *  type that references it — exercises the Element TDZ bug. */
const primitiveExtensionModel: IrModel = {
  version: "r4",
  interfaces: [
    {
      name: "Patient",
      fields: [
        {
          name: "birthDate",
          tsType: "string",
          required: false,
          isArray: false,
          hasPrimitiveExtension: true, // emits _birthDate: ElementSchema.optional()
        },
      ],
    },
    // Element declared AFTER Patient — triggers TDZ without the fix
    {
      name: "Element",
      fields: [
        {
          name: "id",
          tsType: "string",
          required: false,
          isArray: false,
          hasPrimitiveExtension: false,
        },
      ],
    },
  ],
};

/** Minimal model: Child extends Parent, but Parent is listed AFTER Child —
 *  exercises the iface.extends TDZ bug. */
const extendsModel: IrModel = {
  version: "r4",
  interfaces: [
    {
      name: "Coding",
      extends: "Element", // SchemaName.extend({}) — not lazy
      fields: [
        {
          name: "code",
          tsType: "string",
          required: false,
          isArray: false,
          hasPrimitiveExtension: false,
        },
      ],
    },
    // Element declared AFTER Coding — triggers TDZ without the fix
    {
      name: "Element",
      fields: [
        {
          name: "id",
          tsType: "string",
          required: false,
          isArray: false,
          hasPrimitiveExtension: false,
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("zod emitter — topoSort forward references", () => {
  it("emits ElementSchema before any type with hasPrimitiveExtension fields", () => {
    const output = emitZod(primitiveExtensionModel);

    const elementLine = lineOf(output, "export const ElementSchema");
    const patientLine = lineOf(output, "export const PatientSchema");
    const firstUse = lineOf(output, "ElementSchema");

    expect(elementLine).toBeGreaterThan(0);
    expect(elementLine).toBeLessThan(patientLine);
    expect(firstUse).toBeGreaterThanOrEqual(elementLine);
  });

  it("emits a base type before any type that extends it", () => {
    const output = emitZod(extendsModel);

    const elementLine = lineOf(output, "export const ElementSchema");
    const codingLine = lineOf(output, "export const CodingSchema");

    expect(elementLine).toBeGreaterThan(0);
    expect(elementLine).toBeLessThan(codingLine);
  });

  it("produces no forward references in a combined extends + primitiveExtension model", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        // DomainResource extends Resource; Patient extends DomainResource
        // All listed in reverse dependency order to maximally stress the sort
        {
          name: "Patient",
          extends: "DomainResource",
          fields: [
            {
              name: "birthDate",
              tsType: "string",
              required: false,
              isArray: false,
              hasPrimitiveExtension: true,
            },
          ],
        },
        {
          name: "DomainResource",
          extends: "Resource",
          fields: [],
        },
        {
          name: "Resource",
          fields: [
            {
              name: "id",
              tsType: "string",
              required: false,
              isArray: false,
              hasPrimitiveExtension: true,
            },
          ],
        },
        {
          name: "Element",
          fields: [
            {
              name: "id",
              tsType: "string",
              required: false,
              isArray: false,
              hasPrimitiveExtension: false,
            },
          ],
        },
      ],
    };

    expect(forwardRefs(emitZod(model))).toEqual([]);
  });

  it("Reference↔Identifier mutual cycle: Identifier.assigner is force-lazy, Reference.identifier is not", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        { name: "Element", fields: [] },
        {
          name: "Reference",
          extends: "Element",
          fields: [
            {
              name: "identifier",
              tsType: "Identifier",
              required: false,
              isArray: false,
              hasPrimitiveExtension: false,
            },
          ],
        },
        {
          name: "Identifier",
          extends: "Element",
          fields: [
            {
              name: "assigner",
              tsType: "Reference",
              required: false,
              isArray: false,
              hasPrimitiveExtension: false,
            },
          ],
        },
      ],
    };
    const output = emitZod(model);
    // Identifier.assigner is force-lazy (Reference visited first, visits Identifier, sees Reference in stack)
    expect(output).toContain("  assigner: z.lazy(() => ReferenceSchema).optional(),");
    // Reference.identifier is NOT force-lazy — IdentifierSchema already declared before ReferenceSchema
    expect(output).toContain("  identifier: IdentifierSchema.optional(),");
  });

  it("Element↔Extension cycle: extension field on Element is force-lazy", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        {
          name: "Element",
          fields: [
            {
              name: "extension",
              tsType: "Extension",
              required: false,
              isArray: true,
              hasPrimitiveExtension: false,
            },
          ],
        },
        {
          name: "Extension",
          extends: "Element",
          fields: [],
        },
      ],
    };
    expect(emitZod(model)).toContain(
      "  extension: z.lazy(() => z.array(ExtensionSchema)).optional(),",
    );
  });

  it("isLazy contentReference: QuestionnaireItem uses lazyTargets path, not forceLazy", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        {
          name: "QuestionnaireItem",
          fields: [
            {
              name: "item",
              tsType: "QuestionnaireItem",
              required: false,
              isArray: true,
              hasPrimitiveExtension: false,
              isLazy: true,
            },
          ],
        },
      ],
    };
    const output = emitZod(model);
    // isLazy → lazyTargets path → z.ZodType annotation
    expect(output).toContain("z.ZodType<QuestionnaireItem>");
    // The item field is wrapped via isLazy (not forceLazy)
    expect(output).toContain("  item: z.lazy(() => z.array(QuestionnaireItemSchema)).optional(),");
  });

  it("multi-level extends chain (A extends B extends C) in reverse input order: no forward refs", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        {
          name: "C",
          extends: "B",
          fields: [
            {
              name: "c",
              tsType: "string",
              required: false,
              isArray: false,
              hasPrimitiveExtension: false,
            },
          ],
        },
        {
          name: "B",
          extends: "A",
          fields: [
            {
              name: "b",
              tsType: "string",
              required: false,
              isArray: false,
              hasPrimitiveExtension: false,
            },
          ],
        },
        {
          name: "A",
          fields: [
            {
              name: "a",
              tsType: "string",
              required: false,
              isArray: false,
              hasPrimitiveExtension: false,
            },
          ],
        },
      ],
    };
    const output = emitZod(model);
    const aLine = lineOf(output, "export const ASchema");
    const bLine = lineOf(output, "export const BSchema");
    const cLine = lineOf(output, "export const CSchema");
    expect(aLine).toBeLessThan(bLine);
    expect(bLine).toBeLessThan(cLine);
    expect(forwardRefs(output)).toEqual([]);
  });
});

describe("field expression mapping", () => {
  it("primitive field → z.string().optional()", () => {
    expect(emitZod(fieldModel("string"))).toContain("  field: z.string().optional(),");
  });

  it("required field → z.string() with no .optional()", () => {
    expect(emitZod(fieldModel("string", { required: true }))).toContain("  field: z.string(),");
  });

  it("boolean field → z.boolean().optional()", () => {
    expect(emitZod(fieldModel("boolean"))).toContain("  field: z.boolean().optional(),");
  });

  it("number field → z.number().optional()", () => {
    expect(emitZod(fieldModel("number"))).toContain("  field: z.number().optional(),");
  });

  it("inline enum field → z.enum([...])", () => {
    expect(emitZod(fieldModel("('a'|'b'|'c')"))).toContain(
      "  field: z.enum(['a', 'b', 'c']).optional(),",
    );
  });

  it("required enum field → z.enum([...]) with no .optional()", () => {
    expect(emitZod(fieldModel("('a'|'b'|'c')", { required: true }))).toContain(
      "  field: z.enum(['a', 'b', 'c']),",
    );
  });

  it("literal field (resourceType: 'Patient') → z.literal('Patient')", () => {
    expect(emitZod(fieldModel("'Patient'", { required: true }))).toContain(
      "  field: z.literal('Patient'),",
    );
  });

  it("complex type reference → CodingSchema.optional()", () => {
    const model = fieldModel("Coding", {}, [{ name: "Coding", fields: [] }]);
    expect(emitZod(model)).toContain("  field: CodingSchema.optional(),");
  });

  it("required complex type → CodingSchema with no .optional()", () => {
    const model = fieldModel("Coding", { required: true }, [{ name: "Coding", fields: [] }]);
    expect(emitZod(model)).toContain("  field: CodingSchema,");
  });

  it("array of primitives → z.array(z.string()).optional()", () => {
    expect(emitZod(fieldModel("string", { isArray: true }))).toContain(
      "  field: z.array(z.string()).optional(),",
    );
  });

  it("array of complex type → z.array(CodingSchema).optional()", () => {
    const model = fieldModel("Coding", { isArray: true }, [{ name: "Coding", fields: [] }]);
    expect(emitZod(model)).toContain("  field: z.array(CodingSchema).optional(),");
  });

  it("isLazy field → z.lazy(() => ItemSchema).optional()", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        {
          name: "Item",
          fields: [
            {
              name: "item",
              tsType: "Item",
              required: false,
              isArray: false,
              hasPrimitiveExtension: false,
              isLazy: true,
            },
          ],
        },
      ],
    };
    expect(emitZod(model)).toContain("  item: z.lazy(() => ItemSchema).optional(),");
  });

  it("isLazy array field → z.lazy(() => z.array(ItemSchema)).optional()", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        {
          name: "Item",
          fields: [
            {
              name: "item",
              tsType: "Item",
              required: false,
              isArray: true,
              hasPrimitiveExtension: false,
              isLazy: true,
            },
          ],
        },
      ],
    };
    expect(emitZod(model)).toContain("  item: z.lazy(() => z.array(ItemSchema)).optional(),");
  });
});

describe("hasPrimitiveExtension", () => {
  it("string field with hasPrimitiveExtension → emits field AND _field: ElementSchema.optional()", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        { name: "Element", fields: [] },
        {
          name: "Patient",
          fields: [
            {
              name: "birthDate",
              tsType: "string",
              required: false,
              isArray: false,
              hasPrimitiveExtension: true,
            },
          ],
        },
      ],
    };
    const output = emitZod(model);
    expect(output).toContain("  birthDate: z.string().optional(),");
    expect(output).toContain("  _birthDate: ElementSchema.optional(),");
  });

  it("Element._id (self-reference) → force-lazy: z.lazy(() => ElementSchema).optional()", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        {
          name: "Element",
          fields: [
            {
              name: "id",
              tsType: "string",
              required: false,
              isArray: false,
              hasPrimitiveExtension: true,
            },
          ],
        },
      ],
    };
    expect(emitZod(model)).toContain("  _id: z.lazy(() => ElementSchema).optional(),");
  });

  it("Non-Element type._field → _field: ElementSchema.optional() (not lazy)", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        { name: "Element", fields: [] },
        {
          name: "Patient",
          fields: [
            {
              name: "name",
              tsType: "string",
              required: false,
              isArray: false,
              hasPrimitiveExtension: true,
            },
          ],
        },
      ],
    };
    const output = emitZod(model);
    expect(output).toContain("  _name: ElementSchema.optional(),");
    expect(output).not.toContain("  _name: z.lazy(");
  });
});

describe("extends / base type", () => {
  it("type with extends whose base is in the model → generates BaseSchema.extend({", () => {
    const output = emitZod(extendsModel);
    expect(output).toContain("export const CodingSchema = ElementSchema.extend({");
  });

  it("type without extends → generates z.object({", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [{ name: "Foo", fields: [] }],
    };
    expect(emitZod(model)).toContain("export const FooSchema = z.object({");
  });

  it("type with extends whose base is NOT in the model → generates z.object({", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [{ name: "Child", extends: "UnknownBase", fields: [] }],
    };
    expect(emitZod(model)).toContain("export const ChildSchema = z.object({");
    expect(emitZod(model)).not.toContain("UnknownBaseSchema");
  });
});

describe("JSDoc description", () => {
  it("iface with description → emits /** ... */ block before schema", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [{ name: "Foo", description: "A test type for Foo", fields: [] }],
    };
    const output = emitZod(model);
    expect(output).toContain("/**");
    expect(output).toContain(" * A test type for Foo");
    expect(lineOf(output, "/**")).toBeLessThan(lineOf(output, "export const FooSchema"));
  });

  it("iface without description → no JSDoc block", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [{ name: "Foo", fields: [] }],
    };
    expect(emitZod(model)).not.toContain("/**");
  });
});

describe("lazyTargets — z.ZodType<T> path", () => {
  it("type with isLazy field pointing to it → emits export interface T { and z.ZodType<T> = z.lazy(() =>", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        {
          name: "Item",
          fields: [
            {
              name: "item",
              tsType: "Item",
              required: false,
              isArray: true,
              hasPrimitiveExtension: false,
              isLazy: true,
            },
          ],
        },
      ],
    };
    const output = emitZod(model);
    expect(output).toContain("export interface Item {");
    expect(output).toContain("z.ZodType<Item> = z.lazy(() =>");
  });

  it("lazyTargets type still uses BaseSchema.extend inside lazy when base is in the model", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        { name: "Base", fields: [] },
        {
          name: "Child",
          extends: "Base",
          fields: [
            {
              name: "child",
              tsType: "Child",
              required: false,
              isArray: true,
              hasPrimitiveExtension: false,
              isLazy: true,
            },
          ],
        },
      ],
    };
    const output = emitZod(model);
    expect(output).toContain("z.ZodType<Child> = z.lazy(() =>");
    expect(output).toContain("  BaseSchema.extend({");
  });

  it("export type T = z.infer<...> is NOT emitted for lazyTargets types", () => {
    const model: IrModel = {
      version: "r4",
      interfaces: [
        {
          name: "Item",
          fields: [
            {
              name: "item",
              tsType: "Item",
              required: false,
              isArray: true,
              hasPrimitiveExtension: false,
              isLazy: true,
            },
          ],
        },
      ],
    };
    expect(emitZod(model)).not.toContain("export type Item = z.infer<typeof ItemSchema>");
  });
});

describe("runtime — Zod parsing", () => {
  // Shared model that exercises all runtime test scenarios:
  // Element↔Extension cycle, Coding, Reference↔Identifier mutual cycle,
  // Narrative enum, Patient literal, QuestionnaireItem isLazy self-ref.
  const MODEL: IrModel = {
    version: "r4",
    interfaces: [
      {
        name: "Element",
        fields: [
          {
            name: "id",
            tsType: "string",
            required: false,
            isArray: false,
            hasPrimitiveExtension: true,
          },
          {
            name: "extension",
            tsType: "Extension",
            required: false,
            isArray: true,
            hasPrimitiveExtension: false,
          },
        ],
      },
      {
        name: "Extension",
        extends: "Element",
        fields: [
          {
            name: "url",
            tsType: "string",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
        ],
      },
      {
        name: "Coding",
        extends: "Element",
        fields: [
          {
            name: "code",
            tsType: "string",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
          {
            name: "display",
            tsType: "string",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
        ],
      },
      {
        name: "Narrative",
        extends: "Element",
        fields: [
          {
            name: "status",
            tsType: "('generated'|'extensions'|'additional'|'empty')",
            required: true,
            isArray: false,
            hasPrimitiveExtension: false,
          },
          {
            name: "div",
            tsType: "string",
            required: true,
            isArray: false,
            hasPrimitiveExtension: false,
          },
        ],
      },
      {
        name: "Reference",
        extends: "Element",
        fields: [
          {
            name: "reference",
            tsType: "string",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
          {
            name: "identifier",
            tsType: "Identifier",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
        ],
      },
      {
        name: "Identifier",
        extends: "Element",
        fields: [
          {
            name: "system",
            tsType: "string",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
          {
            name: "assigner",
            tsType: "Reference",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
        ],
      },
      {
        name: "Patient",
        extends: "Element",
        fields: [
          {
            name: "resourceType",
            tsType: "'Patient'",
            required: true,
            isArray: false,
            hasPrimitiveExtension: false,
          },
          {
            name: "birthDate",
            tsType: "string",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
        ],
      },
      {
        name: "QuestionnaireItem",
        fields: [
          {
            name: "linkId",
            tsType: "string",
            required: true,
            isArray: false,
            hasPrimitiveExtension: false,
          },
          {
            name: "item",
            tsType: "QuestionnaireItem",
            required: false,
            isArray: true,
            hasPrimitiveExtension: false,
            isLazy: true,
          },
        ],
      },
    ],
  };

  let mod: Record<string, unknown>;

  // Build the module once for all runtime tests
  mod = execModule(emitZod(MODEL));

  it("parse valid Patient → succeeds", () => {
    const PatientSchema = mod.PatientSchema as { safeParse: (v: unknown) => { success: boolean } };
    const result = PatientSchema.safeParse({ resourceType: "Patient", birthDate: "1990-01-01" });
    expect(result.success).toBe(true);
  });

  it("parse Patient with missing optional birthDate → succeeds", () => {
    const PatientSchema = mod.PatientSchema as { safeParse: (v: unknown) => { success: boolean } };
    const result = PatientSchema.safeParse({ resourceType: "Patient" });
    expect(result.success).toBe(true);
  });

  it("parse Narrative with invalid enum status → ZodError thrown", () => {
    const NarrativeSchema = mod.NarrativeSchema as {
      safeParse: (v: unknown) => { success: boolean; error?: { issues: unknown[] } };
    };
    const result = NarrativeSchema.safeParse({ status: "invalid", div: "<div/>" });
    expect(result.success).toBe(false);
    expect(result.error?.issues.length).toBeGreaterThan(0);
  });

  it("parse Coding with all fields → all fields present in result", () => {
    const CodingSchema = mod.CodingSchema as {
      safeParse: (v: unknown) => { success: boolean; data?: Record<string, unknown> };
    };
    const result = CodingSchema.safeParse({ code: "abc", display: "ABC" });
    expect(result.success).toBe(true);
    expect(result.data?.code).toBe("abc");
    expect(result.data?.display).toBe("ABC");
  });

  it("parse Element with _id (self-ref force-lazy) → succeeds, no TDZ crash", () => {
    const ElementSchema = mod.ElementSchema as {
      safeParse: (v: unknown) => { success: boolean };
    };
    const result = ElementSchema.safeParse({ id: "e1", _id: { id: "e2" } });
    expect(result.success).toBe(true);
  });

  it("parse Coding (extends Element) → Element fields inherited, succeeds", () => {
    const CodingSchema = mod.CodingSchema as {
      safeParse: (v: unknown) => { success: boolean; data?: Record<string, unknown> };
    };
    const result = CodingSchema.safeParse({ id: "c1", code: "abc" });
    expect(result.success).toBe(true);
    expect(result.data?.id).toBe("c1");
    expect(result.data?.code).toBe("abc");
  });

  it("parse Reference with identifier (force-lazy mutual cycle) → succeeds, no TDZ crash", () => {
    const ReferenceSchema = mod.ReferenceSchema as {
      safeParse: (v: unknown) => { success: boolean };
    };
    const result = ReferenceSchema.safeParse({
      reference: "Patient/1",
      identifier: { system: "http://example.com", assigner: { reference: "Org/1" } },
    });
    expect(result.success).toBe(true);
  });

  it("parse QuestionnaireItem with nested items (isLazy self-ref) → succeeds", () => {
    const QuestionnaireItemSchema = mod.QuestionnaireItemSchema as {
      safeParse: (v: unknown) => { success: boolean };
    };
    const result = QuestionnaireItemSchema.safeParse({
      linkId: "q1",
      item: [{ linkId: "q1.1", item: [{ linkId: "q1.1.1" }] }],
    });
    expect(result.success).toBe(true);
  });
});
