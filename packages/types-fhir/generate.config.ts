import type { GenerateConfig } from "@rh/fhir-ts-codegen";

const config: GenerateConfig = {
  entries: [
    {
      packageId: "hl7.fhir.r2.core",
      packageVersion: "1.0.2",
      fhirVersion: "r2",
      emit: "typescript",
      namespace: "fhir2",
      outFile: "./r2.d.ts",
      testOutFile: "./test/r2-tests.ts",
      testExamplesPackageId: "hl7.fhir.r2.examples",
      testExamplesPackageVersion: "1.0.2",
    },
    {
      packageId: "hl7.fhir.r3.core",
      packageVersion: "3.0.2",
      fhirVersion: "r3",
      emit: "typescript",
      namespace: "fhir3",
      outFile: "./r3.d.ts",
      testOutFile: "./test/r3-tests.ts",
      testExamplesPackageId: "hl7.fhir.r3.examples",
      testExamplesPackageVersion: "3.0.2",
    },
    {
      packageId: "hl7.fhir.r4.core",
      packageVersion: "4.0.1",
      fhirVersion: "r4",
      emit: "typescript",
      namespace: "fhir4",
      outFile: "./r4.d.ts",
      testOutFile: "./test/r4-tests.ts",
      testExamplesPackageId: "hl7.fhir.r4.examples",
      testExamplesPackageVersion: "4.0.1",
    },
    {
      packageId: "hl7.fhir.r4b.core",
      packageVersion: "4.3.0",
      fhirVersion: "r4b",
      emit: "typescript",
      namespace: "fhir4b",
      outFile: "./r4b.d.ts",
      testOutFile: "./test/r4b-tests.ts",
      testExamplesPackageId: "hl7.fhir.r4b.examples",
      testExamplesPackageVersion: "4.3.0",
    },
    {
      packageId: "hl7.fhir.r5.core",
      packageVersion: "5.0.0",
      fhirVersion: "r5",
      emit: "typescript",
      namespace: "fhir5",
      outFile: "./r5.d.ts",
      testOutFile: "./test/r5-tests.ts",
      testExamplesPackageId: "hl7.fhir.r5.examples",
      testExamplesPackageVersion: "5.0.0",
    },
  ],
  indexOutFile: "./index.d.ts",
};

export default config;
