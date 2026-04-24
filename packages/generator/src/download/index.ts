import { mkdir, access } from 'node:fs/promises'
import { join } from 'node:path'
import { LOCAL_FHIR_CACHE, PACKAGES_DIR } from '../config.ts'

/** Returns a local cache directory for a package if it already exists */
async function findInLocalCache(packageId: string, version: string): Promise<string | null> {
  const folderName = `${packageId}#${version}`
  for (const cacheDir of LOCAL_FHIR_CACHE) {
    const candidate = join(cacheDir, folderName, 'package')
    try {
      await access(candidate)
      return candidate
    } catch {
      // not found in this cache dir
    }
  }
  return null
}

/** Download and extract a FHIR package tgz, returning the extracted package dir */
async function downloadAndExtract(packageId: string, version: string): Promise<string> {
  const url = `https://packages.fhir.org/${packageId}/${version}`
  const destDir = join(PACKAGES_DIR, `${packageId}#${version}`)
  const packageDir = join(destDir, 'package')

  await mkdir(packageDir, { recursive: true })

  console.log(`Downloading ${packageId}@${version} from ${url}...`)

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`)
  }

  const tgzBuf = await res.arrayBuffer()

  // Bun has native gzip/tar support via Bun.gunzipSync + archive extraction
  // We use the system tar command for maximum compatibility with tgz format
  const tgzPath = join(destDir, 'package.tgz')
  await Bun.write(tgzPath, tgzBuf)

  console.log(`Extracting ${packageId}@${version}...`)
  const proc = Bun.spawn(['tar', '-xzf', tgzPath, '-C', destDir], {
    stdout: 'ignore',
    stderr: 'pipe',
  })
  const exitCode = await proc.exited
  if (exitCode !== 0) {
    const errText = await new Response(proc.stderr).text()
    throw new Error(`tar extraction failed: ${errText}`)
  }

  return packageDir
}

/**
 * Resolves the local path to a FHIR package's `package/` directory,
 * downloading and caching it if necessary.
 *
 * Resolution order:
 *   1. Project-local ./packages/ cache
 *   2. ~/.fhir/packages (FHIR IG Publisher cache)
 *   3. Download from packages.fhir.org
 */
export async function resolvePackageDir(
  packageId: string,
  version: string,
): Promise<string> {
  // 1. Check project-local cache
  const localProject = join(PACKAGES_DIR, `${packageId}#${version}`, 'package')
  try {
    await access(localProject)
    console.log(`Using cached ${packageId}@${version}`)
    return localProject
  } catch { /* not cached yet */ }

  // 2. Check system FHIR cache
  const systemCache = await findInLocalCache(packageId, version)
  if (systemCache) {
    console.log(`Using system FHIR cache for ${packageId}@${version}`)
    return systemCache
  }

  // 3. Download
  return downloadAndExtract(packageId, version)
}
