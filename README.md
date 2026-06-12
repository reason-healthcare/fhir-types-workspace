# FHIR Types Workspace

[![CI](https://github.com/reason-healthcare/fhir-types-workspace/actions/workflows/ci.yml/badge.svg)](https://github.com/reason-healthcare/fhir-types-workspace/actions/workflows/ci.yml)

A pure TypeScript/Bun monorepo that generates TypeScript declaration files and Zod schemas from FHIR StructureDefinitions. Replaces the old `@types/fhir` pipeline that required dotnet and Gulp.

## Packages

| Package | Description |
|---------|-------------|
| [`@reasonhealth/fhir-ts-codegen`](./packages/fhir-ts-codegen) | General-purpose CLI and library — parses any FHIR NPM package and emits TypeScript `.d.ts` or Zod schemas |
| [`@types/fhir`](./packages/types-fhir) | Generated TypeScript declarations for FHIR R2–R5 (see [DEFINITELY_TYPED.md](./DEFINITELY_TYPED.md)) |
| [`@reasonhealth/fhir-zod`](./packages/fhir-zod) | Generated Zod schemas for FHIR R4, R4B, R5 |

## Requirements

- [Bun](https://bun.sh) ≥ 1.0

## Quick start

```bash
# Install dependencies
bun install

# Generate everything (@types/fhir + @reasonhealth/fhir-zod)
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
bun run packages/fhir-ts-codegen/src/cli.ts \
  --package hl7.fhir.r4.core \
  --package-version 4.0.1 \
  --fhir-version r4 \
  --emit typescript \
  --namespace fhir4 \
  --out ./r4.d.ts

# Zod schemas
bun run packages/fhir-ts-codegen/src/cli.ts \
  --package hl7.fhir.r4.core \
  --package-version 4.0.1 \
  --fhir-version r4 \
  --emit zod \
  --out ./r4-schemas.ts
```

Works with any FHIR IG — not just core packages:

```bash
bun run packages/fhir-ts-codegen/src/cli.ts \
  --package hl7.fhir.us.core \
  --package-version 5.0.1 \
  --fhir-version r4 \
  --emit zod \
  --out ./us-core-schemas.ts
```

## Generating types for a single profile

Use `--profiles` to generate output for one or more profiles from any FHIR package, without touching the base type files.

### Zod schemas

The output imports base schemas from an existing generated file (defaults to `./r4`) rather than inlining all of R4.

```bash
# Blood pressure profile from R4 core
bun run packages/fhir-ts-codegen/src/cli.ts \
  --package hl7.fhir.r4.core \
  --package-version 4.0.1 \
  --fhir-version r4 \
  --emit zod \
  --profiles "http://hl7.org/fhir/StructureDefinition/bp" \
  --out ./r4-bp.ts

# Multiple profiles in one pass (comma-separated)
bun run packages/fhir-ts-codegen/src/cli.ts \
  --package hl7.fhir.r4.core \
  --package-version 4.0.1 \
  --fhir-version r4 \
  --emit zod \
  --profiles "http://hl7.org/fhir/StructureDefinition/bp,http://hl7.org/fhir/StructureDefinition/bodyweight" \
  --out ./r4-vitals.ts
```

The generated file imports base schemas (e.g. `CodeableConceptSchema`, `ReferenceSchema`) from `./r4` and exports fully-typed profile schemas:

```ts
// r4-bp.ts (generated)
import { z } from 'zod'
import { CodeableConceptSchema, ReferenceSchema, ... } from './r4'

export const ObservationBpSchema = z.object({
  resourceType: z.literal('Observation'),
  status: z.enum([...]),   // required
  category: z.array(CodeableConceptSchema),  // required
  code: CodeableConceptSchema,               // required
  subject: ReferenceSchema,                  // required
  component: z.array(ObservationBpComponentSchema),  // required, min 2
  // ...
})
export type ObservationBp = z.infer<typeof ObservationBpSchema>
```

Use `--import-base-from` to change where base schemas are imported from (default: `./r4`).

### TypeScript declarations

With `--emit typescript`, the output is a `declare namespace` augmentation of an existing namespace (e.g. `fhir4`). Type references such as `Reference` and `CodeableConcept` resolve naturally within the namespace — no imports needed.

```bash
bun run packages/fhir-ts-codegen/src/cli.ts \
  --package hl7.fhir.r4.core \
  --package-version 4.0.1 \
  --fhir-version r4 \
  --emit typescript \
  --namespace fhir4 \
  --profiles "http://hl7.org/fhir/StructureDefinition/bp" \
  --out ./r4-bp.d.ts
```

The generated file augments the `fhir4` namespace, so it works alongside `@types/fhir`:

```ts
// r4-bp.d.ts (generated)
declare namespace fhir4 {
  export interface ObservationBp {
    readonly resourceType: 'Observation';
    status: ('registered' | 'preliminary' | 'final' | ...);
    category: CodeableConcept[];   // required
    code: CodeableConcept;         // required
    subject: Reference;            // required
    component: ObservationBpComponent[];  // required, min 2
    // ...
  }
  export interface ObservationBpComponent { ... }
}
```

Include it alongside the base types in a triple-slash reference or `tsconfig.json`:

```ts
/// <reference types="@types/fhir" />
/// <reference path="./r4-bp.d.ts" />
```

### Via `generate.config.ts`

```ts
// Zod profile entry
{
  packageId: 'hl7.fhir.r4.core',
  packageVersion: '4.0.1',
  fhirVersion: 'r4',
  emit: 'zod',
  outFile: './src/r4-bp.ts',
  profilesOnly: true,
  includeProfiles: ['http://hl7.org/fhir/StructureDefinition/bp'],
  importBaseFrom: './r4',
}

// TypeScript profile entry
{
  packageId: 'hl7.fhir.r4.core',
  packageVersion: '4.0.1',
  fhirVersion: 'r4',
  emit: 'typescript',
  namespace: 'fhir4',
  outFile: './r4-bp.d.ts',
  profilesOnly: true,
  includeProfiles: ['http://hl7.org/fhir/StructureDefinition/bp'],
}
```

## Config file

Output packages declare a `generate.config.ts` to drive multi-version generation:

```ts
import type { GenerateConfig } from '@reasonhealth/fhir-ts-codegen'

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
bun run packages/fhir-ts-codegen/src/cli.ts --config path/to/generate.config.ts
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
cd packages/fhir-ts-codegen && bun run typecheck

# Run tests
bun run test
```

## Versioning

The monorepo uses a single shared version across the root and all publishable packages (`@reasonhealth/fhir-ts-codegen`, `@reasonhealth/fhir-zod`). The root `package.json` is the source of truth.

Bump and sync in one step:

```bash
# Patch release (1.0.0 → 1.0.1)
bun run version:patch

# Minor release (1.0.0 → 1.1.0)
bun run version:minor

# Major release (1.0.0 → 2.0.0)
bun run version:major
```

Each command updates the root `package.json` and then runs `scripts/sync-version.ts` to propagate the new version to every package. After bumping, commit and tag:

```bash
VERSION=$(node -p "require('./package.json').version")
git add package.json packages/fhir-ts-codegen/package.json packages/fhir-zod/package.json
git commit -m "chore: release v${VERSION}"
git tag "v${VERSION}"
git push && git push --tags
```

## Publishing

Packages are published to npm under the `@rh` scope. You must be logged in (`npm login`) and have publish rights to the `@rh` org.

```bash
# Publish both packages
bun run publish:all

# Or publish individually
bun run publish:codegen   # @reasonhealth/fhir-ts-codegen
bun run publish:zod       # @reasonhealth/fhir-zod
```

> **Note:** `@reasonhealth/fhir-zod` declares `@reasonhealth/fhir-ts-codegen` as a `workspace:*` dependency.
> npm will resolve this to the pinned version at publish time automatically.

### Full release checklist

1. Regenerate output if FHIR source data has changed: `bun run generate`
2. Ensure tests pass: `bun run test`
3. Bump the version: `bun run version:patch` (or `minor` / `major`)
4. Commit + tag (see commands above)
5. Publish: `bun run publish:all`

## Supported By

This project is proudly supported by [Vermonster](https://vermonster.com) / [ReasonHealth](https://reason.health).

<p>
  <span style="padding: 0 20px; display: inline-block;">
    <a href="https://vermonster.com"><img src="https://www.vermonster.com/images/vermonster-logo.svg" alt="Vermonster Logo" height="20px"></a>
  </span>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <span style="padding: 0 20px; display: inline-block;">
    <a href="https://reason.health"><img src="https://www.vermonster.com/images/reasonhub-logo-full-color-rgb.svg" alt="ReasonHealth Logo" height="20px"></a>
  </span>
</p>

