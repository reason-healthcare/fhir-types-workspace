/**
 * Reads the version from the root package.json and writes it to every
 * publishable workspace package. Run after bumping the root version.
 *
 *   bun run version:sync
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
}

function writeJson(path: string, data: Record<string, unknown>): void {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

const rootPkg = readJson(join(root, "package.json"));
const version = rootPkg.version as string;

if (!version) {
  console.error("No version found in root package.json");
  process.exit(1);
}

const packages = ["fhir-ts-codegen", "fhir-zod"];

for (const pkg of packages) {
  const pkgPath = join(root, "packages", pkg, "package.json");
  const pkgJson = readJson(pkgPath);
  pkgJson.version = version;
  writeJson(pkgPath, pkgJson);
  console.log(`  ${pkgJson.name} → ${version}`);
}

console.log(`\nAll packages synced to ${version}`);
