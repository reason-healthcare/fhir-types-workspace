import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

/** Example file names to skip per FHIR version (known invalid examples in the spec) */
const EXCEPTIONS: Record<string, string[]> = {
  r2: [
    'patient-example.canonical.json',
    'patient-example.json',
    'relatedperson-example.canonical.json',
    'relatedperson-example.json',
  ],
  r3: [],
  r4: [
    'examplescenario-questionnaire.canonical.json',
    'examplescenario-questionnaire.json',
    'activitydefinition-example.json',
    'activitydefinition-predecessor-example.json',
    'activitydefinition-servicerequest-example.json',
    'plandefinition-example-cardiology-os.json',
    'plandefinition-example.json',
  ],
  r4b: [
    'examplescenario-questionnaire.canonical.json',
    'examplescenario-questionnaire.json',
    'activitydefinition-example.json',
    'activitydefinition-predecessor-example.json',
    'activitydefinition-servicerequest-example.json',
    'plandefinition-example-cardiology-os.json',
    'plandefinition-example.json',
    'administrableproductdefinition-example.json',
    'adverseevent-example.json',
  ],
  r5: [
    'questionnaireresponse-example-f201-lifelines.json',
    'documentmanifest-example.json',
    'medicationusageexample1.json',
  ],
}

function removeKeys(obj: unknown, keys: string[]): unknown {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(item => removeKeys(item, keys))
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .filter(([k]) => !keys.includes(k))
      .map(([k, v]) => [k, removeKeys(v, keys)])
  )
}

function cleanEmpty(obj: unknown): unknown {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return (obj as unknown[]).map(cleanEmpty).filter(v => v != null)
  }
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .map(([k, v]) => [k, cleanEmpty(v)] as [string, unknown])
      .filter(([k, v]) => {
        if (v === null || v === undefined) return false
        if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v as object).length === 0) {
          return !k.startsWith('_')
        }
        return true
      })
  )
}

/**
 * Generate a TypeScript test file from example JSON files in a FHIR package.
 * Each distinct resourceType gets one test variable.
 *
 * @param packageDir  Path to the extracted FHIR package directory
 * @param version     FHIR version key (r2, r3, r4, r4b, r5)
 * @param namespace   TypeScript namespace name (e.g. fhir4)
 * @param outFile     Full path to write the generated test file
 */
export async function generateTestFile(
  packageDir: string,
  version: string,
  namespace: string,
  outFile: string,
): Promise<void> {
  const exceptions = EXCEPTIONS[version] ?? []
  const files = await readdir(packageDir)

  const seenTypes = new Set<string>()
  const lines: string[] = []

  for (const [i, file] of files.entries()) {
    if (!file.endsWith('.json')) continue
    if (!file.includes('example')) continue
    if (file.includes('diff')) continue
    if (exceptions.includes(file)) continue

    try {
      const raw = await readFile(join(packageDir, file), 'utf8')
      const resource = JSON.parse(raw) as Record<string, unknown>
      const { resourceType } = resource
      if (typeof resourceType !== 'string') continue

      // One test variable per resourceType to keep the test file manageable
      if (seenTypes.has(resourceType)) continue
      seenTests.add(resourceType)

      delete resource['text']
      const cleaned = cleanEmpty(removeKeys(resource, ['fhir_comments']))

      lines.push(`// ${file}`)
      lines.push(
        `const ${version}Test${i}: ${namespace}.${resourceType} = ${JSON.stringify(cleaned)};`
      )
      lines.push('')
    } catch {
      // skip malformed example files
    }
  }

  lines.push('') // dtslint wants trailing newline

  await mkdir(outFile.replace(/\/[^/]+$/, ''), { recursive: true })
  await writeFile(outFile, lines.join('\n'))
  console.log(`  Wrote test file: ${outFile}`)
}

// Shared seen-types tracker across calls (reset between generate runs)
const seenTests = new Set<string>()
export function resetSeenTests(): void {
  seenTests.clear()
}
