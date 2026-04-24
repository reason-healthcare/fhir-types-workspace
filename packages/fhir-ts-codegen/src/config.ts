/** FHIR package registry base URL */
export const FHIR_REGISTRY_URL = "https://packages.fhir.org";

/** Local FHIR package cache directories (checked in order) */
export const LOCAL_FHIR_CACHE = [`${process.env.HOME}/.fhir/packages`];

/** Directory where packages are downloaded/extracted for this generator */
export const PACKAGES_DIR = new URL("../../.fhir-cache", import.meta.url).pathname;

/** DT index.d.ts header — no `// Definitions by:` block; owners live in package.json */
export const DT_HEADER = `// Type definitions for non-npm package FHIR
// Project: http://hl7.org/fhir/index.html
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
//
// Generated with https://github.com/reason-healthcare/fhir-types-workspace/tree/main/packages/fhir-ts-codegen
`;
