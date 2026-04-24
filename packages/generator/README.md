# @rh/fhir-generator

General-purpose CLI and library that reads FHIR NPM packages and emits either TypeScript `.d.ts` declarations or Zod schemas. Works with any FHIR IG package, not just the core specification.

## Requirements

- [Bun](https://bun.sh) ≥ 1.0

## CLI

### Config-file mode

Point at a `generate.config.ts` to run multiple packages in one pass:

```bash
bun run src/cli.ts --config path/to/generate.config.ts
```

### Single-shot mode

```bash
# TypeScript declarations
bun run src/cli.ts \
  --package hl7.fhir.r4.core \
  --package-version 4.0.1 \
  --fhir-version r4 \
  --emit typescript \
  --namespace fhir4 \
  --out ./r4.d.ts \
  --test-out ./tests/r4-tests.ts  # optional

# Zod schemas
bun run src/cli.ts \
  --package hl7.fhir.r4.core \
  --package-version 4.0.1 \
  --fhir-version r4 \
  --emit zod \
  --out ./r4-schemas.ts
```

| Flag | Description |
|------|-------------|
| `--package` | FHIR NPM package ID (e.g. `hl7.fhir.r4.core`) |
| `--package-version` | Package version (e.g. `4.0.1`) |
| `--fhir-version` | One of `r2` `r3` `r4` `r4b` `r5` |
| `--emit` | `typescript` or `zod` |
| `--out` | Output file path |
| `--namespace` | UMD namespace name (TypeScript emit only, e.g. `fhir4`) |
| `--test-out` | DefinitelyTyped test file output path (TypeScript emit only) |
| `--config` | Path to a `generate.config.ts` (replaces all other flags) |

## Config file format

```ts
import type { GenerateConfig } from '@rh/fhir-generator'

const config: GenerateConfig = {
  entries: [
    {
      packageId: 'hl7.fhir.r4.core',
      packageVersion: '4.0.1',
      fhirVersion: 'r4',
      emit: 'typescript',
      namespace: 'fhir4',          // required for typescript emit
      outFile: './r4.d.ts',
      testOutFile: './test/r4-tests.ts',  // optional
    },
    {
      packageId: 'hl7.fhir.r4.core',
      packageVersion: '4.0.1',
      fhirVersion: 'r4',
      emit: 'zod',
      outFile: './src/r4.ts',
    },
  ],
  // optional: generates an index.d.ts with /// <reference> entries for typescript emits
  indexOutFile: './index.d.ts',
}

export default config
```

## Package resolution

Packages are resolved in this order — no manual download needed in most cases:

1. **Project cache** — `.fhir-cache/` in the working directory
2. **System cache** — `~/.fhir/packages/` (populated by FHIR IG Publisher and other tools)
3. **Download** — fetched from `https://packages.fhir.org` and stored in the project cache

## Library API

```ts
import { generate } from '@rh/fhir-generator'

await generate({
  packageId: 'hl7.fhir.r4.core',
  packageVersion: '4.0.1',
  fhirVersion: 'r4',
  emit: 'zod',
  outFile: '/tmp/r4-schemas.ts',
})
```

IR types are also exported for building custom emitters:

```ts
import type { IrModel, IrInterface, IrField } from '@rh/fhir-generator'
```

## Architecture

```
StructureDefinition JSON (from FHIR NPM package)
        │
        ▼
   src/parser/
   ─ Backbone hoisting      PatientContact extends BackboneElement
   ─ Choice types [x]       deceasedBoolean + deceasedDateTime
   ─ Inline enum resolution  ('male'|'female'|'other'|'unknown')
   ─ contentReference        → isLazy: true
        │
        ▼
   Intermediary Representation (src/ir.ts)
        │
        ├──▶ src/emitter/typescript.ts  → .d.ts declarations
        └──▶ src/emitter/zod.ts         → z.object() schemas
```

## Development

```bash
bun run typecheck
```
