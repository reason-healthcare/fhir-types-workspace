import type { GenerateConfig } from "@rh/fhir-ts-codegen";

const config: GenerateConfig = {
  entries: [
    {
      packageId: "hl7.fhir.r4.core",
      packageVersion: "4.0.1",
      fhirVersion: "r4",
      emit: "zod",
      outFile: "./src/r4.ts",
      testOutFile: "./examples/r4.ts",
      testImportPath: "../src/r4",
      testExamplesPackageId: "hl7.fhir.r4.examples",
      testExamplesPackageVersion: "4.0.1",
    },
    {
      packageId: "hl7.fhir.r4b.core",
      packageVersion: "4.3.0",
      fhirVersion: "r4b",
      emit: "zod",
      outFile: "./src/r4b.ts",
      testOutFile: "./examples/r4b.ts",
      testImportPath: "../src/r4b",
    },
    {
      packageId: "hl7.fhir.r5.core",
      packageVersion: "5.0.0",
      fhirVersion: "r5",
      emit: "zod",
      outFile: "./src/r5.ts",
      testOutFile: "./examples/r5.ts",
      testImportPath: "../src/r5",
    },
  ],
};

export default config;
