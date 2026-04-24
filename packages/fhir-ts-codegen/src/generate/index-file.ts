import { writeFile } from "node:fs/promises";
import { DT_HEADER } from "../config.ts";

export interface VersionRef {
  outputFile: string; // e.g. 'r4'
  namespace: string; // e.g. 'fhir4'
}

/**
 * Generate the DT index.d.ts that references all version declaration files.
 */
export async function generateIndexFile(versions: VersionRef[], outFile: string): Promise<void> {
  const refs = versions.map((v) => `/// <reference path="${v.outputFile}.d.ts" />`);
  const content = `${DT_HEADER + refs.join("\n")}\n`;
  await writeFile(outFile, content);
  console.log(`  Wrote index: ${outFile}`);
}
