import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * Example file names to skip per FHIR version.
 * These are known broken or invalid examples in the official FHIR spec distributions
 * that fail TypeScript type-checking. Add entries here as new broken examples are found.
 * File names are matched case-sensitively against the sorted file list.
 */
const EXCEPTIONS: Record<string, string[]> = {
  r2: [
    "Conformance-base.json", // ConformanceRest.resource required array (R2 edge case)
    "Parameters-example.json", // Parameters.parameter[].resource typed as Resource base
    "plandefinition-example-cardiology-os.json",
    "plandefinition-example.json",
  ],
  r3: [
    "Parameters-example.json", // Parameters.parameter[].resource typed as Resource base
  ],
  r4: [
    "activitydefinition-example.json",
    "activitydefinition-predecessor-example.json",
    "activitydefinition-servicerequest-example.json",
    "examplescenario-questionnaire.json",
    "plandefinition-example-cardiology-os.json",
    "plandefinition-example.json",
  ],
  r4b: [
    "activitydefinition-example.json",
    "activitydefinition-predecessor-example.json",
    "activitydefinition-servicerequest-example.json",
    "administrableproductdefinition-example.json",
    "adverseevent-example.json",
    "examplescenario-questionnaire.json",
    "plandefinition-example-cardiology-os.json",
    "plandefinition-example.json",
    "Parameters-example.json", // Parameters.parameter[].resource typed as Resource base
  ],
  r5: [
    "documentmanifest-example.json",
    "medicationusageexample1.json",
    "questionnaireresponse-example-f201-lifelines.json",
    "Parameters-example.json", // Parameters.parameter[].resource typed as Resource base
  ],
};

/**
 * Resource types to skip entirely across all versions.
 * These types have structural issues that cause consistent type-checking failures
 * regardless of the specific example file (e.g., cross-referencing ancestor
 * backbone elements, required fields absent in most examples, or deprecated
 * type unions in polymorphic fields).
 */
const SKIP_TYPES: Record<string, string[]> = {
  r2: [
    "Questionnaire", // QuestionnaireGroupQuestion.group cross-refs ancestor backbone (R2 pattern)
    "QuestionnaireResponse", // same
    "TestScript", // TestScript.test.action uses BackboneElement without specific sub-types
  ],
  r3: [
    "ImplementationGuide", // ImplementationGuidePackage.resource required but absent
    "Linkage", // LinkageItem.resource required but absent
  ],
  r4: [
    "ImplementationGuide", // ImplementationGuideDefinition/Manifest.resource required
    "Linkage", // LinkageItem.resource required
  ],
  r4b: [
    "ImplementationGuide", // same
    "Linkage", // same
    "SearchParameter", // SearchParameter.base required but absent in many examples
    "SubscriptionTopic", // SubscriptionTopicResourceTrigger.resource required but absent
  ],
  r5: [
    "GraphDefinition", // GraphDefinitionNode.type has deprecated resource type union
    "ImplementationGuide", // ImplementationGuideManifest.resource required
    "Linkage", // LinkageItem.resource required
    "OperationDefinition", // OperationDefinitionParameter.type has deprecated resource union
    "SearchParameter", // SearchParameter deprecated resource type in constraints
  ],
};

function stripBom(s: string): string {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

function removeKeys(obj: unknown, keys: string[]): unknown {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((item) => removeKeys(item, keys));
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .filter(([k]) => !keys.includes(k))
      .map(([k, v]) => [k, removeKeys(v, keys)]),
  );
}

function cleanEmpty(obj: unknown): unknown {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    return (obj as unknown[]).map(cleanEmpty).filter((v) => v != null);
  }
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .map(([k, v]) => [k, cleanEmpty(v)] as [string, unknown])
      .filter(([, v]) => {
        if (v === null || v === undefined) return false;
        if (typeof v === "object" && !Array.isArray(v) && Object.keys(v as object).length === 0)
          return false;
        return true;
      }),
  );
}

/**
 * Generate a TypeScript test file from example JSON files.
 *
 * When the FHIR spec publishes a separate examples distribution (e.g.
 * https://hl7.org/fhir/R4/examples.zip), pass its extracted directory as
 * `examplesDir`. For all other packages the `packageDir` is used directly.
 *
 * Each example file that contains a valid FHIR resource gets one test
 * variable, numbered by its position in the sorted file list. Files in the
 * EXCEPTIONS list for the given version are skipped.
 *
 * @param packageDir   Path to the extracted FHIR package directory
 * @param version      FHIR version key (r2, r3, r4, r4b, r5)
 * @param namespace    TypeScript namespace name (e.g. fhir4)
 * @param outFile      Full path to write the generated test file
 * @param examplesDir  Optional override: directory of example JSON files
 *                     (used when examples come from a separate distribution)
 */
export async function generateTestFile(
  packageDir: string,
  version: string,
  namespace: string,
  outFile: string,
  examplesDir?: string,
): Promise<void> {
  const sourceDir = examplesDir ?? packageDir;
  const exceptions = EXCEPTIONS[version] ?? [];
  const skipTypes = new Set(SKIP_TYPES[version] ?? []);

  const files = await readdir(sourceDir);
  const sorted = files.filter((f) => f.endsWith(".json")).sort();

  const seenTypes = new Set<string>();
  const lines: string[] = [];

  for (const [i, file] of sorted.entries()) {
    if (file.endsWith(".profile.json")) continue;
    if (file.includes("diff")) continue;
    if (exceptions.includes(file)) continue;

    try {
      const raw = stripBom(await readFile(join(sourceDir, file), "utf8"));
      const resource = JSON.parse(raw) as Record<string, unknown>;
      const { resourceType } = resource;
      if (typeof resourceType !== "string") continue;
      if (resourceType === "StructureDefinition") continue;
      if (skipTypes.has(resourceType)) continue;

      // One example per resource type keeps test files a manageable size
      if (seenTypes.has(resourceType)) continue;
      seenTypes.add(resourceType);

      const cleaned = cleanEmpty(removeKeys(resource, ["fhir_comments", "contained", "entry"]));

      lines.push(`// ${file}`);
      lines.push(
        `const ${version}Test${i}: ${namespace}.${resourceType} = ${JSON.stringify(cleaned)};`,
      );
      lines.push("");
    } catch {
      // skip malformed example files
    }
  }

  lines.push("");

  await mkdir(outFile.replace(/\/[^/]+$/, ""), { recursive: true });
  await writeFile(outFile, lines.join("\n"));
  console.log(`  Wrote test file: ${outFile}`);
}
