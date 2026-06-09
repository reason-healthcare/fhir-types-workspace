import { describe, it, expect } from "bun:test";
import { emitTypeScript } from "../emitter/typescript.ts";
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

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("typescript emitter — Bundle/BundleEntry generics", () => {
  const baseModel: IrModel = {
    version: "r4",
    interfaces: [
      {
        name: "Resource",
        fields: [
          {
            name: "resourceType",
            tsType: "string",
            required: true,
            isArray: false,
            hasPrimitiveExtension: false,
            readonly: true,
          },
        ],
      },
      {
        name: "Patient",
        extends: "Resource",
        fields: [
          {
            name: "resourceType",
            tsType: "'Patient'",
            required: true,
            isArray: false,
            hasPrimitiveExtension: false,
            readonly: true,
          },
        ],
      },
      {
        name: "BundleEntry",
        extends: "BackboneElement",
        fields: [
          {
            name: "resource",
            tsType: "Resource",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
          {
            name: "fullUrl",
            tsType: "string",
            required: false,
            isArray: false,
            hasPrimitiveExtension: false,
          },
        ],
      },
      {
        name: "Bundle",
        extends: "Resource",
        fields: [
          {
            name: "resourceType",
            tsType: "'Bundle'",
            required: true,
            isArray: false,
            hasPrimitiveExtension: false,
            readonly: true,
          },
          {
            name: "entry",
            tsType: "BundleEntry",
            required: false,
            isArray: true,
            hasPrimitiveExtension: false,
          },
        ],
      },
      {
        name: "BackboneElement",
        fields: [],
      },
    ],
  };

  const output = emitTypeScript(baseModel, "fhir4");

  it("Bundle interface has generic type parameter", () => {
    expect(output).toContain(
      "export interface Bundle\u003cT extends Resource = Resource\u003e extends Resource {",
    );
  });

  it("BundleEntry interface has generic type parameter", () => {
    expect(output).toContain(
      "export interface BundleEntry\u003cT extends Resource = Resource\u003e extends BackboneElement {",
    );
  });

  it("Bundle.entry is typed as BundleEntry\u003cT\u003e[]", () => {
    expect(output).toContain("  entry?: BundleEntry\u003cT\u003e[] | undefined;");
  });

  it("BundleEntry.resource is typed as T (generic)", () => {
    expect(output).toContain("  resource?: T | undefined;");
  });

  it("other BundleEntry fields are unchanged", () => {
    expect(output).toContain("  fullUrl?: string | undefined;");
  });

  it("other interfaces remain non-generic", () => {
    expect(output).toContain("export interface Patient extends Resource {");
    expect(output).not.toContain("export interface Patient\u003c");
  });

  it("plain Bundle is assignable (default generic parameter)", () => {
    // compile-time only; verify the default is present in the text
    expect(
      lineOf(
        output,
        "export interface Bundle\u003cT extends Resource = Resource\u003e extends Resource {",
      ),
    ).toBeGreaterThan(0);
  });
});
