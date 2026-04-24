import type { GenerateConfig } from "@rh/fhir-generator";

const config: GenerateConfig = {
  entries: [
    {
      packageId: "hl7.fhir.r2.core",
      packageVersion: "1.0.2",
      fhirVersion: "r2",
      emit: "zod",
      outFile: "./src/r2.ts",
    },
    {
      packageId: "hl7.fhir.r3.core",
      packageVersion: "3.0.2",
      fhirVersion: "r3",
      emit: "zod",
      outFile: "./src/r3.ts",
    },
    {
      packageId: "hl7.fhir.r4.core",
      packageVersion: "4.0.1",
      fhirVersion: "r4",
      emit: "zod",
      outFile: "./src/r4.ts",
    },
    {
      packageId: "hl7.fhir.r4b.core",
      packageVersion: "4.3.0",
      fhirVersion: "r4b",
      emit: "zod",
      outFile: "./src/r4b.ts",
    },
    {
      packageId: "hl7.fhir.r5.core",
      packageVersion: "5.0.0",
      fhirVersion: "r5",
      emit: "zod",
      outFile: "./src/r5.ts",
    },
  ],
};

export default config;
