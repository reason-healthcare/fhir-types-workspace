# dt-types-fhir

A pure TypeScript/Bun monorepo that generates TypeScript declaration files and Zod schemas from FHIR StructureDefinitions. Replaces the old `@types/fhir` pipeline that required dotnet and Gulp.

## Packages

| Package | Description |
|---------|-------------|
| [`@rh/fhir-generator`](./packages/generator) | General-purpose CLI and library — parses any FHIR NPM package and emits TypeScript `.d.ts` or Zod schemas |
| [`@types/fhir`](./packages/types-fhir) | Generated TypeScript declarations for FHIR R2–R5 (see [DEFINITELY_TYPED.md](./DEFINITELY_TYPED.md)) |
| [`@rh/fhir-zod`](./packages/zod-fhir) | Generated Zod schemas for FHIR R2, R3, R4, R4B, R5 |

## Requirements

- [Bun](https://bun.sh) ≥ 1.0

## Quick start

```bash
# Install dependencies
bun install

# Generate everything (@types/fhir + @rh/fhir-zod)
bun run generate

# Generate only TypeScript declarations
bun run generate:types

# Generate only Zod schemas
bun run generate:zod
```

FHIR packages are resolved in order:
1. Local project cache (`.fhir-cache/`)
2. System FHIR cache (`~/.fhir/packages/`)
3. Downloaded from `https://packages.fhir.org`

## One-shot CLI

Generate from any FHIR NPM package without a config file:

```bash
# TypeScript declarations
bun run packages/generator/src/cli.ts \
  --package hl7.fhir.r4.core \
  --package-version 4.0.1 \
  --fhir-version r4 \
  --emit typescript \
  --namespace fhir4 \
  --out ./r4.d.ts

# Zod schemas
bun run packages/generator/src/cli.ts \
  --package hl7.fhir.r4.core \
  --package-version 4.0.1 \
  --fhir-version r4 \
  --emit zod \
  --out ./r4-schemas.ts
```

Works with any FHIR IG — not just core packages:

```bash
bun run packages/generator/src/cli.ts \
  --package hl7.fhir.us.core \
  --package-version 5.0.1 \
  --fhir-version r4 \
  --emit zod \
  --out ./us-core-schemas.ts
```

## Config file

Output packages declare a `generate.config.ts` to drive multi-version generation:

```ts
import type { GenerateConfig } from '@rh/fhir-generator'

const config: GenerateConfig = {
  entries: [
    {
      packageId: 'hl7.fhir.r4.core',
      packageVersion: '4.0.1',
      fhirVersion: 'r4',
      emit: 'typescript',
      namespace: 'fhir4',
      outFile: './r4.d.ts',
      testOutFile: './test/r4-tests.ts', // optional, typescript only
    },
    {
      packageId: 'hl7.fhir.r4.core',
      packageVersion: '4.0.1',
      fhirVersion: 'r4',
      emit: 'zod',
      outFile: './src/r4.ts',
    },
  ],
  indexOutFile: './index.d.ts', // optional, generates a reference index for typescript emits
}

export default config
```

Run it with:

```bash
bun run packages/generator/src/cli.ts --config path/to/generate.config.ts
```

## How it works

```
FHIR NPM package
      │
      ▼
  StructureDefinition JSON
      │
      ▼
  Parser (src/parser/)
  ─ Backbone element hoisting
  ─ Choice type [x] expansion
  ─ Inline enum resolution (required-strength ValueSets)
  ─ contentReference → isLazy flag
      │
      ▼
  Intermediary Representation (IR)
      │
      ├──▶ TypeScript emitter → .d.ts declarations
      │         UMD namespace, JSDoc, shadow _fields
      │
      └──▶ Zod emitter → z.object() schemas
                z.enum(), z.lazy() for circular refs,
                .extend() for inheritance, toposorted output
```

### FHIR feature mapping

| FHIR feature | TypeScript output | Zod output |
|---|---|---|
| Primitive type | `string \| undefined` | `z.string().optional()` |
| Required element | `string` | `z.string()` |
| Array element | `Foo[] \| undefined` | `z.array(FooSchema).optional()` |
| BackboneElement | Hoisted interface `PatientContact extends BackboneElement` | `BackboneElementSchema.extend({...})` |
| Choice type `[x]` | `deceasedBoolean`, `deceasedDateTime` fields | same field names |
| Primitive shadow | `_birthDate?: Element` | `_birthDate: ElementSchema.optional()` |
| Required ValueSet binding | `('male'\|'female'\|'other'\|'unknown')` | `z.enum(['male','female','other','unknown'])` |
| `contentReference` (circular) | Type name reference | `z.lazy(() => Schema)` |
| Resource type discriminant | `readonly resourceType: 'Patient'` | `resourceType: z.literal('Patient')` |

## Development

```bash
# Lint
bun run lint

# Format (write)
bun run format

# Format (check only)
bun run format:check

# Type-check the generator
cd packages/generator && bun run typecheck

# Run tests
bun run test
```
