import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { resolvePackageDir } from "../download/index.ts";
import { parsePackageDir } from "../parser/index.ts";
import { emitTypeScript } from "../emitter/typescript.ts";
import { emitZod } from "../emitter/zod.ts";
import { generateTestFile } from "./tests.ts";
import type { FhirVersion } from "../ir.ts";

export type EmitType = "typescript" | "zod";

export interface GenerateOptions {
  /** FHIR package ID, e.g. hl7.fhir.r4.core */
  packageId: string;
  /** Package version, e.g. 4.0.1 */
  packageVersion: string;
  /** FHIR version key for the IR model */
  fhirVersion: FhirVersion;
  /** Emit target */
  emit: EmitType;
  /** Absolute path to write the generated file */
  outFile: string;
  /** TypeScript namespace name (required when emit=typescript), e.g. fhir4 */
  namespace?: string;
  /**
   * When set, also generate a test/example file at this path.
   * - For emit=typescript: generates a DT-style type assertion file
   * Optional — omit to skip test generation.
   */
  testOutFile?: string;
  /**
   * FHIR package ID for example JSON files used in test generation.
   * Use this when examples are published as a separate FHIR npm package
   * (e.g. `hl7.fhir.r4.examples`). Must be paired with `testExamplesPackageVersion`.
   * When omitted, example files are read from the main package directory.
   */
  testExamplesPackageId?: string;
  /** Version for the examples package (e.g. `4.0.1`). */
  testExamplesPackageVersion?: string;
}

/**
 * Run a single code generation pass: download/resolve package → parse → emit → write.
 */
export async function generate(opts: GenerateOptions): Promise<void> {
  const {
    packageId,
    packageVersion,
    fhirVersion,
    emit,
    outFile,
    namespace,
    testOutFile,
    testExamplesPackageId,
    testExamplesPackageVersion,
  } = opts;

  console.log(`\n[${fhirVersion}] ${packageId}@${packageVersion} → ${emit}`);

  const packageDir = await resolvePackageDir(packageId, packageVersion);
  console.log(`  Parsing...`);

  const model = await parsePackageDir(packageDir, fhirVersion);
  console.log(`  Parsed ${model.interfaces.length} types`);

  let output: string;
  if (emit === "typescript") {
    if (!namespace) throw new Error("namespace is required for TypeScript emit");
    output = emitTypeScript(model, namespace, packageId, packageVersion);
  } else {
    output = emitZod(model);
  }

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, output);
  console.log(`  Wrote: ${outFile}`);

  if (emit === "typescript" && testOutFile && namespace) {
    const examplesDir =
      testExamplesPackageId && testExamplesPackageVersion
        ? await resolvePackageDir(testExamplesPackageId, testExamplesPackageVersion)
        : undefined;
    await generateTestFile(packageDir, fhirVersion, namespace, testOutFile, examplesDir);
  }
}
