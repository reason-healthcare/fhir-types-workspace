# fhir-zod

Zod schemas for FHIR R4, R4B, and R5. Generated from official FHIR StructureDefinition packages via [`@fhir-types/generator`](../generator).

## Installation

```bash
npm install fhir-zod zod
# or
bun add fhir-zod zod
```

## Usage

```ts
import { PatientSchema, BundleSchema } from 'fhir-zod/r4'

// Parse and validate
const patient = PatientSchema.parse(rawJson)

// Safe parse (no throw)
const result = PatientSchema.safeParse(rawJson)
if (result.success) {
  console.log(result.data.resourceType) // 'Patient'
}

// Inferred types
import type { Patient } from 'fhir-zod/r4'
```

### Available entry points

| Import | FHIR Version |
|--------|-------------|
| `fhir-zod/r4` | FHIR R4 (4.0.1) |
| `fhir-zod/r4b` | FHIR R4B (4.3.0) |
| `fhir-zod/r5` | FHIR R5 (5.0.0) |

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

Requires `@fhir-types/generator` to be available (installed via workspace). FHIR packages are downloaded automatically on first run and cached in `.fhir-cache/`.
