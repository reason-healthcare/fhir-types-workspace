import { z } from 'zod'

/**
 * Base StructureDefinition for Element Type: Base definition for all elements in a resource.
 */
export const ElementSchema = z.object({
  id: z.string().optional(),
  _id: z.lazy(() => ElementSchema).optional(),
  extension: z.lazy(() => z.array(ExtensionSchema)).optional(),
})
export type Element = z.infer<typeof ElementSchema>

/**
 * Base StructureDefinition for Coding Type: A reference to a code defined by a terminology system.
 */
export const CodingSchema = ElementSchema.extend({
  system: z.string().optional(),
  _system: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  code: z.string().optional(),
  _code: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  userSelected: z.boolean().optional(),
  _userSelected: ElementSchema.optional(),
})
export type Coding = z.infer<typeof CodingSchema>

/**
 * Base StructureDefinition for Meta Type: The metadata about a resource. This is content in the resource that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.
 */
export const MetaSchema = ElementSchema.extend({
  versionId: z.string().optional(),
  _versionId: ElementSchema.optional(),
  lastUpdated: z.string().optional(),
  _lastUpdated: ElementSchema.optional(),
  source: z.string().optional(),
  _source: ElementSchema.optional(),
  profile: z.array(z.string()).optional(),
  _profile: ElementSchema.optional(),
  security: z.array(CodingSchema).optional(),
  tag: z.array(CodingSchema).optional(),
})
export type Meta = z.infer<typeof MetaSchema>

/**
 * This is the base resource type for everything.
 */
export const ResourceSchema = z.object({
  id: z.string().optional(),
  _id: ElementSchema.optional(),
  meta: MetaSchema.optional(),
  implicitRules: z.string().optional(),
  _implicitRules: ElementSchema.optional(),
  language: z.string().optional(),
  _language: ElementSchema.optional(),
})
export type Resource = z.infer<typeof ResourceSchema>

/**
 * Base StructureDefinition for Narrative Type: A human-readable summary of the resource conveying the essential clinical and business information for the resource.
 */
export const NarrativeSchema = ElementSchema.extend({
  status: z.enum(['generated', 'extensions', 'additional', 'empty']),
  _status: ElementSchema.optional(),
  div: z.string(),
  _div: ElementSchema.optional(),
})
export type Narrative = z.infer<typeof NarrativeSchema>

/**
 * Base StructureDefinition for Period Type: A time period defined by a start and end date and optionally time.
 */
export const PeriodSchema = ElementSchema.extend({
  start: z.string().optional(),
  _start: ElementSchema.optional(),
  end: z.string().optional(),
  _end: ElementSchema.optional(),
})
export type Period = z.infer<typeof PeriodSchema>

/**
 * Base StructureDefinition for Address Type: An address expressed using postal conventions (as opposed to GPS or other location definition formats).  This data type may be used to convey addresses for use in delivering mail as well as for visiting locations which might not be valid for mail delivery.  There are a variety of postal address formats defined around the world.
 */
export const AddressSchema = ElementSchema.extend({
  use: z.enum(['home', 'work', 'temp', 'old', 'billing']).optional(),
  _use: ElementSchema.optional(),
  type: z.enum(['postal', 'physical', 'both']).optional(),
  _type: ElementSchema.optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
  line: z.array(z.string()).optional(),
  _line: ElementSchema.optional(),
  city: z.string().optional(),
  _city: ElementSchema.optional(),
  district: z.string().optional(),
  _district: ElementSchema.optional(),
  state: z.string().optional(),
  _state: ElementSchema.optional(),
  postalCode: z.string().optional(),
  _postalCode: ElementSchema.optional(),
  country: z.string().optional(),
  _country: ElementSchema.optional(),
  period: PeriodSchema.optional(),
})
export type Address = z.infer<typeof AddressSchema>

/**
 * Base StructureDefinition for Quantity Type: A measured amount (or an amount that can potentially be measured). Note that measured amounts include amounts that are not precisely quantified, including amounts involving arbitrary units and floating currencies.
 */
export const QuantitySchema = ElementSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
  comparator: z.enum(['<', '<=', '>=', '>']).optional(),
  _comparator: ElementSchema.optional(),
  unit: z.string().optional(),
  _unit: ElementSchema.optional(),
  system: z.string().optional(),
  _system: ElementSchema.optional(),
  code: z.string().optional(),
  _code: ElementSchema.optional(),
})
export type Quantity = z.infer<typeof QuantitySchema>

/**
 * Base StructureDefinition for Age Type: A duration of time during which an organism (or a process) has existed.
 */
export const AgeSchema = QuantitySchema.extend({
})
export type Age = z.infer<typeof AgeSchema>

/**
 * Base StructureDefinition for CodeableConcept Type: A concept that may be defined by a formal reference to a terminology or ontology or may be provided by text.
 */
export const CodeableConceptSchema = ElementSchema.extend({
  coding: z.array(CodingSchema).optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
})
export type CodeableConcept = z.infer<typeof CodeableConceptSchema>

/**
 * Base StructureDefinition for Identifier Type: An identifier - identifies some entity uniquely and unambiguously. Typically this is used for business identifiers.
 */
export const IdentifierSchema = ElementSchema.extend({
  use: z.enum(['usual', 'official', 'temp', 'secondary', 'old']).optional(),
  _use: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  system: z.string().optional(),
  _system: ElementSchema.optional(),
  value: z.string().optional(),
  _value: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  assigner: z.lazy(() => ReferenceSchema).optional(),
})
export type Identifier = z.infer<typeof IdentifierSchema>

/**
 * Base StructureDefinition for Reference Type: A reference from one resource to another.
 */
export const ReferenceSchema = ElementSchema.extend({
  reference: z.string().optional(),
  _reference: ElementSchema.optional(),
  type: z.string().optional(),
  _type: ElementSchema.optional(),
  identifier: IdentifierSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
})
export type Reference = z.infer<typeof ReferenceSchema>

/**
 * Base StructureDefinition for Annotation Type: A  text note which also  contains information about who made the statement and when.
 */
export const AnnotationSchema = ElementSchema.extend({
  authorReference: ReferenceSchema.optional(),
  authorString: z.string().optional(),
  _authorString: ElementSchema.optional(),
  time: z.string().optional(),
  _time: ElementSchema.optional(),
  text: z.string(),
  _text: ElementSchema.optional(),
})
export type Annotation = z.infer<typeof AnnotationSchema>

/**
 * Base StructureDefinition for Attachment Type: For referring to data content defined in other formats.
 */
export const AttachmentSchema = ElementSchema.extend({
  contentType: z.string().optional(),
  _contentType: ElementSchema.optional(),
  language: z.string().optional(),
  _language: ElementSchema.optional(),
  data: z.string().optional(),
  _data: ElementSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  size: z.number().optional(),
  _size: ElementSchema.optional(),
  hash: z.string().optional(),
  _hash: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  creation: z.string().optional(),
  _creation: ElementSchema.optional(),
})
export type Attachment = z.infer<typeof AttachmentSchema>

/**
 * Base StructureDefinition for CodeableReference Type: A reference to a resource (by instance), or instead, a reference to a concept defined in a terminology or ontology (by class).
 */
export const CodeableReferenceSchema = ElementSchema.extend({
  concept: CodeableConceptSchema.optional(),
  reference: ReferenceSchema.optional(),
})
export type CodeableReference = z.infer<typeof CodeableReferenceSchema>

/**
 * Base StructureDefinition for ContactPoint Type: Details for all kinds of technology mediated contact points for a person or organization, including telephone, email, etc.
 */
export const ContactPointSchema = ElementSchema.extend({
  system: z.enum(['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other']).optional(),
  _system: ElementSchema.optional(),
  value: z.string().optional(),
  _value: ElementSchema.optional(),
  use: z.enum(['home', 'work', 'temp', 'old', 'mobile']).optional(),
  _use: ElementSchema.optional(),
  rank: z.number().optional(),
  _rank: ElementSchema.optional(),
  period: PeriodSchema.optional(),
})
export type ContactPoint = z.infer<typeof ContactPointSchema>

/**
 * Base StructureDefinition for Count Type: A measured amount (or an amount that can potentially be measured). Note that measured amounts include amounts that are not precisely quantified, including amounts involving arbitrary units and floating currencies.
 */
export const CountSchema = QuantitySchema.extend({
})
export type Count = z.infer<typeof CountSchema>

/**
 * Base StructureDefinition for Distance Type: A length - a value with a unit that is a physical distance.
 */
export const DistanceSchema = QuantitySchema.extend({
})
export type Distance = z.infer<typeof DistanceSchema>

/**
 * Base StructureDefinition for Duration Type: A length of time.
 */
export const DurationSchema = QuantitySchema.extend({
})
export type Duration = z.infer<typeof DurationSchema>

/**
 * Base StructureDefinition for HumanName Type: A human's name with the ability to identify parts and usage.
 */
export const HumanNameSchema = ElementSchema.extend({
  use: z.enum(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden']).optional(),
  _use: ElementSchema.optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
  family: z.string().optional(),
  _family: ElementSchema.optional(),
  given: z.array(z.string()).optional(),
  _given: ElementSchema.optional(),
  prefix: z.array(z.string()).optional(),
  _prefix: ElementSchema.optional(),
  suffix: z.array(z.string()).optional(),
  _suffix: ElementSchema.optional(),
  period: PeriodSchema.optional(),
})
export type HumanName = z.infer<typeof HumanNameSchema>

/**
 * Base StructureDefinition for Money Type: An amount of economic utility in some recognized currency.
 */
export const MoneySchema = ElementSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
  currency: z.string().optional(),
  _currency: ElementSchema.optional(),
})
export type Money = z.infer<typeof MoneySchema>

/**
 * Base StructureDefinition for Range Type: A set of ordered Quantities defined by a low and high limit.
 */
export const RangeSchema = ElementSchema.extend({
  low: QuantitySchema.optional(),
  high: QuantitySchema.optional(),
})
export type Range = z.infer<typeof RangeSchema>

/**
 * Base StructureDefinition for Ratio Type: A relationship of two Quantity values - expressed as a numerator and a denominator.
 */
export const RatioSchema = ElementSchema.extend({
  numerator: QuantitySchema.optional(),
  denominator: QuantitySchema.optional(),
})
export type Ratio = z.infer<typeof RatioSchema>

/**
 * Base StructureDefinition for RatioRange Type: A range of ratios expressed as a low and high numerator and a denominator.
 */
export const RatioRangeSchema = ElementSchema.extend({
  lowNumerator: QuantitySchema.optional(),
  highNumerator: QuantitySchema.optional(),
  denominator: QuantitySchema.optional(),
})
export type RatioRange = z.infer<typeof RatioRangeSchema>

/**
 * Base StructureDefinition for SampledData Type: A series of measurements taken by a device, with upper and lower limits. There may be more than one dimension in the data.
 */
export const SampledDataSchema = ElementSchema.extend({
  origin: QuantitySchema,
  period: z.number(),
  _period: ElementSchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  lowerLimit: z.number().optional(),
  _lowerLimit: ElementSchema.optional(),
  upperLimit: z.number().optional(),
  _upperLimit: ElementSchema.optional(),
  dimensions: z.number(),
  _dimensions: ElementSchema.optional(),
  data: z.string().optional(),
  _data: ElementSchema.optional(),
})
export type SampledData = z.infer<typeof SampledDataSchema>

/**
 * Base StructureDefinition for Signature Type: A signature along with supporting context. The signature may be a digital signature that is cryptographic in nature, or some other signature acceptable to the domain. This other signature may be as simple as a graphical image representing a hand-written signature, or a signature ceremony Different signature approaches have different utilities.
 */
export const SignatureSchema = ElementSchema.extend({
  type: z.array(CodingSchema),
  when: z.string(),
  _when: ElementSchema.optional(),
  who: ReferenceSchema,
  onBehalfOf: ReferenceSchema.optional(),
  targetFormat: z.string().optional(),
  _targetFormat: ElementSchema.optional(),
  sigFormat: z.string().optional(),
  _sigFormat: ElementSchema.optional(),
  data: z.string().optional(),
  _data: ElementSchema.optional(),
})
export type Signature = z.infer<typeof SignatureSchema>

/**
 * Base StructureDefinition for BackboneElement Type: Base definition for all elements that are defined inside a resource - but not those in a data type.
 */
export const BackboneElementSchema = ElementSchema.extend({
  modifierExtension: z.lazy(() => z.array(ExtensionSchema)).optional(),
})
export type BackboneElement = z.infer<typeof BackboneElementSchema>

/**
 * When the event is to occur
 * A set of rules that describe when the event is scheduled.
 */
export const TimingRepeatSchema = BackboneElementSchema.extend({
  boundsDuration: DurationSchema.optional(),
  boundsRange: RangeSchema.optional(),
  boundsPeriod: PeriodSchema.optional(),
  count: z.number().optional(),
  _count: ElementSchema.optional(),
  countMax: z.number().optional(),
  _countMax: ElementSchema.optional(),
  duration: z.number().optional(),
  _duration: ElementSchema.optional(),
  durationMax: z.number().optional(),
  _durationMax: ElementSchema.optional(),
  durationUnit: z.enum(['s', 'min', 'h', 'd', 'wk', 'mo', 'a']).optional(),
  _durationUnit: ElementSchema.optional(),
  frequency: z.number().optional(),
  _frequency: ElementSchema.optional(),
  frequencyMax: z.number().optional(),
  _frequencyMax: ElementSchema.optional(),
  period: z.number().optional(),
  _period: ElementSchema.optional(),
  periodMax: z.number().optional(),
  _periodMax: ElementSchema.optional(),
  periodUnit: z.enum(['s', 'min', 'h', 'd', 'wk', 'mo', 'a']).optional(),
  _periodUnit: ElementSchema.optional(),
  dayOfWeek: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])).optional(),
  _dayOfWeek: ElementSchema.optional(),
  timeOfDay: z.array(z.string()).optional(),
  _timeOfDay: ElementSchema.optional(),
  when: z.array(z.enum(['MORN', 'MORN.early', 'MORN.late', 'NOON', 'AFT', 'AFT.early', 'AFT.late', 'EVE', 'EVE.early', 'EVE.late', 'NIGHT', 'PHS', 'HS', 'WAKE', 'C', 'CM', 'CD', 'CV', 'AC', 'ACM', 'ACD', 'ACV', 'PC', 'PCM', 'PCD', 'PCV'])).optional(),
  _when: ElementSchema.optional(),
  offset: z.number().optional(),
  _offset: ElementSchema.optional(),
})
export type TimingRepeat = z.infer<typeof TimingRepeatSchema>

/**
 * Base StructureDefinition for Timing Type: Specifies an event that may occur multiple times. Timing schedules are used to record when things are planned, expected or requested to occur. The most common usage is in dosage instructions for medications. They are also used when planning care of various kinds, and may be used for reporting the schedule to which past regular activities were carried out.
 */
export const TimingSchema = BackboneElementSchema.extend({
  event: z.array(z.string()).optional(),
  _event: ElementSchema.optional(),
  repeat: TimingRepeatSchema.optional(),
  code: CodeableConceptSchema.optional(),
})
export type Timing = z.infer<typeof TimingSchema>

/**
 * Base StructureDefinition for ContactDetail Type: Specifies contact information for a person or organization.
 */
export const ContactDetailSchema = ElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
})
export type ContactDetail = z.infer<typeof ContactDetailSchema>

/**
 * Base StructureDefinition for Contributor Type: A contributor to the content of a knowledge asset, including authors, editors, reviewers, and endorsers.
 */
export const ContributorSchema = ElementSchema.extend({
  type: z.enum(['author', 'editor', 'reviewer', 'endorser']),
  _type: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
})
export type Contributor = z.infer<typeof ContributorSchema>

/**
 * What codes are expected
 * Code filters specify additional constraints on the data, specifying the value set of interest for a particular element of the data. Each code filter defines an additional constraint on the data, i.e. code filters are AND'ed, not OR'ed.
 */
export const DataRequirementCodeFilterSchema = BackboneElementSchema.extend({
  path: z.string().optional(),
  _path: ElementSchema.optional(),
  searchParam: z.string().optional(),
  _searchParam: ElementSchema.optional(),
  valueSet: z.string().optional(),
  _valueSet: ElementSchema.optional(),
  code: z.array(CodingSchema).optional(),
})
export type DataRequirementCodeFilter = z.infer<typeof DataRequirementCodeFilterSchema>

/**
 * What dates/date ranges are expected
 * Date filters specify additional constraints on the data in terms of the applicable date range for specific elements. Each date filter specifies an additional constraint on the data, i.e. date filters are AND'ed, not OR'ed.
 */
export const DataRequirementDateFilterSchema = BackboneElementSchema.extend({
  path: z.string().optional(),
  _path: ElementSchema.optional(),
  searchParam: z.string().optional(),
  _searchParam: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valuePeriod: PeriodSchema.optional(),
  valueDuration: DurationSchema.optional(),
})
export type DataRequirementDateFilter = z.infer<typeof DataRequirementDateFilterSchema>

/**
 * Order of the results
 * Specifies the order of the results to be returned.
 * This element can be used in combination with the sort element to specify quota requirements such as "the most recent 5" or "the highest 5". When multiple sorts are specified, they are applied in the order they appear in the resource.
 */
export const DataRequirementSortSchema = BackboneElementSchema.extend({
  path: z.string(),
  _path: ElementSchema.optional(),
  direction: z.enum(['ascending', 'descending']),
  _direction: ElementSchema.optional(),
})
export type DataRequirementSort = z.infer<typeof DataRequirementSortSchema>

/**
 * Base StructureDefinition for DataRequirement Type: Describes a required data item for evaluation in terms of the type of data, and optional code or date-based filters of the data.
 */
export const DataRequirementSchema = ElementSchema.extend({
  type: z.enum(['Address', 'Age', 'Annotation', 'Attachment', 'BackboneElement', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'Count', 'DataRequirement', 'Distance', 'Dosage', 'Duration', 'Element', 'ElementDefinition', 'Expression', 'Extension', 'HumanName', 'Identifier', 'MarketingStatus', 'Meta', 'Money', 'MoneyQuantity', 'Narrative', 'ParameterDefinition', 'Period', 'Population', 'ProdCharacteristic', 'ProductShelfLife', 'Quantity', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'SimpleQuantity', 'Timing', 'TriggerDefinition', 'UsageContext', 'base64Binary', 'boolean', 'canonical', 'code', 'date', 'dateTime', 'decimal', 'id', 'instant', 'integer', 'markdown', 'oid', 'positiveInt', 'string', 'time', 'unsignedInt', 'uri', 'url', 'uuid', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters', 'Type', 'Any']),
  _type: ElementSchema.optional(),
  profile: z.array(z.string()).optional(),
  _profile: ElementSchema.optional(),
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  mustSupport: z.array(z.string()).optional(),
  _mustSupport: ElementSchema.optional(),
  codeFilter: z.array(DataRequirementCodeFilterSchema).optional(),
  dateFilter: z.array(DataRequirementDateFilterSchema).optional(),
  limit: z.number().optional(),
  _limit: ElementSchema.optional(),
  sort: z.array(DataRequirementSortSchema).optional(),
})
export type DataRequirement = z.infer<typeof DataRequirementSchema>

/**
 * Base StructureDefinition for Expression Type: A expression that is evaluated in a specified context and returns a value. The context of use of the expression must specify the context in which the expression is evaluated, and how the result of the expression is used.
 */
export const ExpressionSchema = ElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  language: z.string(),
  _language: ElementSchema.optional(),
  expression: z.string().optional(),
  _expression: ElementSchema.optional(),
  reference: z.string().optional(),
  _reference: ElementSchema.optional(),
})
export type Expression = z.infer<typeof ExpressionSchema>

/**
 * Base StructureDefinition for ParameterDefinition Type: The parameters to the module. This collection specifies both the input and output parameters. Input parameters are provided by the caller as part of the $evaluate operation. Output parameters are included in the GuidanceResponse.
 */
export const ParameterDefinitionSchema = ElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  use: z.enum(['in', 'out']),
  _use: ElementSchema.optional(),
  min: z.number().optional(),
  _min: ElementSchema.optional(),
  max: z.string().optional(),
  _max: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  type: z.enum(['Address', 'Age', 'Annotation', 'Attachment', 'BackboneElement', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'Count', 'DataRequirement', 'Distance', 'Dosage', 'Duration', 'Element', 'ElementDefinition', 'Expression', 'Extension', 'HumanName', 'Identifier', 'MarketingStatus', 'Meta', 'Money', 'MoneyQuantity', 'Narrative', 'ParameterDefinition', 'Period', 'Population', 'ProdCharacteristic', 'ProductShelfLife', 'Quantity', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'SimpleQuantity', 'Timing', 'TriggerDefinition', 'UsageContext', 'base64Binary', 'boolean', 'canonical', 'code', 'date', 'dateTime', 'decimal', 'id', 'instant', 'integer', 'markdown', 'oid', 'positiveInt', 'string', 'time', 'unsignedInt', 'uri', 'url', 'uuid', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters', 'Type', 'Any']),
  _type: ElementSchema.optional(),
  profile: z.string().optional(),
  _profile: ElementSchema.optional(),
})
export type ParameterDefinition = z.infer<typeof ParameterDefinitionSchema>

/**
 * Base StructureDefinition for RelatedArtifact Type: Related artifacts such as additional documentation, justification, or bibliographic references.
 */
export const RelatedArtifactSchema = ElementSchema.extend({
  type: z.enum(['documentation', 'justification', 'citation', 'predecessor', 'successor', 'derived-from', 'depends-on', 'composed-of']),
  _type: ElementSchema.optional(),
  label: z.string().optional(),
  _label: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  citation: z.string().optional(),
  _citation: ElementSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  document: AttachmentSchema.optional(),
  resource: z.string().optional(),
  _resource: ElementSchema.optional(),
})
export type RelatedArtifact = z.infer<typeof RelatedArtifactSchema>

/**
 * Base StructureDefinition for TriggerDefinition Type: A description of a triggering event. Triggering events can be named events, data events, or periodic, as determined by the type element.
 */
export const TriggerDefinitionSchema = ElementSchema.extend({
  type: z.enum(['named-event', 'periodic', 'data-changed', 'data-added', 'data-modified', 'data-removed', 'data-accessed', 'data-access-ended']),
  _type: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  timingTiming: TimingSchema.optional(),
  timingReference: ReferenceSchema.optional(),
  timingDate: z.string().optional(),
  _timingDate: ElementSchema.optional(),
  timingDateTime: z.string().optional(),
  _timingDateTime: ElementSchema.optional(),
  data: z.array(DataRequirementSchema).optional(),
  condition: ExpressionSchema.optional(),
})
export type TriggerDefinition = z.infer<typeof TriggerDefinitionSchema>

/**
 * Base StructureDefinition for UsageContext Type: Specifies clinical/business/etc. metadata that can be used to retrieve, index and/or categorize an artifact. This metadata can either be specific to the applicable population (e.g., age category, DRG) or the specific context of care (e.g., venue, care setting, provider of care).
 */
export const UsageContextSchema = ElementSchema.extend({
  code: CodingSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueReference: ReferenceSchema.optional(),
})
export type UsageContext = z.infer<typeof UsageContextSchema>

/**
 * Amount of medication administered
 * The amount of medication administered.
 */
export const DosageDoseAndRateSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  doseRange: RangeSchema.optional(),
  doseQuantity: QuantitySchema.optional(),
  rateRatio: RatioSchema.optional(),
  rateRange: RangeSchema.optional(),
  rateQuantity: QuantitySchema.optional(),
})
export type DosageDoseAndRate = z.infer<typeof DosageDoseAndRateSchema>

/**
 * Base StructureDefinition for Dosage Type: Indicates how the medication is/was taken or should be taken by the patient.
 */
export const DosageSchema = BackboneElementSchema.extend({
  sequence: z.number().optional(),
  _sequence: ElementSchema.optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
  additionalInstruction: z.array(CodeableConceptSchema).optional(),
  patientInstruction: z.string().optional(),
  _patientInstruction: ElementSchema.optional(),
  timing: TimingSchema.optional(),
  asNeededBoolean: z.boolean().optional(),
  _asNeededBoolean: ElementSchema.optional(),
  asNeededCodeableConcept: CodeableConceptSchema.optional(),
  site: CodeableConceptSchema.optional(),
  route: CodeableConceptSchema.optional(),
  method: CodeableConceptSchema.optional(),
  doseAndRate: z.array(DosageDoseAndRateSchema).optional(),
  maxDosePerPeriod: RatioSchema.optional(),
  maxDosePerAdministration: QuantitySchema.optional(),
  maxDosePerLifetime: QuantitySchema.optional(),
})
export type Dosage = z.infer<typeof DosageSchema>

/**
 * Base StructureDefinition for Extension Type: Optional Extension Element - found in all resources.
 */
export const ExtensionSchema = ElementSchema.extend({
  url: z.string(),
  _url: ElementSchema.optional(),
  valueBase64Binary: z.string().optional(),
  _valueBase64Binary: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueCanonical: z.string().optional(),
  _valueCanonical: ElementSchema.optional(),
  valueCode: z.string().optional(),
  _valueCode: ElementSchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
  valueId: z.string().optional(),
  _valueId: ElementSchema.optional(),
  valueInstant: z.string().optional(),
  _valueInstant: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueMarkdown: z.string().optional(),
  _valueMarkdown: ElementSchema.optional(),
  valueOid: z.string().optional(),
  _valueOid: ElementSchema.optional(),
  valuePositiveInt: z.number().optional(),
  _valuePositiveInt: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueUnsignedInt: z.number().optional(),
  _valueUnsignedInt: ElementSchema.optional(),
  valueUri: z.string().optional(),
  _valueUri: ElementSchema.optional(),
  valueUrl: z.string().optional(),
  _valueUrl: ElementSchema.optional(),
  valueUuid: z.string().optional(),
  _valueUuid: ElementSchema.optional(),
  valueAddress: AddressSchema.optional(),
  valueAge: AgeSchema.optional(),
  valueAnnotation: AnnotationSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueCodeableReference: CodeableReferenceSchema.optional(),
  valueCoding: CodingSchema.optional(),
  valueContactPoint: ContactPointSchema.optional(),
  valueCount: CountSchema.optional(),
  valueDistance: DistanceSchema.optional(),
  valueDuration: DurationSchema.optional(),
  valueHumanName: HumanNameSchema.optional(),
  valueIdentifier: IdentifierSchema.optional(),
  valueMoney: MoneySchema.optional(),
  valuePeriod: PeriodSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueRatioRange: RatioRangeSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  valueSampledData: SampledDataSchema.optional(),
  valueSignature: SignatureSchema.optional(),
  valueTiming: TimingSchema.optional(),
  valueContactDetail: ContactDetailSchema.optional(),
  valueContributor: ContributorSchema.optional(),
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueDosage: DosageSchema.optional(),
})
export type Extension = z.infer<typeof ExtensionSchema>

/**
 * A resource that includes narrative, extensions, and contained resources.
 */
export const DomainResourceSchema = ResourceSchema.extend({
  text: NarrativeSchema.optional(),
  contained: z.array(ResourceSchema).optional(),
  extension: z.array(ExtensionSchema).optional(),
  modifierExtension: z.array(ExtensionSchema).optional(),
})
export type DomainResource = z.infer<typeof DomainResourceSchema>

/**
 * Query based trigger rule
 * The FHIR query based rules that the server should use to determine when to trigger a notification for this subscription topic.
 */
export const SubscriptionTopicResourceTriggerQueryCriteriaSchema = BackboneElementSchema.extend({
  previous: z.string().optional(),
  _previous: ElementSchema.optional(),
  resultForCreate: z.enum(['test-passes', 'test-fails']).optional(),
  _resultForCreate: ElementSchema.optional(),
  current: z.string().optional(),
  _current: ElementSchema.optional(),
  resultForDelete: z.enum(['test-passes', 'test-fails']).optional(),
  _resultForDelete: ElementSchema.optional(),
  requireBoth: z.boolean().optional(),
  _requireBoth: ElementSchema.optional(),
})
export type SubscriptionTopicResourceTriggerQueryCriteria = z.infer<typeof SubscriptionTopicResourceTriggerQueryCriteriaSchema>

/**
 * Definition of a resource-based trigger for the subscription topic
 * A definition of a resource-based event that triggers a notification based on the SubscriptionTopic. The criteria may be just a human readable description and/or a full FHIR search string or FHIRPath expression. Multiple triggers are considered OR joined (e.g., a resource update matching ANY of the definitions will trigger a notification).
 */
export const SubscriptionTopicResourceTriggerSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  resource: z.string(),
  _resource: ElementSchema.optional(),
  supportedInteraction: z.array(z.enum(['create', 'update', 'delete'])).optional(),
  _supportedInteraction: ElementSchema.optional(),
  queryCriteria: SubscriptionTopicResourceTriggerQueryCriteriaSchema.optional(),
  fhirPathCriteria: z.string().optional(),
  _fhirPathCriteria: ElementSchema.optional(),
})
export type SubscriptionTopicResourceTrigger = z.infer<typeof SubscriptionTopicResourceTriggerSchema>

/**
 * Event definitions the SubscriptionTopic
 * Event definition which can be used to trigger the SubscriptionTopic.
 */
export const SubscriptionTopicEventTriggerSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  event: CodeableConceptSchema,
  resource: z.string(),
  _resource: ElementSchema.optional(),
})
export type SubscriptionTopicEventTrigger = z.infer<typeof SubscriptionTopicEventTriggerSchema>

/**
 * Properties by which a Subscription can filter notifications from the SubscriptionTopic
 * List of properties by which Subscriptions on the SubscriptionTopic can be filtered. May be defined Search Parameters (e.g., Encounter.patient) or parameters defined within this SubscriptionTopic context (e.g., hub.event).
 */
export const SubscriptionTopicCanFilterBySchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  resource: z.string().optional(),
  _resource: ElementSchema.optional(),
  filterParameter: z.string(),
  _filterParameter: ElementSchema.optional(),
  filterDefinition: z.string().optional(),
  _filterDefinition: ElementSchema.optional(),
  modifier: z.array(z.enum(['=', 'eq', 'ne', 'gt', 'lt', 'ge', 'le', 'sa', 'eb', 'ap', 'above', 'below', 'in', 'not-in', 'of-type'])).optional(),
  _modifier: ElementSchema.optional(),
})
export type SubscriptionTopicCanFilterBy = z.infer<typeof SubscriptionTopicCanFilterBySchema>

/**
 * Properties for describing the shape of notifications generated by this topic
 * List of properties to describe the shape (e.g., resources) included in notifications from this Subscription Topic.
 */
export const SubscriptionTopicNotificationShapeSchema = BackboneElementSchema.extend({
  resource: z.string(),
  _resource: ElementSchema.optional(),
  include: z.array(z.string()).optional(),
  _include: ElementSchema.optional(),
  revInclude: z.array(z.string()).optional(),
  _revInclude: ElementSchema.optional(),
})
export type SubscriptionTopicNotificationShape = z.infer<typeof SubscriptionTopicNotificationShapeSchema>

/**
 * Describes a stream of resource state changes identified by trigger criteria and annotated with labels useful to filter projections from this topic.
 */
export const SubscriptionTopicSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SubscriptionTopic'),
  url: z.string(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  derivedFrom: z.array(z.string()).optional(),
  _derivedFrom: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  resourceTrigger: z.array(SubscriptionTopicResourceTriggerSchema).optional(),
  eventTrigger: z.array(SubscriptionTopicEventTriggerSchema).optional(),
  canFilterBy: z.array(SubscriptionTopicCanFilterBySchema).optional(),
  notificationShape: z.array(SubscriptionTopicNotificationShapeSchema).optional(),
})
export type SubscriptionTopic = z.infer<typeof SubscriptionTopicSchema>

/**
 * Base StructureDefinition for uri Type: String of characters used to identify a name or a resource
 */
export const uriSchema = ElementSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type uri = z.infer<typeof uriSchema>

/**
 * Base StructureDefinition for oid type: An OID represented as a URI
 */
export const oidSchema = uriSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type oid = z.infer<typeof oidSchema>

/**
 * A record of a device being used by a patient where the record is the result of a report from the patient or another clinician.
 */
export const DeviceUseStatementSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceUseStatement'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  status: z.enum(['active', 'completed', 'entered-in-error', 'intended', 'stopped', 'on-hold']),
  _status: ElementSchema.optional(),
  subject: ReferenceSchema,
  derivedFrom: z.array(ReferenceSchema).optional(),
  timingTiming: TimingSchema.optional(),
  timingPeriod: PeriodSchema.optional(),
  timingDateTime: z.string().optional(),
  _timingDateTime: ElementSchema.optional(),
  recordedOn: z.string().optional(),
  _recordedOn: ElementSchema.optional(),
  source: ReferenceSchema.optional(),
  device: ReferenceSchema,
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  bodySite: CodeableConceptSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type DeviceUseStatement = z.infer<typeof DeviceUseStatementSchema>

/**
 * Record details about an anatomical structure.  This resource may be used when a coded concept does not provide the necessary detail needed for the use case.
 */
export const BodyStructureSchema = DomainResourceSchema.extend({
  resourceType: z.literal('BodyStructure'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  morphology: CodeableConceptSchema.optional(),
  location: CodeableConceptSchema.optional(),
  locationQualifier: z.array(CodeableConceptSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  image: z.array(AttachmentSchema).optional(),
  patient: ReferenceSchema,
})
export type BodyStructure = z.infer<typeof BodyStructureSchema>

/**
 * Actor participating in the resource
 */
export const ExampleScenarioActorSchema = BackboneElementSchema.extend({
  actorId: z.string(),
  _actorId: ElementSchema.optional(),
  type: z.enum(['person', 'entity']),
  _type: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type ExampleScenarioActor = z.infer<typeof ExampleScenarioActorSchema>

/**
 * A specific version of the resource
 */
export const ExampleScenarioInstanceVersionSchema = BackboneElementSchema.extend({
  versionId: z.string(),
  _versionId: ElementSchema.optional(),
  description: z.string(),
  _description: ElementSchema.optional(),
})
export type ExampleScenarioInstanceVersion = z.infer<typeof ExampleScenarioInstanceVersionSchema>

/**
 * Resources contained in the instance
 * Resources contained in the instance (e.g. the observations contained in a bundle).
 */
export interface ExampleScenarioInstanceContainedInstance extends BackboneElement {
  resourceId: string
  _resourceId?: Element | undefined
  versionId?: string | undefined
  _versionId?: Element | undefined
}

export const ExampleScenarioInstanceContainedInstanceSchema: z.ZodType<ExampleScenarioInstanceContainedInstance> = z.lazy(() =>
  BackboneElementSchema.extend({
    resourceId: z.string(),
      _resourceId: ElementSchema.optional(),
    versionId: z.string().optional(),
      _versionId: ElementSchema.optional(),
  })
)

/**
 * Each resource and each version that is present in the workflow
 */
export const ExampleScenarioInstanceSchema = BackboneElementSchema.extend({
  resourceId: z.string(),
  _resourceId: ElementSchema.optional(),
  resourceType: z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']),
  _resourceType: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  version: z.array(ExampleScenarioInstanceVersionSchema).optional(),
  containedInstance: z.array(ExampleScenarioInstanceContainedInstanceSchema).optional(),
})
export type ExampleScenarioInstance = z.infer<typeof ExampleScenarioInstanceSchema>

/**
 * Each interaction or action
 */
export const ExampleScenarioProcessStepOperationSchema = BackboneElementSchema.extend({
  number: z.string(),
  _number: ElementSchema.optional(),
  type: z.string().optional(),
  _type: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  initiator: z.string().optional(),
  _initiator: ElementSchema.optional(),
  receiver: z.string().optional(),
  _receiver: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  initiatorActive: z.boolean().optional(),
  _initiatorActive: ElementSchema.optional(),
  receiverActive: z.boolean().optional(),
  _receiverActive: ElementSchema.optional(),
  request: z.lazy(() => ExampleScenarioInstanceContainedInstanceSchema).optional(),
  response: z.lazy(() => ExampleScenarioInstanceContainedInstanceSchema).optional(),
})
export type ExampleScenarioProcessStepOperation = z.infer<typeof ExampleScenarioProcessStepOperationSchema>

/**
 * Alternate non-typical step action
 * Indicates an alternative step that can be taken instead of the operations on the base step in exceptional/atypical circumstances.
 */
export const ExampleScenarioProcessStepAlternativeSchema = BackboneElementSchema.extend({
  title: z.string(),
  _title: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  step: z.lazy(() => z.array(ExampleScenarioProcessStepSchema)).optional(),
})
export type ExampleScenarioProcessStepAlternative = z.infer<typeof ExampleScenarioProcessStepAlternativeSchema>

/**
 * Each step of the process
 */
export interface ExampleScenarioProcessStep extends BackboneElement {
  process?: ExampleScenarioProcess[] | undefined
  pause?: boolean | undefined
  _pause?: Element | undefined
  operation?: ExampleScenarioProcessStepOperation | undefined
  alternative?: ExampleScenarioProcessStepAlternative[] | undefined
}

export const ExampleScenarioProcessStepSchema: z.ZodType<ExampleScenarioProcessStep> = z.lazy(() =>
  BackboneElementSchema.extend({
    process: z.lazy(() => z.array(ExampleScenarioProcessSchema)).optional(),
    pause: z.boolean().optional(),
      _pause: ElementSchema.optional(),
    operation: ExampleScenarioProcessStepOperationSchema.optional(),
    alternative: z.array(ExampleScenarioProcessStepAlternativeSchema).optional(),
  })
)

/**
 * Each major process - a group of operations
 */
export interface ExampleScenarioProcess extends BackboneElement {
  title: string
  _title?: Element | undefined
  description?: string | undefined
  _description?: Element | undefined
  preConditions?: string | undefined
  _preConditions?: Element | undefined
  postConditions?: string | undefined
  _postConditions?: Element | undefined
  step?: ExampleScenarioProcessStep[] | undefined
}

export const ExampleScenarioProcessSchema: z.ZodType<ExampleScenarioProcess> = z.lazy(() =>
  BackboneElementSchema.extend({
    title: z.string(),
      _title: ElementSchema.optional(),
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    preConditions: z.string().optional(),
      _preConditions: ElementSchema.optional(),
    postConditions: z.string().optional(),
      _postConditions: ElementSchema.optional(),
    step: z.array(ExampleScenarioProcessStepSchema).optional(),
  })
)

/**
 * Example of workflow instance.
 */
export const ExampleScenarioSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ExampleScenario'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  actor: z.array(ExampleScenarioActorSchema).optional(),
  instance: z.array(ExampleScenarioInstanceSchema).optional(),
  process: z.array(ExampleScenarioProcessSchema).optional(),
  workflow: z.array(z.string()).optional(),
  _workflow: ElementSchema.optional(),
})
export type ExampleScenario = z.infer<typeof ExampleScenarioSchema>

/**
 * Participants involved in appointment
 * List of participants involved in the appointment.
 */
export const AppointmentParticipantSchema = BackboneElementSchema.extend({
  type: z.array(CodeableConceptSchema).optional(),
  actor: ReferenceSchema.optional(),
  required: z.enum(['required', 'optional', 'information-only']).optional(),
  _required: ElementSchema.optional(),
  status: z.enum(['accepted', 'declined', 'tentative', 'needs-action']),
  _status: ElementSchema.optional(),
  period: PeriodSchema.optional(),
})
export type AppointmentParticipant = z.infer<typeof AppointmentParticipantSchema>

/**
 * A booking of a healthcare event among patient(s), practitioner(s), related person(s) and/or device(s) for a specific date/time. This may result in one or more Encounter(s).
 */
export const AppointmentSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Appointment'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['proposed', 'pending', 'booked', 'arrived', 'fulfilled', 'cancelled', 'noshow', 'entered-in-error', 'checked-in', 'waitlist']),
  _status: ElementSchema.optional(),
  cancelationReason: CodeableConceptSchema.optional(),
  serviceCategory: z.array(CodeableConceptSchema).optional(),
  serviceType: z.array(CodeableConceptSchema).optional(),
  specialty: z.array(CodeableConceptSchema).optional(),
  appointmentType: CodeableConceptSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  priority: z.number().optional(),
  _priority: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  start: z.string().optional(),
  _start: ElementSchema.optional(),
  end: z.string().optional(),
  _end: ElementSchema.optional(),
  minutesDuration: z.number().optional(),
  _minutesDuration: ElementSchema.optional(),
  slot: z.array(ReferenceSchema).optional(),
  created: z.string().optional(),
  _created: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  patientInstruction: z.string().optional(),
  _patientInstruction: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  participant: z.array(AppointmentParticipantSchema),
  requestedPeriod: z.array(PeriodSchema).optional(),
})
export type Appointment = z.infer<typeof AppointmentSchema>

/**
 * Stage/grade, usually assessed formally
 * Clinical stage or grade of a condition. May include formal severity assessments.
 */
export const ConditionStageSchema = BackboneElementSchema.extend({
  summary: CodeableConceptSchema.optional(),
  assessment: z.array(ReferenceSchema).optional(),
  type: CodeableConceptSchema.optional(),
})
export type ConditionStage = z.infer<typeof ConditionStageSchema>

/**
 * Supporting evidence
 * Supporting evidence / manifestations that are the basis of the Condition's verification status, such as evidence that confirmed or refuted the condition.
 * The evidence may be a simple list of coded symptoms/manifestations, or references to observations or formal assessments, or both.
 */
export const ConditionEvidenceSchema = BackboneElementSchema.extend({
  code: z.array(CodeableConceptSchema).optional(),
  detail: z.array(ReferenceSchema).optional(),
})
export type ConditionEvidence = z.infer<typeof ConditionEvidenceSchema>

/**
 * A clinical condition, problem, diagnosis, or other event, situation, issue, or clinical concept that has risen to a level of concern.
 */
export const ConditionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Condition'),
  identifier: z.array(IdentifierSchema).optional(),
  clinicalStatus: CodeableConceptSchema.optional(),
  verificationStatus: CodeableConceptSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  severity: CodeableConceptSchema.optional(),
  code: CodeableConceptSchema.optional(),
  bodySite: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  onsetDateTime: z.string().optional(),
  _onsetDateTime: ElementSchema.optional(),
  onsetAge: AgeSchema.optional(),
  onsetPeriod: PeriodSchema.optional(),
  onsetRange: RangeSchema.optional(),
  onsetString: z.string().optional(),
  _onsetString: ElementSchema.optional(),
  abatementDateTime: z.string().optional(),
  _abatementDateTime: ElementSchema.optional(),
  abatementAge: AgeSchema.optional(),
  abatementPeriod: PeriodSchema.optional(),
  abatementRange: RangeSchema.optional(),
  abatementString: z.string().optional(),
  _abatementString: ElementSchema.optional(),
  recordedDate: z.string().optional(),
  _recordedDate: ElementSchema.optional(),
  recorder: ReferenceSchema.optional(),
  asserter: ReferenceSchema.optional(),
  stage: z.array(ConditionStageSchema).optional(),
  evidence: z.array(ConditionEvidenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type Condition = z.infer<typeof ConditionSchema>

/**
 * Entries in the list
 * Entries in this list.
 * If there are no entries in the list, an emptyReason SHOULD be provided.
 */
export const ListEntrySchema = BackboneElementSchema.extend({
  flag: CodeableConceptSchema.optional(),
  deleted: z.boolean().optional(),
  _deleted: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  item: ReferenceSchema,
})
export type ListEntry = z.infer<typeof ListEntrySchema>

/**
 * A list is a curated collection of resources.
 */
export const ListSchema = DomainResourceSchema.extend({
  resourceType: z.literal('List'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['current', 'retired', 'entered-in-error']),
  _status: ElementSchema.optional(),
  mode: z.enum(['working', 'snapshot', 'changes']),
  _mode: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  source: ReferenceSchema.optional(),
  orderedBy: CodeableConceptSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  entry: z.array(ListEntrySchema).optional(),
  emptyReason: CodeableConceptSchema.optional(),
})
export type List = z.infer<typeof ListSchema>

/**
 * Who performed charged service
 * Indicates who or what performed or participated in the charged service.
 */
export const ChargeItemPerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type ChargeItemPerformer = z.infer<typeof ChargeItemPerformerSchema>

/**
 * The resource ChargeItem describes the provision of healthcare provider products for a certain patient, therefore referring not only to the product, but containing in addition details of the provision, like date, time, amounts and participating organizations and persons. Main Usage of the ChargeItem is to enable the billing process and internal cost allocation.
 */
export const ChargeItemSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ChargeItem'),
  identifier: z.array(IdentifierSchema).optional(),
  definitionUri: z.array(z.string()).optional(),
  _definitionUri: ElementSchema.optional(),
  definitionCanonical: z.array(z.string()).optional(),
  _definitionCanonical: ElementSchema.optional(),
  status: z.enum(['planned', 'billable', 'not-billable', 'aborted', 'billed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  partOf: z.array(ReferenceSchema).optional(),
  code: CodeableConceptSchema,
  subject: ReferenceSchema,
  context: ReferenceSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  occurrenceTiming: TimingSchema.optional(),
  performer: z.array(ChargeItemPerformerSchema).optional(),
  performingOrganization: ReferenceSchema.optional(),
  requestingOrganization: ReferenceSchema.optional(),
  costCenter: ReferenceSchema.optional(),
  quantity: QuantitySchema.optional(),
  bodysite: z.array(CodeableConceptSchema).optional(),
  factorOverride: z.number().optional(),
  _factorOverride: ElementSchema.optional(),
  priceOverride: MoneySchema.optional(),
  overrideReason: z.string().optional(),
  _overrideReason: ElementSchema.optional(),
  enterer: ReferenceSchema.optional(),
  enteredDate: z.string().optional(),
  _enteredDate: ElementSchema.optional(),
  reason: z.array(CodeableConceptSchema).optional(),
  service: z.array(ReferenceSchema).optional(),
  productReference: ReferenceSchema.optional(),
  productCodeableConcept: CodeableConceptSchema.optional(),
  account: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
})
export type ChargeItem = z.infer<typeof ChargeItemSchema>

/**
 * Information about the primary source(s) involved in validation
 */
export const VerificationResultPrimarySourceSchema = BackboneElementSchema.extend({
  who: ReferenceSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  communicationMethod: z.array(CodeableConceptSchema).optional(),
  validationStatus: CodeableConceptSchema.optional(),
  validationDate: z.string().optional(),
  _validationDate: ElementSchema.optional(),
  canPushUpdates: CodeableConceptSchema.optional(),
  pushTypeAvailable: z.array(CodeableConceptSchema).optional(),
})
export type VerificationResultPrimarySource = z.infer<typeof VerificationResultPrimarySourceSchema>

/**
 * Information about the entity attesting to information
 */
export const VerificationResultAttestationSchema = BackboneElementSchema.extend({
  who: ReferenceSchema.optional(),
  onBehalfOf: ReferenceSchema.optional(),
  communicationMethod: CodeableConceptSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  sourceIdentityCertificate: z.string().optional(),
  _sourceIdentityCertificate: ElementSchema.optional(),
  proxyIdentityCertificate: z.string().optional(),
  _proxyIdentityCertificate: ElementSchema.optional(),
  proxySignature: SignatureSchema.optional(),
  sourceSignature: SignatureSchema.optional(),
})
export type VerificationResultAttestation = z.infer<typeof VerificationResultAttestationSchema>

/**
 * Information about the entity validating information
 */
export const VerificationResultValidatorSchema = BackboneElementSchema.extend({
  organization: ReferenceSchema,
  identityCertificate: z.string().optional(),
  _identityCertificate: ElementSchema.optional(),
  attestationSignature: SignatureSchema.optional(),
})
export type VerificationResultValidator = z.infer<typeof VerificationResultValidatorSchema>

/**
 * Describes validation requirements, source(s), status and dates for one or more elements.
 */
export const VerificationResultSchema = DomainResourceSchema.extend({
  resourceType: z.literal('VerificationResult'),
  target: z.array(ReferenceSchema).optional(),
  targetLocation: z.array(z.string()).optional(),
  _targetLocation: ElementSchema.optional(),
  need: CodeableConceptSchema.optional(),
  status: z.enum(['attested', 'validated', 'in-process', 'req-revalid', 'val-fail', 'reval-fail']),
  _status: ElementSchema.optional(),
  statusDate: z.string().optional(),
  _statusDate: ElementSchema.optional(),
  validationType: CodeableConceptSchema.optional(),
  validationProcess: z.array(CodeableConceptSchema).optional(),
  frequency: TimingSchema.optional(),
  lastPerformed: z.string().optional(),
  _lastPerformed: ElementSchema.optional(),
  nextScheduled: z.string().optional(),
  _nextScheduled: ElementSchema.optional(),
  failureAction: CodeableConceptSchema.optional(),
  primarySource: z.array(VerificationResultPrimarySourceSchema).optional(),
  attestation: VerificationResultAttestationSchema.optional(),
  validator: z.array(VerificationResultValidatorSchema).optional(),
})
export type VerificationResult = z.infer<typeof VerificationResultSchema>

/**
 * A photo, video, or audio recording acquired or used in healthcare. The actual content may be inline or provided by direct reference.
 */
export const MediaSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Media'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['preparation', 'in-progress', 'not-done', 'on-hold', 'stopped', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  modality: CodeableConceptSchema.optional(),
  view: CodeableConceptSchema.optional(),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  createdDateTime: z.string().optional(),
  _createdDateTime: ElementSchema.optional(),
  createdPeriod: PeriodSchema.optional(),
  issued: z.string().optional(),
  _issued: ElementSchema.optional(),
  operator: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  bodySite: CodeableConceptSchema.optional(),
  deviceName: z.string().optional(),
  _deviceName: ElementSchema.optional(),
  device: ReferenceSchema.optional(),
  height: z.number().optional(),
  _height: ElementSchema.optional(),
  width: z.number().optional(),
  _width: ElementSchema.optional(),
  frames: z.number().optional(),
  _frames: ElementSchema.optional(),
  duration: z.number().optional(),
  _duration: ElementSchema.optional(),
  content: AttachmentSchema,
  note: z.array(AnnotationSchema).optional(),
})
export type Media = z.infer<typeof MediaSchema>

/**
 * Base StructureDefinition for string Type: A sequence of Unicode characters
 */
export const stringSchema = ElementSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type string = z.infer<typeof stringSchema>

/**
 * Base StructureDefinition for id type: Any combination of letters, numerals, "-" and ".", with a length limit of 64 characters.  (This might be an integer, an unprefixed OID, UUID or any other identifier pattern that meets these constraints.)  Ids are case-insensitive.
 */
export const idSchema = stringSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type id = z.infer<typeof idSchema>

/**
 * The item that is delivered or supplied
 * The item that is being delivered or has been supplied.
 */
export const SupplyDeliverySuppliedItemSchema = BackboneElementSchema.extend({
  quantity: QuantitySchema.optional(),
  itemCodeableConcept: CodeableConceptSchema.optional(),
  itemReference: ReferenceSchema.optional(),
})
export type SupplyDeliverySuppliedItem = z.infer<typeof SupplyDeliverySuppliedItemSchema>

/**
 * Record of delivery of what is supplied.
 */
export const SupplyDeliverySchema = DomainResourceSchema.extend({
  resourceType: z.literal('SupplyDelivery'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['in-progress', 'completed', 'abandoned', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  patient: ReferenceSchema.optional(),
  type: CodeableConceptSchema.optional(),
  suppliedItem: SupplyDeliverySuppliedItemSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  occurrenceTiming: TimingSchema.optional(),
  supplier: ReferenceSchema.optional(),
  destination: ReferenceSchema.optional(),
  receiver: z.array(ReferenceSchema).optional(),
})
export type SupplyDelivery = z.infer<typeof SupplyDeliverySchema>

/**
 * Attests to accuracy of composition
 * A participant who has attested to the accuracy of the composition/document.
 * Only list each attester once.
 */
export const CompositionAttesterSchema = BackboneElementSchema.extend({
  mode: z.enum(['personal', 'professional', 'legal', 'official']),
  _mode: ElementSchema.optional(),
  time: z.string().optional(),
  _time: ElementSchema.optional(),
  party: ReferenceSchema.optional(),
})
export type CompositionAttester = z.infer<typeof CompositionAttesterSchema>

/**
 * Relationships to other compositions/documents
 * Relationships that this composition has with other compositions or documents that already exist.
 * A document is a version specific composition.
 */
export const CompositionRelatesToSchema = BackboneElementSchema.extend({
  code: z.enum(['replaces', 'transforms', 'signs', 'appends']),
  _code: ElementSchema.optional(),
  targetIdentifier: IdentifierSchema.optional(),
  targetReference: ReferenceSchema.optional(),
})
export type CompositionRelatesTo = z.infer<typeof CompositionRelatesToSchema>

/**
 * The clinical service(s) being documented
 * The clinical service, such as a colonoscopy or an appendectomy, being documented.
 * The event needs to be consistent with the type element, though can provide further information if desired.
 */
export const CompositionEventSchema = BackboneElementSchema.extend({
  code: z.array(CodeableConceptSchema).optional(),
  period: PeriodSchema.optional(),
  detail: z.array(ReferenceSchema).optional(),
})
export type CompositionEvent = z.infer<typeof CompositionEventSchema>

/**
 * Composition is broken into sections
 * The root of the sections that make up the composition.
 */
export interface CompositionSection extends BackboneElement {
  title?: string | undefined
  _title?: Element | undefined
  code?: CodeableConcept | undefined
  author?: Reference[] | undefined
  focus?: Reference | undefined
  text?: Narrative | undefined
  mode?: ('working'|'snapshot'|'changes') | undefined
  _mode?: Element | undefined
  orderedBy?: CodeableConcept | undefined
  entry?: Reference[] | undefined
  emptyReason?: CodeableConcept | undefined
  section?: CompositionSection[] | undefined
}

export const CompositionSectionSchema: z.ZodType<CompositionSection> = z.lazy(() =>
  BackboneElementSchema.extend({
    title: z.string().optional(),
      _title: ElementSchema.optional(),
    code: CodeableConceptSchema.optional(),
    author: z.array(ReferenceSchema).optional(),
    focus: ReferenceSchema.optional(),
    text: NarrativeSchema.optional(),
    mode: z.enum(['working', 'snapshot', 'changes']).optional(),
      _mode: ElementSchema.optional(),
    orderedBy: CodeableConceptSchema.optional(),
    entry: z.array(ReferenceSchema).optional(),
    emptyReason: CodeableConceptSchema.optional(),
    section: z.lazy(() => z.array(CompositionSectionSchema)).optional(),
  })
)

/**
 * A set of healthcare-related information that is assembled together into a single logical package that provides a single coherent statement of meaning, establishes its own context and that has clinical attestation with regard to who is making the statement. A Composition defines the structure and narrative content necessary for a document. However, a Composition alone does not constitute a document. Rather, the Composition must be the first entry in a Bundle where Bundle.type=document, and any other resources referenced from Composition must be included as subsequent entries in the Bundle (for example Patient, Practitioner, Encounter, etc.).
 */
export const CompositionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Composition'),
  identifier: IdentifierSchema.optional(),
  status: z.enum(['preliminary', 'final', 'amended', 'entered-in-error']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema,
  category: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  date: z.string(),
  _date: ElementSchema.optional(),
  author: z.array(ReferenceSchema),
  title: z.string(),
  _title: ElementSchema.optional(),
  confidentiality: z.string().optional(),
  _confidentiality: ElementSchema.optional(),
  attester: z.array(CompositionAttesterSchema).optional(),
  custodian: ReferenceSchema.optional(),
  relatesTo: z.array(CompositionRelatesToSchema).optional(),
  event: z.array(CompositionEventSchema).optional(),
  section: z.array(CompositionSectionSchema).optional(),
})
export type Composition = z.infer<typeof CompositionSchema>

/**
 * List of past encounter statuses
 * The status history permits the encounter resource to contain the status history without needing to read through the historical versions of the resource, or even have the server store them.
 * The current status is always found in the current version of the resource, not the status history.
 */
export const EncounterStatusHistorySchema = BackboneElementSchema.extend({
  status: z.enum(['planned', 'arrived', 'triaged', 'in-progress', 'onleave', 'finished', 'cancelled', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  period: PeriodSchema,
})
export type EncounterStatusHistory = z.infer<typeof EncounterStatusHistorySchema>

/**
 * List of past encounter classes
 * The class history permits the tracking of the encounters transitions without needing to go  through the resource history.  This would be used for a case where an admission starts of as an emergency encounter, then transitions into an inpatient scenario. Doing this and not restarting a new encounter ensures that any lab/diagnostic results can more easily follow the patient and not require re-processing and not get lost or cancelled during a kind of discharge from emergency to inpatient.
 */
export const EncounterClassHistorySchema = BackboneElementSchema.extend({
  class: CodingSchema,
  period: PeriodSchema,
})
export type EncounterClassHistory = z.infer<typeof EncounterClassHistorySchema>

/**
 * List of participants involved in the encounter
 * The list of people responsible for providing the service.
 */
export const EncounterParticipantSchema = BackboneElementSchema.extend({
  type: z.array(CodeableConceptSchema).optional(),
  period: PeriodSchema.optional(),
  individual: ReferenceSchema.optional(),
})
export type EncounterParticipant = z.infer<typeof EncounterParticipantSchema>

/**
 * The list of diagnosis relevant to this encounter
 */
export const EncounterDiagnosisSchema = BackboneElementSchema.extend({
  condition: ReferenceSchema,
  use: CodeableConceptSchema.optional(),
  rank: z.number().optional(),
  _rank: ElementSchema.optional(),
})
export type EncounterDiagnosis = z.infer<typeof EncounterDiagnosisSchema>

/**
 * Details about the admission to a healthcare service
 * An Encounter may cover more than just the inpatient stay. Contexts such as outpatients, community clinics, and aged care facilities are also included.The duration recorded in the period of this encounter covers the entire scope of this hospitalization record.
 */
export const EncounterHospitalizationSchema = BackboneElementSchema.extend({
  preAdmissionIdentifier: IdentifierSchema.optional(),
  origin: ReferenceSchema.optional(),
  admitSource: CodeableConceptSchema.optional(),
  reAdmission: CodeableConceptSchema.optional(),
  dietPreference: z.array(CodeableConceptSchema).optional(),
  specialCourtesy: z.array(CodeableConceptSchema).optional(),
  specialArrangement: z.array(CodeableConceptSchema).optional(),
  destination: ReferenceSchema.optional(),
  dischargeDisposition: CodeableConceptSchema.optional(),
})
export type EncounterHospitalization = z.infer<typeof EncounterHospitalizationSchema>

/**
 * List of locations where the patient has been
 * List of locations where  the patient has been during this encounter.
 * Virtual encounters can be recorded in the Encounter by specifying a location reference to a location of type "kind" such as "client's home" and an encounter.class = "virtual".
 */
export const EncounterLocationSchema = BackboneElementSchema.extend({
  location: ReferenceSchema,
  status: z.enum(['planned', 'active', 'reserved', 'completed']).optional(),
  _status: ElementSchema.optional(),
  physicalType: CodeableConceptSchema.optional(),
  period: PeriodSchema.optional(),
})
export type EncounterLocation = z.infer<typeof EncounterLocationSchema>

/**
 * An interaction between a patient and healthcare provider(s) for the purpose of providing healthcare service(s) or assessing the health status of a patient.
 */
export const EncounterSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Encounter'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['planned', 'arrived', 'triaged', 'in-progress', 'onleave', 'finished', 'cancelled', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  statusHistory: z.array(EncounterStatusHistorySchema).optional(),
  class: CodingSchema,
  classHistory: z.array(EncounterClassHistorySchema).optional(),
  type: z.array(CodeableConceptSchema).optional(),
  serviceType: CodeableConceptSchema.optional(),
  priority: CodeableConceptSchema.optional(),
  subject: ReferenceSchema.optional(),
  episodeOfCare: z.array(ReferenceSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  participant: z.array(EncounterParticipantSchema).optional(),
  appointment: z.array(ReferenceSchema).optional(),
  period: PeriodSchema.optional(),
  length: DurationSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  diagnosis: z.array(EncounterDiagnosisSchema).optional(),
  account: z.array(ReferenceSchema).optional(),
  hospitalization: EncounterHospitalizationSchema.optional(),
  location: z.array(EncounterLocationSchema).optional(),
  serviceProvider: ReferenceSchema.optional(),
  partOf: ReferenceSchema.optional(),
})
export type Encounter = z.infer<typeof EncounterSchema>

/**
 * Who performed the medication administration and what they did
 * Indicates who or what performed the medication administration and how they were involved.
 */
export const MedicationAdministrationPerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type MedicationAdministrationPerformer = z.infer<typeof MedicationAdministrationPerformerSchema>

/**
 * Details of how medication was taken
 * Describes the medication dosage information details e.g. dose, rate, site, route, etc.
 */
export const MedicationAdministrationDosageSchema = BackboneElementSchema.extend({
  text: z.string().optional(),
  _text: ElementSchema.optional(),
  site: CodeableConceptSchema.optional(),
  route: CodeableConceptSchema.optional(),
  method: CodeableConceptSchema.optional(),
  dose: QuantitySchema.optional(),
  rateRatio: RatioSchema.optional(),
  rateQuantity: QuantitySchema.optional(),
})
export type MedicationAdministrationDosage = z.infer<typeof MedicationAdministrationDosageSchema>

/**
 * Describes the event of a patient consuming or otherwise being administered a medication.  This may be as simple as swallowing a tablet or it may be a long running infusion.  Related resources tie this event to the authorizing prescription, and the specific encounter between patient and health care practitioner.
 */
export const MedicationAdministrationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicationAdministration'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiates: z.array(z.string()).optional(),
  _instantiates: ElementSchema.optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['in-progress', 'not-done', 'on-hold', 'completed', 'entered-in-error', 'stopped', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: z.array(CodeableConceptSchema).optional(),
  category: CodeableConceptSchema.optional(),
  medicationCodeableConcept: CodeableConceptSchema.optional(),
  medicationReference: ReferenceSchema.optional(),
  subject: ReferenceSchema,
  context: ReferenceSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  effectiveDateTime: z.string().optional(),
  _effectiveDateTime: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  performer: z.array(MedicationAdministrationPerformerSchema).optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  request: ReferenceSchema.optional(),
  device: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  dosage: MedicationAdministrationDosageSchema.optional(),
  eventHistory: z.array(ReferenceSchema).optional(),
})
export type MedicationAdministration = z.infer<typeof MedicationAdministrationSchema>

/**
 * Related things
 * Related identifiers or resources associated with the DocumentManifest.
 * May be identifiers or resources that caused the DocumentManifest to be created.
 */
export const DocumentManifestRelatedSchema = BackboneElementSchema.extend({
  identifier: IdentifierSchema.optional(),
  ref: ReferenceSchema.optional(),
})
export type DocumentManifestRelated = z.infer<typeof DocumentManifestRelatedSchema>

/**
 * A collection of documents compiled for a purpose together with metadata that applies to the collection.
 */
export const DocumentManifestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DocumentManifest'),
  masterIdentifier: IdentifierSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['current', 'superseded', 'entered-in-error']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  subject: ReferenceSchema.optional(),
  created: z.string().optional(),
  _created: ElementSchema.optional(),
  author: z.array(ReferenceSchema).optional(),
  recipient: z.array(ReferenceSchema).optional(),
  source: z.string().optional(),
  _source: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  content: z.array(ReferenceSchema),
  related: z.array(DocumentManifestRelatedSchema).optional(),
})
export type DocumentManifest = z.infer<typeof DocumentManifestSchema>

/**
 * Prior or corollary claims
 * Other claims which are related to this claim such as prior submissions or claims for related services or for the same event.
 * For example,  for the original treatment and follow-up exams.
 */
export const ClaimRelatedSchema = BackboneElementSchema.extend({
  claim: ReferenceSchema.optional(),
  relationship: CodeableConceptSchema.optional(),
  reference: IdentifierSchema.optional(),
})
export type ClaimRelated = z.infer<typeof ClaimRelatedSchema>

/**
 * Recipient of benefits payable
 * The party to be reimbursed for cost of the products and services according to the terms of the policy.
 * Often providers agree to receive the benefits payable to reduce the near-term costs to the patient. The insurer may decline to pay the provider and choose to pay the subscriber instead.
 */
export const ClaimPayeeSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  party: ReferenceSchema.optional(),
})
export type ClaimPayee = z.infer<typeof ClaimPayeeSchema>

/**
 * Members of the care team
 * The members of the team who provided the products and services.
 */
export const ClaimCareTeamSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  provider: ReferenceSchema,
  responsible: z.boolean().optional(),
  _responsible: ElementSchema.optional(),
  role: CodeableConceptSchema.optional(),
  qualification: CodeableConceptSchema.optional(),
})
export type ClaimCareTeam = z.infer<typeof ClaimCareTeamSchema>

/**
 * Supporting information
 * Additional information codes regarding exceptions, special considerations, the condition, situation, prior or concurrent issues.
 * Often there are multiple jurisdiction specific valuesets which are required.
 */
export const ClaimSupportingInfoSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  category: CodeableConceptSchema,
  code: CodeableConceptSchema.optional(),
  timingDate: z.string().optional(),
  _timingDate: ElementSchema.optional(),
  timingPeriod: PeriodSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  reason: CodeableConceptSchema.optional(),
})
export type ClaimSupportingInfo = z.infer<typeof ClaimSupportingInfoSchema>

/**
 * Pertinent diagnosis information
 * Information about diagnoses relevant to the claim items.
 */
export const ClaimDiagnosisSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  diagnosisCodeableConcept: CodeableConceptSchema.optional(),
  diagnosisReference: ReferenceSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  onAdmission: CodeableConceptSchema.optional(),
  packageCode: CodeableConceptSchema.optional(),
})
export type ClaimDiagnosis = z.infer<typeof ClaimDiagnosisSchema>

/**
 * Clinical procedures performed
 * Procedures performed on the patient relevant to the billing items with the claim.
 */
export const ClaimProcedureSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  procedureCodeableConcept: CodeableConceptSchema.optional(),
  procedureReference: ReferenceSchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
})
export type ClaimProcedure = z.infer<typeof ClaimProcedureSchema>

/**
 * Patient insurance information
 * Financial instruments for reimbursement for the health care products and services specified on the claim.
 * All insurance coverages for the patient which may be applicable for reimbursement, of the products and services listed in the claim, are typically provided in the claim to allow insurers to confirm the ordering of the insurance coverages relative to local 'coordination of benefit' rules. One coverage (and only one) with 'focal=true' is to be used in the adjudication of this claim. Coverages appearing before the focal Coverage in the list, and where 'Coverage.subrogation=false', should provide a reference to the ClaimResponse containing the adjudication results of the prior claim.
 */
export const ClaimInsuranceSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  focal: z.boolean(),
  _focal: ElementSchema.optional(),
  identifier: IdentifierSchema.optional(),
  coverage: ReferenceSchema,
  businessArrangement: z.string().optional(),
  _businessArrangement: ElementSchema.optional(),
  preAuthRef: z.array(z.string()).optional(),
  _preAuthRef: ElementSchema.optional(),
  claimResponse: ReferenceSchema.optional(),
})
export type ClaimInsurance = z.infer<typeof ClaimInsuranceSchema>

/**
 * Details of the event
 * Details of an accident which resulted in injuries which required the products and services listed in the claim.
 */
export const ClaimAccidentSchema = BackboneElementSchema.extend({
  date: z.string(),
  _date: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  locationAddress: AddressSchema.optional(),
  locationReference: ReferenceSchema.optional(),
})
export type ClaimAccident = z.infer<typeof ClaimAccidentSchema>

/**
 * Product or service provided
 * A claim detail line. Either a simple (a product or service) or a 'group' of sub-details which are simple items.
 */
export const ClaimItemDetailSubDetailSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
})
export type ClaimItemDetailSubDetail = z.infer<typeof ClaimItemDetailSubDetailSchema>

/**
 * Product or service provided
 * A claim detail line. Either a simple (a product or service) or a 'group' of sub-details which are simple items.
 */
export const ClaimItemDetailSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
  subDetail: z.array(ClaimItemDetailSubDetailSchema).optional(),
})
export type ClaimItemDetail = z.infer<typeof ClaimItemDetailSchema>

/**
 * Product or service provided
 * A claim line. Either a simple  product or service or a 'group' of details which can each be a simple items or groups of sub-details.
 */
export const ClaimItemSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  careTeamSequence: z.array(z.number()).optional(),
  _careTeamSequence: ElementSchema.optional(),
  diagnosisSequence: z.array(z.number()).optional(),
  _diagnosisSequence: ElementSchema.optional(),
  procedureSequence: z.array(z.number()).optional(),
  _procedureSequence: ElementSchema.optional(),
  informationSequence: z.array(z.number()).optional(),
  _informationSequence: ElementSchema.optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  locationCodeableConcept: CodeableConceptSchema.optional(),
  locationAddress: AddressSchema.optional(),
  locationReference: ReferenceSchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
  bodySite: CodeableConceptSchema.optional(),
  subSite: z.array(CodeableConceptSchema).optional(),
  encounter: z.array(ReferenceSchema).optional(),
  detail: z.array(ClaimItemDetailSchema).optional(),
})
export type ClaimItem = z.infer<typeof ClaimItemSchema>

/**
 * A provider issued list of professional services and products which have been provided, or are to be provided, to a patient which is sent to an insurer for reimbursement.
 */
export const ClaimSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Claim'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema,
  subType: CodeableConceptSchema.optional(),
  use: z.enum(['claim', 'preauthorization', 'predetermination']),
  _use: ElementSchema.optional(),
  patient: ReferenceSchema,
  billablePeriod: PeriodSchema.optional(),
  created: z.string(),
  _created: ElementSchema.optional(),
  enterer: ReferenceSchema.optional(),
  insurer: ReferenceSchema.optional(),
  provider: ReferenceSchema,
  priority: CodeableConceptSchema,
  fundsReserve: CodeableConceptSchema.optional(),
  related: z.array(ClaimRelatedSchema).optional(),
  prescription: ReferenceSchema.optional(),
  originalPrescription: ReferenceSchema.optional(),
  payee: ClaimPayeeSchema.optional(),
  referral: ReferenceSchema.optional(),
  facility: ReferenceSchema.optional(),
  careTeam: z.array(ClaimCareTeamSchema).optional(),
  supportingInfo: z.array(ClaimSupportingInfoSchema).optional(),
  diagnosis: z.array(ClaimDiagnosisSchema).optional(),
  procedure: z.array(ClaimProcedureSchema).optional(),
  insurance: z.array(ClaimInsuranceSchema),
  accident: ClaimAccidentSchema.optional(),
  item: z.array(ClaimItemSchema).optional(),
  total: MoneySchema.optional(),
})
export type Claim = z.infer<typeof ClaimSchema>

/**
 * Describes the calibrations that have been performed or that are required to be performed
 */
export const DeviceMetricCalibrationSchema = BackboneElementSchema.extend({
  type: z.enum(['unspecified', 'offset', 'gain', 'two-point']).optional(),
  _type: ElementSchema.optional(),
  state: z.enum(['not-calibrated', 'calibration-required', 'calibrated', 'unspecified']).optional(),
  _state: ElementSchema.optional(),
  time: z.string().optional(),
  _time: ElementSchema.optional(),
})
export type DeviceMetricCalibration = z.infer<typeof DeviceMetricCalibrationSchema>

/**
 * Describes a measurement, calculation or setting capability of a medical device.
 */
export const DeviceMetricSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceMetric'),
  identifier: z.array(IdentifierSchema).optional(),
  type: CodeableConceptSchema,
  unit: CodeableConceptSchema.optional(),
  source: ReferenceSchema.optional(),
  parent: ReferenceSchema.optional(),
  operationalStatus: z.enum(['on', 'off', 'standby', 'entered-in-error']).optional(),
  _operationalStatus: ElementSchema.optional(),
  color: z.enum(['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']).optional(),
  _color: ElementSchema.optional(),
  category: z.enum(['measurement', 'setting', 'calculation', 'unspecified']),
  _category: ElementSchema.optional(),
  measurementPeriod: TimingSchema.optional(),
  calibration: z.array(DeviceMetricCalibrationSchema).optional(),
})
export type DeviceMetric = z.infer<typeof DeviceMetricSchema>

/**
 * Element values that are used to distinguish the slices
 * Designates which child elements are used to discriminate between the slices when processing an instance. If one or more discriminators are provided, the value of the child elements in the instance data SHALL completely distinguish which slice the element in the resource matches based on the allowed values for those elements in each of the slices.
 * If there is no discriminator, the content is hard to process, so this should be avoided.
 */
export const ElementDefinitionSlicingDiscriminatorSchema = BackboneElementSchema.extend({
  type: z.enum(['value', 'exists', 'pattern', 'type', 'profile']),
  _type: ElementSchema.optional(),
  path: z.string(),
  _path: ElementSchema.optional(),
})
export type ElementDefinitionSlicingDiscriminator = z.infer<typeof ElementDefinitionSlicingDiscriminatorSchema>

/**
 * This element is sliced - slices follow
 * Indicates that the element is sliced into a set of alternative definitions (i.e. in a structure definition, there are multiple different constraints on a single element in the base resource). Slicing can be used in any resource that has cardinality ..* on the base resource, or any resource with a choice of types. The set of slices is any elements that come after this in the element sequence that have the same path, until a shorter path occurs (the shorter path terminates the set).
 * The first element in the sequence, the one that carries the slicing, is the definition that applies to all the slices. This is based on the unconstrained element, but can apply any constraints as appropriate. This may include the common constraints on the children of the element.
 */
export const ElementDefinitionSlicingSchema = BackboneElementSchema.extend({
  discriminator: z.array(ElementDefinitionSlicingDiscriminatorSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  ordered: z.boolean().optional(),
  _ordered: ElementSchema.optional(),
  rules: z.enum(['closed', 'open', 'openAtEnd']),
  _rules: ElementSchema.optional(),
})
export type ElementDefinitionSlicing = z.infer<typeof ElementDefinitionSlicingSchema>

/**
 * Base definition information for tools
 * Information about the base definition of the element, provided to make it unnecessary for tools to trace the deviation of the element through the derived and related profiles. When the element definition is not the original definition of an element - i.g. either in a constraint on another type, or for elements from a super type in a snap shot - then the information in provided in the element definition may be different to the base definition. On the original definition of the element, it will be same.
 * The base information does not carry any information that could not be determined from the path and related profiles, but making this determination requires both that the related profiles are available, and that the algorithm to determine them be available. For tooling simplicity, the base information must always be populated in element definitions in snap shots, even if it is the same.
 */
export const ElementDefinitionBaseSchema = BackboneElementSchema.extend({
  path: z.string(),
  _path: ElementSchema.optional(),
  min: z.number(),
  _min: ElementSchema.optional(),
  max: z.string(),
  _max: ElementSchema.optional(),
})
export type ElementDefinitionBase = z.infer<typeof ElementDefinitionBaseSchema>

/**
 * Data type and Profile for this element
 * The data type or resource that the value of this element is permitted to be.
 * The Type of the element can be left blank in a differential constraint, in which case the type is inherited from the resource. Abstract types are not permitted to appear as a type when multiple types are listed.  (I.e. Abstract types cannot be part of a choice).
 */
export const ElementDefinitionTypeSchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  profile: z.array(z.string()).optional(),
  _profile: ElementSchema.optional(),
  targetProfile: z.array(z.string()).optional(),
  _targetProfile: ElementSchema.optional(),
  aggregation: z.array(z.enum(['contained', 'referenced', 'bundled'])).optional(),
  _aggregation: ElementSchema.optional(),
  versioning: z.enum(['either', 'independent', 'specific']).optional(),
  _versioning: ElementSchema.optional(),
})
export type ElementDefinitionType = z.infer<typeof ElementDefinitionTypeSchema>

/**
 * Example value (as defined for type)
 * A sample value for this element demonstrating the type of information that would typically be found in the element.
 * Examples will most commonly be present for data where it's not implicitly obvious from either the data type or value set what the values might be.  (I.e. Example values for dates or quantities would generally be unnecessary.)  If the example value is fully populated, the publication tool can generate an instance automatically.
 */
export const ElementDefinitionExampleSchema = BackboneElementSchema.extend({
  label: z.string(),
  _label: ElementSchema.optional(),
  valueBase64Binary: z.string().optional(),
  _valueBase64Binary: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueCanonical: z.string().optional(),
  _valueCanonical: ElementSchema.optional(),
  valueCode: z.string().optional(),
  _valueCode: ElementSchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
  valueId: z.string().optional(),
  _valueId: ElementSchema.optional(),
  valueInstant: z.string().optional(),
  _valueInstant: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueMarkdown: z.string().optional(),
  _valueMarkdown: ElementSchema.optional(),
  valueOid: z.string().optional(),
  _valueOid: ElementSchema.optional(),
  valuePositiveInt: z.number().optional(),
  _valuePositiveInt: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueUnsignedInt: z.number().optional(),
  _valueUnsignedInt: ElementSchema.optional(),
  valueUri: z.string().optional(),
  _valueUri: ElementSchema.optional(),
  valueUrl: z.string().optional(),
  _valueUrl: ElementSchema.optional(),
  valueUuid: z.string().optional(),
  _valueUuid: ElementSchema.optional(),
  valueAddress: AddressSchema.optional(),
  valueAge: AgeSchema.optional(),
  valueAnnotation: AnnotationSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueCodeableReference: CodeableReferenceSchema.optional(),
  valueCoding: CodingSchema.optional(),
  valueContactPoint: ContactPointSchema.optional(),
  valueCount: CountSchema.optional(),
  valueDistance: DistanceSchema.optional(),
  valueDuration: DurationSchema.optional(),
  valueHumanName: HumanNameSchema.optional(),
  valueIdentifier: IdentifierSchema.optional(),
  valueMoney: MoneySchema.optional(),
  valuePeriod: PeriodSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueRatioRange: RatioRangeSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  valueSampledData: SampledDataSchema.optional(),
  valueSignature: SignatureSchema.optional(),
  valueTiming: TimingSchema.optional(),
  valueContactDetail: ContactDetailSchema.optional(),
  valueContributor: ContributorSchema.optional(),
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueDosage: DosageSchema.optional(),
})
export type ElementDefinitionExample = z.infer<typeof ElementDefinitionExampleSchema>

/**
 * Condition that must evaluate to true
 * Formal constraints such as co-occurrence and other constraints that can be computationally evaluated within the context of the instance.
 * Constraints should be declared on the "context" element - the lowest element in the hierarchy that is common to all nodes referenced by the constraint.
 */
export const ElementDefinitionConstraintSchema = BackboneElementSchema.extend({
  key: z.string(),
  _key: ElementSchema.optional(),
  requirements: z.string().optional(),
  _requirements: ElementSchema.optional(),
  severity: z.enum(['error', 'warning']),
  _severity: ElementSchema.optional(),
  human: z.string(),
  _human: ElementSchema.optional(),
  expression: z.string().optional(),
  _expression: ElementSchema.optional(),
  xpath: z.string().optional(),
  _xpath: ElementSchema.optional(),
  source: z.string().optional(),
  _source: ElementSchema.optional(),
})
export type ElementDefinitionConstraint = z.infer<typeof ElementDefinitionConstraintSchema>

/**
 * ValueSet details if this is coded
 * Binds to a value set if this element is coded (code, Coding, CodeableConcept, Quantity), or the data types (string, uri).
 * For a CodeableConcept, when no codes are allowed - only text, use a binding of strength "required" with a description explaining that no coded values are allowed and what sort of information to put in the "text" element.
 */
export const ElementDefinitionBindingSchema = BackboneElementSchema.extend({
  strength: z.enum(['required', 'extensible', 'preferred', 'example']),
  _strength: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  valueSet: z.string().optional(),
  _valueSet: ElementSchema.optional(),
})
export type ElementDefinitionBinding = z.infer<typeof ElementDefinitionBindingSchema>

/**
 * Map element to another set of definitions
 * Identifies a concept from an external specification that roughly corresponds to this element.
 * Mappings are not necessarily specific enough for safe translation.
 */
export const ElementDefinitionMappingSchema = BackboneElementSchema.extend({
  identity: z.string(),
  _identity: ElementSchema.optional(),
  language: z.string().optional(),
  _language: ElementSchema.optional(),
  map: z.string(),
  _map: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
})
export type ElementDefinitionMapping = z.infer<typeof ElementDefinitionMappingSchema>

/**
 * Base StructureDefinition for ElementDefinition Type: Captures constraints on each element within the resource, profile, or extension.
 */
export const ElementDefinitionSchema = BackboneElementSchema.extend({
  path: z.string(),
  _path: ElementSchema.optional(),
  representation: z.array(z.enum(['xmlAttr', 'xmlText', 'typeAttr', 'cdaText', 'xhtml'])).optional(),
  _representation: ElementSchema.optional(),
  sliceName: z.string().optional(),
  _sliceName: ElementSchema.optional(),
  sliceIsConstraining: z.boolean().optional(),
  _sliceIsConstraining: ElementSchema.optional(),
  label: z.string().optional(),
  _label: ElementSchema.optional(),
  code: z.array(CodingSchema).optional(),
  slicing: ElementDefinitionSlicingSchema.optional(),
  short: z.string().optional(),
  _short: ElementSchema.optional(),
  definition: z.string().optional(),
  _definition: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  requirements: z.string().optional(),
  _requirements: ElementSchema.optional(),
  alias: z.array(z.string()).optional(),
  _alias: ElementSchema.optional(),
  min: z.number().optional(),
  _min: ElementSchema.optional(),
  max: z.string().optional(),
  _max: ElementSchema.optional(),
  base: ElementDefinitionBaseSchema.optional(),
  contentReference: z.string().optional(),
  _contentReference: ElementSchema.optional(),
  type: z.array(ElementDefinitionTypeSchema).optional(),
  defaultValueBase64Binary: z.string().optional(),
  _defaultValueBase64Binary: ElementSchema.optional(),
  defaultValueBoolean: z.boolean().optional(),
  _defaultValueBoolean: ElementSchema.optional(),
  defaultValueCanonical: z.string().optional(),
  _defaultValueCanonical: ElementSchema.optional(),
  defaultValueCode: z.string().optional(),
  _defaultValueCode: ElementSchema.optional(),
  defaultValueDate: z.string().optional(),
  _defaultValueDate: ElementSchema.optional(),
  defaultValueDateTime: z.string().optional(),
  _defaultValueDateTime: ElementSchema.optional(),
  defaultValueDecimal: z.number().optional(),
  _defaultValueDecimal: ElementSchema.optional(),
  defaultValueId: z.string().optional(),
  _defaultValueId: ElementSchema.optional(),
  defaultValueInstant: z.string().optional(),
  _defaultValueInstant: ElementSchema.optional(),
  defaultValueInteger: z.number().optional(),
  _defaultValueInteger: ElementSchema.optional(),
  defaultValueMarkdown: z.string().optional(),
  _defaultValueMarkdown: ElementSchema.optional(),
  defaultValueOid: z.string().optional(),
  _defaultValueOid: ElementSchema.optional(),
  defaultValuePositiveInt: z.number().optional(),
  _defaultValuePositiveInt: ElementSchema.optional(),
  defaultValueString: z.string().optional(),
  _defaultValueString: ElementSchema.optional(),
  defaultValueTime: z.string().optional(),
  _defaultValueTime: ElementSchema.optional(),
  defaultValueUnsignedInt: z.number().optional(),
  _defaultValueUnsignedInt: ElementSchema.optional(),
  defaultValueUri: z.string().optional(),
  _defaultValueUri: ElementSchema.optional(),
  defaultValueUrl: z.string().optional(),
  _defaultValueUrl: ElementSchema.optional(),
  defaultValueUuid: z.string().optional(),
  _defaultValueUuid: ElementSchema.optional(),
  defaultValueAddress: AddressSchema.optional(),
  defaultValueAge: AgeSchema.optional(),
  defaultValueAnnotation: AnnotationSchema.optional(),
  defaultValueAttachment: AttachmentSchema.optional(),
  defaultValueCodeableConcept: CodeableConceptSchema.optional(),
  defaultValueCodeableReference: CodeableReferenceSchema.optional(),
  defaultValueCoding: CodingSchema.optional(),
  defaultValueContactPoint: ContactPointSchema.optional(),
  defaultValueCount: CountSchema.optional(),
  defaultValueDistance: DistanceSchema.optional(),
  defaultValueDuration: DurationSchema.optional(),
  defaultValueHumanName: HumanNameSchema.optional(),
  defaultValueIdentifier: IdentifierSchema.optional(),
  defaultValueMoney: MoneySchema.optional(),
  defaultValuePeriod: PeriodSchema.optional(),
  defaultValueQuantity: QuantitySchema.optional(),
  defaultValueRange: RangeSchema.optional(),
  defaultValueRatio: RatioSchema.optional(),
  defaultValueRatioRange: RatioRangeSchema.optional(),
  defaultValueReference: ReferenceSchema.optional(),
  defaultValueSampledData: SampledDataSchema.optional(),
  defaultValueSignature: SignatureSchema.optional(),
  defaultValueTiming: TimingSchema.optional(),
  defaultValueContactDetail: ContactDetailSchema.optional(),
  defaultValueContributor: ContributorSchema.optional(),
  defaultValueDataRequirement: DataRequirementSchema.optional(),
  defaultValueExpression: ExpressionSchema.optional(),
  defaultValueParameterDefinition: ParameterDefinitionSchema.optional(),
  defaultValueRelatedArtifact: RelatedArtifactSchema.optional(),
  defaultValueTriggerDefinition: TriggerDefinitionSchema.optional(),
  defaultValueUsageContext: UsageContextSchema.optional(),
  defaultValueDosage: DosageSchema.optional(),
  meaningWhenMissing: z.string().optional(),
  _meaningWhenMissing: ElementSchema.optional(),
  orderMeaning: z.string().optional(),
  _orderMeaning: ElementSchema.optional(),
  fixedBase64Binary: z.string().optional(),
  _fixedBase64Binary: ElementSchema.optional(),
  fixedBoolean: z.boolean().optional(),
  _fixedBoolean: ElementSchema.optional(),
  fixedCanonical: z.string().optional(),
  _fixedCanonical: ElementSchema.optional(),
  fixedCode: z.string().optional(),
  _fixedCode: ElementSchema.optional(),
  fixedDate: z.string().optional(),
  _fixedDate: ElementSchema.optional(),
  fixedDateTime: z.string().optional(),
  _fixedDateTime: ElementSchema.optional(),
  fixedDecimal: z.number().optional(),
  _fixedDecimal: ElementSchema.optional(),
  fixedId: z.string().optional(),
  _fixedId: ElementSchema.optional(),
  fixedInstant: z.string().optional(),
  _fixedInstant: ElementSchema.optional(),
  fixedInteger: z.number().optional(),
  _fixedInteger: ElementSchema.optional(),
  fixedMarkdown: z.string().optional(),
  _fixedMarkdown: ElementSchema.optional(),
  fixedOid: z.string().optional(),
  _fixedOid: ElementSchema.optional(),
  fixedPositiveInt: z.number().optional(),
  _fixedPositiveInt: ElementSchema.optional(),
  fixedString: z.string().optional(),
  _fixedString: ElementSchema.optional(),
  fixedTime: z.string().optional(),
  _fixedTime: ElementSchema.optional(),
  fixedUnsignedInt: z.number().optional(),
  _fixedUnsignedInt: ElementSchema.optional(),
  fixedUri: z.string().optional(),
  _fixedUri: ElementSchema.optional(),
  fixedUrl: z.string().optional(),
  _fixedUrl: ElementSchema.optional(),
  fixedUuid: z.string().optional(),
  _fixedUuid: ElementSchema.optional(),
  fixedAddress: AddressSchema.optional(),
  fixedAge: AgeSchema.optional(),
  fixedAnnotation: AnnotationSchema.optional(),
  fixedAttachment: AttachmentSchema.optional(),
  fixedCodeableConcept: CodeableConceptSchema.optional(),
  fixedCodeableReference: CodeableReferenceSchema.optional(),
  fixedCoding: CodingSchema.optional(),
  fixedContactPoint: ContactPointSchema.optional(),
  fixedCount: CountSchema.optional(),
  fixedDistance: DistanceSchema.optional(),
  fixedDuration: DurationSchema.optional(),
  fixedHumanName: HumanNameSchema.optional(),
  fixedIdentifier: IdentifierSchema.optional(),
  fixedMoney: MoneySchema.optional(),
  fixedPeriod: PeriodSchema.optional(),
  fixedQuantity: QuantitySchema.optional(),
  fixedRange: RangeSchema.optional(),
  fixedRatio: RatioSchema.optional(),
  fixedRatioRange: RatioRangeSchema.optional(),
  fixedReference: ReferenceSchema.optional(),
  fixedSampledData: SampledDataSchema.optional(),
  fixedSignature: SignatureSchema.optional(),
  fixedTiming: TimingSchema.optional(),
  fixedContactDetail: ContactDetailSchema.optional(),
  fixedContributor: ContributorSchema.optional(),
  fixedDataRequirement: DataRequirementSchema.optional(),
  fixedExpression: ExpressionSchema.optional(),
  fixedParameterDefinition: ParameterDefinitionSchema.optional(),
  fixedRelatedArtifact: RelatedArtifactSchema.optional(),
  fixedTriggerDefinition: TriggerDefinitionSchema.optional(),
  fixedUsageContext: UsageContextSchema.optional(),
  fixedDosage: DosageSchema.optional(),
  patternBase64Binary: z.string().optional(),
  _patternBase64Binary: ElementSchema.optional(),
  patternBoolean: z.boolean().optional(),
  _patternBoolean: ElementSchema.optional(),
  patternCanonical: z.string().optional(),
  _patternCanonical: ElementSchema.optional(),
  patternCode: z.string().optional(),
  _patternCode: ElementSchema.optional(),
  patternDate: z.string().optional(),
  _patternDate: ElementSchema.optional(),
  patternDateTime: z.string().optional(),
  _patternDateTime: ElementSchema.optional(),
  patternDecimal: z.number().optional(),
  _patternDecimal: ElementSchema.optional(),
  patternId: z.string().optional(),
  _patternId: ElementSchema.optional(),
  patternInstant: z.string().optional(),
  _patternInstant: ElementSchema.optional(),
  patternInteger: z.number().optional(),
  _patternInteger: ElementSchema.optional(),
  patternMarkdown: z.string().optional(),
  _patternMarkdown: ElementSchema.optional(),
  patternOid: z.string().optional(),
  _patternOid: ElementSchema.optional(),
  patternPositiveInt: z.number().optional(),
  _patternPositiveInt: ElementSchema.optional(),
  patternString: z.string().optional(),
  _patternString: ElementSchema.optional(),
  patternTime: z.string().optional(),
  _patternTime: ElementSchema.optional(),
  patternUnsignedInt: z.number().optional(),
  _patternUnsignedInt: ElementSchema.optional(),
  patternUri: z.string().optional(),
  _patternUri: ElementSchema.optional(),
  patternUrl: z.string().optional(),
  _patternUrl: ElementSchema.optional(),
  patternUuid: z.string().optional(),
  _patternUuid: ElementSchema.optional(),
  patternAddress: AddressSchema.optional(),
  patternAge: AgeSchema.optional(),
  patternAnnotation: AnnotationSchema.optional(),
  patternAttachment: AttachmentSchema.optional(),
  patternCodeableConcept: CodeableConceptSchema.optional(),
  patternCodeableReference: CodeableReferenceSchema.optional(),
  patternCoding: CodingSchema.optional(),
  patternContactPoint: ContactPointSchema.optional(),
  patternCount: CountSchema.optional(),
  patternDistance: DistanceSchema.optional(),
  patternDuration: DurationSchema.optional(),
  patternHumanName: HumanNameSchema.optional(),
  patternIdentifier: IdentifierSchema.optional(),
  patternMoney: MoneySchema.optional(),
  patternPeriod: PeriodSchema.optional(),
  patternQuantity: QuantitySchema.optional(),
  patternRange: RangeSchema.optional(),
  patternRatio: RatioSchema.optional(),
  patternRatioRange: RatioRangeSchema.optional(),
  patternReference: ReferenceSchema.optional(),
  patternSampledData: SampledDataSchema.optional(),
  patternSignature: SignatureSchema.optional(),
  patternTiming: TimingSchema.optional(),
  patternContactDetail: ContactDetailSchema.optional(),
  patternContributor: ContributorSchema.optional(),
  patternDataRequirement: DataRequirementSchema.optional(),
  patternExpression: ExpressionSchema.optional(),
  patternParameterDefinition: ParameterDefinitionSchema.optional(),
  patternRelatedArtifact: RelatedArtifactSchema.optional(),
  patternTriggerDefinition: TriggerDefinitionSchema.optional(),
  patternUsageContext: UsageContextSchema.optional(),
  patternDosage: DosageSchema.optional(),
  example: z.array(ElementDefinitionExampleSchema).optional(),
  minValueDate: z.string().optional(),
  _minValueDate: ElementSchema.optional(),
  minValueDateTime: z.string().optional(),
  _minValueDateTime: ElementSchema.optional(),
  minValueInstant: z.string().optional(),
  _minValueInstant: ElementSchema.optional(),
  minValueTime: z.string().optional(),
  _minValueTime: ElementSchema.optional(),
  minValueDecimal: z.number().optional(),
  _minValueDecimal: ElementSchema.optional(),
  minValueInteger: z.number().optional(),
  _minValueInteger: ElementSchema.optional(),
  minValuePositiveInt: z.number().optional(),
  _minValuePositiveInt: ElementSchema.optional(),
  minValueUnsignedInt: z.number().optional(),
  _minValueUnsignedInt: ElementSchema.optional(),
  minValueQuantity: QuantitySchema.optional(),
  maxValueDate: z.string().optional(),
  _maxValueDate: ElementSchema.optional(),
  maxValueDateTime: z.string().optional(),
  _maxValueDateTime: ElementSchema.optional(),
  maxValueInstant: z.string().optional(),
  _maxValueInstant: ElementSchema.optional(),
  maxValueTime: z.string().optional(),
  _maxValueTime: ElementSchema.optional(),
  maxValueDecimal: z.number().optional(),
  _maxValueDecimal: ElementSchema.optional(),
  maxValueInteger: z.number().optional(),
  _maxValueInteger: ElementSchema.optional(),
  maxValuePositiveInt: z.number().optional(),
  _maxValuePositiveInt: ElementSchema.optional(),
  maxValueUnsignedInt: z.number().optional(),
  _maxValueUnsignedInt: ElementSchema.optional(),
  maxValueQuantity: QuantitySchema.optional(),
  maxLength: z.number().optional(),
  _maxLength: ElementSchema.optional(),
  condition: z.array(z.string()).optional(),
  _condition: ElementSchema.optional(),
  constraint: z.array(ElementDefinitionConstraintSchema).optional(),
  mustSupport: z.boolean().optional(),
  _mustSupport: ElementSchema.optional(),
  isModifier: z.boolean().optional(),
  _isModifier: ElementSchema.optional(),
  isModifierReason: z.string().optional(),
  _isModifierReason: ElementSchema.optional(),
  isSummary: z.boolean().optional(),
  _isSummary: ElementSchema.optional(),
  binding: ElementDefinitionBindingSchema.optional(),
  mapping: z.array(ElementDefinitionMappingSchema).optional(),
})
export type ElementDefinition = z.infer<typeof ElementDefinitionSchema>

/**
 * Logical network location for application activity
 * Logical network location for application activity, if the activity has a network location.
 */
export const AuditEventAgentNetworkSchema = BackboneElementSchema.extend({
  address: z.string().optional(),
  _address: ElementSchema.optional(),
  type: z.enum(['1', '2', '3', '4', '5']).optional(),
  _type: ElementSchema.optional(),
})
export type AuditEventAgentNetwork = z.infer<typeof AuditEventAgentNetworkSchema>

/**
 * Actor involved in the event
 * An actor taking an active role in the event or activity that is logged.
 * Several agents may be associated (i.e. have some responsibility for an activity) with an event or activity.
 */
export const AuditEventAgentSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  role: z.array(CodeableConceptSchema).optional(),
  who: ReferenceSchema.optional(),
  altId: z.string().optional(),
  _altId: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  requestor: z.boolean(),
  _requestor: ElementSchema.optional(),
  location: ReferenceSchema.optional(),
  policy: z.array(z.string()).optional(),
  _policy: ElementSchema.optional(),
  media: CodingSchema.optional(),
  network: AuditEventAgentNetworkSchema.optional(),
  purposeOfUse: z.array(CodeableConceptSchema).optional(),
})
export type AuditEventAgent = z.infer<typeof AuditEventAgentSchema>

/**
 * Audit Event Reporter
 * The system that is reporting the event.
 * Since multi-tier, distributed, or composite applications make source identification ambiguous, this collection of fields may repeat for each application or process actively involved in the event. For example, multiple value-sets can identify participating web servers, application processes, and database server threads in an n-tier distributed application. Passive event participants (e.g. low-level network transports) need not be identified.
 */
export const AuditEventSourceSchema = BackboneElementSchema.extend({
  site: z.string().optional(),
  _site: ElementSchema.optional(),
  observer: ReferenceSchema,
  type: z.array(CodingSchema).optional(),
})
export type AuditEventSource = z.infer<typeof AuditEventSourceSchema>

/**
 * Additional Information about the entity
 * Tagged value pairs for conveying additional information about the entity.
 */
export const AuditEventEntityDetailSchema = BackboneElementSchema.extend({
  type: z.string(),
  _type: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueBase64Binary: z.string().optional(),
  _valueBase64Binary: ElementSchema.optional(),
})
export type AuditEventEntityDetail = z.infer<typeof AuditEventEntityDetailSchema>

/**
 * Data or objects used
 * Specific instances of data or objects that have been accessed.
 * Required unless the values for event identification, agent identification, and audit source identification are sufficient to document the entire auditable event. Because events may have more than one entity, this group can be a repeating set of values.
 */
export const AuditEventEntitySchema = BackboneElementSchema.extend({
  what: ReferenceSchema.optional(),
  type: CodingSchema.optional(),
  role: CodingSchema.optional(),
  lifecycle: CodingSchema.optional(),
  securityLabel: z.array(CodingSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  query: z.string().optional(),
  _query: ElementSchema.optional(),
  detail: z.array(AuditEventEntityDetailSchema).optional(),
})
export type AuditEventEntity = z.infer<typeof AuditEventEntitySchema>

/**
 * A record of an event made for purposes of maintaining a security log. Typical uses include detection of intrusion attempts and monitoring for inappropriate usage.
 */
export const AuditEventSchema = DomainResourceSchema.extend({
  resourceType: z.literal('AuditEvent'),
  type: CodingSchema,
  subtype: z.array(CodingSchema).optional(),
  action: z.enum(['C', 'R', 'U', 'D', 'E']).optional(),
  _action: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  recorded: z.string(),
  _recorded: ElementSchema.optional(),
  outcome: z.enum(['0', '4', '8', '12']).optional(),
  _outcome: ElementSchema.optional(),
  outcomeDesc: z.string().optional(),
  _outcomeDesc: ElementSchema.optional(),
  purposeOfEvent: z.array(CodeableConceptSchema).optional(),
  agent: z.array(AuditEventAgentSchema),
  source: AuditEventSourceSchema,
  entity: z.array(AuditEventEntitySchema).optional(),
})
export type AuditEvent = z.infer<typeof AuditEventSchema>

/**
 * A record of a request for service such as diagnostic investigations, treatments, or operations to be performed.
 */
export const ServiceRequestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ServiceRequest'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  replaces: z.array(ReferenceSchema).optional(),
  requisition: IdentifierSchema.optional(),
  status: z.enum(['draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  doNotPerform: z.boolean().optional(),
  _doNotPerform: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  orderDetail: z.array(CodeableConceptSchema).optional(),
  quantityQuantity: QuantitySchema.optional(),
  quantityRatio: RatioSchema.optional(),
  quantityRange: RangeSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  occurrenceTiming: TimingSchema.optional(),
  asNeededBoolean: z.boolean().optional(),
  _asNeededBoolean: ElementSchema.optional(),
  asNeededCodeableConcept: CodeableConceptSchema.optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  requester: ReferenceSchema.optional(),
  performerType: CodeableConceptSchema.optional(),
  performer: z.array(ReferenceSchema).optional(),
  locationCode: z.array(CodeableConceptSchema).optional(),
  locationReference: z.array(ReferenceSchema).optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  insurance: z.array(ReferenceSchema).optional(),
  supportingInfo: z.array(ReferenceSchema).optional(),
  specimen: z.array(ReferenceSchema).optional(),
  bodySite: z.array(CodeableConceptSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  patientInstruction: z.string().optional(),
  _patientInstruction: ElementSchema.optional(),
  relevantHistory: z.array(ReferenceSchema).optional(),
})
export type ServiceRequest = z.infer<typeof ServiceRequestSchema>

/**
 * The EventDefinition resource provides a reusable description of when a particular event can occur.
 */
export const EventDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('EventDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  subtitle: z.string().optional(),
  _subtitle: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  usage: z.string().optional(),
  _usage: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  topic: z.array(CodeableConceptSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  trigger: z.array(TriggerDefinitionSchema),
})
export type EventDefinition = z.infer<typeof EventDefinitionSchema>

/**
 * In-line definition of activity
 * A simple summary of a planned activity suitable for a general care plan system (e.g. form driven) that doesn't know about specific resources such as procedure etc.
 */
export const CarePlanActivityDetailSchema = BackboneElementSchema.extend({
  kind: z.enum(['Appointment', 'CommunicationRequest', 'DeviceRequest', 'MedicationRequest', 'NutritionOrder', 'Task', 'ServiceRequest', 'VisionPrescription']).optional(),
  _kind: ElementSchema.optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  goal: z.array(ReferenceSchema).optional(),
  status: z.enum(['not-started', 'scheduled', 'in-progress', 'on-hold', 'completed', 'cancelled', 'stopped', 'unknown', 'entered-in-error']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  doNotPerform: z.boolean().optional(),
  _doNotPerform: ElementSchema.optional(),
  scheduledTiming: TimingSchema.optional(),
  scheduledPeriod: PeriodSchema.optional(),
  scheduledString: z.string().optional(),
  _scheduledString: ElementSchema.optional(),
  location: ReferenceSchema.optional(),
  performer: z.array(ReferenceSchema).optional(),
  productCodeableConcept: CodeableConceptSchema.optional(),
  productReference: ReferenceSchema.optional(),
  dailyAmount: QuantitySchema.optional(),
  quantity: QuantitySchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type CarePlanActivityDetail = z.infer<typeof CarePlanActivityDetailSchema>

/**
 * Action to occur as part of plan
 * Identifies a planned action to occur as part of the plan.  For example, a medication to be used, lab tests to perform, self-monitoring, education, etc.
 */
export const CarePlanActivitySchema = BackboneElementSchema.extend({
  outcomeCodeableConcept: z.array(CodeableConceptSchema).optional(),
  outcomeReference: z.array(ReferenceSchema).optional(),
  progress: z.array(AnnotationSchema).optional(),
  reference: ReferenceSchema.optional(),
  detail: CarePlanActivityDetailSchema.optional(),
})
export type CarePlanActivity = z.infer<typeof CarePlanActivitySchema>

/**
 * Describes the intention of how one or more practitioners intend to deliver care for a particular patient, group or community for a period of time, possibly limited to care for a specific condition or set of conditions.
 */
export const CarePlanSchema = DomainResourceSchema.extend({
  resourceType: z.literal('CarePlan'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  replaces: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'order', 'option']),
  _intent: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  period: PeriodSchema.optional(),
  created: z.string().optional(),
  _created: ElementSchema.optional(),
  author: ReferenceSchema.optional(),
  contributor: z.array(ReferenceSchema).optional(),
  careTeam: z.array(ReferenceSchema).optional(),
  addresses: z.array(ReferenceSchema).optional(),
  supportingInfo: z.array(ReferenceSchema).optional(),
  goal: z.array(ReferenceSchema).optional(),
  activity: z.array(CarePlanActivitySchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type CarePlan = z.infer<typeof CarePlanSchema>

/**
 * Item to be linked
 * Identifies which record considered as the reference to the same real-world occurrence as well as how the items should be evaluated within the collection of linked items.
 */
export const LinkageItemSchema = BackboneElementSchema.extend({
  type: z.enum(['source', 'alternate', 'historical']),
  _type: ElementSchema.optional(),
  resource: ReferenceSchema,
})
export type LinkageItem = z.infer<typeof LinkageItemSchema>

/**
 * Identifies two or more records (resource instances) that refer to the same real-world "occurrence".
 */
export const LinkageSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Linkage'),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  author: ReferenceSchema.optional(),
  item: z.array(LinkageItemSchema),
})
export type Linkage = z.infer<typeof LinkageSchema>

/**
 * Benefit Summary
 * Benefits used to date.
 */
export const CoverageEligibilityResponseInsuranceItemBenefitSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  allowedUnsignedInt: z.number().optional(),
  _allowedUnsignedInt: ElementSchema.optional(),
  allowedString: z.string().optional(),
  _allowedString: ElementSchema.optional(),
  allowedMoney: MoneySchema.optional(),
  usedUnsignedInt: z.number().optional(),
  _usedUnsignedInt: ElementSchema.optional(),
  usedString: z.string().optional(),
  _usedString: ElementSchema.optional(),
  usedMoney: MoneySchema.optional(),
})
export type CoverageEligibilityResponseInsuranceItemBenefit = z.infer<typeof CoverageEligibilityResponseInsuranceItemBenefitSchema>

/**
 * Benefits and authorization details
 * Benefits and optionally current balances, and authorization details by category or service.
 */
export const CoverageEligibilityResponseInsuranceItemSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  provider: ReferenceSchema.optional(),
  excluded: z.boolean().optional(),
  _excluded: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  network: CodeableConceptSchema.optional(),
  unit: CodeableConceptSchema.optional(),
  term: CodeableConceptSchema.optional(),
  benefit: z.array(CoverageEligibilityResponseInsuranceItemBenefitSchema).optional(),
  authorizationRequired: z.boolean().optional(),
  _authorizationRequired: ElementSchema.optional(),
  authorizationSupporting: z.array(CodeableConceptSchema).optional(),
  authorizationUrl: z.string().optional(),
  _authorizationUrl: ElementSchema.optional(),
})
export type CoverageEligibilityResponseInsuranceItem = z.infer<typeof CoverageEligibilityResponseInsuranceItemSchema>

/**
 * Patient insurance information
 * Financial instruments for reimbursement for the health care products and services.
 * All insurance coverages for the patient which may be applicable for reimbursement, of the products and services listed in the claim, are typically provided in the claim to allow insurers to confirm the ordering of the insurance coverages relative to local 'coordination of benefit' rules. One coverage (and only one) with 'focal=true' is to be used in the adjudication of this claim. Coverages appearing before the focal Coverage in the list, and where 'subrogation=false', should provide a reference to the ClaimResponse containing the adjudication results of the prior claim.
 */
export const CoverageEligibilityResponseInsuranceSchema = BackboneElementSchema.extend({
  coverage: ReferenceSchema,
  inforce: z.boolean().optional(),
  _inforce: ElementSchema.optional(),
  benefitPeriod: PeriodSchema.optional(),
  item: z.array(CoverageEligibilityResponseInsuranceItemSchema).optional(),
})
export type CoverageEligibilityResponseInsurance = z.infer<typeof CoverageEligibilityResponseInsuranceSchema>

/**
 * Processing errors
 * Errors encountered during the processing of the request.
 */
export const CoverageEligibilityResponseErrorSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
})
export type CoverageEligibilityResponseError = z.infer<typeof CoverageEligibilityResponseErrorSchema>

/**
 * This resource provides eligibility and plan details from the processing of an CoverageEligibilityRequest resource.
 */
export const CoverageEligibilityResponseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('CoverageEligibilityResponse'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  purpose: z.array(z.enum(['auth-requirements', 'benefits', 'discovery', 'validation'])),
  _purpose: ElementSchema.optional(),
  patient: ReferenceSchema,
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  created: z.string(),
  _created: ElementSchema.optional(),
  requestor: ReferenceSchema.optional(),
  request: ReferenceSchema,
  outcome: z.enum(['queued', 'complete', 'error', 'partial']),
  _outcome: ElementSchema.optional(),
  disposition: z.string().optional(),
  _disposition: ElementSchema.optional(),
  insurer: ReferenceSchema,
  insurance: z.array(CoverageEligibilityResponseInsuranceSchema).optional(),
  preAuthRef: z.string().optional(),
  _preAuthRef: ElementSchema.optional(),
  form: CodeableConceptSchema.optional(),
  error: z.array(CoverageEligibilityResponseErrorSchema).optional(),
})
export type CoverageEligibilityResponse = z.infer<typeof CoverageEligibilityResponseSchema>

/**
 * Base StructureDefinition for time Type: A time during the day, with no date specified
 */
export const timeSchema = ElementSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type time = z.infer<typeof timeSchema>

/**
 * Base StructureDefinition for base64Binary Type: A stream of bytes
 */
export const base64BinarySchema = ElementSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type base64Binary = z.infer<typeof base64BinarySchema>

/**
 * The response(s) to the question
 * The respondent's answer(s) to the question.
 * The value is nested because we cannot have a repeating structure that has variable type.
 */
export const QuestionnaireResponseItemAnswerSchema = BackboneElementSchema.extend({
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueUri: z.string().optional(),
  _valueUri: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueCoding: CodingSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueReference: ReferenceSchema.optional(),
  item: z.lazy(() => z.array(QuestionnaireResponseItemSchema)).optional(),
})
export type QuestionnaireResponseItemAnswer = z.infer<typeof QuestionnaireResponseItemAnswerSchema>

/**
 * Groups and questions
 * A group or question item from the original questionnaire for which answers are provided.
 * Groups cannot have answers and therefore must nest directly within item. When dealing with questions, nesting must occur within each answer because some questions may have multiple answers (and the nesting occurs for each answer).
 */
export interface QuestionnaireResponseItem extends BackboneElement {
  linkId: string
  _linkId?: Element | undefined
  definition?: string | undefined
  _definition?: Element | undefined
  text?: string | undefined
  _text?: Element | undefined
  answer?: QuestionnaireResponseItemAnswer[] | undefined
  item?: QuestionnaireResponseItem[] | undefined
}

export const QuestionnaireResponseItemSchema: z.ZodType<QuestionnaireResponseItem> = z.lazy(() =>
  BackboneElementSchema.extend({
    linkId: z.string(),
      _linkId: ElementSchema.optional(),
    definition: z.string().optional(),
      _definition: ElementSchema.optional(),
    text: z.string().optional(),
      _text: ElementSchema.optional(),
    answer: z.array(QuestionnaireResponseItemAnswerSchema).optional(),
    item: z.lazy(() => z.array(QuestionnaireResponseItemSchema)).optional(),
  })
)

/**
 * A structured set of questions and their answers. The questions are ordered and grouped into coherent subsets, corresponding to the structure of the grouping of the questionnaire being responded to.
 */
export const QuestionnaireResponseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('QuestionnaireResponse'),
  identifier: IdentifierSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  questionnaire: z.string().optional(),
  _questionnaire: ElementSchema.optional(),
  status: z.enum(['in-progress', 'completed', 'amended', 'entered-in-error', 'stopped']),
  _status: ElementSchema.optional(),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  authored: z.string().optional(),
  _authored: ElementSchema.optional(),
  author: ReferenceSchema.optional(),
  source: ReferenceSchema.optional(),
  item: z.array(QuestionnaireResponseItemSchema).optional(),
})
export type QuestionnaireResponse = z.infer<typeof QuestionnaireResponseSchema>

/**
 * The absolute geographic location
 * The absolute geographic location of the Location, expressed using the WGS84 datum (This is the same co-ordinate system used in KML).
 */
export const LocationPositionSchema = BackboneElementSchema.extend({
  longitude: z.number(),
  _longitude: ElementSchema.optional(),
  latitude: z.number(),
  _latitude: ElementSchema.optional(),
  altitude: z.number().optional(),
  _altitude: ElementSchema.optional(),
})
export type LocationPosition = z.infer<typeof LocationPositionSchema>

/**
 * What days/times during a week is this location usually open
 * This type of information is commonly found published in directories and on websites informing customers when the facility is available.
 * Specific services within the location may have their own hours which could be shorter (or longer) than the locations hours.
 */
export const LocationHoursOfOperationSchema = BackboneElementSchema.extend({
  daysOfWeek: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])).optional(),
  _daysOfWeek: ElementSchema.optional(),
  allDay: z.boolean().optional(),
  _allDay: ElementSchema.optional(),
  openingTime: z.string().optional(),
  _openingTime: ElementSchema.optional(),
  closingTime: z.string().optional(),
  _closingTime: ElementSchema.optional(),
})
export type LocationHoursOfOperation = z.infer<typeof LocationHoursOfOperationSchema>

/**
 * Details and position information for a physical place where services are provided and resources and participants may be stored, found, contained, or accommodated.
 */
export const LocationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Location'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'suspended', 'inactive']).optional(),
  _status: ElementSchema.optional(),
  operationalStatus: CodingSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  alias: z.array(z.string()).optional(),
  _alias: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  mode: z.enum(['instance', 'kind']).optional(),
  _mode: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  address: AddressSchema.optional(),
  physicalType: CodeableConceptSchema.optional(),
  position: LocationPositionSchema.optional(),
  managingOrganization: ReferenceSchema.optional(),
  partOf: ReferenceSchema.optional(),
  hoursOfOperation: z.array(LocationHoursOfOperationSchema).optional(),
  availabilityExceptions: z.string().optional(),
  _availabilityExceptions: ElementSchema.optional(),
  endpoint: z.array(ReferenceSchema).optional(),
})
export type Location = z.infer<typeof LocationSchema>

/**
 * Contact for the product
 * The contact for the health insurance product for a certain purpose.
 * Where multiple contacts for the same purpose are provided there is a standard extension that can be used to determine which one is the preferred contact to use.
 */
export const InsurancePlanContactSchema = BackboneElementSchema.extend({
  purpose: CodeableConceptSchema.optional(),
  name: HumanNameSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
  address: AddressSchema.optional(),
})
export type InsurancePlanContact = z.infer<typeof InsurancePlanContactSchema>

/**
 * Benefit limits
 * The specific limits on the benefit.
 */
export const InsurancePlanCoverageBenefitLimitSchema = BackboneElementSchema.extend({
  value: QuantitySchema.optional(),
  code: CodeableConceptSchema.optional(),
})
export type InsurancePlanCoverageBenefitLimit = z.infer<typeof InsurancePlanCoverageBenefitLimitSchema>

/**
 * List of benefits
 * Specific benefits under this type of coverage.
 */
export const InsurancePlanCoverageBenefitSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  requirement: z.string().optional(),
  _requirement: ElementSchema.optional(),
  limit: z.array(InsurancePlanCoverageBenefitLimitSchema).optional(),
})
export type InsurancePlanCoverageBenefit = z.infer<typeof InsurancePlanCoverageBenefitSchema>

/**
 * Coverage details
 * Details about the coverage offered by the insurance product.
 */
export const InsurancePlanCoverageSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  network: z.array(ReferenceSchema).optional(),
  benefit: z.array(InsurancePlanCoverageBenefitSchema),
})
export type InsurancePlanCoverage = z.infer<typeof InsurancePlanCoverageSchema>

/**
 * Overall costs
 * Overall costs associated with the plan.
 */
export const InsurancePlanPlanGeneralCostSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  groupSize: z.number().optional(),
  _groupSize: ElementSchema.optional(),
  cost: MoneySchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
})
export type InsurancePlanPlanGeneralCost = z.infer<typeof InsurancePlanPlanGeneralCostSchema>

/**
 * List of the costs
 * List of the costs associated with a specific benefit.
 */
export const InsurancePlanPlanSpecificCostBenefitCostSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  applicability: CodeableConceptSchema.optional(),
  qualifiers: z.array(CodeableConceptSchema).optional(),
  value: QuantitySchema.optional(),
})
export type InsurancePlanPlanSpecificCostBenefitCost = z.infer<typeof InsurancePlanPlanSpecificCostBenefitCostSchema>

/**
 * Benefits list
 * List of the specific benefits under this category of benefit.
 */
export const InsurancePlanPlanSpecificCostBenefitSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  cost: z.array(InsurancePlanPlanSpecificCostBenefitCostSchema).optional(),
})
export type InsurancePlanPlanSpecificCostBenefit = z.infer<typeof InsurancePlanPlanSpecificCostBenefitSchema>

/**
 * Specific costs
 * Costs associated with the coverage provided by the product.
 */
export const InsurancePlanPlanSpecificCostSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema,
  benefit: z.array(InsurancePlanPlanSpecificCostBenefitSchema).optional(),
})
export type InsurancePlanPlanSpecificCost = z.infer<typeof InsurancePlanPlanSpecificCostSchema>

/**
 * Plan details
 * Details about an insurance plan.
 */
export const InsurancePlanPlanSchema = BackboneElementSchema.extend({
  identifier: z.array(IdentifierSchema).optional(),
  type: CodeableConceptSchema.optional(),
  coverageArea: z.array(ReferenceSchema).optional(),
  network: z.array(ReferenceSchema).optional(),
  generalCost: z.array(InsurancePlanPlanGeneralCostSchema).optional(),
  specificCost: z.array(InsurancePlanPlanSpecificCostSchema).optional(),
})
export type InsurancePlanPlan = z.infer<typeof InsurancePlanPlanSchema>

/**
 * Details of a Health Insurance product/plan provided by an organization.
 */
export const InsurancePlanSchema = DomainResourceSchema.extend({
  resourceType: z.literal('InsurancePlan'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']).optional(),
  _status: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  alias: z.array(z.string()).optional(),
  _alias: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  ownedBy: ReferenceSchema.optional(),
  administeredBy: ReferenceSchema.optional(),
  coverageArea: z.array(ReferenceSchema).optional(),
  contact: z.array(InsurancePlanContactSchema).optional(),
  endpoint: z.array(ReferenceSchema).optional(),
  network: z.array(ReferenceSchema).optional(),
  coverage: z.array(InsurancePlanCoverageSchema).optional(),
  plan: z.array(InsurancePlanPlanSchema).optional(),
})
export type InsurancePlan = z.infer<typeof InsurancePlanSchema>

/**
 * A human-readable display of the citation
 */
export const CitationSummarySchema = BackboneElementSchema.extend({
  style: CodeableConceptSchema.optional(),
  text: z.string(),
  _text: ElementSchema.optional(),
})
export type CitationSummary = z.infer<typeof CitationSummarySchema>

/**
 * The assignment to an organizing scheme
 */
export const CitationClassificationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  classifier: z.array(CodeableConceptSchema).optional(),
})
export type CitationClassification = z.infer<typeof CitationClassificationSchema>

/**
 * An effective date or period for a status of the citation
 */
export const CitationStatusDateSchema = BackboneElementSchema.extend({
  activity: CodeableConceptSchema,
  actual: z.boolean().optional(),
  _actual: ElementSchema.optional(),
  period: PeriodSchema,
})
export type CitationStatusDate = z.infer<typeof CitationStatusDateSchema>

/**
 * Artifact related to the Citation Resource
 */
export const CitationRelatesToSchema = BackboneElementSchema.extend({
  relationshipType: CodeableConceptSchema,
  targetClassifier: z.array(CodeableConceptSchema).optional(),
  targetUri: z.string().optional(),
  _targetUri: ElementSchema.optional(),
  targetIdentifier: IdentifierSchema.optional(),
  targetReference: ReferenceSchema.optional(),
  targetAttachment: AttachmentSchema.optional(),
})
export type CitationRelatesTo = z.infer<typeof CitationRelatesToSchema>

/**
 * The defined version of the cited artifact
 */
export const CitationCitedArtifactVersionSchema = BackboneElementSchema.extend({
  value: z.string(),
  _value: ElementSchema.optional(),
  baseCitation: ReferenceSchema.optional(),
})
export type CitationCitedArtifactVersion = z.infer<typeof CitationCitedArtifactVersionSchema>

/**
 * An effective date or period for a status of the cited artifact
 */
export const CitationCitedArtifactStatusDateSchema = BackboneElementSchema.extend({
  activity: CodeableConceptSchema,
  actual: z.boolean().optional(),
  _actual: ElementSchema.optional(),
  period: PeriodSchema,
})
export type CitationCitedArtifactStatusDate = z.infer<typeof CitationCitedArtifactStatusDateSchema>

/**
 * The title details of the article or artifact
 */
export const CitationCitedArtifactTitleSchema = BackboneElementSchema.extend({
  type: z.array(CodeableConceptSchema).optional(),
  language: CodeableConceptSchema.optional(),
  text: z.string(),
  _text: ElementSchema.optional(),
})
export type CitationCitedArtifactTitle = z.infer<typeof CitationCitedArtifactTitleSchema>

/**
 * Summary of the article or artifact
 */
export const CitationCitedArtifactAbstractSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  language: CodeableConceptSchema.optional(),
  text: z.string(),
  _text: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
})
export type CitationCitedArtifactAbstract = z.infer<typeof CitationCitedArtifactAbstractSchema>

/**
 * The component of the article or artifact
 */
export const CitationCitedArtifactPartSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  value: z.string().optional(),
  _value: ElementSchema.optional(),
  baseCitation: ReferenceSchema.optional(),
})
export type CitationCitedArtifactPart = z.infer<typeof CitationCitedArtifactPartSchema>

/**
 * The artifact related to the cited artifact
 */
export const CitationCitedArtifactRelatesToSchema = BackboneElementSchema.extend({
  relationshipType: CodeableConceptSchema,
  targetClassifier: z.array(CodeableConceptSchema).optional(),
  targetUri: z.string().optional(),
  _targetUri: ElementSchema.optional(),
  targetIdentifier: IdentifierSchema.optional(),
  targetReference: ReferenceSchema.optional(),
  targetAttachment: AttachmentSchema.optional(),
})
export type CitationCitedArtifactRelatesTo = z.infer<typeof CitationCitedArtifactRelatesToSchema>

/**
 * The collection the cited article or artifact is published in
 */
export const CitationCitedArtifactPublicationFormPublishedInSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  publisher: ReferenceSchema.optional(),
  publisherLocation: z.string().optional(),
  _publisherLocation: ElementSchema.optional(),
})
export type CitationCitedArtifactPublicationFormPublishedIn = z.infer<typeof CitationCitedArtifactPublicationFormPublishedInSchema>

/**
 * Defining the date on which the issue of the journal was published
 */
export const CitationCitedArtifactPublicationFormPeriodicReleaseDateOfPublicationSchema = BackboneElementSchema.extend({
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  year: z.string().optional(),
  _year: ElementSchema.optional(),
  month: z.string().optional(),
  _month: ElementSchema.optional(),
  day: z.string().optional(),
  _day: ElementSchema.optional(),
  season: z.string().optional(),
  _season: ElementSchema.optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
})
export type CitationCitedArtifactPublicationFormPeriodicReleaseDateOfPublication = z.infer<typeof CitationCitedArtifactPublicationFormPeriodicReleaseDateOfPublicationSchema>

/**
 * The specific issue in which the cited article resides
 */
export const CitationCitedArtifactPublicationFormPeriodicReleaseSchema = BackboneElementSchema.extend({
  citedMedium: CodeableConceptSchema.optional(),
  volume: z.string().optional(),
  _volume: ElementSchema.optional(),
  issue: z.string().optional(),
  _issue: ElementSchema.optional(),
  dateOfPublication: CitationCitedArtifactPublicationFormPeriodicReleaseDateOfPublicationSchema.optional(),
})
export type CitationCitedArtifactPublicationFormPeriodicRelease = z.infer<typeof CitationCitedArtifactPublicationFormPeriodicReleaseSchema>

/**
 * If multiple, used to represent alternative forms of the article that are not separate citations
 * A common use is a journal article with a publication date and pagination for a print version and a different publication date for the online version of the same article.
 */
export const CitationCitedArtifactPublicationFormSchema = BackboneElementSchema.extend({
  publishedIn: CitationCitedArtifactPublicationFormPublishedInSchema.optional(),
  periodicRelease: CitationCitedArtifactPublicationFormPeriodicReleaseSchema.optional(),
  articleDate: z.string().optional(),
  _articleDate: ElementSchema.optional(),
  lastRevisionDate: z.string().optional(),
  _lastRevisionDate: ElementSchema.optional(),
  language: z.array(CodeableConceptSchema).optional(),
  accessionNumber: z.string().optional(),
  _accessionNumber: ElementSchema.optional(),
  pageString: z.string().optional(),
  _pageString: ElementSchema.optional(),
  firstPage: z.string().optional(),
  _firstPage: ElementSchema.optional(),
  lastPage: z.string().optional(),
  _lastPage: ElementSchema.optional(),
  pageCount: z.string().optional(),
  _pageCount: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
})
export type CitationCitedArtifactPublicationForm = z.infer<typeof CitationCitedArtifactPublicationFormSchema>

/**
 * Used for any URL for the article or artifact cited
 */
export const CitationCitedArtifactWebLocationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
})
export type CitationCitedArtifactWebLocation = z.infer<typeof CitationCitedArtifactWebLocationSchema>

/**
 * Provenance and copyright of classification
 */
export const CitationCitedArtifactClassificationWhoClassifiedSchema = BackboneElementSchema.extend({
  person: ReferenceSchema.optional(),
  organization: ReferenceSchema.optional(),
  publisher: ReferenceSchema.optional(),
  classifierCopyright: z.string().optional(),
  _classifierCopyright: ElementSchema.optional(),
  freeToShare: z.boolean().optional(),
  _freeToShare: ElementSchema.optional(),
})
export type CitationCitedArtifactClassificationWhoClassified = z.infer<typeof CitationCitedArtifactClassificationWhoClassifiedSchema>

/**
 * The assignment to an organizing scheme
 */
export const CitationCitedArtifactClassificationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  classifier: z.array(CodeableConceptSchema).optional(),
  whoClassified: CitationCitedArtifactClassificationWhoClassifiedSchema.optional(),
})
export type CitationCitedArtifactClassification = z.infer<typeof CitationCitedArtifactClassificationSchema>

/**
 * Organizational affiliation
 * Organization affiliated with the entity.
 */
export const CitationCitedArtifactContributorshipEntryAffiliationInfoSchema = BackboneElementSchema.extend({
  affiliation: z.string().optional(),
  _affiliation: ElementSchema.optional(),
  role: z.string().optional(),
  _role: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
})
export type CitationCitedArtifactContributorshipEntryAffiliationInfo = z.infer<typeof CitationCitedArtifactContributorshipEntryAffiliationInfoSchema>

/**
 * Contributions with accounting for time or number
 */
export const CitationCitedArtifactContributorshipEntryContributionInstanceSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  time: z.string().optional(),
  _time: ElementSchema.optional(),
})
export type CitationCitedArtifactContributorshipEntryContributionInstance = z.infer<typeof CitationCitedArtifactContributorshipEntryContributionInstanceSchema>

/**
 * An individual entity named in the list
 * An individual entity named in the author list or contributor list.
 * Used to report contributorship in individualized ways.
 */
export const CitationCitedArtifactContributorshipEntrySchema = BackboneElementSchema.extend({
  name: HumanNameSchema.optional(),
  initials: z.string().optional(),
  _initials: ElementSchema.optional(),
  collectiveName: z.string().optional(),
  _collectiveName: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  affiliationInfo: z.array(CitationCitedArtifactContributorshipEntryAffiliationInfoSchema).optional(),
  address: z.array(AddressSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  contributionType: z.array(CodeableConceptSchema).optional(),
  role: CodeableConceptSchema.optional(),
  contributionInstance: z.array(CitationCitedArtifactContributorshipEntryContributionInstanceSchema).optional(),
  correspondingContact: z.boolean().optional(),
  _correspondingContact: ElementSchema.optional(),
  listOrder: z.number().optional(),
  _listOrder: ElementSchema.optional(),
})
export type CitationCitedArtifactContributorshipEntry = z.infer<typeof CitationCitedArtifactContributorshipEntrySchema>

/**
 * Used to record a display of the author/contributor list without separate coding for each list member
 */
export const CitationCitedArtifactContributorshipSummarySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  style: CodeableConceptSchema.optional(),
  source: CodeableConceptSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type CitationCitedArtifactContributorshipSummary = z.infer<typeof CitationCitedArtifactContributorshipSummarySchema>

/**
 * Attribution of authors and other contributors
 * This element is used to list authors and other contributors, their contact information, specific contributions, and summary statements.
 */
export const CitationCitedArtifactContributorshipSchema = BackboneElementSchema.extend({
  complete: z.boolean().optional(),
  _complete: ElementSchema.optional(),
  entry: z.array(CitationCitedArtifactContributorshipEntrySchema).optional(),
  summary: z.array(CitationCitedArtifactContributorshipSummarySchema).optional(),
})
export type CitationCitedArtifactContributorship = z.infer<typeof CitationCitedArtifactContributorshipSchema>

/**
 * The article or artifact being described
 */
export const CitationCitedArtifactSchema = BackboneElementSchema.extend({
  identifier: z.array(IdentifierSchema).optional(),
  relatedIdentifier: z.array(IdentifierSchema).optional(),
  dateAccessed: z.string().optional(),
  _dateAccessed: ElementSchema.optional(),
  version: CitationCitedArtifactVersionSchema.optional(),
  currentState: z.array(CodeableConceptSchema).optional(),
  statusDate: z.array(CitationCitedArtifactStatusDateSchema).optional(),
  title: z.array(CitationCitedArtifactTitleSchema).optional(),
  abstract: z.array(CitationCitedArtifactAbstractSchema).optional(),
  part: CitationCitedArtifactPartSchema.optional(),
  relatesTo: z.array(CitationCitedArtifactRelatesToSchema).optional(),
  publicationForm: z.array(CitationCitedArtifactPublicationFormSchema).optional(),
  webLocation: z.array(CitationCitedArtifactWebLocationSchema).optional(),
  classification: z.array(CitationCitedArtifactClassificationSchema).optional(),
  contributorship: CitationCitedArtifactContributorshipSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type CitationCitedArtifact = z.infer<typeof CitationCitedArtifactSchema>

/**
 * The Citation Resource enables reference to any knowledge artifact for purposes of identification and attribution. The Citation Resource supports existing reference structures and developing publication practices such as versioning, expressing complex contributorship roles, and referencing computable resources.
 */
export const CitationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Citation'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  summary: z.array(CitationSummarySchema).optional(),
  classification: z.array(CitationClassificationSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  currentState: z.array(CodeableConceptSchema).optional(),
  statusDate: z.array(CitationStatusDateSchema).optional(),
  relatesTo: z.array(CitationRelatesToSchema).optional(),
  citedArtifact: CitationCitedArtifactSchema.optional(),
})
export type Citation = z.infer<typeof CitationSchema>

/**
 * Detailed information about any events relevant to this notification
 * Detailed information about events relevant to this subscription notification.
 */
export const SubscriptionStatusNotificationEventSchema = BackboneElementSchema.extend({
  eventNumber: z.string(),
  _eventNumber: ElementSchema.optional(),
  timestamp: z.string().optional(),
  _timestamp: ElementSchema.optional(),
  focus: ReferenceSchema.optional(),
  additionalContext: z.array(ReferenceSchema).optional(),
})
export type SubscriptionStatusNotificationEvent = z.infer<typeof SubscriptionStatusNotificationEventSchema>

/**
 * The SubscriptionStatus resource describes the state of a Subscription during notifications.
 */
export const SubscriptionStatusSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SubscriptionStatus'),
  status: z.enum(['requested', 'active', 'error', 'off']).optional(),
  _status: ElementSchema.optional(),
  type: z.enum(['handshake', 'heartbeat', 'event-notification', 'query-status', 'query-event']),
  _type: ElementSchema.optional(),
  eventsSinceSubscriptionStart: z.string().optional(),
  _eventsSinceSubscriptionStart: ElementSchema.optional(),
  notificationEvent: z.array(SubscriptionStatusNotificationEventSchema).optional(),
  subscription: ReferenceSchema,
  topic: z.string().optional(),
  _topic: ElementSchema.optional(),
  error: z.array(CodeableConceptSchema).optional(),
})
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>

/**
 * Population criteria
 * A population criteria for the measure.
 */
export const MeasureGroupPopulationSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  criteria: ExpressionSchema,
})
export type MeasureGroupPopulation = z.infer<typeof MeasureGroupPopulationSchema>

/**
 * Stratifier criteria component for the measure
 * A component of the stratifier criteria for the measure report, specified as either the name of a valid CQL expression defined within a referenced library or a valid FHIR Resource Path.
 * Stratifiers are defined either as a single criteria, or as a set of component criteria.
 */
export const MeasureGroupStratifierComponentSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  criteria: ExpressionSchema,
})
export type MeasureGroupStratifierComponent = z.infer<typeof MeasureGroupStratifierComponentSchema>

/**
 * Stratifier criteria for the measure
 * The stratifier criteria for the measure report, specified as either the name of a valid CQL expression defined within a referenced library or a valid FHIR Resource Path.
 */
export const MeasureGroupStratifierSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  criteria: ExpressionSchema.optional(),
  component: z.array(MeasureGroupStratifierComponentSchema).optional(),
})
export type MeasureGroupStratifier = z.infer<typeof MeasureGroupStratifierSchema>

/**
 * Population criteria group
 * A group of population criteria for the measure.
 */
export const MeasureGroupSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  population: z.array(MeasureGroupPopulationSchema).optional(),
  stratifier: z.array(MeasureGroupStratifierSchema).optional(),
})
export type MeasureGroup = z.infer<typeof MeasureGroupSchema>

/**
 * What other data should be reported with the measure
 * The supplemental data criteria for the measure report, specified as either the name of a valid CQL expression within a referenced library, or a valid FHIR Resource Path.
 * Note that supplemental data are reported as observations for each patient and included in the evaluatedResources bundle. See the MeasureReport resource or the Quality Reporting topic for more information.
 */
export const MeasureSupplementalDataSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  usage: z.array(CodeableConceptSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  criteria: ExpressionSchema,
})
export type MeasureSupplementalData = z.infer<typeof MeasureSupplementalDataSchema>

/**
 * The Measure resource provides the definition of a quality measure.
 */
export const MeasureSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Measure'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  subtitle: z.string().optional(),
  _subtitle: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  usage: z.string().optional(),
  _usage: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  topic: z.array(CodeableConceptSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  library: z.array(z.string()).optional(),
  _library: ElementSchema.optional(),
  disclaimer: z.string().optional(),
  _disclaimer: ElementSchema.optional(),
  scoring: CodeableConceptSchema.optional(),
  compositeScoring: CodeableConceptSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  riskAdjustment: z.string().optional(),
  _riskAdjustment: ElementSchema.optional(),
  rateAggregation: z.string().optional(),
  _rateAggregation: ElementSchema.optional(),
  rationale: z.string().optional(),
  _rationale: ElementSchema.optional(),
  clinicalRecommendationStatement: z.string().optional(),
  _clinicalRecommendationStatement: ElementSchema.optional(),
  improvementNotation: CodeableConceptSchema.optional(),
  definition: z.array(z.string()).optional(),
  _definition: ElementSchema.optional(),
  guidance: z.string().optional(),
  _guidance: ElementSchema.optional(),
  group: z.array(MeasureGroupSchema).optional(),
  supplementalData: z.array(MeasureSupplementalDataSchema).optional(),
})
export type Measure = z.infer<typeof MeasureSchema>

/**
 * Who should participate in the action
 * Indicates who should participate in performing the action described.
 */
export const ActivityDefinitionParticipantSchema = BackboneElementSchema.extend({
  type: z.enum(['patient', 'practitioner', 'related-person', 'device']),
  _type: ElementSchema.optional(),
  role: CodeableConceptSchema.optional(),
})
export type ActivityDefinitionParticipant = z.infer<typeof ActivityDefinitionParticipantSchema>

/**
 * Dynamic aspects of the definition
 * Dynamic values that will be evaluated to produce values for elements of the resulting resource. For example, if the dosage of a medication must be computed based on the patient's weight, a dynamic value would be used to specify an expression that calculated the weight, and the path on the request resource that would contain the result.
 * Dynamic values are applied in the order in which they are defined in the ActivityDefinition. Note that if both a transform and dynamic values are specified, the dynamic values will be applied to the result of the transform.
 */
export const ActivityDefinitionDynamicValueSchema = BackboneElementSchema.extend({
  path: z.string(),
  _path: ElementSchema.optional(),
  expression: ExpressionSchema,
})
export type ActivityDefinitionDynamicValue = z.infer<typeof ActivityDefinitionDynamicValueSchema>

/**
 * This resource allows for the definition of some activity to be performed, independent of a particular patient, practitioner, or other performance context.
 */
export const ActivityDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ActivityDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  subtitle: z.string().optional(),
  _subtitle: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  subjectCanonical: z.string().optional(),
  _subjectCanonical: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  usage: z.string().optional(),
  _usage: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  topic: z.array(CodeableConceptSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  library: z.array(z.string()).optional(),
  _library: ElementSchema.optional(),
  kind: z.enum(['Appointment', 'AppointmentResponse', 'CarePlan', 'Claim', 'CommunicationRequest', 'Contract', 'DeviceRequest', 'EnrollmentRequest', 'ImmunizationRecommendation', 'MedicationRequest', 'NutritionOrder', 'ServiceRequest', 'SupplyRequest', 'Task', 'VisionPrescription']).optional(),
  _kind: ElementSchema.optional(),
  profile: z.string().optional(),
  _profile: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']).optional(),
  _intent: ElementSchema.optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  doNotPerform: z.boolean().optional(),
  _doNotPerform: ElementSchema.optional(),
  timingTiming: TimingSchema.optional(),
  timingDateTime: z.string().optional(),
  _timingDateTime: ElementSchema.optional(),
  timingAge: AgeSchema.optional(),
  timingPeriod: PeriodSchema.optional(),
  timingRange: RangeSchema.optional(),
  timingDuration: DurationSchema.optional(),
  location: ReferenceSchema.optional(),
  participant: z.array(ActivityDefinitionParticipantSchema).optional(),
  productReference: ReferenceSchema.optional(),
  productCodeableConcept: CodeableConceptSchema.optional(),
  quantity: QuantitySchema.optional(),
  dosage: z.array(DosageSchema).optional(),
  bodySite: z.array(CodeableConceptSchema).optional(),
  specimenRequirement: z.array(ReferenceSchema).optional(),
  observationRequirement: z.array(ReferenceSchema).optional(),
  observationResultRequirement: z.array(ReferenceSchema).optional(),
  transform: z.string().optional(),
  _transform: ElementSchema.optional(),
  dynamicValue: z.array(ActivityDefinitionDynamicValueSchema).optional(),
})
export type ActivityDefinition = z.infer<typeof ActivityDefinitionSchema>

/**
 * Defines an affiliation/assotiation/relationship between 2 distinct oganizations, that is not a part-of relationship/sub-division relationship.
 */
export const OrganizationAffiliationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('OrganizationAffiliation'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  organization: ReferenceSchema.optional(),
  participatingOrganization: ReferenceSchema.optional(),
  network: z.array(ReferenceSchema).optional(),
  code: z.array(CodeableConceptSchema).optional(),
  specialty: z.array(CodeableConceptSchema).optional(),
  location: z.array(ReferenceSchema).optional(),
  healthcareService: z.array(ReferenceSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  endpoint: z.array(ReferenceSchema).optional(),
})
export type OrganizationAffiliation = z.infer<typeof OrganizationAffiliationSchema>

/**
 * Past list of status codes (the current status may be included to cover the start date of the status)
 * The history of statuses that the EpisodeOfCare has been through (without requiring processing the history of the resource).
 */
export const EpisodeOfCareStatusHistorySchema = BackboneElementSchema.extend({
  status: z.enum(['planned', 'waitlist', 'active', 'onhold', 'finished', 'cancelled', 'entered-in-error']),
  _status: ElementSchema.optional(),
  period: PeriodSchema,
})
export type EpisodeOfCareStatusHistory = z.infer<typeof EpisodeOfCareStatusHistorySchema>

/**
 * The list of diagnosis relevant to this episode of care
 */
export const EpisodeOfCareDiagnosisSchema = BackboneElementSchema.extend({
  condition: ReferenceSchema,
  role: CodeableConceptSchema.optional(),
  rank: z.number().optional(),
  _rank: ElementSchema.optional(),
})
export type EpisodeOfCareDiagnosis = z.infer<typeof EpisodeOfCareDiagnosisSchema>

/**
 * An association between a patient and an organization / healthcare provider(s) during which time encounters may occur. The managing organization assumes a level of responsibility for the patient during this time.
 */
export const EpisodeOfCareSchema = DomainResourceSchema.extend({
  resourceType: z.literal('EpisodeOfCare'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['planned', 'waitlist', 'active', 'onhold', 'finished', 'cancelled', 'entered-in-error']),
  _status: ElementSchema.optional(),
  statusHistory: z.array(EpisodeOfCareStatusHistorySchema).optional(),
  type: z.array(CodeableConceptSchema).optional(),
  diagnosis: z.array(EpisodeOfCareDiagnosisSchema).optional(),
  patient: ReferenceSchema,
  managingOrganization: ReferenceSchema.optional(),
  period: PeriodSchema.optional(),
  referralRequest: z.array(ReferenceSchema).optional(),
  careManager: ReferenceSchema.optional(),
  team: z.array(ReferenceSchema).optional(),
  account: z.array(ReferenceSchema).optional(),
})
export type EpisodeOfCare = z.infer<typeof EpisodeOfCareSchema>

/**
 * Device details
 * Specific parameters for the ordered item.  For example, the prism value for lenses.
 */
export const DeviceRequestParameterSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
})
export type DeviceRequestParameter = z.infer<typeof DeviceRequestParameterSchema>

/**
 * Represents a request for a patient to employ a medical device. The device may be an implantable device, or an external assistive device, such as a walker.
 */
export const DeviceRequestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceRequest'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  priorRequest: z.array(ReferenceSchema).optional(),
  groupIdentifier: IdentifierSchema.optional(),
  status: z.enum(['draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown']).optional(),
  _status: ElementSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  codeReference: ReferenceSchema.optional(),
  codeCodeableConcept: CodeableConceptSchema.optional(),
  parameter: z.array(DeviceRequestParameterSchema).optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  occurrenceTiming: TimingSchema.optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  requester: ReferenceSchema.optional(),
  performerType: CodeableConceptSchema.optional(),
  performer: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  insurance: z.array(ReferenceSchema).optional(),
  supportingInfo: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  relevantHistory: z.array(ReferenceSchema).optional(),
})
export type DeviceRequest = z.infer<typeof DeviceRequestSchema>

/**
 * Base StructureDefinition for markdown type: A string that may contain Github Flavored Markdown syntax for optional processing by a mark down presentation engine
 */
export const markdownSchema = stringSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type markdown = z.infer<typeof markdownSchema>

/**
 * Software that is covered by this capability statement
 * Software that is covered by this capability statement.  It is used when the capability statement describes the capabilities of a particular software version, independent of an installation.
 */
export const CapabilityStatementSoftwareSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  releaseDate: z.string().optional(),
  _releaseDate: ElementSchema.optional(),
})
export type CapabilityStatementSoftware = z.infer<typeof CapabilityStatementSoftwareSchema>

/**
 * If this describes a specific instance
 * Identifies a specific implementation instance that is described by the capability statement - i.e. a particular installation, rather than the capabilities of a software program.
 */
export const CapabilityStatementImplementationSchema = BackboneElementSchema.extend({
  description: z.string(),
  _description: ElementSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  custodian: ReferenceSchema.optional(),
})
export type CapabilityStatementImplementation = z.infer<typeof CapabilityStatementImplementationSchema>

/**
 * Information about security of implementation
 * Information about security implementation from an interface perspective - what a client needs to know.
 */
export const CapabilityStatementRestSecuritySchema = BackboneElementSchema.extend({
  cors: z.boolean().optional(),
  _cors: ElementSchema.optional(),
  service: z.array(CodeableConceptSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type CapabilityStatementRestSecurity = z.infer<typeof CapabilityStatementRestSecuritySchema>

/**
 * What operations are supported?
 * Identifies a restful operation supported by the solution.
 * In general, a Resource will only appear in a CapabilityStatement if the server actually has some capabilities - e.g. there is at least one interaction supported. However interactions can be omitted to support summarization (_summary = true).
 */
export const CapabilityStatementRestResourceInteractionSchema = BackboneElementSchema.extend({
  code: z.enum(['read', 'vread', 'update', 'patch', 'delete', 'history-instance', 'history-type', 'create', 'search-type']),
  _code: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
})
export type CapabilityStatementRestResourceInteraction = z.infer<typeof CapabilityStatementRestResourceInteractionSchema>

/**
 * Search parameters supported by implementation
 * Search parameters for implementations to support and/or make use of - either references to ones defined in the specification, or additional ones defined for/by the implementation.
 * The search parameters should include the control search parameters such as _sort, _count, etc. that also apply to this resource (though many will be listed at [CapabilityStatement.rest.searchParam](capabilitystatement-definitions.html#CapabilityStatement.rest.searchParam)). The behavior of some search parameters may be further described by other code or extension elements, or narrative within the capability statement or linked [SearchParameter](searchparameter.html#) definitions.
 */
export interface CapabilityStatementRestResourceSearchParam extends BackboneElement {
  name: string
  _name?: Element | undefined
  definition?: string | undefined
  _definition?: Element | undefined
  type: ('number'|'date'|'string'|'token'|'reference'|'composite'|'quantity'|'uri'|'special')
  _type?: Element | undefined
  documentation?: string | undefined
  _documentation?: Element | undefined
}

export const CapabilityStatementRestResourceSearchParamSchema: z.ZodType<CapabilityStatementRestResourceSearchParam> = z.lazy(() =>
  BackboneElementSchema.extend({
    name: z.string(),
      _name: ElementSchema.optional(),
    definition: z.string().optional(),
      _definition: ElementSchema.optional(),
    type: z.enum(['number', 'date', 'string', 'token', 'reference', 'composite', 'quantity', 'uri', 'special']),
      _type: ElementSchema.optional(),
    documentation: z.string().optional(),
      _documentation: ElementSchema.optional(),
  })
)

/**
 * Definition of a resource operation
 * Definition of an operation or a named query together with its parameters and their meaning and type. Consult the definition of the operation for details about how to invoke the operation, and the parameters.
 * Operations linked from CapabilityStatement.rest.resource.operation must have OperationDefinition.type = true or OperationDefinition.instance = true.    
 */
export interface CapabilityStatementRestResourceOperation extends BackboneElement {
  name: string
  _name?: Element | undefined
  definition: string
  _definition?: Element | undefined
  documentation?: string | undefined
  _documentation?: Element | undefined
}

export const CapabilityStatementRestResourceOperationSchema: z.ZodType<CapabilityStatementRestResourceOperation> = z.lazy(() =>
  BackboneElementSchema.extend({
    name: z.string(),
      _name: ElementSchema.optional(),
    definition: z.string(),
      _definition: ElementSchema.optional(),
    documentation: z.string().optional(),
      _documentation: ElementSchema.optional(),
  })
)

/**
 * Resource served on the REST interface
 * A specification of the restful capabilities of the solution for a specific resource type.
 * Max of one repetition per resource type.
 */
export const CapabilityStatementRestResourceSchema = BackboneElementSchema.extend({
  type: z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']),
  _type: ElementSchema.optional(),
  profile: z.string().optional(),
  _profile: ElementSchema.optional(),
  supportedProfile: z.array(z.string()).optional(),
  _supportedProfile: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  interaction: z.array(CapabilityStatementRestResourceInteractionSchema).optional(),
  versioning: z.enum(['no-version', 'versioned', 'versioned-update']).optional(),
  _versioning: ElementSchema.optional(),
  readHistory: z.boolean().optional(),
  _readHistory: ElementSchema.optional(),
  updateCreate: z.boolean().optional(),
  _updateCreate: ElementSchema.optional(),
  conditionalCreate: z.boolean().optional(),
  _conditionalCreate: ElementSchema.optional(),
  conditionalRead: z.enum(['not-supported', 'modified-since', 'not-match', 'full-support']).optional(),
  _conditionalRead: ElementSchema.optional(),
  conditionalUpdate: z.boolean().optional(),
  _conditionalUpdate: ElementSchema.optional(),
  conditionalDelete: z.enum(['not-supported', 'single', 'multiple']).optional(),
  _conditionalDelete: ElementSchema.optional(),
  referencePolicy: z.array(z.enum(['literal', 'logical', 'resolves', 'enforced', 'local'])).optional(),
  _referencePolicy: ElementSchema.optional(),
  searchInclude: z.array(z.string()).optional(),
  _searchInclude: ElementSchema.optional(),
  searchRevInclude: z.array(z.string()).optional(),
  _searchRevInclude: ElementSchema.optional(),
  searchParam: z.array(CapabilityStatementRestResourceSearchParamSchema).optional(),
  operation: z.array(CapabilityStatementRestResourceOperationSchema).optional(),
})
export type CapabilityStatementRestResource = z.infer<typeof CapabilityStatementRestResourceSchema>

/**
 * What operations are supported?
 * A specification of restful operations supported by the system.
 */
export const CapabilityStatementRestInteractionSchema = BackboneElementSchema.extend({
  code: z.enum(['transaction', 'batch', 'search-system', 'history-system']),
  _code: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
})
export type CapabilityStatementRestInteraction = z.infer<typeof CapabilityStatementRestInteractionSchema>

/**
 * If the endpoint is a RESTful one
 * A definition of the restful capabilities of the solution, if any.
 * Multiple repetitions allow definition of both client and/or server behaviors or possibly behaviors under different configuration settings (for software or requirements statements).
 */
export const CapabilityStatementRestSchema = BackboneElementSchema.extend({
  mode: z.enum(['client', 'server']),
  _mode: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  security: CapabilityStatementRestSecuritySchema.optional(),
  resource: z.array(CapabilityStatementRestResourceSchema).optional(),
  interaction: z.array(CapabilityStatementRestInteractionSchema).optional(),
  searchParam: z.lazy(() => z.array(CapabilityStatementRestResourceSearchParamSchema)).optional(),
  operation: z.lazy(() => z.array(CapabilityStatementRestResourceOperationSchema)).optional(),
  compartment: z.array(z.string()).optional(),
  _compartment: ElementSchema.optional(),
})
export type CapabilityStatementRest = z.infer<typeof CapabilityStatementRestSchema>

/**
 * Where messages should be sent
 * An endpoint (network accessible address) to which messages and/or replies are to be sent.
 */
export const CapabilityStatementMessagingEndpointSchema = BackboneElementSchema.extend({
  protocol: CodingSchema,
  address: z.string(),
  _address: ElementSchema.optional(),
})
export type CapabilityStatementMessagingEndpoint = z.infer<typeof CapabilityStatementMessagingEndpointSchema>

/**
 * Messages supported by this system
 * References to message definitions for messages this system can send or receive.
 * This is a proposed alternative to the messaging.event structure.
 */
export const CapabilityStatementMessagingSupportedMessageSchema = BackboneElementSchema.extend({
  mode: z.enum(['sender', 'receiver']),
  _mode: ElementSchema.optional(),
  definition: z.string(),
  _definition: ElementSchema.optional(),
})
export type CapabilityStatementMessagingSupportedMessage = z.infer<typeof CapabilityStatementMessagingSupportedMessageSchema>

/**
 * If messaging is supported
 * A description of the messaging capabilities of the solution.
 * Multiple repetitions allow the documentation of multiple endpoints per solution.
 */
export const CapabilityStatementMessagingSchema = BackboneElementSchema.extend({
  endpoint: z.array(CapabilityStatementMessagingEndpointSchema).optional(),
  reliableCache: z.number().optional(),
  _reliableCache: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  supportedMessage: z.array(CapabilityStatementMessagingSupportedMessageSchema).optional(),
})
export type CapabilityStatementMessaging = z.infer<typeof CapabilityStatementMessagingSchema>

/**
 * Document definition
 * A document definition.
 */
export const CapabilityStatementDocumentSchema = BackboneElementSchema.extend({
  mode: z.enum(['producer', 'consumer']),
  _mode: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  profile: z.string(),
  _profile: ElementSchema.optional(),
})
export type CapabilityStatementDocument = z.infer<typeof CapabilityStatementDocumentSchema>

/**
 * A Capability Statement documents a set of capabilities (behaviors) of a FHIR Server for a particular version of FHIR that may be used as a statement of actual server functionality or a statement of required or desired server implementation.
 */
export const CapabilityStatementSchema = DomainResourceSchema.extend({
  resourceType: z.literal('CapabilityStatement'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  kind: z.enum(['instance', 'capability', 'requirements']),
  _kind: ElementSchema.optional(),
  instantiates: z.array(z.string()).optional(),
  _instantiates: ElementSchema.optional(),
  imports: z.array(z.string()).optional(),
  _imports: ElementSchema.optional(),
  software: CapabilityStatementSoftwareSchema.optional(),
  implementation: CapabilityStatementImplementationSchema.optional(),
  fhirVersion: z.enum(['0.01', '0.05', '0.06', '0.11', '0.0.80', '0.0.81', '0.0.82', '0.4.0', '0.5.0', '1.0.0', '1.0.1', '1.0.2', '1.1.0', '1.4.0', '1.6.0', '1.8.0', '3.0.0', '3.0.1', '3.0.2', '3.3.0', '3.5.0', '4.0.0', '4.0.1', '4.1.0', '4.3.0-cibuild', '4.3.0-snapshot1', '4.3.0']),
  _fhirVersion: ElementSchema.optional(),
  format: z.array(z.string()),
  _format: ElementSchema.optional(),
  patchFormat: z.array(z.string()).optional(),
  _patchFormat: ElementSchema.optional(),
  implementationGuide: z.array(z.string()).optional(),
  _implementationGuide: ElementSchema.optional(),
  rest: z.array(CapabilityStatementRestSchema).optional(),
  messaging: z.array(CapabilityStatementMessagingSchema).optional(),
  document: z.array(CapabilityStatementDocumentSchema).optional(),
})
export type CapabilityStatement = z.infer<typeof CapabilityStatementSchema>

/**
 * The technical details of an endpoint that can be used for electronic services, such as for web services providing XDS.b or a REST endpoint for another FHIR server. This may include any security context information.
 */
export const EndpointSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Endpoint'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'suspended', 'error', 'off', 'entered-in-error', 'test']),
  _status: ElementSchema.optional(),
  connectionType: CodingSchema,
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  managingOrganization: ReferenceSchema.optional(),
  contact: z.array(ContactPointSchema).optional(),
  period: PeriodSchema.optional(),
  payloadType: z.array(CodeableConceptSchema),
  payloadMimeType: z.array(z.string()).optional(),
  _payloadMimeType: ElementSchema.optional(),
  address: z.string(),
  _address: ElementSchema.optional(),
  header: z.array(z.string()).optional(),
  _header: ElementSchema.optional(),
})
export type Endpoint = z.infer<typeof EndpointSchema>

/**
 * If this describes a specific package/container of the substance
 * Substance may be used to describe a kind of substance, or a specific package/container of the substance: an instance.
 */
export const SubstanceInstanceSchema = BackboneElementSchema.extend({
  identifier: IdentifierSchema.optional(),
  expiry: z.string().optional(),
  _expiry: ElementSchema.optional(),
  quantity: QuantitySchema.optional(),
})
export type SubstanceInstance = z.infer<typeof SubstanceInstanceSchema>

/**
 * Composition information about the substance
 * A substance can be composed of other substances.
 */
export const SubstanceIngredientSchema = BackboneElementSchema.extend({
  quantity: RatioSchema.optional(),
  substanceCodeableConcept: CodeableConceptSchema.optional(),
  substanceReference: ReferenceSchema.optional(),
})
export type SubstanceIngredient = z.infer<typeof SubstanceIngredientSchema>

/**
 * A homogeneous material with a definite composition.
 */
export const SubstanceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Substance'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema,
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  instance: z.array(SubstanceInstanceSchema).optional(),
  ingredient: z.array(SubstanceIngredientSchema).optional(),
})
export type Substance = z.infer<typeof SubstanceSchema>

/**
 * An item that this catalog entry is related to
 * Used for example, to point to a substance, or to a device used to administer a medication.
 */
export const CatalogEntryRelatedEntrySchema = BackboneElementSchema.extend({
  relationtype: z.enum(['triggers', 'is-replaced-by']),
  _relationtype: ElementSchema.optional(),
  item: ReferenceSchema,
})
export type CatalogEntryRelatedEntry = z.infer<typeof CatalogEntryRelatedEntrySchema>

/**
 * Catalog entries are wrappers that contextualize items included in a catalog.
 */
export const CatalogEntrySchema = DomainResourceSchema.extend({
  resourceType: z.literal('CatalogEntry'),
  identifier: z.array(IdentifierSchema).optional(),
  type: CodeableConceptSchema.optional(),
  orderable: z.boolean(),
  _orderable: ElementSchema.optional(),
  referencedItem: ReferenceSchema,
  additionalIdentifier: z.array(IdentifierSchema).optional(),
  classification: z.array(CodeableConceptSchema).optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']).optional(),
  _status: ElementSchema.optional(),
  validityPeriod: PeriodSchema.optional(),
  validTo: z.string().optional(),
  _validTo: ElementSchema.optional(),
  lastUpdated: z.string().optional(),
  _lastUpdated: ElementSchema.optional(),
  additionalCharacteristic: z.array(CodeableConceptSchema).optional(),
  additionalClassification: z.array(CodeableConceptSchema).optional(),
  relatedEntry: z.array(CatalogEntryRelatedEntrySchema).optional(),
})
export type CatalogEntry = z.infer<typeof CatalogEntrySchema>

/**
 * Include / Exclude group members by Trait
 * Identifies traits whose presence r absence is shared by members of the group.
 * All the identified characteristics must be true for an entity to a member of the group.
 */
export const GroupCharacteristicSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  exclude: z.boolean(),
  _exclude: ElementSchema.optional(),
  period: PeriodSchema.optional(),
})
export type GroupCharacteristic = z.infer<typeof GroupCharacteristicSchema>

/**
 * Who or what is in group
 * Identifies the resource instances that are members of the group.
 */
export const GroupMemberSchema = BackboneElementSchema.extend({
  entity: ReferenceSchema,
  period: PeriodSchema.optional(),
  inactive: z.boolean().optional(),
  _inactive: ElementSchema.optional(),
})
export type GroupMember = z.infer<typeof GroupMemberSchema>

/**
 * Represents a defined collection of entities that may be discussed or acted upon collectively but which are not expected to act collectively, and are not formally or legally recognized; i.e. a collection of entities that isn't an Organization.
 */
export const GroupSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Group'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  type: z.enum(['person', 'animal', 'practitioner', 'device', 'medication', 'substance']),
  _type: ElementSchema.optional(),
  actual: z.boolean(),
  _actual: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  quantity: z.number().optional(),
  _quantity: ElementSchema.optional(),
  managingEntity: ReferenceSchema.optional(),
  characteristic: z.array(GroupCharacteristicSchema).optional(),
  member: z.array(GroupMemberSchema).optional(),
})
export type Group = z.infer<typeof GroupSchema>

/**
 * Who performed the series
 * Indicates who or what performed the series and how they were involved.
 * If the person who performed the series is not known, their Organization may be recorded. A patient, or related person, may be the performer, e.g. for patient-captured images.
 */
export const ImagingStudySeriesPerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type ImagingStudySeriesPerformer = z.infer<typeof ImagingStudySeriesPerformerSchema>

/**
 * A single SOP instance from the series
 * A single SOP instance within the series, e.g. an image, or presentation state.
 */
export const ImagingStudySeriesInstanceSchema = BackboneElementSchema.extend({
  uid: z.string(),
  _uid: ElementSchema.optional(),
  sopClass: CodingSchema,
  number: z.number().optional(),
  _number: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
})
export type ImagingStudySeriesInstance = z.infer<typeof ImagingStudySeriesInstanceSchema>

/**
 * Each study has one or more series of instances
 * Each study has one or more series of images or other content.
 */
export const ImagingStudySeriesSchema = BackboneElementSchema.extend({
  uid: z.string(),
  _uid: ElementSchema.optional(),
  number: z.number().optional(),
  _number: ElementSchema.optional(),
  modality: CodingSchema,
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  numberOfInstances: z.number().optional(),
  _numberOfInstances: ElementSchema.optional(),
  endpoint: z.array(ReferenceSchema).optional(),
  bodySite: CodingSchema.optional(),
  laterality: CodingSchema.optional(),
  specimen: z.array(ReferenceSchema).optional(),
  started: z.string().optional(),
  _started: ElementSchema.optional(),
  performer: z.array(ImagingStudySeriesPerformerSchema).optional(),
  instance: z.array(ImagingStudySeriesInstanceSchema).optional(),
})
export type ImagingStudySeries = z.infer<typeof ImagingStudySeriesSchema>

/**
 * Representation of the content produced in a DICOM imaging study. A study comprises a set of series, each of which includes a set of Service-Object Pair Instances (SOP Instances - images or other data) acquired or produced in a common context.  A series is of only one modality (e.g. X-ray, CT, MR, ultrasound), but a study may have multiple series of different modalities.
 */
export const ImagingStudySchema = DomainResourceSchema.extend({
  resourceType: z.literal('ImagingStudy'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['registered', 'available', 'cancelled', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  modality: z.array(CodingSchema).optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  started: z.string().optional(),
  _started: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  referrer: ReferenceSchema.optional(),
  interpreter: z.array(ReferenceSchema).optional(),
  endpoint: z.array(ReferenceSchema).optional(),
  numberOfSeries: z.number().optional(),
  _numberOfSeries: ElementSchema.optional(),
  numberOfInstances: z.number().optional(),
  _numberOfInstances: ElementSchema.optional(),
  procedureReference: ReferenceSchema.optional(),
  procedureCode: z.array(CodeableConceptSchema).optional(),
  location: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  series: z.array(ImagingStudySeriesSchema).optional(),
})
export type ImagingStudy = z.infer<typeof ImagingStudySchema>

/**
 * Base StructureDefinition for dateTime Type: A date, date-time or partial date (e.g. just year or year + month).  If hours and minutes are specified, a time zone SHALL be populated. The format is a union of the schema types gYear, gYearMonth, date and dateTime. Seconds must be provided due to schema type constraints but may be zero-filled and may be ignored.                 Dates SHALL be valid dates.
 */
export const dateTimeSchema = ElementSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type dateTime = z.infer<typeof dateTimeSchema>

/**
 * Contact for the organization for a certain purpose
 * Where multiple contacts for the same purpose are provided there is a standard extension that can be used to determine which one is the preferred contact to use.
 */
export const OrganizationContactSchema = BackboneElementSchema.extend({
  purpose: CodeableConceptSchema.optional(),
  name: HumanNameSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
  address: AddressSchema.optional(),
})
export type OrganizationContact = z.infer<typeof OrganizationContactSchema>

/**
 * A formally or informally recognized grouping of people or organizations formed for the purpose of achieving some form of collective action.  Includes companies, institutions, corporations, departments, community groups, healthcare practice groups, payer/insurer, etc.
 */
export const OrganizationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Organization'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  alias: z.array(z.string()).optional(),
  _alias: ElementSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
  address: z.array(AddressSchema).optional(),
  partOf: ReferenceSchema.optional(),
  contact: z.array(OrganizationContactSchema).optional(),
  endpoint: z.array(ReferenceSchema).optional(),
})
export type Organization = z.infer<typeof OrganizationSchema>

/**
 * A sequence used as reference
 * A sequence that is used as a reference to describe variants that are present in a sequence analyzed.
 */
export const MolecularSequenceReferenceSeqSchema = BackboneElementSchema.extend({
  chromosome: CodeableConceptSchema.optional(),
  genomeBuild: z.string().optional(),
  _genomeBuild: ElementSchema.optional(),
  orientation: z.enum(['sense', 'antisense']).optional(),
  _orientation: ElementSchema.optional(),
  referenceSeqId: CodeableConceptSchema.optional(),
  referenceSeqPointer: ReferenceSchema.optional(),
  referenceSeqString: z.string().optional(),
  _referenceSeqString: ElementSchema.optional(),
  strand: z.enum(['watson', 'crick']).optional(),
  _strand: ElementSchema.optional(),
  windowStart: z.number().optional(),
  _windowStart: ElementSchema.optional(),
  windowEnd: z.number().optional(),
  _windowEnd: ElementSchema.optional(),
})
export type MolecularSequenceReferenceSeq = z.infer<typeof MolecularSequenceReferenceSeqSchema>

/**
 * Variant in sequence
 * The definition of variant here originates from Sequence ontology ([variant_of](http://www.sequenceontology.org/browser/current_svn/term/variant_of)). This element can represent amino acid or nucleic sequence change(including insertion,deletion,SNP,etc.)  It can represent some complex mutation or segment variation with the assist of CIGAR string.
 */
export const MolecularSequenceVariantSchema = BackboneElementSchema.extend({
  start: z.number().optional(),
  _start: ElementSchema.optional(),
  end: z.number().optional(),
  _end: ElementSchema.optional(),
  observedAllele: z.string().optional(),
  _observedAllele: ElementSchema.optional(),
  referenceAllele: z.string().optional(),
  _referenceAllele: ElementSchema.optional(),
  cigar: z.string().optional(),
  _cigar: ElementSchema.optional(),
  variantPointer: ReferenceSchema.optional(),
})
export type MolecularSequenceVariant = z.infer<typeof MolecularSequenceVariantSchema>

/**
 * Receiver Operator Characteristic (ROC) Curve
 * Receiver Operator Characteristic (ROC) Curve  to give sensitivity/specificity tradeoff.
 */
export const MolecularSequenceQualityRocSchema = BackboneElementSchema.extend({
  score: z.array(z.number()).optional(),
  _score: ElementSchema.optional(),
  numTP: z.array(z.number()).optional(),
  _numTP: ElementSchema.optional(),
  numFP: z.array(z.number()).optional(),
  _numFP: ElementSchema.optional(),
  numFN: z.array(z.number()).optional(),
  _numFN: ElementSchema.optional(),
  precision: z.array(z.number()).optional(),
  _precision: ElementSchema.optional(),
  sensitivity: z.array(z.number()).optional(),
  _sensitivity: ElementSchema.optional(),
  fMeasure: z.array(z.number()).optional(),
  _fMeasure: ElementSchema.optional(),
})
export type MolecularSequenceQualityRoc = z.infer<typeof MolecularSequenceQualityRocSchema>

/**
 * An set of value as quality of sequence
 * An experimental feature attribute that defines the quality of the feature in a quantitative way, such as a phred quality score ([SO:0001686](http://www.sequenceontology.org/browser/current_svn/term/SO:0001686)).
 */
export const MolecularSequenceQualitySchema = BackboneElementSchema.extend({
  type: z.enum(['indel', 'snp', 'unknown']),
  _type: ElementSchema.optional(),
  standardSequence: CodeableConceptSchema.optional(),
  start: z.number().optional(),
  _start: ElementSchema.optional(),
  end: z.number().optional(),
  _end: ElementSchema.optional(),
  score: QuantitySchema.optional(),
  method: CodeableConceptSchema.optional(),
  truthTP: z.number().optional(),
  _truthTP: ElementSchema.optional(),
  queryTP: z.number().optional(),
  _queryTP: ElementSchema.optional(),
  truthFN: z.number().optional(),
  _truthFN: ElementSchema.optional(),
  queryFP: z.number().optional(),
  _queryFP: ElementSchema.optional(),
  gtFP: z.number().optional(),
  _gtFP: ElementSchema.optional(),
  precision: z.number().optional(),
  _precision: ElementSchema.optional(),
  recall: z.number().optional(),
  _recall: ElementSchema.optional(),
  fScore: z.number().optional(),
  _fScore: ElementSchema.optional(),
  roc: MolecularSequenceQualityRocSchema.optional(),
})
export type MolecularSequenceQuality = z.infer<typeof MolecularSequenceQualitySchema>

/**
 * External repository which contains detailed report related with observedSeq in this resource
 * Configurations of the external repository. The repository shall store target's observedSeq or records related with target's observedSeq.
 */
export const MolecularSequenceRepositorySchema = BackboneElementSchema.extend({
  type: z.enum(['directlink', 'openapi', 'login', 'oauth', 'other']),
  _type: ElementSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  datasetId: z.string().optional(),
  _datasetId: ElementSchema.optional(),
  variantsetId: z.string().optional(),
  _variantsetId: ElementSchema.optional(),
  readsetId: z.string().optional(),
  _readsetId: ElementSchema.optional(),
})
export type MolecularSequenceRepository = z.infer<typeof MolecularSequenceRepositorySchema>

/**
 * Structural variant outer
 */
export const MolecularSequenceStructureVariantOuterSchema = BackboneElementSchema.extend({
  start: z.number().optional(),
  _start: ElementSchema.optional(),
  end: z.number().optional(),
  _end: ElementSchema.optional(),
})
export type MolecularSequenceStructureVariantOuter = z.infer<typeof MolecularSequenceStructureVariantOuterSchema>

/**
 * Structural variant inner
 */
export const MolecularSequenceStructureVariantInnerSchema = BackboneElementSchema.extend({
  start: z.number().optional(),
  _start: ElementSchema.optional(),
  end: z.number().optional(),
  _end: ElementSchema.optional(),
})
export type MolecularSequenceStructureVariantInner = z.infer<typeof MolecularSequenceStructureVariantInnerSchema>

/**
 * Structural variant
 * Information about chromosome structure variation.
 */
export const MolecularSequenceStructureVariantSchema = BackboneElementSchema.extend({
  variantType: CodeableConceptSchema.optional(),
  exact: z.boolean().optional(),
  _exact: ElementSchema.optional(),
  length: z.number().optional(),
  _length: ElementSchema.optional(),
  outer: MolecularSequenceStructureVariantOuterSchema.optional(),
  inner: MolecularSequenceStructureVariantInnerSchema.optional(),
})
export type MolecularSequenceStructureVariant = z.infer<typeof MolecularSequenceStructureVariantSchema>

/**
 * Raw data describing a biological sequence.
 */
export const MolecularSequenceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MolecularSequence'),
  identifier: z.array(IdentifierSchema).optional(),
  type: z.enum(['aa', 'dna', 'rna']).optional(),
  _type: ElementSchema.optional(),
  coordinateSystem: z.number(),
  _coordinateSystem: ElementSchema.optional(),
  patient: ReferenceSchema.optional(),
  specimen: ReferenceSchema.optional(),
  device: ReferenceSchema.optional(),
  performer: ReferenceSchema.optional(),
  quantity: QuantitySchema.optional(),
  referenceSeq: MolecularSequenceReferenceSeqSchema.optional(),
  variant: z.array(MolecularSequenceVariantSchema).optional(),
  observedSeq: z.string().optional(),
  _observedSeq: ElementSchema.optional(),
  quality: z.array(MolecularSequenceQualitySchema).optional(),
  readCoverage: z.number().optional(),
  _readCoverage: ElementSchema.optional(),
  repository: z.array(MolecularSequenceRepositorySchema).optional(),
  pointer: z.array(ReferenceSchema).optional(),
  structureVariant: z.array(MolecularSequenceStructureVariantSchema).optional(),
})
export type MolecularSequence = z.infer<typeof MolecularSequenceSchema>

/**
 * The case or regulatory procedure for granting or amending a regulated authorization. Note: This area is subject to ongoing review and the workgroup is seeking implementer feedback on its use (see link at bottom of page)
 * The case or regulatory procedure for granting or amending a regulated authorization. An authorization is granted in response to submissions/applications by those seeking authorization. A case is the administrative process that deals with the application(s) that relate to this and assesses them. Note: This area is subject to ongoing review and the workgroup is seeking implementer feedback on its use (see link at bottom of page).
 */
export interface RegulatedAuthorizationCase extends BackboneElement {
  identifier?: Identifier | undefined
  type?: CodeableConcept | undefined
  status?: CodeableConcept | undefined
  datePeriod?: Period | undefined
  dateDateTime?: string | undefined
  _dateDateTime?: Element | undefined
  application?: RegulatedAuthorizationCase[] | undefined
}

export const RegulatedAuthorizationCaseSchema: z.ZodType<RegulatedAuthorizationCase> = z.lazy(() =>
  BackboneElementSchema.extend({
    identifier: IdentifierSchema.optional(),
    type: CodeableConceptSchema.optional(),
    status: CodeableConceptSchema.optional(),
    datePeriod: PeriodSchema.optional(),
    dateDateTime: z.string().optional(),
      _dateDateTime: ElementSchema.optional(),
    application: z.lazy(() => z.array(RegulatedAuthorizationCaseSchema)).optional(),
  })
)

/**
 * Regulatory approval, clearance or licencing related to a regulated product, treatment, facility or activity that is cited in a guidance, regulation, rule or legislative act. An example is Market Authorization relating to a Medicinal Product.
 */
export const RegulatedAuthorizationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('RegulatedAuthorization'),
  identifier: z.array(IdentifierSchema).optional(),
  subject: z.array(ReferenceSchema).optional(),
  type: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  region: z.array(CodeableConceptSchema).optional(),
  status: CodeableConceptSchema.optional(),
  statusDate: z.string().optional(),
  _statusDate: ElementSchema.optional(),
  validityPeriod: PeriodSchema.optional(),
  indication: CodeableReferenceSchema.optional(),
  intendedUse: CodeableConceptSchema.optional(),
  basis: z.array(CodeableConceptSchema).optional(),
  holder: ReferenceSchema.optional(),
  regulator: ReferenceSchema.optional(),
  case: RegulatedAuthorizationCaseSchema.optional(),
})
export type RegulatedAuthorization = z.infer<typeof RegulatedAuthorizationSchema>

/**
 * Base StructureDefinition for Population Type: A populatioof people with some set of grouping criteria.
 */
export const PopulationSchema = BackboneElementSchema.extend({
  ageRange: RangeSchema.optional(),
  ageCodeableConcept: CodeableConceptSchema.optional(),
  gender: CodeableConceptSchema.optional(),
  race: CodeableConceptSchema.optional(),
  physiologicalCondition: CodeableConceptSchema.optional(),
})
export type Population = z.infer<typeof PopulationSchema>

/**
 * Base StructureDefinition for boolean Type: Value of "true" or "false"
 */
export const booleanSchema = ElementSchema.extend({
  value: z.boolean().optional(),
  _value: ElementSchema.optional(),
})
export type boolean = z.infer<typeof booleanSchema>

/**
 * Whether or not the billing code is applicable
 * Expressions that describe applicability criteria for the billing code.
 * The applicability conditions can be used to ascertain whether a billing item is allowed in a specific context. E.g. some billing codes may only be applicable in out-patient settings, only to male/female patients or only to children.
 */
export interface ChargeItemDefinitionApplicability extends BackboneElement {
  description?: string | undefined
  _description?: Element | undefined
  language?: string | undefined
  _language?: Element | undefined
  expression?: string | undefined
  _expression?: Element | undefined
}

export const ChargeItemDefinitionApplicabilitySchema: z.ZodType<ChargeItemDefinitionApplicability> = z.lazy(() =>
  BackboneElementSchema.extend({
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    language: z.string().optional(),
      _language: ElementSchema.optional(),
    expression: z.string().optional(),
      _expression: ElementSchema.optional(),
  })
)

/**
 * Components of total line item price
 * The price for a ChargeItem may be calculated as a base price with surcharges/deductions that apply in certain conditions. A ChargeItemDefinition resource that defines the prices, factors and conditions that apply to a billing code is currently under development. The priceComponent element can be used to offer transparency to the recipient of the Invoice of how the prices have been calculated.
 */
export const ChargeItemDefinitionPropertyGroupPriceComponentSchema = BackboneElementSchema.extend({
  type: z.enum(['base', 'surcharge', 'deduction', 'discount', 'tax', 'informational']),
  _type: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  amount: MoneySchema.optional(),
})
export type ChargeItemDefinitionPropertyGroupPriceComponent = z.infer<typeof ChargeItemDefinitionPropertyGroupPriceComponentSchema>

/**
 * Group of properties which are applicable under the same conditions
 * Group of properties which are applicable under the same conditions. If no applicability rules are established for the group, then all properties always apply.
 */
export const ChargeItemDefinitionPropertyGroupSchema = BackboneElementSchema.extend({
  applicability: z.lazy(() => z.array(ChargeItemDefinitionApplicabilitySchema)).optional(),
  priceComponent: z.array(ChargeItemDefinitionPropertyGroupPriceComponentSchema).optional(),
})
export type ChargeItemDefinitionPropertyGroup = z.infer<typeof ChargeItemDefinitionPropertyGroupSchema>

/**
 * The ChargeItemDefinition resource provides the properties that apply to the (billing) codes necessary to calculate costs and prices. The properties may differ largely depending on type and realm, therefore this resource gives only a rough structure and requires profiling for each type of billing code system.
 */
export const ChargeItemDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ChargeItemDefinition'),
  url: z.string(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  derivedFromUri: z.array(z.string()).optional(),
  _derivedFromUri: ElementSchema.optional(),
  partOf: z.array(z.string()).optional(),
  _partOf: ElementSchema.optional(),
  replaces: z.array(z.string()).optional(),
  _replaces: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  code: CodeableConceptSchema.optional(),
  instance: z.array(ReferenceSchema).optional(),
  applicability: z.array(ChargeItemDefinitionApplicabilitySchema).optional(),
  propertyGroup: z.array(ChargeItemDefinitionPropertyGroupSchema).optional(),
})
export type ChargeItemDefinition = z.infer<typeof ChargeItemDefinitionSchema>

/**
 * Only allow data when
 * A constraint indicating that this item should only be enabled (displayed/allow answers to be captured) when the specified condition is true.
 * If multiple repetitions of this extension are present, the item should be enabled when the condition for *any* of the repetitions is true.  I.e. treat "enableWhen"s as being joined by an "or" clause.  This element is a modifier because if enableWhen is present for an item, "required" is ignored unless one of the enableWhen conditions is met. When an item is disabled, all of its descendants are disabled, regardless of what their own enableWhen logic might evaluate to.
 */
export const QuestionnaireItemEnableWhenSchema = BackboneElementSchema.extend({
  question: z.string(),
  _question: ElementSchema.optional(),
  operator: z.enum(['exists', '=', '!=', '>', '<', '>=', '<=']),
  _operator: ElementSchema.optional(),
  answerBoolean: z.boolean().optional(),
  _answerBoolean: ElementSchema.optional(),
  answerDecimal: z.number().optional(),
  _answerDecimal: ElementSchema.optional(),
  answerInteger: z.number().optional(),
  _answerInteger: ElementSchema.optional(),
  answerDate: z.string().optional(),
  _answerDate: ElementSchema.optional(),
  answerDateTime: z.string().optional(),
  _answerDateTime: ElementSchema.optional(),
  answerTime: z.string().optional(),
  _answerTime: ElementSchema.optional(),
  answerString: z.string().optional(),
  _answerString: ElementSchema.optional(),
  answerCoding: CodingSchema.optional(),
  answerQuantity: QuantitySchema.optional(),
  answerReference: ReferenceSchema.optional(),
})
export type QuestionnaireItemEnableWhen = z.infer<typeof QuestionnaireItemEnableWhenSchema>

/**
 * Permitted answer
 * One of the permitted answers for a "choice" or "open-choice" question.
 * This element can be used when the value set machinery of answerValueSet is deemed too cumbersome or when there's a need to capture possible answers that are not codes.
 */
export const QuestionnaireItemAnswerOptionSchema = BackboneElementSchema.extend({
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueCoding: CodingSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  initialSelected: z.boolean().optional(),
  _initialSelected: ElementSchema.optional(),
})
export type QuestionnaireItemAnswerOption = z.infer<typeof QuestionnaireItemAnswerOptionSchema>

/**
 * Initial value(s) when item is first rendered
 * One or more values that should be pre-populated in the answer when initially rendering the questionnaire for user input.
 * The user is allowed to change the value and override the default (unless marked as read-only). If the user doesn't change the value, then this initial value will be persisted when the QuestionnaireResponse is initially created.  Note that initial values can influence results.  The data type of initial[x] must agree with the item.type, and only repeating items can have more then one initial value.
 */
export const QuestionnaireItemInitialSchema = BackboneElementSchema.extend({
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueUri: z.string().optional(),
  _valueUri: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueCoding: CodingSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueReference: ReferenceSchema.optional(),
})
export type QuestionnaireItemInitial = z.infer<typeof QuestionnaireItemInitialSchema>

/**
 * Questions and sections within the Questionnaire
 * A particular question, question grouping or display text that is part of the questionnaire.
 * The content of the questionnaire is constructed from an ordered, hierarchical collection of items.
 */
export interface QuestionnaireItem extends BackboneElement {
  linkId: string
  _linkId?: Element | undefined
  definition?: string | undefined
  _definition?: Element | undefined
  code?: Coding[] | undefined
  prefix?: string | undefined
  _prefix?: Element | undefined
  text?: string | undefined
  _text?: Element | undefined
  type: ('group'|'display'|'question'|'boolean'|'decimal'|'integer'|'date'|'dateTime'|'time'|'string'|'text'|'url'|'choice'|'open-choice'|'attachment'|'reference'|'quantity')
  _type?: Element | undefined
  enableWhen?: QuestionnaireItemEnableWhen[] | undefined
  enableBehavior?: ('all'|'any') | undefined
  _enableBehavior?: Element | undefined
  required?: boolean | undefined
  _required?: Element | undefined
  repeats?: boolean | undefined
  _repeats?: Element | undefined
  readOnly?: boolean | undefined
  _readOnly?: Element | undefined
  maxLength?: number | undefined
  _maxLength?: Element | undefined
  answerValueSet?: string | undefined
  _answerValueSet?: Element | undefined
  answerOption?: QuestionnaireItemAnswerOption[] | undefined
  initial?: QuestionnaireItemInitial[] | undefined
  item?: QuestionnaireItem[] | undefined
}

export const QuestionnaireItemSchema: z.ZodType<QuestionnaireItem> = z.lazy(() =>
  BackboneElementSchema.extend({
    linkId: z.string(),
      _linkId: ElementSchema.optional(),
    definition: z.string().optional(),
      _definition: ElementSchema.optional(),
    code: z.array(CodingSchema).optional(),
    prefix: z.string().optional(),
      _prefix: ElementSchema.optional(),
    text: z.string().optional(),
      _text: ElementSchema.optional(),
    type: z.enum(['group', 'display', 'question', 'boolean', 'decimal', 'integer', 'date', 'dateTime', 'time', 'string', 'text', 'url', 'choice', 'open-choice', 'attachment', 'reference', 'quantity']),
      _type: ElementSchema.optional(),
    enableWhen: z.array(QuestionnaireItemEnableWhenSchema).optional(),
    enableBehavior: z.enum(['all', 'any']).optional(),
      _enableBehavior: ElementSchema.optional(),
    required: z.boolean().optional(),
      _required: ElementSchema.optional(),
    repeats: z.boolean().optional(),
      _repeats: ElementSchema.optional(),
    readOnly: z.boolean().optional(),
      _readOnly: ElementSchema.optional(),
    maxLength: z.number().optional(),
      _maxLength: ElementSchema.optional(),
    answerValueSet: z.string().optional(),
      _answerValueSet: ElementSchema.optional(),
    answerOption: z.array(QuestionnaireItemAnswerOptionSchema).optional(),
    initial: z.array(QuestionnaireItemInitialSchema).optional(),
    item: z.lazy(() => z.array(QuestionnaireItemSchema)).optional(),
  })
)

/**
 * A structured set of questions intended to guide the collection of answers from end-users. Questionnaires provide detailed control over order, presentation, phraseology and grouping to allow coherent, consistent data collection.
 */
export const QuestionnaireSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Questionnaire'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  derivedFrom: z.array(z.string()).optional(),
  _derivedFrom: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  subjectType: z.array(z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters'])).optional(),
  _subjectType: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  code: z.array(CodingSchema).optional(),
  item: z.array(QuestionnaireItemSchema).optional(),
})
export type Questionnaire = z.infer<typeof QuestionnaireSchema>

/**
 * An abstract server representing a client or sender in a message exchange
 * An abstract server used in operations within this test script in the origin element.
 * The purpose of this element is to define the profile of an origin element used elsewhere in the script.  Test engines could then use the origin-profile mapping to offer a filtered list of test systems that can serve as the sender for the interaction.
 */
export const TestScriptOriginSchema = BackboneElementSchema.extend({
  index: z.number(),
  _index: ElementSchema.optional(),
  profile: CodingSchema,
})
export type TestScriptOrigin = z.infer<typeof TestScriptOriginSchema>

/**
 * An abstract server representing a destination or receiver in a message exchange
 * An abstract server used in operations within this test script in the destination element.
 * The purpose of this element is to define the profile of a destination element used elsewhere in the script.  Test engines could then use the destination-profile mapping to offer a filtered list of test systems that can serve as the receiver for the interaction.
 */
export const TestScriptDestinationSchema = BackboneElementSchema.extend({
  index: z.number(),
  _index: ElementSchema.optional(),
  profile: CodingSchema,
})
export type TestScriptDestination = z.infer<typeof TestScriptDestinationSchema>

/**
 * Links to the FHIR specification
 * A link to the FHIR specification that this test is covering.
 */
export const TestScriptMetadataLinkSchema = BackboneElementSchema.extend({
  url: z.string(),
  _url: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type TestScriptMetadataLink = z.infer<typeof TestScriptMetadataLinkSchema>

/**
 * Capabilities  that are assumed to function correctly on the FHIR server being tested
 * Capabilities that must exist and are assumed to function correctly on the FHIR server being tested.
 * When the metadata capabilities section is defined at TestScript.metadata or at TestScript.setup.metadata, and the server's conformance statement does not contain the elements defined in the minimal conformance statement, then all the tests in the TestScript are skipped.  When the metadata capabilities section is defined at TestScript.test.metadata and the server's conformance statement does not contain the elements defined in the minimal conformance statement, then only that test is skipped.  The "metadata.capabilities.required" and "metadata.capabilities.validated" elements only indicate whether the capabilities are the primary focus of the test script or not.  They do not impact the skipping logic.  Capabilities whose "metadata.capabilities.validated" flag is true are the primary focus of the test script.
 */
export const TestScriptMetadataCapabilitySchema = BackboneElementSchema.extend({
  required: z.boolean(),
  _required: ElementSchema.optional(),
  validated: z.boolean(),
  _validated: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  origin: z.array(z.number()).optional(),
  _origin: ElementSchema.optional(),
  destination: z.number().optional(),
  _destination: ElementSchema.optional(),
  link: z.array(z.string()).optional(),
  _link: ElementSchema.optional(),
  capabilities: z.string(),
  _capabilities: ElementSchema.optional(),
})
export type TestScriptMetadataCapability = z.infer<typeof TestScriptMetadataCapabilitySchema>

/**
 * Required capability that is assumed to function correctly on the FHIR server being tested
 * The required capability must exist and are assumed to function correctly on the FHIR server being tested.
 */
export const TestScriptMetadataSchema = BackboneElementSchema.extend({
  link: z.array(TestScriptMetadataLinkSchema).optional(),
  capability: z.array(TestScriptMetadataCapabilitySchema),
})
export type TestScriptMetadata = z.infer<typeof TestScriptMetadataSchema>

/**
 * Fixture in the test script - by reference (uri)
 * Fixture in the test script - by reference (uri). All fixtures are required for the test script to execute.
 */
export const TestScriptFixtureSchema = BackboneElementSchema.extend({
  autocreate: z.boolean(),
  _autocreate: ElementSchema.optional(),
  autodelete: z.boolean(),
  _autodelete: ElementSchema.optional(),
  resource: ReferenceSchema.optional(),
})
export type TestScriptFixture = z.infer<typeof TestScriptFixtureSchema>

/**
 * Placeholder for evaluated elements
 * Variable is set based either on element value in response body or on header field value in the response headers.
 * Variables would be set based either on XPath/JSONPath expressions against fixtures (static and response), or headerField evaluations against response headers. If variable evaluates to nodelist or anything other than a primitive value, then test engine would report an error.  Variables would be used to perform clean replacements in "operation.params", "operation.requestHeader.value", and "operation.url" element values during operation calls and in "assert.value" during assertion evaluations. This limits the places that test engines would need to look for placeholders "${}".  Variables are scoped to the whole script. They are NOT evaluated at declaration. They are evaluated by test engine when used for substitutions in "operation.params", "operation.requestHeader.value", and "operation.url" element values during operation calls and in "assert.value" during assertion evaluations.  See example testscript-search.xml.
 */
export const TestScriptVariableSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  defaultValue: z.string().optional(),
  _defaultValue: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  expression: z.string().optional(),
  _expression: ElementSchema.optional(),
  headerField: z.string().optional(),
  _headerField: ElementSchema.optional(),
  hint: z.string().optional(),
  _hint: ElementSchema.optional(),
  path: z.string().optional(),
  _path: ElementSchema.optional(),
  sourceId: z.string().optional(),
  _sourceId: ElementSchema.optional(),
})
export type TestScriptVariable = z.infer<typeof TestScriptVariableSchema>

/**
 * Each operation can have one or more header elements
 * Header elements would be used to set HTTP headers.
 * This gives control to test-script writers to set headers explicitly based on test requirements.  It will allow for testing using:  - "If-Modified-Since" and "If-None-Match" headers.  See http://build.fhir.org/http.html#2.1.0.5.1 - "If-Match" header.  See http://build.fhir.org/http.html#2.1.0.11 - Conditional Create using "If-None-Exist".  See http://build.fhir.org/http.html#2.1.0.13.1 - Invalid "Content-Type" header for negative testing. - etc.
 */
export const TestScriptSetupActionOperationRequestHeaderSchema = BackboneElementSchema.extend({
  field: z.string(),
  _field: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type TestScriptSetupActionOperationRequestHeader = z.infer<typeof TestScriptSetupActionOperationRequestHeaderSchema>

/**
 * The setup operation to perform
 * The operation to perform.
 */
export interface TestScriptSetupActionOperation extends BackboneElement {
  type?: Coding | undefined
  resource?: ('Address'|'Age'|'Annotation'|'Attachment'|'BackboneElement'|'CodeableConcept'|'CodeableReference'|'Coding'|'ContactDetail'|'ContactPoint'|'Contributor'|'Count'|'DataRequirement'|'Distance'|'Dosage'|'Duration'|'Element'|'ElementDefinition'|'Expression'|'Extension'|'HumanName'|'Identifier'|'MarketingStatus'|'Meta'|'Money'|'MoneyQuantity'|'Narrative'|'ParameterDefinition'|'Period'|'Population'|'ProdCharacteristic'|'ProductShelfLife'|'Quantity'|'Range'|'Ratio'|'RatioRange'|'Reference'|'RelatedArtifact'|'SampledData'|'Signature'|'SimpleQuantity'|'Timing'|'TriggerDefinition'|'UsageContext'|'base64Binary'|'boolean'|'canonical'|'code'|'date'|'dateTime'|'decimal'|'id'|'instant'|'integer'|'markdown'|'oid'|'positiveInt'|'string'|'time'|'unsignedInt'|'uri'|'url'|'uuid'|'xhtml'|'Resource'|'Binary'|'Bundle'|'DomainResource'|'Account'|'ActivityDefinition'|'AdministrableProductDefinition'|'AdverseEvent'|'AllergyIntolerance'|'Appointment'|'AppointmentResponse'|'AuditEvent'|'Basic'|'BiologicallyDerivedProduct'|'BodyStructure'|'CapabilityStatement'|'CarePlan'|'CareTeam'|'CatalogEntry'|'ChargeItem'|'ChargeItemDefinition'|'Citation'|'Claim'|'ClaimResponse'|'ClinicalImpression'|'ClinicalUseDefinition'|'CodeSystem'|'Communication'|'CommunicationRequest'|'CompartmentDefinition'|'Composition'|'ConceptMap'|'Condition'|'Consent'|'Contract'|'Coverage'|'CoverageEligibilityRequest'|'CoverageEligibilityResponse'|'DetectedIssue'|'Device'|'DeviceDefinition'|'DeviceMetric'|'DeviceRequest'|'DeviceUseStatement'|'DiagnosticReport'|'DocumentManifest'|'DocumentReference'|'Encounter'|'Endpoint'|'EnrollmentRequest'|'EnrollmentResponse'|'EpisodeOfCare'|'EventDefinition'|'Evidence'|'EvidenceReport'|'EvidenceVariable'|'ExampleScenario'|'ExplanationOfBenefit'|'FamilyMemberHistory'|'Flag'|'Goal'|'GraphDefinition'|'Group'|'GuidanceResponse'|'HealthcareService'|'ImagingStudy'|'Immunization'|'ImmunizationEvaluation'|'ImmunizationRecommendation'|'ImplementationGuide'|'Ingredient'|'InsurancePlan'|'Invoice'|'Library'|'Linkage'|'List'|'Location'|'ManufacturedItemDefinition'|'Measure'|'MeasureReport'|'Media'|'Medication'|'MedicationAdministration'|'MedicationDispense'|'MedicationKnowledge'|'MedicationRequest'|'MedicationStatement'|'MedicinalProductDefinition'|'MessageDefinition'|'MessageHeader'|'MolecularSequence'|'NamingSystem'|'NutritionOrder'|'NutritionProduct'|'Observation'|'ObservationDefinition'|'OperationDefinition'|'OperationOutcome'|'Organization'|'OrganizationAffiliation'|'PackagedProductDefinition'|'Patient'|'PaymentNotice'|'PaymentReconciliation'|'Person'|'PlanDefinition'|'Practitioner'|'PractitionerRole'|'Procedure'|'Provenance'|'Questionnaire'|'QuestionnaireResponse'|'RegulatedAuthorization'|'RelatedPerson'|'RequestGroup'|'ResearchDefinition'|'ResearchElementDefinition'|'ResearchStudy'|'ResearchSubject'|'RiskAssessment'|'Schedule'|'SearchParameter'|'ServiceRequest'|'Slot'|'Specimen'|'SpecimenDefinition'|'StructureDefinition'|'StructureMap'|'Subscription'|'SubscriptionStatus'|'SubscriptionTopic'|'Substance'|'SubstanceDefinition'|'SupplyDelivery'|'SupplyRequest'|'Task'|'TerminologyCapabilities'|'TestReport'|'TestScript'|'ValueSet'|'VerificationResult'|'VisionPrescription'|'Parameters') | undefined
  _resource?: Element | undefined
  label?: string | undefined
  _label?: Element | undefined
  description?: string | undefined
  _description?: Element | undefined
  accept?: string | undefined
  _accept?: Element | undefined
  contentType?: string | undefined
  _contentType?: Element | undefined
  destination?: number | undefined
  _destination?: Element | undefined
  encodeRequestUrl: boolean
  _encodeRequestUrl?: Element | undefined
  method?: ('delete'|'get'|'options'|'patch'|'post'|'put'|'head') | undefined
  _method?: Element | undefined
  origin?: number | undefined
  _origin?: Element | undefined
  params?: string | undefined
  _params?: Element | undefined
  requestHeader?: TestScriptSetupActionOperationRequestHeader[] | undefined
  requestId?: string | undefined
  _requestId?: Element | undefined
  responseId?: string | undefined
  _responseId?: Element | undefined
  sourceId?: string | undefined
  _sourceId?: Element | undefined
  targetId?: string | undefined
  _targetId?: Element | undefined
  url?: string | undefined
  _url?: Element | undefined
}

export const TestScriptSetupActionOperationSchema: z.ZodType<TestScriptSetupActionOperation> = z.lazy(() =>
  BackboneElementSchema.extend({
    type: CodingSchema.optional(),
    resource: z.enum(['Address', 'Age', 'Annotation', 'Attachment', 'BackboneElement', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'Count', 'DataRequirement', 'Distance', 'Dosage', 'Duration', 'Element', 'ElementDefinition', 'Expression', 'Extension', 'HumanName', 'Identifier', 'MarketingStatus', 'Meta', 'Money', 'MoneyQuantity', 'Narrative', 'ParameterDefinition', 'Period', 'Population', 'ProdCharacteristic', 'ProductShelfLife', 'Quantity', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'SimpleQuantity', 'Timing', 'TriggerDefinition', 'UsageContext', 'base64Binary', 'boolean', 'canonical', 'code', 'date', 'dateTime', 'decimal', 'id', 'instant', 'integer', 'markdown', 'oid', 'positiveInt', 'string', 'time', 'unsignedInt', 'uri', 'url', 'uuid', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']).optional(),
      _resource: ElementSchema.optional(),
    label: z.string().optional(),
      _label: ElementSchema.optional(),
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    accept: z.string().optional(),
      _accept: ElementSchema.optional(),
    contentType: z.string().optional(),
      _contentType: ElementSchema.optional(),
    destination: z.number().optional(),
      _destination: ElementSchema.optional(),
    encodeRequestUrl: z.boolean(),
      _encodeRequestUrl: ElementSchema.optional(),
    method: z.enum(['delete', 'get', 'options', 'patch', 'post', 'put', 'head']).optional(),
      _method: ElementSchema.optional(),
    origin: z.number().optional(),
      _origin: ElementSchema.optional(),
    params: z.string().optional(),
      _params: ElementSchema.optional(),
    requestHeader: z.array(TestScriptSetupActionOperationRequestHeaderSchema).optional(),
    requestId: z.string().optional(),
      _requestId: ElementSchema.optional(),
    responseId: z.string().optional(),
      _responseId: ElementSchema.optional(),
    sourceId: z.string().optional(),
      _sourceId: ElementSchema.optional(),
    targetId: z.string().optional(),
      _targetId: ElementSchema.optional(),
    url: z.string().optional(),
      _url: ElementSchema.optional(),
  })
)

/**
 * The assertion to perform
 * Evaluates the results of previous operations to determine if the server under test behaves appropriately.
 * In order to evaluate an assertion, the request, response, and results of the most recently executed operation must always be maintained by the test engine.
 */
export interface TestScriptSetupActionAssert extends BackboneElement {
  label?: string | undefined
  _label?: Element | undefined
  description?: string | undefined
  _description?: Element | undefined
  direction?: ('response'|'request') | undefined
  _direction?: Element | undefined
  compareToSourceId?: string | undefined
  _compareToSourceId?: Element | undefined
  compareToSourceExpression?: string | undefined
  _compareToSourceExpression?: Element | undefined
  compareToSourcePath?: string | undefined
  _compareToSourcePath?: Element | undefined
  contentType?: string | undefined
  _contentType?: Element | undefined
  expression?: string | undefined
  _expression?: Element | undefined
  headerField?: string | undefined
  _headerField?: Element | undefined
  minimumId?: string | undefined
  _minimumId?: Element | undefined
  navigationLinks?: boolean | undefined
  _navigationLinks?: Element | undefined
  operator?: ('equals'|'notEquals'|'in'|'notIn'|'greaterThan'|'lessThan'|'empty'|'notEmpty'|'contains'|'notContains'|'eval') | undefined
  _operator?: Element | undefined
  path?: string | undefined
  _path?: Element | undefined
  requestMethod?: ('delete'|'get'|'options'|'patch'|'post'|'put'|'head') | undefined
  _requestMethod?: Element | undefined
  requestURL?: string | undefined
  _requestURL?: Element | undefined
  resource?: ('Address'|'Age'|'Annotation'|'Attachment'|'BackboneElement'|'CodeableConcept'|'CodeableReference'|'Coding'|'ContactDetail'|'ContactPoint'|'Contributor'|'Count'|'DataRequirement'|'Distance'|'Dosage'|'Duration'|'Element'|'ElementDefinition'|'Expression'|'Extension'|'HumanName'|'Identifier'|'MarketingStatus'|'Meta'|'Money'|'MoneyQuantity'|'Narrative'|'ParameterDefinition'|'Period'|'Population'|'ProdCharacteristic'|'ProductShelfLife'|'Quantity'|'Range'|'Ratio'|'RatioRange'|'Reference'|'RelatedArtifact'|'SampledData'|'Signature'|'SimpleQuantity'|'Timing'|'TriggerDefinition'|'UsageContext'|'base64Binary'|'boolean'|'canonical'|'code'|'date'|'dateTime'|'decimal'|'id'|'instant'|'integer'|'markdown'|'oid'|'positiveInt'|'string'|'time'|'unsignedInt'|'uri'|'url'|'uuid'|'xhtml'|'Resource'|'Binary'|'Bundle'|'DomainResource'|'Account'|'ActivityDefinition'|'AdministrableProductDefinition'|'AdverseEvent'|'AllergyIntolerance'|'Appointment'|'AppointmentResponse'|'AuditEvent'|'Basic'|'BiologicallyDerivedProduct'|'BodyStructure'|'CapabilityStatement'|'CarePlan'|'CareTeam'|'CatalogEntry'|'ChargeItem'|'ChargeItemDefinition'|'Citation'|'Claim'|'ClaimResponse'|'ClinicalImpression'|'ClinicalUseDefinition'|'CodeSystem'|'Communication'|'CommunicationRequest'|'CompartmentDefinition'|'Composition'|'ConceptMap'|'Condition'|'Consent'|'Contract'|'Coverage'|'CoverageEligibilityRequest'|'CoverageEligibilityResponse'|'DetectedIssue'|'Device'|'DeviceDefinition'|'DeviceMetric'|'DeviceRequest'|'DeviceUseStatement'|'DiagnosticReport'|'DocumentManifest'|'DocumentReference'|'Encounter'|'Endpoint'|'EnrollmentRequest'|'EnrollmentResponse'|'EpisodeOfCare'|'EventDefinition'|'Evidence'|'EvidenceReport'|'EvidenceVariable'|'ExampleScenario'|'ExplanationOfBenefit'|'FamilyMemberHistory'|'Flag'|'Goal'|'GraphDefinition'|'Group'|'GuidanceResponse'|'HealthcareService'|'ImagingStudy'|'Immunization'|'ImmunizationEvaluation'|'ImmunizationRecommendation'|'ImplementationGuide'|'Ingredient'|'InsurancePlan'|'Invoice'|'Library'|'Linkage'|'List'|'Location'|'ManufacturedItemDefinition'|'Measure'|'MeasureReport'|'Media'|'Medication'|'MedicationAdministration'|'MedicationDispense'|'MedicationKnowledge'|'MedicationRequest'|'MedicationStatement'|'MedicinalProductDefinition'|'MessageDefinition'|'MessageHeader'|'MolecularSequence'|'NamingSystem'|'NutritionOrder'|'NutritionProduct'|'Observation'|'ObservationDefinition'|'OperationDefinition'|'OperationOutcome'|'Organization'|'OrganizationAffiliation'|'PackagedProductDefinition'|'Patient'|'PaymentNotice'|'PaymentReconciliation'|'Person'|'PlanDefinition'|'Practitioner'|'PractitionerRole'|'Procedure'|'Provenance'|'Questionnaire'|'QuestionnaireResponse'|'RegulatedAuthorization'|'RelatedPerson'|'RequestGroup'|'ResearchDefinition'|'ResearchElementDefinition'|'ResearchStudy'|'ResearchSubject'|'RiskAssessment'|'Schedule'|'SearchParameter'|'ServiceRequest'|'Slot'|'Specimen'|'SpecimenDefinition'|'StructureDefinition'|'StructureMap'|'Subscription'|'SubscriptionStatus'|'SubscriptionTopic'|'Substance'|'SubstanceDefinition'|'SupplyDelivery'|'SupplyRequest'|'Task'|'TerminologyCapabilities'|'TestReport'|'TestScript'|'ValueSet'|'VerificationResult'|'VisionPrescription'|'Parameters') | undefined
  _resource?: Element | undefined
  response?: ('okay'|'created'|'noContent'|'notModified'|'bad'|'forbidden'|'notFound'|'methodNotAllowed'|'conflict'|'gone'|'preconditionFailed'|'unprocessable') | undefined
  _response?: Element | undefined
  responseCode?: string | undefined
  _responseCode?: Element | undefined
  sourceId?: string | undefined
  _sourceId?: Element | undefined
  validateProfileId?: string | undefined
  _validateProfileId?: Element | undefined
  value?: string | undefined
  _value?: Element | undefined
  warningOnly: boolean
  _warningOnly?: Element | undefined
}

export const TestScriptSetupActionAssertSchema: z.ZodType<TestScriptSetupActionAssert> = z.lazy(() =>
  BackboneElementSchema.extend({
    label: z.string().optional(),
      _label: ElementSchema.optional(),
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    direction: z.enum(['response', 'request']).optional(),
      _direction: ElementSchema.optional(),
    compareToSourceId: z.string().optional(),
      _compareToSourceId: ElementSchema.optional(),
    compareToSourceExpression: z.string().optional(),
      _compareToSourceExpression: ElementSchema.optional(),
    compareToSourcePath: z.string().optional(),
      _compareToSourcePath: ElementSchema.optional(),
    contentType: z.string().optional(),
      _contentType: ElementSchema.optional(),
    expression: z.string().optional(),
      _expression: ElementSchema.optional(),
    headerField: z.string().optional(),
      _headerField: ElementSchema.optional(),
    minimumId: z.string().optional(),
      _minimumId: ElementSchema.optional(),
    navigationLinks: z.boolean().optional(),
      _navigationLinks: ElementSchema.optional(),
    operator: z.enum(['equals', 'notEquals', 'in', 'notIn', 'greaterThan', 'lessThan', 'empty', 'notEmpty', 'contains', 'notContains', 'eval']).optional(),
      _operator: ElementSchema.optional(),
    path: z.string().optional(),
      _path: ElementSchema.optional(),
    requestMethod: z.enum(['delete', 'get', 'options', 'patch', 'post', 'put', 'head']).optional(),
      _requestMethod: ElementSchema.optional(),
    requestURL: z.string().optional(),
      _requestURL: ElementSchema.optional(),
    resource: z.enum(['Address', 'Age', 'Annotation', 'Attachment', 'BackboneElement', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'Count', 'DataRequirement', 'Distance', 'Dosage', 'Duration', 'Element', 'ElementDefinition', 'Expression', 'Extension', 'HumanName', 'Identifier', 'MarketingStatus', 'Meta', 'Money', 'MoneyQuantity', 'Narrative', 'ParameterDefinition', 'Period', 'Population', 'ProdCharacteristic', 'ProductShelfLife', 'Quantity', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'SimpleQuantity', 'Timing', 'TriggerDefinition', 'UsageContext', 'base64Binary', 'boolean', 'canonical', 'code', 'date', 'dateTime', 'decimal', 'id', 'instant', 'integer', 'markdown', 'oid', 'positiveInt', 'string', 'time', 'unsignedInt', 'uri', 'url', 'uuid', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']).optional(),
      _resource: ElementSchema.optional(),
    response: z.enum(['okay', 'created', 'noContent', 'notModified', 'bad', 'forbidden', 'notFound', 'methodNotAllowed', 'conflict', 'gone', 'preconditionFailed', 'unprocessable']).optional(),
      _response: ElementSchema.optional(),
    responseCode: z.string().optional(),
      _responseCode: ElementSchema.optional(),
    sourceId: z.string().optional(),
      _sourceId: ElementSchema.optional(),
    validateProfileId: z.string().optional(),
      _validateProfileId: ElementSchema.optional(),
    value: z.string().optional(),
      _value: ElementSchema.optional(),
    warningOnly: z.boolean(),
      _warningOnly: ElementSchema.optional(),
  })
)

/**
 * A setup operation or assert to perform
 * Action would contain either an operation or an assertion.
 * An action should contain either an operation or an assertion but not both.  It can contain any number of variables.
 */
export const TestScriptSetupActionSchema = BackboneElementSchema.extend({
  operation: TestScriptSetupActionOperationSchema.optional(),
  assert: TestScriptSetupActionAssertSchema.optional(),
})
export type TestScriptSetupAction = z.infer<typeof TestScriptSetupActionSchema>

/**
 * A series of required setup operations before tests are executed
 */
export const TestScriptSetupSchema = BackboneElementSchema.extend({
  action: z.array(TestScriptSetupActionSchema),
})
export type TestScriptSetup = z.infer<typeof TestScriptSetupSchema>

/**
 * A test operation or assert to perform
 * Action would contain either an operation or an assertion.
 * An action should contain either an operation or an assertion but not both.  It can contain any number of variables.
 */
export const TestScriptTestActionSchema = BackboneElementSchema.extend({
  operation: z.lazy(() => TestScriptSetupActionOperationSchema).optional(),
  assert: z.lazy(() => TestScriptSetupActionAssertSchema).optional(),
})
export type TestScriptTestAction = z.infer<typeof TestScriptTestActionSchema>

/**
 * A test in this script
 */
export const TestScriptTestSchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  action: z.array(TestScriptTestActionSchema),
})
export type TestScriptTest = z.infer<typeof TestScriptTestSchema>

/**
 * One or more teardown operations to perform
 * The teardown action will only contain an operation.
 * An action should contain either an operation or an assertion but not both.  It can contain any number of variables.
 */
export const TestScriptTeardownActionSchema = BackboneElementSchema.extend({
  operation: z.lazy(() => TestScriptSetupActionOperationSchema),
})
export type TestScriptTeardownAction = z.infer<typeof TestScriptTeardownActionSchema>

/**
 * A series of required clean up steps
 * A series of operations required to clean up after all the tests are executed (successfully or otherwise).
 */
export const TestScriptTeardownSchema = BackboneElementSchema.extend({
  action: z.array(TestScriptTeardownActionSchema),
})
export type TestScriptTeardown = z.infer<typeof TestScriptTeardownSchema>

/**
 * A structured set of tests against a FHIR server or client implementation to determine compliance against the FHIR specification.
 */
export const TestScriptSchema = DomainResourceSchema.extend({
  resourceType: z.literal('TestScript'),
  url: z.string(),
  _url: ElementSchema.optional(),
  identifier: IdentifierSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  origin: z.array(TestScriptOriginSchema).optional(),
  destination: z.array(TestScriptDestinationSchema).optional(),
  metadata: TestScriptMetadataSchema.optional(),
  fixture: z.array(TestScriptFixtureSchema).optional(),
  profile: z.array(ReferenceSchema).optional(),
  variable: z.array(TestScriptVariableSchema).optional(),
  setup: TestScriptSetupSchema.optional(),
  test: z.array(TestScriptTestSchema).optional(),
  teardown: TestScriptTeardownSchema.optional(),
})
export type TestScript = z.infer<typeof TestScriptSchema>

/**
 * Defined path through the study for a subject
 * Describes an expected sequence of events for one of the participants of a study.  E.g. Exposure to drug A, wash-out, exposure to drug B, wash-out, follow-up.
 */
export const ResearchStudyArmSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type ResearchStudyArm = z.infer<typeof ResearchStudyArmSchema>

/**
 * A goal for the study
 * A goal that the study is aiming to achieve in terms of a scientific question to be answered by the analysis of data collected during the study.
 */
export const ResearchStudyObjectiveSchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
})
export type ResearchStudyObjective = z.infer<typeof ResearchStudyObjectiveSchema>

/**
 * A process where a researcher or organization plans and then executes a series of steps intended to increase the field of healthcare-related knowledge.  This includes studies of safety, efficacy, comparative effectiveness and other information about medications, devices, therapies and other interventional and investigative techniques.  A ResearchStudy involves the gathering of information about human or animal subjects.
 */
export const ResearchStudySchema = DomainResourceSchema.extend({
  resourceType: z.literal('ResearchStudy'),
  identifier: z.array(IdentifierSchema).optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  protocol: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['active', 'administratively-completed', 'approved', 'closed-to-accrual', 'closed-to-accrual-and-intervention', 'completed', 'disapproved', 'in-review', 'temporarily-closed-to-accrual', 'temporarily-closed-to-accrual-and-intervention', 'withdrawn']),
  _status: ElementSchema.optional(),
  primaryPurposeType: CodeableConceptSchema.optional(),
  phase: CodeableConceptSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  focus: z.array(CodeableConceptSchema).optional(),
  condition: z.array(CodeableConceptSchema).optional(),
  contact: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  keyword: z.array(CodeableConceptSchema).optional(),
  location: z.array(CodeableConceptSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  enrollment: z.array(ReferenceSchema).optional(),
  period: PeriodSchema.optional(),
  sponsor: ReferenceSchema.optional(),
  principalInvestigator: ReferenceSchema.optional(),
  site: z.array(ReferenceSchema).optional(),
  reasonStopped: CodeableConceptSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  arm: z.array(ResearchStudyArmSchema).optional(),
  objective: z.array(ResearchStudyObjectiveSchema).optional(),
})
export type ResearchStudy = z.infer<typeof ResearchStudySchema>

/**
 * Times the Service Site is available
 * A collection of times the practitioner is available or performing this role at the location and/or healthcareservice.
 * More detailed availability information may be provided in associated Schedule/Slot resources.
 */
export const PractitionerRoleAvailableTimeSchema = BackboneElementSchema.extend({
  daysOfWeek: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])).optional(),
  _daysOfWeek: ElementSchema.optional(),
  allDay: z.boolean().optional(),
  _allDay: ElementSchema.optional(),
  availableStartTime: z.string().optional(),
  _availableStartTime: ElementSchema.optional(),
  availableEndTime: z.string().optional(),
  _availableEndTime: ElementSchema.optional(),
})
export type PractitionerRoleAvailableTime = z.infer<typeof PractitionerRoleAvailableTimeSchema>

/**
 * Not available during this time due to provided reason
 * The practitioner is not available or performing this role during this period of time due to the provided reason.
 */
export const PractitionerRoleNotAvailableSchema = BackboneElementSchema.extend({
  description: z.string(),
  _description: ElementSchema.optional(),
  during: PeriodSchema.optional(),
})
export type PractitionerRoleNotAvailable = z.infer<typeof PractitionerRoleNotAvailableSchema>

/**
 * A specific set of Roles/Locations/specialties/services that a practitioner may perform at an organization for a period of time.
 */
export const PractitionerRoleSchema = DomainResourceSchema.extend({
  resourceType: z.literal('PractitionerRole'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  practitioner: ReferenceSchema.optional(),
  organization: ReferenceSchema.optional(),
  code: z.array(CodeableConceptSchema).optional(),
  specialty: z.array(CodeableConceptSchema).optional(),
  location: z.array(ReferenceSchema).optional(),
  healthcareService: z.array(ReferenceSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  availableTime: z.array(PractitionerRoleAvailableTimeSchema).optional(),
  notAvailable: z.array(PractitionerRoleNotAvailableSchema).optional(),
  availabilityExceptions: z.string().optional(),
  _availabilityExceptions: ElementSchema.optional(),
  endpoint: z.array(ReferenceSchema).optional(),
})
export type PractitionerRole = z.infer<typeof PractitionerRoleSchema>

/**
 * A participant in the test execution, either the execution engine, a client, or a server
 */
export const TestReportParticipantSchema = BackboneElementSchema.extend({
  type: z.enum(['test-engine', 'client', 'server']),
  _type: ElementSchema.optional(),
  uri: z.string(),
  _uri: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
})
export type TestReportParticipant = z.infer<typeof TestReportParticipantSchema>

/**
 * The operation to perform
 * The operation performed.
 */
export interface TestReportSetupActionOperation extends BackboneElement {
  result: ('pass'|'skip'|'fail'|'warning'|'error')
  _result?: Element | undefined
  message?: string | undefined
  _message?: Element | undefined
  detail?: string | undefined
  _detail?: Element | undefined
}

export const TestReportSetupActionOperationSchema: z.ZodType<TestReportSetupActionOperation> = z.lazy(() =>
  BackboneElementSchema.extend({
    result: z.enum(['pass', 'skip', 'fail', 'warning', 'error']),
      _result: ElementSchema.optional(),
    message: z.string().optional(),
      _message: ElementSchema.optional(),
    detail: z.string().optional(),
      _detail: ElementSchema.optional(),
  })
)

/**
 * The assertion to perform
 * The results of the assertion performed on the previous operations.
 */
export interface TestReportSetupActionAssert extends BackboneElement {
  result: ('pass'|'skip'|'fail'|'warning'|'error')
  _result?: Element | undefined
  message?: string | undefined
  _message?: Element | undefined
  detail?: string | undefined
  _detail?: Element | undefined
}

export const TestReportSetupActionAssertSchema: z.ZodType<TestReportSetupActionAssert> = z.lazy(() =>
  BackboneElementSchema.extend({
    result: z.enum(['pass', 'skip', 'fail', 'warning', 'error']),
      _result: ElementSchema.optional(),
    message: z.string().optional(),
      _message: ElementSchema.optional(),
    detail: z.string().optional(),
      _detail: ElementSchema.optional(),
  })
)

/**
 * A setup operation or assert that was executed
 * Action would contain either an operation or an assertion.
 * An action should contain either an operation or an assertion but not both.  It can contain any number of variables.
 */
export const TestReportSetupActionSchema = BackboneElementSchema.extend({
  operation: TestReportSetupActionOperationSchema.optional(),
  assert: TestReportSetupActionAssertSchema.optional(),
})
export type TestReportSetupAction = z.infer<typeof TestReportSetupActionSchema>

/**
 * The results of the series of required setup operations before the tests were executed
 */
export const TestReportSetupSchema = BackboneElementSchema.extend({
  action: z.array(TestReportSetupActionSchema),
})
export type TestReportSetup = z.infer<typeof TestReportSetupSchema>

/**
 * A test operation or assert that was performed
 * Action would contain either an operation or an assertion.
 * An action should contain either an operation or an assertion but not both.  It can contain any number of variables.
 */
export const TestReportTestActionSchema = BackboneElementSchema.extend({
  operation: z.lazy(() => TestReportSetupActionOperationSchema).optional(),
  assert: z.lazy(() => TestReportSetupActionAssertSchema).optional(),
})
export type TestReportTestAction = z.infer<typeof TestReportTestActionSchema>

/**
 * A test executed from the test script
 */
export const TestReportTestSchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  action: z.array(TestReportTestActionSchema),
})
export type TestReportTest = z.infer<typeof TestReportTestSchema>

/**
 * One or more teardown operations performed
 * The teardown action will only contain an operation.
 * An action should contain either an operation or an assertion but not both.  It can contain any number of variables.
 */
export const TestReportTeardownActionSchema = BackboneElementSchema.extend({
  operation: z.lazy(() => TestReportSetupActionOperationSchema),
})
export type TestReportTeardownAction = z.infer<typeof TestReportTeardownActionSchema>

/**
 * The results of running the series of required clean up steps
 * The results of the series of operations required to clean up after all the tests were executed (successfully or otherwise).
 */
export const TestReportTeardownSchema = BackboneElementSchema.extend({
  action: z.array(TestReportTeardownActionSchema),
})
export type TestReportTeardown = z.infer<typeof TestReportTeardownSchema>

/**
 * A summary of information based on the results of executing a TestScript.
 */
export const TestReportSchema = DomainResourceSchema.extend({
  resourceType: z.literal('TestReport'),
  identifier: IdentifierSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  status: z.enum(['completed', 'in-progress', 'waiting', 'stopped', 'entered-in-error']),
  _status: ElementSchema.optional(),
  testScript: ReferenceSchema,
  result: z.enum(['pass', 'fail', 'pending']),
  _result: ElementSchema.optional(),
  score: z.number().optional(),
  _score: ElementSchema.optional(),
  tester: z.string().optional(),
  _tester: ElementSchema.optional(),
  issued: z.string().optional(),
  _issued: ElementSchema.optional(),
  participant: z.array(TestReportParticipantSchema).optional(),
  setup: TestReportSetupSchema.optional(),
  test: z.array(TestReportTestSchema).optional(),
  teardown: TestReportTeardownSchema.optional(),
})
export type TestReport = z.infer<typeof TestReportSchema>

/**
 * The populations in the group
 * The populations that make up the population group, one for each type of population appropriate for the measure.
 */
export const MeasureReportGroupPopulationSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  count: z.number().optional(),
  _count: ElementSchema.optional(),
  subjectResults: ReferenceSchema.optional(),
})
export type MeasureReportGroupPopulation = z.infer<typeof MeasureReportGroupPopulationSchema>

/**
 * Stratifier component values
 * A stratifier component value.
 */
export const MeasureReportGroupStratifierStratumComponentSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  value: CodeableConceptSchema,
})
export type MeasureReportGroupStratifierStratumComponent = z.infer<typeof MeasureReportGroupStratifierStratumComponentSchema>

/**
 * Population results in this stratum
 * The populations that make up the stratum, one for each type of population appropriate to the measure.
 */
export const MeasureReportGroupStratifierStratumPopulationSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  count: z.number().optional(),
  _count: ElementSchema.optional(),
  subjectResults: ReferenceSchema.optional(),
})
export type MeasureReportGroupStratifierStratumPopulation = z.infer<typeof MeasureReportGroupStratifierStratumPopulationSchema>

/**
 * Stratum results, one for each unique value, or set of values, in the stratifier, or stratifier components
 * This element contains the results for a single stratum within the stratifier. For example, when stratifying on administrative gender, there will be four strata, one for each possible gender value.
 */
export const MeasureReportGroupStratifierStratumSchema = BackboneElementSchema.extend({
  value: CodeableConceptSchema.optional(),
  component: z.array(MeasureReportGroupStratifierStratumComponentSchema).optional(),
  population: z.array(MeasureReportGroupStratifierStratumPopulationSchema).optional(),
  measureScore: QuantitySchema.optional(),
})
export type MeasureReportGroupStratifierStratum = z.infer<typeof MeasureReportGroupStratifierStratumSchema>

/**
 * Stratification results
 * When a measure includes multiple stratifiers, there will be a stratifier group for each stratifier defined by the measure.
 */
export const MeasureReportGroupStratifierSchema = BackboneElementSchema.extend({
  code: z.array(CodeableConceptSchema).optional(),
  stratum: z.array(MeasureReportGroupStratifierStratumSchema).optional(),
})
export type MeasureReportGroupStratifier = z.infer<typeof MeasureReportGroupStratifierSchema>

/**
 * Measure results for each group
 * The results of the calculation, one for each population group in the measure.
 */
export const MeasureReportGroupSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  population: z.array(MeasureReportGroupPopulationSchema).optional(),
  measureScore: QuantitySchema.optional(),
  stratifier: z.array(MeasureReportGroupStratifierSchema).optional(),
})
export type MeasureReportGroup = z.infer<typeof MeasureReportGroupSchema>

/**
 * The MeasureReport resource contains the results of the calculation of a measure; and optionally a reference to the resources involved in that calculation.
 */
export const MeasureReportSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MeasureReport'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['complete', 'pending', 'error']),
  _status: ElementSchema.optional(),
  type: z.enum(['individual', 'subject-list', 'summary', 'data-collection']),
  _type: ElementSchema.optional(),
  measure: z.string(),
  _measure: ElementSchema.optional(),
  subject: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  reporter: ReferenceSchema.optional(),
  period: PeriodSchema,
  improvementNotation: CodeableConceptSchema.optional(),
  group: z.array(MeasureReportGroupSchema).optional(),
  evaluatedResource: z.array(ReferenceSchema).optional(),
})
export type MeasureReport = z.infer<typeof MeasureReportSchema>

/**
 * Moiety, for structural modifications
 */
export const SubstanceDefinitionMoietySchema = BackboneElementSchema.extend({
  role: CodeableConceptSchema.optional(),
  identifier: IdentifierSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  stereochemistry: CodeableConceptSchema.optional(),
  opticalActivity: CodeableConceptSchema.optional(),
  molecularFormula: z.string().optional(),
  _molecularFormula: ElementSchema.optional(),
  amountQuantity: QuantitySchema.optional(),
  amountString: z.string().optional(),
  _amountString: ElementSchema.optional(),
  measurementType: CodeableConceptSchema.optional(),
})
export type SubstanceDefinitionMoiety = z.infer<typeof SubstanceDefinitionMoietySchema>

/**
 * General specifications for this substance
 */
export const SubstanceDefinitionPropertySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
})
export type SubstanceDefinitionProperty = z.infer<typeof SubstanceDefinitionPropertySchema>

/**
 * The molecular weight or weight range
 * The molecular weight or weight range (for proteins, polymers or nucleic acids).
 */
export interface SubstanceDefinitionMolecularWeight extends BackboneElement {
  method?: CodeableConcept | undefined
  type?: CodeableConcept | undefined
  amount: Quantity
}

export const SubstanceDefinitionMolecularWeightSchema: z.ZodType<SubstanceDefinitionMolecularWeight> = z.lazy(() =>
  BackboneElementSchema.extend({
    method: CodeableConceptSchema.optional(),
    type: CodeableConceptSchema.optional(),
    amount: QuantitySchema,
  })
)

/**
 * A depiction of the structure or characterization of the substance
 */
export const SubstanceDefinitionStructureRepresentationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  representation: z.string().optional(),
  _representation: ElementSchema.optional(),
  format: CodeableConceptSchema.optional(),
  document: ReferenceSchema.optional(),
})
export type SubstanceDefinitionStructureRepresentation = z.infer<typeof SubstanceDefinitionStructureRepresentationSchema>

/**
 * Structural information
 */
export const SubstanceDefinitionStructureSchema = BackboneElementSchema.extend({
  stereochemistry: CodeableConceptSchema.optional(),
  opticalActivity: CodeableConceptSchema.optional(),
  molecularFormula: z.string().optional(),
  _molecularFormula: ElementSchema.optional(),
  molecularFormulaByMoiety: z.string().optional(),
  _molecularFormulaByMoiety: ElementSchema.optional(),
  molecularWeight: z.lazy(() => SubstanceDefinitionMolecularWeightSchema).optional(),
  technique: z.array(CodeableConceptSchema).optional(),
  sourceDocument: z.array(ReferenceSchema).optional(),
  representation: z.array(SubstanceDefinitionStructureRepresentationSchema).optional(),
})
export type SubstanceDefinitionStructure = z.infer<typeof SubstanceDefinitionStructureSchema>

/**
 * Codes associated with the substance
 */
export const SubstanceDefinitionCodeSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  status: CodeableConceptSchema.optional(),
  statusDate: z.string().optional(),
  _statusDate: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  source: z.array(ReferenceSchema).optional(),
})
export type SubstanceDefinitionCode = z.infer<typeof SubstanceDefinitionCodeSchema>

/**
 * Details of the official nature of this name
 */
export const SubstanceDefinitionNameOfficialSchema = BackboneElementSchema.extend({
  authority: CodeableConceptSchema.optional(),
  status: CodeableConceptSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
})
export type SubstanceDefinitionNameOfficial = z.infer<typeof SubstanceDefinitionNameOfficialSchema>

/**
 * Names applicable to this substance
 */
export interface SubstanceDefinitionName extends BackboneElement {
  name: string
  _name?: Element | undefined
  type?: CodeableConcept | undefined
  status?: CodeableConcept | undefined
  preferred?: boolean | undefined
  _preferred?: Element | undefined
  language?: CodeableConcept[] | undefined
  domain?: CodeableConcept[] | undefined
  jurisdiction?: CodeableConcept[] | undefined
  synonym?: SubstanceDefinitionName[] | undefined
  translation?: SubstanceDefinitionName[] | undefined
  official?: SubstanceDefinitionNameOfficial[] | undefined
  source?: Reference[] | undefined
}

export const SubstanceDefinitionNameSchema: z.ZodType<SubstanceDefinitionName> = z.lazy(() =>
  BackboneElementSchema.extend({
    name: z.string(),
      _name: ElementSchema.optional(),
    type: CodeableConceptSchema.optional(),
    status: CodeableConceptSchema.optional(),
    preferred: z.boolean().optional(),
      _preferred: ElementSchema.optional(),
    language: z.array(CodeableConceptSchema).optional(),
    domain: z.array(CodeableConceptSchema).optional(),
    jurisdiction: z.array(CodeableConceptSchema).optional(),
    synonym: z.lazy(() => z.array(SubstanceDefinitionNameSchema)).optional(),
    translation: z.lazy(() => z.array(SubstanceDefinitionNameSchema)).optional(),
    official: z.array(SubstanceDefinitionNameOfficialSchema).optional(),
    source: z.array(ReferenceSchema).optional(),
  })
)

/**
 * A link between this substance and another
 * A link between this substance and another, with details of the relationship.
 */
export const SubstanceDefinitionRelationshipSchema = BackboneElementSchema.extend({
  substanceDefinitionReference: ReferenceSchema.optional(),
  substanceDefinitionCodeableConcept: CodeableConceptSchema.optional(),
  type: CodeableConceptSchema,
  isDefining: z.boolean().optional(),
  _isDefining: ElementSchema.optional(),
  amountQuantity: QuantitySchema.optional(),
  amountRatio: RatioSchema.optional(),
  amountString: z.string().optional(),
  _amountString: ElementSchema.optional(),
  ratioHighLimitAmount: RatioSchema.optional(),
  comparator: CodeableConceptSchema.optional(),
  source: z.array(ReferenceSchema).optional(),
})
export type SubstanceDefinitionRelationship = z.infer<typeof SubstanceDefinitionRelationshipSchema>

/**
 * Material or taxonomic/anatomical source
 * Material or taxonomic/anatomical source for the substance.
 */
export const SubstanceDefinitionSourceMaterialSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  genus: CodeableConceptSchema.optional(),
  species: CodeableConceptSchema.optional(),
  part: CodeableConceptSchema.optional(),
  countryOfOrigin: z.array(CodeableConceptSchema).optional(),
})
export type SubstanceDefinitionSourceMaterial = z.infer<typeof SubstanceDefinitionSourceMaterialSchema>

/**
 * The detailed description of a substance, typically at a level beyond what is used for prescribing.
 */
export const SubstanceDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SubstanceDefinition'),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  status: CodeableConceptSchema.optional(),
  classification: z.array(CodeableConceptSchema).optional(),
  domain: CodeableConceptSchema.optional(),
  grade: z.array(CodeableConceptSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  informationSource: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  manufacturer: z.array(ReferenceSchema).optional(),
  supplier: z.array(ReferenceSchema).optional(),
  moiety: z.array(SubstanceDefinitionMoietySchema).optional(),
  property: z.array(SubstanceDefinitionPropertySchema).optional(),
  molecularWeight: z.array(SubstanceDefinitionMolecularWeightSchema).optional(),
  structure: SubstanceDefinitionStructureSchema.optional(),
  code: z.array(SubstanceDefinitionCodeSchema).optional(),
  name: z.array(SubstanceDefinitionNameSchema).optional(),
  relationship: z.array(SubstanceDefinitionRelationshipSchema).optional(),
  sourceMaterial: SubstanceDefinitionSourceMaterialSchema.optional(),
})
export type SubstanceDefinition = z.infer<typeof SubstanceDefinitionSchema>

/**
 * Ordered item details
 * Specific parameters for the ordered item.  For example, the size of the indicated item.
 */
export const SupplyRequestParameterSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
})
export type SupplyRequestParameter = z.infer<typeof SupplyRequestParameterSchema>

/**
 * A record of a request for a medication, substance or device used in the healthcare setting.
 */
export const SupplyRequestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SupplyRequest'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'active', 'suspended', 'cancelled', 'completed', 'entered-in-error', 'unknown']).optional(),
  _status: ElementSchema.optional(),
  category: CodeableConceptSchema.optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  itemCodeableConcept: CodeableConceptSchema.optional(),
  itemReference: ReferenceSchema.optional(),
  quantity: QuantitySchema,
  parameter: z.array(SupplyRequestParameterSchema).optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  occurrenceTiming: TimingSchema.optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  requester: ReferenceSchema.optional(),
  supplier: z.array(ReferenceSchema).optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  deliverFrom: ReferenceSchema.optional(),
  deliverTo: ReferenceSchema.optional(),
})
export type SupplyRequest = z.infer<typeof SupplyRequestSchema>

/**
 * Base StructureDefinition for integer Type: A whole number
 */
export const integerSchema = ElementSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
})
export type integer = z.infer<typeof integerSchema>

/**
 * Base StructureDefinition for positiveInt type: An integer with a value that is positive (e.g. >0)
 */
export const positiveIntSchema = integerSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
})
export type positiveInt = z.infer<typeof positiveIntSchema>

/**
 * Actor involved
 * An actor taking a role in an activity  for which it can be assigned some degree of responsibility for the activity taking place.
 * Several agents may be associated (i.e. has some responsibility for an activity) with an activity and vice-versa.
 */
export interface ProvenanceAgent extends BackboneElement {
  type?: CodeableConcept | undefined
  role?: CodeableConcept[] | undefined
  who: Reference
  onBehalfOf?: Reference | undefined
}

export const ProvenanceAgentSchema: z.ZodType<ProvenanceAgent> = z.lazy(() =>
  BackboneElementSchema.extend({
    type: CodeableConceptSchema.optional(),
    role: z.array(CodeableConceptSchema).optional(),
    who: ReferenceSchema,
    onBehalfOf: ReferenceSchema.optional(),
  })
)

/**
 * An entity used in this activity
 */
export const ProvenanceEntitySchema = BackboneElementSchema.extend({
  role: z.enum(['derivation', 'revision', 'quotation', 'source', 'removal']),
  _role: ElementSchema.optional(),
  what: ReferenceSchema,
  agent: z.lazy(() => z.array(ProvenanceAgentSchema)).optional(),
})
export type ProvenanceEntity = z.infer<typeof ProvenanceEntitySchema>

/**
 * Provenance of a resource is a record that describes entities and processes involved in producing and delivering or otherwise influencing that resource. Provenance provides a critical foundation for assessing authenticity, enabling trust, and allowing reproducibility. Provenance assertions are a form of contextual metadata and can themselves become important records with their own provenance. Provenance statement indicates clinical significance in terms of confidence in authenticity, reliability, and trustworthiness, integrity, and stage in lifecycle (e.g. Document Completion - has the artifact been legally authenticated), all of which may impact security, privacy, and trust policies.
 */
export const ProvenanceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Provenance'),
  target: z.array(ReferenceSchema),
  occurredPeriod: PeriodSchema.optional(),
  occurredDateTime: z.string().optional(),
  _occurredDateTime: ElementSchema.optional(),
  recorded: z.string(),
  _recorded: ElementSchema.optional(),
  policy: z.array(z.string()).optional(),
  _policy: ElementSchema.optional(),
  location: ReferenceSchema.optional(),
  reason: z.array(CodeableConceptSchema).optional(),
  activity: CodeableConceptSchema.optional(),
  agent: z.array(ProvenanceAgentSchema),
  entity: z.array(ProvenanceEntitySchema).optional(),
  signature: z.array(SignatureSchema).optional(),
})
export type Provenance = z.infer<typeof ProvenanceSchema>

/**
 * A resource that represents the data of a single raw artifact as digital content accessible in its native format.  A Binary resource can contain any content, whether text, image, pdf, zip archive, etc.
 */
export const BinarySchema = ResourceSchema.extend({
  resourceType: z.literal('Binary'),
  contentType: z.string(),
  _contentType: ElementSchema.optional(),
  securityContext: ReferenceSchema.optional(),
  data: z.string().optional(),
  _data: ElementSchema.optional(),
})
export type Binary = z.infer<typeof BinarySchema>

/**
 * Outcome predicted
 * Describes the expected outcome for the subject.
 * Multiple repetitions can be used to identify the same type of outcome in different timeframes as well as different types of outcomes.
 */
export const RiskAssessmentPredictionSchema = BackboneElementSchema.extend({
  outcome: CodeableConceptSchema.optional(),
  probabilityDecimal: z.number().optional(),
  _probabilityDecimal: ElementSchema.optional(),
  probabilityRange: RangeSchema.optional(),
  qualitativeRisk: CodeableConceptSchema.optional(),
  relativeRisk: z.number().optional(),
  _relativeRisk: ElementSchema.optional(),
  whenPeriod: PeriodSchema.optional(),
  whenRange: RangeSchema.optional(),
  rationale: z.string().optional(),
  _rationale: ElementSchema.optional(),
})
export type RiskAssessmentPrediction = z.infer<typeof RiskAssessmentPredictionSchema>

/**
 * An assessment of the likely outcome(s) for a patient or other subject as well as the likelihood of each outcome.
 */
export const RiskAssessmentSchema = DomainResourceSchema.extend({
  resourceType: z.literal('RiskAssessment'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: ReferenceSchema.optional(),
  parent: ReferenceSchema.optional(),
  status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  method: CodeableConceptSchema.optional(),
  code: CodeableConceptSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  condition: ReferenceSchema.optional(),
  performer: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  basis: z.array(ReferenceSchema).optional(),
  prediction: z.array(RiskAssessmentPredictionSchema).optional(),
  mitigation: z.string().optional(),
  _mitigation: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>

/**
 * Operation Parameter
 * A parameter passed to or received from the operation.
 */
export interface ParametersParameter extends BackboneElement {
  name: string
  _name?: Element | undefined
  valueBase64Binary?: string | undefined
  _valueBase64Binary?: Element | undefined
  valueBoolean?: boolean | undefined
  _valueBoolean?: Element | undefined
  valueCanonical?: string | undefined
  _valueCanonical?: Element | undefined
  valueCode?: string | undefined
  _valueCode?: Element | undefined
  valueDate?: string | undefined
  _valueDate?: Element | undefined
  valueDateTime?: string | undefined
  _valueDateTime?: Element | undefined
  valueDecimal?: number | undefined
  _valueDecimal?: Element | undefined
  valueId?: string | undefined
  _valueId?: Element | undefined
  valueInstant?: string | undefined
  _valueInstant?: Element | undefined
  valueInteger?: number | undefined
  _valueInteger?: Element | undefined
  valueMarkdown?: string | undefined
  _valueMarkdown?: Element | undefined
  valueOid?: string | undefined
  _valueOid?: Element | undefined
  valuePositiveInt?: number | undefined
  _valuePositiveInt?: Element | undefined
  valueString?: string | undefined
  _valueString?: Element | undefined
  valueTime?: string | undefined
  _valueTime?: Element | undefined
  valueUnsignedInt?: number | undefined
  _valueUnsignedInt?: Element | undefined
  valueUri?: string | undefined
  _valueUri?: Element | undefined
  valueUrl?: string | undefined
  _valueUrl?: Element | undefined
  valueUuid?: string | undefined
  _valueUuid?: Element | undefined
  valueAddress?: Address | undefined
  valueAge?: Age | undefined
  valueAnnotation?: Annotation | undefined
  valueAttachment?: Attachment | undefined
  valueCodeableConcept?: CodeableConcept | undefined
  valueCoding?: Coding | undefined
  valueContactPoint?: ContactPoint | undefined
  valueCount?: Count | undefined
  valueDistance?: Distance | undefined
  valueDuration?: Duration | undefined
  valueHumanName?: HumanName | undefined
  valueIdentifier?: Identifier | undefined
  valueMoney?: Money | undefined
  valuePeriod?: Period | undefined
  valueQuantity?: Quantity | undefined
  valueRange?: Range | undefined
  valueRatio?: Ratio | undefined
  valueReference?: Reference | undefined
  valueSampledData?: SampledData | undefined
  valueSignature?: Signature | undefined
  valueTiming?: Timing | undefined
  valueContactDetail?: ContactDetail | undefined
  valueContributor?: Contributor | undefined
  valueDataRequirement?: DataRequirement | undefined
  valueExpression?: Expression | undefined
  valueParameterDefinition?: ParameterDefinition | undefined
  valueRelatedArtifact?: RelatedArtifact | undefined
  valueTriggerDefinition?: TriggerDefinition | undefined
  valueUsageContext?: UsageContext | undefined
  valueDosage?: Dosage | undefined
  valueMeta?: Meta | undefined
  resource?: Resource | undefined
  part?: ParametersParameter[] | undefined
}

export const ParametersParameterSchema: z.ZodType<ParametersParameter> = z.lazy(() =>
  BackboneElementSchema.extend({
    name: z.string(),
      _name: ElementSchema.optional(),
    valueBase64Binary: z.string().optional(),
      _valueBase64Binary: ElementSchema.optional(),
    valueBoolean: z.boolean().optional(),
      _valueBoolean: ElementSchema.optional(),
    valueCanonical: z.string().optional(),
      _valueCanonical: ElementSchema.optional(),
    valueCode: z.string().optional(),
      _valueCode: ElementSchema.optional(),
    valueDate: z.string().optional(),
      _valueDate: ElementSchema.optional(),
    valueDateTime: z.string().optional(),
      _valueDateTime: ElementSchema.optional(),
    valueDecimal: z.number().optional(),
      _valueDecimal: ElementSchema.optional(),
    valueId: z.string().optional(),
      _valueId: ElementSchema.optional(),
    valueInstant: z.string().optional(),
      _valueInstant: ElementSchema.optional(),
    valueInteger: z.number().optional(),
      _valueInteger: ElementSchema.optional(),
    valueMarkdown: z.string().optional(),
      _valueMarkdown: ElementSchema.optional(),
    valueOid: z.string().optional(),
      _valueOid: ElementSchema.optional(),
    valuePositiveInt: z.number().optional(),
      _valuePositiveInt: ElementSchema.optional(),
    valueString: z.string().optional(),
      _valueString: ElementSchema.optional(),
    valueTime: z.string().optional(),
      _valueTime: ElementSchema.optional(),
    valueUnsignedInt: z.number().optional(),
      _valueUnsignedInt: ElementSchema.optional(),
    valueUri: z.string().optional(),
      _valueUri: ElementSchema.optional(),
    valueUrl: z.string().optional(),
      _valueUrl: ElementSchema.optional(),
    valueUuid: z.string().optional(),
      _valueUuid: ElementSchema.optional(),
    valueAddress: AddressSchema.optional(),
    valueAge: AgeSchema.optional(),
    valueAnnotation: AnnotationSchema.optional(),
    valueAttachment: AttachmentSchema.optional(),
    valueCodeableConcept: CodeableConceptSchema.optional(),
    valueCoding: CodingSchema.optional(),
    valueContactPoint: ContactPointSchema.optional(),
    valueCount: CountSchema.optional(),
    valueDistance: DistanceSchema.optional(),
    valueDuration: DurationSchema.optional(),
    valueHumanName: HumanNameSchema.optional(),
    valueIdentifier: IdentifierSchema.optional(),
    valueMoney: MoneySchema.optional(),
    valuePeriod: PeriodSchema.optional(),
    valueQuantity: QuantitySchema.optional(),
    valueRange: RangeSchema.optional(),
    valueRatio: RatioSchema.optional(),
    valueReference: ReferenceSchema.optional(),
    valueSampledData: SampledDataSchema.optional(),
    valueSignature: SignatureSchema.optional(),
    valueTiming: TimingSchema.optional(),
    valueContactDetail: ContactDetailSchema.optional(),
    valueContributor: ContributorSchema.optional(),
    valueDataRequirement: DataRequirementSchema.optional(),
    valueExpression: ExpressionSchema.optional(),
    valueParameterDefinition: ParameterDefinitionSchema.optional(),
    valueRelatedArtifact: RelatedArtifactSchema.optional(),
    valueTriggerDefinition: TriggerDefinitionSchema.optional(),
    valueUsageContext: UsageContextSchema.optional(),
    valueDosage: DosageSchema.optional(),
    valueMeta: MetaSchema.optional(),
    resource: ResourceSchema.optional(),
    part: z.lazy(() => z.array(ParametersParameterSchema)).optional(),
  })
)

/**
 * This resource is a non-persisted resource used to pass information into and back from an [operation](operations.html). It has no other use, and there is no RESTful endpoint associated with it.
 */
export const ParametersSchema = ResourceSchema.extend({
  resourceType: z.literal('Parameters'),
  parameter: z.array(ParametersParameterSchema).optional(),
})
export type Parameters = z.infer<typeof ParametersSchema>

/**
 * Specific eligibility requirements required to use the service
 * Does this service have specific eligibility requirements that need to be met in order to use the service?
 */
export const HealthcareServiceEligibilitySchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
})
export type HealthcareServiceEligibility = z.infer<typeof HealthcareServiceEligibilitySchema>

/**
 * Times the Service Site is available
 * A collection of times that the Service Site is available.
 * More detailed availability information may be provided in associated Schedule/Slot resources.
 */
export const HealthcareServiceAvailableTimeSchema = BackboneElementSchema.extend({
  daysOfWeek: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])).optional(),
  _daysOfWeek: ElementSchema.optional(),
  allDay: z.boolean().optional(),
  _allDay: ElementSchema.optional(),
  availableStartTime: z.string().optional(),
  _availableStartTime: ElementSchema.optional(),
  availableEndTime: z.string().optional(),
  _availableEndTime: ElementSchema.optional(),
})
export type HealthcareServiceAvailableTime = z.infer<typeof HealthcareServiceAvailableTimeSchema>

/**
 * Not available during this time due to provided reason
 * The HealthcareService is not available during this period of time due to the provided reason.
 */
export const HealthcareServiceNotAvailableSchema = BackboneElementSchema.extend({
  description: z.string(),
  _description: ElementSchema.optional(),
  during: PeriodSchema.optional(),
})
export type HealthcareServiceNotAvailable = z.infer<typeof HealthcareServiceNotAvailableSchema>

/**
 * The details of a healthcare service available at a location.
 */
export const HealthcareServiceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('HealthcareService'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  providedBy: ReferenceSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  type: z.array(CodeableConceptSchema).optional(),
  specialty: z.array(CodeableConceptSchema).optional(),
  location: z.array(ReferenceSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  extraDetails: z.string().optional(),
  _extraDetails: ElementSchema.optional(),
  photo: AttachmentSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
  coverageArea: z.array(ReferenceSchema).optional(),
  serviceProvisionCode: z.array(CodeableConceptSchema).optional(),
  eligibility: z.array(HealthcareServiceEligibilitySchema).optional(),
  program: z.array(CodeableConceptSchema).optional(),
  characteristic: z.array(CodeableConceptSchema).optional(),
  communication: z.array(CodeableConceptSchema).optional(),
  referralMethod: z.array(CodeableConceptSchema).optional(),
  appointmentRequired: z.boolean().optional(),
  _appointmentRequired: ElementSchema.optional(),
  availableTime: z.array(HealthcareServiceAvailableTimeSchema).optional(),
  notAvailable: z.array(HealthcareServiceNotAvailableSchema).optional(),
  availabilityExceptions: z.string().optional(),
  _availabilityExceptions: ElementSchema.optional(),
  endpoint: z.array(ReferenceSchema).optional(),
})
export type HealthcareService = z.infer<typeof HealthcareServiceSchema>

/**
 * A language which may be used to communicate with about the patient's health
 * If no language is specified, this *implies* that the default local language is spoken.  If you need to convey proficiency for multiple modes, then you need multiple RelatedPerson.Communication associations.   If the RelatedPerson does not speak the default local language, then the Interpreter Required Standard can be used to explicitly declare that an interpreter is required.
 */
export const RelatedPersonCommunicationSchema = BackboneElementSchema.extend({
  language: CodeableConceptSchema,
  preferred: z.boolean().optional(),
  _preferred: ElementSchema.optional(),
})
export type RelatedPersonCommunication = z.infer<typeof RelatedPersonCommunicationSchema>

/**
 * Information about a person that is involved in the care for a patient, but who is not the target of healthcare, nor has a formal responsibility in the care process.
 */
export const RelatedPersonSchema = DomainResourceSchema.extend({
  resourceType: z.literal('RelatedPerson'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  patient: ReferenceSchema,
  relationship: z.array(CodeableConceptSchema).optional(),
  name: z.array(HumanNameSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  _gender: ElementSchema.optional(),
  birthDate: z.string().optional(),
  _birthDate: ElementSchema.optional(),
  address: z.array(AddressSchema).optional(),
  photo: z.array(AttachmentSchema).optional(),
  period: PeriodSchema.optional(),
  communication: z.array(RelatedPersonCommunicationSchema).optional(),
})
export type RelatedPerson = z.infer<typeof RelatedPersonSchema>

/**
 * Evidence variable such as population, exposure, or outcome
 */
export const EvidenceVariableDefinitionSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  variableRole: CodeableConceptSchema,
  observed: ReferenceSchema.optional(),
  intended: ReferenceSchema.optional(),
  directnessMatch: CodeableConceptSchema.optional(),
})
export type EvidenceVariableDefinition = z.infer<typeof EvidenceVariableDefinitionSchema>

/**
 * Number of samples in the statistic
 */
export const EvidenceStatisticSampleSizeSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  numberOfStudies: z.number().optional(),
  _numberOfStudies: ElementSchema.optional(),
  numberOfParticipants: z.number().optional(),
  _numberOfParticipants: ElementSchema.optional(),
  knownDataCount: z.number().optional(),
  _knownDataCount: ElementSchema.optional(),
})
export type EvidenceStatisticSampleSize = z.infer<typeof EvidenceStatisticSampleSizeSchema>

/**
 * An attribute of the Statistic
 * A statistical attribute of the statistic such as a measure of heterogeneity.
 */
export interface EvidenceStatisticAttributeEstimate extends BackboneElement {
  description?: string | undefined
  _description?: Element | undefined
  note?: Annotation[] | undefined
  type?: CodeableConcept | undefined
  quantity?: Quantity | undefined
  level?: number | undefined
  _level?: Element | undefined
  range?: Range | undefined
  attributeEstimate?: EvidenceStatisticAttributeEstimate[] | undefined
}

export const EvidenceStatisticAttributeEstimateSchema: z.ZodType<EvidenceStatisticAttributeEstimate> = z.lazy(() =>
  BackboneElementSchema.extend({
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    note: z.array(AnnotationSchema).optional(),
    type: CodeableConceptSchema.optional(),
    quantity: QuantitySchema.optional(),
    level: z.number().optional(),
      _level: ElementSchema.optional(),
    range: RangeSchema.optional(),
    attributeEstimate: z.lazy(() => z.array(EvidenceStatisticAttributeEstimateSchema)).optional(),
  })
)

/**
 * A variable adjusted for in the adjusted analysis
 */
export const EvidenceStatisticModelCharacteristicVariableSchema = BackboneElementSchema.extend({
  variableDefinition: ReferenceSchema,
  handling: z.enum(['continuous', 'dichotomous', 'ordinal', 'polychotomous']).optional(),
  _handling: ElementSchema.optional(),
  valueCategory: z.array(CodeableConceptSchema).optional(),
  valueQuantity: z.array(QuantitySchema).optional(),
  valueRange: z.array(RangeSchema).optional(),
})
export type EvidenceStatisticModelCharacteristicVariable = z.infer<typeof EvidenceStatisticModelCharacteristicVariableSchema>

/**
 * An aspect of the statistical model
 * A component of the method to generate the statistic.
 */
export const EvidenceStatisticModelCharacteristicSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  value: QuantitySchema.optional(),
  variable: z.array(EvidenceStatisticModelCharacteristicVariableSchema).optional(),
  attributeEstimate: z.lazy(() => z.array(EvidenceStatisticAttributeEstimateSchema)).optional(),
})
export type EvidenceStatisticModelCharacteristic = z.infer<typeof EvidenceStatisticModelCharacteristicSchema>

/**
 * Values and parameters for a single statistic
 */
export const EvidenceStatisticSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  statisticType: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  quantity: QuantitySchema.optional(),
  numberOfEvents: z.number().optional(),
  _numberOfEvents: ElementSchema.optional(),
  numberAffected: z.number().optional(),
  _numberAffected: ElementSchema.optional(),
  sampleSize: EvidenceStatisticSampleSizeSchema.optional(),
  attributeEstimate: z.array(EvidenceStatisticAttributeEstimateSchema).optional(),
  modelCharacteristic: z.array(EvidenceStatisticModelCharacteristicSchema).optional(),
})
export type EvidenceStatistic = z.infer<typeof EvidenceStatisticSchema>

/**
 * Certainty or quality of the evidence
 * Assessment of certainty, confidence in the estimates, or quality of the evidence.
 */
export interface EvidenceCertainty extends BackboneElement {
  description?: string | undefined
  _description?: Element | undefined
  note?: Annotation[] | undefined
  type?: CodeableConcept | undefined
  rating?: CodeableConcept | undefined
  rater?: string | undefined
  _rater?: Element | undefined
  subcomponent?: EvidenceCertainty[] | undefined
}

export const EvidenceCertaintySchema: z.ZodType<EvidenceCertainty> = z.lazy(() =>
  BackboneElementSchema.extend({
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    note: z.array(AnnotationSchema).optional(),
    type: CodeableConceptSchema.optional(),
    rating: CodeableConceptSchema.optional(),
    rater: z.string().optional(),
      _rater: ElementSchema.optional(),
    subcomponent: z.lazy(() => z.array(EvidenceCertaintySchema)).optional(),
  })
)

/**
 * The Evidence Resource provides a machine-interpretable expression of an evidence concept including the evidence variables (eg population, exposures/interventions, comparators, outcomes, measured variables, confounding variables), the statistics, and the certainty of this evidence.
 */
export const EvidenceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Evidence'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  citeAsReference: ReferenceSchema.optional(),
  citeAsMarkdown: z.string().optional(),
  _citeAsMarkdown: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  assertion: z.string().optional(),
  _assertion: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  variableDefinition: z.array(EvidenceVariableDefinitionSchema),
  synthesisType: CodeableConceptSchema.optional(),
  studyType: CodeableConceptSchema.optional(),
  statistic: z.array(EvidenceStatisticSchema).optional(),
  certainty: z.array(EvidenceCertaintySchema).optional(),
})
export type Evidence = z.infer<typeof EvidenceSchema>

/**
 * Basic is used for handling concepts not yet defined in FHIR, narrative-only resources that don't map to an existing resource, and custom resources not appropriate for inclusion in the FHIR specification.
 */
export const BasicSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Basic'),
  identifier: z.array(IdentifierSchema).optional(),
  code: CodeableConceptSchema,
  subject: ReferenceSchema.optional(),
  created: z.string().optional(),
  _created: ElementSchema.optional(),
  author: ReferenceSchema.optional(),
})
export type Basic = z.infer<typeof BasicSchema>

/**
 * Unique identifiers used for system
 * Indicates how the system may be identified when referenced in electronic exchange.
 * Multiple identifiers may exist, either due to duplicate registration, regional rules, needs of different communication technologies, etc.
 */
export const NamingSystemUniqueIdSchema = BackboneElementSchema.extend({
  type: z.enum(['oid', 'uuid', 'uri', 'other']),
  _type: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
  preferred: z.boolean().optional(),
  _preferred: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  period: PeriodSchema.optional(),
})
export type NamingSystemUniqueId = z.infer<typeof NamingSystemUniqueIdSchema>

/**
 * A curated namespace that issues unique symbols within that namespace for the identification of concepts, people, devices, etc.  Represents a "System" used within the Identifier and Coding data types.
 */
export const NamingSystemSchema = DomainResourceSchema.extend({
  resourceType: z.literal('NamingSystem'),
  name: z.string(),
  _name: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  kind: z.enum(['codesystem', 'identifier', 'root']),
  _kind: ElementSchema.optional(),
  date: z.string(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  responsible: z.string().optional(),
  _responsible: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  usage: z.string().optional(),
  _usage: ElementSchema.optional(),
  uniqueId: z.array(NamingSystemUniqueIdSchema),
})
export type NamingSystem = z.infer<typeof NamingSystemSchema>

/**
 * Eye alignment compensation
 * Allows for adjustment on two axis.
 */
export const VisionPrescriptionLensSpecificationPrismSchema = BackboneElementSchema.extend({
  amount: z.number(),
  _amount: ElementSchema.optional(),
  base: z.enum(['up', 'down', 'in', 'out']),
  _base: ElementSchema.optional(),
})
export type VisionPrescriptionLensSpecificationPrism = z.infer<typeof VisionPrescriptionLensSpecificationPrismSchema>

/**
 * Vision lens authorization
 * Contain the details of  the individual lens specifications and serves as the authorization for the fullfillment by certified professionals.
 */
export const VisionPrescriptionLensSpecificationSchema = BackboneElementSchema.extend({
  product: CodeableConceptSchema,
  eye: z.enum(['right', 'left']),
  _eye: ElementSchema.optional(),
  sphere: z.number().optional(),
  _sphere: ElementSchema.optional(),
  cylinder: z.number().optional(),
  _cylinder: ElementSchema.optional(),
  axis: z.number().optional(),
  _axis: ElementSchema.optional(),
  prism: z.array(VisionPrescriptionLensSpecificationPrismSchema).optional(),
  add: z.number().optional(),
  _add: ElementSchema.optional(),
  power: z.number().optional(),
  _power: ElementSchema.optional(),
  backCurve: z.number().optional(),
  _backCurve: ElementSchema.optional(),
  diameter: z.number().optional(),
  _diameter: ElementSchema.optional(),
  duration: QuantitySchema.optional(),
  color: z.string().optional(),
  _color: ElementSchema.optional(),
  brand: z.string().optional(),
  _brand: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type VisionPrescriptionLensSpecification = z.infer<typeof VisionPrescriptionLensSpecificationSchema>

/**
 * An authorization for the provision of glasses and/or contact lenses to a patient.
 */
export const VisionPrescriptionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('VisionPrescription'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  created: z.string(),
  _created: ElementSchema.optional(),
  patient: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  dateWritten: z.string(),
  _dateWritten: ElementSchema.optional(),
  prescriber: ReferenceSchema,
  lensSpecification: z.array(VisionPrescriptionLensSpecificationSchema),
})
export type VisionPrescription = z.infer<typeof VisionPrescriptionSchema>

/**
 * This resource provides the insurance enrollment details to the insurer regarding a specified coverage.
 */
export const EnrollmentRequestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('EnrollmentRequest'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  created: z.string().optional(),
  _created: ElementSchema.optional(),
  insurer: ReferenceSchema.optional(),
  provider: ReferenceSchema.optional(),
  candidate: ReferenceSchema.optional(),
  coverage: ReferenceSchema.optional(),
})
export type EnrollmentRequest = z.infer<typeof EnrollmentRequestSchema>

/**
 * Prospective warnings of potential issues when providing care to the patient.
 */
export const FlagSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Flag'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema,
  subject: ReferenceSchema,
  period: PeriodSchema.optional(),
  encounter: ReferenceSchema.optional(),
  author: ReferenceSchema.optional(),
})
export type Flag = z.infer<typeof FlagSchema>

/**
 * Prior or corollary claims
 * Other claims which are related to this claim such as prior submissions or claims for related services or for the same event.
 * For example,  for the original treatment and follow-up exams.
 */
export const ExplanationOfBenefitRelatedSchema = BackboneElementSchema.extend({
  claim: ReferenceSchema.optional(),
  relationship: CodeableConceptSchema.optional(),
  reference: IdentifierSchema.optional(),
})
export type ExplanationOfBenefitRelated = z.infer<typeof ExplanationOfBenefitRelatedSchema>

/**
 * Recipient of benefits payable
 * The party to be reimbursed for cost of the products and services according to the terms of the policy.
 * Often providers agree to receive the benefits payable to reduce the near-term costs to the patient. The insurer may decline to pay the provider and may choose to pay the subscriber instead.
 */
export const ExplanationOfBenefitPayeeSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  party: ReferenceSchema.optional(),
})
export type ExplanationOfBenefitPayee = z.infer<typeof ExplanationOfBenefitPayeeSchema>

/**
 * Care Team members
 * The members of the team who provided the products and services.
 */
export const ExplanationOfBenefitCareTeamSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  provider: ReferenceSchema,
  responsible: z.boolean().optional(),
  _responsible: ElementSchema.optional(),
  role: CodeableConceptSchema.optional(),
  qualification: CodeableConceptSchema.optional(),
})
export type ExplanationOfBenefitCareTeam = z.infer<typeof ExplanationOfBenefitCareTeamSchema>

/**
 * Supporting information
 * Additional information codes regarding exceptions, special considerations, the condition, situation, prior or concurrent issues.
 * Often there are multiple jurisdiction specific valuesets which are required.
 */
export const ExplanationOfBenefitSupportingInfoSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  category: CodeableConceptSchema,
  code: CodeableConceptSchema.optional(),
  timingDate: z.string().optional(),
  _timingDate: ElementSchema.optional(),
  timingPeriod: PeriodSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  reason: CodingSchema.optional(),
})
export type ExplanationOfBenefitSupportingInfo = z.infer<typeof ExplanationOfBenefitSupportingInfoSchema>

/**
 * Pertinent diagnosis information
 * Information about diagnoses relevant to the claim items.
 */
export const ExplanationOfBenefitDiagnosisSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  diagnosisCodeableConcept: CodeableConceptSchema.optional(),
  diagnosisReference: ReferenceSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  onAdmission: CodeableConceptSchema.optional(),
  packageCode: CodeableConceptSchema.optional(),
})
export type ExplanationOfBenefitDiagnosis = z.infer<typeof ExplanationOfBenefitDiagnosisSchema>

/**
 * Clinical procedures performed
 * Procedures performed on the patient relevant to the billing items with the claim.
 */
export const ExplanationOfBenefitProcedureSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  procedureCodeableConcept: CodeableConceptSchema.optional(),
  procedureReference: ReferenceSchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
})
export type ExplanationOfBenefitProcedure = z.infer<typeof ExplanationOfBenefitProcedureSchema>

/**
 * Patient insurance information
 * Financial instruments for reimbursement for the health care products and services specified on the claim.
 * All insurance coverages for the patient which may be applicable for reimbursement, of the products and services listed in the claim, are typically provided in the claim to allow insurers to confirm the ordering of the insurance coverages relative to local 'coordination of benefit' rules. One coverage (and only one) with 'focal=true' is to be used in the adjudication of this claim. Coverages appearing before the focal Coverage in the list, and where 'Coverage.subrogation=false', should provide a reference to the ClaimResponse containing the adjudication results of the prior claim.
 */
export const ExplanationOfBenefitInsuranceSchema = BackboneElementSchema.extend({
  focal: z.boolean(),
  _focal: ElementSchema.optional(),
  coverage: ReferenceSchema,
  preAuthRef: z.array(z.string()).optional(),
  _preAuthRef: ElementSchema.optional(),
})
export type ExplanationOfBenefitInsurance = z.infer<typeof ExplanationOfBenefitInsuranceSchema>

/**
 * Details of the event
 * Details of a accident which resulted in injuries which required the products and services listed in the claim.
 */
export const ExplanationOfBenefitAccidentSchema = BackboneElementSchema.extend({
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  locationAddress: AddressSchema.optional(),
  locationReference: ReferenceSchema.optional(),
})
export type ExplanationOfBenefitAccident = z.infer<typeof ExplanationOfBenefitAccidentSchema>

/**
 * Adjudication details
 * If this item is a group then the values here are a summary of the adjudication of the detail items. If this item is a simple product or service then this is the result of the adjudication of this item.
 */
export interface ExplanationOfBenefitItemAdjudication extends BackboneElement {
  category: CodeableConcept
  reason?: CodeableConcept | undefined
  amount?: Money | undefined
  value?: number | undefined
  _value?: Element | undefined
}

export const ExplanationOfBenefitItemAdjudicationSchema: z.ZodType<ExplanationOfBenefitItemAdjudication> = z.lazy(() =>
  BackboneElementSchema.extend({
    category: CodeableConceptSchema,
    reason: CodeableConceptSchema.optional(),
    amount: MoneySchema.optional(),
    value: z.number().optional(),
      _value: ElementSchema.optional(),
  })
)

/**
 * Additional items
 * Third-tier of goods and services.
 */
export const ExplanationOfBenefitItemDetailSubDetailSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ExplanationOfBenefitItemAdjudicationSchema)).optional(),
})
export type ExplanationOfBenefitItemDetailSubDetail = z.infer<typeof ExplanationOfBenefitItemDetailSubDetailSchema>

/**
 * Additional items
 * Second-tier of goods and services.
 */
export const ExplanationOfBenefitItemDetailSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ExplanationOfBenefitItemAdjudicationSchema)).optional(),
  subDetail: z.array(ExplanationOfBenefitItemDetailSubDetailSchema).optional(),
})
export type ExplanationOfBenefitItemDetail = z.infer<typeof ExplanationOfBenefitItemDetailSchema>

/**
 * Product or service provided
 * A claim line. Either a simple (a product or service) or a 'group' of details which can also be a simple items or groups of sub-details.
 */
export const ExplanationOfBenefitItemSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  careTeamSequence: z.array(z.number()).optional(),
  _careTeamSequence: ElementSchema.optional(),
  diagnosisSequence: z.array(z.number()).optional(),
  _diagnosisSequence: ElementSchema.optional(),
  procedureSequence: z.array(z.number()).optional(),
  _procedureSequence: ElementSchema.optional(),
  informationSequence: z.array(z.number()).optional(),
  _informationSequence: ElementSchema.optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  locationCodeableConcept: CodeableConceptSchema.optional(),
  locationAddress: AddressSchema.optional(),
  locationReference: ReferenceSchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
  bodySite: CodeableConceptSchema.optional(),
  subSite: z.array(CodeableConceptSchema).optional(),
  encounter: z.array(ReferenceSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.array(ExplanationOfBenefitItemAdjudicationSchema).optional(),
  detail: z.array(ExplanationOfBenefitItemDetailSchema).optional(),
})
export type ExplanationOfBenefitItem = z.infer<typeof ExplanationOfBenefitItemSchema>

/**
 * Insurer added line items
 * The third-tier service adjudications for payor added services.
 */
export const ExplanationOfBenefitAddItemDetailSubDetailSchema = BackboneElementSchema.extend({
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ExplanationOfBenefitItemAdjudicationSchema)).optional(),
})
export type ExplanationOfBenefitAddItemDetailSubDetail = z.infer<typeof ExplanationOfBenefitAddItemDetailSubDetailSchema>

/**
 * Insurer added line items
 * The second-tier service adjudications for payor added services.
 */
export const ExplanationOfBenefitAddItemDetailSchema = BackboneElementSchema.extend({
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ExplanationOfBenefitItemAdjudicationSchema)).optional(),
  subDetail: z.array(ExplanationOfBenefitAddItemDetailSubDetailSchema).optional(),
})
export type ExplanationOfBenefitAddItemDetail = z.infer<typeof ExplanationOfBenefitAddItemDetailSchema>

/**
 * Insurer added line items
 * The first-tier service adjudications for payor added product or service lines.
 */
export const ExplanationOfBenefitAddItemSchema = BackboneElementSchema.extend({
  itemSequence: z.array(z.number()).optional(),
  _itemSequence: ElementSchema.optional(),
  detailSequence: z.array(z.number()).optional(),
  _detailSequence: ElementSchema.optional(),
  subDetailSequence: z.array(z.number()).optional(),
  _subDetailSequence: ElementSchema.optional(),
  provider: z.array(ReferenceSchema).optional(),
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  locationCodeableConcept: CodeableConceptSchema.optional(),
  locationAddress: AddressSchema.optional(),
  locationReference: ReferenceSchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  bodySite: CodeableConceptSchema.optional(),
  subSite: z.array(CodeableConceptSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ExplanationOfBenefitItemAdjudicationSchema)).optional(),
  detail: z.array(ExplanationOfBenefitAddItemDetailSchema).optional(),
})
export type ExplanationOfBenefitAddItem = z.infer<typeof ExplanationOfBenefitAddItemSchema>

/**
 * Adjudication totals
 * Categorized monetary totals for the adjudication.
 * Totals for amounts submitted, co-pays, benefits payable etc.
 */
export const ExplanationOfBenefitTotalSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema,
  amount: MoneySchema,
})
export type ExplanationOfBenefitTotal = z.infer<typeof ExplanationOfBenefitTotalSchema>

/**
 * Payment Details
 * Payment details for the adjudication of the claim.
 */
export const ExplanationOfBenefitPaymentSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  adjustment: MoneySchema.optional(),
  adjustmentReason: CodeableConceptSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  amount: MoneySchema.optional(),
  identifier: IdentifierSchema.optional(),
})
export type ExplanationOfBenefitPayment = z.infer<typeof ExplanationOfBenefitPaymentSchema>

/**
 * Note concerning adjudication
 * A note that describes or explains adjudication results in a human readable form.
 */
export const ExplanationOfBenefitProcessNoteSchema = BackboneElementSchema.extend({
  number: z.number().optional(),
  _number: ElementSchema.optional(),
  type: z.enum(['display', 'print', 'printoper']).optional(),
  _type: ElementSchema.optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
  language: CodeableConceptSchema.optional(),
})
export type ExplanationOfBenefitProcessNote = z.infer<typeof ExplanationOfBenefitProcessNoteSchema>

/**
 * Benefit Summary
 * Benefits Used to date.
 */
export const ExplanationOfBenefitBenefitBalanceFinancialSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  allowedUnsignedInt: z.number().optional(),
  _allowedUnsignedInt: ElementSchema.optional(),
  allowedString: z.string().optional(),
  _allowedString: ElementSchema.optional(),
  allowedMoney: MoneySchema.optional(),
  usedUnsignedInt: z.number().optional(),
  _usedUnsignedInt: ElementSchema.optional(),
  usedMoney: MoneySchema.optional(),
})
export type ExplanationOfBenefitBenefitBalanceFinancial = z.infer<typeof ExplanationOfBenefitBenefitBalanceFinancialSchema>

/**
 * Balance by Benefit Category
 */
export const ExplanationOfBenefitBenefitBalanceSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema,
  excluded: z.boolean().optional(),
  _excluded: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  network: CodeableConceptSchema.optional(),
  unit: CodeableConceptSchema.optional(),
  term: CodeableConceptSchema.optional(),
  financial: z.array(ExplanationOfBenefitBenefitBalanceFinancialSchema).optional(),
})
export type ExplanationOfBenefitBenefitBalance = z.infer<typeof ExplanationOfBenefitBenefitBalanceSchema>

/**
 * This resource provides: the claim details; adjudication details from the processing of a Claim; and optionally account balance information, for informing the subscriber of the benefits provided.
 */
export const ExplanationOfBenefitSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ExplanationOfBenefit'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema,
  subType: CodeableConceptSchema.optional(),
  use: z.enum(['claim', 'preauthorization', 'predetermination']),
  _use: ElementSchema.optional(),
  patient: ReferenceSchema,
  billablePeriod: PeriodSchema.optional(),
  created: z.string(),
  _created: ElementSchema.optional(),
  enterer: ReferenceSchema.optional(),
  insurer: ReferenceSchema,
  provider: ReferenceSchema,
  priority: CodeableConceptSchema.optional(),
  fundsReserveRequested: CodeableConceptSchema.optional(),
  fundsReserve: CodeableConceptSchema.optional(),
  related: z.array(ExplanationOfBenefitRelatedSchema).optional(),
  prescription: ReferenceSchema.optional(),
  originalPrescription: ReferenceSchema.optional(),
  payee: ExplanationOfBenefitPayeeSchema.optional(),
  referral: ReferenceSchema.optional(),
  facility: ReferenceSchema.optional(),
  claim: ReferenceSchema.optional(),
  claimResponse: ReferenceSchema.optional(),
  outcome: z.enum(['queued', 'complete', 'error', 'partial']),
  _outcome: ElementSchema.optional(),
  disposition: z.string().optional(),
  _disposition: ElementSchema.optional(),
  preAuthRef: z.array(z.string()).optional(),
  _preAuthRef: ElementSchema.optional(),
  preAuthRefPeriod: z.array(PeriodSchema).optional(),
  careTeam: z.array(ExplanationOfBenefitCareTeamSchema).optional(),
  supportingInfo: z.array(ExplanationOfBenefitSupportingInfoSchema).optional(),
  diagnosis: z.array(ExplanationOfBenefitDiagnosisSchema).optional(),
  procedure: z.array(ExplanationOfBenefitProcedureSchema).optional(),
  precedence: z.number().optional(),
  _precedence: ElementSchema.optional(),
  insurance: z.array(ExplanationOfBenefitInsuranceSchema),
  accident: ExplanationOfBenefitAccidentSchema.optional(),
  item: z.array(ExplanationOfBenefitItemSchema).optional(),
  addItem: z.array(ExplanationOfBenefitAddItemSchema).optional(),
  adjudication: z.lazy(() => z.array(ExplanationOfBenefitItemAdjudicationSchema)).optional(),
  total: z.array(ExplanationOfBenefitTotalSchema).optional(),
  payment: ExplanationOfBenefitPaymentSchema.optional(),
  formCode: CodeableConceptSchema.optional(),
  form: AttachmentSchema.optional(),
  processNote: z.array(ExplanationOfBenefitProcessNoteSchema).optional(),
  benefitPeriod: PeriodSchema.optional(),
  benefitBalance: z.array(ExplanationOfBenefitBenefitBalanceSchema).optional(),
})
export type ExplanationOfBenefit = z.infer<typeof ExplanationOfBenefitSchema>

/**
 * The legal status of supply of the packaged item as classified by the regulator
 */
export const PackagedProductDefinitionLegalStatusOfSupplySchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  jurisdiction: CodeableConceptSchema.optional(),
})
export type PackagedProductDefinitionLegalStatusOfSupply = z.infer<typeof PackagedProductDefinitionLegalStatusOfSupplySchema>

/**
 * Base StructureDefinition for MarketingStatus Type: The marketing status describes the date when a medicinal product is actually put on the market or the date as of which it is no longer available.
 */
export const MarketingStatusSchema = BackboneElementSchema.extend({
  country: CodeableConceptSchema.optional(),
  jurisdiction: CodeableConceptSchema.optional(),
  status: CodeableConceptSchema,
  dateRange: PeriodSchema.optional(),
  restoreDate: z.string().optional(),
  _restoreDate: ElementSchema.optional(),
})
export type MarketingStatus = z.infer<typeof MarketingStatusSchema>

/**
 * Shelf Life and storage information
 */
export const PackagedProductDefinitionPackageShelfLifeStorageSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  periodDuration: DurationSchema.optional(),
  periodString: z.string().optional(),
  _periodString: ElementSchema.optional(),
  specialPrecautionsForStorage: z.array(CodeableConceptSchema).optional(),
})
export type PackagedProductDefinitionPackageShelfLifeStorage = z.infer<typeof PackagedProductDefinitionPackageShelfLifeStorageSchema>

/**
 * General characteristics of this item
 */
export const PackagedProductDefinitionPackagePropertySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
})
export type PackagedProductDefinitionPackageProperty = z.infer<typeof PackagedProductDefinitionPackagePropertySchema>

/**
 * The item(s) within the packaging
 */
export const PackagedProductDefinitionPackageContainedItemSchema = BackboneElementSchema.extend({
  item: CodeableReferenceSchema,
  amount: QuantitySchema.optional(),
})
export type PackagedProductDefinitionPackageContainedItem = z.infer<typeof PackagedProductDefinitionPackageContainedItemSchema>

/**
 * A packaging item, as a container for medically related items, possibly with other packaging items within, or a packaging component, such as bottle cap
 * A packaging item, as a container for medically related items, possibly with other packaging items within, or a packaging component, such as bottle cap (which is not a device or a medication manufactured item).
 */
export interface PackagedProductDefinitionPackage extends BackboneElement {
  identifier?: Identifier[] | undefined
  type?: CodeableConcept | undefined
  quantity?: number | undefined
  _quantity?: Element | undefined
  material?: CodeableConcept[] | undefined
  alternateMaterial?: CodeableConcept[] | undefined
  shelfLifeStorage?: PackagedProductDefinitionPackageShelfLifeStorage[] | undefined
  manufacturer?: Reference[] | undefined
  property?: PackagedProductDefinitionPackageProperty[] | undefined
  containedItem?: PackagedProductDefinitionPackageContainedItem[] | undefined
  package?: PackagedProductDefinitionPackage[] | undefined
}

export const PackagedProductDefinitionPackageSchema: z.ZodType<PackagedProductDefinitionPackage> = z.lazy(() =>
  BackboneElementSchema.extend({
    identifier: z.array(IdentifierSchema).optional(),
    type: CodeableConceptSchema.optional(),
    quantity: z.number().optional(),
      _quantity: ElementSchema.optional(),
    material: z.array(CodeableConceptSchema).optional(),
    alternateMaterial: z.array(CodeableConceptSchema).optional(),
    shelfLifeStorage: z.array(PackagedProductDefinitionPackageShelfLifeStorageSchema).optional(),
    manufacturer: z.array(ReferenceSchema).optional(),
    property: z.array(PackagedProductDefinitionPackagePropertySchema).optional(),
    containedItem: z.array(PackagedProductDefinitionPackageContainedItemSchema).optional(),
    package: z.lazy(() => z.array(PackagedProductDefinitionPackageSchema)).optional(),
  })
)

/**
 * A medically related item or items, in a container or package.
 */
export const PackagedProductDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('PackagedProductDefinition'),
  identifier: z.array(IdentifierSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  packageFor: z.array(ReferenceSchema).optional(),
  status: CodeableConceptSchema.optional(),
  statusDate: z.string().optional(),
  _statusDate: ElementSchema.optional(),
  containedItemQuantity: z.array(QuantitySchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  legalStatusOfSupply: z.array(PackagedProductDefinitionLegalStatusOfSupplySchema).optional(),
  marketingStatus: z.array(MarketingStatusSchema).optional(),
  characteristic: z.array(CodeableConceptSchema).optional(),
  copackagedIndicator: z.boolean().optional(),
  _copackagedIndicator: ElementSchema.optional(),
  manufacturer: z.array(ReferenceSchema).optional(),
  package: PackagedProductDefinitionPackageSchema.optional(),
})
export type PackagedProductDefinition = z.infer<typeof PackagedProductDefinitionSchema>

/**
 * A contact party (e.g. guardian, partner, friend) for the patient
 * Contact covers all kinds of contact parties: family members, business contacts, guardians, caregivers. Not applicable to register pedigree and family ties beyond use of having contact.
 */
export const PatientContactSchema = BackboneElementSchema.extend({
  relationship: z.array(CodeableConceptSchema).optional(),
  name: HumanNameSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
  address: AddressSchema.optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  _gender: ElementSchema.optional(),
  organization: ReferenceSchema.optional(),
  period: PeriodSchema.optional(),
})
export type PatientContact = z.infer<typeof PatientContactSchema>

/**
 * A language which may be used to communicate with the patient about his or her health
 * If no language is specified, this *implies* that the default local language is spoken.  If you need to convey proficiency for multiple modes, then you need multiple Patient.Communication associations.   For animals, language is not a relevant field, and should be absent from the instance. If the Patient does not speak the default local language, then the Interpreter Required Standard can be used to explicitly declare that an interpreter is required.
 */
export const PatientCommunicationSchema = BackboneElementSchema.extend({
  language: CodeableConceptSchema,
  preferred: z.boolean().optional(),
  _preferred: ElementSchema.optional(),
})
export type PatientCommunication = z.infer<typeof PatientCommunicationSchema>

/**
 * Link to another patient resource that concerns the same actual person
 * Link to another patient resource that concerns the same actual patient.
 * There is no assumption that linked patient records have mutual links.
 */
export const PatientLinkSchema = BackboneElementSchema.extend({
  other: ReferenceSchema,
  type: z.enum(['replaced-by', 'replaces', 'refer', 'seealso']),
  _type: ElementSchema.optional(),
})
export type PatientLink = z.infer<typeof PatientLinkSchema>

/**
 * Demographics and other administrative information about an individual or animal receiving care or other health-related services.
 */
export const PatientSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Patient'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  name: z.array(HumanNameSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  _gender: ElementSchema.optional(),
  birthDate: z.string().optional(),
  _birthDate: ElementSchema.optional(),
  deceasedBoolean: z.boolean().optional(),
  _deceasedBoolean: ElementSchema.optional(),
  deceasedDateTime: z.string().optional(),
  _deceasedDateTime: ElementSchema.optional(),
  address: z.array(AddressSchema).optional(),
  maritalStatus: CodeableConceptSchema.optional(),
  multipleBirthBoolean: z.boolean().optional(),
  _multipleBirthBoolean: ElementSchema.optional(),
  multipleBirthInteger: z.number().optional(),
  _multipleBirthInteger: ElementSchema.optional(),
  photo: z.array(AttachmentSchema).optional(),
  contact: z.array(PatientContactSchema).optional(),
  communication: z.array(PatientCommunicationSchema).optional(),
  generalPractitioner: z.array(ReferenceSchema).optional(),
  managingOrganization: ReferenceSchema.optional(),
  link: z.array(PatientLinkSchema).optional(),
})
export type Patient = z.infer<typeof PatientSchema>

/**
 * Base StructureDefinition for uuid type: A UUID, represented as a URI
 */
export const uuidSchema = uriSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type uuid = z.infer<typeof uuidSchema>

/**
 * General characteristics of this item
 */
export const ManufacturedItemDefinitionPropertySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
})
export type ManufacturedItemDefinitionProperty = z.infer<typeof ManufacturedItemDefinitionPropertySchema>

/**
 * The definition and characteristics of a medicinal manufactured item, such as a tablet or capsule, as contained in a packaged medicinal product.
 */
export const ManufacturedItemDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ManufacturedItemDefinition'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  manufacturedDoseForm: CodeableConceptSchema,
  unitOfPresentation: CodeableConceptSchema.optional(),
  manufacturer: z.array(ReferenceSchema).optional(),
  ingredient: z.array(CodeableConceptSchema).optional(),
  property: z.array(ManufacturedItemDefinitionPropertySchema).optional(),
})
export type ManufacturedItemDefinition = z.infer<typeof ManufacturedItemDefinitionSchema>

/**
 * Base StructureDefinition for code type: A string which has at least one character and no leading or trailing whitespace and where there is no whitespace other than single spaces in the contents
 */
export const codeSchema = stringSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type code = z.infer<typeof codeSchema>

/**
 * Collection details
 * Details concerning the specimen collection.
 */
export const SpecimenCollectionSchema = BackboneElementSchema.extend({
  collector: ReferenceSchema.optional(),
  collectedDateTime: z.string().optional(),
  _collectedDateTime: ElementSchema.optional(),
  collectedPeriod: PeriodSchema.optional(),
  duration: DurationSchema.optional(),
  quantity: QuantitySchema.optional(),
  method: CodeableConceptSchema.optional(),
  bodySite: CodeableConceptSchema.optional(),
  fastingStatusCodeableConcept: CodeableConceptSchema.optional(),
  fastingStatusDuration: DurationSchema.optional(),
})
export type SpecimenCollection = z.infer<typeof SpecimenCollectionSchema>

/**
 * Processing and processing step details
 * Details concerning processing and processing steps for the specimen.
 */
export const SpecimenProcessingSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  procedure: CodeableConceptSchema.optional(),
  additive: z.array(ReferenceSchema).optional(),
  timeDateTime: z.string().optional(),
  _timeDateTime: ElementSchema.optional(),
  timePeriod: PeriodSchema.optional(),
})
export type SpecimenProcessing = z.infer<typeof SpecimenProcessingSchema>

/**
 * Direct container of specimen (tube/slide, etc.)
 * The container holding the specimen.  The recursive nature of containers; i.e. blood in tube in tray in rack is not addressed here.
 */
export const SpecimenContainerSchema = BackboneElementSchema.extend({
  identifier: z.array(IdentifierSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  capacity: QuantitySchema.optional(),
  specimenQuantity: QuantitySchema.optional(),
  additiveCodeableConcept: CodeableConceptSchema.optional(),
  additiveReference: ReferenceSchema.optional(),
})
export type SpecimenContainer = z.infer<typeof SpecimenContainerSchema>

/**
 * A sample to be used for analysis.
 */
export const SpecimenSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Specimen'),
  identifier: z.array(IdentifierSchema).optional(),
  accessionIdentifier: IdentifierSchema.optional(),
  status: z.enum(['available', 'unavailable', 'unsatisfactory', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  subject: ReferenceSchema.optional(),
  receivedTime: z.string().optional(),
  _receivedTime: ElementSchema.optional(),
  parent: z.array(ReferenceSchema).optional(),
  request: z.array(ReferenceSchema).optional(),
  collection: SpecimenCollectionSchema.optional(),
  processing: z.array(SpecimenProcessingSchema).optional(),
  container: z.array(SpecimenContainerSchema).optional(),
  condition: z.array(CodeableConceptSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type Specimen = z.infer<typeof SpecimenSchema>

/**
 * Condition that the related person had
 * The significant Conditions (or condition) that the family member had. This is a repeating section to allow a system to represent more than one condition per resource, though there is nothing stopping multiple resources - one per condition.
 */
export const FamilyMemberHistoryConditionSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  outcome: CodeableConceptSchema.optional(),
  contributedToDeath: z.boolean().optional(),
  _contributedToDeath: ElementSchema.optional(),
  onsetAge: AgeSchema.optional(),
  onsetRange: RangeSchema.optional(),
  onsetPeriod: PeriodSchema.optional(),
  onsetString: z.string().optional(),
  _onsetString: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type FamilyMemberHistoryCondition = z.infer<typeof FamilyMemberHistoryConditionSchema>

/**
 * Significant health conditions for a person related to the patient relevant in the context of care for the patient.
 */
export const FamilyMemberHistorySchema = DomainResourceSchema.extend({
  resourceType: z.literal('FamilyMemberHistory'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  status: z.enum(['partial', 'completed', 'entered-in-error', 'health-unknown']),
  _status: ElementSchema.optional(),
  dataAbsentReason: CodeableConceptSchema.optional(),
  patient: ReferenceSchema,
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  relationship: CodeableConceptSchema,
  sex: CodeableConceptSchema.optional(),
  bornPeriod: PeriodSchema.optional(),
  bornDate: z.string().optional(),
  _bornDate: ElementSchema.optional(),
  bornString: z.string().optional(),
  _bornString: ElementSchema.optional(),
  ageAge: AgeSchema.optional(),
  ageRange: RangeSchema.optional(),
  ageString: z.string().optional(),
  _ageString: ElementSchema.optional(),
  estimatedAge: z.boolean().optional(),
  _estimatedAge: ElementSchema.optional(),
  deceasedBoolean: z.boolean().optional(),
  _deceasedBoolean: ElementSchema.optional(),
  deceasedAge: AgeSchema.optional(),
  deceasedRange: RangeSchema.optional(),
  deceasedDate: z.string().optional(),
  _deceasedDate: ElementSchema.optional(),
  deceasedString: z.string().optional(),
  _deceasedString: ElementSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  condition: z.array(FamilyMemberHistoryConditionSchema).optional(),
})
export type FamilyMemberHistory = z.infer<typeof FamilyMemberHistorySchema>

/**
 * What defines the members of the research element
 * A characteristic that defines the members of the research element. Multiple characteristics are applied with "and" semantics.
 * Characteristics can be defined flexibly to accommodate different use cases for membership criteria, ranging from simple codes, all the way to using an expression language to express the criteria.
 */
export const ResearchElementDefinitionCharacteristicSchema = BackboneElementSchema.extend({
  definitionCodeableConcept: CodeableConceptSchema.optional(),
  definitionCanonical: z.string().optional(),
  _definitionCanonical: ElementSchema.optional(),
  definitionExpression: ExpressionSchema.optional(),
  definitionDataRequirement: DataRequirementSchema.optional(),
  usageContext: z.array(UsageContextSchema).optional(),
  exclude: z.boolean().optional(),
  _exclude: ElementSchema.optional(),
  unitOfMeasure: CodeableConceptSchema.optional(),
  studyEffectiveDescription: z.string().optional(),
  _studyEffectiveDescription: ElementSchema.optional(),
  studyEffectiveDateTime: z.string().optional(),
  _studyEffectiveDateTime: ElementSchema.optional(),
  studyEffectivePeriod: PeriodSchema.optional(),
  studyEffectiveDuration: DurationSchema.optional(),
  studyEffectiveTiming: TimingSchema.optional(),
  studyEffectiveTimeFromStart: DurationSchema.optional(),
  studyEffectiveGroupMeasure: z.enum(['mean', 'median', 'mean-of-mean', 'mean-of-median', 'median-of-mean', 'median-of-median']).optional(),
  _studyEffectiveGroupMeasure: ElementSchema.optional(),
  participantEffectiveDescription: z.string().optional(),
  _participantEffectiveDescription: ElementSchema.optional(),
  participantEffectiveDateTime: z.string().optional(),
  _participantEffectiveDateTime: ElementSchema.optional(),
  participantEffectivePeriod: PeriodSchema.optional(),
  participantEffectiveDuration: DurationSchema.optional(),
  participantEffectiveTiming: TimingSchema.optional(),
  participantEffectiveTimeFromStart: DurationSchema.optional(),
  participantEffectiveGroupMeasure: z.enum(['mean', 'median', 'mean-of-mean', 'mean-of-median', 'median-of-mean', 'median-of-median']).optional(),
  _participantEffectiveGroupMeasure: ElementSchema.optional(),
})
export type ResearchElementDefinitionCharacteristic = z.infer<typeof ResearchElementDefinitionCharacteristicSchema>

/**
 * The ResearchElementDefinition resource describes a "PICO" element that knowledge (evidence, assertion, recommendation) is about.
 */
export const ResearchElementDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ResearchElementDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  shortTitle: z.string().optional(),
  _shortTitle: ElementSchema.optional(),
  subtitle: z.string().optional(),
  _subtitle: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  comment: z.array(z.string()).optional(),
  _comment: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  usage: z.string().optional(),
  _usage: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  topic: z.array(CodeableConceptSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  library: z.array(z.string()).optional(),
  _library: ElementSchema.optional(),
  type: z.enum(['population', 'exposure', 'outcome']),
  _type: ElementSchema.optional(),
  variableType: z.enum(['dichotomous', 'continuous', 'descriptive']).optional(),
  _variableType: ElementSchema.optional(),
  characteristic: z.array(ResearchElementDefinitionCharacteristicSchema),
})
export type ResearchElementDefinition = z.infer<typeof ResearchElementDefinitionSchema>

/**
 * ValueSet details if this is coded
 * Binds to a value set if this parameter is coded (code, Coding, CodeableConcept).
 */
export const OperationDefinitionParameterBindingSchema = BackboneElementSchema.extend({
  strength: z.enum(['required', 'extensible', 'preferred', 'example']),
  _strength: ElementSchema.optional(),
  valueSet: z.string(),
  _valueSet: ElementSchema.optional(),
})
export type OperationDefinitionParameterBinding = z.infer<typeof OperationDefinitionParameterBindingSchema>

/**
 * References to this parameter
 * Identifies other resource parameters within the operation invocation that are expected to resolve to this resource.
 * Resolution applies if the referenced parameter exists.
 */
export const OperationDefinitionParameterReferencedFromSchema = BackboneElementSchema.extend({
  source: z.string(),
  _source: ElementSchema.optional(),
  sourceId: z.string().optional(),
  _sourceId: ElementSchema.optional(),
})
export type OperationDefinitionParameterReferencedFrom = z.infer<typeof OperationDefinitionParameterReferencedFromSchema>

/**
 * Parameters for the operation/query
 * The parameters for the operation/query.
 * Query Definitions only have one output parameter, named "result". This might not be described, but can be to allow a profile to be defined.
 */
export interface OperationDefinitionParameter extends BackboneElement {
  name: string
  _name?: Element | undefined
  use: ('in'|'out')
  _use?: Element | undefined
  min: number
  _min?: Element | undefined
  max: string
  _max?: Element | undefined
  documentation?: string | undefined
  _documentation?: Element | undefined
  type?: ('Address'|'Age'|'Annotation'|'Attachment'|'BackboneElement'|'CodeableConcept'|'CodeableReference'|'Coding'|'ContactDetail'|'ContactPoint'|'Contributor'|'Count'|'DataRequirement'|'Distance'|'Dosage'|'Duration'|'Element'|'ElementDefinition'|'Expression'|'Extension'|'HumanName'|'Identifier'|'MarketingStatus'|'Meta'|'Money'|'MoneyQuantity'|'Narrative'|'ParameterDefinition'|'Period'|'Population'|'ProdCharacteristic'|'ProductShelfLife'|'Quantity'|'Range'|'Ratio'|'RatioRange'|'Reference'|'RelatedArtifact'|'SampledData'|'Signature'|'SimpleQuantity'|'Timing'|'TriggerDefinition'|'UsageContext'|'base64Binary'|'boolean'|'canonical'|'code'|'date'|'dateTime'|'decimal'|'id'|'instant'|'integer'|'markdown'|'oid'|'positiveInt'|'string'|'time'|'unsignedInt'|'uri'|'url'|'uuid'|'xhtml'|'Resource'|'Binary'|'Bundle'|'DomainResource'|'Account'|'ActivityDefinition'|'AdministrableProductDefinition'|'AdverseEvent'|'AllergyIntolerance'|'Appointment'|'AppointmentResponse'|'AuditEvent'|'Basic'|'BiologicallyDerivedProduct'|'BodyStructure'|'CapabilityStatement'|'CarePlan'|'CareTeam'|'CatalogEntry'|'ChargeItem'|'ChargeItemDefinition'|'Citation'|'Claim'|'ClaimResponse'|'ClinicalImpression'|'ClinicalUseDefinition'|'CodeSystem'|'Communication'|'CommunicationRequest'|'CompartmentDefinition'|'Composition'|'ConceptMap'|'Condition'|'Consent'|'Contract'|'Coverage'|'CoverageEligibilityRequest'|'CoverageEligibilityResponse'|'DetectedIssue'|'Device'|'DeviceDefinition'|'DeviceMetric'|'DeviceRequest'|'DeviceUseStatement'|'DiagnosticReport'|'DocumentManifest'|'DocumentReference'|'Encounter'|'Endpoint'|'EnrollmentRequest'|'EnrollmentResponse'|'EpisodeOfCare'|'EventDefinition'|'Evidence'|'EvidenceReport'|'EvidenceVariable'|'ExampleScenario'|'ExplanationOfBenefit'|'FamilyMemberHistory'|'Flag'|'Goal'|'GraphDefinition'|'Group'|'GuidanceResponse'|'HealthcareService'|'ImagingStudy'|'Immunization'|'ImmunizationEvaluation'|'ImmunizationRecommendation'|'ImplementationGuide'|'Ingredient'|'InsurancePlan'|'Invoice'|'Library'|'Linkage'|'List'|'Location'|'ManufacturedItemDefinition'|'Measure'|'MeasureReport'|'Media'|'Medication'|'MedicationAdministration'|'MedicationDispense'|'MedicationKnowledge'|'MedicationRequest'|'MedicationStatement'|'MedicinalProductDefinition'|'MessageDefinition'|'MessageHeader'|'MolecularSequence'|'NamingSystem'|'NutritionOrder'|'NutritionProduct'|'Observation'|'ObservationDefinition'|'OperationDefinition'|'OperationOutcome'|'Organization'|'OrganizationAffiliation'|'PackagedProductDefinition'|'Patient'|'PaymentNotice'|'PaymentReconciliation'|'Person'|'PlanDefinition'|'Practitioner'|'PractitionerRole'|'Procedure'|'Provenance'|'Questionnaire'|'QuestionnaireResponse'|'RegulatedAuthorization'|'RelatedPerson'|'RequestGroup'|'ResearchDefinition'|'ResearchElementDefinition'|'ResearchStudy'|'ResearchSubject'|'RiskAssessment'|'Schedule'|'SearchParameter'|'ServiceRequest'|'Slot'|'Specimen'|'SpecimenDefinition'|'StructureDefinition'|'StructureMap'|'Subscription'|'SubscriptionStatus'|'SubscriptionTopic'|'Substance'|'SubstanceDefinition'|'SupplyDelivery'|'SupplyRequest'|'Task'|'TerminologyCapabilities'|'TestReport'|'TestScript'|'ValueSet'|'VerificationResult'|'VisionPrescription'|'Parameters'|'Type'|'Any') | undefined
  _type?: Element | undefined
  targetProfile?: string[] | undefined
  _targetProfile?: Element | undefined
  searchType?: ('number'|'date'|'string'|'token'|'reference'|'composite'|'quantity'|'uri'|'special') | undefined
  _searchType?: Element | undefined
  binding?: OperationDefinitionParameterBinding | undefined
  referencedFrom?: OperationDefinitionParameterReferencedFrom[] | undefined
  part?: OperationDefinitionParameter[] | undefined
}

export const OperationDefinitionParameterSchema: z.ZodType<OperationDefinitionParameter> = z.lazy(() =>
  BackboneElementSchema.extend({
    name: z.string(),
      _name: ElementSchema.optional(),
    use: z.enum(['in', 'out']),
      _use: ElementSchema.optional(),
    min: z.number(),
      _min: ElementSchema.optional(),
    max: z.string(),
      _max: ElementSchema.optional(),
    documentation: z.string().optional(),
      _documentation: ElementSchema.optional(),
    type: z.enum(['Address', 'Age', 'Annotation', 'Attachment', 'BackboneElement', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'Count', 'DataRequirement', 'Distance', 'Dosage', 'Duration', 'Element', 'ElementDefinition', 'Expression', 'Extension', 'HumanName', 'Identifier', 'MarketingStatus', 'Meta', 'Money', 'MoneyQuantity', 'Narrative', 'ParameterDefinition', 'Period', 'Population', 'ProdCharacteristic', 'ProductShelfLife', 'Quantity', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'SimpleQuantity', 'Timing', 'TriggerDefinition', 'UsageContext', 'base64Binary', 'boolean', 'canonical', 'code', 'date', 'dateTime', 'decimal', 'id', 'instant', 'integer', 'markdown', 'oid', 'positiveInt', 'string', 'time', 'unsignedInt', 'uri', 'url', 'uuid', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters', 'Type', 'Any']).optional(),
      _type: ElementSchema.optional(),
    targetProfile: z.array(z.string()).optional(),
      _targetProfile: ElementSchema.optional(),
    searchType: z.enum(['number', 'date', 'string', 'token', 'reference', 'composite', 'quantity', 'uri', 'special']).optional(),
      _searchType: ElementSchema.optional(),
    binding: OperationDefinitionParameterBindingSchema.optional(),
    referencedFrom: z.array(OperationDefinitionParameterReferencedFromSchema).optional(),
    part: z.lazy(() => z.array(OperationDefinitionParameterSchema)).optional(),
  })
)

/**
 * Define overloaded variants for when  generating code
 * Defines an appropriate combination of parameters to use when invoking this operation, to help code generators when generating overloaded parameter sets for this operation.
 * The combinations are suggestions as to which sets of parameters to use together, but the combinations are not intended to be authoritative.
 */
export const OperationDefinitionOverloadSchema = BackboneElementSchema.extend({
  parameterName: z.array(z.string()).optional(),
  _parameterName: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
})
export type OperationDefinitionOverload = z.infer<typeof OperationDefinitionOverloadSchema>

/**
 * A formal computable definition of an operation (on the RESTful interface) or a named query (using the search interaction).
 */
export const OperationDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('OperationDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  kind: z.enum(['operation', 'query']),
  _kind: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  affectsState: z.boolean().optional(),
  _affectsState: ElementSchema.optional(),
  code: z.string(),
  _code: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  base: z.string().optional(),
  _base: ElementSchema.optional(),
  resource: z.array(z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters'])).optional(),
  _resource: ElementSchema.optional(),
  system: z.boolean(),
  _system: ElementSchema.optional(),
  type: z.boolean(),
  _type: ElementSchema.optional(),
  instance: z.boolean(),
  _instance: ElementSchema.optional(),
  inputProfile: z.string().optional(),
  _inputProfile: ElementSchema.optional(),
  outputProfile: z.string().optional(),
  _outputProfile: ElementSchema.optional(),
  parameter: z.array(OperationDefinitionParameterSchema).optional(),
  overload: z.array(OperationDefinitionOverloadSchema).optional(),
})
export type OperationDefinition = z.infer<typeof OperationDefinitionSchema>

/**
 * Compartment Consistency Rules
 */
export const GraphDefinitionLinkTargetCompartmentSchema = BackboneElementSchema.extend({
  use: z.enum(['condition', 'requirement']),
  _use: ElementSchema.optional(),
  code: z.enum(['Patient', 'Encounter', 'RelatedPerson', 'Practitioner', 'Device']),
  _code: ElementSchema.optional(),
  rule: z.enum(['identical', 'matching', 'different', 'custom']),
  _rule: ElementSchema.optional(),
  expression: z.string().optional(),
  _expression: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type GraphDefinitionLinkTargetCompartment = z.infer<typeof GraphDefinitionLinkTargetCompartmentSchema>

/**
 * Potential target for the link
 */
export const GraphDefinitionLinkTargetSchema = BackboneElementSchema.extend({
  type: z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']),
  _type: ElementSchema.optional(),
  params: z.string().optional(),
  _params: ElementSchema.optional(),
  profile: z.string().optional(),
  _profile: ElementSchema.optional(),
  compartment: z.array(GraphDefinitionLinkTargetCompartmentSchema).optional(),
  link: z.lazy(() => z.array(GraphDefinitionLinkSchema)).optional(),
})
export type GraphDefinitionLinkTarget = z.infer<typeof GraphDefinitionLinkTargetSchema>

/**
 * Links this graph makes rules about
 */
export interface GraphDefinitionLink extends BackboneElement {
  path?: string | undefined
  _path?: Element | undefined
  sliceName?: string | undefined
  _sliceName?: Element | undefined
  min?: number | undefined
  _min?: Element | undefined
  max?: string | undefined
  _max?: Element | undefined
  description?: string | undefined
  _description?: Element | undefined
  target?: GraphDefinitionLinkTarget[] | undefined
}

export const GraphDefinitionLinkSchema: z.ZodType<GraphDefinitionLink> = z.lazy(() =>
  BackboneElementSchema.extend({
    path: z.string().optional(),
      _path: ElementSchema.optional(),
    sliceName: z.string().optional(),
      _sliceName: ElementSchema.optional(),
    min: z.number().optional(),
      _min: ElementSchema.optional(),
    max: z.string().optional(),
      _max: ElementSchema.optional(),
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    target: z.array(GraphDefinitionLinkTargetSchema).optional(),
  })
)

/**
 * A formal computable definition of a graph of resources - that is, a coherent set of resources that form a graph by following references. The Graph Definition resource defines a set and makes rules about the set.
 */
export const GraphDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('GraphDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  start: z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']),
  _start: ElementSchema.optional(),
  profile: z.string().optional(),
  _profile: ElementSchema.optional(),
  link: z.array(GraphDefinitionLinkSchema).optional(),
})
export type GraphDefinition = z.infer<typeof GraphDefinitionSchema>

/**
 * Active or inactive ingredient
 * Identifies a particular constituent of interest in the product.
 * The ingredients need not be a complete list.  If an ingredient is not specified, this does not indicate whether an ingredient is present or absent.  If an ingredient is specified it does not mean that all ingredients are specified.  It is possible to specify both inactive and active ingredients.
 */
export const MedicationIngredientSchema = BackboneElementSchema.extend({
  itemCodeableConcept: CodeableConceptSchema.optional(),
  itemReference: ReferenceSchema.optional(),
  isActive: z.boolean().optional(),
  _isActive: ElementSchema.optional(),
  strength: RatioSchema.optional(),
})
export type MedicationIngredient = z.infer<typeof MedicationIngredientSchema>

/**
 * Details about packaged medications
 * Information that only applies to packages (not products).
 */
export const MedicationBatchSchema = BackboneElementSchema.extend({
  lotNumber: z.string().optional(),
  _lotNumber: ElementSchema.optional(),
  expirationDate: z.string().optional(),
  _expirationDate: ElementSchema.optional(),
})
export type MedicationBatch = z.infer<typeof MedicationBatchSchema>

/**
 * This resource is primarily used for the identification and definition of a medication for the purposes of prescribing, dispensing, and administering a medication as well as for making statements about medication use.
 */
export const MedicationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Medication'),
  identifier: z.array(IdentifierSchema).optional(),
  code: CodeableConceptSchema.optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  manufacturer: ReferenceSchema.optional(),
  form: CodeableConceptSchema.optional(),
  amount: RatioSchema.optional(),
  ingredient: z.array(MedicationIngredientSchema).optional(),
  batch: MedicationBatchSchema.optional(),
})
export type Medication = z.infer<typeof MedicationSchema>

/**
 * Key images associated with this report
 * A list of key images associated with this report. The images are generally created during the diagnostic process, and may be directly of the patient, or of treated specimens (i.e. slides of interest).
 */
export const DiagnosticReportMediaSchema = BackboneElementSchema.extend({
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  link: ReferenceSchema,
})
export type DiagnosticReportMedia = z.infer<typeof DiagnosticReportMediaSchema>

/**
 * The findings and interpretation of diagnostic  tests performed on patients, groups of patients, devices, and locations, and/or specimens derived from these. The report includes clinical context such as requesting and provider information, and some mix of atomic results, images, textual and coded interpretations, and formatted representation of diagnostic reports.
 */
export const DiagnosticReportSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DiagnosticReport'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  status: z.enum(['registered', 'partial', 'preliminary', 'final', 'amended', 'corrected', 'appended', 'cancelled', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema,
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  effectiveDateTime: z.string().optional(),
  _effectiveDateTime: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  issued: z.string().optional(),
  _issued: ElementSchema.optional(),
  performer: z.array(ReferenceSchema).optional(),
  resultsInterpreter: z.array(ReferenceSchema).optional(),
  specimen: z.array(ReferenceSchema).optional(),
  result: z.array(ReferenceSchema).optional(),
  imagingStudy: z.array(ReferenceSchema).optional(),
  media: z.array(DiagnosticReportMediaSchema).optional(),
  conclusion: z.string().optional(),
  _conclusion: ElementSchema.optional(),
  conclusionCode: z.array(CodeableConceptSchema).optional(),
  presentedForm: z.array(AttachmentSchema).optional(),
})
export type DiagnosticReport = z.infer<typeof DiagnosticReportSchema>

/**
 * A reply to an appointment request for a patient and/or practitioner(s), such as a confirmation or rejection.
 */
export const AppointmentResponseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('AppointmentResponse'),
  identifier: z.array(IdentifierSchema).optional(),
  appointment: ReferenceSchema,
  start: z.string().optional(),
  _start: ElementSchema.optional(),
  end: z.string().optional(),
  _end: ElementSchema.optional(),
  participantType: z.array(CodeableConceptSchema).optional(),
  actor: ReferenceSchema.optional(),
  participantStatus: z.enum(['accepted', 'declined', 'tentative', 'needs-action']),
  _participantStatus: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
})
export type AppointmentResponse = z.infer<typeof AppointmentResponseSchema>

/**
 * Whether or not the action is applicable
 * An expression that describes applicability criteria, or start/stop conditions for the action.
 * When multiple conditions of the same kind are present, the effects are combined using AND semantics, so the overall condition is true only if all of the conditions are true.
 */
export const RequestGroupActionConditionSchema = BackboneElementSchema.extend({
  kind: z.enum(['applicability', 'start', 'stop']),
  _kind: ElementSchema.optional(),
  expression: ExpressionSchema.optional(),
})
export type RequestGroupActionCondition = z.infer<typeof RequestGroupActionConditionSchema>

/**
 * Relationship to another action
 * A relationship to another action such as "before" or "30-60 minutes after start of".
 */
export const RequestGroupActionRelatedActionSchema = BackboneElementSchema.extend({
  actionId: z.string(),
  _actionId: ElementSchema.optional(),
  relationship: z.enum(['before-start', 'before', 'before-end', 'concurrent-with-start', 'concurrent', 'concurrent-with-end', 'after-start', 'after', 'after-end']),
  _relationship: ElementSchema.optional(),
  offsetDuration: DurationSchema.optional(),
  offsetRange: RangeSchema.optional(),
})
export type RequestGroupActionRelatedAction = z.infer<typeof RequestGroupActionRelatedActionSchema>

/**
 * Proposed actions, if any
 * The actions, if any, produced by the evaluation of the artifact.
 */
export interface RequestGroupAction extends BackboneElement {
  prefix?: string | undefined
  _prefix?: Element | undefined
  title?: string | undefined
  _title?: Element | undefined
  description?: string | undefined
  _description?: Element | undefined
  textEquivalent?: string | undefined
  _textEquivalent?: Element | undefined
  priority?: ('routine'|'urgent'|'asap'|'stat') | undefined
  _priority?: Element | undefined
  code?: CodeableConcept[] | undefined
  documentation?: RelatedArtifact[] | undefined
  condition?: RequestGroupActionCondition[] | undefined
  relatedAction?: RequestGroupActionRelatedAction[] | undefined
  timingDateTime?: string | undefined
  _timingDateTime?: Element | undefined
  timingAge?: Age | undefined
  timingPeriod?: Period | undefined
  timingDuration?: Duration | undefined
  timingRange?: Range | undefined
  timingTiming?: Timing | undefined
  participant?: Reference[] | undefined
  type?: CodeableConcept | undefined
  groupingBehavior?: ('visual-group'|'logical-group'|'sentence-group') | undefined
  _groupingBehavior?: Element | undefined
  selectionBehavior?: ('any'|'all'|'all-or-none'|'exactly-one'|'at-most-one'|'one-or-more') | undefined
  _selectionBehavior?: Element | undefined
  requiredBehavior?: ('must'|'could'|'must-unless-documented') | undefined
  _requiredBehavior?: Element | undefined
  precheckBehavior?: ('yes'|'no') | undefined
  _precheckBehavior?: Element | undefined
  cardinalityBehavior?: ('single'|'multiple') | undefined
  _cardinalityBehavior?: Element | undefined
  resource?: Reference | undefined
  action?: RequestGroupAction[] | undefined
}

export const RequestGroupActionSchema: z.ZodType<RequestGroupAction> = z.lazy(() =>
  BackboneElementSchema.extend({
    prefix: z.string().optional(),
      _prefix: ElementSchema.optional(),
    title: z.string().optional(),
      _title: ElementSchema.optional(),
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    textEquivalent: z.string().optional(),
      _textEquivalent: ElementSchema.optional(),
    priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
      _priority: ElementSchema.optional(),
    code: z.array(CodeableConceptSchema).optional(),
    documentation: z.array(RelatedArtifactSchema).optional(),
    condition: z.array(RequestGroupActionConditionSchema).optional(),
    relatedAction: z.array(RequestGroupActionRelatedActionSchema).optional(),
    timingDateTime: z.string().optional(),
      _timingDateTime: ElementSchema.optional(),
    timingAge: AgeSchema.optional(),
    timingPeriod: PeriodSchema.optional(),
    timingDuration: DurationSchema.optional(),
    timingRange: RangeSchema.optional(),
    timingTiming: TimingSchema.optional(),
    participant: z.array(ReferenceSchema).optional(),
    type: CodeableConceptSchema.optional(),
    groupingBehavior: z.enum(['visual-group', 'logical-group', 'sentence-group']).optional(),
      _groupingBehavior: ElementSchema.optional(),
    selectionBehavior: z.enum(['any', 'all', 'all-or-none', 'exactly-one', 'at-most-one', 'one-or-more']).optional(),
      _selectionBehavior: ElementSchema.optional(),
    requiredBehavior: z.enum(['must', 'could', 'must-unless-documented']).optional(),
      _requiredBehavior: ElementSchema.optional(),
    precheckBehavior: z.enum(['yes', 'no']).optional(),
      _precheckBehavior: ElementSchema.optional(),
    cardinalityBehavior: z.enum(['single', 'multiple']).optional(),
      _cardinalityBehavior: ElementSchema.optional(),
    resource: ReferenceSchema.optional(),
    action: z.lazy(() => z.array(RequestGroupActionSchema)).optional(),
  })
)

/**
 * A group of related requests that can be used to capture intended activities that have inter-dependencies such as "give this medication after that one".
 */
export const RequestGroupSchema = DomainResourceSchema.extend({
  resourceType: z.literal('RequestGroup'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  replaces: z.array(ReferenceSchema).optional(),
  groupIdentifier: IdentifierSchema.optional(),
  status: z.enum(['draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  author: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  action: z.array(RequestGroupActionSchema).optional(),
})
export type RequestGroup = z.infer<typeof RequestGroupSchema>

/**
 * Message destination application(s)
 * The destination application which the message is intended for.
 * There SHOULD be at least one destination, but in some circumstances, the source system is unaware of any particular destination system.
 */
export const MessageHeaderDestinationSchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  target: ReferenceSchema.optional(),
  endpoint: z.string(),
  _endpoint: ElementSchema.optional(),
  receiver: ReferenceSchema.optional(),
})
export type MessageHeaderDestination = z.infer<typeof MessageHeaderDestinationSchema>

/**
 * Message source application
 * The source application from which this message originated.
 */
export const MessageHeaderSourceSchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  software: z.string().optional(),
  _software: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  contact: ContactPointSchema.optional(),
  endpoint: z.string(),
  _endpoint: ElementSchema.optional(),
})
export type MessageHeaderSource = z.infer<typeof MessageHeaderSourceSchema>

/**
 * If this is a reply to prior message
 * Information about the message that this message is a response to.  Only present if this message is a response.
 */
export const MessageHeaderResponseSchema = BackboneElementSchema.extend({
  identifier: z.string(),
  _identifier: ElementSchema.optional(),
  code: z.enum(['ok', 'transient-error', 'fatal-error']),
  _code: ElementSchema.optional(),
  details: ReferenceSchema.optional(),
})
export type MessageHeaderResponse = z.infer<typeof MessageHeaderResponseSchema>

/**
 * The header for a message exchange that is either requesting or responding to an action.  The reference(s) that are the subject of the action as well as other information related to the action are typically transmitted in a bundle in which the MessageHeader resource instance is the first resource in the bundle.
 */
export const MessageHeaderSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MessageHeader'),
  eventCoding: CodingSchema.optional(),
  eventUri: z.string().optional(),
  _eventUri: ElementSchema.optional(),
  destination: z.array(MessageHeaderDestinationSchema).optional(),
  sender: ReferenceSchema.optional(),
  enterer: ReferenceSchema.optional(),
  author: ReferenceSchema.optional(),
  source: MessageHeaderSourceSchema,
  responsible: ReferenceSchema.optional(),
  reason: CodeableConceptSchema.optional(),
  response: MessageHeaderResponseSchema.optional(),
  focus: z.array(ReferenceSchema).optional(),
  definition: z.string().optional(),
  _definition: ElementSchema.optional(),
})
export type MessageHeader = z.infer<typeof MessageHeaderSchema>

/**
 * Base StructureDefinition for xhtml Type
 */
export const xhtmlSchema = ElementSchema.extend({
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type xhtml = z.infer<typeof xhtmlSchema>

/**
 * Unique Device Identifier (UDI) Barcode string
 * Unique device identifier (UDI) assigned to device label or package.  Note that the Device may include multiple udiCarriers as it either may include just the udiCarrier for the jurisdiction it is sold, or for multiple jurisdictions it could have been sold.
 */
export const DeviceDefinitionUdiDeviceIdentifierSchema = BackboneElementSchema.extend({
  deviceIdentifier: z.string(),
  _deviceIdentifier: ElementSchema.optional(),
  issuer: z.string(),
  _issuer: ElementSchema.optional(),
  jurisdiction: z.string(),
  _jurisdiction: ElementSchema.optional(),
})
export type DeviceDefinitionUdiDeviceIdentifier = z.infer<typeof DeviceDefinitionUdiDeviceIdentifierSchema>

/**
 * A name given to the device to identify it
 */
export const DeviceDefinitionDeviceNameSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  type: z.enum(['udi-label-name', 'user-friendly-name', 'patient-reported-name', 'manufacturer-name', 'model-name', 'other']),
  _type: ElementSchema.optional(),
})
export type DeviceDefinitionDeviceName = z.infer<typeof DeviceDefinitionDeviceNameSchema>

/**
 * The capabilities supported on a  device, the standards to which the device conforms for a particular purpose, and used for the communication
 */
export const DeviceDefinitionSpecializationSchema = BackboneElementSchema.extend({
  systemType: z.string(),
  _systemType: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
})
export type DeviceDefinitionSpecialization = z.infer<typeof DeviceDefinitionSpecializationSchema>

/**
 * Base StructureDefinition for ProductShelfLife Type: The shelf-life and storage information for a medicinal product item or container can be described using this class.
 */
export const ProductShelfLifeSchema = BackboneElementSchema.extend({
  identifier: IdentifierSchema.optional(),
  type: CodeableConceptSchema,
  period: QuantitySchema,
  specialPrecautionsForStorage: z.array(CodeableConceptSchema).optional(),
})
export type ProductShelfLife = z.infer<typeof ProductShelfLifeSchema>

/**
 * Base StructureDefinition for ProdCharacteristic Type: The marketing status describes the date when a medicinal product is actually put on the market or the date as of which it is no longer available.
 */
export const ProdCharacteristicSchema = BackboneElementSchema.extend({
  height: QuantitySchema.optional(),
  width: QuantitySchema.optional(),
  depth: QuantitySchema.optional(),
  weight: QuantitySchema.optional(),
  nominalVolume: QuantitySchema.optional(),
  externalDiameter: QuantitySchema.optional(),
  shape: z.string().optional(),
  _shape: ElementSchema.optional(),
  color: z.array(z.string()).optional(),
  _color: ElementSchema.optional(),
  imprint: z.array(z.string()).optional(),
  _imprint: ElementSchema.optional(),
  image: z.array(AttachmentSchema).optional(),
  scoring: CodeableConceptSchema.optional(),
})
export type ProdCharacteristic = z.infer<typeof ProdCharacteristicSchema>

/**
 * Device capabilities
 */
export const DeviceDefinitionCapabilitySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  description: z.array(CodeableConceptSchema).optional(),
})
export type DeviceDefinitionCapability = z.infer<typeof DeviceDefinitionCapabilitySchema>

/**
 * The actual configuration settings of a device as it actually operates, e.g., regulation status, time properties
 */
export const DeviceDefinitionPropertySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueQuantity: z.array(QuantitySchema).optional(),
  valueCode: z.array(CodeableConceptSchema).optional(),
})
export type DeviceDefinitionProperty = z.infer<typeof DeviceDefinitionPropertySchema>

/**
 * A substance used to create the material(s) of which the device is made
 */
export const DeviceDefinitionMaterialSchema = BackboneElementSchema.extend({
  substance: CodeableConceptSchema,
  alternate: z.boolean().optional(),
  _alternate: ElementSchema.optional(),
  allergenicIndicator: z.boolean().optional(),
  _allergenicIndicator: ElementSchema.optional(),
})
export type DeviceDefinitionMaterial = z.infer<typeof DeviceDefinitionMaterialSchema>

/**
 * The characteristics, operational status and capabilities of a medical-related component of a medical device.
 */
export const DeviceDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceDefinition'),
  identifier: z.array(IdentifierSchema).optional(),
  udiDeviceIdentifier: z.array(DeviceDefinitionUdiDeviceIdentifierSchema).optional(),
  manufacturerString: z.string().optional(),
  _manufacturerString: ElementSchema.optional(),
  manufacturerReference: ReferenceSchema.optional(),
  deviceName: z.array(DeviceDefinitionDeviceNameSchema).optional(),
  modelNumber: z.string().optional(),
  _modelNumber: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  specialization: z.array(DeviceDefinitionSpecializationSchema).optional(),
  version: z.array(z.string()).optional(),
  _version: ElementSchema.optional(),
  safety: z.array(CodeableConceptSchema).optional(),
  shelfLifeStorage: z.array(ProductShelfLifeSchema).optional(),
  physicalCharacteristics: ProdCharacteristicSchema.optional(),
  languageCode: z.array(CodeableConceptSchema).optional(),
  capability: z.array(DeviceDefinitionCapabilitySchema).optional(),
  property: z.array(DeviceDefinitionPropertySchema).optional(),
  owner: ReferenceSchema.optional(),
  contact: z.array(ContactPointSchema).optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  onlineInformation: z.string().optional(),
  _onlineInformation: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  quantity: QuantitySchema.optional(),
  parentDevice: ReferenceSchema.optional(),
  material: z.array(DeviceDefinitionMaterialSchema).optional(),
})
export type DeviceDefinition = z.infer<typeof DeviceDefinitionSchema>

/**
 * Target outcome for the goal
 * Indicates what should be done by when.
 * When multiple targets are present for a single goal instance, all targets must be met for the overall goal to be met.
 */
export const GoalTargetSchema = BackboneElementSchema.extend({
  measure: CodeableConceptSchema.optional(),
  detailQuantity: QuantitySchema.optional(),
  detailRange: RangeSchema.optional(),
  detailCodeableConcept: CodeableConceptSchema.optional(),
  detailString: z.string().optional(),
  _detailString: ElementSchema.optional(),
  detailBoolean: z.boolean().optional(),
  _detailBoolean: ElementSchema.optional(),
  detailInteger: z.number().optional(),
  _detailInteger: ElementSchema.optional(),
  detailRatio: RatioSchema.optional(),
  dueDate: z.string().optional(),
  _dueDate: ElementSchema.optional(),
  dueDuration: DurationSchema.optional(),
})
export type GoalTarget = z.infer<typeof GoalTargetSchema>

/**
 * Describes the intended objective(s) for a patient, group or organization care, for example, weight loss, restoring an activity of daily living, obtaining herd immunity via immunization, meeting a process improvement objective, etc.
 */
export const GoalSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Goal'),
  identifier: z.array(IdentifierSchema).optional(),
  lifecycleStatus: z.enum(['proposed', 'planned', 'accepted', 'active', 'on-hold', 'completed', 'cancelled', 'entered-in-error', 'rejected']),
  _lifecycleStatus: ElementSchema.optional(),
  achievementStatus: CodeableConceptSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  priority: CodeableConceptSchema.optional(),
  description: CodeableConceptSchema,
  subject: ReferenceSchema,
  startDate: z.string().optional(),
  _startDate: ElementSchema.optional(),
  startCodeableConcept: CodeableConceptSchema.optional(),
  target: z.array(GoalTargetSchema).optional(),
  statusDate: z.string().optional(),
  _statusDate: ElementSchema.optional(),
  statusReason: z.string().optional(),
  _statusReason: ElementSchema.optional(),
  expressedBy: ReferenceSchema.optional(),
  addresses: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  outcomeCode: z.array(CodeableConceptSchema).optional(),
  outcomeReference: z.array(ReferenceSchema).optional(),
})
export type Goal = z.infer<typeof GoalSchema>

/**
 * Characteristics of quantitative results
 * Characteristics for quantitative results of this observation.
 */
export const ObservationDefinitionQuantitativeDetailsSchema = BackboneElementSchema.extend({
  customaryUnit: CodeableConceptSchema.optional(),
  unit: CodeableConceptSchema.optional(),
  conversionFactor: z.number().optional(),
  _conversionFactor: ElementSchema.optional(),
  decimalPrecision: z.number().optional(),
  _decimalPrecision: ElementSchema.optional(),
})
export type ObservationDefinitionQuantitativeDetails = z.infer<typeof ObservationDefinitionQuantitativeDetailsSchema>

/**
 * Qualified range for continuous and ordinal observation results
 * Multiple  ranges of results qualified by different contexts for ordinal or continuous observations conforming to this ObservationDefinition.
 */
export const ObservationDefinitionQualifiedIntervalSchema = BackboneElementSchema.extend({
  category: z.enum(['reference', 'critical', 'absolute']).optional(),
  _category: ElementSchema.optional(),
  range: RangeSchema.optional(),
  context: CodeableConceptSchema.optional(),
  appliesTo: z.array(CodeableConceptSchema).optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  _gender: ElementSchema.optional(),
  age: RangeSchema.optional(),
  gestationalAge: RangeSchema.optional(),
  condition: z.string().optional(),
  _condition: ElementSchema.optional(),
})
export type ObservationDefinitionQualifiedInterval = z.infer<typeof ObservationDefinitionQualifiedIntervalSchema>

/**
 * Set of definitional characteristics for a kind of observation or measurement produced or consumed by an orderable health care service.
 */
export const ObservationDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ObservationDefinition'),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema,
  identifier: z.array(IdentifierSchema).optional(),
  permittedDataType: z.array(z.enum(['Quantity', 'CodeableConcept', 'string', 'boolean', 'integer', 'Range', 'Ratio', 'SampledData', 'time', 'dateTime', 'Period'])).optional(),
  _permittedDataType: ElementSchema.optional(),
  multipleResultsAllowed: z.boolean().optional(),
  _multipleResultsAllowed: ElementSchema.optional(),
  method: CodeableConceptSchema.optional(),
  preferredReportName: z.string().optional(),
  _preferredReportName: ElementSchema.optional(),
  quantitativeDetails: ObservationDefinitionQuantitativeDetailsSchema.optional(),
  qualifiedInterval: z.array(ObservationDefinitionQualifiedIntervalSchema).optional(),
  validCodedValueSet: ReferenceSchema.optional(),
  normalCodedValueSet: ReferenceSchema.optional(),
  abnormalCodedValueSet: ReferenceSchema.optional(),
  criticalCodedValueSet: ReferenceSchema.optional(),
})
export type ObservationDefinition = z.infer<typeof ObservationDefinitionSchema>

/**
 * Who performed event
 * Indicates who performed the immunization event.
 */
export const ImmunizationPerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type ImmunizationPerformer = z.infer<typeof ImmunizationPerformerSchema>

/**
 * Educational material presented to patient
 * Educational material presented to the patient (or guardian) at the time of vaccine administration.
 */
export const ImmunizationEducationSchema = BackboneElementSchema.extend({
  documentType: z.string().optional(),
  _documentType: ElementSchema.optional(),
  reference: z.string().optional(),
  _reference: ElementSchema.optional(),
  publicationDate: z.string().optional(),
  _publicationDate: ElementSchema.optional(),
  presentationDate: z.string().optional(),
  _presentationDate: ElementSchema.optional(),
})
export type ImmunizationEducation = z.infer<typeof ImmunizationEducationSchema>

/**
 * Details of a reaction that follows immunization
 * Categorical data indicating that an adverse event is associated in time to an immunization.
 * A reaction may be an indication of an allergy or intolerance and, if this is determined to be the case, it should be recorded as a new AllergyIntolerance resource instance as most systems will not query against past Immunization.reaction elements.
 */
export const ImmunizationReactionSchema = BackboneElementSchema.extend({
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  detail: ReferenceSchema.optional(),
  reported: z.boolean().optional(),
  _reported: ElementSchema.optional(),
})
export type ImmunizationReaction = z.infer<typeof ImmunizationReactionSchema>

/**
 * Protocol followed by the provider
 * The protocol (set of recommendations) being followed by the provider who administered the dose.
 */
export const ImmunizationProtocolAppliedSchema = BackboneElementSchema.extend({
  series: z.string().optional(),
  _series: ElementSchema.optional(),
  authority: ReferenceSchema.optional(),
  targetDisease: z.array(CodeableConceptSchema).optional(),
  doseNumberPositiveInt: z.number().optional(),
  _doseNumberPositiveInt: ElementSchema.optional(),
  doseNumberString: z.string().optional(),
  _doseNumberString: ElementSchema.optional(),
  seriesDosesPositiveInt: z.number().optional(),
  _seriesDosesPositiveInt: ElementSchema.optional(),
  seriesDosesString: z.string().optional(),
  _seriesDosesString: ElementSchema.optional(),
})
export type ImmunizationProtocolApplied = z.infer<typeof ImmunizationProtocolAppliedSchema>

/**
 * Describes the event of a patient being administered a vaccine or a record of an immunization as reported by a patient, a clinician or another party.
 */
export const ImmunizationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Immunization'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['completed', 'entered-in-error', 'not-done']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  vaccineCode: CodeableConceptSchema,
  patient: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrenceString: z.string().optional(),
  _occurrenceString: ElementSchema.optional(),
  recorded: z.string().optional(),
  _recorded: ElementSchema.optional(),
  primarySource: z.boolean().optional(),
  _primarySource: ElementSchema.optional(),
  reportOrigin: CodeableConceptSchema.optional(),
  location: ReferenceSchema.optional(),
  manufacturer: ReferenceSchema.optional(),
  lotNumber: z.string().optional(),
  _lotNumber: ElementSchema.optional(),
  expirationDate: z.string().optional(),
  _expirationDate: ElementSchema.optional(),
  site: CodeableConceptSchema.optional(),
  route: CodeableConceptSchema.optional(),
  doseQuantity: QuantitySchema.optional(),
  performer: z.array(ImmunizationPerformerSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  isSubpotent: z.boolean().optional(),
  _isSubpotent: ElementSchema.optional(),
  subpotentReason: z.array(CodeableConceptSchema).optional(),
  education: z.array(ImmunizationEducationSchema).optional(),
  programEligibility: z.array(CodeableConceptSchema).optional(),
  fundingSource: CodeableConceptSchema.optional(),
  reaction: z.array(ImmunizationReactionSchema).optional(),
  protocolApplied: z.array(ImmunizationProtocolAppliedSchema).optional(),
})
export type Immunization = z.infer<typeof ImmunizationSchema>

/**
 * Additional representations for this concept
 * Additional representations for this concept when used in this value set - other languages, aliases, specialized purposes, used for particular purposes, etc.
 * Concepts have both a ```display``` and an array of ```designation```. The display is equivalent to a special designation with an implied ```designation.use``` of "primary code" and a language equal to the [Resource Language](resource.html#language).
 */
export interface ValueSetComposeIncludeConceptDesignation extends BackboneElement {
  language?: string | undefined
  _language?: Element | undefined
  use?: Coding | undefined
  value: string
  _value?: Element | undefined
}

export const ValueSetComposeIncludeConceptDesignationSchema: z.ZodType<ValueSetComposeIncludeConceptDesignation> = z.lazy(() =>
  BackboneElementSchema.extend({
    language: z.string().optional(),
      _language: ElementSchema.optional(),
    use: CodingSchema.optional(),
    value: z.string(),
      _value: ElementSchema.optional(),
  })
)

/**
 * A concept defined in the system
 * Specifies a concept to be included or excluded.
 * The list of concepts is considered ordered, though the order might not have any particular significance. Typically, the order of an expansion follows that defined in the compose element.
 */
export const ValueSetComposeIncludeConceptSchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  designation: z.array(ValueSetComposeIncludeConceptDesignationSchema).optional(),
})
export type ValueSetComposeIncludeConcept = z.infer<typeof ValueSetComposeIncludeConceptSchema>

/**
 * Select codes/concepts by their properties (including relationships)
 * Select concepts by specify a matching criterion based on the properties (including relationships) defined by the system, or on filters defined by the system. If multiple filters are specified, they SHALL all be true.
 * Selecting codes by specifying filters based on properties is only possible where the underlying code system defines appropriate properties. Note that in some cases, the underlying code system defines the logical concepts but not the literal codes for the concepts. In such cases, the literal definitions may be provided by a third party.
 */
export const ValueSetComposeIncludeFilterSchema = BackboneElementSchema.extend({
  property: z.string(),
  _property: ElementSchema.optional(),
  op: z.enum(['=', 'is-a', 'descendent-of', 'is-not-a', 'regex', 'in', 'not-in', 'generalizes', 'exists']),
  _op: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type ValueSetComposeIncludeFilter = z.infer<typeof ValueSetComposeIncludeFilterSchema>

/**
 * Include one or more codes from a code system or other value set(s)
 * All the conditions in an include must be true. If a system is listed, all the codes from the system are listed. If one or more filters are listed, all of the filters must apply. If one or more value sets are listed, the codes must be in all the value sets. E.g. each include is 'include all the codes that meet all these conditions'.
 */
export interface ValueSetComposeInclude extends BackboneElement {
  system?: string | undefined
  _system?: Element | undefined
  version?: string | undefined
  _version?: Element | undefined
  concept?: ValueSetComposeIncludeConcept[] | undefined
  filter?: ValueSetComposeIncludeFilter[] | undefined
  valueSet?: string[] | undefined
  _valueSet?: Element | undefined
}

export const ValueSetComposeIncludeSchema: z.ZodType<ValueSetComposeInclude> = z.lazy(() =>
  BackboneElementSchema.extend({
    system: z.string().optional(),
      _system: ElementSchema.optional(),
    version: z.string().optional(),
      _version: ElementSchema.optional(),
    concept: z.array(ValueSetComposeIncludeConceptSchema).optional(),
    filter: z.array(ValueSetComposeIncludeFilterSchema).optional(),
    valueSet: z.array(z.string()).optional(),
      _valueSet: ElementSchema.optional(),
  })
)

/**
 * Content logical definition of the value set (CLD)
 * A set of criteria that define the contents of the value set by including or excluding codes selected from the specified code system(s) that the value set draws from. This is also known as the Content Logical Definition (CLD).
 */
export const ValueSetComposeSchema = BackboneElementSchema.extend({
  lockedDate: z.string().optional(),
  _lockedDate: ElementSchema.optional(),
  inactive: z.boolean().optional(),
  _inactive: ElementSchema.optional(),
  include: z.array(ValueSetComposeIncludeSchema),
  exclude: z.lazy(() => z.array(ValueSetComposeIncludeSchema)).optional(),
})
export type ValueSetCompose = z.infer<typeof ValueSetComposeSchema>

/**
 * Parameter that controlled the expansion process
 * A parameter that controlled the expansion process. These parameters may be used by users of expanded value sets to check whether the expansion is suitable for a particular purpose, or to pick the correct expansion.
 * The server decides which parameters to include here, but at a minimum, the list SHOULD include all of the parameters that affect the $expand operation. If the expansion will be persisted all of these parameters SHALL be included. If the codeSystem on the server has a specified version then this version SHALL be provided as a parameter in the expansion (note that not all code systems have a version).
 */
export const ValueSetExpansionParameterSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
  valueUri: z.string().optional(),
  _valueUri: ElementSchema.optional(),
  valueCode: z.string().optional(),
  _valueCode: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
})
export type ValueSetExpansionParameter = z.infer<typeof ValueSetExpansionParameterSchema>

/**
 * Codes in the value set
 * The codes that are contained in the value set expansion.
 */
export interface ValueSetExpansionContains extends BackboneElement {
  system?: string | undefined
  _system?: Element | undefined
  abstract?: boolean | undefined
  _abstract?: Element | undefined
  inactive?: boolean | undefined
  _inactive?: Element | undefined
  version?: string | undefined
  _version?: Element | undefined
  code?: string | undefined
  _code?: Element | undefined
  display?: string | undefined
  _display?: Element | undefined
  designation?: ValueSetComposeIncludeConceptDesignation[] | undefined
  contains?: ValueSetExpansionContains[] | undefined
}

export const ValueSetExpansionContainsSchema: z.ZodType<ValueSetExpansionContains> = z.lazy(() =>
  BackboneElementSchema.extend({
    system: z.string().optional(),
      _system: ElementSchema.optional(),
    abstract: z.boolean().optional(),
      _abstract: ElementSchema.optional(),
    inactive: z.boolean().optional(),
      _inactive: ElementSchema.optional(),
    version: z.string().optional(),
      _version: ElementSchema.optional(),
    code: z.string().optional(),
      _code: ElementSchema.optional(),
    display: z.string().optional(),
      _display: ElementSchema.optional(),
    designation: z.lazy(() => z.array(ValueSetComposeIncludeConceptDesignationSchema)).optional(),
    contains: z.lazy(() => z.array(ValueSetExpansionContainsSchema)).optional(),
  })
)

/**
 * Used when the value set is "expanded"
 * A value set can also be "expanded", where the value set is turned into a simple collection of enumerated codes. This element holds the expansion, if it has been performed.
 * Expansion is performed to produce a collection of codes that are ready to use for data entry or validation. Value set expansions are always considered to be stateless - they are a record of the set of codes in the value set at a point in time under a given set of conditions, and are not subject to ongoing maintenance.
 */
export const ValueSetExpansionSchema = BackboneElementSchema.extend({
  identifier: z.string().optional(),
  _identifier: ElementSchema.optional(),
  timestamp: z.string(),
  _timestamp: ElementSchema.optional(),
  total: z.number().optional(),
  _total: ElementSchema.optional(),
  offset: z.number().optional(),
  _offset: ElementSchema.optional(),
  parameter: z.array(ValueSetExpansionParameterSchema).optional(),
  contains: z.array(ValueSetExpansionContainsSchema).optional(),
})
export type ValueSetExpansion = z.infer<typeof ValueSetExpansionSchema>

/**
 * A ValueSet resource instance specifies a set of codes drawn from one or more code systems, intended for use in a particular context. Value sets link between [[[CodeSystem]]] definitions and their use in [coded elements](terminologies.html).
 */
export const ValueSetSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ValueSet'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  immutable: z.boolean().optional(),
  _immutable: ElementSchema.optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  compose: ValueSetComposeSchema.optional(),
  expansion: ValueSetExpansionSchema.optional(),
})
export type ValueSet = z.infer<typeof ValueSetSchema>

/**
 * Adjudication details
 * If this item is a group then the values here are a summary of the adjudication of the detail items. If this item is a simple product or service then this is the result of the adjudication of this item.
 */
export interface ClaimResponseItemAdjudication extends BackboneElement {
  category: CodeableConcept
  reason?: CodeableConcept | undefined
  amount?: Money | undefined
  value?: number | undefined
  _value?: Element | undefined
}

export const ClaimResponseItemAdjudicationSchema: z.ZodType<ClaimResponseItemAdjudication> = z.lazy(() =>
  BackboneElementSchema.extend({
    category: CodeableConceptSchema,
    reason: CodeableConceptSchema.optional(),
    amount: MoneySchema.optional(),
    value: z.number().optional(),
      _value: ElementSchema.optional(),
  })
)

/**
 * Adjudication for claim sub-details
 * A sub-detail adjudication of a simple product or service.
 */
export const ClaimResponseItemDetailSubDetailSchema = BackboneElementSchema.extend({
  subDetailSequence: z.number(),
  _subDetailSequence: ElementSchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)).optional(),
})
export type ClaimResponseItemDetailSubDetail = z.infer<typeof ClaimResponseItemDetailSubDetailSchema>

/**
 * Adjudication for claim details
 * A claim detail. Either a simple (a product or service) or a 'group' of sub-details which are simple items.
 */
export const ClaimResponseItemDetailSchema = BackboneElementSchema.extend({
  detailSequence: z.number(),
  _detailSequence: ElementSchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)),
  subDetail: z.array(ClaimResponseItemDetailSubDetailSchema).optional(),
})
export type ClaimResponseItemDetail = z.infer<typeof ClaimResponseItemDetailSchema>

/**
 * Adjudication for claim line items
 * A claim line. Either a simple (a product or service) or a 'group' of details which can also be a simple items or groups of sub-details.
 */
export const ClaimResponseItemSchema = BackboneElementSchema.extend({
  itemSequence: z.number(),
  _itemSequence: ElementSchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.array(ClaimResponseItemAdjudicationSchema),
  detail: z.array(ClaimResponseItemDetailSchema).optional(),
})
export type ClaimResponseItem = z.infer<typeof ClaimResponseItemSchema>

/**
 * Insurer added line items
 * The third-tier service adjudications for payor added services.
 */
export const ClaimResponseAddItemDetailSubDetailSchema = BackboneElementSchema.extend({
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)),
})
export type ClaimResponseAddItemDetailSubDetail = z.infer<typeof ClaimResponseAddItemDetailSubDetailSchema>

/**
 * Insurer added line details
 * The second-tier service adjudications for payor added services.
 */
export const ClaimResponseAddItemDetailSchema = BackboneElementSchema.extend({
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)),
  subDetail: z.array(ClaimResponseAddItemDetailSubDetailSchema).optional(),
})
export type ClaimResponseAddItemDetail = z.infer<typeof ClaimResponseAddItemDetailSchema>

/**
 * Insurer added line items
 * The first-tier service adjudications for payor added product or service lines.
 */
export const ClaimResponseAddItemSchema = BackboneElementSchema.extend({
  itemSequence: z.array(z.number()).optional(),
  _itemSequence: ElementSchema.optional(),
  detailSequence: z.array(z.number()).optional(),
  _detailSequence: ElementSchema.optional(),
  subdetailSequence: z.array(z.number()).optional(),
  _subdetailSequence: ElementSchema.optional(),
  provider: z.array(ReferenceSchema).optional(),
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  locationCodeableConcept: CodeableConceptSchema.optional(),
  locationAddress: AddressSchema.optional(),
  locationReference: ReferenceSchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  net: MoneySchema.optional(),
  bodySite: CodeableConceptSchema.optional(),
  subSite: z.array(CodeableConceptSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)),
  detail: z.array(ClaimResponseAddItemDetailSchema).optional(),
})
export type ClaimResponseAddItem = z.infer<typeof ClaimResponseAddItemSchema>

/**
 * Adjudication totals
 * Categorized monetary totals for the adjudication.
 * Totals for amounts submitted, co-pays, benefits payable etc.
 */
export const ClaimResponseTotalSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema,
  amount: MoneySchema,
})
export type ClaimResponseTotal = z.infer<typeof ClaimResponseTotalSchema>

/**
 * Payment Details
 * Payment details for the adjudication of the claim.
 */
export const ClaimResponsePaymentSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  adjustment: MoneySchema.optional(),
  adjustmentReason: CodeableConceptSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  amount: MoneySchema,
  identifier: IdentifierSchema.optional(),
})
export type ClaimResponsePayment = z.infer<typeof ClaimResponsePaymentSchema>

/**
 * Note concerning adjudication
 * A note that describes or explains adjudication results in a human readable form.
 */
export const ClaimResponseProcessNoteSchema = BackboneElementSchema.extend({
  number: z.number().optional(),
  _number: ElementSchema.optional(),
  type: z.enum(['display', 'print', 'printoper']).optional(),
  _type: ElementSchema.optional(),
  text: z.string(),
  _text: ElementSchema.optional(),
  language: CodeableConceptSchema.optional(),
})
export type ClaimResponseProcessNote = z.infer<typeof ClaimResponseProcessNoteSchema>

/**
 * Patient insurance information
 * Financial instruments for reimbursement for the health care products and services specified on the claim.
 * All insurance coverages for the patient which may be applicable for reimbursement, of the products and services listed in the claim, are typically provided in the claim to allow insurers to confirm the ordering of the insurance coverages relative to local 'coordination of benefit' rules. One coverage (and only one) with 'focal=true' is to be used in the adjudication of this claim. Coverages appearing before the focal Coverage in the list, and where 'subrogation=false', should provide a reference to the ClaimResponse containing the adjudication results of the prior claim.
 */
export const ClaimResponseInsuranceSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  focal: z.boolean(),
  _focal: ElementSchema.optional(),
  coverage: ReferenceSchema,
  businessArrangement: z.string().optional(),
  _businessArrangement: ElementSchema.optional(),
  claimResponse: ReferenceSchema.optional(),
})
export type ClaimResponseInsurance = z.infer<typeof ClaimResponseInsuranceSchema>

/**
 * Processing errors
 * Errors encountered during the processing of the adjudication.
 * If the request contains errors then an error element should be provided and no adjudication related sections (item, addItem, or payment) should be present.
 */
export const ClaimResponseErrorSchema = BackboneElementSchema.extend({
  itemSequence: z.number().optional(),
  _itemSequence: ElementSchema.optional(),
  detailSequence: z.number().optional(),
  _detailSequence: ElementSchema.optional(),
  subDetailSequence: z.number().optional(),
  _subDetailSequence: ElementSchema.optional(),
  code: CodeableConceptSchema,
})
export type ClaimResponseError = z.infer<typeof ClaimResponseErrorSchema>

/**
 * This resource provides the adjudication details from the processing of a Claim resource.
 */
export const ClaimResponseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ClaimResponse'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema,
  subType: CodeableConceptSchema.optional(),
  use: z.enum(['claim', 'preauthorization', 'predetermination']),
  _use: ElementSchema.optional(),
  patient: ReferenceSchema,
  created: z.string(),
  _created: ElementSchema.optional(),
  insurer: ReferenceSchema,
  requestor: ReferenceSchema.optional(),
  request: ReferenceSchema.optional(),
  outcome: z.enum(['queued', 'complete', 'error', 'partial']),
  _outcome: ElementSchema.optional(),
  disposition: z.string().optional(),
  _disposition: ElementSchema.optional(),
  preAuthRef: z.string().optional(),
  _preAuthRef: ElementSchema.optional(),
  preAuthPeriod: PeriodSchema.optional(),
  payeeType: CodeableConceptSchema.optional(),
  item: z.array(ClaimResponseItemSchema).optional(),
  addItem: z.array(ClaimResponseAddItemSchema).optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)).optional(),
  total: z.array(ClaimResponseTotalSchema).optional(),
  payment: ClaimResponsePaymentSchema.optional(),
  fundsReserve: CodeableConceptSchema.optional(),
  formCode: CodeableConceptSchema.optional(),
  form: AttachmentSchema.optional(),
  processNote: z.array(ClaimResponseProcessNoteSchema).optional(),
  communicationRequest: z.array(ReferenceSchema).optional(),
  insurance: z.array(ClaimResponseInsuranceSchema).optional(),
  error: z.array(ClaimResponseErrorSchema).optional(),
})
export type ClaimResponse = z.infer<typeof ClaimResponseSchema>

/**
 * Contract precursor content
 * Precusory content developed with a focus and intent of supporting the formation a Contract instance, which may be associated with and transformable into a Contract.
 */
export const ContractContentDefinitionSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  subType: CodeableConceptSchema.optional(),
  publisher: ReferenceSchema.optional(),
  publicationDate: z.string().optional(),
  _publicationDate: ElementSchema.optional(),
  publicationStatus: z.enum(['amended', 'appended', 'cancelled', 'disputed', 'entered-in-error', 'executable', 'executed', 'negotiable', 'offered', 'policy', 'rejected', 'renewed', 'revoked', 'resolved', 'terminated']),
  _publicationStatus: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
})
export type ContractContentDefinition = z.infer<typeof ContractContentDefinitionSchema>

/**
 * Protection for the Term
 * Security labels that protect the handling of information about the term and its elements, which may be specifically identified..
 */
export const ContractTermSecurityLabelSchema = BackboneElementSchema.extend({
  number: z.array(z.number()).optional(),
  _number: ElementSchema.optional(),
  classification: CodingSchema,
  category: z.array(CodingSchema).optional(),
  control: z.array(CodingSchema).optional(),
})
export type ContractTermSecurityLabel = z.infer<typeof ContractTermSecurityLabelSchema>

/**
 * Offer Recipient
 */
export const ContractTermOfferPartySchema = BackboneElementSchema.extend({
  reference: z.array(ReferenceSchema),
  role: CodeableConceptSchema,
})
export type ContractTermOfferParty = z.infer<typeof ContractTermOfferPartySchema>

/**
 * Response to offer text
 */
export interface ContractTermOfferAnswer extends BackboneElement {
  valueBoolean?: boolean | undefined
  _valueBoolean?: Element | undefined
  valueDecimal?: number | undefined
  _valueDecimal?: Element | undefined
  valueInteger?: number | undefined
  _valueInteger?: Element | undefined
  valueDate?: string | undefined
  _valueDate?: Element | undefined
  valueDateTime?: string | undefined
  _valueDateTime?: Element | undefined
  valueTime?: string | undefined
  _valueTime?: Element | undefined
  valueString?: string | undefined
  _valueString?: Element | undefined
  valueUri?: string | undefined
  _valueUri?: Element | undefined
  valueAttachment?: Attachment | undefined
  valueCoding?: Coding | undefined
  valueQuantity?: Quantity | undefined
  valueReference?: Reference | undefined
}

export const ContractTermOfferAnswerSchema: z.ZodType<ContractTermOfferAnswer> = z.lazy(() =>
  BackboneElementSchema.extend({
    valueBoolean: z.boolean().optional(),
      _valueBoolean: ElementSchema.optional(),
    valueDecimal: z.number().optional(),
      _valueDecimal: ElementSchema.optional(),
    valueInteger: z.number().optional(),
      _valueInteger: ElementSchema.optional(),
    valueDate: z.string().optional(),
      _valueDate: ElementSchema.optional(),
    valueDateTime: z.string().optional(),
      _valueDateTime: ElementSchema.optional(),
    valueTime: z.string().optional(),
      _valueTime: ElementSchema.optional(),
    valueString: z.string().optional(),
      _valueString: ElementSchema.optional(),
    valueUri: z.string().optional(),
      _valueUri: ElementSchema.optional(),
    valueAttachment: AttachmentSchema.optional(),
    valueCoding: CodingSchema.optional(),
    valueQuantity: QuantitySchema.optional(),
    valueReference: ReferenceSchema.optional(),
  })
)

/**
 * Context of the Contract term
 * The matter of concern in the context of this provision of the agrement.
 */
export const ContractTermOfferSchema = BackboneElementSchema.extend({
  identifier: z.array(IdentifierSchema).optional(),
  party: z.array(ContractTermOfferPartySchema).optional(),
  topic: ReferenceSchema.optional(),
  type: CodeableConceptSchema.optional(),
  decision: CodeableConceptSchema.optional(),
  decisionMode: z.array(CodeableConceptSchema).optional(),
  answer: z.array(ContractTermOfferAnswerSchema).optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
  linkId: z.array(z.string()).optional(),
  _linkId: ElementSchema.optional(),
  securityLabelNumber: z.array(z.number()).optional(),
  _securityLabelNumber: ElementSchema.optional(),
})
export type ContractTermOffer = z.infer<typeof ContractTermOfferSchema>

/**
 * Circumstance of the asset
 */
export const ContractTermAssetContextSchema = BackboneElementSchema.extend({
  reference: ReferenceSchema.optional(),
  code: z.array(CodeableConceptSchema).optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
})
export type ContractTermAssetContext = z.infer<typeof ContractTermAssetContextSchema>

/**
 * Contract Valued Item List
 */
export const ContractTermAssetValuedItemSchema = BackboneElementSchema.extend({
  entityCodeableConcept: CodeableConceptSchema.optional(),
  entityReference: ReferenceSchema.optional(),
  identifier: IdentifierSchema.optional(),
  effectiveTime: z.string().optional(),
  _effectiveTime: ElementSchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  points: z.number().optional(),
  _points: ElementSchema.optional(),
  net: MoneySchema.optional(),
  payment: z.string().optional(),
  _payment: ElementSchema.optional(),
  paymentDate: z.string().optional(),
  _paymentDate: ElementSchema.optional(),
  responsible: ReferenceSchema.optional(),
  recipient: ReferenceSchema.optional(),
  linkId: z.array(z.string()).optional(),
  _linkId: ElementSchema.optional(),
  securityLabelNumber: z.array(z.number()).optional(),
  _securityLabelNumber: ElementSchema.optional(),
})
export type ContractTermAssetValuedItem = z.infer<typeof ContractTermAssetValuedItemSchema>

/**
 * Contract Term Asset List
 */
export const ContractTermAssetSchema = BackboneElementSchema.extend({
  scope: CodeableConceptSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  typeReference: z.array(ReferenceSchema).optional(),
  subtype: z.array(CodeableConceptSchema).optional(),
  relationship: CodingSchema.optional(),
  context: z.array(ContractTermAssetContextSchema).optional(),
  condition: z.string().optional(),
  _condition: ElementSchema.optional(),
  periodType: z.array(CodeableConceptSchema).optional(),
  period: z.array(PeriodSchema).optional(),
  usePeriod: z.array(PeriodSchema).optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
  linkId: z.array(z.string()).optional(),
  _linkId: ElementSchema.optional(),
  answer: z.lazy(() => z.array(ContractTermOfferAnswerSchema)).optional(),
  securityLabelNumber: z.array(z.number()).optional(),
  _securityLabelNumber: ElementSchema.optional(),
  valuedItem: z.array(ContractTermAssetValuedItemSchema).optional(),
})
export type ContractTermAsset = z.infer<typeof ContractTermAssetSchema>

/**
 * Entity of the action
 */
export const ContractTermActionSubjectSchema = BackboneElementSchema.extend({
  reference: z.array(ReferenceSchema),
  role: CodeableConceptSchema.optional(),
})
export type ContractTermActionSubject = z.infer<typeof ContractTermActionSubjectSchema>

/**
 * Entity being ascribed responsibility
 * An actor taking a role in an activity for which it can be assigned some degree of responsibility for the activity taking place.
 * Several agents may be associated (i.e. has some responsibility for an activity) with an activity and vice-versa.For example, in cases of actions initiated by one user for other users, or in events that involve more than one user, hardware device, software, or system process. However, only one user may be the initiator/requestor for the event.
 */
export const ContractTermActionSchema = BackboneElementSchema.extend({
  doNotPerform: z.boolean().optional(),
  _doNotPerform: ElementSchema.optional(),
  type: CodeableConceptSchema,
  subject: z.array(ContractTermActionSubjectSchema).optional(),
  intent: CodeableConceptSchema,
  linkId: z.array(z.string()).optional(),
  _linkId: ElementSchema.optional(),
  status: CodeableConceptSchema,
  context: ReferenceSchema.optional(),
  contextLinkId: z.array(z.string()).optional(),
  _contextLinkId: ElementSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  occurrenceTiming: TimingSchema.optional(),
  requester: z.array(ReferenceSchema).optional(),
  requesterLinkId: z.array(z.string()).optional(),
  _requesterLinkId: ElementSchema.optional(),
  performerType: z.array(CodeableConceptSchema).optional(),
  performerRole: CodeableConceptSchema.optional(),
  performer: ReferenceSchema.optional(),
  performerLinkId: z.array(z.string()).optional(),
  _performerLinkId: ElementSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  reason: z.array(z.string()).optional(),
  _reason: ElementSchema.optional(),
  reasonLinkId: z.array(z.string()).optional(),
  _reasonLinkId: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  securityLabelNumber: z.array(z.number()).optional(),
  _securityLabelNumber: ElementSchema.optional(),
})
export type ContractTermAction = z.infer<typeof ContractTermActionSchema>

/**
 * Contract Term List
 * One or more Contract Provisions, which may be related and conveyed as a group, and may contain nested groups.
 */
export interface ContractTerm extends BackboneElement {
  identifier?: Identifier | undefined
  issued?: string | undefined
  _issued?: Element | undefined
  applies?: Period | undefined
  topicCodeableConcept?: CodeableConcept | undefined
  topicReference?: Reference | undefined
  type?: CodeableConcept | undefined
  subType?: CodeableConcept | undefined
  text?: string | undefined
  _text?: Element | undefined
  securityLabel?: ContractTermSecurityLabel[] | undefined
  offer: ContractTermOffer
  asset?: ContractTermAsset[] | undefined
  action?: ContractTermAction[] | undefined
  group?: ContractTerm[] | undefined
}

export const ContractTermSchema: z.ZodType<ContractTerm> = z.lazy(() =>
  BackboneElementSchema.extend({
    identifier: IdentifierSchema.optional(),
    issued: z.string().optional(),
      _issued: ElementSchema.optional(),
    applies: PeriodSchema.optional(),
    topicCodeableConcept: CodeableConceptSchema.optional(),
    topicReference: ReferenceSchema.optional(),
    type: CodeableConceptSchema.optional(),
    subType: CodeableConceptSchema.optional(),
    text: z.string().optional(),
      _text: ElementSchema.optional(),
    securityLabel: z.array(ContractTermSecurityLabelSchema).optional(),
    offer: ContractTermOfferSchema,
    asset: z.array(ContractTermAssetSchema).optional(),
    action: z.array(ContractTermActionSchema).optional(),
    group: z.lazy(() => z.array(ContractTermSchema)).optional(),
  })
)

/**
 * Contract Signatory
 * Parties with legal standing in the Contract, including the principal parties, the grantor(s) and grantee(s), which are any person or organization bound by the contract, and any ancillary parties, which facilitate the execution of the contract such as a notary or witness.
 * Signers who are principal parties to the contract are bound by the Contract.activity related to the Contract.topic, and the Contract.term(s), which either extend or restrict the overall action on the topic by, for example, stipulating specific policies or obligations constraining actions, action reason, or agents with respect to some or all of the topic.For example, specifying how policies or obligations shall constrain actions and action reasons permitted or denied on all or a subset of the Contract.topic (e.g., all or a portion of property being transferred by the contract), agents (e.g., who can resell, assign interests, or alter the property being transferred by the contract), actions, and action reasons; or with respect to Contract.terms, stipulating, extending, or limiting the Contract.period of applicability or valuation of items under consideration.
 */
export const ContractSignerSchema = BackboneElementSchema.extend({
  type: CodingSchema,
  party: ReferenceSchema,
  signature: z.array(SignatureSchema),
})
export type ContractSigner = z.infer<typeof ContractSignerSchema>

/**
 * Contract Friendly Language
 * The "patient friendly language" versionof the Contract in whole or in parts. "Patient friendly language" means the representation of the Contract and Contract Provisions in a manner that is readily accessible and understandable by a layperson in accordance with best practices for communication styles that ensure that those agreeing to or signing the Contract understand the roles, actions, obligations, responsibilities, and implication of the agreement.
 */
export const ContractFriendlySchema = BackboneElementSchema.extend({
  contentAttachment: AttachmentSchema.optional(),
  contentReference: ReferenceSchema.optional(),
})
export type ContractFriendly = z.infer<typeof ContractFriendlySchema>

/**
 * Contract Legal Language
 * List of Legal expressions or representations of this Contract.
 */
export const ContractLegalSchema = BackboneElementSchema.extend({
  contentAttachment: AttachmentSchema.optional(),
  contentReference: ReferenceSchema.optional(),
})
export type ContractLegal = z.infer<typeof ContractLegalSchema>

/**
 * Computable Contract Language
 * List of Computable Policy Rule Language Representations of this Contract.
 */
export const ContractRuleSchema = BackboneElementSchema.extend({
  contentAttachment: AttachmentSchema.optional(),
  contentReference: ReferenceSchema.optional(),
})
export type ContractRule = z.infer<typeof ContractRuleSchema>

/**
 * Legally enforceable, formally recorded unilateral or bilateral directive i.e., a policy or agreement.
 */
export const ContractSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Contract'),
  identifier: z.array(IdentifierSchema).optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  status: z.enum(['amended', 'appended', 'cancelled', 'disputed', 'entered-in-error', 'executable', 'executed', 'negotiable', 'offered', 'policy', 'rejected', 'renewed', 'revoked', 'resolved', 'terminated']).optional(),
  _status: ElementSchema.optional(),
  legalState: CodeableConceptSchema.optional(),
  instantiatesCanonical: ReferenceSchema.optional(),
  instantiatesUri: z.string().optional(),
  _instantiatesUri: ElementSchema.optional(),
  contentDerivative: CodeableConceptSchema.optional(),
  issued: z.string().optional(),
  _issued: ElementSchema.optional(),
  applies: PeriodSchema.optional(),
  expirationType: CodeableConceptSchema.optional(),
  subject: z.array(ReferenceSchema).optional(),
  authority: z.array(ReferenceSchema).optional(),
  domain: z.array(ReferenceSchema).optional(),
  site: z.array(ReferenceSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  subtitle: z.string().optional(),
  _subtitle: ElementSchema.optional(),
  alias: z.array(z.string()).optional(),
  _alias: ElementSchema.optional(),
  author: ReferenceSchema.optional(),
  scope: CodeableConceptSchema.optional(),
  topicCodeableConcept: CodeableConceptSchema.optional(),
  topicReference: ReferenceSchema.optional(),
  type: CodeableConceptSchema.optional(),
  subType: z.array(CodeableConceptSchema).optional(),
  contentDefinition: ContractContentDefinitionSchema.optional(),
  term: z.array(ContractTermSchema).optional(),
  supportingInfo: z.array(ReferenceSchema).optional(),
  relevantHistory: z.array(ReferenceSchema).optional(),
  signer: z.array(ContractSignerSchema).optional(),
  friendly: z.array(ContractFriendlySchema).optional(),
  legal: z.array(ContractLegalSchema).optional(),
  rule: z.array(ContractRuleSchema).optional(),
  legallyBindingAttachment: AttachmentSchema.optional(),
  legallyBindingReference: ReferenceSchema.optional(),
})
export type Contract = z.infer<typeof ContractSchema>

/**
 * How this product was collected
 */
export const BiologicallyDerivedProductCollectionSchema = BackboneElementSchema.extend({
  collector: ReferenceSchema.optional(),
  source: ReferenceSchema.optional(),
  collectedDateTime: z.string().optional(),
  _collectedDateTime: ElementSchema.optional(),
  collectedPeriod: PeriodSchema.optional(),
})
export type BiologicallyDerivedProductCollection = z.infer<typeof BiologicallyDerivedProductCollectionSchema>

/**
 * Any processing of the product during collection
 * Any processing of the product during collection that does not change the fundamental nature of the product. For example adding anti-coagulants during the collection of Peripheral Blood Stem Cells.
 */
export const BiologicallyDerivedProductProcessingSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  procedure: CodeableConceptSchema.optional(),
  additive: ReferenceSchema.optional(),
  timeDateTime: z.string().optional(),
  _timeDateTime: ElementSchema.optional(),
  timePeriod: PeriodSchema.optional(),
})
export type BiologicallyDerivedProductProcessing = z.infer<typeof BiologicallyDerivedProductProcessingSchema>

/**
 * Any manipulation of product post-collection
 * Any manipulation of product post-collection that is intended to alter the product.  For example a buffy-coat enrichment or CD8 reduction of Peripheral Blood Stem Cells to make it more suitable for infusion.
 */
export const BiologicallyDerivedProductManipulationSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  timeDateTime: z.string().optional(),
  _timeDateTime: ElementSchema.optional(),
  timePeriod: PeriodSchema.optional(),
})
export type BiologicallyDerivedProductManipulation = z.infer<typeof BiologicallyDerivedProductManipulationSchema>

/**
 * Product storage
 */
export const BiologicallyDerivedProductStorageSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  temperature: z.number().optional(),
  _temperature: ElementSchema.optional(),
  scale: z.enum(['farenheit', 'celsius', 'kelvin']).optional(),
  _scale: ElementSchema.optional(),
  duration: PeriodSchema.optional(),
})
export type BiologicallyDerivedProductStorage = z.infer<typeof BiologicallyDerivedProductStorageSchema>

/**
 * A material substance originating from a biological entity intended to be transplanted or infused
 * into another (possibly the same) biological entity.
 */
export const BiologicallyDerivedProductSchema = DomainResourceSchema.extend({
  resourceType: z.literal('BiologicallyDerivedProduct'),
  identifier: z.array(IdentifierSchema).optional(),
  productCategory: z.enum(['organ', 'tissue', 'fluid', 'cells', 'biologicalAgent']).optional(),
  _productCategory: ElementSchema.optional(),
  productCode: CodeableConceptSchema.optional(),
  status: z.enum(['available', 'unavailable']).optional(),
  _status: ElementSchema.optional(),
  request: z.array(ReferenceSchema).optional(),
  quantity: z.number().optional(),
  _quantity: ElementSchema.optional(),
  parent: z.array(ReferenceSchema).optional(),
  collection: BiologicallyDerivedProductCollectionSchema.optional(),
  processing: z.array(BiologicallyDerivedProductProcessingSchema).optional(),
  manipulation: BiologicallyDerivedProductManipulationSchema.optional(),
  storage: z.array(BiologicallyDerivedProductStorageSchema).optional(),
})
export type BiologicallyDerivedProduct = z.infer<typeof BiologicallyDerivedProductSchema>

/**
 * Base StructureDefinition for date Type: A date or partial date (e.g. just year or year + month). There is no time zone. The format is a union of the schema types gYear, gYearMonth and date.  Dates SHALL be valid dates.
 */
export const dateSchema = ElementSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type date = z.infer<typeof dateSchema>

/**
 * Software that is covered by this terminology capability statement
 * Software that is covered by this terminology capability statement.  It is used when the statement describes the capabilities of a particular software version, independent of an installation.
 */
export const TerminologyCapabilitiesSoftwareSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
})
export type TerminologyCapabilitiesSoftware = z.infer<typeof TerminologyCapabilitiesSoftwareSchema>

/**
 * If this describes a specific instance
 * Identifies a specific implementation instance that is described by the terminology capability statement - i.e. a particular installation, rather than the capabilities of a software program.
 */
export const TerminologyCapabilitiesImplementationSchema = BackboneElementSchema.extend({
  description: z.string(),
  _description: ElementSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
})
export type TerminologyCapabilitiesImplementation = z.infer<typeof TerminologyCapabilitiesImplementationSchema>

/**
 * Filter Properties supported
 */
export const TerminologyCapabilitiesCodeSystemVersionFilterSchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  op: z.array(z.string()),
  _op: ElementSchema.optional(),
})
export type TerminologyCapabilitiesCodeSystemVersionFilter = z.infer<typeof TerminologyCapabilitiesCodeSystemVersionFilterSchema>

/**
 * Version of Code System supported
 * For the code system, a list of versions that are supported by the server.
 * Language translations might not be available for all codes.
 */
export const TerminologyCapabilitiesCodeSystemVersionSchema = BackboneElementSchema.extend({
  code: z.string().optional(),
  _code: ElementSchema.optional(),
  isDefault: z.boolean().optional(),
  _isDefault: ElementSchema.optional(),
  compositional: z.boolean().optional(),
  _compositional: ElementSchema.optional(),
  language: z.array(z.string()).optional(),
  _language: ElementSchema.optional(),
  filter: z.array(TerminologyCapabilitiesCodeSystemVersionFilterSchema).optional(),
  property: z.array(z.string()).optional(),
  _property: ElementSchema.optional(),
})
export type TerminologyCapabilitiesCodeSystemVersion = z.infer<typeof TerminologyCapabilitiesCodeSystemVersionSchema>

/**
 * A code system supported by the server
 * Identifies a code system that is supported by the server. If there is a no code system URL, then this declares the general assumptions a client can make about support for any CodeSystem resource.
 * The code system - identified by its system URL - may also be declared explicitly as a Code System Resource at /CodeSystem, but it might not be.
 */
export const TerminologyCapabilitiesCodeSystemSchema = BackboneElementSchema.extend({
  uri: z.string().optional(),
  _uri: ElementSchema.optional(),
  version: z.array(TerminologyCapabilitiesCodeSystemVersionSchema).optional(),
  subsumption: z.boolean().optional(),
  _subsumption: ElementSchema.optional(),
})
export type TerminologyCapabilitiesCodeSystem = z.infer<typeof TerminologyCapabilitiesCodeSystemSchema>

/**
 * Supported expansion parameter
 */
export const TerminologyCapabilitiesExpansionParameterSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
})
export type TerminologyCapabilitiesExpansionParameter = z.infer<typeof TerminologyCapabilitiesExpansionParameterSchema>

/**
 * Information about the [ValueSet/$expand](valueset-operation-expand.html) operation
 */
export const TerminologyCapabilitiesExpansionSchema = BackboneElementSchema.extend({
  hierarchical: z.boolean().optional(),
  _hierarchical: ElementSchema.optional(),
  paging: z.boolean().optional(),
  _paging: ElementSchema.optional(),
  incomplete: z.boolean().optional(),
  _incomplete: ElementSchema.optional(),
  parameter: z.array(TerminologyCapabilitiesExpansionParameterSchema).optional(),
  textFilter: z.string().optional(),
  _textFilter: ElementSchema.optional(),
})
export type TerminologyCapabilitiesExpansion = z.infer<typeof TerminologyCapabilitiesExpansionSchema>

/**
 * Information about the [ValueSet/$validate-code](valueset-operation-validate-code.html) operation
 */
export const TerminologyCapabilitiesValidateCodeSchema = BackboneElementSchema.extend({
  translations: z.boolean(),
  _translations: ElementSchema.optional(),
})
export type TerminologyCapabilitiesValidateCode = z.infer<typeof TerminologyCapabilitiesValidateCodeSchema>

/**
 * Information about the [ConceptMap/$translate](conceptmap-operation-translate.html) operation
 */
export const TerminologyCapabilitiesTranslationSchema = BackboneElementSchema.extend({
  needsMap: z.boolean(),
  _needsMap: ElementSchema.optional(),
})
export type TerminologyCapabilitiesTranslation = z.infer<typeof TerminologyCapabilitiesTranslationSchema>

/**
 * Information about the [ConceptMap/$closure](conceptmap-operation-closure.html) operation
 * Whether the $closure operation is supported.
 */
export const TerminologyCapabilitiesClosureSchema = BackboneElementSchema.extend({
  translation: z.boolean().optional(),
  _translation: ElementSchema.optional(),
})
export type TerminologyCapabilitiesClosure = z.infer<typeof TerminologyCapabilitiesClosureSchema>

/**
 * A TerminologyCapabilities resource documents a set of capabilities (behaviors) of a FHIR Terminology Server that may be used as a statement of actual server functionality or a statement of required or desired server implementation.
 */
export const TerminologyCapabilitiesSchema = DomainResourceSchema.extend({
  resourceType: z.literal('TerminologyCapabilities'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  kind: z.enum(['instance', 'capability', 'requirements']),
  _kind: ElementSchema.optional(),
  software: TerminologyCapabilitiesSoftwareSchema.optional(),
  implementation: TerminologyCapabilitiesImplementationSchema.optional(),
  lockedDate: z.boolean().optional(),
  _lockedDate: ElementSchema.optional(),
  codeSystem: z.array(TerminologyCapabilitiesCodeSystemSchema).optional(),
  expansion: TerminologyCapabilitiesExpansionSchema.optional(),
  codeSearch: z.enum(['explicit', 'all']).optional(),
  _codeSearch: ElementSchema.optional(),
  validateCode: TerminologyCapabilitiesValidateCodeSchema.optional(),
  translation: TerminologyCapabilitiesTranslationSchema.optional(),
  closure: TerminologyCapabilitiesClosureSchema.optional(),
})
export type TerminologyCapabilities = z.infer<typeof TerminologyCapabilitiesSchema>

/**
 * Information about use of the product in relation to other therapies described as part of the contraindication
 * Information about the use of the medicinal product in relation to other therapies described as part of the contraindication.
 */
export interface ClinicalUseDefinitionContraindicationOtherTherapy extends BackboneElement {
  relationshipType: CodeableConcept
  therapy: CodeableReference
}

export const ClinicalUseDefinitionContraindicationOtherTherapySchema: z.ZodType<ClinicalUseDefinitionContraindicationOtherTherapy> = z.lazy(() =>
  BackboneElementSchema.extend({
    relationshipType: CodeableConceptSchema,
    therapy: CodeableReferenceSchema,
  })
)

/**
 * Specifics for when this is a contraindication
 */
export const ClinicalUseDefinitionContraindicationSchema = BackboneElementSchema.extend({
  diseaseSymptomProcedure: CodeableReferenceSchema.optional(),
  diseaseStatus: CodeableReferenceSchema.optional(),
  comorbidity: z.array(CodeableReferenceSchema).optional(),
  indication: z.array(ReferenceSchema).optional(),
  otherTherapy: z.array(ClinicalUseDefinitionContraindicationOtherTherapySchema).optional(),
})
export type ClinicalUseDefinitionContraindication = z.infer<typeof ClinicalUseDefinitionContraindicationSchema>

/**
 * Specifics for when this is an indication
 */
export const ClinicalUseDefinitionIndicationSchema = BackboneElementSchema.extend({
  diseaseSymptomProcedure: CodeableReferenceSchema.optional(),
  diseaseStatus: CodeableReferenceSchema.optional(),
  comorbidity: z.array(CodeableReferenceSchema).optional(),
  intendedEffect: CodeableReferenceSchema.optional(),
  durationRange: RangeSchema.optional(),
  durationString: z.string().optional(),
  _durationString: ElementSchema.optional(),
  undesirableEffect: z.array(ReferenceSchema).optional(),
  otherTherapy: z.lazy(() => z.array(ClinicalUseDefinitionContraindicationOtherTherapySchema)).optional(),
})
export type ClinicalUseDefinitionIndication = z.infer<typeof ClinicalUseDefinitionIndicationSchema>

/**
 * The specific medication, food, substance or laboratory test that interacts
 */
export const ClinicalUseDefinitionInteractionInteractantSchema = BackboneElementSchema.extend({
  itemReference: ReferenceSchema.optional(),
  itemCodeableConcept: CodeableConceptSchema.optional(),
})
export type ClinicalUseDefinitionInteractionInteractant = z.infer<typeof ClinicalUseDefinitionInteractionInteractantSchema>

/**
 * Specifics for when this is an interaction
 */
export const ClinicalUseDefinitionInteractionSchema = BackboneElementSchema.extend({
  interactant: z.array(ClinicalUseDefinitionInteractionInteractantSchema).optional(),
  type: CodeableConceptSchema.optional(),
  effect: CodeableReferenceSchema.optional(),
  incidence: CodeableConceptSchema.optional(),
  management: z.array(CodeableConceptSchema).optional(),
})
export type ClinicalUseDefinitionInteraction = z.infer<typeof ClinicalUseDefinitionInteractionSchema>

/**
 * A possible negative outcome from the use of this treatment
 * Describe the possible undesirable effects (negative outcomes) from the use of the medicinal product as treatment.
 */
export const ClinicalUseDefinitionUndesirableEffectSchema = BackboneElementSchema.extend({
  symptomConditionEffect: CodeableReferenceSchema.optional(),
  classification: CodeableConceptSchema.optional(),
  frequencyOfOccurrence: CodeableConceptSchema.optional(),
})
export type ClinicalUseDefinitionUndesirableEffect = z.infer<typeof ClinicalUseDefinitionUndesirableEffectSchema>

/**
 * Critical environmental, health or physical risks or hazards. For example 'Do not operate heavy machinery', 'May cause drowsiness'
 * A critical piece of information about environmental, health or physical risks or hazards that serve as caution to the user. For example 'Do not operate heavy machinery', 'May cause drowsiness', or 'Get medical advice/attention if you feel unwell'.
 */
export const ClinicalUseDefinitionWarningSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
})
export type ClinicalUseDefinitionWarning = z.infer<typeof ClinicalUseDefinitionWarningSchema>

/**
 * A single issue - either an indication, contraindication, interaction or an undesirable effect for a medicinal product, medication, device or procedure.
 */
export const ClinicalUseDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ClinicalUseDefinition'),
  identifier: z.array(IdentifierSchema).optional(),
  type: z.enum(['indication', 'contraindication', 'interaction', 'undesirable-effect', 'warning']),
  _type: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  subject: z.array(ReferenceSchema).optional(),
  status: CodeableConceptSchema.optional(),
  contraindication: ClinicalUseDefinitionContraindicationSchema.optional(),
  indication: ClinicalUseDefinitionIndicationSchema.optional(),
  interaction: ClinicalUseDefinitionInteractionSchema.optional(),
  population: z.array(ReferenceSchema).optional(),
  undesirableEffect: ClinicalUseDefinitionUndesirableEffectSchema.optional(),
  warning: ClinicalUseDefinitionWarningSchema.optional(),
})
export type ClinicalUseDefinition = z.infer<typeof ClinicalUseDefinitionSchema>

/**
 * Additive associated with container
 * Substance introduced in the kind of container to preserve, maintain or enhance the specimen. Examples: Formalin, Citrate, EDTA.
 */
export const SpecimenDefinitionTypeTestedContainerAdditiveSchema = BackboneElementSchema.extend({
  additiveCodeableConcept: CodeableConceptSchema.optional(),
  additiveReference: ReferenceSchema.optional(),
})
export type SpecimenDefinitionTypeTestedContainerAdditive = z.infer<typeof SpecimenDefinitionTypeTestedContainerAdditiveSchema>

/**
 * The specimen's container
 */
export const SpecimenDefinitionTypeTestedContainerSchema = BackboneElementSchema.extend({
  material: CodeableConceptSchema.optional(),
  type: CodeableConceptSchema.optional(),
  cap: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  capacity: QuantitySchema.optional(),
  minimumVolumeQuantity: QuantitySchema.optional(),
  minimumVolumeString: z.string().optional(),
  _minimumVolumeString: ElementSchema.optional(),
  additive: z.array(SpecimenDefinitionTypeTestedContainerAdditiveSchema).optional(),
  preparation: z.string().optional(),
  _preparation: ElementSchema.optional(),
})
export type SpecimenDefinitionTypeTestedContainer = z.infer<typeof SpecimenDefinitionTypeTestedContainerSchema>

/**
 * Specimen handling before testing
 * Set of instructions for preservation/transport of the specimen at a defined temperature interval, prior the testing process.
 */
export const SpecimenDefinitionTypeTestedHandlingSchema = BackboneElementSchema.extend({
  temperatureQualifier: CodeableConceptSchema.optional(),
  temperatureRange: RangeSchema.optional(),
  maxDuration: DurationSchema.optional(),
  instruction: z.string().optional(),
  _instruction: ElementSchema.optional(),
})
export type SpecimenDefinitionTypeTestedHandling = z.infer<typeof SpecimenDefinitionTypeTestedHandlingSchema>

/**
 * Specimen in container intended for testing by lab
 * Specimen conditioned in a container as expected by the testing laboratory.
 */
export const SpecimenDefinitionTypeTestedSchema = BackboneElementSchema.extend({
  isDerived: z.boolean().optional(),
  _isDerived: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  preference: z.enum(['preferred', 'alternate']),
  _preference: ElementSchema.optional(),
  container: SpecimenDefinitionTypeTestedContainerSchema.optional(),
  requirement: z.string().optional(),
  _requirement: ElementSchema.optional(),
  retentionTime: DurationSchema.optional(),
  rejectionCriterion: z.array(CodeableConceptSchema).optional(),
  handling: z.array(SpecimenDefinitionTypeTestedHandlingSchema).optional(),
})
export type SpecimenDefinitionTypeTested = z.infer<typeof SpecimenDefinitionTypeTestedSchema>

/**
 * A kind of specimen with associated set of requirements.
 */
export const SpecimenDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SpecimenDefinition'),
  identifier: IdentifierSchema.optional(),
  typeCollected: CodeableConceptSchema.optional(),
  patientPreparation: z.array(CodeableConceptSchema).optional(),
  timeAspect: z.string().optional(),
  _timeAspect: ElementSchema.optional(),
  collection: z.array(CodeableConceptSchema).optional(),
  typeTested: z.array(SpecimenDefinitionTypeTestedSchema).optional(),
})
export type SpecimenDefinition = z.infer<typeof SpecimenDefinitionSchema>

/**
 * Other elements required for this mapping (from context)
 * A set of additional dependencies for this mapping to hold. This mapping is only applicable if the specified element can be resolved, and it has the specified value.
 */
export interface ConceptMapGroupElementTargetDependsOn extends BackboneElement {
  property: string
  _property?: Element | undefined
  system?: string | undefined
  _system?: Element | undefined
  value: string
  _value?: Element | undefined
  display?: string | undefined
  _display?: Element | undefined
}

export const ConceptMapGroupElementTargetDependsOnSchema: z.ZodType<ConceptMapGroupElementTargetDependsOn> = z.lazy(() =>
  BackboneElementSchema.extend({
    property: z.string(),
      _property: ElementSchema.optional(),
    system: z.string().optional(),
      _system: ElementSchema.optional(),
    value: z.string(),
      _value: ElementSchema.optional(),
    display: z.string().optional(),
      _display: ElementSchema.optional(),
  })
)

/**
 * Concept in target system for element
 * A concept from the target value set that this concept maps to.
 * Ideally there would only be one map, with equal or equivalent mapping. But multiple maps are allowed for several narrower options, or to assert that other concepts are unmatched.
 */
export const ConceptMapGroupElementTargetSchema = BackboneElementSchema.extend({
  code: z.string().optional(),
  _code: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  equivalence: z.enum(['relatedto', 'equivalent', 'equal', 'wider', 'subsumes', 'narrower', 'specializes', 'inexact', 'unmatched', 'disjoint']),
  _equivalence: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  dependsOn: z.array(ConceptMapGroupElementTargetDependsOnSchema).optional(),
  product: z.lazy(() => z.array(ConceptMapGroupElementTargetDependsOnSchema)).optional(),
})
export type ConceptMapGroupElementTarget = z.infer<typeof ConceptMapGroupElementTargetSchema>

/**
 * Mappings for a concept from the source set
 * Mappings for an individual concept in the source to one or more concepts in the target.
 * Generally, the ideal is that there would only be one mapping for each concept in the source value set, but a given concept may be mapped multiple times with different comments or dependencies.
 */
export const ConceptMapGroupElementSchema = BackboneElementSchema.extend({
  code: z.string().optional(),
  _code: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  target: z.array(ConceptMapGroupElementTargetSchema).optional(),
})
export type ConceptMapGroupElement = z.infer<typeof ConceptMapGroupElementSchema>

/**
 * What to do when there is no mapping for the source concept
 * What to do when there is no mapping for the source concept. "Unmapped" does not include codes that are unmatched, and the unmapped element is ignored in a code is specified to have equivalence = unmatched.
 * This only applies if the source code has a system value that matches the system defined for the group.
 */
export const ConceptMapGroupUnmappedSchema = BackboneElementSchema.extend({
  mode: z.enum(['provided', 'fixed', 'other-map']),
  _mode: ElementSchema.optional(),
  code: z.string().optional(),
  _code: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
})
export type ConceptMapGroupUnmapped = z.infer<typeof ConceptMapGroupUnmappedSchema>

/**
 * Same source and target systems
 * A group of mappings that all have the same source and target system.
 */
export const ConceptMapGroupSchema = BackboneElementSchema.extend({
  source: z.string().optional(),
  _source: ElementSchema.optional(),
  sourceVersion: z.string().optional(),
  _sourceVersion: ElementSchema.optional(),
  target: z.string().optional(),
  _target: ElementSchema.optional(),
  targetVersion: z.string().optional(),
  _targetVersion: ElementSchema.optional(),
  element: z.array(ConceptMapGroupElementSchema),
  unmapped: ConceptMapGroupUnmappedSchema.optional(),
})
export type ConceptMapGroup = z.infer<typeof ConceptMapGroupSchema>

/**
 * A statement of relationships from one set of concepts to one or more other concepts - either concepts in code systems, or data element/data element concepts, or classes in class models.
 */
export const ConceptMapSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ConceptMap'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: IdentifierSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  sourceUri: z.string().optional(),
  _sourceUri: ElementSchema.optional(),
  sourceCanonical: z.string().optional(),
  _sourceCanonical: ElementSchema.optional(),
  targetUri: z.string().optional(),
  _targetUri: ElementSchema.optional(),
  targetCanonical: z.string().optional(),
  _targetCanonical: ElementSchema.optional(),
  group: z.array(ConceptMapGroupSchema).optional(),
})
export type ConceptMap = z.infer<typeof ConceptMapSchema>

/**
 * Participant in creation of this Invoice
 * Indicates who or what performed or participated in the charged service.
 */
export const InvoiceParticipantSchema = BackboneElementSchema.extend({
  role: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type InvoiceParticipant = z.infer<typeof InvoiceParticipantSchema>

/**
 * Components of total line item price
 * The price for a ChargeItem may be calculated as a base price with surcharges/deductions that apply in certain conditions. A ChargeItemDefinition resource that defines the prices, factors and conditions that apply to a billing code is currently under development. The priceComponent element can be used to offer transparency to the recipient of the Invoice as to how the prices have been calculated.
 */
export interface InvoiceLineItemPriceComponent extends BackboneElement {
  type: ('base'|'surcharge'|'deduction'|'discount'|'tax'|'informational')
  _type?: Element | undefined
  code?: CodeableConcept | undefined
  factor?: number | undefined
  _factor?: Element | undefined
  amount?: Money | undefined
}

export const InvoiceLineItemPriceComponentSchema: z.ZodType<InvoiceLineItemPriceComponent> = z.lazy(() =>
  BackboneElementSchema.extend({
    type: z.enum(['base', 'surcharge', 'deduction', 'discount', 'tax', 'informational']),
      _type: ElementSchema.optional(),
    code: CodeableConceptSchema.optional(),
    factor: z.number().optional(),
      _factor: ElementSchema.optional(),
    amount: MoneySchema.optional(),
  })
)

/**
 * Line items of this Invoice
 * Each line item represents one charge for goods and services rendered. Details such as date, code and amount are found in the referenced ChargeItem resource.
 */
export const InvoiceLineItemSchema = BackboneElementSchema.extend({
  sequence: z.number().optional(),
  _sequence: ElementSchema.optional(),
  chargeItemReference: ReferenceSchema.optional(),
  chargeItemCodeableConcept: CodeableConceptSchema.optional(),
  priceComponent: z.array(InvoiceLineItemPriceComponentSchema).optional(),
})
export type InvoiceLineItem = z.infer<typeof InvoiceLineItemSchema>

/**
 * Invoice containing collected ChargeItems from an Account with calculated individual and total price for Billing purpose.
 */
export const InvoiceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Invoice'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'issued', 'balanced', 'cancelled', 'entered-in-error']),
  _status: ElementSchema.optional(),
  cancelledReason: z.string().optional(),
  _cancelledReason: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  subject: ReferenceSchema.optional(),
  recipient: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  participant: z.array(InvoiceParticipantSchema).optional(),
  issuer: ReferenceSchema.optional(),
  account: ReferenceSchema.optional(),
  lineItem: z.array(InvoiceLineItemSchema).optional(),
  totalPriceComponent: z.lazy(() => z.array(InvoiceLineItemPriceComponentSchema)).optional(),
  totalNet: MoneySchema.optional(),
  totalGross: MoneySchema.optional(),
  paymentTerms: z.string().optional(),
  _paymentTerms: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type Invoice = z.infer<typeof InvoiceSchema>

/**
 * Base StructureDefinition for url type: A URI that is a literal reference
 */
export const urlSchema = uriSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type url = z.infer<typeof urlSchema>

/**
 * External specification that the content is mapped to
 * An external specification that the content is mapped to.
 */
export const StructureDefinitionMappingSchema = BackboneElementSchema.extend({
  identity: z.string(),
  _identity: ElementSchema.optional(),
  uri: z.string().optional(),
  _uri: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
})
export type StructureDefinitionMapping = z.infer<typeof StructureDefinitionMappingSchema>

/**
 * If an extension, where it can be used in instances
 * Identifies the types of resource or data type elements to which the extension can be applied.
 */
export const StructureDefinitionContextSchema = BackboneElementSchema.extend({
  type: z.enum(['fhirpath', 'element', 'extension']),
  _type: ElementSchema.optional(),
  expression: z.string(),
  _expression: ElementSchema.optional(),
})
export type StructureDefinitionContext = z.infer<typeof StructureDefinitionContextSchema>

/**
 * Snapshot view of the structure
 * A snapshot view is expressed in a standalone form that can be used and interpreted without considering the base StructureDefinition.
 */
export const StructureDefinitionSnapshotSchema = BackboneElementSchema.extend({
  element: z.array(ElementDefinitionSchema),
})
export type StructureDefinitionSnapshot = z.infer<typeof StructureDefinitionSnapshotSchema>

/**
 * Differential view of the structure
 * A differential view is expressed relative to the base StructureDefinition - a statement of differences that it applies.
 */
export const StructureDefinitionDifferentialSchema = BackboneElementSchema.extend({
  element: z.array(ElementDefinitionSchema),
})
export type StructureDefinitionDifferential = z.infer<typeof StructureDefinitionDifferentialSchema>

/**
 * A definition of a FHIR structure. This resource is used to describe the underlying resources, data types defined in FHIR, and also for describing extensions and constraints on resources and data types.
 */
export const StructureDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('StructureDefinition'),
  url: z.string(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  keyword: z.array(CodingSchema).optional(),
  fhirVersion: z.enum(['0.01', '0.05', '0.06', '0.11', '0.0.80', '0.0.81', '0.0.82', '0.4.0', '0.5.0', '1.0.0', '1.0.1', '1.0.2', '1.1.0', '1.4.0', '1.6.0', '1.8.0', '3.0.0', '3.0.1', '3.0.2', '3.3.0', '3.5.0', '4.0.0', '4.0.1', '4.1.0', '4.3.0-cibuild', '4.3.0-snapshot1', '4.3.0']).optional(),
  _fhirVersion: ElementSchema.optional(),
  mapping: z.array(StructureDefinitionMappingSchema).optional(),
  kind: z.enum(['primitive-type', 'complex-type', 'resource', 'logical']),
  _kind: ElementSchema.optional(),
  abstract: z.boolean(),
  _abstract: ElementSchema.optional(),
  context: z.array(StructureDefinitionContextSchema).optional(),
  contextInvariant: z.array(z.string()).optional(),
  _contextInvariant: ElementSchema.optional(),
  type: z.string(),
  _type: ElementSchema.optional(),
  baseDefinition: z.string().optional(),
  _baseDefinition: ElementSchema.optional(),
  derivation: z.enum(['specialization', 'constraint']).optional(),
  _derivation: ElementSchema.optional(),
  snapshot: StructureDefinitionSnapshotSchema.optional(),
  differential: StructureDefinitionDifferentialSchema.optional(),
})
export type StructureDefinition = z.infer<typeof StructureDefinitionSchema>

/**
 * Message payload
 * Text, attachment(s), or resource(s) to be communicated to the recipient.
 */
export const CommunicationRequestPayloadSchema = BackboneElementSchema.extend({
  contentString: z.string().optional(),
  _contentString: ElementSchema.optional(),
  contentAttachment: AttachmentSchema.optional(),
  contentReference: ReferenceSchema.optional(),
})
export type CommunicationRequestPayload = z.infer<typeof CommunicationRequestPayloadSchema>

/**
 * A request to convey information; e.g. the CDS system proposes that an alert be sent to a responsible provider, the CDS system proposes that the public health agency be notified about a reportable condition.
 */
export const CommunicationRequestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('CommunicationRequest'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  replaces: z.array(ReferenceSchema).optional(),
  groupIdentifier: IdentifierSchema.optional(),
  status: z.enum(['draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  doNotPerform: z.boolean().optional(),
  _doNotPerform: ElementSchema.optional(),
  medium: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema.optional(),
  about: z.array(ReferenceSchema).optional(),
  encounter: ReferenceSchema.optional(),
  payload: z.array(CommunicationRequestPayloadSchema).optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  requester: ReferenceSchema.optional(),
  recipient: z.array(ReferenceSchema).optional(),
  sender: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type CommunicationRequest = z.infer<typeof CommunicationRequestSchema>

/**
 * This resource provides the status of the payment for goods and services rendered, and the request and response resource references.
 */
export const PaymentNoticeSchema = DomainResourceSchema.extend({
  resourceType: z.literal('PaymentNotice'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  request: ReferenceSchema.optional(),
  response: ReferenceSchema.optional(),
  created: z.string(),
  _created: ElementSchema.optional(),
  provider: ReferenceSchema.optional(),
  payment: ReferenceSchema,
  paymentDate: z.string().optional(),
  _paymentDate: ElementSchema.optional(),
  payee: ReferenceSchema.optional(),
  recipient: ReferenceSchema,
  amount: MoneySchema,
  paymentStatus: CodeableConceptSchema.optional(),
})
export type PaymentNotice = z.infer<typeof PaymentNoticeSchema>

/**
 * A guidance response is the formal response to a guidance request, including any output parameters returned by the evaluation, as well as the description of any proposed actions to be taken.
 */
export const GuidanceResponseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('GuidanceResponse'),
  requestIdentifier: IdentifierSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  moduleUri: z.string().optional(),
  _moduleUri: ElementSchema.optional(),
  moduleCanonical: z.string().optional(),
  _moduleCanonical: ElementSchema.optional(),
  moduleCodeableConcept: CodeableConceptSchema.optional(),
  status: z.enum(['success', 'data-requested', 'data-required', 'in-progress', 'failure', 'entered-in-error']),
  _status: ElementSchema.optional(),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  performer: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  evaluationMessage: z.array(ReferenceSchema).optional(),
  outputParameters: ReferenceSchema.optional(),
  result: ReferenceSchema.optional(),
  dataRequirement: z.array(DataRequirementSchema).optional(),
})
export type GuidanceResponse = z.infer<typeof GuidanceResponseSchema>

/**
 * Supporting evidence
 * Supporting evidence or manifestations that provide the basis for identifying the detected issue such as a GuidanceResponse or MeasureReport.
 */
export const DetectedIssueEvidenceSchema = BackboneElementSchema.extend({
  code: z.array(CodeableConceptSchema).optional(),
  detail: z.array(ReferenceSchema).optional(),
})
export type DetectedIssueEvidence = z.infer<typeof DetectedIssueEvidenceSchema>

/**
 * Step taken to address
 * Indicates an action that has been taken or is committed to reduce or eliminate the likelihood of the risk identified by the detected issue from manifesting.  Can also reflect an observation of known mitigating factors that may reduce/eliminate the need for any action.
 */
export const DetectedIssueMitigationSchema = BackboneElementSchema.extend({
  action: CodeableConceptSchema,
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  author: ReferenceSchema.optional(),
})
export type DetectedIssueMitigation = z.infer<typeof DetectedIssueMitigationSchema>

/**
 * Indicates an actual or potential clinical issue with or between one or more active or proposed clinical actions for a patient; e.g. Drug-drug interaction, Ineffective treatment frequency, Procedure-condition conflict, etc.
 */
export const DetectedIssueSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DetectedIssue'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  severity: z.enum(['high', 'moderate', 'low']).optional(),
  _severity: ElementSchema.optional(),
  patient: ReferenceSchema.optional(),
  identifiedDateTime: z.string().optional(),
  _identifiedDateTime: ElementSchema.optional(),
  identifiedPeriod: PeriodSchema.optional(),
  author: ReferenceSchema.optional(),
  implicated: z.array(ReferenceSchema).optional(),
  evidence: z.array(DetectedIssueEvidenceSchema).optional(),
  detail: z.string().optional(),
  _detail: ElementSchema.optional(),
  reference: z.string().optional(),
  _reference: ElementSchema.optional(),
  mitigation: z.array(DetectedIssueMitigationSchema).optional(),
})
export type DetectedIssue = z.infer<typeof DetectedIssueSchema>

/**
 * The ResearchDefinition resource describes the conditional state (population and any exposures being compared within the population) and outcome (if specified) that the knowledge (evidence, assertion, recommendation) is about.
 */
export const ResearchDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ResearchDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  shortTitle: z.string().optional(),
  _shortTitle: ElementSchema.optional(),
  subtitle: z.string().optional(),
  _subtitle: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  comment: z.array(z.string()).optional(),
  _comment: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  usage: z.string().optional(),
  _usage: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  topic: z.array(CodeableConceptSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  library: z.array(z.string()).optional(),
  _library: ElementSchema.optional(),
  population: ReferenceSchema,
  exposure: ReferenceSchema.optional(),
  exposureAlternative: ReferenceSchema.optional(),
  outcome: ReferenceSchema.optional(),
})
export type ResearchDefinition = z.infer<typeof ResearchDefinitionSchema>

/**
 * Observation time from study start
 * Indicates duration, period, or point of observation from the participant's study entry.
 */
export const EvidenceVariableCharacteristicTimeFromStartSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  quantity: QuantitySchema.optional(),
  range: RangeSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type EvidenceVariableCharacteristicTimeFromStart = z.infer<typeof EvidenceVariableCharacteristicTimeFromStartSchema>

/**
 * What defines the members of the evidence element
 * A characteristic that defines the members of the evidence element. Multiple characteristics are applied with "and" semantics.
 * Characteristics can be defined flexibly to accommodate different use cases for membership criteria, ranging from simple codes, all the way to using an expression language to express the criteria.
 */
export const EvidenceVariableCharacteristicSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  definitionReference: ReferenceSchema.optional(),
  definitionCanonical: z.string().optional(),
  _definitionCanonical: ElementSchema.optional(),
  definitionCodeableConcept: CodeableConceptSchema.optional(),
  definitionExpression: ExpressionSchema.optional(),
  method: CodeableConceptSchema.optional(),
  device: ReferenceSchema.optional(),
  exclude: z.boolean().optional(),
  _exclude: ElementSchema.optional(),
  timeFromStart: EvidenceVariableCharacteristicTimeFromStartSchema.optional(),
  groupMeasure: z.enum(['mean', 'median', 'mean-of-mean', 'mean-of-median', 'median-of-mean', 'median-of-median']).optional(),
  _groupMeasure: ElementSchema.optional(),
})
export type EvidenceVariableCharacteristic = z.infer<typeof EvidenceVariableCharacteristicSchema>

/**
 * A grouping for ordinal or polychotomous variables
 * A grouping (or set of values) described along with other groupings to specify the set of groupings allowed for the variable.
 */
export const EvidenceVariableCategorySchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
})
export type EvidenceVariableCategory = z.infer<typeof EvidenceVariableCategorySchema>

/**
 * The EvidenceVariable resource describes an element that knowledge (Evidence) is about.
 */
export const EvidenceVariableSchema = DomainResourceSchema.extend({
  resourceType: z.literal('EvidenceVariable'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  shortTitle: z.string().optional(),
  _shortTitle: ElementSchema.optional(),
  subtitle: z.string().optional(),
  _subtitle: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  useContext: z.array(UsageContextSchema).optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  actual: z.boolean().optional(),
  _actual: ElementSchema.optional(),
  characteristicCombination: z.enum(['intersection', 'union']).optional(),
  _characteristicCombination: ElementSchema.optional(),
  characteristic: z.array(EvidenceVariableCharacteristicSchema).optional(),
  handling: z.enum(['continuous', 'dichotomous', 'ordinal', 'polychotomous']).optional(),
  _handling: ElementSchema.optional(),
  category: z.array(EvidenceVariableCategorySchema).optional(),
})
export type EvidenceVariable = z.infer<typeof EvidenceVariableSchema>

/**
 * Base StructureDefinition for instant Type: An instant in time - known at least to the second
 */
export const instantSchema = ElementSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type instant = z.infer<typeof instantSchema>

/**
 * Links related to this Bundle
 * A series of links that provide context to this bundle.
 * Both Bundle.link and Bundle.entry.link are defined to support providing additional context when Bundles are used (e.g. [HATEOAS](http://en.wikipedia.org/wiki/HATEOAS)). 
 */
export interface BundleLink extends BackboneElement {
  relation: string
  _relation?: Element | undefined
  url: string
  _url?: Element | undefined
}

export const BundleLinkSchema: z.ZodType<BundleLink> = z.lazy(() =>
  BackboneElementSchema.extend({
    relation: z.string(),
      _relation: ElementSchema.optional(),
    url: z.string(),
      _url: ElementSchema.optional(),
  })
)

/**
 * Search related information
 * Information about the search process that lead to the creation of this entry.
 */
export const BundleEntrySearchSchema = BackboneElementSchema.extend({
  mode: z.enum(['match', 'include', 'outcome']).optional(),
  _mode: ElementSchema.optional(),
  score: z.number().optional(),
  _score: ElementSchema.optional(),
})
export type BundleEntrySearch = z.infer<typeof BundleEntrySearchSchema>

/**
 * Additional execution information (transaction/batch/history)
 * Additional information about how this entry should be processed as part of a transaction or batch.  For history, it shows how the entry was processed to create the version contained in the entry.
 */
export const BundleEntryRequestSchema = BackboneElementSchema.extend({
  method: z.enum(['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH']),
  _method: ElementSchema.optional(),
  url: z.string(),
  _url: ElementSchema.optional(),
  ifNoneMatch: z.string().optional(),
  _ifNoneMatch: ElementSchema.optional(),
  ifModifiedSince: z.string().optional(),
  _ifModifiedSince: ElementSchema.optional(),
  ifMatch: z.string().optional(),
  _ifMatch: ElementSchema.optional(),
  ifNoneExist: z.string().optional(),
  _ifNoneExist: ElementSchema.optional(),
})
export type BundleEntryRequest = z.infer<typeof BundleEntryRequestSchema>

/**
 * Results of execution (transaction/batch/history)
 * Indicates the results of processing the corresponding 'request' entry in the batch or transaction being responded to or what the results of an operation where when returning history.
 */
export const BundleEntryResponseSchema = BackboneElementSchema.extend({
  status: z.string(),
  _status: ElementSchema.optional(),
  location: z.string().optional(),
  _location: ElementSchema.optional(),
  etag: z.string().optional(),
  _etag: ElementSchema.optional(),
  lastModified: z.string().optional(),
  _lastModified: ElementSchema.optional(),
  outcome: ResourceSchema.optional(),
})
export type BundleEntryResponse = z.infer<typeof BundleEntryResponseSchema>

/**
 * Entry in the bundle - will have a resource or information
 * An entry in a bundle resource - will either contain a resource or information about a resource (transactions and history only).
 */
export const BundleEntrySchema = BackboneElementSchema.extend({
  link: z.lazy(() => z.array(BundleLinkSchema)).optional(),
  fullUrl: z.string().optional(),
  _fullUrl: ElementSchema.optional(),
  resource: ResourceSchema.optional(),
  search: BundleEntrySearchSchema.optional(),
  request: BundleEntryRequestSchema.optional(),
  response: BundleEntryResponseSchema.optional(),
})
export type BundleEntry = z.infer<typeof BundleEntrySchema>

/**
 * A container for a collection of resources.
 */
export const BundleSchema = ResourceSchema.extend({
  resourceType: z.literal('Bundle'),
  identifier: IdentifierSchema.optional(),
  type: z.enum(['document', 'message', 'transaction', 'transaction-response', 'batch', 'batch-response', 'history', 'searchset', 'collection']),
  _type: ElementSchema.optional(),
  timestamp: z.string().optional(),
  _timestamp: ElementSchema.optional(),
  total: z.number().optional(),
  _total: ElementSchema.optional(),
  link: z.array(BundleLinkSchema).optional(),
  entry: z.array(BundleEntrySchema).optional(),
  signature: SignatureSchema.optional(),
})
export type Bundle = z.infer<typeof BundleSchema>

/**
 * Resource(s) that are the subject of the event
 * Identifies the resource (or resources) that are being addressed by the event.  For example, the Encounter for an admit message or two Account records for a merge.
 */
export const MessageDefinitionFocusSchema = BackboneElementSchema.extend({
  code: z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']),
  _code: ElementSchema.optional(),
  profile: z.string().optional(),
  _profile: ElementSchema.optional(),
  min: z.number(),
  _min: ElementSchema.optional(),
  max: z.string().optional(),
  _max: ElementSchema.optional(),
})
export type MessageDefinitionFocus = z.infer<typeof MessageDefinitionFocusSchema>

/**
 * Responses to this message
 * Indicates what types of messages may be sent as an application-level response to this message.
 * This indicates an application level response to "close" a transaction implicit in a particular request message.  To define a complete workflow scenario, look to the [[PlanDefinition]] resource which allows the definition of complex orchestrations, conditionality, etc.
 */
export const MessageDefinitionAllowedResponseSchema = BackboneElementSchema.extend({
  message: z.string(),
  _message: ElementSchema.optional(),
  situation: z.string().optional(),
  _situation: ElementSchema.optional(),
})
export type MessageDefinitionAllowedResponse = z.infer<typeof MessageDefinitionAllowedResponseSchema>

/**
 * Defines the characteristics of a message that can be shared between systems, including the type of event that initiates the message, the content to be transmitted and what response(s), if any, are permitted.
 */
export const MessageDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MessageDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  replaces: z.array(z.string()).optional(),
  _replaces: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  base: z.string().optional(),
  _base: ElementSchema.optional(),
  parent: z.array(z.string()).optional(),
  _parent: ElementSchema.optional(),
  eventCoding: CodingSchema.optional(),
  eventUri: z.string().optional(),
  _eventUri: ElementSchema.optional(),
  category: z.enum(['consequence', 'currency', 'notification']).optional(),
  _category: ElementSchema.optional(),
  focus: z.array(MessageDefinitionFocusSchema).optional(),
  responseRequired: z.enum(['always', 'on-error', 'never', 'on-success']).optional(),
  _responseRequired: ElementSchema.optional(),
  allowedResponse: z.array(MessageDefinitionAllowedResponseSchema).optional(),
  graph: z.array(z.string()).optional(),
  _graph: ElementSchema.optional(),
})
export type MessageDefinition = z.infer<typeof MessageDefinitionSchema>

/**
 * Another Implementation guide this depends on
 * Another implementation guide that this implementation depends on. Typically, an implementation guide uses value sets, profiles etc.defined in other implementation guides.
 */
export const ImplementationGuideDependsOnSchema = BackboneElementSchema.extend({
  uri: z.string(),
  _uri: ElementSchema.optional(),
  packageId: z.string().optional(),
  _packageId: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
})
export type ImplementationGuideDependsOn = z.infer<typeof ImplementationGuideDependsOnSchema>

/**
 * Profiles that apply globally
 * A set of profiles that all resources covered by this implementation guide must conform to.
 * See [Default Profiles](implementationguide.html#default) for a discussion of which resources are 'covered' by an implementation guide.
 */
export const ImplementationGuideGlobalSchema = BackboneElementSchema.extend({
  type: z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']),
  _type: ElementSchema.optional(),
  profile: z.string(),
  _profile: ElementSchema.optional(),
})
export type ImplementationGuideGlobal = z.infer<typeof ImplementationGuideGlobalSchema>

/**
 * Grouping used to present related resources in the IG
 * A logical group of resources. Logical groups can be used when building pages.
 * Groupings are arbitrary sub-divisions of content. Typically, they are used to help build Table of Contents automatically.
 */
export const ImplementationGuideDefinitionGroupingSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type ImplementationGuideDefinitionGrouping = z.infer<typeof ImplementationGuideDefinitionGroupingSchema>

/**
 * Resource in the implementation guide
 * A resource that is part of the implementation guide. Conformance resources (value set, structure definition, capability statements etc.) are obvious candidates for inclusion, but any kind of resource can be included as an example resource.
 */
export const ImplementationGuideDefinitionResourceSchema = BackboneElementSchema.extend({
  reference: ReferenceSchema,
  fhirVersion: z.array(z.enum(['0.01', '0.05', '0.06', '0.11', '0.0.80', '0.0.81', '0.0.82', '0.4.0', '0.5.0', '1.0.0', '1.0.1', '1.0.2', '1.1.0', '1.4.0', '1.6.0', '1.8.0', '3.0.0', '3.0.1', '3.0.2', '3.3.0', '3.5.0', '4.0.0', '4.0.1', '4.1.0', '4.3.0-cibuild', '4.3.0-snapshot1', '4.3.0'])).optional(),
  _fhirVersion: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  exampleBoolean: z.boolean().optional(),
  _exampleBoolean: ElementSchema.optional(),
  exampleCanonical: z.string().optional(),
  _exampleCanonical: ElementSchema.optional(),
  groupingId: z.string().optional(),
  _groupingId: ElementSchema.optional(),
})
export type ImplementationGuideDefinitionResource = z.infer<typeof ImplementationGuideDefinitionResourceSchema>

/**
 * Page/Section in the Guide
 * A page / section in the implementation guide. The root page is the implementation guide home page.
 * Pages automatically become sections if they have sub-pages. By convention, the home page is called index.html.
 */
export interface ImplementationGuideDefinitionPage extends BackboneElement {
  nameUrl?: string | undefined
  _nameUrl?: Element | undefined
  nameReference?: Reference | undefined
  title: string
  _title?: Element | undefined
  generation: ('html'|'markdown'|'xml'|'generated')
  _generation?: Element | undefined
  page?: ImplementationGuideDefinitionPage[] | undefined
}

export const ImplementationGuideDefinitionPageSchema: z.ZodType<ImplementationGuideDefinitionPage> = z.lazy(() =>
  BackboneElementSchema.extend({
    nameUrl: z.string().optional(),
      _nameUrl: ElementSchema.optional(),
    nameReference: ReferenceSchema.optional(),
    title: z.string(),
      _title: ElementSchema.optional(),
    generation: z.enum(['html', 'markdown', 'xml', 'generated']),
      _generation: ElementSchema.optional(),
    page: z.lazy(() => z.array(ImplementationGuideDefinitionPageSchema)).optional(),
  })
)

/**
 * Defines how IG is built by tools
 */
export const ImplementationGuideDefinitionParameterSchema = BackboneElementSchema.extend({
  code: z.enum(['apply', 'path-resource', 'path-pages', 'path-tx-cache', 'expansion-parameter', 'rule-broken-links', 'generate-xml', 'generate-json', 'generate-turtle', 'html-template']),
  _code: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type ImplementationGuideDefinitionParameter = z.infer<typeof ImplementationGuideDefinitionParameterSchema>

/**
 * A template for building resources
 */
export const ImplementationGuideDefinitionTemplateSchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  source: z.string(),
  _source: ElementSchema.optional(),
  scope: z.string().optional(),
  _scope: ElementSchema.optional(),
})
export type ImplementationGuideDefinitionTemplate = z.infer<typeof ImplementationGuideDefinitionTemplateSchema>

/**
 * Information needed to build the IG
 * The information needed by an IG publisher tool to publish the whole implementation guide.
 * Principally, this consists of information abuot source resource and file locations, and build parameters and templates.
 */
export const ImplementationGuideDefinitionSchema = BackboneElementSchema.extend({
  grouping: z.array(ImplementationGuideDefinitionGroupingSchema).optional(),
  resource: z.array(ImplementationGuideDefinitionResourceSchema),
  page: ImplementationGuideDefinitionPageSchema.optional(),
  parameter: z.array(ImplementationGuideDefinitionParameterSchema).optional(),
  template: z.array(ImplementationGuideDefinitionTemplateSchema).optional(),
})
export type ImplementationGuideDefinition = z.infer<typeof ImplementationGuideDefinitionSchema>

/**
 * Resource in the implementation guide
 * A resource that is part of the implementation guide. Conformance resources (value set, structure definition, capability statements etc.) are obvious candidates for inclusion, but any kind of resource can be included as an example resource.
 */
export const ImplementationGuideManifestResourceSchema = BackboneElementSchema.extend({
  reference: ReferenceSchema,
  exampleBoolean: z.boolean().optional(),
  _exampleBoolean: ElementSchema.optional(),
  exampleCanonical: z.string().optional(),
  _exampleCanonical: ElementSchema.optional(),
  relativePath: z.string().optional(),
  _relativePath: ElementSchema.optional(),
})
export type ImplementationGuideManifestResource = z.infer<typeof ImplementationGuideManifestResourceSchema>

/**
 * HTML page within the parent IG
 * Information about a page within the IG.
 */
export const ImplementationGuideManifestPageSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  anchor: z.array(z.string()).optional(),
  _anchor: ElementSchema.optional(),
})
export type ImplementationGuideManifestPage = z.infer<typeof ImplementationGuideManifestPageSchema>

/**
 * Information about an assembled IG
 * Information about an assembled implementation guide, created by the publication tooling.
 */
export const ImplementationGuideManifestSchema = BackboneElementSchema.extend({
  rendering: z.string().optional(),
  _rendering: ElementSchema.optional(),
  resource: z.array(ImplementationGuideManifestResourceSchema),
  page: z.array(ImplementationGuideManifestPageSchema).optional(),
  image: z.array(z.string()).optional(),
  _image: ElementSchema.optional(),
  other: z.array(z.string()).optional(),
  _other: ElementSchema.optional(),
})
export type ImplementationGuideManifest = z.infer<typeof ImplementationGuideManifestSchema>

/**
 * A set of rules of how a particular interoperability or standards problem is solved - typically through the use of FHIR resources. This resource is used to gather all the parts of an implementation guide into a logical whole and to publish a computable definition of all the parts.
 */
export const ImplementationGuideSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ImplementationGuide'),
  url: z.string(),
  _url: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  packageId: z.string(),
  _packageId: ElementSchema.optional(),
  license: z.enum(['not-open-source', '0BSD', 'AAL', 'Abstyles', 'Adobe-2006', 'Adobe-Glyph', 'ADSL', 'AFL-1.1', 'AFL-1.2', 'AFL-2.0', 'AFL-2.1', 'AFL-3.0', 'Afmparse', 'AGPL-1.0-only', 'AGPL-1.0-or-later', 'AGPL-3.0-only', 'AGPL-3.0-or-later', 'Aladdin', 'AMDPLPA', 'AML', 'AMPAS', 'ANTLR-PD', 'Apache-1.0', 'Apache-1.1', 'Apache-2.0', 'APAFML', 'APL-1.0', 'APSL-1.0', 'APSL-1.1', 'APSL-1.2', 'APSL-2.0', 'Artistic-1.0-cl8', 'Artistic-1.0-Perl', 'Artistic-1.0', 'Artistic-2.0', 'Bahyph', 'Barr', 'Beerware', 'BitTorrent-1.0', 'BitTorrent-1.1', 'Borceux', 'BSD-1-Clause', 'BSD-2-Clause-FreeBSD', 'BSD-2-Clause-NetBSD', 'BSD-2-Clause-Patent', 'BSD-2-Clause', 'BSD-3-Clause-Attribution', 'BSD-3-Clause-Clear', 'BSD-3-Clause-LBNL', 'BSD-3-Clause-No-Nuclear-License-2014', 'BSD-3-Clause-No-Nuclear-License', 'BSD-3-Clause-No-Nuclear-Warranty', 'BSD-3-Clause', 'BSD-4-Clause-UC', 'BSD-4-Clause', 'BSD-Protection', 'BSD-Source-Code', 'BSL-1.0', 'bzip2-1.0.5', 'bzip2-1.0.6', 'Caldera', 'CATOSL-1.1', 'CC-BY-1.0', 'CC-BY-2.0', 'CC-BY-2.5', 'CC-BY-3.0', 'CC-BY-4.0', 'CC-BY-NC-1.0', 'CC-BY-NC-2.0', 'CC-BY-NC-2.5', 'CC-BY-NC-3.0', 'CC-BY-NC-4.0', 'CC-BY-NC-ND-1.0', 'CC-BY-NC-ND-2.0', 'CC-BY-NC-ND-2.5', 'CC-BY-NC-ND-3.0', 'CC-BY-NC-ND-4.0', 'CC-BY-NC-SA-1.0', 'CC-BY-NC-SA-2.0', 'CC-BY-NC-SA-2.5', 'CC-BY-NC-SA-3.0', 'CC-BY-NC-SA-4.0', 'CC-BY-ND-1.0', 'CC-BY-ND-2.0', 'CC-BY-ND-2.5', 'CC-BY-ND-3.0', 'CC-BY-ND-4.0', 'CC-BY-SA-1.0', 'CC-BY-SA-2.0', 'CC-BY-SA-2.5', 'CC-BY-SA-3.0', 'CC-BY-SA-4.0', 'CC0-1.0', 'CDDL-1.0', 'CDDL-1.1', 'CDLA-Permissive-1.0', 'CDLA-Sharing-1.0', 'CECILL-1.0', 'CECILL-1.1', 'CECILL-2.0', 'CECILL-2.1', 'CECILL-B', 'CECILL-C', 'ClArtistic', 'CNRI-Jython', 'CNRI-Python-GPL-Compatible', 'CNRI-Python', 'Condor-1.1', 'CPAL-1.0', 'CPL-1.0', 'CPOL-1.02', 'Crossword', 'CrystalStacker', 'CUA-OPL-1.0', 'Cube', 'curl', 'D-FSL-1.0', 'diffmark', 'DOC', 'Dotseqn', 'DSDP', 'dvipdfm', 'ECL-1.0', 'ECL-2.0', 'EFL-1.0', 'EFL-2.0', 'eGenix', 'Entessa', 'EPL-1.0', 'EPL-2.0', 'ErlPL-1.1', 'EUDatagrid', 'EUPL-1.0', 'EUPL-1.1', 'EUPL-1.2', 'Eurosym', 'Fair', 'Frameworx-1.0', 'FreeImage', 'FSFAP', 'FSFUL', 'FSFULLR', 'FTL', 'GFDL-1.1-only', 'GFDL-1.1-or-later', 'GFDL-1.2-only', 'GFDL-1.2-or-later', 'GFDL-1.3-only', 'GFDL-1.3-or-later', 'Giftware', 'GL2PS', 'Glide', 'Glulxe', 'gnuplot', 'GPL-1.0-only', 'GPL-1.0-or-later', 'GPL-2.0-only', 'GPL-2.0-or-later', 'GPL-3.0-only', 'GPL-3.0-or-later', 'gSOAP-1.3b', 'HaskellReport', 'HPND', 'IBM-pibs', 'ICU', 'IJG', 'ImageMagick', 'iMatix', 'Imlib2', 'Info-ZIP', 'Intel-ACPI', 'Intel', 'Interbase-1.0', 'IPA', 'IPL-1.0', 'ISC', 'JasPer-2.0', 'JSON', 'LAL-1.2', 'LAL-1.3', 'Latex2e', 'Leptonica', 'LGPL-2.0-only', 'LGPL-2.0-or-later', 'LGPL-2.1-only', 'LGPL-2.1-or-later', 'LGPL-3.0-only', 'LGPL-3.0-or-later', 'LGPLLR', 'Libpng', 'libtiff', 'LiLiQ-P-1.1', 'LiLiQ-R-1.1', 'LiLiQ-Rplus-1.1', 'Linux-OpenIB', 'LPL-1.0', 'LPL-1.02', 'LPPL-1.0', 'LPPL-1.1', 'LPPL-1.2', 'LPPL-1.3a', 'LPPL-1.3c', 'MakeIndex', 'MirOS', 'MIT-0', 'MIT-advertising', 'MIT-CMU', 'MIT-enna', 'MIT-feh', 'MIT', 'MITNFA', 'Motosoto', 'mpich2', 'MPL-1.0', 'MPL-1.1', 'MPL-2.0-no-copyleft-exception', 'MPL-2.0', 'MS-PL', 'MS-RL', 'MTLL', 'Multics', 'Mup', 'NASA-1.3', 'Naumen', 'NBPL-1.0', 'NCSA', 'Net-SNMP', 'NetCDF', 'Newsletr', 'NGPL', 'NLOD-1.0', 'NLPL', 'Nokia', 'NOSL', 'Noweb', 'NPL-1.0', 'NPL-1.1', 'NPOSL-3.0', 'NRL', 'NTP', 'OCCT-PL', 'OCLC-2.0', 'ODbL-1.0', 'OFL-1.0', 'OFL-1.1', 'OGTSL', 'OLDAP-1.1', 'OLDAP-1.2', 'OLDAP-1.3', 'OLDAP-1.4', 'OLDAP-2.0.1', 'OLDAP-2.0', 'OLDAP-2.1', 'OLDAP-2.2.1', 'OLDAP-2.2.2', 'OLDAP-2.2', 'OLDAP-2.3', 'OLDAP-2.4', 'OLDAP-2.5', 'OLDAP-2.6', 'OLDAP-2.7', 'OLDAP-2.8', 'OML', 'OpenSSL', 'OPL-1.0', 'OSET-PL-2.1', 'OSL-1.0', 'OSL-1.1', 'OSL-2.0', 'OSL-2.1', 'OSL-3.0', 'PDDL-1.0', 'PHP-3.0', 'PHP-3.01', 'Plexus', 'PostgreSQL', 'psfrag', 'psutils', 'Python-2.0', 'Qhull', 'QPL-1.0', 'Rdisc', 'RHeCos-1.1', 'RPL-1.1', 'RPL-1.5', 'RPSL-1.0', 'RSA-MD', 'RSCPL', 'Ruby', 'SAX-PD', 'Saxpath', 'SCEA', 'Sendmail', 'SGI-B-1.0', 'SGI-B-1.1', 'SGI-B-2.0', 'SimPL-2.0', 'SISSL-1.2', 'SISSL', 'Sleepycat', 'SMLNJ', 'SMPPL', 'SNIA', 'Spencer-86', 'Spencer-94', 'Spencer-99', 'SPL-1.0', 'SugarCRM-1.1.3', 'SWL', 'TCL', 'TCP-wrappers', 'TMate', 'TORQUE-1.1', 'TOSL', 'Unicode-DFS-2015', 'Unicode-DFS-2016', 'Unicode-TOU', 'Unlicense', 'UPL-1.0', 'Vim', 'VOSTROM', 'VSL-1.0', 'W3C-19980720', 'W3C-20150513', 'W3C', 'Watcom-1.0', 'Wsuipa', 'WTFPL', 'X11', 'Xerox', 'XFree86-1.1', 'xinetd', 'Xnet', 'xpp', 'XSkat', 'YPL-1.0', 'YPL-1.1', 'Zed', 'Zend-2.0', 'Zimbra-1.3', 'Zimbra-1.4', 'zlib-acknowledgement', 'Zlib', 'ZPL-1.1', 'ZPL-2.0', 'ZPL-2.1']).optional(),
  _license: ElementSchema.optional(),
  fhirVersion: z.array(z.enum(['0.01', '0.05', '0.06', '0.11', '0.0.80', '0.0.81', '0.0.82', '0.4.0', '0.5.0', '1.0.0', '1.0.1', '1.0.2', '1.1.0', '1.4.0', '1.6.0', '1.8.0', '3.0.0', '3.0.1', '3.0.2', '3.3.0', '3.5.0', '4.0.0', '4.0.1', '4.1.0', '4.3.0-cibuild', '4.3.0-snapshot1', '4.3.0'])),
  _fhirVersion: ElementSchema.optional(),
  dependsOn: z.array(ImplementationGuideDependsOnSchema).optional(),
  global: z.array(ImplementationGuideGlobalSchema).optional(),
  definition: ImplementationGuideDefinitionSchema.optional(),
  manifest: ImplementationGuideManifestSchema.optional(),
})
export type ImplementationGuide = z.infer<typeof ImplementationGuideSchema>

/**
 * Required  nutrient modifications
 * Class that defines the quantity and type of nutrient modifications (for example carbohydrate, fiber or sodium) required for the oral diet.
 */
export const NutritionOrderOralDietNutrientSchema = BackboneElementSchema.extend({
  modifier: CodeableConceptSchema.optional(),
  amount: QuantitySchema.optional(),
})
export type NutritionOrderOralDietNutrient = z.infer<typeof NutritionOrderOralDietNutrientSchema>

/**
 * Required  texture modifications
 * Class that describes any texture modifications required for the patient to safely consume various types of solid foods.
 */
export const NutritionOrderOralDietTextureSchema = BackboneElementSchema.extend({
  modifier: CodeableConceptSchema.optional(),
  foodType: CodeableConceptSchema.optional(),
})
export type NutritionOrderOralDietTexture = z.infer<typeof NutritionOrderOralDietTextureSchema>

/**
 * Oral diet components
 * Diet given orally in contrast to enteral (tube) feeding.
 */
export const NutritionOrderOralDietSchema = BackboneElementSchema.extend({
  type: z.array(CodeableConceptSchema).optional(),
  schedule: z.array(TimingSchema).optional(),
  nutrient: z.array(NutritionOrderOralDietNutrientSchema).optional(),
  texture: z.array(NutritionOrderOralDietTextureSchema).optional(),
  fluidConsistencyType: z.array(CodeableConceptSchema).optional(),
  instruction: z.string().optional(),
  _instruction: ElementSchema.optional(),
})
export type NutritionOrderOralDiet = z.infer<typeof NutritionOrderOralDietSchema>

/**
 * Supplement components
 * Oral nutritional products given in order to add further nutritional value to the patient's diet.
 */
export const NutritionOrderSupplementSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  productName: z.string().optional(),
  _productName: ElementSchema.optional(),
  schedule: z.array(TimingSchema).optional(),
  quantity: QuantitySchema.optional(),
  instruction: z.string().optional(),
  _instruction: ElementSchema.optional(),
})
export type NutritionOrderSupplement = z.infer<typeof NutritionOrderSupplementSchema>

/**
 * Formula feeding instruction as structured data
 * Formula administration instructions as structured data.  This repeating structure allows for changing the administration rate or volume over time for both bolus and continuous feeding.  An example of this would be an instruction to increase the rate of continuous feeding every 2 hours.
 * See implementation notes below for further discussion on how to order continuous vs bolus enteral feeding using this resource.
 */
export const NutritionOrderEnteralFormulaAdministrationSchema = BackboneElementSchema.extend({
  schedule: TimingSchema.optional(),
  quantity: QuantitySchema.optional(),
  rateQuantity: QuantitySchema.optional(),
  rateRatio: RatioSchema.optional(),
})
export type NutritionOrderEnteralFormulaAdministration = z.infer<typeof NutritionOrderEnteralFormulaAdministrationSchema>

/**
 * Enteral formula components
 * Feeding provided through the gastrointestinal tract via a tube, catheter, or stoma that delivers nutrition distal to the oral cavity.
 */
export const NutritionOrderEnteralFormulaSchema = BackboneElementSchema.extend({
  baseFormulaType: CodeableConceptSchema.optional(),
  baseFormulaProductName: z.string().optional(),
  _baseFormulaProductName: ElementSchema.optional(),
  additiveType: CodeableConceptSchema.optional(),
  additiveProductName: z.string().optional(),
  _additiveProductName: ElementSchema.optional(),
  caloricDensity: QuantitySchema.optional(),
  routeofAdministration: CodeableConceptSchema.optional(),
  administration: z.array(NutritionOrderEnteralFormulaAdministrationSchema).optional(),
  maxVolumeToDeliver: QuantitySchema.optional(),
  administrationInstruction: z.string().optional(),
  _administrationInstruction: ElementSchema.optional(),
})
export type NutritionOrderEnteralFormula = z.infer<typeof NutritionOrderEnteralFormulaSchema>

/**
 * A request to supply a diet, formula feeding (enteral) or oral nutritional supplement to a patient/resident.
 */
export const NutritionOrderSchema = DomainResourceSchema.extend({
  resourceType: z.literal('NutritionOrder'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  instantiates: z.array(z.string()).optional(),
  _instantiates: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  patient: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  dateTime: z.string(),
  _dateTime: ElementSchema.optional(),
  orderer: ReferenceSchema.optional(),
  allergyIntolerance: z.array(ReferenceSchema).optional(),
  foodPreferenceModifier: z.array(CodeableConceptSchema).optional(),
  excludeFoodModifier: z.array(CodeableConceptSchema).optional(),
  oralDiet: NutritionOrderOralDietSchema.optional(),
  supplement: z.array(NutritionOrderSupplementSchema).optional(),
  enteralFormula: NutritionOrderEnteralFormulaSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type NutritionOrder = z.infer<typeof NutritionOrderSchema>

/**
 * This resource provides enrollment and plan details from the processing of an EnrollmentRequest resource.
 */
export const EnrollmentResponseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('EnrollmentResponse'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  request: ReferenceSchema.optional(),
  outcome: z.enum(['queued', 'complete', 'error', 'partial']).optional(),
  _outcome: ElementSchema.optional(),
  disposition: z.string().optional(),
  _disposition: ElementSchema.optional(),
  created: z.string().optional(),
  _created: ElementSchema.optional(),
  organization: ReferenceSchema.optional(),
  requestProvider: ReferenceSchema.optional(),
})
export type EnrollmentResponse = z.infer<typeof EnrollmentResponseSchema>

/**
 * Supporting information
 * Additional information codes regarding exceptions, special considerations, the condition, situation, prior or concurrent issues.
 * Often there are multiple jurisdiction specific valuesets which are required.
 */
export const CoverageEligibilityRequestSupportingInfoSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  information: ReferenceSchema,
  appliesToAll: z.boolean().optional(),
  _appliesToAll: ElementSchema.optional(),
})
export type CoverageEligibilityRequestSupportingInfo = z.infer<typeof CoverageEligibilityRequestSupportingInfoSchema>

/**
 * Patient insurance information
 * Financial instruments for reimbursement for the health care products and services.
 * All insurance coverages for the patient which may be applicable for reimbursement, of the products and services listed in the claim, are typically provided in the claim to allow insurers to confirm the ordering of the insurance coverages relative to local 'coordination of benefit' rules. One coverage (and only one) with 'focal=true' is to be used in the adjudication of this claim. Coverages appearing before the focal Coverage in the list, and where 'subrogation=false', should provide a reference to the ClaimResponse containing the adjudication results of the prior claim.
 */
export const CoverageEligibilityRequestInsuranceSchema = BackboneElementSchema.extend({
  focal: z.boolean().optional(),
  _focal: ElementSchema.optional(),
  coverage: ReferenceSchema,
  businessArrangement: z.string().optional(),
  _businessArrangement: ElementSchema.optional(),
})
export type CoverageEligibilityRequestInsurance = z.infer<typeof CoverageEligibilityRequestInsuranceSchema>

/**
 * Applicable diagnosis
 * Patient diagnosis for which care is sought.
 */
export const CoverageEligibilityRequestItemDiagnosisSchema = BackboneElementSchema.extend({
  diagnosisCodeableConcept: CodeableConceptSchema.optional(),
  diagnosisReference: ReferenceSchema.optional(),
})
export type CoverageEligibilityRequestItemDiagnosis = z.infer<typeof CoverageEligibilityRequestItemDiagnosisSchema>

/**
 * Item to be evaluated for eligibiity
 * Service categories or billable services for which benefit details and/or an authorization prior to service delivery may be required by the payor.
 */
export const CoverageEligibilityRequestItemSchema = BackboneElementSchema.extend({
  supportingInfoSequence: z.array(z.number()).optional(),
  _supportingInfoSequence: ElementSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  provider: ReferenceSchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  facility: ReferenceSchema.optional(),
  diagnosis: z.array(CoverageEligibilityRequestItemDiagnosisSchema).optional(),
  detail: z.array(ReferenceSchema).optional(),
})
export type CoverageEligibilityRequestItem = z.infer<typeof CoverageEligibilityRequestItemSchema>

/**
 * The CoverageEligibilityRequest provides patient and insurance coverage information to an insurer for them to respond, in the form of an CoverageEligibilityResponse, with information regarding whether the stated coverage is valid and in-force and optionally to provide the insurance details of the policy.
 */
export const CoverageEligibilityRequestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('CoverageEligibilityRequest'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  priority: CodeableConceptSchema.optional(),
  purpose: z.array(z.enum(['auth-requirements', 'benefits', 'discovery', 'validation'])),
  _purpose: ElementSchema.optional(),
  patient: ReferenceSchema,
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  created: z.string(),
  _created: ElementSchema.optional(),
  enterer: ReferenceSchema.optional(),
  provider: ReferenceSchema.optional(),
  insurer: ReferenceSchema,
  facility: ReferenceSchema.optional(),
  supportingInfo: z.array(CoverageEligibilityRequestSupportingInfoSchema).optional(),
  insurance: z.array(CoverageEligibilityRequestInsuranceSchema).optional(),
  item: z.array(CoverageEligibilityRequestItemSchema).optional(),
})
export type CoverageEligibilityRequest = z.infer<typeof CoverageEligibilityRequestSchema>

/**
 * Filter that can be used in a value set
 * A filter that can be used in a value set compose statement when selecting concepts using a filter.
 * Note that filters defined in code systems usually require custom code on the part of any terminology engine that will make them available for use in value set filters. For this reason, they are generally only seen in high value published terminologies.
 */
export const CodeSystemFilterSchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  operator: z.array(z.enum(['=', 'is-a', 'descendent-of', 'is-not-a', 'regex', 'in', 'not-in', 'generalizes', 'exists'])),
  _operator: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type CodeSystemFilter = z.infer<typeof CodeSystemFilterSchema>

/**
 * Additional information supplied about each concept
 * A property defines an additional slot through which additional information can be provided about a concept.
 */
export const CodeSystemPropertySchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  uri: z.string().optional(),
  _uri: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  type: z.enum(['code', 'Coding', 'string', 'integer', 'boolean', 'dateTime', 'decimal']),
  _type: ElementSchema.optional(),
})
export type CodeSystemProperty = z.infer<typeof CodeSystemPropertySchema>

/**
 * Additional representations for the concept
 * Additional representations for the concept - other languages, aliases, specialized purposes, used for particular purposes, etc.
 * Concepts have both a ```display``` and an array of ```designation```. The display is equivalent to a special designation with an implied ```designation.use``` of "primary code" and a language equal to the [Resource Language](resource.html#language).
 */
export const CodeSystemConceptDesignationSchema = BackboneElementSchema.extend({
  language: z.string().optional(),
  _language: ElementSchema.optional(),
  use: CodingSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type CodeSystemConceptDesignation = z.infer<typeof CodeSystemConceptDesignationSchema>

/**
 * Property value for the concept
 * A property value for this concept.
 */
export const CodeSystemConceptPropertySchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  valueCode: z.string().optional(),
  _valueCode: ElementSchema.optional(),
  valueCoding: CodingSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
})
export type CodeSystemConceptProperty = z.infer<typeof CodeSystemConceptPropertySchema>

/**
 * Concepts in the code system
 * Concepts that are in the code system. The concept definitions are inherently hierarchical, but the definitions must be consulted to determine what the meanings of the hierarchical relationships are.
 * If this is empty, it means that the code system resource does not represent the content of the code system.
 */
export interface CodeSystemConcept extends BackboneElement {
  code: string
  _code?: Element | undefined
  display?: string | undefined
  _display?: Element | undefined
  definition?: string | undefined
  _definition?: Element | undefined
  designation?: CodeSystemConceptDesignation[] | undefined
  property?: CodeSystemConceptProperty[] | undefined
  concept?: CodeSystemConcept[] | undefined
}

export const CodeSystemConceptSchema: z.ZodType<CodeSystemConcept> = z.lazy(() =>
  BackboneElementSchema.extend({
    code: z.string(),
      _code: ElementSchema.optional(),
    display: z.string().optional(),
      _display: ElementSchema.optional(),
    definition: z.string().optional(),
      _definition: ElementSchema.optional(),
    designation: z.array(CodeSystemConceptDesignationSchema).optional(),
    property: z.array(CodeSystemConceptPropertySchema).optional(),
    concept: z.lazy(() => z.array(CodeSystemConceptSchema)).optional(),
  })
)

/**
 * The CodeSystem resource is used to declare the existence of and describe a code system or code system supplement and its key properties, and optionally define a part or all of its content.
 */
export const CodeSystemSchema = DomainResourceSchema.extend({
  resourceType: z.literal('CodeSystem'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  caseSensitive: z.boolean().optional(),
  _caseSensitive: ElementSchema.optional(),
  valueSet: z.string().optional(),
  _valueSet: ElementSchema.optional(),
  hierarchyMeaning: z.enum(['grouped-by', 'is-a', 'part-of', 'classified-with']).optional(),
  _hierarchyMeaning: ElementSchema.optional(),
  compositional: z.boolean().optional(),
  _compositional: ElementSchema.optional(),
  versionNeeded: z.boolean().optional(),
  _versionNeeded: ElementSchema.optional(),
  content: z.enum(['not-present', 'example', 'fragment', 'complete', 'supplement']),
  _content: ElementSchema.optional(),
  supplements: z.string().optional(),
  _supplements: ElementSchema.optional(),
  count: z.number().optional(),
  _count: ElementSchema.optional(),
  filter: z.array(CodeSystemFilterSchema).optional(),
  property: z.array(CodeSystemPropertySchema).optional(),
  concept: z.array(CodeSystemConceptSchema).optional(),
})
export type CodeSystem = z.infer<typeof CodeSystemSchema>

/**
 * First fill details
 * Indicates the quantity or duration for the first dispense of the medication.
 * If populating this element, either the quantity or the duration must be included.
 */
export const MedicationRequestDispenseRequestInitialFillSchema = BackboneElementSchema.extend({
  quantity: QuantitySchema.optional(),
  duration: DurationSchema.optional(),
})
export type MedicationRequestDispenseRequestInitialFill = z.infer<typeof MedicationRequestDispenseRequestInitialFillSchema>

/**
 * Medication supply authorization
 * Indicates the specific details for the dispense or medication supply part of a medication request (also known as a Medication Prescription or Medication Order).  Note that this information is not always sent with the order.  There may be in some settings (e.g. hospitals) institutional or system support for completing the dispense details in the pharmacy department.
 */
export const MedicationRequestDispenseRequestSchema = BackboneElementSchema.extend({
  initialFill: MedicationRequestDispenseRequestInitialFillSchema.optional(),
  dispenseInterval: DurationSchema.optional(),
  validityPeriod: PeriodSchema.optional(),
  numberOfRepeatsAllowed: z.number().optional(),
  _numberOfRepeatsAllowed: ElementSchema.optional(),
  quantity: QuantitySchema.optional(),
  expectedSupplyDuration: DurationSchema.optional(),
  performer: ReferenceSchema.optional(),
})
export type MedicationRequestDispenseRequest = z.infer<typeof MedicationRequestDispenseRequestSchema>

/**
 * Any restrictions on medication substitution
 * Indicates whether or not substitution can or should be part of the dispense. In some cases, substitution must happen, in other cases substitution must not happen. This block explains the prescriber's intent. If nothing is specified substitution may be done.
 */
export const MedicationRequestSubstitutionSchema = BackboneElementSchema.extend({
  allowedBoolean: z.boolean().optional(),
  _allowedBoolean: ElementSchema.optional(),
  allowedCodeableConcept: CodeableConceptSchema.optional(),
  reason: CodeableConceptSchema.optional(),
})
export type MedicationRequestSubstitution = z.infer<typeof MedicationRequestSubstitutionSchema>

/**
 * An order or request for both supply of the medication and the instructions for administration of the medication to a patient. The resource is called "MedicationRequest" rather than "MedicationPrescription" or "MedicationOrder" to generalize the use across inpatient and outpatient settings, including care plans, etc., and to harmonize with workflow patterns.
 */
export const MedicationRequestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicationRequest'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'on-hold', 'cancelled', 'completed', 'entered-in-error', 'stopped', 'draft', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  doNotPerform: z.boolean().optional(),
  _doNotPerform: ElementSchema.optional(),
  reportedBoolean: z.boolean().optional(),
  _reportedBoolean: ElementSchema.optional(),
  reportedReference: ReferenceSchema.optional(),
  medicationCodeableConcept: CodeableConceptSchema.optional(),
  medicationReference: ReferenceSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  requester: ReferenceSchema.optional(),
  performer: ReferenceSchema.optional(),
  performerType: CodeableConceptSchema.optional(),
  recorder: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  groupIdentifier: IdentifierSchema.optional(),
  courseOfTherapyType: CodeableConceptSchema.optional(),
  insurance: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  dosageInstruction: z.array(DosageSchema).optional(),
  dispenseRequest: MedicationRequestDispenseRequestSchema.optional(),
  substitution: MedicationRequestSubstitutionSchema.optional(),
  priorPrescription: ReferenceSchema.optional(),
  detectedIssue: z.array(ReferenceSchema).optional(),
  eventHistory: z.array(ReferenceSchema).optional(),
})
export type MedicationRequest = z.infer<typeof MedicationRequestSchema>

/**
 * Dates governing proposed immunization
 * Vaccine date recommendations.  For example, earliest date to administer, latest date to administer, etc.
 */
export const ImmunizationRecommendationRecommendationDateCriterionSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type ImmunizationRecommendationRecommendationDateCriterion = z.infer<typeof ImmunizationRecommendationRecommendationDateCriterionSchema>

/**
 * Vaccine administration recommendations
 */
export const ImmunizationRecommendationRecommendationSchema = BackboneElementSchema.extend({
  vaccineCode: z.array(CodeableConceptSchema).optional(),
  targetDisease: CodeableConceptSchema.optional(),
  contraindicatedVaccineCode: z.array(CodeableConceptSchema).optional(),
  forecastStatus: CodeableConceptSchema,
  forecastReason: z.array(CodeableConceptSchema).optional(),
  dateCriterion: z.array(ImmunizationRecommendationRecommendationDateCriterionSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  series: z.string().optional(),
  _series: ElementSchema.optional(),
  doseNumberPositiveInt: z.number().optional(),
  _doseNumberPositiveInt: ElementSchema.optional(),
  doseNumberString: z.string().optional(),
  _doseNumberString: ElementSchema.optional(),
  seriesDosesPositiveInt: z.number().optional(),
  _seriesDosesPositiveInt: ElementSchema.optional(),
  seriesDosesString: z.string().optional(),
  _seriesDosesString: ElementSchema.optional(),
  supportingImmunization: z.array(ReferenceSchema).optional(),
  supportingPatientInformation: z.array(ReferenceSchema).optional(),
})
export type ImmunizationRecommendationRecommendation = z.infer<typeof ImmunizationRecommendationRecommendationSchema>

/**
 * A patient's point-in-time set of recommendations (i.e. forecasting) according to a published schedule with optional supporting justification.
 */
export const ImmunizationRecommendationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ImmunizationRecommendation'),
  identifier: z.array(IdentifierSchema).optional(),
  patient: ReferenceSchema,
  date: z.string(),
  _date: ElementSchema.optional(),
  authority: ReferenceSchema.optional(),
  recommendation: z.array(ImmunizationRecommendationRecommendationSchema),
})
export type ImmunizationRecommendation = z.infer<typeof ImmunizationRecommendationSchema>

/**
 * A slot of time on a schedule that may be available for booking appointments.
 */
export const SlotSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Slot'),
  identifier: z.array(IdentifierSchema).optional(),
  serviceCategory: z.array(CodeableConceptSchema).optional(),
  serviceType: z.array(CodeableConceptSchema).optional(),
  specialty: z.array(CodeableConceptSchema).optional(),
  appointmentType: CodeableConceptSchema.optional(),
  schedule: ReferenceSchema,
  status: z.enum(['busy', 'free', 'busy-unavailable', 'busy-tentative', 'entered-in-error']),
  _status: ElementSchema.optional(),
  start: z.string(),
  _start: ElementSchema.optional(),
  end: z.string(),
  _end: ElementSchema.optional(),
  overbooked: z.boolean().optional(),
  _overbooked: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
})
export type Slot = z.infer<typeof SlotSchema>

/**
 * How a resource is related to the compartment
 * Information about how a resource is related to the compartment.
 */
export const CompartmentDefinitionResourceSchema = BackboneElementSchema.extend({
  code: z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']),
  _code: ElementSchema.optional(),
  param: z.array(z.string()).optional(),
  _param: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
})
export type CompartmentDefinitionResource = z.infer<typeof CompartmentDefinitionResourceSchema>

/**
 * A compartment definition that defines how resources are accessed on a server.
 */
export const CompartmentDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('CompartmentDefinition'),
  url: z.string(),
  _url: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  code: z.enum(['Patient', 'Encounter', 'RelatedPerson', 'Practitioner', 'Device']),
  _code: ElementSchema.optional(),
  search: z.boolean(),
  _search: ElementSchema.optional(),
  resource: z.array(CompartmentDefinitionResourceSchema).optional(),
})
export type CompartmentDefinition = z.infer<typeof CompartmentDefinitionSchema>

/**
 * Additional coverage classifications
 * A suite of underwriter specific classifiers.
 * For example may be used to identify a class of coverage or employer group, Policy, Plan.
 */
export const CoverageClassSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  value: z.string(),
  _value: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
})
export type CoverageClass = z.infer<typeof CoverageClassSchema>

/**
 * Exceptions for patient payments
 * A suite of codes indicating exceptions or reductions to patient costs and their effective periods.
 */
export const CoverageCostToBeneficiaryExceptionSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  period: PeriodSchema.optional(),
})
export type CoverageCostToBeneficiaryException = z.infer<typeof CoverageCostToBeneficiaryExceptionSchema>

/**
 * Patient payments for services/products
 * A suite of codes indicating the cost category and associated amount which have been detailed in the policy and may have been  included on the health card.
 * For example by knowing the patient visit co-pay, the provider can collect the amount prior to undertaking treatment.
 */
export const CoverageCostToBeneficiarySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueMoney: MoneySchema.optional(),
  exception: z.array(CoverageCostToBeneficiaryExceptionSchema).optional(),
})
export type CoverageCostToBeneficiary = z.infer<typeof CoverageCostToBeneficiarySchema>

/**
 * Financial instrument which may be used to reimburse or pay for health care products and services. Includes both insurance and self-payment.
 */
export const CoverageSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Coverage'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  policyHolder: ReferenceSchema.optional(),
  subscriber: ReferenceSchema.optional(),
  subscriberId: z.string().optional(),
  _subscriberId: ElementSchema.optional(),
  beneficiary: ReferenceSchema,
  dependent: z.string().optional(),
  _dependent: ElementSchema.optional(),
  relationship: CodeableConceptSchema.optional(),
  period: PeriodSchema.optional(),
  payor: z.array(ReferenceSchema),
  class: z.array(CoverageClassSchema).optional(),
  order: z.number().optional(),
  _order: ElementSchema.optional(),
  network: z.string().optional(),
  _network: ElementSchema.optional(),
  costToBeneficiary: z.array(CoverageCostToBeneficiarySchema).optional(),
  subrogation: z.boolean().optional(),
  _subrogation: ElementSchema.optional(),
  contract: z.array(ReferenceSchema).optional(),
})
export type Coverage = z.infer<typeof CoverageSchema>

/**
 * Settlement particulars
 * Distribution of the payment amount for a previously acknowledged payable.
 */
export const PaymentReconciliationDetailSchema = BackboneElementSchema.extend({
  identifier: IdentifierSchema.optional(),
  predecessor: IdentifierSchema.optional(),
  type: CodeableConceptSchema,
  request: ReferenceSchema.optional(),
  submitter: ReferenceSchema.optional(),
  response: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  responsible: ReferenceSchema.optional(),
  payee: ReferenceSchema.optional(),
  amount: MoneySchema.optional(),
})
export type PaymentReconciliationDetail = z.infer<typeof PaymentReconciliationDetailSchema>

/**
 * Note concerning processing
 * A note that describes or explains the processing in a human readable form.
 */
export const PaymentReconciliationProcessNoteSchema = BackboneElementSchema.extend({
  type: z.enum(['display', 'print', 'printoper']).optional(),
  _type: ElementSchema.optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
})
export type PaymentReconciliationProcessNote = z.infer<typeof PaymentReconciliationProcessNoteSchema>

/**
 * This resource provides the details including amount of a payment and allocates the payment items being paid.
 */
export const PaymentReconciliationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('PaymentReconciliation'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  created: z.string(),
  _created: ElementSchema.optional(),
  paymentIssuer: ReferenceSchema.optional(),
  request: ReferenceSchema.optional(),
  requestor: ReferenceSchema.optional(),
  outcome: z.enum(['queued', 'complete', 'error', 'partial']).optional(),
  _outcome: ElementSchema.optional(),
  disposition: z.string().optional(),
  _disposition: ElementSchema.optional(),
  paymentDate: z.string(),
  _paymentDate: ElementSchema.optional(),
  paymentAmount: MoneySchema,
  paymentIdentifier: IdentifierSchema.optional(),
  detail: z.array(PaymentReconciliationDetailSchema).optional(),
  formCode: CodeableConceptSchema.optional(),
  processNote: z.array(PaymentReconciliationProcessNoteSchema).optional(),
})
export type PaymentReconciliation = z.infer<typeof PaymentReconciliationSchema>

/**
 * Associated or related medication information
 * Associated or related knowledge about a medication.
 */
export const MedicationKnowledgeRelatedMedicationKnowledgeSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  reference: z.array(ReferenceSchema),
})
export type MedicationKnowledgeRelatedMedicationKnowledge = z.infer<typeof MedicationKnowledgeRelatedMedicationKnowledgeSchema>

/**
 * Associated documentation about the medication
 */
export const MedicationKnowledgeMonographSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  source: ReferenceSchema.optional(),
})
export type MedicationKnowledgeMonograph = z.infer<typeof MedicationKnowledgeMonographSchema>

/**
 * Active or inactive ingredient
 * Identifies a particular constituent of interest in the product.
 */
export const MedicationKnowledgeIngredientSchema = BackboneElementSchema.extend({
  itemCodeableConcept: CodeableConceptSchema.optional(),
  itemReference: ReferenceSchema.optional(),
  isActive: z.boolean().optional(),
  _isActive: ElementSchema.optional(),
  strength: RatioSchema.optional(),
})
export type MedicationKnowledgeIngredient = z.infer<typeof MedicationKnowledgeIngredientSchema>

/**
 * The pricing of the medication
 * The price of the medication.
 */
export const MedicationKnowledgeCostSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  source: z.string().optional(),
  _source: ElementSchema.optional(),
  cost: MoneySchema,
})
export type MedicationKnowledgeCost = z.infer<typeof MedicationKnowledgeCostSchema>

/**
 * Program under which a medication is reviewed
 * The program under which the medication is reviewed.
 */
export const MedicationKnowledgeMonitoringProgramSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
})
export type MedicationKnowledgeMonitoringProgram = z.infer<typeof MedicationKnowledgeMonitoringProgramSchema>

/**
 * Dosage for the medication for the specific guidelines
 */
export const MedicationKnowledgeAdministrationGuidelinesDosageSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  dosage: z.array(DosageSchema),
})
export type MedicationKnowledgeAdministrationGuidelinesDosage = z.infer<typeof MedicationKnowledgeAdministrationGuidelinesDosageSchema>

/**
 * Characteristics of the patient that are relevant to the administration guidelines
 * Characteristics of the patient that are relevant to the administration guidelines (for example, height, weight, gender, etc.).
 */
export const MedicationKnowledgeAdministrationGuidelinesPatientCharacteristicsSchema = BackboneElementSchema.extend({
  characteristicCodeableConcept: CodeableConceptSchema.optional(),
  characteristicQuantity: QuantitySchema.optional(),
  value: z.array(z.string()).optional(),
  _value: ElementSchema.optional(),
})
export type MedicationKnowledgeAdministrationGuidelinesPatientCharacteristics = z.infer<typeof MedicationKnowledgeAdministrationGuidelinesPatientCharacteristicsSchema>

/**
 * Guidelines for administration of the medication
 * Guidelines for the administration of the medication.
 */
export const MedicationKnowledgeAdministrationGuidelinesSchema = BackboneElementSchema.extend({
  dosage: z.array(MedicationKnowledgeAdministrationGuidelinesDosageSchema).optional(),
  indicationCodeableConcept: CodeableConceptSchema.optional(),
  indicationReference: ReferenceSchema.optional(),
  patientCharacteristics: z.array(MedicationKnowledgeAdministrationGuidelinesPatientCharacteristicsSchema).optional(),
})
export type MedicationKnowledgeAdministrationGuidelines = z.infer<typeof MedicationKnowledgeAdministrationGuidelinesSchema>

/**
 * Categorization of the medication within a formulary or classification system
 */
export const MedicationKnowledgeMedicineClassificationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  classification: z.array(CodeableConceptSchema).optional(),
})
export type MedicationKnowledgeMedicineClassification = z.infer<typeof MedicationKnowledgeMedicineClassificationSchema>

/**
 * Details about packaged medications
 * Information that only applies to packages (not products).
 */
export const MedicationKnowledgePackagingSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  quantity: QuantitySchema.optional(),
})
export type MedicationKnowledgePackaging = z.infer<typeof MedicationKnowledgePackagingSchema>

/**
 * Specifies descriptive properties of the medicine
 * Specifies descriptive properties of the medicine, such as color, shape, imprints, etc.
 */
export const MedicationKnowledgeDrugCharacteristicSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueBase64Binary: z.string().optional(),
  _valueBase64Binary: ElementSchema.optional(),
})
export type MedicationKnowledgeDrugCharacteristic = z.infer<typeof MedicationKnowledgeDrugCharacteristicSchema>

/**
 * Specifies if changes are allowed when dispensing a medication from a regulatory perspective
 */
export const MedicationKnowledgeRegulatorySubstitutionSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  allowed: z.boolean(),
  _allowed: ElementSchema.optional(),
})
export type MedicationKnowledgeRegulatorySubstitution = z.infer<typeof MedicationKnowledgeRegulatorySubstitutionSchema>

/**
 * Specifies the schedule of a medication in jurisdiction
 */
export const MedicationKnowledgeRegulatoryScheduleSchema = BackboneElementSchema.extend({
  schedule: CodeableConceptSchema,
})
export type MedicationKnowledgeRegulatorySchedule = z.infer<typeof MedicationKnowledgeRegulatoryScheduleSchema>

/**
 * The maximum number of units of the medication that can be dispensed in a period
 */
export const MedicationKnowledgeRegulatoryMaxDispenseSchema = BackboneElementSchema.extend({
  quantity: QuantitySchema,
  period: DurationSchema.optional(),
})
export type MedicationKnowledgeRegulatoryMaxDispense = z.infer<typeof MedicationKnowledgeRegulatoryMaxDispenseSchema>

/**
 * Regulatory information about a medication
 */
export const MedicationKnowledgeRegulatorySchema = BackboneElementSchema.extend({
  regulatoryAuthority: ReferenceSchema,
  substitution: z.array(MedicationKnowledgeRegulatorySubstitutionSchema).optional(),
  schedule: z.array(MedicationKnowledgeRegulatoryScheduleSchema).optional(),
  maxDispense: MedicationKnowledgeRegulatoryMaxDispenseSchema.optional(),
})
export type MedicationKnowledgeRegulatory = z.infer<typeof MedicationKnowledgeRegulatorySchema>

/**
 * The time course of drug absorption, distribution, metabolism and excretion of a medication from the body
 */
export const MedicationKnowledgeKineticsSchema = BackboneElementSchema.extend({
  areaUnderCurve: z.array(QuantitySchema).optional(),
  lethalDose50: z.array(QuantitySchema).optional(),
  halfLifePeriod: DurationSchema.optional(),
})
export type MedicationKnowledgeKinetics = z.infer<typeof MedicationKnowledgeKineticsSchema>

/**
 * Information about a medication that is used to support knowledge.
 */
export const MedicationKnowledgeSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicationKnowledge'),
  code: CodeableConceptSchema.optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  manufacturer: ReferenceSchema.optional(),
  doseForm: CodeableConceptSchema.optional(),
  amount: QuantitySchema.optional(),
  synonym: z.array(z.string()).optional(),
  _synonym: ElementSchema.optional(),
  relatedMedicationKnowledge: z.array(MedicationKnowledgeRelatedMedicationKnowledgeSchema).optional(),
  associatedMedication: z.array(ReferenceSchema).optional(),
  productType: z.array(CodeableConceptSchema).optional(),
  monograph: z.array(MedicationKnowledgeMonographSchema).optional(),
  ingredient: z.array(MedicationKnowledgeIngredientSchema).optional(),
  preparationInstruction: z.string().optional(),
  _preparationInstruction: ElementSchema.optional(),
  intendedRoute: z.array(CodeableConceptSchema).optional(),
  cost: z.array(MedicationKnowledgeCostSchema).optional(),
  monitoringProgram: z.array(MedicationKnowledgeMonitoringProgramSchema).optional(),
  administrationGuidelines: z.array(MedicationKnowledgeAdministrationGuidelinesSchema).optional(),
  medicineClassification: z.array(MedicationKnowledgeMedicineClassificationSchema).optional(),
  packaging: MedicationKnowledgePackagingSchema.optional(),
  drugCharacteristic: z.array(MedicationKnowledgeDrugCharacteristicSchema).optional(),
  contraindication: z.array(ReferenceSchema).optional(),
  regulatory: z.array(MedicationKnowledgeRegulatorySchema).optional(),
  kinetics: z.array(MedicationKnowledgeKineticsSchema).optional(),
})
export type MedicationKnowledge = z.infer<typeof MedicationKnowledgeSchema>

/**
 * Describes a comparison of an immunization event against published recommendations to determine if the administration is "valid" in relation to those  recommendations.
 */
export const ImmunizationEvaluationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ImmunizationEvaluation'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['completed', 'entered-in-error']),
  _status: ElementSchema.optional(),
  patient: ReferenceSchema,
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  authority: ReferenceSchema.optional(),
  targetDisease: CodeableConceptSchema,
  immunizationEvent: ReferenceSchema,
  doseStatus: CodeableConceptSchema,
  doseStatusReason: z.array(CodeableConceptSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  series: z.string().optional(),
  _series: ElementSchema.optional(),
  doseNumberPositiveInt: z.number().optional(),
  _doseNumberPositiveInt: ElementSchema.optional(),
  doseNumberString: z.string().optional(),
  _doseNumberString: ElementSchema.optional(),
  seriesDosesPositiveInt: z.number().optional(),
  _seriesDosesPositiveInt: ElementSchema.optional(),
  seriesDosesString: z.string().optional(),
  _seriesDosesString: ElementSchema.optional(),
})
export type ImmunizationEvaluation = z.infer<typeof ImmunizationEvaluationSchema>

/**
 * For Composite resources to define the parts
 * Used to define the parts of a composite search parameter.
 */
export const SearchParameterComponentSchema = BackboneElementSchema.extend({
  definition: z.string(),
  _definition: ElementSchema.optional(),
  expression: z.string(),
  _expression: ElementSchema.optional(),
})
export type SearchParameterComponent = z.infer<typeof SearchParameterComponentSchema>

/**
 * A search parameter that defines a named search item that can be used to search/filter on a resource.
 */
export const SearchParameterSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SearchParameter'),
  url: z.string(),
  _url: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  derivedFrom: z.string().optional(),
  _derivedFrom: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  code: z.string(),
  _code: ElementSchema.optional(),
  base: z.array(z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters'])),
  _base: ElementSchema.optional(),
  type: z.enum(['number', 'date', 'string', 'token', 'reference', 'composite', 'quantity', 'uri', 'special']),
  _type: ElementSchema.optional(),
  expression: z.string().optional(),
  _expression: ElementSchema.optional(),
  xpath: z.string().optional(),
  _xpath: ElementSchema.optional(),
  xpathUsage: z.enum(['normal', 'phonetic', 'nearby', 'distance', 'other']).optional(),
  _xpathUsage: ElementSchema.optional(),
  target: z.array(z.enum(['Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'CatalogEntry', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceDefinition', 'DeviceMetric', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest', 'DocumentReference', 'Encounter', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Media', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestReport', 'TestScript', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters'])).optional(),
  _target: ElementSchema.optional(),
  multipleOr: z.boolean().optional(),
  _multipleOr: ElementSchema.optional(),
  multipleAnd: z.boolean().optional(),
  _multipleAnd: ElementSchema.optional(),
  comparator: z.array(z.enum(['eq', 'ne', 'gt', 'lt', 'ge', 'le', 'sa', 'eb', 'ap'])).optional(),
  _comparator: ElementSchema.optional(),
  modifier: z.array(z.enum(['missing', 'exact', 'contains', 'not', 'text', 'in', 'not-in', 'below', 'above', 'type', 'identifier', 'ofType'])).optional(),
  _modifier: ElementSchema.optional(),
  chain: z.array(z.string()).optional(),
  _chain: ElementSchema.optional(),
  component: z.array(SearchParameterComponentSchema).optional(),
})
export type SearchParameter = z.infer<typeof SearchParameterSchema>

/**
 * A record of a medication that is being consumed by a patient.   A MedicationStatement may indicate that the patient may be taking the medication now or has taken the medication in the past or will be taking the medication in the future.  The source of this information can be the patient, significant other (such as a family member or spouse), or a clinician.  A common scenario where this information is captured is during the history taking process during a patient visit or stay.   The medication information may come from sources such as the patient's memory, from a prescription bottle,  or from a list of medications the patient, clinician or other party maintains. 
 * The primary difference between a medication statement and a medication administration is that the medication administration has complete administration information and is based on actual administration information from the person who administered the medication.  A medication statement is often, if not always, less specific.  There is no required date/time when the medication was administered, in fact we only know that a source has reported the patient is taking this medication, where details such as time, quantity, or rate or even medication product may be incomplete or missing or less precise.  As stated earlier, the medication statement information may come from the patient's memory, from a prescription bottle or from a list of medications the patient, clinician or other party maintains.  Medication administration is more formal and is not missing detailed information.
 */
export const MedicationStatementSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicationStatement'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['active', 'completed', 'entered-in-error', 'intended', 'stopped', 'on-hold', 'unknown', 'not-taken']),
  _status: ElementSchema.optional(),
  statusReason: z.array(CodeableConceptSchema).optional(),
  category: CodeableConceptSchema.optional(),
  medicationCodeableConcept: CodeableConceptSchema.optional(),
  medicationReference: ReferenceSchema.optional(),
  subject: ReferenceSchema,
  context: ReferenceSchema.optional(),
  effectiveDateTime: z.string().optional(),
  _effectiveDateTime: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  dateAsserted: z.string().optional(),
  _dateAsserted: ElementSchema.optional(),
  informationSource: ReferenceSchema.optional(),
  derivedFrom: z.array(ReferenceSchema).optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  dosage: z.array(DosageSchema).optional(),
})
export type MedicationStatement = z.infer<typeof MedicationStatementSchema>

/**
 * A container for slots of time that may be available for booking appointments.
 */
export const ScheduleSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Schedule'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  serviceCategory: z.array(CodeableConceptSchema).optional(),
  serviceType: z.array(CodeableConceptSchema).optional(),
  specialty: z.array(CodeableConceptSchema).optional(),
  actor: z.array(ReferenceSchema),
  planningHorizon: PeriodSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
})
export type Schedule = z.infer<typeof ScheduleSchema>

/**
 * Link to a resource that concerns the same actual person
 */
export const PersonLinkSchema = BackboneElementSchema.extend({
  target: ReferenceSchema,
  assurance: z.enum(['level1', 'level2', 'level3', 'level4']).optional(),
  _assurance: ElementSchema.optional(),
})
export type PersonLink = z.infer<typeof PersonLinkSchema>

/**
 * Demographics and administrative information about a person independent of a specific health-related context.
 */
export const PersonSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Person'),
  identifier: z.array(IdentifierSchema).optional(),
  name: z.array(HumanNameSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  _gender: ElementSchema.optional(),
  birthDate: z.string().optional(),
  _birthDate: ElementSchema.optional(),
  address: z.array(AddressSchema).optional(),
  photo: AttachmentSchema.optional(),
  managingOrganization: ReferenceSchema.optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  link: z.array(PersonLinkSchema).optional(),
})
export type Person = z.infer<typeof PersonSchema>

/**
 * Characteristics e.g. a product's onset of action
 */
export const AdministrableProductDefinitionPropertySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  status: CodeableConceptSchema.optional(),
})
export type AdministrableProductDefinitionProperty = z.infer<typeof AdministrableProductDefinitionPropertySchema>

/**
 * A species specific time during which consumption of animal product is not appropriate
 */
export const AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriodSchema = BackboneElementSchema.extend({
  tissue: CodeableConceptSchema,
  value: QuantitySchema,
  supportingInformation: z.string().optional(),
  _supportingInformation: ElementSchema.optional(),
})
export type AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriod = z.infer<typeof AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriodSchema>

/**
 * A species for which this route applies
 */
export const AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  withdrawalPeriod: z.array(AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriodSchema).optional(),
})
export type AdministrableProductDefinitionRouteOfAdministrationTargetSpecies = z.infer<typeof AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesSchema>

/**
 * The path by which the product is taken into or makes contact with the body
 * The path by which the product is taken into or makes contact with the body. In some regions this is referred to as the licenced or approved route. RouteOfAdministration cannot be used when the 'formOf' product already uses MedicinalProductDefinition.route (and vice versa).
 */
export const AdministrableProductDefinitionRouteOfAdministrationSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  firstDose: QuantitySchema.optional(),
  maxSingleDose: QuantitySchema.optional(),
  maxDosePerDay: QuantitySchema.optional(),
  maxDosePerTreatmentPeriod: RatioSchema.optional(),
  maxTreatmentPeriod: DurationSchema.optional(),
  targetSpecies: z.array(AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesSchema).optional(),
})
export type AdministrableProductDefinitionRouteOfAdministration = z.infer<typeof AdministrableProductDefinitionRouteOfAdministrationSchema>

/**
 * A medicinal product in the final form which is suitable for administering to a patient (after any mixing of multiple components, dissolution etc. has been performed).
 */
export const AdministrableProductDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('AdministrableProductDefinition'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  formOf: z.array(ReferenceSchema).optional(),
  administrableDoseForm: CodeableConceptSchema.optional(),
  unitOfPresentation: CodeableConceptSchema.optional(),
  producedFrom: z.array(ReferenceSchema).optional(),
  ingredient: z.array(CodeableConceptSchema).optional(),
  device: ReferenceSchema.optional(),
  property: z.array(AdministrableProductDefinitionPropertySchema).optional(),
  routeOfAdministration: z.array(AdministrableProductDefinitionRouteOfAdministrationSchema),
})
export type AdministrableProductDefinition = z.infer<typeof AdministrableProductDefinitionSchema>

/**
 * Base StructureDefinition for DataType Type: The base class for all re-useable types defined as part of the FHIR Specification.
 */
export const DataTypeSchema = ElementSchema.extend({
})
export type DataType = z.infer<typeof DataTypeSchema>

/**
 * Adverse Reaction Events linked to exposure to substance
 * Details about each adverse reaction event linked to exposure to the identified substance.
 */
export const AllergyIntoleranceReactionSchema = BackboneElementSchema.extend({
  substance: CodeableConceptSchema.optional(),
  manifestation: z.array(CodeableConceptSchema),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  onset: z.string().optional(),
  _onset: ElementSchema.optional(),
  severity: z.enum(['mild', 'moderate', 'severe']).optional(),
  _severity: ElementSchema.optional(),
  exposureRoute: CodeableConceptSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type AllergyIntoleranceReaction = z.infer<typeof AllergyIntoleranceReactionSchema>

/**
 * Risk of harmful or undesirable, physiological response which is unique to an individual and associated with exposure to a substance.
 */
export const AllergyIntoleranceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('AllergyIntolerance'),
  identifier: z.array(IdentifierSchema).optional(),
  clinicalStatus: CodeableConceptSchema.optional(),
  verificationStatus: CodeableConceptSchema.optional(),
  type: z.enum(['allergy', 'intolerance']).optional(),
  _type: ElementSchema.optional(),
  category: z.array(z.enum(['food', 'medication', 'environment', 'biologic'])).optional(),
  _category: ElementSchema.optional(),
  criticality: z.enum(['low', 'high', 'unable-to-assess']).optional(),
  _criticality: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  patient: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  onsetDateTime: z.string().optional(),
  _onsetDateTime: ElementSchema.optional(),
  onsetAge: AgeSchema.optional(),
  onsetPeriod: PeriodSchema.optional(),
  onsetRange: RangeSchema.optional(),
  onsetString: z.string().optional(),
  _onsetString: ElementSchema.optional(),
  recordedDate: z.string().optional(),
  _recordedDate: ElementSchema.optional(),
  recorder: ReferenceSchema.optional(),
  asserter: ReferenceSchema.optional(),
  lastOccurrence: z.string().optional(),
  _lastOccurrence: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  reaction: z.array(AllergyIntoleranceReactionSchema).optional(),
})
export type AllergyIntolerance = z.infer<typeof AllergyIntoleranceSchema>

/**
 * Base StructureDefinition for decimal Type: A rational number with implicit precision
 */
export const decimalSchema = ElementSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
})
export type decimal = z.infer<typeof decimalSchema>

/**
 * Target outcome for the goal
 * Indicates what should be done and within what timeframe.
 */
export const PlanDefinitionGoalTargetSchema = BackboneElementSchema.extend({
  measure: CodeableConceptSchema.optional(),
  detailQuantity: QuantitySchema.optional(),
  detailRange: RangeSchema.optional(),
  detailCodeableConcept: CodeableConceptSchema.optional(),
  due: DurationSchema.optional(),
})
export type PlanDefinitionGoalTarget = z.infer<typeof PlanDefinitionGoalTargetSchema>

/**
 * What the plan is trying to accomplish
 * A goal describes an expected outcome that activities within the plan are intended to achieve. For example, weight loss, restoring an activity of daily living, obtaining herd immunity via immunization, meeting a process improvement objective, meeting the acceptance criteria for a test as specified by a quality specification, etc.
 */
export const PlanDefinitionGoalSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema.optional(),
  description: CodeableConceptSchema,
  priority: CodeableConceptSchema.optional(),
  start: CodeableConceptSchema.optional(),
  addresses: z.array(CodeableConceptSchema).optional(),
  documentation: z.array(RelatedArtifactSchema).optional(),
  target: z.array(PlanDefinitionGoalTargetSchema).optional(),
})
export type PlanDefinitionGoal = z.infer<typeof PlanDefinitionGoalSchema>

/**
 * Whether or not the action is applicable
 * An expression that describes applicability criteria or start/stop conditions for the action.
 * When multiple conditions of the same kind are present, the effects are combined using AND semantics, so the overall condition is true only if all the conditions are true.
 */
export const PlanDefinitionActionConditionSchema = BackboneElementSchema.extend({
  kind: z.enum(['applicability', 'start', 'stop']),
  _kind: ElementSchema.optional(),
  expression: ExpressionSchema.optional(),
})
export type PlanDefinitionActionCondition = z.infer<typeof PlanDefinitionActionConditionSchema>

/**
 * Relationship to another action
 * A relationship to another action such as "before" or "30-60 minutes after start of".
 * When an action depends on multiple actions, the meaning is that all actions are dependencies, rather than that any of the actions are a dependency.
 */
export const PlanDefinitionActionRelatedActionSchema = BackboneElementSchema.extend({
  actionId: z.string(),
  _actionId: ElementSchema.optional(),
  relationship: z.enum(['before-start', 'before', 'before-end', 'concurrent-with-start', 'concurrent', 'concurrent-with-end', 'after-start', 'after', 'after-end']),
  _relationship: ElementSchema.optional(),
  offsetDuration: DurationSchema.optional(),
  offsetRange: RangeSchema.optional(),
})
export type PlanDefinitionActionRelatedAction = z.infer<typeof PlanDefinitionActionRelatedActionSchema>

/**
 * Who should participate in the action
 * Indicates who should participate in performing the action described.
 */
export const PlanDefinitionActionParticipantSchema = BackboneElementSchema.extend({
  type: z.enum(['patient', 'practitioner', 'related-person', 'device']),
  _type: ElementSchema.optional(),
  role: CodeableConceptSchema.optional(),
})
export type PlanDefinitionActionParticipant = z.infer<typeof PlanDefinitionActionParticipantSchema>

/**
 * Dynamic aspects of the definition
 * Customizations that should be applied to the statically defined resource. For example, if the dosage of a medication must be computed based on the patient's weight, a customization would be used to specify an expression that calculated the weight, and the path on the resource that would contain the result.
 * Dynamic values are applied in the order in which they are defined in the PlanDefinition resource. Note that when dynamic values are also specified by a referenced ActivityDefinition, the dynamicValues from the ActivityDefinition are applied first, followed by the dynamicValues specified here. In addition, if both a transform and dynamic values are specific, the dynamic values are applied to the result of the transform.
 */
export const PlanDefinitionActionDynamicValueSchema = BackboneElementSchema.extend({
  path: z.string().optional(),
  _path: ElementSchema.optional(),
  expression: ExpressionSchema.optional(),
})
export type PlanDefinitionActionDynamicValue = z.infer<typeof PlanDefinitionActionDynamicValueSchema>

/**
 * Action defined by the plan
 * An action or group of actions to be taken as part of the plan. For example, in clinical care, an action would be to prescribe a particular indicated medication, or perform a particular test as appropriate. In pharmaceutical quality, an action would be the test that needs to be performed on a drug product as defined in the quality specification.
 * Note that there is overlap between many of the elements defined here and the ActivityDefinition resource. When an ActivityDefinition is referenced (using the definition element), the overlapping elements in the plan override the content of the referenced ActivityDefinition unless otherwise documented in the specific elements. See the PlanDefinition resource for more detailed information.
 */
export interface PlanDefinitionAction extends BackboneElement {
  prefix?: string | undefined
  _prefix?: Element | undefined
  title?: string | undefined
  _title?: Element | undefined
  description?: string | undefined
  _description?: Element | undefined
  textEquivalent?: string | undefined
  _textEquivalent?: Element | undefined
  priority?: ('routine'|'urgent'|'asap'|'stat') | undefined
  _priority?: Element | undefined
  code?: CodeableConcept[] | undefined
  reason?: CodeableConcept[] | undefined
  documentation?: RelatedArtifact[] | undefined
  goalId?: string[] | undefined
  _goalId?: Element | undefined
  subjectCodeableConcept?: CodeableConcept | undefined
  subjectReference?: Reference | undefined
  subjectCanonical?: string | undefined
  _subjectCanonical?: Element | undefined
  trigger?: TriggerDefinition[] | undefined
  condition?: PlanDefinitionActionCondition[] | undefined
  input?: DataRequirement[] | undefined
  output?: DataRequirement[] | undefined
  relatedAction?: PlanDefinitionActionRelatedAction[] | undefined
  timingDateTime?: string | undefined
  _timingDateTime?: Element | undefined
  timingAge?: Age | undefined
  timingPeriod?: Period | undefined
  timingDuration?: Duration | undefined
  timingRange?: Range | undefined
  timingTiming?: Timing | undefined
  participant?: PlanDefinitionActionParticipant[] | undefined
  type?: CodeableConcept | undefined
  groupingBehavior?: ('visual-group'|'logical-group'|'sentence-group') | undefined
  _groupingBehavior?: Element | undefined
  selectionBehavior?: ('any'|'all'|'all-or-none'|'exactly-one'|'at-most-one'|'one-or-more') | undefined
  _selectionBehavior?: Element | undefined
  requiredBehavior?: ('must'|'could'|'must-unless-documented') | undefined
  _requiredBehavior?: Element | undefined
  precheckBehavior?: ('yes'|'no') | undefined
  _precheckBehavior?: Element | undefined
  cardinalityBehavior?: ('single'|'multiple') | undefined
  _cardinalityBehavior?: Element | undefined
  definitionCanonical?: string | undefined
  _definitionCanonical?: Element | undefined
  definitionUri?: string | undefined
  _definitionUri?: Element | undefined
  transform?: string | undefined
  _transform?: Element | undefined
  dynamicValue?: PlanDefinitionActionDynamicValue[] | undefined
  action?: PlanDefinitionAction[] | undefined
}

export const PlanDefinitionActionSchema: z.ZodType<PlanDefinitionAction> = z.lazy(() =>
  BackboneElementSchema.extend({
    prefix: z.string().optional(),
      _prefix: ElementSchema.optional(),
    title: z.string().optional(),
      _title: ElementSchema.optional(),
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    textEquivalent: z.string().optional(),
      _textEquivalent: ElementSchema.optional(),
    priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
      _priority: ElementSchema.optional(),
    code: z.array(CodeableConceptSchema).optional(),
    reason: z.array(CodeableConceptSchema).optional(),
    documentation: z.array(RelatedArtifactSchema).optional(),
    goalId: z.array(z.string()).optional(),
      _goalId: ElementSchema.optional(),
    subjectCodeableConcept: CodeableConceptSchema.optional(),
    subjectReference: ReferenceSchema.optional(),
    subjectCanonical: z.string().optional(),
      _subjectCanonical: ElementSchema.optional(),
    trigger: z.array(TriggerDefinitionSchema).optional(),
    condition: z.array(PlanDefinitionActionConditionSchema).optional(),
    input: z.array(DataRequirementSchema).optional(),
    output: z.array(DataRequirementSchema).optional(),
    relatedAction: z.array(PlanDefinitionActionRelatedActionSchema).optional(),
    timingDateTime: z.string().optional(),
      _timingDateTime: ElementSchema.optional(),
    timingAge: AgeSchema.optional(),
    timingPeriod: PeriodSchema.optional(),
    timingDuration: DurationSchema.optional(),
    timingRange: RangeSchema.optional(),
    timingTiming: TimingSchema.optional(),
    participant: z.array(PlanDefinitionActionParticipantSchema).optional(),
    type: CodeableConceptSchema.optional(),
    groupingBehavior: z.enum(['visual-group', 'logical-group', 'sentence-group']).optional(),
      _groupingBehavior: ElementSchema.optional(),
    selectionBehavior: z.enum(['any', 'all', 'all-or-none', 'exactly-one', 'at-most-one', 'one-or-more']).optional(),
      _selectionBehavior: ElementSchema.optional(),
    requiredBehavior: z.enum(['must', 'could', 'must-unless-documented']).optional(),
      _requiredBehavior: ElementSchema.optional(),
    precheckBehavior: z.enum(['yes', 'no']).optional(),
      _precheckBehavior: ElementSchema.optional(),
    cardinalityBehavior: z.enum(['single', 'multiple']).optional(),
      _cardinalityBehavior: ElementSchema.optional(),
    definitionCanonical: z.string().optional(),
      _definitionCanonical: ElementSchema.optional(),
    definitionUri: z.string().optional(),
      _definitionUri: ElementSchema.optional(),
    transform: z.string().optional(),
      _transform: ElementSchema.optional(),
    dynamicValue: z.array(PlanDefinitionActionDynamicValueSchema).optional(),
    action: z.lazy(() => z.array(PlanDefinitionActionSchema)).optional(),
  })
)

/**
 * This resource allows for the definition of various types of plans as a sharable, consumable, and executable artifact. The resource is general enough to support the description of a broad range of clinical and non-clinical artifacts such as clinical decision support rules, order sets, protocols, and drug quality specifications.
 */
export const PlanDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('PlanDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  subtitle: z.string().optional(),
  _subtitle: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  subjectCanonical: z.string().optional(),
  _subjectCanonical: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  usage: z.string().optional(),
  _usage: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  topic: z.array(CodeableConceptSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  library: z.array(z.string()).optional(),
  _library: ElementSchema.optional(),
  goal: z.array(PlanDefinitionGoalSchema).optional(),
  action: z.array(PlanDefinitionActionSchema).optional(),
})
export type PlanDefinition = z.infer<typeof PlanDefinitionSchema>

/**
 * A physical entity which is the primary unit of operational and/or administrative interest in a study.
 */
export const ResearchSubjectSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ResearchSubject'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['candidate', 'eligible', 'follow-up', 'ineligible', 'not-registered', 'off-study', 'on-study', 'on-study-intervention', 'on-study-observation', 'pending-on-study', 'potential-candidate', 'screening', 'withdrawn']),
  _status: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  study: ReferenceSchema,
  individual: ReferenceSchema,
  assignedArm: z.string().optional(),
  _assignedArm: ElementSchema.optional(),
  actualArm: z.string().optional(),
  _actualArm: ElementSchema.optional(),
  consent: ReferenceSchema.optional(),
})
export type ResearchSubject = z.infer<typeof ResearchSubjectSchema>

/**
 * Base StructureDefinition for canonical type: A URI that is a reference to a canonical URL on a FHIR resource
 */
export const canonicalSchema = uriSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type canonical = z.infer<typeof canonicalSchema>

/**
 * One or more sets of investigations (signs, symptoms, etc.)
 * One or more sets of investigations (signs, symptoms, etc.). The actual grouping of investigations varies greatly depending on the type and context of the assessment. These investigations may include data generated during the assessment process, or data previously generated and recorded that is pertinent to the outcomes.
 */
export const ClinicalImpressionInvestigationSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  item: z.array(ReferenceSchema).optional(),
})
export type ClinicalImpressionInvestigation = z.infer<typeof ClinicalImpressionInvestigationSchema>

/**
 * Possible or likely findings and diagnoses
 * Specific findings or diagnoses that were considered likely or relevant to ongoing treatment.
 */
export const ClinicalImpressionFindingSchema = BackboneElementSchema.extend({
  itemCodeableConcept: CodeableConceptSchema.optional(),
  itemReference: ReferenceSchema.optional(),
  basis: z.string().optional(),
  _basis: ElementSchema.optional(),
})
export type ClinicalImpressionFinding = z.infer<typeof ClinicalImpressionFindingSchema>

/**
 * A record of a clinical assessment performed to determine what problem(s) may affect the patient and before planning the treatments or management strategies that are best to manage a patient's condition. Assessments are often 1:1 with a clinical consultation / encounter,  but this varies greatly depending on the clinical workflow. This resource is called "ClinicalImpression" rather than "ClinicalAssessment" to avoid confusion with the recording of assessment tools such as Apgar score.
 */
export const ClinicalImpressionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ClinicalImpression'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['in-progress', 'completed', 'entered-in-error']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  effectiveDateTime: z.string().optional(),
  _effectiveDateTime: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  assessor: ReferenceSchema.optional(),
  previous: ReferenceSchema.optional(),
  problem: z.array(ReferenceSchema).optional(),
  investigation: z.array(ClinicalImpressionInvestigationSchema).optional(),
  protocol: z.array(z.string()).optional(),
  _protocol: ElementSchema.optional(),
  summary: z.string().optional(),
  _summary: ElementSchema.optional(),
  finding: z.array(ClinicalImpressionFindingSchema).optional(),
  prognosisCodeableConcept: z.array(CodeableConceptSchema).optional(),
  prognosisReference: z.array(ReferenceSchema).optional(),
  supportingInfo: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type ClinicalImpression = z.infer<typeof ClinicalImpressionSchema>

/**
 * The channel on which to report matches to the criteria
 * Details where to send notifications when resources are received that meet the criteria.
 */
export const SubscriptionChannelSchema = BackboneElementSchema.extend({
  type: z.enum(['rest-hook', 'websocket', 'email', 'sms', 'message']),
  _type: ElementSchema.optional(),
  endpoint: z.string().optional(),
  _endpoint: ElementSchema.optional(),
  payload: z.string().optional(),
  _payload: ElementSchema.optional(),
  header: z.array(z.string()).optional(),
  _header: ElementSchema.optional(),
})
export type SubscriptionChannel = z.infer<typeof SubscriptionChannelSchema>

/**
 * The subscription resource is used to define a push-based subscription from a server to another system. Once a subscription is registered with the server, the server checks every resource that is created or updated, and if the resource matches the given criteria, it sends a message on the defined "channel" so that another system can take an appropriate action.
 */
export const SubscriptionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Subscription'),
  status: z.enum(['requested', 'active', 'error', 'off']),
  _status: ElementSchema.optional(),
  contact: z.array(ContactPointSchema).optional(),
  end: z.string().optional(),
  _end: ElementSchema.optional(),
  reason: z.string(),
  _reason: ElementSchema.optional(),
  criteria: z.string(),
  _criteria: ElementSchema.optional(),
  error: z.string().optional(),
  _error: ElementSchema.optional(),
  channel: SubscriptionChannelSchema,
})
export type Subscription = z.infer<typeof SubscriptionSchema>

/**
 * Members of the team
 * Identifies all people and organizations who are expected to be involved in the care team.
 */
export const CareTeamParticipantSchema = BackboneElementSchema.extend({
  role: z.array(CodeableConceptSchema).optional(),
  member: ReferenceSchema.optional(),
  onBehalfOf: ReferenceSchema.optional(),
  period: PeriodSchema.optional(),
})
export type CareTeamParticipant = z.infer<typeof CareTeamParticipantSchema>

/**
 * The Care Team includes all the people and organizations who plan to participate in the coordination and delivery of care for a patient.
 */
export const CareTeamSchema = DomainResourceSchema.extend({
  resourceType: z.literal('CareTeam'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['proposed', 'active', 'suspended', 'inactive', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  period: PeriodSchema.optional(),
  participant: z.array(CareTeamParticipantSchema).optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  managingOrganization: z.array(ReferenceSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type CareTeam = z.infer<typeof CareTeamSchema>

/**
 * Unique Device Identifier (UDI) Barcode string
 * Unique device identifier (UDI) assigned to device label or package.  Note that the Device may include multiple udiCarriers as it either may include just the udiCarrier for the jurisdiction it is sold, or for multiple jurisdictions it could have been sold.
 * UDI may identify an unique instance of a device, or it may only identify the type of the device.  See [UDI mappings](device-mappings.html#udi) for a complete mapping of UDI parts to Device.
 */
export const DeviceUdiCarrierSchema = BackboneElementSchema.extend({
  deviceIdentifier: z.string().optional(),
  _deviceIdentifier: ElementSchema.optional(),
  issuer: z.string().optional(),
  _issuer: ElementSchema.optional(),
  jurisdiction: z.string().optional(),
  _jurisdiction: ElementSchema.optional(),
  carrierAIDC: z.string().optional(),
  _carrierAIDC: ElementSchema.optional(),
  carrierHRF: z.string().optional(),
  _carrierHRF: ElementSchema.optional(),
  entryType: z.enum(['barcode', 'rfid', 'manual', 'card', 'self-reported', 'unknown']).optional(),
  _entryType: ElementSchema.optional(),
})
export type DeviceUdiCarrier = z.infer<typeof DeviceUdiCarrierSchema>

/**
 * The name of the device as given by the manufacturer
 * This represents the manufacturer's name of the device as provided by the device, from a UDI label, or by a person describing the Device.  This typically would be used when a person provides the name(s) or when the device represents one of the names available from DeviceDefinition.
 */
export const DeviceDeviceNameSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  type: z.enum(['udi-label-name', 'user-friendly-name', 'patient-reported-name', 'manufacturer-name', 'model-name', 'other']),
  _type: ElementSchema.optional(),
})
export type DeviceDeviceName = z.infer<typeof DeviceDeviceNameSchema>

/**
 * The capabilities supported on a  device, the standards to which the device conforms for a particular purpose, and used for the communication
 */
export const DeviceSpecializationSchema = BackboneElementSchema.extend({
  systemType: CodeableConceptSchema,
  version: z.string().optional(),
  _version: ElementSchema.optional(),
})
export type DeviceSpecialization = z.infer<typeof DeviceSpecializationSchema>

/**
 * The actual design of the device or software version running on the device
 */
export const DeviceVersionSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  component: IdentifierSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type DeviceVersion = z.infer<typeof DeviceVersionSchema>

/**
 * The actual configuration settings of a device as it actually operates, e.g., regulation status, time properties
 */
export const DevicePropertySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueQuantity: z.array(QuantitySchema).optional(),
  valueCode: z.array(CodeableConceptSchema).optional(),
})
export type DeviceProperty = z.infer<typeof DevicePropertySchema>

/**
 * A type of a manufactured item that is used in the provision of healthcare without being substantially changed through that activity. The device may be a medical or non-medical device.
 */
export const DeviceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Device'),
  identifier: z.array(IdentifierSchema).optional(),
  definition: ReferenceSchema.optional(),
  udiCarrier: z.array(DeviceUdiCarrierSchema).optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error', 'unknown']).optional(),
  _status: ElementSchema.optional(),
  statusReason: z.array(CodeableConceptSchema).optional(),
  distinctIdentifier: z.string().optional(),
  _distinctIdentifier: ElementSchema.optional(),
  manufacturer: z.string().optional(),
  _manufacturer: ElementSchema.optional(),
  manufactureDate: z.string().optional(),
  _manufactureDate: ElementSchema.optional(),
  expirationDate: z.string().optional(),
  _expirationDate: ElementSchema.optional(),
  lotNumber: z.string().optional(),
  _lotNumber: ElementSchema.optional(),
  serialNumber: z.string().optional(),
  _serialNumber: ElementSchema.optional(),
  deviceName: z.array(DeviceDeviceNameSchema).optional(),
  modelNumber: z.string().optional(),
  _modelNumber: ElementSchema.optional(),
  partNumber: z.string().optional(),
  _partNumber: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  specialization: z.array(DeviceSpecializationSchema).optional(),
  version: z.array(DeviceVersionSchema).optional(),
  property: z.array(DevicePropertySchema).optional(),
  patient: ReferenceSchema.optional(),
  owner: ReferenceSchema.optional(),
  contact: z.array(ContactPointSchema).optional(),
  location: ReferenceSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  safety: z.array(CodeableConceptSchema).optional(),
  parent: ReferenceSchema.optional(),
})
export type Device = z.infer<typeof DeviceSchema>

/**
 * The product's nutritional information expressed by the nutrients
 * Note: This is a business identifier, not a resource identifier (see [discussion](resource.html#identifiers)).  It is best practice for the identifier to only appear on a single resource instance, however business practices may occasionally dictate that multiple resource instances with the same identifier can exist - possibly even with different resource types.  For example, multiple Patient and a Person resource instance might share the same social insurance number.
 */
export const NutritionProductNutrientSchema = BackboneElementSchema.extend({
  item: CodeableReferenceSchema.optional(),
  amount: z.array(RatioSchema).optional(),
})
export type NutritionProductNutrient = z.infer<typeof NutritionProductNutrientSchema>

/**
 * Ingredients contained in this product
 */
export const NutritionProductIngredientSchema = BackboneElementSchema.extend({
  item: CodeableReferenceSchema,
  amount: z.array(RatioSchema).optional(),
})
export type NutritionProductIngredient = z.infer<typeof NutritionProductIngredientSchema>

/**
 * Specifies descriptive properties of the nutrition product
 */
export const NutritionProductProductCharacteristicSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueBase64Binary: z.string().optional(),
  _valueBase64Binary: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
})
export type NutritionProductProductCharacteristic = z.infer<typeof NutritionProductProductCharacteristicSchema>

/**
 * One or several physical instances or occurrences of the nutrition product
 * Conveys instance-level information about this product item. One or several physical, countable instances or occurrences of the product.
 */
export const NutritionProductInstanceSchema = BackboneElementSchema.extend({
  quantity: QuantitySchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  lotNumber: z.string().optional(),
  _lotNumber: ElementSchema.optional(),
  expiry: z.string().optional(),
  _expiry: ElementSchema.optional(),
  useBy: z.string().optional(),
  _useBy: ElementSchema.optional(),
})
export type NutritionProductInstance = z.infer<typeof NutritionProductInstanceSchema>

/**
 * A food or fluid product that is consumed by patients.
 */
export const NutritionProductSchema = DomainResourceSchema.extend({
  resourceType: z.literal('NutritionProduct'),
  status: z.enum(['active', 'inactive', 'entered-in-error']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema.optional(),
  manufacturer: z.array(ReferenceSchema).optional(),
  nutrient: z.array(NutritionProductNutrientSchema).optional(),
  ingredient: z.array(NutritionProductIngredientSchema).optional(),
  knownAllergen: z.array(CodeableReferenceSchema).optional(),
  productCharacteristic: z.array(NutritionProductProductCharacteristicSchema).optional(),
  instance: NutritionProductInstanceSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type NutritionProduct = z.infer<typeof NutritionProductSchema>

/**
 * Base StructureDefinition for unsignedInt type: An integer with a value that is not negative (e.g. >= 0)
 */
export const unsignedIntSchema = integerSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
})
export type unsignedInt = z.infer<typeof unsignedIntSchema>

/**
 * Policies covered by this consent
 * The references to the policies that are included in this consent scope. Policies may be organizational, but are often defined jurisdictionally, or in law.
 */
export const ConsentPolicySchema = BackboneElementSchema.extend({
  authority: z.string().optional(),
  _authority: ElementSchema.optional(),
  uri: z.string().optional(),
  _uri: ElementSchema.optional(),
})
export type ConsentPolicy = z.infer<typeof ConsentPolicySchema>

/**
 * Consent Verified by patient or family
 * Whether a treatment instruction (e.g. artificial respiration yes or no) was verified with the patient, his/her family or another authorized person.
 */
export const ConsentVerificationSchema = BackboneElementSchema.extend({
  verified: z.boolean(),
  _verified: ElementSchema.optional(),
  verifiedWith: ReferenceSchema.optional(),
  verificationDate: z.string().optional(),
  _verificationDate: ElementSchema.optional(),
})
export type ConsentVerification = z.infer<typeof ConsentVerificationSchema>

/**
 * Who|what controlled by this rule (or group, by role)
 * Who or what is controlled by this rule. Use group to identify a set of actors by some property they share (e.g. 'admitting officers').
 */
export const ConsentProvisionActorSchema = BackboneElementSchema.extend({
  role: CodeableConceptSchema,
  reference: ReferenceSchema,
})
export type ConsentProvisionActor = z.infer<typeof ConsentProvisionActorSchema>

/**
 * Data controlled by this rule
 * The resources controlled by this rule if specific resources are referenced.
 */
export const ConsentProvisionDataSchema = BackboneElementSchema.extend({
  meaning: z.enum(['instance', 'related', 'dependents', 'authoredby']),
  _meaning: ElementSchema.optional(),
  reference: ReferenceSchema,
})
export type ConsentProvisionData = z.infer<typeof ConsentProvisionDataSchema>

/**
 * Constraints to the base Consent.policyRule
 * An exception to the base policy of this consent. An exception can be an addition or removal of access permissions.
 */
export interface ConsentProvision extends BackboneElement {
  type?: ('deny'|'permit') | undefined
  _type?: Element | undefined
  period?: Period | undefined
  actor?: ConsentProvisionActor[] | undefined
  action?: CodeableConcept[] | undefined
  securityLabel?: Coding[] | undefined
  purpose?: Coding[] | undefined
  class?: Coding[] | undefined
  code?: CodeableConcept[] | undefined
  dataPeriod?: Period | undefined
  data?: ConsentProvisionData[] | undefined
  provision?: ConsentProvision[] | undefined
}

export const ConsentProvisionSchema: z.ZodType<ConsentProvision> = z.lazy(() =>
  BackboneElementSchema.extend({
    type: z.enum(['deny', 'permit']).optional(),
      _type: ElementSchema.optional(),
    period: PeriodSchema.optional(),
    actor: z.array(ConsentProvisionActorSchema).optional(),
    action: z.array(CodeableConceptSchema).optional(),
    securityLabel: z.array(CodingSchema).optional(),
    purpose: z.array(CodingSchema).optional(),
    class: z.array(CodingSchema).optional(),
    code: z.array(CodeableConceptSchema).optional(),
    dataPeriod: PeriodSchema.optional(),
    data: z.array(ConsentProvisionDataSchema).optional(),
    provision: z.lazy(() => z.array(ConsentProvisionSchema)).optional(),
  })
)

/**
 * A record of a healthcare consumer’s  choices, which permits or denies identified recipient(s) or recipient role(s) to perform one or more actions within a given policy context, for specific purposes and periods of time.
 */
export const ConsentSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Consent'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'proposed', 'active', 'rejected', 'inactive', 'entered-in-error']),
  _status: ElementSchema.optional(),
  scope: CodeableConceptSchema,
  category: z.array(CodeableConceptSchema),
  patient: ReferenceSchema.optional(),
  dateTime: z.string().optional(),
  _dateTime: ElementSchema.optional(),
  performer: z.array(ReferenceSchema).optional(),
  organization: z.array(ReferenceSchema).optional(),
  sourceAttachment: AttachmentSchema.optional(),
  sourceReference: ReferenceSchema.optional(),
  policy: z.array(ConsentPolicySchema).optional(),
  policyRule: CodeableConceptSchema.optional(),
  verification: z.array(ConsentVerificationSchema).optional(),
  provision: ConsentProvisionSchema.optional(),
})
export type Consent = z.infer<typeof ConsentSchema>

/**
 * A product specific contact, person (in a role), or an organization
 */
export const MedicinalProductDefinitionContactSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  contact: ReferenceSchema,
})
export type MedicinalProductDefinitionContact = z.infer<typeof MedicinalProductDefinitionContactSchema>

/**
 * Coding words or phrases of the name
 */
export const MedicinalProductDefinitionNameNamePartSchema = BackboneElementSchema.extend({
  part: z.string(),
  _part: ElementSchema.optional(),
  type: CodeableConceptSchema,
})
export type MedicinalProductDefinitionNameNamePart = z.infer<typeof MedicinalProductDefinitionNameNamePartSchema>

/**
 * Country and jurisdiction where the name applies
 * Country and jurisdiction where the name applies, and associated language.
 */
export const MedicinalProductDefinitionNameCountryLanguageSchema = BackboneElementSchema.extend({
  country: CodeableConceptSchema,
  jurisdiction: CodeableConceptSchema.optional(),
  language: CodeableConceptSchema,
})
export type MedicinalProductDefinitionNameCountryLanguage = z.infer<typeof MedicinalProductDefinitionNameCountryLanguageSchema>

/**
 * The product's name, including full name and possibly coded parts
 */
export const MedicinalProductDefinitionNameSchema = BackboneElementSchema.extend({
  productName: z.string(),
  _productName: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  namePart: z.array(MedicinalProductDefinitionNameNamePartSchema).optional(),
  countryLanguage: z.array(MedicinalProductDefinitionNameCountryLanguageSchema).optional(),
})
export type MedicinalProductDefinitionName = z.infer<typeof MedicinalProductDefinitionNameSchema>

/**
 * Reference to another product, e.g. for linking authorised to investigational product
 * Reference to another product, e.g. for linking authorised to investigational product, or a virtual product.
 */
export const MedicinalProductDefinitionCrossReferenceSchema = BackboneElementSchema.extend({
  product: CodeableReferenceSchema,
  type: CodeableConceptSchema.optional(),
})
export type MedicinalProductDefinitionCrossReference = z.infer<typeof MedicinalProductDefinitionCrossReferenceSchema>

/**
 * A manufacturing or administrative process for the medicinal product
 * A manufacturing or administrative process or step associated with (or performed on) the medicinal product.
 */
export const MedicinalProductDefinitionOperationSchema = BackboneElementSchema.extend({
  type: CodeableReferenceSchema.optional(),
  effectiveDate: PeriodSchema.optional(),
  organization: z.array(ReferenceSchema).optional(),
  confidentialityIndicator: CodeableConceptSchema.optional(),
})
export type MedicinalProductDefinitionOperation = z.infer<typeof MedicinalProductDefinitionOperationSchema>

/**
 * Key product features such as "sugar free", "modified release"
 * Allows the key product features to be recorded, such as "sugar free", "modified release", "parallel import".
 */
export const MedicinalProductDefinitionCharacteristicSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
})
export type MedicinalProductDefinitionCharacteristic = z.infer<typeof MedicinalProductDefinitionCharacteristicSchema>

/**
 * Detailed definition of a medicinal product, typically for uses other than direct patient care (e.g. regulatory use, drug catalogs, to support prescribing, adverse events management etc.).
 */
export const MedicinalProductDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicinalProductDefinition'),
  identifier: z.array(IdentifierSchema).optional(),
  type: CodeableConceptSchema.optional(),
  domain: CodeableConceptSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  status: CodeableConceptSchema.optional(),
  statusDate: z.string().optional(),
  _statusDate: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  combinedPharmaceuticalDoseForm: CodeableConceptSchema.optional(),
  route: z.array(CodeableConceptSchema).optional(),
  indication: z.string().optional(),
  _indication: ElementSchema.optional(),
  legalStatusOfSupply: CodeableConceptSchema.optional(),
  additionalMonitoringIndicator: CodeableConceptSchema.optional(),
  specialMeasures: z.array(CodeableConceptSchema).optional(),
  pediatricUseIndicator: CodeableConceptSchema.optional(),
  classification: z.array(CodeableConceptSchema).optional(),
  marketingStatus: z.array(MarketingStatusSchema).optional(),
  packagedMedicinalProduct: z.array(CodeableConceptSchema).optional(),
  ingredient: z.array(CodeableConceptSchema).optional(),
  impurity: z.array(CodeableReferenceSchema).optional(),
  attachedDocument: z.array(ReferenceSchema).optional(),
  masterFile: z.array(ReferenceSchema).optional(),
  contact: z.array(MedicinalProductDefinitionContactSchema).optional(),
  clinicalTrial: z.array(ReferenceSchema).optional(),
  code: z.array(CodingSchema).optional(),
  name: z.array(MedicinalProductDefinitionNameSchema),
  crossReference: z.array(MedicinalProductDefinitionCrossReferenceSchema).optional(),
  operation: z.array(MedicinalProductDefinitionOperationSchema).optional(),
  characteristic: z.array(MedicinalProductDefinitionCharacteristicSchema).optional(),
})
export type MedicinalProductDefinition = z.infer<typeof MedicinalProductDefinitionSchema>

/**
 * Message payload
 * Text, attachment(s), or resource(s) that was communicated to the recipient.
 */
export const CommunicationPayloadSchema = BackboneElementSchema.extend({
  contentString: z.string().optional(),
  _contentString: ElementSchema.optional(),
  contentAttachment: AttachmentSchema.optional(),
  contentReference: ReferenceSchema.optional(),
})
export type CommunicationPayload = z.infer<typeof CommunicationPayloadSchema>

/**
 * An occurrence of information being transmitted; e.g. an alert that was sent to a responsible provider, a public health agency that was notified about a reportable condition.
 */
export const CommunicationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Communication'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  inResponseTo: z.array(ReferenceSchema).optional(),
  status: z.enum(['preparation', 'in-progress', 'not-done', 'on-hold', 'stopped', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  medium: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema.optional(),
  topic: CodeableConceptSchema.optional(),
  about: z.array(ReferenceSchema).optional(),
  encounter: ReferenceSchema.optional(),
  sent: z.string().optional(),
  _sent: ElementSchema.optional(),
  received: z.string().optional(),
  _received: ElementSchema.optional(),
  recipient: z.array(ReferenceSchema).optional(),
  sender: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  payload: z.array(CommunicationPayloadSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type Communication = z.infer<typeof CommunicationSchema>

/**
 * The Library resource is a general-purpose container for knowledge asset definitions. It can be used to describe and expose existing knowledge assets such as logic libraries and information model descriptions, as well as to describe a collection of knowledge assets.
 */
export const LibrarySchema = DomainResourceSchema.extend({
  resourceType: z.literal('Library'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  subtitle: z.string().optional(),
  _subtitle: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  type: CodeableConceptSchema,
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  usage: z.string().optional(),
  _usage: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  topic: z.array(CodeableConceptSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  parameter: z.array(ParameterDefinitionSchema).optional(),
  dataRequirement: z.array(DataRequirementSchema).optional(),
  content: z.array(AttachmentSchema).optional(),
})
export type Library = z.infer<typeof LibrarySchema>

/**
 * Structure Definition used by this map
 * A structure definition used by this map. The structure definition may describe instances that are converted, or the instances that are produced.
 * It is not necessary for a structure map to identify any dependent structures, though not listing them may restrict its usefulness.
 */
export const StructureMapStructureSchema = BackboneElementSchema.extend({
  url: z.string(),
  _url: ElementSchema.optional(),
  mode: z.enum(['source', 'queried', 'target', 'produced']),
  _mode: ElementSchema.optional(),
  alias: z.string().optional(),
  _alias: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
})
export type StructureMapStructure = z.infer<typeof StructureMapStructureSchema>

/**
 * Named instance provided when invoking the map
 * A name assigned to an instance of data. The instance must be provided when the mapping is invoked.
 * If no inputs are named, then the entry mappings are type based.
 */
export const StructureMapGroupInputSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  type: z.string().optional(),
  _type: ElementSchema.optional(),
  mode: z.enum(['source', 'target']),
  _mode: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
})
export type StructureMapGroupInput = z.infer<typeof StructureMapGroupInputSchema>

/**
 * Source inputs to the mapping
 */
export const StructureMapGroupRuleSourceSchema = BackboneElementSchema.extend({
  context: z.string(),
  _context: ElementSchema.optional(),
  min: z.number().optional(),
  _min: ElementSchema.optional(),
  max: z.string().optional(),
  _max: ElementSchema.optional(),
  type: z.string().optional(),
  _type: ElementSchema.optional(),
  defaultValueBase64Binary: z.string().optional(),
  _defaultValueBase64Binary: ElementSchema.optional(),
  defaultValueBoolean: z.boolean().optional(),
  _defaultValueBoolean: ElementSchema.optional(),
  defaultValueCanonical: z.string().optional(),
  _defaultValueCanonical: ElementSchema.optional(),
  defaultValueCode: z.string().optional(),
  _defaultValueCode: ElementSchema.optional(),
  defaultValueDate: z.string().optional(),
  _defaultValueDate: ElementSchema.optional(),
  defaultValueDateTime: z.string().optional(),
  _defaultValueDateTime: ElementSchema.optional(),
  defaultValueDecimal: z.number().optional(),
  _defaultValueDecimal: ElementSchema.optional(),
  defaultValueId: z.string().optional(),
  _defaultValueId: ElementSchema.optional(),
  defaultValueInstant: z.string().optional(),
  _defaultValueInstant: ElementSchema.optional(),
  defaultValueInteger: z.number().optional(),
  _defaultValueInteger: ElementSchema.optional(),
  defaultValueMarkdown: z.string().optional(),
  _defaultValueMarkdown: ElementSchema.optional(),
  defaultValueOid: z.string().optional(),
  _defaultValueOid: ElementSchema.optional(),
  defaultValuePositiveInt: z.number().optional(),
  _defaultValuePositiveInt: ElementSchema.optional(),
  defaultValueString: z.string().optional(),
  _defaultValueString: ElementSchema.optional(),
  defaultValueTime: z.string().optional(),
  _defaultValueTime: ElementSchema.optional(),
  defaultValueUnsignedInt: z.number().optional(),
  _defaultValueUnsignedInt: ElementSchema.optional(),
  defaultValueUri: z.string().optional(),
  _defaultValueUri: ElementSchema.optional(),
  defaultValueUrl: z.string().optional(),
  _defaultValueUrl: ElementSchema.optional(),
  defaultValueUuid: z.string().optional(),
  _defaultValueUuid: ElementSchema.optional(),
  defaultValueAddress: AddressSchema.optional(),
  defaultValueAge: AgeSchema.optional(),
  defaultValueAnnotation: AnnotationSchema.optional(),
  defaultValueAttachment: AttachmentSchema.optional(),
  defaultValueCodeableConcept: CodeableConceptSchema.optional(),
  defaultValueCoding: CodingSchema.optional(),
  defaultValueContactPoint: ContactPointSchema.optional(),
  defaultValueCount: CountSchema.optional(),
  defaultValueDistance: DistanceSchema.optional(),
  defaultValueDuration: DurationSchema.optional(),
  defaultValueHumanName: HumanNameSchema.optional(),
  defaultValueIdentifier: IdentifierSchema.optional(),
  defaultValueMoney: MoneySchema.optional(),
  defaultValuePeriod: PeriodSchema.optional(),
  defaultValueQuantity: QuantitySchema.optional(),
  defaultValueRange: RangeSchema.optional(),
  defaultValueRatio: RatioSchema.optional(),
  defaultValueReference: ReferenceSchema.optional(),
  defaultValueSampledData: SampledDataSchema.optional(),
  defaultValueSignature: SignatureSchema.optional(),
  defaultValueTiming: TimingSchema.optional(),
  defaultValueContactDetail: ContactDetailSchema.optional(),
  defaultValueContributor: ContributorSchema.optional(),
  defaultValueDataRequirement: DataRequirementSchema.optional(),
  defaultValueExpression: ExpressionSchema.optional(),
  defaultValueParameterDefinition: ParameterDefinitionSchema.optional(),
  defaultValueRelatedArtifact: RelatedArtifactSchema.optional(),
  defaultValueTriggerDefinition: TriggerDefinitionSchema.optional(),
  defaultValueUsageContext: UsageContextSchema.optional(),
  defaultValueDosage: DosageSchema.optional(),
  defaultValueMeta: MetaSchema.optional(),
  element: z.string().optional(),
  _element: ElementSchema.optional(),
  listMode: z.enum(['first', 'not_first', 'last', 'not_last', 'only_one']).optional(),
  _listMode: ElementSchema.optional(),
  variable: z.string().optional(),
  _variable: ElementSchema.optional(),
  condition: z.string().optional(),
  _condition: ElementSchema.optional(),
  check: z.string().optional(),
  _check: ElementSchema.optional(),
  logMessage: z.string().optional(),
  _logMessage: ElementSchema.optional(),
})
export type StructureMapGroupRuleSource = z.infer<typeof StructureMapGroupRuleSourceSchema>

/**
 * Parameters to the transform
 */
export const StructureMapGroupRuleTargetParameterSchema = BackboneElementSchema.extend({
  valueId: z.string().optional(),
  _valueId: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
})
export type StructureMapGroupRuleTargetParameter = z.infer<typeof StructureMapGroupRuleTargetParameterSchema>

/**
 * Content to create because of this mapping rule
 */
export const StructureMapGroupRuleTargetSchema = BackboneElementSchema.extend({
  context: z.string().optional(),
  _context: ElementSchema.optional(),
  contextType: z.enum(['type', 'variable']).optional(),
  _contextType: ElementSchema.optional(),
  element: z.string().optional(),
  _element: ElementSchema.optional(),
  variable: z.string().optional(),
  _variable: ElementSchema.optional(),
  listMode: z.array(z.enum(['first', 'share', 'last', 'collate'])).optional(),
  _listMode: ElementSchema.optional(),
  listRuleId: z.string().optional(),
  _listRuleId: ElementSchema.optional(),
  transform: z.enum(['create', 'copy', 'truncate', 'escape', 'cast', 'append', 'translate', 'reference', 'dateOp', 'uuid', 'pointer', 'evaluate', 'cc', 'c', 'qty', 'id', 'cp']).optional(),
  _transform: ElementSchema.optional(),
  parameter: z.array(StructureMapGroupRuleTargetParameterSchema).optional(),
})
export type StructureMapGroupRuleTarget = z.infer<typeof StructureMapGroupRuleTargetSchema>

/**
 * Which other rules to apply in the context of this rule
 */
export const StructureMapGroupRuleDependentSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  variable: z.array(z.string()),
  _variable: ElementSchema.optional(),
})
export type StructureMapGroupRuleDependent = z.infer<typeof StructureMapGroupRuleDependentSchema>

/**
 * Transform Rule from source to target
 */
export interface StructureMapGroupRule extends BackboneElement {
  name: string
  _name?: Element | undefined
  source: StructureMapGroupRuleSource[]
  target?: StructureMapGroupRuleTarget[] | undefined
  rule?: StructureMapGroupRule[] | undefined
  dependent?: StructureMapGroupRuleDependent[] | undefined
  documentation?: string | undefined
  _documentation?: Element | undefined
}

export const StructureMapGroupRuleSchema: z.ZodType<StructureMapGroupRule> = z.lazy(() =>
  BackboneElementSchema.extend({
    name: z.string(),
      _name: ElementSchema.optional(),
    source: z.array(StructureMapGroupRuleSourceSchema),
    target: z.array(StructureMapGroupRuleTargetSchema).optional(),
    rule: z.lazy(() => z.array(StructureMapGroupRuleSchema)).optional(),
    dependent: z.array(StructureMapGroupRuleDependentSchema).optional(),
    documentation: z.string().optional(),
      _documentation: ElementSchema.optional(),
  })
)

/**
 * Named sections for reader convenience
 * Organizes the mapping into manageable chunks for human review/ease of maintenance.
 */
export const StructureMapGroupSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  extends: z.string().optional(),
  _extends: ElementSchema.optional(),
  typeMode: z.enum(['none', 'types', 'type-and-types']),
  _typeMode: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  input: z.array(StructureMapGroupInputSchema),
  rule: z.array(StructureMapGroupRuleSchema),
})
export type StructureMapGroup = z.infer<typeof StructureMapGroupSchema>

/**
 * A Map of relationships between 2 structures that can be used to transform data.
 */
export const StructureMapSchema = DomainResourceSchema.extend({
  resourceType: z.literal('StructureMap'),
  url: z.string(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  structure: z.array(StructureMapStructureSchema).optional(),
  import: z.array(z.string()).optional(),
  _import: ElementSchema.optional(),
  group: z.array(StructureMapGroupSchema),
})
export type StructureMap = z.infer<typeof StructureMapSchema>

/**
 * Constraints on fulfillment tasks
 * If the Task.focus is a request resource and the task is seeking fulfillment (i.e. is asking for the request to be actioned), this element identifies any limitations on what parts of the referenced request should be actioned.
 */
export const TaskRestrictionSchema = BackboneElementSchema.extend({
  repetitions: z.number().optional(),
  _repetitions: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  recipient: z.array(ReferenceSchema).optional(),
})
export type TaskRestriction = z.infer<typeof TaskRestrictionSchema>

/**
 * Information used to perform task
 * Additional information that may be needed in the execution of the task.
 */
export const TaskInputSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueBase64Binary: z.string().optional(),
  _valueBase64Binary: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueCanonical: z.string().optional(),
  _valueCanonical: ElementSchema.optional(),
  valueCode: z.string().optional(),
  _valueCode: ElementSchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
  valueId: z.string().optional(),
  _valueId: ElementSchema.optional(),
  valueInstant: z.string().optional(),
  _valueInstant: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueMarkdown: z.string().optional(),
  _valueMarkdown: ElementSchema.optional(),
  valueOid: z.string().optional(),
  _valueOid: ElementSchema.optional(),
  valuePositiveInt: z.number().optional(),
  _valuePositiveInt: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueUnsignedInt: z.number().optional(),
  _valueUnsignedInt: ElementSchema.optional(),
  valueUri: z.string().optional(),
  _valueUri: ElementSchema.optional(),
  valueUrl: z.string().optional(),
  _valueUrl: ElementSchema.optional(),
  valueUuid: z.string().optional(),
  _valueUuid: ElementSchema.optional(),
  valueAddress: AddressSchema.optional(),
  valueAge: AgeSchema.optional(),
  valueAnnotation: AnnotationSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueCoding: CodingSchema.optional(),
  valueContactPoint: ContactPointSchema.optional(),
  valueCount: CountSchema.optional(),
  valueDistance: DistanceSchema.optional(),
  valueDuration: DurationSchema.optional(),
  valueHumanName: HumanNameSchema.optional(),
  valueIdentifier: IdentifierSchema.optional(),
  valueMoney: MoneySchema.optional(),
  valuePeriod: PeriodSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  valueSampledData: SampledDataSchema.optional(),
  valueSignature: SignatureSchema.optional(),
  valueTiming: TimingSchema.optional(),
  valueContactDetail: ContactDetailSchema.optional(),
  valueContributor: ContributorSchema.optional(),
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueDosage: DosageSchema.optional(),
  valueMeta: MetaSchema.optional(),
})
export type TaskInput = z.infer<typeof TaskInputSchema>

/**
 * Information produced as part of task
 * Outputs produced by the Task.
 */
export const TaskOutputSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueBase64Binary: z.string().optional(),
  _valueBase64Binary: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueCanonical: z.string().optional(),
  _valueCanonical: ElementSchema.optional(),
  valueCode: z.string().optional(),
  _valueCode: ElementSchema.optional(),
  valueDate: z.string().optional(),
  _valueDate: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
  valueId: z.string().optional(),
  _valueId: ElementSchema.optional(),
  valueInstant: z.string().optional(),
  _valueInstant: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueMarkdown: z.string().optional(),
  _valueMarkdown: ElementSchema.optional(),
  valueOid: z.string().optional(),
  _valueOid: ElementSchema.optional(),
  valuePositiveInt: z.number().optional(),
  _valuePositiveInt: ElementSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueUnsignedInt: z.number().optional(),
  _valueUnsignedInt: ElementSchema.optional(),
  valueUri: z.string().optional(),
  _valueUri: ElementSchema.optional(),
  valueUrl: z.string().optional(),
  _valueUrl: ElementSchema.optional(),
  valueUuid: z.string().optional(),
  _valueUuid: ElementSchema.optional(),
  valueAddress: AddressSchema.optional(),
  valueAge: AgeSchema.optional(),
  valueAnnotation: AnnotationSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueCoding: CodingSchema.optional(),
  valueContactPoint: ContactPointSchema.optional(),
  valueCount: CountSchema.optional(),
  valueDistance: DistanceSchema.optional(),
  valueDuration: DurationSchema.optional(),
  valueHumanName: HumanNameSchema.optional(),
  valueIdentifier: IdentifierSchema.optional(),
  valueMoney: MoneySchema.optional(),
  valuePeriod: PeriodSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  valueSampledData: SampledDataSchema.optional(),
  valueSignature: SignatureSchema.optional(),
  valueTiming: TimingSchema.optional(),
  valueContactDetail: ContactDetailSchema.optional(),
  valueContributor: ContributorSchema.optional(),
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueDosage: DosageSchema.optional(),
  valueMeta: MetaSchema.optional(),
})
export type TaskOutput = z.infer<typeof TaskOutputSchema>

/**
 * A task to be performed.
 */
export const TaskSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Task'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.string().optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.string().optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  groupIdentifier: IdentifierSchema.optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['draft', 'requested', 'received', 'accepted', 'rejected', 'ready', 'cancelled', 'in-progress', 'on-hold', 'failed', 'completed', 'entered-in-error']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  businessStatus: CodeableConceptSchema.optional(),
  intent: z.enum(['unknown', 'proposal', 'plan', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  focus: ReferenceSchema.optional(),
  for: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  executionPeriod: PeriodSchema.optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  lastModified: z.string().optional(),
  _lastModified: ElementSchema.optional(),
  requester: ReferenceSchema.optional(),
  performerType: z.array(CodeableConceptSchema).optional(),
  owner: ReferenceSchema.optional(),
  location: ReferenceSchema.optional(),
  reasonCode: CodeableConceptSchema.optional(),
  reasonReference: ReferenceSchema.optional(),
  insurance: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  relevantHistory: z.array(ReferenceSchema).optional(),
  restriction: TaskRestrictionSchema.optional(),
  input: z.array(TaskInputSchema).optional(),
  output: z.array(TaskOutputSchema).optional(),
})
export type Task = z.infer<typeof TaskSchema>

/**
 * Characteristic
 */
export const EvidenceReportSubjectCharacteristicSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  valueReference: ReferenceSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  exclude: z.boolean().optional(),
  _exclude: ElementSchema.optional(),
  period: PeriodSchema.optional(),
})
export type EvidenceReportSubjectCharacteristic = z.infer<typeof EvidenceReportSubjectCharacteristicSchema>

/**
 * Focus of the report
 * Specifies the subject or focus of the report. Answers "What is this report about?".
 * May be used as an expression for search queries and search results
 */
export const EvidenceReportSubjectSchema = BackboneElementSchema.extend({
  characteristic: z.array(EvidenceReportSubjectCharacteristicSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type EvidenceReportSubject = z.infer<typeof EvidenceReportSubjectSchema>

/**
 * Relationships to other compositions/documents
 * Relationships that this composition has with other compositions or documents that already exist.
 * A document is a version specific composition.
 */
export const EvidenceReportRelatesToSchema = BackboneElementSchema.extend({
  code: z.enum(['replaces', 'amends', 'appends', 'transforms', 'replacedWith', 'amendedWith', 'appendedWith', 'transformedWith']),
  _code: ElementSchema.optional(),
  targetIdentifier: IdentifierSchema.optional(),
  targetReference: ReferenceSchema.optional(),
})
export type EvidenceReportRelatesTo = z.infer<typeof EvidenceReportRelatesToSchema>

/**
 * Composition is broken into sections
 * The root of the sections that make up the composition.
 */
export interface EvidenceReportSection extends BackboneElement {
  title?: string | undefined
  _title?: Element | undefined
  focus?: CodeableConcept | undefined
  focusReference?: Reference | undefined
  author?: Reference[] | undefined
  text?: Narrative | undefined
  mode?: ('working'|'snapshot'|'changes') | undefined
  _mode?: Element | undefined
  orderedBy?: CodeableConcept | undefined
  entryClassifier?: CodeableConcept[] | undefined
  entryReference?: Reference[] | undefined
  entryQuantity?: Quantity[] | undefined
  emptyReason?: CodeableConcept | undefined
  section?: EvidenceReportSection[] | undefined
}

export const EvidenceReportSectionSchema: z.ZodType<EvidenceReportSection> = z.lazy(() =>
  BackboneElementSchema.extend({
    title: z.string().optional(),
      _title: ElementSchema.optional(),
    focus: CodeableConceptSchema.optional(),
    focusReference: ReferenceSchema.optional(),
    author: z.array(ReferenceSchema).optional(),
    text: NarrativeSchema.optional(),
    mode: z.enum(['working', 'snapshot', 'changes']).optional(),
      _mode: ElementSchema.optional(),
    orderedBy: CodeableConceptSchema.optional(),
    entryClassifier: z.array(CodeableConceptSchema).optional(),
    entryReference: z.array(ReferenceSchema).optional(),
    entryQuantity: z.array(QuantitySchema).optional(),
    emptyReason: CodeableConceptSchema.optional(),
    section: z.lazy(() => z.array(EvidenceReportSectionSchema)).optional(),
  })
)

/**
 * The EvidenceReport Resource is a specialized container for a collection of resources and codable concepts, adapted to support compositions of Evidence, EvidenceVariable, and Citation resources and related concepts.
 */
export const EvidenceReportSchema = DomainResourceSchema.extend({
  resourceType: z.literal('EvidenceReport'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  identifier: z.array(IdentifierSchema).optional(),
  relatedIdentifier: z.array(IdentifierSchema).optional(),
  citeAsReference: ReferenceSchema.optional(),
  citeAsMarkdown: z.string().optional(),
  _citeAsMarkdown: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  subject: EvidenceReportSubjectSchema,
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatesTo: z.array(EvidenceReportRelatesToSchema).optional(),
  section: z.array(EvidenceReportSectionSchema).optional(),
})
export type EvidenceReport = z.infer<typeof EvidenceReportSchema>

/**
 * Certification, licenses, or training pertaining to the provision of care
 * The official certifications, training, and licenses that authorize or otherwise pertain to the provision of care by the practitioner.  For example, a medical license issued by a medical board authorizing the practitioner to practice medicine within a certian locality.
 */
export const PractitionerQualificationSchema = BackboneElementSchema.extend({
  identifier: z.array(IdentifierSchema).optional(),
  code: CodeableConceptSchema,
  period: PeriodSchema.optional(),
  issuer: ReferenceSchema.optional(),
})
export type PractitionerQualification = z.infer<typeof PractitionerQualificationSchema>

/**
 * A person who is directly or indirectly involved in the provisioning of healthcare.
 */
export const PractitionerSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Practitioner'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  name: z.array(HumanNameSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  address: z.array(AddressSchema).optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  _gender: ElementSchema.optional(),
  birthDate: z.string().optional(),
  _birthDate: ElementSchema.optional(),
  photo: z.array(AttachmentSchema).optional(),
  qualification: z.array(PractitionerQualificationSchema).optional(),
  communication: z.array(CodeableConceptSchema).optional(),
})
export type Practitioner = z.infer<typeof PractitionerSchema>

/**
 * An organization that manufactures this ingredient
 * The organization(s) that manufacture this ingredient. Can be used to indicate:         1) Organizations we are aware of that manufacture this ingredient         2) Specific Manufacturer(s) currently being used         3) Set of organisations allowed to manufacture this ingredient for this product         Users must be clear on the application of context relevant to their use case.
 */
export const IngredientManufacturerSchema = BackboneElementSchema.extend({
  role: z.enum(['allowed', 'possible', 'actual']).optional(),
  _role: ElementSchema.optional(),
  manufacturer: ReferenceSchema,
})
export type IngredientManufacturer = z.infer<typeof IngredientManufacturerSchema>

/**
 * Strength expressed in terms of a reference substance
 * Strength expressed in terms of a reference substance. For when the ingredient strength is additionally expressed as equivalent to the strength of some other closely related substance (e.g. salt vs. base). Reference strength represents the strength (quantitative composition) of the active moiety of the active substance. There are situations when the active substance and active moiety are different, therefore both a strength and a reference strength are needed.
 */
export const IngredientSubstanceStrengthReferenceStrengthSchema = BackboneElementSchema.extend({
  substance: CodeableReferenceSchema.optional(),
  strengthRatio: RatioSchema.optional(),
  strengthRatioRange: RatioRangeSchema.optional(),
  measurementPoint: z.string().optional(),
  _measurementPoint: ElementSchema.optional(),
  country: z.array(CodeableConceptSchema).optional(),
})
export type IngredientSubstanceStrengthReferenceStrength = z.infer<typeof IngredientSubstanceStrengthReferenceStrengthSchema>

/**
 * The quantity of substance, per presentation, or per volume or mass, and type of quantity
 * The quantity of substance in the unit of presentation, or in the volume (or mass) of the single pharmaceutical product or manufactured item. The allowed repetitions do not represent different strengths, but are different representations - mathematically equivalent - of a single strength.
 */
export const IngredientSubstanceStrengthSchema = BackboneElementSchema.extend({
  presentationRatio: RatioSchema.optional(),
  presentationRatioRange: RatioRangeSchema.optional(),
  textPresentation: z.string().optional(),
  _textPresentation: ElementSchema.optional(),
  concentrationRatio: RatioSchema.optional(),
  concentrationRatioRange: RatioRangeSchema.optional(),
  textConcentration: z.string().optional(),
  _textConcentration: ElementSchema.optional(),
  measurementPoint: z.string().optional(),
  _measurementPoint: ElementSchema.optional(),
  country: z.array(CodeableConceptSchema).optional(),
  referenceStrength: z.array(IngredientSubstanceStrengthReferenceStrengthSchema).optional(),
})
export type IngredientSubstanceStrength = z.infer<typeof IngredientSubstanceStrengthSchema>

/**
 * The substance that comprises this ingredient
 */
export const IngredientSubstanceSchema = BackboneElementSchema.extend({
  code: CodeableReferenceSchema,
  strength: z.array(IngredientSubstanceStrengthSchema).optional(),
})
export type IngredientSubstance = z.infer<typeof IngredientSubstanceSchema>

/**
 * An ingredient of a manufactured item or pharmaceutical product.
 */
export const IngredientSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Ingredient'),
  identifier: IdentifierSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  for: z.array(ReferenceSchema).optional(),
  role: CodeableConceptSchema,
  function: z.array(CodeableConceptSchema).optional(),
  allergenicIndicator: z.boolean().optional(),
  _allergenicIndicator: ElementSchema.optional(),
  manufacturer: z.array(IngredientManufacturerSchema).optional(),
  substance: IngredientSubstanceSchema,
})
export type Ingredient = z.infer<typeof IngredientSchema>

/**
 * Provides guide for interpretation
 * Guidance on how to interpret the value by comparison to a normal or recommended range.  Multiple reference ranges are interpreted as an "OR".   In other words, to represent two distinct target populations, two `referenceRange` elements would be used.
 * Most observations only have one generic reference range. Systems MAY choose to restrict to only supplying the relevant reference range based on knowledge about the patient (e.g., specific to the patient's age, gender, weight and other factors), but this might not be possible or appropriate. Whenever more than one reference range is supplied, the differences between them SHOULD be provided in the reference range and/or age properties.
 */
export interface ObservationReferenceRange extends BackboneElement {
  low?: Quantity | undefined
  high?: Quantity | undefined
  type?: CodeableConcept | undefined
  appliesTo?: CodeableConcept[] | undefined
  age?: Range | undefined
  text?: string | undefined
  _text?: Element | undefined
}

export const ObservationReferenceRangeSchema: z.ZodType<ObservationReferenceRange> = z.lazy(() =>
  BackboneElementSchema.extend({
    low: QuantitySchema.optional(),
    high: QuantitySchema.optional(),
    type: CodeableConceptSchema.optional(),
    appliesTo: z.array(CodeableConceptSchema).optional(),
    age: RangeSchema.optional(),
    text: z.string().optional(),
      _text: ElementSchema.optional(),
  })
)

/**
 * Component results
 * Some observations have multiple component observations.  These component observations are expressed as separate code value pairs that share the same attributes.  Examples include systolic and diastolic component observations for blood pressure measurement and multiple component observations for genetics observations.
 * For a discussion on the ways Observations can be assembled in groups together see [Notes](observation.html#notes) below.
 */
export const ObservationComponentSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  valueQuantity: QuantitySchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueRange: RangeSchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueSampledData: SampledDataSchema.optional(),
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valuePeriod: PeriodSchema.optional(),
  dataAbsentReason: CodeableConceptSchema.optional(),
  interpretation: z.array(CodeableConceptSchema).optional(),
  referenceRange: z.lazy(() => z.array(ObservationReferenceRangeSchema)).optional(),
})
export type ObservationComponent = z.infer<typeof ObservationComponentSchema>

/**
 * Measurements and simple assertions made about a patient, device or other subject.
 */
export const ObservationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Observation'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema,
  subject: ReferenceSchema.optional(),
  focus: z.array(ReferenceSchema).optional(),
  encounter: ReferenceSchema.optional(),
  effectiveDateTime: z.string().optional(),
  _effectiveDateTime: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  effectiveTiming: TimingSchema.optional(),
  effectiveInstant: z.string().optional(),
  _effectiveInstant: ElementSchema.optional(),
  issued: z.string().optional(),
  _issued: ElementSchema.optional(),
  performer: z.array(ReferenceSchema).optional(),
  valueQuantity: QuantitySchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueRange: RangeSchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueSampledData: SampledDataSchema.optional(),
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valuePeriod: PeriodSchema.optional(),
  dataAbsentReason: CodeableConceptSchema.optional(),
  interpretation: z.array(CodeableConceptSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  bodySite: CodeableConceptSchema.optional(),
  method: CodeableConceptSchema.optional(),
  specimen: ReferenceSchema.optional(),
  device: ReferenceSchema.optional(),
  referenceRange: z.array(ObservationReferenceRangeSchema).optional(),
  hasMember: z.array(ReferenceSchema).optional(),
  derivedFrom: z.array(ReferenceSchema).optional(),
  component: z.array(ObservationComponentSchema).optional(),
})
export type Observation = z.infer<typeof ObservationSchema>

/**
 * Relationships to other documents
 * Relationships that this document has with other document references that already exist.
 * This element is labeled as a modifier because documents that append to other documents are incomplete on their own.
 */
export const DocumentReferenceRelatesToSchema = BackboneElementSchema.extend({
  code: z.enum(['replaces', 'transforms', 'signs', 'appends']),
  _code: ElementSchema.optional(),
  target: ReferenceSchema,
})
export type DocumentReferenceRelatesTo = z.infer<typeof DocumentReferenceRelatesToSchema>

/**
 * Document referenced
 * The document and format referenced. There may be multiple content element repetitions, each with a different format.
 */
export const DocumentReferenceContentSchema = BackboneElementSchema.extend({
  attachment: AttachmentSchema,
  format: CodingSchema.optional(),
})
export type DocumentReferenceContent = z.infer<typeof DocumentReferenceContentSchema>

/**
 * Clinical context of document
 * The clinical context in which the document was prepared.
 * These values are primarily added to help with searching for interesting/relevant documents.
 */
export const DocumentReferenceContextSchema = BackboneElementSchema.extend({
  encounter: z.array(ReferenceSchema).optional(),
  event: z.array(CodeableConceptSchema).optional(),
  period: PeriodSchema.optional(),
  facilityType: CodeableConceptSchema.optional(),
  practiceSetting: CodeableConceptSchema.optional(),
  sourcePatientInfo: ReferenceSchema.optional(),
  related: z.array(ReferenceSchema).optional(),
})
export type DocumentReferenceContext = z.infer<typeof DocumentReferenceContextSchema>

/**
 * A reference to a document of any kind for any purpose. Provides metadata about the document so that the document can be discovered and managed. The scope of a document is any seralized object with a mime-type, so includes formal patient centric documents (CDA), cliical notes, scanned paper, and non-patient specific documents like policy text.
 */
export const DocumentReferenceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DocumentReference'),
  masterIdentifier: IdentifierSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['current', 'superseded', 'entered-in-error']),
  _status: ElementSchema.optional(),
  docStatus: z.enum(['preliminary', 'final', 'amended', 'entered-in-error']).optional(),
  _docStatus: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  author: z.array(ReferenceSchema).optional(),
  authenticator: ReferenceSchema.optional(),
  custodian: ReferenceSchema.optional(),
  relatesTo: z.array(DocumentReferenceRelatesToSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  securityLabel: z.array(CodeableConceptSchema).optional(),
  content: z.array(DocumentReferenceContentSchema),
  context: DocumentReferenceContextSchema.optional(),
})
export type DocumentReference = z.infer<typeof DocumentReferenceSchema>

/**
 * A single issue associated with the action
 * An error, warning, or information message that results from a system action.
 */
export const OperationOutcomeIssueSchema = BackboneElementSchema.extend({
  severity: z.enum(['fatal', 'error', 'warning', 'information']),
  _severity: ElementSchema.optional(),
  code: z.enum(['invalid', 'structure', 'required', 'value', 'invariant', 'security', 'login', 'unknown', 'expired', 'forbidden', 'suppressed', 'processing', 'not-supported', 'duplicate', 'multiple-matches', 'not-found', 'deleted', 'too-long', 'code-invalid', 'extension', 'too-costly', 'business-rule', 'conflict', 'transient', 'lock-error', 'no-store', 'exception', 'timeout', 'incomplete', 'throttled', 'informational']),
  _code: ElementSchema.optional(),
  details: CodeableConceptSchema.optional(),
  diagnostics: z.string().optional(),
  _diagnostics: ElementSchema.optional(),
  location: z.array(z.string()).optional(),
  _location: ElementSchema.optional(),
  expression: z.array(z.string()).optional(),
  _expression: ElementSchema.optional(),
})
export type OperationOutcomeIssue = z.infer<typeof OperationOutcomeIssueSchema>

/**
 * A collection of error, warning, or information messages that result from a system action.
 */
export const OperationOutcomeSchema = DomainResourceSchema.extend({
  resourceType: z.literal('OperationOutcome'),
  issue: z.array(OperationOutcomeIssueSchema),
})
export type OperationOutcome = z.infer<typeof OperationOutcomeSchema>

/**
 * Who performed event
 * Indicates who or what performed the event.
 */
export const MedicationDispensePerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type MedicationDispensePerformer = z.infer<typeof MedicationDispensePerformerSchema>

/**
 * Whether a substitution was performed on the dispense
 * Indicates whether or not substitution was made as part of the dispense.  In some cases, substitution will be expected but does not happen, in other cases substitution is not expected but does happen.  This block explains what substitution did or did not happen and why.  If nothing is specified, substitution was not done.
 */
export const MedicationDispenseSubstitutionSchema = BackboneElementSchema.extend({
  wasSubstituted: z.boolean(),
  _wasSubstituted: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  reason: z.array(CodeableConceptSchema).optional(),
  responsibleParty: z.array(ReferenceSchema).optional(),
})
export type MedicationDispenseSubstitution = z.infer<typeof MedicationDispenseSubstitutionSchema>

/**
 * Indicates that a medication product is to be or has been dispensed for a named person/patient.  This includes a description of the medication product (supply) provided and the instructions for administering the medication.  The medication dispense is the result of a pharmacy system responding to a medication order.
 */
export const MedicationDispenseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicationDispense'),
  identifier: z.array(IdentifierSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['preparation', 'in-progress', 'cancelled', 'on-hold', 'completed', 'entered-in-error', 'stopped', 'declined', 'unknown']),
  _status: ElementSchema.optional(),
  statusReasonCodeableConcept: CodeableConceptSchema.optional(),
  statusReasonReference: ReferenceSchema.optional(),
  category: CodeableConceptSchema.optional(),
  medicationCodeableConcept: CodeableConceptSchema.optional(),
  medicationReference: ReferenceSchema.optional(),
  subject: ReferenceSchema.optional(),
  context: ReferenceSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  performer: z.array(MedicationDispensePerformerSchema).optional(),
  location: ReferenceSchema.optional(),
  authorizingPrescription: z.array(ReferenceSchema).optional(),
  type: CodeableConceptSchema.optional(),
  quantity: QuantitySchema.optional(),
  daysSupply: QuantitySchema.optional(),
  whenPrepared: z.string().optional(),
  _whenPrepared: ElementSchema.optional(),
  whenHandedOver: z.string().optional(),
  _whenHandedOver: ElementSchema.optional(),
  destination: ReferenceSchema.optional(),
  receiver: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  dosageInstruction: z.array(DosageSchema).optional(),
  substitution: MedicationDispenseSubstitutionSchema.optional(),
  detectedIssue: z.array(ReferenceSchema).optional(),
  eventHistory: z.array(ReferenceSchema).optional(),
})
export type MedicationDispense = z.infer<typeof MedicationDispenseSchema>

/**
 * The party(s) that are responsible for covering the payment of this account, and what order should they be applied to the account
 * Typically. this may be some form of insurance, internal charges, or self-pay.
 * Local or jurisdictional business rules may determine which coverage covers which types of billable items charged to the account, and in which order.
 */
export const AccountCoverageSchema = BackboneElementSchema.extend({
  coverage: ReferenceSchema,
  priority: z.number().optional(),
  _priority: ElementSchema.optional(),
})
export type AccountCoverage = z.infer<typeof AccountCoverageSchema>

/**
 * The parties ultimately responsible for balancing the Account
 * The parties responsible for balancing the account if other payment options fall short.
 */
export const AccountGuarantorSchema = BackboneElementSchema.extend({
  party: ReferenceSchema,
  onHold: z.boolean().optional(),
  _onHold: ElementSchema.optional(),
  period: PeriodSchema.optional(),
})
export type AccountGuarantor = z.infer<typeof AccountGuarantorSchema>

/**
 * A financial tool for tracking value accrued for a particular purpose.  In the healthcare field, used to track charges for a patient, cost centers, etc.
 */
export const AccountSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Account'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error', 'on-hold', 'unknown']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  subject: z.array(ReferenceSchema).optional(),
  servicePeriod: PeriodSchema.optional(),
  coverage: z.array(AccountCoverageSchema).optional(),
  owner: ReferenceSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  guarantor: z.array(AccountGuarantorSchema).optional(),
  partOf: ReferenceSchema.optional(),
})
export type Account = z.infer<typeof AccountSchema>

/**
 * The people who performed the procedure
 * Limited to "real" people rather than equipment.
 */
export const ProcedurePerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
  onBehalfOf: ReferenceSchema.optional(),
})
export type ProcedurePerformer = z.infer<typeof ProcedurePerformerSchema>

/**
 * Manipulated, implanted, or removed device
 * A device that is implanted, removed or otherwise manipulated (calibration, battery replacement, fitting a prosthesis, attaching a wound-vac, etc.) as a focal portion of the Procedure.
 */
export const ProcedureFocalDeviceSchema = BackboneElementSchema.extend({
  action: CodeableConceptSchema.optional(),
  manipulated: ReferenceSchema,
})
export type ProcedureFocalDevice = z.infer<typeof ProcedureFocalDeviceSchema>

/**
 * An action that is or was performed on or for a patient. This can be a physical intervention like an operation, or less invasive like long term services, counseling, or hypnotherapy.
 */
export const ProcedureSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Procedure'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['preparation', 'in-progress', 'not-done', 'on-hold', 'stopped', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  code: CodeableConceptSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  performedDateTime: z.string().optional(),
  _performedDateTime: ElementSchema.optional(),
  performedPeriod: PeriodSchema.optional(),
  performedString: z.string().optional(),
  _performedString: ElementSchema.optional(),
  performedAge: AgeSchema.optional(),
  performedRange: RangeSchema.optional(),
  recorder: ReferenceSchema.optional(),
  asserter: ReferenceSchema.optional(),
  performer: z.array(ProcedurePerformerSchema).optional(),
  location: ReferenceSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  reasonReference: z.array(ReferenceSchema).optional(),
  bodySite: z.array(CodeableConceptSchema).optional(),
  outcome: CodeableConceptSchema.optional(),
  report: z.array(ReferenceSchema).optional(),
  complication: z.array(CodeableConceptSchema).optional(),
  complicationDetail: z.array(ReferenceSchema).optional(),
  followUp: z.array(CodeableConceptSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  focalDevice: z.array(ProcedureFocalDeviceSchema).optional(),
  usedReference: z.array(ReferenceSchema).optional(),
  usedCode: z.array(CodeableConceptSchema).optional(),
})
export type Procedure = z.infer<typeof ProcedureSchema>

/**
 * Information on the possible cause of the event
 */
export const AdverseEventSuspectEntityCausalitySchema = BackboneElementSchema.extend({
  assessment: CodeableConceptSchema.optional(),
  productRelatedness: z.string().optional(),
  _productRelatedness: ElementSchema.optional(),
  author: ReferenceSchema.optional(),
  method: CodeableConceptSchema.optional(),
})
export type AdverseEventSuspectEntityCausality = z.infer<typeof AdverseEventSuspectEntityCausalitySchema>

/**
 * The suspected agent causing the adverse event
 * Describes the entity that is suspected to have caused the adverse event.
 */
export const AdverseEventSuspectEntitySchema = BackboneElementSchema.extend({
  instance: ReferenceSchema,
  causality: z.array(AdverseEventSuspectEntityCausalitySchema).optional(),
})
export type AdverseEventSuspectEntity = z.infer<typeof AdverseEventSuspectEntitySchema>

/**
 * Actual or  potential/avoided event causing unintended physical injury resulting from or contributed to by medical care, a research study or other healthcare setting factors that requires additional monitoring, treatment, or hospitalization, or that results in death.
 */
export const AdverseEventSchema = DomainResourceSchema.extend({
  resourceType: z.literal('AdverseEvent'),
  identifier: IdentifierSchema.optional(),
  actuality: z.enum(['actual', 'potential']),
  _actuality: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  event: CodeableConceptSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  detected: z.string().optional(),
  _detected: ElementSchema.optional(),
  recordedDate: z.string().optional(),
  _recordedDate: ElementSchema.optional(),
  resultingCondition: z.array(ReferenceSchema).optional(),
  location: ReferenceSchema.optional(),
  seriousness: CodeableConceptSchema.optional(),
  severity: CodeableConceptSchema.optional(),
  outcome: CodeableConceptSchema.optional(),
  recorder: ReferenceSchema.optional(),
  contributor: z.array(ReferenceSchema).optional(),
  suspectEntity: z.array(AdverseEventSuspectEntitySchema).optional(),
  subjectMedicalHistory: z.array(ReferenceSchema).optional(),
  referenceDocument: z.array(ReferenceSchema).optional(),
  study: z.array(ReferenceSchema).optional(),
})
export type AdverseEvent = z.infer<typeof AdverseEventSchema>
