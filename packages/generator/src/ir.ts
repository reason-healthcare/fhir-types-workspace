/** Supported FHIR versions */
export type FhirVersion = 'r2' | 'r3' | 'r4' | 'r4b' | 'r5'

/** A single field in an IR interface */
export interface IrField {
  name: string
  tsType: string
  required: boolean
  isArray: boolean
  description?: string
  /** For FHIR primitive fields: emit a companion `_name?: Element` shadow field */
  hasPrimitiveExtension: boolean
  /** e.g. `readonly resourceType: 'Patient'` */
  readonly?: boolean
  /**
   * True when this field is resolved via a FHIR contentReference (self-referential
   * or cross-referential backbone element). Zod emitter wraps these in z.lazy().
   */
  isLazy?: boolean
}

/** A TypeScript interface (or BackboneElement sub-interface) */
export interface IrInterface {
  name: string
  /** Name of base interface to extend, if any */
  extends?: string
  fields: IrField[]
  description?: string
  /** True for FHIR primitive-type StructureDefinitions (boolean, string, etc.) */
  isPrimitive?: boolean
  /** True for concrete (non-abstract) resource types — used to build FhirResource union */
  isResource?: boolean
}

/** Full IR model for one FHIR version */
export interface IrModel {
  version: FhirVersion
  interfaces: IrInterface[]
}
