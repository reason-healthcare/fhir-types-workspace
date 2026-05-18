import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parsePackageDir } from "../parser/index.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function writeSd(dir: string, name: string, sd: object): Promise<void> {
  await writeFile(join(dir, `StructureDefinition-${name}.json`), JSON.stringify(sd));
}

function makeConstraintSd(overrides: object) {
  return {
    resourceType: "StructureDefinition",
    id: "TestConstraint",
    url: "http://hl7.org/fhir/StructureDefinition/TestConstraint",
    name: "TestConstraint",
    kind: "complex-type",
    abstract: false,
    type: "Quantity",
    baseDefinition: "http://hl7.org/fhir/StructureDefinition/Quantity",
    derivation: "constraint",
    status: "active",
    differential: {
      element: [
        { id: "Quantity", path: "Quantity", short: "A constrained quantity" },
        { id: "Quantity.comparator", path: "Quantity.comparator", max: "0" },
      ],
    },
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("parsePackageDir", () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "fhir-ts-test-"));
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it("includes canonical FHIR constraint profiles (e.g. SimpleQuantity)", async () => {
    const sd = makeConstraintSd({
      id: "SimpleQuantity",
      url: "http://hl7.org/fhir/StructureDefinition/SimpleQuantity",
      name: "SimpleQuantity",
    });
    await writeSd(dir, "SimpleQuantity", sd);

    const model = await parsePackageDir(dir, "r4");
    const names = model.interfaces.map((i) => i.name);
    expect(names).toContain("SimpleQuantity");
  });

  it("includes canonical FHIR constraint profiles (e.g. MoneyQuantity)", async () => {
    const sd = makeConstraintSd({
      id: "MoneyQuantity",
      url: "http://hl7.org/fhir/StructureDefinition/MoneyQuantity",
      name: "MoneyQuantity",
    });
    await writeSd(dir, "MoneyQuantity", sd);

    const model = await parsePackageDir(dir, "r4");
    const names = model.interfaces.map((i) => i.name);
    expect(names).toContain("MoneyQuantity");
  });

  it("emits canonical constraint profiles as interfaces extending the base type", async () => {
    const sd = makeConstraintSd({
      id: "SimpleQuantity",
      url: "http://hl7.org/fhir/StructureDefinition/SimpleQuantity",
      name: "SimpleQuantity",
    });
    await writeSd(dir, "SimpleQuantity", sd);

    const model = await parsePackageDir(dir, "r4");
    const iface = model.interfaces.find((i) => i.name === "SimpleQuantity");
    expect(iface).toBeDefined();
    expect(iface?.extends).toBe("Quantity");
  });

  it("excludes non-canonical constraint profiles", async () => {
    const sd = makeConstraintSd({
      id: "my-profile",
      url: "http://example.org/fhir/StructureDefinition/MyProfile",
      name: "MyProfile",
    });
    await writeSd(dir, "my-profile", sd);

    const model = await parsePackageDir(dir, "r4");
    const names = model.interfaces.map((i) => i.name);
    expect(names).not.toContain("MyProfile");
  });

  it("excludes hyphenated-name constraint profiles from the FHIR namespace", async () => {
    // URLs like http://hl7.org/fhir/StructureDefinition/patient-birthPlace have
    // a lowercase or hyphenated local name — not a PascalCase type name.
    const sd = makeConstraintSd({
      id: "patient-birthPlace",
      url: "http://hl7.org/fhir/StructureDefinition/patient-birthPlace",
      name: "patient-birthPlace",
    });
    await writeSd(dir, "patient-birthPlace", sd);

    const model = await parsePackageDir(dir, "r4");
    const names = model.interfaces.map((i) => i.name);
    expect(names).not.toContain("patient-birthPlace");
  });
});
