#!/usr/bin/env bun
/**
 * FHIR TypeScript/Zod Generator CLI
 *
 * Usage:
 *   bun run cli.ts --config path/to/generate.config.ts
 *
 *   bun run cli.ts \
 *     --package hl7.fhir.r4.core \
 *     --package-version 4.0.1 \
 *     --fhir-version r4 \
 *     --emit typescript \
 *     --namespace fhir4 \
 *     --out ./out/r4.d.ts
 */

import { resolve, dirname } from 'node:path'
import { generate, type EmitType } from './generate/index.ts'
import { generateIndexFile } from './generate/index-file.ts'
import { resetSeenTests } from './generate/tests.ts'
import type { FhirVersion } from './ir.ts'

// ---------------------------------------------------------------------------
// Config file interface (for --config mode)
// ---------------------------------------------------------------------------

interface GenerateConfigEntry {
  packageId: string
  packageVersion: string
  fhirVersion: FhirVersion
  emit: EmitType
  outFile: string
  /** Required when emit=typescript */
  namespace?: string
  /** Optional DT test file output path (typescript emit only) */
  testOutFile?: string
}

interface GenerateConfig {
  /** Entries to generate */
  entries: GenerateConfigEntry[]
  /** Optional index.d.ts output path (typescript emit only) */
  indexOutFile?: string
}

// ---------------------------------------------------------------------------
// CLI arg parsing
// ---------------------------------------------------------------------------

function parseArgs(args: string[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const value = args[i + 1] && !args[i + 1]!.startsWith('--') ? args[++i]! : 'true'
      result[key] = value
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv.slice(2))

  // Config-file mode
  if (args['config']) {
    const configPath = resolve(args['config'])
    const configDir = dirname(configPath)
    console.log(`Loading config: ${configPath}`)
    const { default: config } = (await import(configPath)) as { default: GenerateConfig }

    resetSeenTests()

    for (const entry of config.entries) {
      await generate({
        packageId: entry.packageId,
        packageVersion: entry.packageVersion,
        fhirVersion: entry.fhirVersion,
        emit: entry.emit,
        outFile: resolve(configDir, entry.outFile),
        namespace: entry.namespace,
        testOutFile: entry.testOutFile ? resolve(configDir, entry.testOutFile) : undefined,
      })
    }

    if (config.indexOutFile) {
      const tsEntries = config.entries.filter(e => e.emit === 'typescript' && e.namespace)
      await generateIndexFile(
        tsEntries.map(e => ({ outputFile: e.fhirVersion, namespace: e.namespace! })),
        resolve(configDir, config.indexOutFile),
      )
    }

    console.log('\nDone.')
    return
  }

  // Single-shot CLI mode
  const packageId = args['package']
  const packageVersion = args['package-version']
  const fhirVersion = args['fhir-version'] as FhirVersion | undefined
  const emit = (args['emit'] ?? 'typescript') as EmitType
  const outFile = args['out']
  const namespace = args['namespace']
  const testOutFile = args['test-out']

  if (!packageId || !packageVersion || !fhirVersion || !outFile) {
    console.error(
      'Usage: cli.ts --package <id> --package-version <ver> --fhir-version <r4> ' +
      '--emit typescript|zod --out <path> [--namespace <ns>] [--test-out <path>]\n' +
      '       cli.ts --config <path/to/generate.config.ts>'
    )
    process.exit(1)
  }

  resetSeenTests()

  await generate({
    packageId,
    packageVersion,
    fhirVersion,
    emit,
    outFile: resolve(outFile),
    namespace,
    testOutFile: testOutFile ? resolve(testOutFile) : undefined,
  })

  console.log('\nDone.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
