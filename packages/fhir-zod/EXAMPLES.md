# @rh/fhir-zod — Examples

## Basic parse and validate

```ts
import { PatientSchema } from '@rh/fhir-zod/r4'

const raw = await fetch('https://hapi.fhir.org/baseR4/Patient/example').then(r => r.json())

const patient = PatientSchema.parse(raw)
// patient is fully typed: { resourceType: 'Patient', id?: string, name?: HumanName[], ... }

console.log(patient.name?.[0]?.family)
```

## Safe parse — handle validation errors without throwing

```ts
import { ObservationSchema } from '@rh/fhir-zod/r4'

const result = ObservationSchema.safeParse(raw)

if (!result.success) {
  console.error('Invalid Observation:', result.error.flatten())
} else {
  console.log('Status:', result.data.status)
}
```

## Infer types from schemas

The schemas are the source of truth — derive types from them directly rather than maintaining a separate type file.

```ts
import { z } from 'zod'
import { PatientSchema, BundleSchema } from '@rh/fhir-zod/r4'

type Patient = z.infer<typeof PatientSchema>
type Bundle  = z.infer<typeof BundleSchema>

function greet(patient: Patient): string {
  return patient.name?.[0]?.family ?? 'Unknown'
}
```

## Using with `@types/fhir`

`@types/fhir` provides ambient namespace types (`fhir4.Patient`, etc.) that may already be used throughout your codebase. `@rh/fhir-zod` adds runtime validation on top of those same shapes.

### Validating data already typed as `fhir4.Patient`

```ts
import { PatientSchema } from '@rh/fhir-zod/r4'

declare const incoming: fhir4.Patient  // type from @types/fhir

// Validate the runtime value against the Zod schema.
// PatientSchema.parse accepts `unknown`, so passing a typed value is fine.
const validated = PatientSchema.parse(incoming)
```

### Bridging Zod-inferred types to `@types/fhir` namespace types

The Zod-inferred types and the `@types/fhir` namespace types describe the same FHIR shapes. You can assign between them where the structures align:

```ts
import { z } from 'zod'
import { PatientSchema } from '@rh/fhir-zod/r4'

type ZodPatient = z.infer<typeof PatientSchema>

function toAmbient(p: ZodPatient): fhir4.Patient {
  return p as fhir4.Patient
}

function fromAmbient(p: fhir4.Patient): ZodPatient {
  // Parse validates and narrows to the Zod-inferred type
  return PatientSchema.parse(p)
}
```

### Building a type-guard

```ts
import { PatientSchema } from '@rh/fhir-zod/r4'

function isPatient(resource: fhir4.Resource): resource is fhir4.Patient {
  return PatientSchema.safeParse(resource).success
}

declare const resource: fhir4.Resource
if (isPatient(resource)) {
  console.log(resource.name)  // fhir4.Patient
}
```

## Bundle parsing

Parse a bundle and pull out all resources of a given type:

```ts
import { BundleSchema, PatientSchema } from '@rh/fhir-zod/r4'

const bundle = BundleSchema.parse(raw)

const patients = (bundle.entry ?? [])
  .map(e => e.resource)
  .filter(r => r?.resourceType === 'Patient')
  .map(r => PatientSchema.parse(r))
```

## Discriminated union over resource types

Because every schema exports `resourceType` as a `z.literal`, you can compose a discriminated union across the resource types you care about:

```ts
import { z } from 'zod'
import { PatientSchema, PractitionerSchema, OrganizationSchema } from '@rh/fhir-zod/r4'

const SubjectSchema = z.discriminatedUnion('resourceType', [
  PatientSchema,
  PractitionerSchema,
  OrganizationSchema,
])

type Subject = z.infer<typeof SubjectSchema>

const subject = SubjectSchema.parse(raw)

switch (subject.resourceType) {
  case 'Patient':      console.log('patient');      break
  case 'Practitioner': console.log('practitioner'); break
  case 'Organization': console.log('organization'); break
}
```

## Partial validation / extension

Use Zod's `.pick()`, `.omit()`, or `.extend()` to adapt a schema for a stricter profile or a partial input form:

```ts
import { PatientSchema } from '@rh/fhir-zod/r4'

// Only the fields you need
const PatientSummarySchema = PatientSchema.pick({
  id: true,
  name: true,
  birthDate: true,
})

// Require a field that is optional in base FHIR
const IdentifiedPatientSchema = PatientSchema.extend({
  id: PatientSchema.shape.id.unwrap(),  // remove .optional()
})
```

## R4B and R5

The same patterns apply to R4B and R5 imports:

```ts
import { PatientSchema } from '@rh/fhir-zod/r4b'
import { PatientSchema as PatientR5Schema } from '@rh/fhir-zod/r5'
```
