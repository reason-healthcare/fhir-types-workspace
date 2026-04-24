import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { resolvePackageDir } from '../download/index.ts'
import { parsePackageDir } from '../parser/index.ts'
import { emitTypeScript } from '../emitter/typescript.ts'
import { emitZod } from '../emitter/zod.ts'
import { generateTestFile } from './tests.ts'
import type { FhirVersion } from '../ir.ts'

export type EmitType = 'typescript' | 'zod'

export interface GenerateOptions {
  /** FHIR package ID, e.g. hl7.fhir.r4.core */
  packageId: string
  /** Package version, e.g. 4.0.1 */
  packageVersion: string
  /** FHIR version key for the IR model */
  fhirVersion: FhirVersion
  /** Emit target */
  emit: EmitType
  /** Absolute path to write the generated file */
  outFile: string
  /** TypeScript namespace name (required when emit=typescript), e.g. fhir4 */
  namespace?: string
  /**
   * When emit=typescript, also generate a DT test file at this path.
   * Optional — omit to skip test generation.
   */
  testOutFile?: string
}

/**
 * Run a single code generation pass: download/resolve package → parse → emit → write.
 */
export async function generate(opts: GenerateOptions): Promise<void> {
  const {
    packageId, packageVersion, fhirVersion, emit,
    outFile, namespace, testOutFile,
  } = opts

  console.log(`\n[${fhirVersion}] ${packageId}@${packageVersion} → ${emit}`)

  const packageDir = await resolvePackageDir(packageId, packageVersion)
  console.log(`  Parsing...`)

  const model = await parsePackageDir(packageDir, fhirVersion)
  console.log(`  Parsed ${model.interfaces.length} types`)

  let output: string
  if (emit === 'typescript') {
    if (!namespace) throw new Error('namespace is required for TypeScript emit')
    output = emitTypeScript(model, namespace, packageId, packageVersion)
  } else {
    output = emitZod(model)
  }

  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, output)
  console.log(`  Wrote: ${outFile}`)

  if (emit === 'typescript' && testOutFile && namespace) {
    await generateTestFile(packageDir, fhirVersion, namespace, testOutFile)
  }
}
