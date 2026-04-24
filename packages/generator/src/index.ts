// Public library exports for @fhir-types/generator
export type { IrField, IrInterface, IrModel, FhirVersion } from './ir.ts'
export type { EmitType, GenerateOptions } from './generate/index.ts'
export type { VersionRef } from './generate/index-file.ts'

/** Config entry for one FHIR package → output file */
export interface GenerateConfigEntry {
  packageId: string
  packageVersion: string
  fhirVersion: import('./ir.ts').FhirVersion
  emit: import('./generate/index.ts').EmitType
  outFile: string
  /** Required when emit=typescript */
  namespace?: string
  /** Optional DT test file output path (typescript emit only) */
  testOutFile?: string
}

/** Top-level generate.config.ts shape */
export interface GenerateConfig {
  entries: GenerateConfigEntry[]
  /** When provided and entries include typescript emits, generates index.d.ts */
  indexOutFile?: string
}
