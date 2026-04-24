/**
 * Maps FHIR type codes to TypeScript type strings and tracks whether
 * a type is a FHIR primitive (which requires a `_fieldName?: Element` shadow).
 */

/** FHIR primitive type codes → TypeScript primitive */
const FHIR_PRIMITIVE_MAP: Record<string, string> = {
  // String-like
  string: "string",
  uri: "string",
  url: "string",
  canonical: "string",
  code: "string",
  id: "string",
  oid: "string",
  uuid: "string",
  markdown: "string",
  base64Binary: "string",
  xhtml: "string",
  // Date/time — all represented as strings in TypeScript
  date: "string",
  dateTime: "string",
  instant: "string",
  time: "string",
  // Numeric
  integer: "number",
  integer64: "string", // R5 big integer, serialized as string
  decimal: "number",
  positiveInt: "number",
  unsignedInt: "number",
  // Boolean
  boolean: "boolean",
};

/** FHIRPath system type URLs → TypeScript primitive */
const FHIRPATH_SYSTEM_MAP: Record<string, string> = {
  "http://hl7.org/fhirpath/System.String": "string",
  "http://hl7.org/fhirpath/System.DateTime": "string",
  "http://hl7.org/fhirpath/System.Date": "string",
  "http://hl7.org/fhirpath/System.Time": "string",
  "http://hl7.org/fhirpath/System.Integer": "number",
  "http://hl7.org/fhirpath/System.Decimal": "number",
  "http://hl7.org/fhirpath/System.Boolean": "boolean",
};

/** Returns true if the given FHIR type code maps to a FHIR primitive */
export function isFhirPrimitive(code: string): boolean {
  return code in FHIR_PRIMITIVE_MAP || code in FHIRPATH_SYSTEM_MAP;
}

/**
 * Maps a FHIR type code to a TypeScript type string.
 * For complex types and resources, returns the type name as-is.
 */
export function fhirTypeToTs(code: string): string {
  if (code in FHIR_PRIMITIVE_MAP) return FHIR_PRIMITIVE_MAP[code] as string;
  if (code in FHIRPATH_SYSTEM_MAP) return FHIRPATH_SYSTEM_MAP[code] as string;
  // Complex types / resources — use as-is (interface name)
  return code;
}

/**
 * Capitalises the first letter of a string segment.
 * Used for choice type expansion: `value[x]` with type `boolean` → `valueBoolean`
 */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Derives a TypeScript field name from a FHIR choice type expansion.
 * e.g. fieldName='value', fhirCode='boolean' → 'valueBoolean'
 *      fieldName='deceased', fhirCode='dateTime' → 'deceasedDateTime'
 */
export function choiceFieldName(base: string, fhirCode: string): string {
  // For FHIR primitive types use the camelCase version of the type name
  // e.g. integer → Integer, base64Binary → Base64Binary
  return base + capitalize(fhirCode);
}
