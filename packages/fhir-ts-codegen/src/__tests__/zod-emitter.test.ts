import { describe, it, expect } from "bun:test";
import { emitZod } from "../emitter/zod.ts";
import type { IrModel } from "../ir.ts";

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
    if (/= z\.lazy\(/.test(line)) { inLazy = true; }
    if (inLazy && /^\)$/.test(line.trim())) { inLazy = false; continue; }
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
        { name: "id", tsType: "string", required: false, isArray: false, hasPrimitiveExtension: false },
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
        { name: "code", tsType: "string", required: false, isArray: false, hasPrimitiveExtension: false },
      ],
    },
    // Element declared AFTER Coding — triggers TDZ without the fix
    {
      name: "Element",
      fields: [
        { name: "id", tsType: "string", required: false, isArray: false, hasPrimitiveExtension: false },
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
            { name: "birthDate", tsType: "string", required: false, isArray: false, hasPrimitiveExtension: true },
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
            { name: "id", tsType: "string", required: false, isArray: false, hasPrimitiveExtension: true },
          ],
        },
        {
          name: "Element",
          fields: [
            { name: "id", tsType: "string", required: false, isArray: false, hasPrimitiveExtension: false },
          ],
        },
      ],
    };

    expect(forwardRefs(emitZod(model))).toEqual([]);
  });
});
