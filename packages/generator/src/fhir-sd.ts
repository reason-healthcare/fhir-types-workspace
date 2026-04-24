/** Minimal TypeScript types for FHIR StructureDefinition JSON */

export interface FhirExtension {
  url: string
  valueString?: string
  valueCode?: string
  valueUrl?: string
  valueBoolean?: boolean
  valueInteger?: number
  valueCanonical?: string
}

export interface FhirElementType {
  code: string
  targetProfile?: string[]
  extension?: FhirExtension[]
}

export interface FhirBinding {
  strength: 'required' | 'extensible' | 'preferred' | 'example'
  valueSet?: string
  description?: string
  extension?: FhirExtension[]
}

export interface FhirElement {
  id: string
  path: string
  min?: number
  max?: string
  type?: FhirElementType[]
  binding?: FhirBinding
  short?: string
  definition?: string
  comment?: string
  /** Set to true when this is a summary element only */
  isSummary?: boolean
  contentReference?: string
  base?: { path: string; min: number; max: string }
}

export interface FhirSnapshot {
  element: FhirElement[]
}

export interface StructureDefinition {
  resourceType: 'StructureDefinition'
  id: string
  url: string
  name: string
  kind: 'primitive-type' | 'complex-type' | 'resource' | 'logical' | 'datatype'
  abstract?: boolean
  type?: string
  baseDefinition?: string
  /** FHIR R2 only: same as baseDefinition in R3+ */
  base?: string
  /** FHIR R3+: 'specialization' = base type, 'constraint' = profile */
  derivation?: 'specialization' | 'constraint'
  /** FHIR R2 only: present on profiles, identifies the constrained type */
  constrainedType?: string
  status?: string
  description?: string
  snapshot?: FhirSnapshot
  differential?: FhirSnapshot
}

export interface FhirPackageJson {
  name: string
  version: string
  fhirVersions?: string[]
  canonical?: string
}

export interface CodeSystemConcept {
  code: string
  display?: string
  definition?: string
  concept?: CodeSystemConcept[]
}

export interface CodeSystem {
  resourceType: 'CodeSystem'
  id: string
  url: string
  concept?: CodeSystemConcept[]
}

export interface ValueSetInclude {
  system?: string
  version?: string
  concept?: Array<{ code: string; display?: string }>
  filter?: Array<{ property: string; op: string; value: string }>
  valueSet?: string[]
}

export interface ValueSet {
  resourceType: 'ValueSet'
  id: string
  url: string
  compose?: {
    include: ValueSetInclude[]
    exclude?: ValueSetInclude[]
  }
  expansion?: {
    contains?: Array<{ system?: string; code?: string; display?: string }>
  }
}
