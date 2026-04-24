// Public library exports for @rh/fhir-ts-codegen
export type { IrField, IrInterface, IrModel, FhirVersion } from "./ir.ts";
export type { EmitType, GenerateOptions } from "./generate/index.ts";
export type { VersionRef } from "./generate/index-file.ts";

/** Config entry for one FHIR package → output file */
export interface GenerateConfigEntry {
  packageId: string;
  packageVersion: string;
  fhirVersion: import("./ir.ts").FhirVersion;
  emit: import("./generate/index.ts").EmitType;
  outFile: string;
  /** Required when emit=typescript */
  namespace?: string;
  /** Optional test file output path (typescript emit only) */
  testOutFile?: string;
  /**
   * FHIR package ID for example JSON files used in test generation.
   * Use this when examples are published as a separate FHIR npm package
   * (e.g. `hl7.fhir.r4.examples`). Must be paired with `testExamplesPackageVersion`.
   * When omitted, example files are read from the main package directory.
   */
  testExamplesPackageId?: string;
  /** Version for the examples package (e.g. `4.0.1`). */
  testExamplesPackageVersion?: string;
}

/** Top-level generate.config.ts shape */
export interface GenerateConfig {
  entries: GenerateConfigEntry[];
  /** When provided and entries include typescript emits, generates index.d.ts */
  indexOutFile?: string;
}
