# @reasonhealth/fhir-zod

[![npm](https://img.shields.io/npm/v/@reasonhealth/fhir-zod)](https://www.npmjs.com/package/@reasonhealth/fhir-zod)

Zod schemas for FHIR R4, R4B, and R5. Generated from official FHIR StructureDefinition packages via [`@reasonhealth/fhir-ts-codegen`](../fhir-ts-codegen).

## Installation

```bash
npm install @reasonhealth/fhir-zod zod
# or
bun add @reasonhealth/fhir-zod zod
```

Pair with [`@types/fhir`](https://www.npmjs.com/package/@types/fhir) for ambient TypeScript types if you need them alongside runtime validation:

```bash
npm install --save-dev @types/fhir
```

## Usage

```ts
import { PatientSchema, BundleSchema } from '@reasonhealth/fhir-zod/r4'

// Parse and validate (throws ZodError on failure)
const patient = PatientSchema.parse(rawJson)

// Safe parse (no throw)
const result = PatientSchema.safeParse(rawJson)
if (result.success) {
  console.log(result.data.resourceType) // 'Patient'
}

// Infer types directly from the schema
import type { z } from 'zod'
import { PatientSchema } from '@reasonhealth/fhir-zod/r4'
type Patient = z.infer<typeof PatientSchema>
```

See [EXAMPLES.md](./EXAMPLES.md) for more usage patterns.

### Available entry points

| Import | FHIR Version |
|--------|-------------|
| `@reasonhealth/fhir-zod/r4` | FHIR R4 (4.0.1) |
| `@reasonhealth/fhir-zod/r4b` | FHIR R4B (4.3.0) |
| `@reasonhealth/fhir-zod/r5` | FHIR R5 (5.0.0) |

Every schema file exports:

- A `*Schema` constant for each FHIR type (e.g. `PatientSchema`, `BundleSchema`)
- An inferred TypeScript `type` for each schema (e.g. `type Patient = z.infer<typeof PatientSchema>`)

## What's generated

Notable schema features:

- **BackboneElements** use `BackboneElementSchema.extend({})` for clean inheritance
- **Choice types** (`value[x]`) expand to individual optional fields
- **Primitive shadow fields** (`_birthDate`) included for FHIR primitive extensions
- **Inline enums** for required-strength bindings (`z.enum(['male', 'female', 'other', 'unknown'])`)
- **`resourceType`** as `z.literal('Patient')` for discriminated union support
- **Circular references** (e.g. `Questionnaire.item.item`, `ValueSet.compose`) handled with `z.lazy()`
- Schemas emitted in topological order to minimise forward references

## Regenerating

```bash
bun run generate
```

Requires `@reasonhealth/fhir-ts-codegen` to be available (installed via workspace). FHIR packages are downloaded automatically on first run and cached in `.fhir-cache/`.
