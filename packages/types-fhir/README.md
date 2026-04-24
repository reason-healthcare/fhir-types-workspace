# @types/fhir

TypeScript type definitions for FHIR R2, R3, R4, R4B, and R5. Generated from official FHIR StructureDefinition packages via [`@rh/fhir-ts-codegen`](../fhir-ts-codegen).

## Installation

```bash
npm install --save-dev @types/fhir
# or
bun add -d @types/fhir
```

## Usage

Types are exposed as UMD namespaces — no import needed, just reference the namespace for the FHIR version you're targeting.

```ts
const patient: fhir4.Patient = {
  resourceType: 'Patient',
  name: [{ family: 'Smith', given: ['John'] }],
  gender: 'male',
  birthDate: '1990-01-15',
}

const bundle: fhir4.Bundle = {
  resourceType: 'Bundle',
  type: 'searchset',
  entry: [{ resource: patient }],
}
```

### Available namespaces

| Namespace | FHIR Version |
|-----------|-------------|
| `fhir2` | FHIR R2 (DSTU2 / 1.0.2) |
| `fhir3` | FHIR R3 (STU3 / 3.0.2) |
| `fhir4` | FHIR R4 (4.0.1) |
| `fhir4b` | FHIR R4B (4.3.0) |
| `fhir5` | FHIR R5 (5.0.0) |

### Triple-slash reference (if needed)

If your project doesn't automatically pick up the types, add a reference to `index.d.ts`:

```ts
/// <reference types="@types/fhir" />
```

## What's generated

- One `.d.ts` file per FHIR version (`r2.d.ts` … `r5.d.ts`)
- An `index.d.ts` that re-exports all versions via `/// <reference path>` directives
- DefinitelyTyped test files under `test/`

Notable type features:

- **BackboneElements** are hoisted to named interfaces (`PatientContact`, `QuestionnaireItem`, …)
- **Choice types** (`value[x]`) expand to individual fields (`valueString`, `valueBoolean`, …)
- **Primitive shadow fields** (`_birthDate?: Element`) support FHIR primitive extensions
- **Inline enums** for required-strength bindings (`'male' | 'female' | 'other' | 'unknown'`)
- **`readonly resourceType`** discriminant on every concrete resource

## Regenerating

```bash
bun run generate
```

Requires `@rh/fhir-ts-codegen` to be available (installed via workspace). FHIR packages are downloaded automatically on first run and cached in `.fhir-cache/`.
