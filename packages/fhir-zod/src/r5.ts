import { z } from 'zod'

/**
 * Base Type: Base definition for all types defined in FHIR type system.
 */
export const BaseSchema = z.object({
})
export type Base = z.infer<typeof BaseSchema>

/**
 * Element Type: Base definition for all elements in a resource.
 */
export const ElementSchema = BaseSchema.extend({
  id: z.string().optional(),
  _id: z.lazy(() => ElementSchema).optional(),
  extension: z.lazy(() => z.array(ExtensionSchema)).optional(),
})
export type Element = z.infer<typeof ElementSchema>

/**
 * DataType Type: The base class for all re-useable types defined as part of the FHIR Specification.
 */
export const DataTypeSchema = ElementSchema.extend({
})
export type DataType = z.infer<typeof DataTypeSchema>

/**
 * Coding Type: A reference to a code defined by a terminology system.
 */
export const CodingSchema = DataTypeSchema.extend({
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
 * Meta Type: The metadata about a resource. This is content in the resource that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.
 */
export const MetaSchema = DataTypeSchema.extend({
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
export const ResourceSchema = BaseSchema.extend({
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
 * Narrative Type: A human-readable summary of the resource conveying the essential clinical and business information for the resource.
 */
export const NarrativeSchema = DataTypeSchema.extend({
  status: z.enum(['generated', 'extensions', 'additional', 'empty']),
  _status: ElementSchema.optional(),
  div: z.string(),
  _div: ElementSchema.optional(),
})
export type Narrative = z.infer<typeof NarrativeSchema>

/**
 * Period Type: A time period defined by a start and end date and optionally time.
 */
export const PeriodSchema = DataTypeSchema.extend({
  start: z.string().optional(),
  _start: ElementSchema.optional(),
  end: z.string().optional(),
  _end: ElementSchema.optional(),
})
export type Period = z.infer<typeof PeriodSchema>

/**
 * Address Type: An address expressed using postal conventions (as opposed to GPS or other location definition formats).  This data type may be used to convey addresses for use in delivering mail as well as for visiting locations which might not be valid for mail delivery.  There are a variety of postal address formats defined around the world.
 * The ISO21090-codedString may be used to provide a coded representation of the contents of strings in an Address.
 */
export const AddressSchema = DataTypeSchema.extend({
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
 * Quantity Type: A measured amount (or an amount that can potentially be measured). Note that measured amounts include amounts that are not precisely quantified, including amounts involving arbitrary units and floating currencies.
 */
export const QuantitySchema = DataTypeSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
  comparator: z.enum(['<', '<=', '>=', '>', 'ad']).optional(),
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
 * Age Type: A duration of time during which an organism (or a process) has existed.
 */
export const AgeSchema = QuantitySchema.extend({
})
export type Age = z.infer<typeof AgeSchema>

/**
 * CodeableConcept Type: A concept that may be defined by a formal reference to a terminology or ontology or may be provided by text.
 */
export const CodeableConceptSchema = DataTypeSchema.extend({
  coding: z.array(CodingSchema).optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
})
export type CodeableConcept = z.infer<typeof CodeableConceptSchema>

/**
 * Identifier Type: An identifier - identifies some entity uniquely and unambiguously. Typically this is used for business identifiers.
 */
export const IdentifierSchema = DataTypeSchema.extend({
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
 * Reference Type: A reference from one resource to another.
 */
export const ReferenceSchema = DataTypeSchema.extend({
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
 * Annotation Type: A  text note which also  contains information about who made the statement and when.
 */
export const AnnotationSchema = DataTypeSchema.extend({
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
 * Attachment Type: For referring to data content defined in other formats.
 */
export const AttachmentSchema = DataTypeSchema.extend({
  contentType: z.string().optional(),
  _contentType: ElementSchema.optional(),
  language: z.string().optional(),
  _language: ElementSchema.optional(),
  data: z.string().optional(),
  _data: ElementSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  size: z.string().optional(),
  _size: ElementSchema.optional(),
  hash: z.string().optional(),
  _hash: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  creation: z.string().optional(),
  _creation: ElementSchema.optional(),
  height: z.number().optional(),
  _height: ElementSchema.optional(),
  width: z.number().optional(),
  _width: ElementSchema.optional(),
  frames: z.number().optional(),
  _frames: ElementSchema.optional(),
  duration: z.number().optional(),
  _duration: ElementSchema.optional(),
  pages: z.number().optional(),
  _pages: ElementSchema.optional(),
})
export type Attachment = z.infer<typeof AttachmentSchema>

/**
 * CodeableReference Type: A reference to a resource (by instance), or instead, a reference to a concept defined in a terminology or ontology (by class).
 */
export const CodeableReferenceSchema = DataTypeSchema.extend({
  concept: CodeableConceptSchema.optional(),
  reference: ReferenceSchema.optional(),
})
export type CodeableReference = z.infer<typeof CodeableReferenceSchema>

/**
 * ContactPoint Type: Details for all kinds of technology mediated contact points for a person or organization, including telephone, email, etc.
 */
export const ContactPointSchema = DataTypeSchema.extend({
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
 * Count Type: A measured amount (or an amount that can potentially be measured). Note that measured amounts include amounts that are not precisely quantified, including amounts involving arbitrary units and floating currencies.
 */
export const CountSchema = QuantitySchema.extend({
})
export type Count = z.infer<typeof CountSchema>

/**
 * Distance Type: A length - a value with a unit that is a physical distance.
 */
export const DistanceSchema = QuantitySchema.extend({
})
export type Distance = z.infer<typeof DistanceSchema>

/**
 * Duration Type: A length of time.
 */
export const DurationSchema = QuantitySchema.extend({
})
export type Duration = z.infer<typeof DurationSchema>

/**
 * HumanName Type: A name, normally of a human, that can be used for other living entities (e.g. animals but not organizations) that have been assigned names by a human and may need the use of name parts or the need for usage information.
 */
export const HumanNameSchema = DataTypeSchema.extend({
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
 * Money Type: An amount of economic utility in some recognized currency.
 */
export const MoneySchema = DataTypeSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
  currency: z.string().optional(),
  _currency: ElementSchema.optional(),
})
export type Money = z.infer<typeof MoneySchema>

/**
 * Range Type: A set of ordered Quantities defined by a low and high limit.
 */
export const RangeSchema = DataTypeSchema.extend({
  low: QuantitySchema.optional(),
  high: QuantitySchema.optional(),
})
export type Range = z.infer<typeof RangeSchema>

/**
 * Ratio Type: A relationship of two Quantity values - expressed as a numerator and a denominator.
 */
export const RatioSchema = DataTypeSchema.extend({
  numerator: QuantitySchema.optional(),
  denominator: QuantitySchema.optional(),
})
export type Ratio = z.infer<typeof RatioSchema>

/**
 * RatioRange Type: A range of ratios expressed as a low and high numerator and a denominator.
 */
export const RatioRangeSchema = DataTypeSchema.extend({
  lowNumerator: QuantitySchema.optional(),
  highNumerator: QuantitySchema.optional(),
  denominator: QuantitySchema.optional(),
})
export type RatioRange = z.infer<typeof RatioRangeSchema>

/**
 * SampledData Type: A series of measurements taken by a device, with upper and lower limits. There may be more than one dimension in the data.
 */
export const SampledDataSchema = DataTypeSchema.extend({
  origin: QuantitySchema,
  interval: z.number().optional(),
  _interval: ElementSchema.optional(),
  intervalUnit: z.string(),
  _intervalUnit: ElementSchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  lowerLimit: z.number().optional(),
  _lowerLimit: ElementSchema.optional(),
  upperLimit: z.number().optional(),
  _upperLimit: ElementSchema.optional(),
  dimensions: z.number(),
  _dimensions: ElementSchema.optional(),
  codeMap: z.string().optional(),
  _codeMap: ElementSchema.optional(),
  offsets: z.string().optional(),
  _offsets: ElementSchema.optional(),
  data: z.string().optional(),
  _data: ElementSchema.optional(),
})
export type SampledData = z.infer<typeof SampledDataSchema>

/**
 * Signature Type: A signature along with supporting context. The signature may be a digital signature that is cryptographic in nature, or some other signature acceptable to the domain. This other signature may be as simple as a graphical image representing a hand-written signature, or a signature ceremony Different signature approaches have different utilities.
 */
export const SignatureSchema = DataTypeSchema.extend({
  type: z.array(CodingSchema).optional(),
  when: z.string().optional(),
  _when: ElementSchema.optional(),
  who: ReferenceSchema.optional(),
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
 * BackboneType Type: Base definition for the few data types that are allowed to carry modifier extensions.
 */
export const BackboneTypeSchema = DataTypeSchema.extend({
  modifierExtension: z.lazy(() => z.array(ExtensionSchema)).optional(),
})
export type BackboneType = z.infer<typeof BackboneTypeSchema>

/**
 * BackboneElement Type: Base definition for all elements that are defined inside a resource - but not those in a data type.
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
  when: z.array(z.enum(['MORN', 'MORN.early', 'MORN.late', 'NOON', 'AFT', 'AFT.early', 'AFT.late', 'EVE', 'EVE.early', 'EVE.late', 'NIGHT', 'PHS', 'IMD', 'HS', 'WAKE', 'C', 'CM', 'CD', 'CV', 'AC', 'ACM', 'ACD', 'ACV', 'PC', 'PCM', 'PCD', 'PCV'])).optional(),
  _when: ElementSchema.optional(),
  offset: z.number().optional(),
  _offset: ElementSchema.optional(),
})
export type TimingRepeat = z.infer<typeof TimingRepeatSchema>

/**
 * Timing Type: Specifies an event that may occur multiple times. Timing schedules are used to record when things are planned, expected or requested to occur. The most common usage is in dosage instructions for medications. They are also used when planning care of various kinds, and may be used for reporting the schedule to which past regular activities were carried out.
 */
export const TimingSchema = BackboneTypeSchema.extend({
  event: z.array(z.string()).optional(),
  _event: ElementSchema.optional(),
  repeat: TimingRepeatSchema.optional(),
  code: CodeableConceptSchema.optional(),
})
export type Timing = z.infer<typeof TimingSchema>

/**
 * ContactDetail Type: Specifies contact information for a person or organization.
 */
export const ContactDetailSchema = DataTypeSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
})
export type ContactDetail = z.infer<typeof ContactDetailSchema>

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
 * What values are expected
 * Value filters specify additional constraints on the data for elements other than code-valued or date-valued. Each value filter specifies an additional constraint on the data (i.e. valueFilters are AND'ed, not OR'ed).
 */
export const DataRequirementValueFilterSchema = BackboneElementSchema.extend({
  path: z.string().optional(),
  _path: ElementSchema.optional(),
  searchParam: z.string().optional(),
  _searchParam: ElementSchema.optional(),
  comparator: z.enum(['eq', 'gt', 'lt', 'ge', 'le', 'sa', 'eb']).optional(),
  _comparator: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valuePeriod: PeriodSchema.optional(),
  valueDuration: DurationSchema.optional(),
})
export type DataRequirementValueFilter = z.infer<typeof DataRequirementValueFilterSchema>

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
 * DataRequirement Type: Describes a required data item for evaluation in terms of the type of data, and optional code or date-based filters of the data.
 */
export const DataRequirementSchema = DataTypeSchema.extend({
  type: z.enum(['Base', 'Element', 'BackboneElement', 'DataType', 'Address', 'Annotation', 'Attachment', 'Availability', 'BackboneType', 'Dosage', 'ElementDefinition', 'MarketingStatus', 'ProductShelfLife', 'Timing', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'DataRequirement', 'Expression', 'ExtendedContactDetail', 'Extension', 'HumanName', 'Identifier', 'Meta', 'MonetaryComponent', 'Money', 'Narrative', 'ParameterDefinition', 'Period', 'PrimitiveType', 'base64Binary', 'boolean', 'date', 'dateTime', 'decimal', 'instant', 'integer', 'positiveInt', 'unsignedInt', 'integer64', 'string', 'code', 'id', 'markdown', 'time', 'uri', 'canonical', 'oid', 'url', 'uuid', 'Quantity', 'Age', 'Count', 'Distance', 'Duration', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'TriggerDefinition', 'UsageContext', 'VirtualServiceDetail', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'CanonicalResource', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MetadataResource', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']),
  _type: ElementSchema.optional(),
  profile: z.array(z.string()).optional(),
  _profile: ElementSchema.optional(),
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  mustSupport: z.array(z.string()).optional(),
  _mustSupport: ElementSchema.optional(),
  codeFilter: z.array(DataRequirementCodeFilterSchema).optional(),
  dateFilter: z.array(DataRequirementDateFilterSchema).optional(),
  valueFilter: z.array(DataRequirementValueFilterSchema).optional(),
  limit: z.number().optional(),
  _limit: ElementSchema.optional(),
  sort: z.array(DataRequirementSortSchema).optional(),
})
export type DataRequirement = z.infer<typeof DataRequirementSchema>

/**
 * Expression Type: A expression that is evaluated in a specified context and returns a value. The context of use of the expression must specify the context in which the expression is evaluated, and how the result of the expression is used.
 */
export const ExpressionSchema = DataTypeSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  language: z.string().optional(),
  _language: ElementSchema.optional(),
  expression: z.string().optional(),
  _expression: ElementSchema.optional(),
  reference: z.string().optional(),
  _reference: ElementSchema.optional(),
})
export type Expression = z.infer<typeof ExpressionSchema>

/**
 * ParameterDefinition Type: The parameters to the module. This collection specifies both the input and output parameters. Input parameters are provided by the caller as part of the $evaluate operation. Output parameters are included in the GuidanceResponse.
 */
export const ParameterDefinitionSchema = DataTypeSchema.extend({
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
  type: z.enum(['Base', 'Element', 'BackboneElement', 'DataType', 'Address', 'Annotation', 'Attachment', 'Availability', 'BackboneType', 'Dosage', 'ElementDefinition', 'MarketingStatus', 'ProductShelfLife', 'Timing', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'DataRequirement', 'Expression', 'ExtendedContactDetail', 'Extension', 'HumanName', 'Identifier', 'Meta', 'MonetaryComponent', 'Money', 'Narrative', 'ParameterDefinition', 'Period', 'PrimitiveType', 'base64Binary', 'boolean', 'date', 'dateTime', 'decimal', 'instant', 'integer', 'positiveInt', 'unsignedInt', 'integer64', 'string', 'code', 'id', 'markdown', 'time', 'uri', 'canonical', 'oid', 'url', 'uuid', 'Quantity', 'Age', 'Count', 'Distance', 'Duration', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'TriggerDefinition', 'UsageContext', 'VirtualServiceDetail', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'CanonicalResource', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MetadataResource', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']),
  _type: ElementSchema.optional(),
  profile: z.string().optional(),
  _profile: ElementSchema.optional(),
})
export type ParameterDefinition = z.infer<typeof ParameterDefinitionSchema>

/**
 * RelatedArtifact Type: Related artifacts such as additional documentation, justification, or bibliographic references.
 */
export const RelatedArtifactSchema = DataTypeSchema.extend({
  type: z.enum(['documentation', 'justification', 'citation', 'predecessor', 'successor', 'derived-from', 'depends-on', 'composed-of', 'part-of', 'amends', 'amended-with', 'appends', 'appended-with', 'cites', 'cited-by', 'comments-on', 'comment-in', 'contains', 'contained-in', 'corrects', 'correction-in', 'replaces', 'replaced-with', 'retracts', 'retracted-by', 'signs', 'similar-to', 'supports', 'supported-with', 'transforms', 'transformed-into', 'transformed-with', 'documents', 'specification-of', 'created-with', 'cite-as']),
  _type: ElementSchema.optional(),
  classifier: z.array(CodeableConceptSchema).optional(),
  label: z.string().optional(),
  _label: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  citation: z.string().optional(),
  _citation: ElementSchema.optional(),
  document: AttachmentSchema.optional(),
  resource: z.string().optional(),
  _resource: ElementSchema.optional(),
  resourceReference: ReferenceSchema.optional(),
  publicationStatus: z.enum(['draft', 'active', 'retired', 'unknown']).optional(),
  _publicationStatus: ElementSchema.optional(),
  publicationDate: z.string().optional(),
  _publicationDate: ElementSchema.optional(),
})
export type RelatedArtifact = z.infer<typeof RelatedArtifactSchema>

/**
 * TriggerDefinition Type: A description of a triggering event. Triggering events can be named events, data events, or periodic, as determined by the type element.
 */
export const TriggerDefinitionSchema = DataTypeSchema.extend({
  type: z.enum(['named-event', 'periodic', 'data-changed', 'data-added', 'data-modified', 'data-removed', 'data-accessed', 'data-access-ended']),
  _type: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  subscriptionTopic: z.string().optional(),
  _subscriptionTopic: ElementSchema.optional(),
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
 * UsageContext Type: Specifies clinical/business/etc. metadata that can be used to retrieve, index and/or categorize an artifact. This metadata can either be specific to the applicable population (e.g., age category, DRG) or the specific context of care (e.g., venue, care setting, provider of care).
 */
export const UsageContextSchema = DataTypeSchema.extend({
  code: CodingSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueReference: ReferenceSchema.optional(),
})
export type UsageContext = z.infer<typeof UsageContextSchema>

/**
 * Times the {item} is available
 */
export const AvailabilityAvailableTimeSchema = BackboneElementSchema.extend({
  daysOfWeek: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])).optional(),
  _daysOfWeek: ElementSchema.optional(),
  allDay: z.boolean().optional(),
  _allDay: ElementSchema.optional(),
  availableStartTime: z.string().optional(),
  _availableStartTime: ElementSchema.optional(),
  availableEndTime: z.string().optional(),
  _availableEndTime: ElementSchema.optional(),
})
export type AvailabilityAvailableTime = z.infer<typeof AvailabilityAvailableTimeSchema>

/**
 * Not available during this time due to provided reason
 */
export const AvailabilityNotAvailableTimeSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  during: PeriodSchema.optional(),
})
export type AvailabilityNotAvailableTime = z.infer<typeof AvailabilityNotAvailableTimeSchema>

/**
 * Availability Type: Availability data for an {item}.
 */
export const AvailabilitySchema = DataTypeSchema.extend({
  availableTime: z.array(AvailabilityAvailableTimeSchema).optional(),
  notAvailableTime: z.array(AvailabilityNotAvailableTimeSchema).optional(),
})
export type Availability = z.infer<typeof AvailabilitySchema>

/**
 * ExtendedContactDetail Type: Specifies contact information for a specific purpose over a period of time, might be handled/monitored by a specific named person or organization.
 */
export const ExtendedContactDetailSchema = DataTypeSchema.extend({
  purpose: CodeableConceptSchema.optional(),
  name: z.array(HumanNameSchema).optional(),
  telecom: z.array(ContactPointSchema).optional(),
  address: AddressSchema.optional(),
  organization: ReferenceSchema.optional(),
  period: PeriodSchema.optional(),
})
export type ExtendedContactDetail = z.infer<typeof ExtendedContactDetailSchema>

/**
 * Amount of medication administered, to be administered or typical amount to be administered
 * Depending on the resource,this is the amount of medication administered, to  be administered or typical amount to be administered.
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
 * Dosage Type: Indicates how the medication is/was taken or should be taken by the patient.
 */
export const DosageSchema = BackboneTypeSchema.extend({
  sequence: z.number().optional(),
  _sequence: ElementSchema.optional(),
  text: z.string().optional(),
  _text: ElementSchema.optional(),
  additionalInstruction: z.array(CodeableConceptSchema).optional(),
  patientInstruction: z.string().optional(),
  _patientInstruction: ElementSchema.optional(),
  timing: TimingSchema.optional(),
  asNeeded: z.boolean().optional(),
  _asNeeded: ElementSchema.optional(),
  asNeededFor: z.array(CodeableConceptSchema).optional(),
  site: CodeableConceptSchema.optional(),
  route: CodeableConceptSchema.optional(),
  method: CodeableConceptSchema.optional(),
  doseAndRate: z.array(DosageDoseAndRateSchema).optional(),
  maxDosePerPeriod: z.array(RatioSchema).optional(),
  maxDosePerAdministration: QuantitySchema.optional(),
  maxDosePerLifetime: QuantitySchema.optional(),
})
export type Dosage = z.infer<typeof DosageSchema>

/**
 * Extension Type: Optional Extension Element - found in all resources.
 */
export const ExtensionSchema = DataTypeSchema.extend({
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
  valueInteger64: z.string().optional(),
  _valueInteger64: ElementSchema.optional(),
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
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueAvailability: AvailabilitySchema.optional(),
  valueExtendedContactDetail: ExtendedContactDetailSchema.optional(),
  valueDosage: DosageSchema.optional(),
  valueMeta: MetaSchema.optional(),
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
  comparator: z.array(z.enum(['eq', 'ne', 'gt', 'lt', 'ge', 'le', 'sa', 'eb', 'ap'])).optional(),
  _comparator: ElementSchema.optional(),
  modifier: z.array(z.enum(['missing', 'exact', 'contains', 'not', 'text', 'in', 'not-in', 'below', 'above', 'type', 'identifier', 'of-type', 'code-text', 'text-advanced', 'iterate'])).optional(),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
 * PrimitiveType Type: The base type for all re-useable types defined that have a simple property.
 */
export const PrimitiveTypeSchema = DataTypeSchema.extend({
})
export type PrimitiveType = z.infer<typeof PrimitiveTypeSchema>

/**
 * uri Type: String of characters used to identify a name or a resource
 */
export const uriSchema = PrimitiveTypeSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type uri = z.infer<typeof uriSchema>

/**
 * oid type: An OID represented as a URI
 */
export const oidSchema = uriSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type oid = z.infer<typeof oidSchema>

/**
 * Whether or not the action is applicable
 * An expression that describes applicability criteria, or start/stop conditions for the action.
 * When multiple conditions of the same kind are present, the effects are combined using AND semantics, so the overall condition is true only if all of the conditions are true.
 */
export const RequestOrchestrationActionConditionSchema = BackboneElementSchema.extend({
  kind: z.enum(['applicability', 'start', 'stop']),
  _kind: ElementSchema.optional(),
  expression: ExpressionSchema.optional(),
})
export type RequestOrchestrationActionCondition = z.infer<typeof RequestOrchestrationActionConditionSchema>

/**
 * Input data requirements
 * Defines input data requirements for the action.
 */
export const RequestOrchestrationActionInputSchema = BackboneElementSchema.extend({
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  requirement: DataRequirementSchema.optional(),
  relatedData: z.string().optional(),
  _relatedData: ElementSchema.optional(),
})
export type RequestOrchestrationActionInput = z.infer<typeof RequestOrchestrationActionInputSchema>

/**
 * Output data definition
 * Defines the outputs of the action, if any.
 */
export const RequestOrchestrationActionOutputSchema = BackboneElementSchema.extend({
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  requirement: DataRequirementSchema.optional(),
  relatedData: z.string().optional(),
  _relatedData: ElementSchema.optional(),
})
export type RequestOrchestrationActionOutput = z.infer<typeof RequestOrchestrationActionOutputSchema>

/**
 * Relationship to another action
 * A relationship to another action such as "before" or "30-60 minutes after start of".
 */
export const RequestOrchestrationActionRelatedActionSchema = BackboneElementSchema.extend({
  targetId: z.string(),
  _targetId: ElementSchema.optional(),
  relationship: z.enum(['before', 'before-start', 'before-end', 'concurrent', 'concurrent-with-start', 'concurrent-with-end', 'after', 'after-start', 'after-end']),
  _relationship: ElementSchema.optional(),
  endRelationship: z.enum(['before', 'before-start', 'before-end', 'concurrent', 'concurrent-with-start', 'concurrent-with-end', 'after', 'after-start', 'after-end']).optional(),
  _endRelationship: ElementSchema.optional(),
  offsetDuration: DurationSchema.optional(),
  offsetRange: RangeSchema.optional(),
})
export type RequestOrchestrationActionRelatedAction = z.infer<typeof RequestOrchestrationActionRelatedActionSchema>

/**
 * Who should perform the action
 * The participant that should perform or be responsible for this action.
 * Because request orchestrations represent potential options for performing activities, some specific participants may still be unknown, so this element allows for both definitional participants (in the same way they are specified in ActivityDefinition and PlanDefinition resources) as well as identifying specific participants when they are known.
 */
export const RequestOrchestrationActionParticipantSchema = BackboneElementSchema.extend({
  type: z.enum(['careteam', 'device', 'group', 'healthcareservice', 'location', 'organization', 'patient', 'practitioner', 'practitionerrole', 'relatedperson']).optional(),
  _type: ElementSchema.optional(),
  typeCanonical: z.string().optional(),
  _typeCanonical: ElementSchema.optional(),
  typeReference: ReferenceSchema.optional(),
  role: CodeableConceptSchema.optional(),
  function: CodeableConceptSchema.optional(),
  actorCanonical: z.string().optional(),
  _actorCanonical: ElementSchema.optional(),
  actorReference: ReferenceSchema.optional(),
})
export type RequestOrchestrationActionParticipant = z.infer<typeof RequestOrchestrationActionParticipantSchema>

/**
 * Dynamic aspects of the definition
 * Customizations that should be applied to the statically defined resource. For example, if the dosage of a medication must be computed based on the patient's weight, a customization would be used to specify an expression that calculated the weight, and the path on the resource that would contain the result.
 * Dynamic values are applied in the order in which they are defined in the RequestOrchestration resource. Note that when dynamic values are also specified by a referenced ActivityDefinition, the dynamicValues from the ActivityDefinition are applied first, followed by the dynamicValues specified here. In addition, if both a transform and dynamic values are specific, the dynamic values are applied to the result of the transform.
 */
export const RequestOrchestrationActionDynamicValueSchema = BackboneElementSchema.extend({
  path: z.string().optional(),
  _path: ElementSchema.optional(),
  expression: ExpressionSchema.optional(),
})
export type RequestOrchestrationActionDynamicValue = z.infer<typeof RequestOrchestrationActionDynamicValueSchema>

/**
 * Proposed actions, if any
 * The actions, if any, produced by the evaluation of the artifact.
 */
export interface RequestOrchestrationAction extends BackboneElement {
  linkId?: string | undefined
  _linkId?: Element | undefined
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
  goal?: Reference[] | undefined
  condition?: RequestOrchestrationActionCondition[] | undefined
  input?: RequestOrchestrationActionInput[] | undefined
  output?: RequestOrchestrationActionOutput[] | undefined
  relatedAction?: RequestOrchestrationActionRelatedAction[] | undefined
  timingDateTime?: string | undefined
  _timingDateTime?: Element | undefined
  timingAge?: Age | undefined
  timingPeriod?: Period | undefined
  timingDuration?: Duration | undefined
  timingRange?: Range | undefined
  timingTiming?: Timing | undefined
  location?: CodeableReference | undefined
  participant?: RequestOrchestrationActionParticipant[] | undefined
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
  definitionCanonical?: string | undefined
  _definitionCanonical?: Element | undefined
  definitionUri?: string | undefined
  _definitionUri?: Element | undefined
  transform?: string | undefined
  _transform?: Element | undefined
  dynamicValue?: RequestOrchestrationActionDynamicValue[] | undefined
  action?: RequestOrchestrationAction[] | undefined
}

export const RequestOrchestrationActionSchema: z.ZodType<RequestOrchestrationAction> = z.lazy(() =>
  BackboneElementSchema.extend({
    linkId: z.string().optional(),
      _linkId: ElementSchema.optional(),
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
    goal: z.array(ReferenceSchema).optional(),
    condition: z.array(RequestOrchestrationActionConditionSchema).optional(),
    input: z.array(RequestOrchestrationActionInputSchema).optional(),
    output: z.array(RequestOrchestrationActionOutputSchema).optional(),
    relatedAction: z.array(RequestOrchestrationActionRelatedActionSchema).optional(),
    timingDateTime: z.string().optional(),
      _timingDateTime: ElementSchema.optional(),
    timingAge: AgeSchema.optional(),
    timingPeriod: PeriodSchema.optional(),
    timingDuration: DurationSchema.optional(),
    timingRange: RangeSchema.optional(),
    timingTiming: TimingSchema.optional(),
    location: CodeableReferenceSchema.optional(),
    participant: z.array(RequestOrchestrationActionParticipantSchema).optional(),
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
    definitionCanonical: z.string().optional(),
      _definitionCanonical: ElementSchema.optional(),
    definitionUri: z.string().optional(),
      _definitionUri: ElementSchema.optional(),
    transform: z.string().optional(),
      _transform: ElementSchema.optional(),
    dynamicValue: z.array(RequestOrchestrationActionDynamicValueSchema).optional(),
    action: z.lazy(() => z.array(RequestOrchestrationActionSchema)).optional(),
  })
)

/**
 * A set of related requests that can be used to capture intended activities that have inter-dependencies such as "give this medication after that one".
 */
export const RequestOrchestrationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('RequestOrchestration'),
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
  reason: z.array(CodeableReferenceSchema).optional(),
  goal: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  action: z.array(RequestOrchestrationActionSchema).optional(),
})
export type RequestOrchestration = z.infer<typeof RequestOrchestrationSchema>

/**
 * Landmark relative location
 * The distance in centimeters a certain observation is made from a body landmark.
 */
export const BodyStructureIncludedStructureBodyLandmarkOrientationDistanceFromLandmarkSchema = BackboneElementSchema.extend({
  device: z.array(CodeableReferenceSchema).optional(),
  value: z.array(QuantitySchema).optional(),
})
export type BodyStructureIncludedStructureBodyLandmarkOrientationDistanceFromLandmark = z.infer<typeof BodyStructureIncludedStructureBodyLandmarkOrientationDistanceFromLandmarkSchema>

/**
 * Landmark relative location
 * Body locations in relation to a specific body landmark (tatoo, scar, other body structure).
 */
export const BodyStructureIncludedStructureBodyLandmarkOrientationSchema = BackboneElementSchema.extend({
  landmarkDescription: z.array(CodeableConceptSchema).optional(),
  clockFacePosition: z.array(CodeableConceptSchema).optional(),
  distanceFromLandmark: z.array(BodyStructureIncludedStructureBodyLandmarkOrientationDistanceFromLandmarkSchema).optional(),
  surfaceOrientation: z.array(CodeableConceptSchema).optional(),
})
export type BodyStructureIncludedStructureBodyLandmarkOrientation = z.infer<typeof BodyStructureIncludedStructureBodyLandmarkOrientationSchema>

/**
 * Included anatomic location(s)
 * The anatomical location(s) or region(s) of the specimen, lesion, or body structure.
 */
export interface BodyStructureIncludedStructure extends BackboneElement {
  structure: CodeableConcept
  laterality?: CodeableConcept | undefined
  bodyLandmarkOrientation?: BodyStructureIncludedStructureBodyLandmarkOrientation[] | undefined
  spatialReference?: Reference[] | undefined
  qualifier?: CodeableConcept[] | undefined
}

export const BodyStructureIncludedStructureSchema: z.ZodType<BodyStructureIncludedStructure> = z.lazy(() =>
  BackboneElementSchema.extend({
    structure: CodeableConceptSchema,
    laterality: CodeableConceptSchema.optional(),
    bodyLandmarkOrientation: z.array(BodyStructureIncludedStructureBodyLandmarkOrientationSchema).optional(),
    spatialReference: z.array(ReferenceSchema).optional(),
    qualifier: z.array(CodeableConceptSchema).optional(),
  })
)

/**
 * Record details about an anatomical structure.  This resource may be used when a coded concept does not provide the necessary detail needed for the use case.
 */
export const BodyStructureSchema = DomainResourceSchema.extend({
  resourceType: z.literal('BodyStructure'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  morphology: CodeableConceptSchema.optional(),
  includedStructure: z.array(BodyStructureIncludedStructureSchema),
  excludedStructure: z.lazy(() => z.array(BodyStructureIncludedStructureSchema)).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  image: z.array(AttachmentSchema).optional(),
  patient: ReferenceSchema,
})
export type BodyStructure = z.infer<typeof BodyStructureSchema>

/**
 * Comment, classifier, or rating content
 * A component comment, classifier, or rating of the artifact.
 */
export interface ArtifactAssessmentContent extends BackboneElement {
  informationType?: ('comment'|'classifier'|'rating'|'container'|'response'|'change-request') | undefined
  _informationType?: Element | undefined
  summary?: string | undefined
  _summary?: Element | undefined
  type?: CodeableConcept | undefined
  classifier?: CodeableConcept[] | undefined
  quantity?: Quantity | undefined
  author?: Reference | undefined
  path?: string[] | undefined
  _path?: Element | undefined
  relatedArtifact?: RelatedArtifact[] | undefined
  freeToShare?: boolean | undefined
  _freeToShare?: Element | undefined
  component?: ArtifactAssessmentContent[] | undefined
}

export const ArtifactAssessmentContentSchema: z.ZodType<ArtifactAssessmentContent> = z.lazy(() =>
  BackboneElementSchema.extend({
    informationType: z.enum(['comment', 'classifier', 'rating', 'container', 'response', 'change-request']).optional(),
      _informationType: ElementSchema.optional(),
    summary: z.string().optional(),
      _summary: ElementSchema.optional(),
    type: CodeableConceptSchema.optional(),
    classifier: z.array(CodeableConceptSchema).optional(),
    quantity: QuantitySchema.optional(),
    author: ReferenceSchema.optional(),
    path: z.array(z.string()).optional(),
      _path: ElementSchema.optional(),
    relatedArtifact: z.array(RelatedArtifactSchema).optional(),
    freeToShare: z.boolean().optional(),
      _freeToShare: ElementSchema.optional(),
    component: z.lazy(() => z.array(ArtifactAssessmentContentSchema)).optional(),
  })
)

/**
 * This Resource provides one or more comments, classifiers or ratings about a Resource and supports attribution and rights management metadata for the added content.
 */
export const ArtifactAssessmentSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ArtifactAssessment'),
  identifier: z.array(IdentifierSchema).optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  citeAsReference: ReferenceSchema.optional(),
  citeAsMarkdown: z.string().optional(),
  _citeAsMarkdown: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  artifactReference: ReferenceSchema.optional(),
  artifactCanonical: z.string().optional(),
  _artifactCanonical: ElementSchema.optional(),
  artifactUri: z.string().optional(),
  _artifactUri: ElementSchema.optional(),
  content: z.array(ArtifactAssessmentContentSchema).optional(),
  workflowStatus: z.enum(['submitted', 'triaged', 'waiting-for-input', 'resolved-no-change', 'resolved-change-required', 'deferred', 'duplicate', 'applied', 'published', 'entered-in-error']).optional(),
  _workflowStatus: ElementSchema.optional(),
  disposition: z.enum(['unresolved', 'not-persuasive', 'persuasive', 'persuasive-with-modification', 'not-persuasive-with-modification']).optional(),
  _disposition: ElementSchema.optional(),
})
export type ArtifactAssessment = z.infer<typeof ArtifactAssessmentSchema>

/**
 * Individual involved in exchange
 * A system or person who shares or receives an instance within the scenario.
 */
export const ExampleScenarioActorSchema = BackboneElementSchema.extend({
  key: z.string(),
  _key: ElementSchema.optional(),
  type: z.enum(['person', 'system']),
  _type: ElementSchema.optional(),
  title: z.string(),
  _title: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type ExampleScenarioActor = z.infer<typeof ExampleScenarioActorSchema>

/**
 * Snapshot of instance that changes
 * Represents the instance as it was at a specific time-point.
 * Not used if an instance doesn't change
 */
export const ExampleScenarioInstanceVersionSchema = BackboneElementSchema.extend({
  key: z.string(),
  _key: ElementSchema.optional(),
  title: z.string(),
  _title: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  content: ReferenceSchema.optional(),
})
export type ExampleScenarioInstanceVersion = z.infer<typeof ExampleScenarioInstanceVersionSchema>

/**
 * Resources contained in the instance
 * References to other instances that can be found within this instance (e.g. the observations contained in a bundle).
 */
export interface ExampleScenarioInstanceContainedInstance extends BackboneElement {
  instanceReference: string
  _instanceReference?: Element | undefined
  versionReference?: string | undefined
  _versionReference?: Element | undefined
}

export const ExampleScenarioInstanceContainedInstanceSchema: z.ZodType<ExampleScenarioInstanceContainedInstance> = z.lazy(() =>
  BackboneElementSchema.extend({
    instanceReference: z.string(),
      _instanceReference: ElementSchema.optional(),
    versionReference: z.string().optional(),
      _versionReference: ElementSchema.optional(),
  })
)

/**
 * Data used in the scenario
 * A single data collection that is shared as part of the scenario.
 */
export const ExampleScenarioInstanceSchema = BackboneElementSchema.extend({
  key: z.string(),
  _key: ElementSchema.optional(),
  structureType: CodingSchema,
  structureVersion: z.string().optional(),
  _structureVersion: ElementSchema.optional(),
  structureProfileCanonical: z.string().optional(),
  _structureProfileCanonical: ElementSchema.optional(),
  structureProfileUri: z.string().optional(),
  _structureProfileUri: ElementSchema.optional(),
  title: z.string(),
  _title: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  content: ReferenceSchema.optional(),
  version: z.array(ExampleScenarioInstanceVersionSchema).optional(),
  containedInstance: z.array(ExampleScenarioInstanceContainedInstanceSchema).optional(),
})
export type ExampleScenarioInstance = z.infer<typeof ExampleScenarioInstanceSchema>

/**
 * Step is simple action
 * The step represents a single operation invoked on receiver by sender.
 */
export const ExampleScenarioProcessStepOperationSchema = BackboneElementSchema.extend({
  type: CodingSchema.optional(),
  title: z.string(),
  _title: ElementSchema.optional(),
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
 * Indicates an alternative step that can be taken instead of the sub-process, scenario or operation.  E.g. to represent non-happy-path/exceptional/atypical circumstances.
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
 * Event within of the process
 * A significant action that occurs as part of the process.
 */
export interface ExampleScenarioProcessStep extends BackboneElement {
  number?: string | undefined
  _number?: Element | undefined
  process?: ExampleScenarioProcess | undefined
  workflow?: string | undefined
  _workflow?: Element | undefined
  operation?: ExampleScenarioProcessStepOperation | undefined
  alternative?: ExampleScenarioProcessStepAlternative[] | undefined
  pause?: boolean | undefined
  _pause?: Element | undefined
}

export const ExampleScenarioProcessStepSchema: z.ZodType<ExampleScenarioProcessStep> = z.lazy(() =>
  BackboneElementSchema.extend({
    number: z.string().optional(),
      _number: ElementSchema.optional(),
    process: z.lazy(() => ExampleScenarioProcessSchema).optional(),
    workflow: z.string().optional(),
      _workflow: ElementSchema.optional(),
    operation: ExampleScenarioProcessStepOperationSchema.optional(),
    alternative: z.array(ExampleScenarioProcessStepAlternativeSchema).optional(),
    pause: z.boolean().optional(),
      _pause: ElementSchema.optional(),
  })
)

/**
 * Major process within scenario
 * A group of operations that represents a significant step within a scenario.
 * Some scenarios might describe only one process.
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
 * A walkthrough of a workflow showing the interaction between systems and the instances shared, possibly including the evolution of instances over time.
 */
export const ExampleScenarioSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ExampleScenario'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  actor: z.array(ExampleScenarioActorSchema).optional(),
  instance: z.array(ExampleScenarioInstanceSchema).optional(),
  process: z.array(ExampleScenarioProcessSchema).optional(),
})
export type ExampleScenario = z.infer<typeof ExampleScenarioSchema>

/**
 * VirtualServiceDetail Type: Virtual Service Contact Details.
 */
export const VirtualServiceDetailSchema = DataTypeSchema.extend({
  channelType: CodingSchema.optional(),
  addressUrl: z.string().optional(),
  _addressUrl: ElementSchema.optional(),
  addressString: z.string().optional(),
  _addressString: ElementSchema.optional(),
  addressContactPoint: ContactPointSchema.optional(),
  addressExtendedContactDetail: ExtendedContactDetailSchema.optional(),
  additionalInfo: z.array(z.string()).optional(),
  _additionalInfo: ElementSchema.optional(),
  maxParticipants: z.number().optional(),
  _maxParticipants: ElementSchema.optional(),
  sessionKey: z.string().optional(),
  _sessionKey: ElementSchema.optional(),
})
export type VirtualServiceDetail = z.infer<typeof VirtualServiceDetailSchema>

/**
 * Participants involved in appointment
 * List of participants involved in the appointment.
 */
export const AppointmentParticipantSchema = BackboneElementSchema.extend({
  type: z.array(CodeableConceptSchema).optional(),
  period: PeriodSchema.optional(),
  actor: ReferenceSchema.optional(),
  required: z.boolean().optional(),
  _required: ElementSchema.optional(),
  status: z.enum(['accepted', 'declined', 'tentative', 'needs-action']),
  _status: ElementSchema.optional(),
})
export type AppointmentParticipant = z.infer<typeof AppointmentParticipantSchema>

/**
 * Information about weekly recurring appointments
 */
export const AppointmentRecurrenceTemplateWeeklyTemplateSchema = BackboneElementSchema.extend({
  monday: z.boolean().optional(),
  _monday: ElementSchema.optional(),
  tuesday: z.boolean().optional(),
  _tuesday: ElementSchema.optional(),
  wednesday: z.boolean().optional(),
  _wednesday: ElementSchema.optional(),
  thursday: z.boolean().optional(),
  _thursday: ElementSchema.optional(),
  friday: z.boolean().optional(),
  _friday: ElementSchema.optional(),
  saturday: z.boolean().optional(),
  _saturday: ElementSchema.optional(),
  sunday: z.boolean().optional(),
  _sunday: ElementSchema.optional(),
  weekInterval: z.number().optional(),
  _weekInterval: ElementSchema.optional(),
})
export type AppointmentRecurrenceTemplateWeeklyTemplate = z.infer<typeof AppointmentRecurrenceTemplateWeeklyTemplateSchema>

/**
 * Information about monthly recurring appointments
 */
export const AppointmentRecurrenceTemplateMonthlyTemplateSchema = BackboneElementSchema.extend({
  dayOfMonth: z.number().optional(),
  _dayOfMonth: ElementSchema.optional(),
  nthWeekOfMonth: CodingSchema.optional(),
  dayOfWeek: CodingSchema.optional(),
  monthInterval: z.number(),
  _monthInterval: ElementSchema.optional(),
})
export type AppointmentRecurrenceTemplateMonthlyTemplate = z.infer<typeof AppointmentRecurrenceTemplateMonthlyTemplateSchema>

/**
 * Information about yearly recurring appointments
 */
export const AppointmentRecurrenceTemplateYearlyTemplateSchema = BackboneElementSchema.extend({
  yearInterval: z.number(),
  _yearInterval: ElementSchema.optional(),
})
export type AppointmentRecurrenceTemplateYearlyTemplate = z.infer<typeof AppointmentRecurrenceTemplateYearlyTemplateSchema>

/**
 * Details of the recurrence pattern/template used to generate occurrences
 * The details of the recurrence pattern or template that is used to generate recurring appointments.
 */
export const AppointmentRecurrenceTemplateSchema = BackboneElementSchema.extend({
  timezone: CodeableConceptSchema.optional(),
  recurrenceType: CodeableConceptSchema,
  lastOccurrenceDate: z.string().optional(),
  _lastOccurrenceDate: ElementSchema.optional(),
  occurrenceCount: z.number().optional(),
  _occurrenceCount: ElementSchema.optional(),
  occurrenceDate: z.array(z.string()).optional(),
  _occurrenceDate: ElementSchema.optional(),
  weeklyTemplate: AppointmentRecurrenceTemplateWeeklyTemplateSchema.optional(),
  monthlyTemplate: AppointmentRecurrenceTemplateMonthlyTemplateSchema.optional(),
  yearlyTemplate: AppointmentRecurrenceTemplateYearlyTemplateSchema.optional(),
  excludingDate: z.array(z.string()).optional(),
  _excludingDate: ElementSchema.optional(),
  excludingRecurrenceId: z.array(z.number()).optional(),
  _excludingRecurrenceId: ElementSchema.optional(),
})
export type AppointmentRecurrenceTemplate = z.infer<typeof AppointmentRecurrenceTemplateSchema>

/**
 * A booking of a healthcare event among patient(s), practitioner(s), related person(s) and/or device(s) for a specific date/time. This may result in one or more Encounter(s).
 */
export const AppointmentSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Appointment'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['proposed', 'pending', 'booked', 'arrived', 'fulfilled', 'cancelled', 'noshow', 'entered-in-error', 'checked-in', 'waitlist']),
  _status: ElementSchema.optional(),
  cancellationReason: CodeableConceptSchema.optional(),
  class: z.array(CodeableConceptSchema).optional(),
  serviceCategory: z.array(CodeableConceptSchema).optional(),
  serviceType: z.array(CodeableReferenceSchema).optional(),
  specialty: z.array(CodeableConceptSchema).optional(),
  appointmentType: CodeableConceptSchema.optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  priority: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  replaces: z.array(ReferenceSchema).optional(),
  virtualService: z.array(VirtualServiceDetailSchema).optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  previousAppointment: ReferenceSchema.optional(),
  originatingAppointment: ReferenceSchema.optional(),
  start: z.string().optional(),
  _start: ElementSchema.optional(),
  end: z.string().optional(),
  _end: ElementSchema.optional(),
  minutesDuration: z.number().optional(),
  _minutesDuration: ElementSchema.optional(),
  requestedPeriod: z.array(PeriodSchema).optional(),
  slot: z.array(ReferenceSchema).optional(),
  account: z.array(ReferenceSchema).optional(),
  created: z.string().optional(),
  _created: ElementSchema.optional(),
  cancellationDate: z.string().optional(),
  _cancellationDate: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  patientInstruction: z.array(CodeableReferenceSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  subject: ReferenceSchema.optional(),
  participant: z.array(AppointmentParticipantSchema),
  recurrenceId: z.number().optional(),
  _recurrenceId: ElementSchema.optional(),
  occurrenceChanged: z.boolean().optional(),
  _occurrenceChanged: ElementSchema.optional(),
  recurrenceTemplate: z.array(AppointmentRecurrenceTemplateSchema).optional(),
})
export type Appointment = z.infer<typeof AppointmentSchema>

/**
 * The ActorDefinition resource is used to describe an actor - a human or an application that plays a role in data exchange, and that may have obligations associated with the role the actor plays.
 */
export const ActorDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ActorDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  type: z.enum(['person', 'system']),
  _type: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  reference: z.array(z.string()).optional(),
  _reference: ElementSchema.optional(),
  capabilities: z.string().optional(),
  _capabilities: ElementSchema.optional(),
  derivedFrom: z.array(z.string()).optional(),
  _derivedFrom: ElementSchema.optional(),
})
export type ActorDefinition = z.infer<typeof ActorDefinitionSchema>

/**
 * Who or what participated in the activities related to the condition and how they were involved
 * Indicates who or what participated in the activities related to the condition and how they were involved.
 */
export const ConditionParticipantSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type ConditionParticipant = z.infer<typeof ConditionParticipantSchema>

/**
 * Stage/grade, usually assessed formally
 * A simple summary of the stage such as "Stage 3" or "Early Onset". The determination of the stage is disease-specific, such as cancer, retinopathy of prematurity, kidney diseases, Alzheimer's, or Parkinson disease.
 */
export const ConditionStageSchema = BackboneElementSchema.extend({
  summary: CodeableConceptSchema.optional(),
  assessment: z.array(ReferenceSchema).optional(),
  type: CodeableConceptSchema.optional(),
})
export type ConditionStage = z.infer<typeof ConditionStageSchema>

/**
 * A clinical condition, problem, diagnosis, or other event, situation, issue, or clinical concept that has risen to a level of concern.
 */
export const ConditionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Condition'),
  identifier: z.array(IdentifierSchema).optional(),
  clinicalStatus: CodeableConceptSchema,
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
  participant: z.array(ConditionParticipantSchema).optional(),
  stage: z.array(ConditionStageSchema).optional(),
  evidence: z.array(CodeableReferenceSchema).optional(),
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
 * A List is a curated collection of resources, for things such as problem lists, allergy lists, facility list, organization list, etc.
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
  subject: z.array(ReferenceSchema).optional(),
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
 * MonetaryComponent Type: Availability data for an {item}.
 */
export const MonetaryComponentSchema = DataTypeSchema.extend({
  type: z.enum(['base', 'surcharge', 'deduction', 'discount', 'tax', 'informational']),
  _type: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  amount: MoneySchema.optional(),
})
export type MonetaryComponent = z.infer<typeof MonetaryComponentSchema>

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
  encounter: ReferenceSchema.optional(),
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
  unitPriceComponent: MonetaryComponentSchema.optional(),
  totalPriceComponent: MonetaryComponentSchema.optional(),
  overrideReason: CodeableConceptSchema.optional(),
  enterer: ReferenceSchema.optional(),
  enteredDate: z.string().optional(),
  _enteredDate: ElementSchema.optional(),
  reason: z.array(CodeableConceptSchema).optional(),
  service: z.array(CodeableReferenceSchema).optional(),
  product: z.array(CodeableReferenceSchema).optional(),
  account: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
})
export type ChargeItem = z.infer<typeof ChargeItemSchema>

/**
 * The asserted justification for using the data
 */
export const PermissionJustificationSchema = BackboneElementSchema.extend({
  basis: z.array(CodeableConceptSchema).optional(),
  evidence: z.array(ReferenceSchema).optional(),
})
export type PermissionJustification = z.infer<typeof PermissionJustificationSchema>

/**
 * Explicit FHIR Resource references
 */
export const PermissionRuleDataResourceSchema = BackboneElementSchema.extend({
  meaning: z.enum(['instance', 'related', 'dependents', 'authoredby']),
  _meaning: ElementSchema.optional(),
  reference: ReferenceSchema,
})
export type PermissionRuleDataResource = z.infer<typeof PermissionRuleDataResourceSchema>

/**
 * The selection criteria to identify data that is within scope of this provision
 * A description or definition of which activities are allowed to be done on the data.
 */
export const PermissionRuleDataSchema = BackboneElementSchema.extend({
  resource: z.array(PermissionRuleDataResourceSchema).optional(),
  security: z.array(CodingSchema).optional(),
  period: z.array(PeriodSchema).optional(),
  expression: ExpressionSchema.optional(),
})
export type PermissionRuleData = z.infer<typeof PermissionRuleDataSchema>

/**
 * A description or definition of which activities are allowed to be done on the data
 */
export const PermissionRuleActivitySchema = BackboneElementSchema.extend({
  actor: z.array(ReferenceSchema).optional(),
  action: z.array(CodeableConceptSchema).optional(),
  purpose: z.array(CodeableConceptSchema).optional(),
})
export type PermissionRuleActivity = z.infer<typeof PermissionRuleActivitySchema>

/**
 * Constraints to the Permission
 * A set of rules.
 */
export const PermissionRuleSchema = BackboneElementSchema.extend({
  type: z.enum(['deny', 'permit']).optional(),
  _type: ElementSchema.optional(),
  data: z.array(PermissionRuleDataSchema).optional(),
  activity: z.array(PermissionRuleActivitySchema).optional(),
  limit: z.array(CodeableConceptSchema).optional(),
})
export type PermissionRule = z.infer<typeof PermissionRuleSchema>

/**
 * Permission resource holds access rules for a given data and context.
 */
export const PermissionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Permission'),
  status: z.enum(['active', 'entered-in-error', 'draft', 'rejected']),
  _status: ElementSchema.optional(),
  asserter: ReferenceSchema.optional(),
  date: z.array(z.string()).optional(),
  _date: ElementSchema.optional(),
  validity: PeriodSchema.optional(),
  justification: PermissionJustificationSchema.optional(),
  combining: z.enum(['deny-overrides', 'permit-overrides', 'ordered-deny-overrides', 'ordered-permit-overrides', 'deny-unless-permit', 'permit-unless-deny']),
  _combining: ElementSchema.optional(),
  rule: z.array(PermissionRuleSchema).optional(),
})
export type Permission = z.infer<typeof PermissionSchema>

/**
 * Indicates who or what performed an action
 */
export const BiologicallyDerivedProductDispensePerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type BiologicallyDerivedProductDispensePerformer = z.infer<typeof BiologicallyDerivedProductDispensePerformerSchema>

/**
 * A record of dispensation of a biologically derived product.
 */
export const BiologicallyDerivedProductDispenseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('BiologicallyDerivedProductDispense'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['preparation', 'in-progress', 'allocated', 'issued', 'unfulfilled', 'returned', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  originRelationshipType: CodeableConceptSchema.optional(),
  product: ReferenceSchema,
  patient: ReferenceSchema,
  matchStatus: CodeableConceptSchema.optional(),
  performer: z.array(BiologicallyDerivedProductDispensePerformerSchema).optional(),
  location: ReferenceSchema.optional(),
  quantity: QuantitySchema.optional(),
  preparedDate: z.string().optional(),
  _preparedDate: ElementSchema.optional(),
  whenHandedOver: z.string().optional(),
  _whenHandedOver: ElementSchema.optional(),
  destination: ReferenceSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  usageInstruction: z.string().optional(),
  _usageInstruction: ElementSchema.optional(),
})
export type BiologicallyDerivedProductDispense = z.infer<typeof BiologicallyDerivedProductDispenseSchema>

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
  status: z.enum(['attested', 'validated', 'in-process', 'req-revalid', 'val-fail', 'reval-fail', 'entered-in-error']),
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
 * string Type: A sequence of Unicode characters
 */
export const stringSchema = PrimitiveTypeSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type string = z.infer<typeof stringSchema>

/**
 * id type: Any combination of letters, numerals, "-" and ".", with a length limit of 64 characters.  (This might be an integer, an unprefixed OID, UUID or any other identifier pattern that meets these constraints.)  Ids are case-insensitive.
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
  suppliedItem: z.array(SupplyDeliverySuppliedItemSchema).optional(),
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
  mode: CodeableConceptSchema,
  time: z.string().optional(),
  _time: ElementSchema.optional(),
  party: ReferenceSchema.optional(),
})
export type CompositionAttester = z.infer<typeof CompositionAttesterSchema>

/**
 * The clinical service(s) being documented
 * The clinical service, such as a colonoscopy or an appendectomy, being documented.
 * The event needs to be consistent with the type element, though can provide further information if desired.
 */
export const CompositionEventSchema = BackboneElementSchema.extend({
  period: PeriodSchema.optional(),
  detail: z.array(CodeableReferenceSchema).optional(),
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
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  status: z.enum(['registered', 'partial', 'preliminary', 'final', 'amended', 'corrected', 'appended', 'cancelled', 'entered-in-error', 'deprecated', 'unknown']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema,
  category: z.array(CodeableConceptSchema).optional(),
  subject: z.array(ReferenceSchema).optional(),
  encounter: ReferenceSchema.optional(),
  date: z.string(),
  _date: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  author: z.array(ReferenceSchema),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string(),
  _title: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  attester: z.array(CompositionAttesterSchema).optional(),
  custodian: ReferenceSchema.optional(),
  relatesTo: z.array(RelatedArtifactSchema).optional(),
  event: z.array(CompositionEventSchema).optional(),
  section: z.array(CompositionSectionSchema).optional(),
})
export type Composition = z.infer<typeof CompositionSchema>

/**
 * List of participants involved in the encounter
 * The list of people responsible for providing the service.
 * Any Patient or Group present in the participation.actor must also be the subject, though the subject may be absent from the participation.actor for cases where the patient (or group) is not present, such as during a case review conference.
 */
export const EncounterParticipantSchema = BackboneElementSchema.extend({
  type: z.array(CodeableConceptSchema).optional(),
  period: PeriodSchema.optional(),
  actor: ReferenceSchema.optional(),
})
export type EncounterParticipant = z.infer<typeof EncounterParticipantSchema>

/**
 * The list of medical reasons that are expected to be addressed during the episode of care
 * The reason communicates what medical problem the patient has that should be addressed during the episode of care.  This reason could be patient reported complaint, a clinical indication that was determined in a previous encounter or episode of care, or some planned care such as an immunization recommendation.  In the case where you have a primary reason, but are expecting to also address other problems, you can list the primary reason with a use code of 'Chief Complaint', while the other problems being addressed would have a use code of 'Reason for Visit'.Examples: * pregnancy would use HealthcareService or a coding as the reason * patient home monitoring could use Condition as the reason
 */
export const EncounterReasonSchema = BackboneElementSchema.extend({
  use: z.array(CodeableConceptSchema).optional(),
  value: z.array(CodeableReferenceSchema).optional(),
})
export type EncounterReason = z.infer<typeof EncounterReasonSchema>

/**
 * The list of diagnosis relevant to this encounter
 * Also note that for the purpose of billing, the diagnoses are recorded in the account where they can be ranked appropriately for how the invoicing/claiming documentation needs to be prepared.
 */
export const EncounterDiagnosisSchema = BackboneElementSchema.extend({
  condition: z.array(CodeableReferenceSchema).optional(),
  use: z.array(CodeableConceptSchema).optional(),
})
export type EncounterDiagnosis = z.infer<typeof EncounterDiagnosisSchema>

/**
 * Details about the admission to a healthcare service
 * Details about the stay during which a healthcare service is provided.This does not describe the event of admitting the patient, but rather any information that is relevant from the time of admittance until the time of discharge.
 * An Encounter may cover more than just the inpatient stay. Contexts such as outpatients, community clinics, and aged care facilities are also included.The duration recorded in the period of this encounter covers the entire scope of this admission record.
 */
export const EncounterAdmissionSchema = BackboneElementSchema.extend({
  preAdmissionIdentifier: IdentifierSchema.optional(),
  origin: ReferenceSchema.optional(),
  admitSource: CodeableConceptSchema.optional(),
  reAdmission: CodeableConceptSchema.optional(),
  destination: ReferenceSchema.optional(),
  dischargeDisposition: CodeableConceptSchema.optional(),
})
export type EncounterAdmission = z.infer<typeof EncounterAdmissionSchema>

/**
 * List of locations where the patient has been
 * List of locations where  the patient has been during this encounter.
 * Virtual encounters can be recorded in the Encounter by specifying a location reference to a location of type "kind" such as "client's home" and an encounter.class = "virtual".
 */
export const EncounterLocationSchema = BackboneElementSchema.extend({
  location: ReferenceSchema,
  status: z.enum(['planned', 'active', 'reserved', 'completed']).optional(),
  _status: ElementSchema.optional(),
  form: CodeableConceptSchema.optional(),
  period: PeriodSchema.optional(),
})
export type EncounterLocation = z.infer<typeof EncounterLocationSchema>

/**
 * An interaction between healthcare provider(s), and/or patient(s) for the purpose of providing healthcare service(s) or assessing the health status of patient(s).
 */
export const EncounterSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Encounter'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['planned', 'in-progress', 'on-hold', 'discharged', 'completed', 'cancelled', 'discontinued', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  class: z.array(CodeableConceptSchema).optional(),
  priority: CodeableConceptSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  serviceType: z.array(CodeableReferenceSchema).optional(),
  subject: ReferenceSchema.optional(),
  subjectStatus: CodeableConceptSchema.optional(),
  episodeOfCare: z.array(ReferenceSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  careTeam: z.array(ReferenceSchema).optional(),
  partOf: ReferenceSchema.optional(),
  serviceProvider: ReferenceSchema.optional(),
  participant: z.array(EncounterParticipantSchema).optional(),
  appointment: z.array(ReferenceSchema).optional(),
  virtualService: z.array(VirtualServiceDetailSchema).optional(),
  actualPeriod: PeriodSchema.optional(),
  plannedStartDate: z.string().optional(),
  _plannedStartDate: ElementSchema.optional(),
  plannedEndDate: z.string().optional(),
  _plannedEndDate: ElementSchema.optional(),
  length: DurationSchema.optional(),
  reason: z.array(EncounterReasonSchema).optional(),
  diagnosis: z.array(EncounterDiagnosisSchema).optional(),
  account: z.array(ReferenceSchema).optional(),
  dietPreference: z.array(CodeableConceptSchema).optional(),
  specialArrangement: z.array(CodeableConceptSchema).optional(),
  specialCourtesy: z.array(CodeableConceptSchema).optional(),
  admission: EncounterAdmissionSchema.optional(),
  location: z.array(EncounterLocationSchema).optional(),
})
export type Encounter = z.infer<typeof EncounterSchema>

/**
 * Who or what performed the medication administration and what type of performance they did
 * The performer of the medication treatment.  For devices this is the device that performed the administration of the medication.  An IV Pump would be an example of a device that is performing the administration. Both the IV Pump and the practitioner that set the rate or bolus on the pump can be listed as performers.
 */
export const MedicationAdministrationPerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: CodeableReferenceSchema,
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
 * Describes the event of a patient consuming or otherwise being administered a medication.  This may be as simple as swallowing a tablet or it may be a long running infusion. Related resources tie this event to the authorizing prescription, and the specific encounter between patient and health care practitioner. This event can also be used to record waste using a status of not-done and the appropriate statusReason.
 */
export const MedicationAdministrationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicationAdministration'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['in-progress', 'not-done', 'on-hold', 'completed', 'entered-in-error', 'stopped', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: z.array(CodeableConceptSchema).optional(),
  category: z.array(CodeableConceptSchema).optional(),
  medication: CodeableReferenceSchema,
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  occurenceDateTime: z.string().optional(),
  _occurenceDateTime: ElementSchema.optional(),
  occurencePeriod: PeriodSchema.optional(),
  occurenceTiming: TimingSchema.optional(),
  recorded: z.string().optional(),
  _recorded: ElementSchema.optional(),
  isSubPotent: z.boolean().optional(),
  _isSubPotent: ElementSchema.optional(),
  subPotentReason: z.array(CodeableConceptSchema).optional(),
  performer: z.array(MedicationAdministrationPerformerSchema).optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  request: ReferenceSchema.optional(),
  device: z.array(CodeableReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  dosage: MedicationAdministrationDosageSchema.optional(),
  eventHistory: z.array(ReferenceSchema).optional(),
})
export type MedicationAdministration = z.infer<typeof MedicationAdministrationSchema>

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
 * Event information
 * Information code for an event with a corresponding date or period.
 */
export const ClaimEventSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  whenDateTime: z.string().optional(),
  _whenDateTime: ElementSchema.optional(),
  whenPeriod: PeriodSchema.optional(),
})
export type ClaimEvent = z.infer<typeof ClaimEventSchema>

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
  specialty: CodeableConceptSchema.optional(),
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
  valueIdentifier: IdentifierSchema.optional(),
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
 * Anatomical location
 * Physical location where the service is performed or applies.
 */
export const ClaimItemBodySiteSchema = BackboneElementSchema.extend({
  site: z.array(CodeableReferenceSchema),
  subSite: z.array(CodeableConceptSchema).optional(),
})
export type ClaimItemBodySite = z.infer<typeof ClaimItemBodySiteSchema>

/**
 * Product or service provided
 * A claim detail line. Either a simple (a product or service) or a 'group' of sub-details which are simple items.
 */
export const ClaimItemDetailSubDetailSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  traceNumber: z.array(IdentifierSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  patientPaid: MoneySchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  patientPaid: MoneySchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
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
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  request: z.array(ReferenceSchema).optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  locationCodeableConcept: CodeableConceptSchema.optional(),
  locationAddress: AddressSchema.optional(),
  locationReference: ReferenceSchema.optional(),
  patientPaid: MoneySchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
  bodySite: z.array(ClaimItemBodySiteSchema).optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
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
  provider: ReferenceSchema.optional(),
  priority: CodeableConceptSchema.optional(),
  fundsReserve: CodeableConceptSchema.optional(),
  related: z.array(ClaimRelatedSchema).optional(),
  prescription: ReferenceSchema.optional(),
  originalPrescription: ReferenceSchema.optional(),
  payee: ClaimPayeeSchema.optional(),
  referral: ReferenceSchema.optional(),
  encounter: z.array(ReferenceSchema).optional(),
  facility: ReferenceSchema.optional(),
  diagnosisRelatedGroup: CodeableConceptSchema.optional(),
  event: z.array(ClaimEventSchema).optional(),
  careTeam: z.array(ClaimCareTeamSchema).optional(),
  supportingInfo: z.array(ClaimSupportingInfoSchema).optional(),
  diagnosis: z.array(ClaimDiagnosisSchema).optional(),
  procedure: z.array(ClaimProcedureSchema).optional(),
  insurance: z.array(ClaimInsuranceSchema).optional(),
  accident: ClaimAccidentSchema.optional(),
  patientPaid: MoneySchema.optional(),
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
 * Describes a measurement, calculation or setting capability of a device.  The DeviceMetric resource is derived from the ISO/IEEE 11073-10201 Domain Information Model standard, but is more widely applicable. 
 */
export const DeviceMetricSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceMetric'),
  identifier: z.array(IdentifierSchema).optional(),
  type: CodeableConceptSchema,
  unit: CodeableConceptSchema.optional(),
  device: ReferenceSchema,
  operationalStatus: z.enum(['on', 'off', 'standby', 'entered-in-error']).optional(),
  _operationalStatus: ElementSchema.optional(),
  color: z.enum(['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen']).optional(),
  _color: ElementSchema.optional(),
  category: z.enum(['measurement', 'setting', 'calculation', 'unspecified']),
  _category: ElementSchema.optional(),
  measurementFrequency: QuantitySchema.optional(),
  calibration: z.array(DeviceMetricCalibrationSchema).optional(),
})
export type DeviceMetric = z.infer<typeof DeviceMetricSchema>

/**
 * Element values that are used to distinguish the slices
 * Designates which child elements are used to discriminate between the slices when processing an instance. If one or more discriminators are provided, the value of the child elements in the instance data SHALL completely distinguish which slice the element in the resource matches based on the allowed values for those elements in each of the slices.
 * If there is no discriminator, the content is hard to process, so this should be avoided.
 */
export const ElementDefinitionSlicingDiscriminatorSchema = BackboneElementSchema.extend({
  type: z.enum(['value', 'exists', 'pattern', 'type', 'profile', 'position']),
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
 * Information about the base definition of the element, provided to make it unnecessary for tools to trace the deviation of the element through the derived and related profiles. When the element definition is not the original definition of an element - e.g. either in a constraint on another type, or for elements from a super type in a snap shot - then the information in provided in the element definition may be different to the base definition. On the original definition of the element, it will be same.
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
  valueInteger64: z.string().optional(),
  _valueInteger64: ElementSchema.optional(),
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
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueAvailability: AvailabilitySchema.optional(),
  valueExtendedContactDetail: ExtendedContactDetailSchema.optional(),
  valueDosage: DosageSchema.optional(),
  valueMeta: MetaSchema.optional(),
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
  suppress: z.boolean().optional(),
  _suppress: ElementSchema.optional(),
  human: z.string(),
  _human: ElementSchema.optional(),
  expression: z.string().optional(),
  _expression: ElementSchema.optional(),
  source: z.string().optional(),
  _source: ElementSchema.optional(),
})
export type ElementDefinitionConstraint = z.infer<typeof ElementDefinitionConstraintSchema>

/**
 * Additional Bindings - more rules about the binding
 * Additional bindings that help applications implementing this element. Additional bindings do not replace the main binding but provide more information and/or context.
 */
export const ElementDefinitionBindingAdditionalSchema = BackboneElementSchema.extend({
  purpose: z.enum(['maximum', 'minimum', 'required', 'extensible', 'candidate', 'current', 'preferred', 'ui', 'starter', 'component']),
  _purpose: ElementSchema.optional(),
  valueSet: z.string(),
  _valueSet: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  shortDoco: z.string().optional(),
  _shortDoco: ElementSchema.optional(),
  usage: z.array(UsageContextSchema).optional(),
  any: z.boolean().optional(),
  _any: ElementSchema.optional(),
})
export type ElementDefinitionBindingAdditional = z.infer<typeof ElementDefinitionBindingAdditionalSchema>

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
  additional: z.array(ElementDefinitionBindingAdditionalSchema).optional(),
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
 * ElementDefinition Type: Captures constraints on each element within the resource, profile, or extension.
 */
export const ElementDefinitionSchema = BackboneTypeSchema.extend({
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
  defaultValueInteger64: z.string().optional(),
  _defaultValueInteger64: ElementSchema.optional(),
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
  defaultValueDataRequirement: DataRequirementSchema.optional(),
  defaultValueExpression: ExpressionSchema.optional(),
  defaultValueParameterDefinition: ParameterDefinitionSchema.optional(),
  defaultValueRelatedArtifact: RelatedArtifactSchema.optional(),
  defaultValueTriggerDefinition: TriggerDefinitionSchema.optional(),
  defaultValueUsageContext: UsageContextSchema.optional(),
  defaultValueAvailability: AvailabilitySchema.optional(),
  defaultValueExtendedContactDetail: ExtendedContactDetailSchema.optional(),
  defaultValueDosage: DosageSchema.optional(),
  defaultValueMeta: MetaSchema.optional(),
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
  fixedInteger64: z.string().optional(),
  _fixedInteger64: ElementSchema.optional(),
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
  fixedDataRequirement: DataRequirementSchema.optional(),
  fixedExpression: ExpressionSchema.optional(),
  fixedParameterDefinition: ParameterDefinitionSchema.optional(),
  fixedRelatedArtifact: RelatedArtifactSchema.optional(),
  fixedTriggerDefinition: TriggerDefinitionSchema.optional(),
  fixedUsageContext: UsageContextSchema.optional(),
  fixedAvailability: AvailabilitySchema.optional(),
  fixedExtendedContactDetail: ExtendedContactDetailSchema.optional(),
  fixedDosage: DosageSchema.optional(),
  fixedMeta: MetaSchema.optional(),
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
  patternInteger64: z.string().optional(),
  _patternInteger64: ElementSchema.optional(),
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
  patternDataRequirement: DataRequirementSchema.optional(),
  patternExpression: ExpressionSchema.optional(),
  patternParameterDefinition: ParameterDefinitionSchema.optional(),
  patternRelatedArtifact: RelatedArtifactSchema.optional(),
  patternTriggerDefinition: TriggerDefinitionSchema.optional(),
  patternUsageContext: UsageContextSchema.optional(),
  patternAvailability: AvailabilitySchema.optional(),
  patternExtendedContactDetail: ExtendedContactDetailSchema.optional(),
  patternDosage: DosageSchema.optional(),
  patternMeta: MetaSchema.optional(),
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
  minValueInteger64: z.string().optional(),
  _minValueInteger64: ElementSchema.optional(),
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
  maxValueInteger64: z.string().optional(),
  _maxValueInteger64: ElementSchema.optional(),
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
  mustHaveValue: z.boolean().optional(),
  _mustHaveValue: ElementSchema.optional(),
  valueAlternatives: z.array(z.string()).optional(),
  _valueAlternatives: ElementSchema.optional(),
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
 * Whether the event succeeded or failed
 * Indicates whether the event succeeded or failed. A free text descripiton can be given in outcome.text.
 * In some cases a "success" may be partial, for example, an incomplete or interrupted transfer of a radiological study. For the purpose of establishing accountability, these distinctions are not relevant.
 */
export const AuditEventOutcomeSchema = BackboneElementSchema.extend({
  code: CodingSchema,
  detail: z.array(CodeableConceptSchema).optional(),
})
export type AuditEventOutcome = z.infer<typeof AuditEventOutcomeSchema>

/**
 * Actor involved in the event
 * An actor taking an active role in the event or activity that is logged.
 * Several agents may be associated (i.e. have some responsibility for an activity) with an event or activity.
 */
export interface AuditEventAgent extends BackboneElement {
  type?: CodeableConcept | undefined
  role?: CodeableConcept[] | undefined
  who: Reference
  requestor?: boolean | undefined
  _requestor?: Element | undefined
  location?: Reference | undefined
  policy?: string[] | undefined
  _policy?: Element | undefined
  networkReference?: Reference | undefined
  networkUri?: string | undefined
  _networkUri?: Element | undefined
  networkString?: string | undefined
  _networkString?: Element | undefined
  authorization?: CodeableConcept[] | undefined
}

export const AuditEventAgentSchema: z.ZodType<AuditEventAgent> = z.lazy(() =>
  BackboneElementSchema.extend({
    type: CodeableConceptSchema.optional(),
    role: z.array(CodeableConceptSchema).optional(),
    who: ReferenceSchema,
    requestor: z.boolean().optional(),
      _requestor: ElementSchema.optional(),
    location: ReferenceSchema.optional(),
    policy: z.array(z.string()).optional(),
      _policy: ElementSchema.optional(),
    networkReference: ReferenceSchema.optional(),
    networkUri: z.string().optional(),
      _networkUri: ElementSchema.optional(),
    networkString: z.string().optional(),
      _networkString: ElementSchema.optional(),
    authorization: z.array(CodeableConceptSchema).optional(),
  })
)

/**
 * Audit Event Reporter
 * The actor that is reporting the event.
 * Events are reported by the actor that detected them. This may be one of the participating actors, but may also be different. The actor may be a human such as a medical-records clerk disclosing data manually, that clerk would be the source for the record of disclosure.
 */
export const AuditEventSourceSchema = BackboneElementSchema.extend({
  site: ReferenceSchema.optional(),
  observer: ReferenceSchema,
  type: z.array(CodeableConceptSchema).optional(),
})
export type AuditEventSource = z.infer<typeof AuditEventSourceSchema>

/**
 * Additional Information about the entity
 * Tagged value pairs for conveying additional information about the entity.
 */
export const AuditEventEntityDetailSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
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
  valueTime: z.string().optional(),
  _valueTime: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valuePeriod: PeriodSchema.optional(),
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
  role: CodeableConceptSchema.optional(),
  securityLabel: z.array(CodeableConceptSchema).optional(),
  query: z.string().optional(),
  _query: ElementSchema.optional(),
  detail: z.array(AuditEventEntityDetailSchema).optional(),
  agent: z.lazy(() => z.array(AuditEventAgentSchema)).optional(),
})
export type AuditEventEntity = z.infer<typeof AuditEventEntitySchema>

/**
 * A record of an event relevant for purposes such as operations, privacy, security, maintenance, and performance analysis.
 */
export const AuditEventSchema = DomainResourceSchema.extend({
  resourceType: z.literal('AuditEvent'),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema,
  action: z.enum(['C', 'R', 'U', 'D', 'E']).optional(),
  _action: ElementSchema.optional(),
  severity: z.enum(['emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'informational', 'debug']).optional(),
  _severity: ElementSchema.optional(),
  occurredPeriod: PeriodSchema.optional(),
  occurredDateTime: z.string().optional(),
  _occurredDateTime: ElementSchema.optional(),
  recorded: z.string(),
  _recorded: ElementSchema.optional(),
  outcome: AuditEventOutcomeSchema.optional(),
  authorization: z.array(CodeableConceptSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  patient: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  agent: z.array(AuditEventAgentSchema),
  source: AuditEventSourceSchema,
  entity: z.array(AuditEventEntitySchema).optional(),
})
export type AuditEvent = z.infer<typeof AuditEventSchema>

/**
 * The parameter details for the service being requested
 */
export const ServiceRequestOrderDetailParameterSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  valueQuantity: QuantitySchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueRange: RangeSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valuePeriod: PeriodSchema.optional(),
})
export type ServiceRequestOrderDetailParameter = z.infer<typeof ServiceRequestOrderDetailParameterSchema>

/**
 * Additional order information
 * Additional details and instructions about the how the services are to be delivered.   For example, and order for a urinary catheter may have an order detail for an external or indwelling catheter, or an order for a bandage may require additional instructions specifying how the bandage should be applied.
 * For information from the medical record intended to support the delivery of the requested services, use the `supportingInformation` element.
 */
export const ServiceRequestOrderDetailSchema = BackboneElementSchema.extend({
  parameterFocus: CodeableReferenceSchema.optional(),
  parameter: z.array(ServiceRequestOrderDetailParameterSchema),
})
export type ServiceRequestOrderDetail = z.infer<typeof ServiceRequestOrderDetailSchema>

/**
 * Patient or consumer-oriented instructions
 * Instructions in terms that are understood by the patient or consumer.
 */
export const ServiceRequestPatientInstructionSchema = BackboneElementSchema.extend({
  instructionMarkdown: z.string().optional(),
  _instructionMarkdown: ElementSchema.optional(),
  instructionReference: ReferenceSchema.optional(),
})
export type ServiceRequestPatientInstruction = z.infer<typeof ServiceRequestPatientInstructionSchema>

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
  code: CodeableReferenceSchema.optional(),
  orderDetail: z.array(ServiceRequestOrderDetailSchema).optional(),
  quantityQuantity: QuantitySchema.optional(),
  quantityRatio: RatioSchema.optional(),
  quantityRange: RangeSchema.optional(),
  subject: ReferenceSchema,
  focus: z.array(ReferenceSchema).optional(),
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
  location: z.array(CodeableReferenceSchema).optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  insurance: z.array(ReferenceSchema).optional(),
  supportingInfo: z.array(CodeableReferenceSchema).optional(),
  specimen: z.array(ReferenceSchema).optional(),
  bodySite: z.array(CodeableConceptSchema).optional(),
  bodyStructure: ReferenceSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  patientInstruction: z.array(ServiceRequestPatientInstructionSchema).optional(),
  relevantHistory: z.array(ReferenceSchema).optional(),
})
export type ServiceRequest = z.infer<typeof ServiceRequestSchema>

/**
 * What food or fluid product or item was consumed
 */
export const NutritionIntakeConsumedItemSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  nutritionProduct: CodeableReferenceSchema,
  schedule: TimingSchema.optional(),
  amount: QuantitySchema.optional(),
  rate: QuantitySchema.optional(),
  notConsumed: z.boolean().optional(),
  _notConsumed: ElementSchema.optional(),
  notConsumedReason: CodeableConceptSchema.optional(),
})
export type NutritionIntakeConsumedItem = z.infer<typeof NutritionIntakeConsumedItemSchema>

/**
 * Total nutrient for the whole meal, product, serving
 * Total nutrient amounts for the whole meal, product, serving, etc.
 * Individual item nutrients are not currently included in the resource and will likely end up as a reference in nutritionProduct to represent the individual items.
 */
export const NutritionIntakeIngredientLabelSchema = BackboneElementSchema.extend({
  nutrient: CodeableReferenceSchema,
  amount: QuantitySchema,
})
export type NutritionIntakeIngredientLabel = z.infer<typeof NutritionIntakeIngredientLabelSchema>

/**
 * Who was performed in the intake
 * Who performed the intake and how they were involved.
 */
export const NutritionIntakePerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type NutritionIntakePerformer = z.infer<typeof NutritionIntakePerformerSchema>

/**
 * A record of food or fluid that is being consumed by a patient.  A NutritionIntake may indicate that the patient may be consuming the food or fluid now or has consumed the food or fluid in the past.  The source of this information can be the patient, significant other (such as a family member or spouse), or a clinician.  A common scenario where this information is captured is during the history taking process during a patient visit or stay or through an app that tracks food or fluids consumed.   The consumption information may come from sources such as the patient's memory, from a nutrition label,  or from a clinician documenting observed intake.
 */
export const NutritionIntakeSchema = DomainResourceSchema.extend({
  resourceType: z.literal('NutritionIntake'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['preparation', 'in-progress', 'not-done', 'on-hold', 'stopped', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  recorded: z.string().optional(),
  _recorded: ElementSchema.optional(),
  reportedBoolean: z.boolean().optional(),
  _reportedBoolean: ElementSchema.optional(),
  reportedReference: ReferenceSchema.optional(),
  consumedItem: z.array(NutritionIntakeConsumedItemSchema),
  ingredientLabel: z.array(NutritionIntakeIngredientLabelSchema).optional(),
  performer: z.array(NutritionIntakePerformerSchema).optional(),
  location: ReferenceSchema.optional(),
  derivedFrom: z.array(ReferenceSchema).optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type NutritionIntake = z.infer<typeof NutritionIntakeSchema>

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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
 * Action to occur or has occurred as part of plan
 * Identifies an action that has occurred or is a planned action to occur as part of the plan. For example, a medication to be used, lab tests to perform, self-monitoring that has occurred, education etc.
 */
export const CarePlanActivitySchema = BackboneElementSchema.extend({
  performedActivity: z.array(CodeableReferenceSchema).optional(),
  progress: z.array(AnnotationSchema).optional(),
  plannedActivityReference: ReferenceSchema.optional(),
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
  intent: z.enum(['proposal', 'plan', 'order', 'option', 'directive']),
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
  custodian: ReferenceSchema.optional(),
  contributor: z.array(ReferenceSchema).optional(),
  careTeam: z.array(ReferenceSchema).optional(),
  addresses: z.array(CodeableReferenceSchema).optional(),
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
 * Event information
 * Information code for an event with a corresponding date or period.
 */
export const CoverageEligibilityResponseEventSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  whenDateTime: z.string().optional(),
  _whenDateTime: ElementSchema.optional(),
  whenPeriod: PeriodSchema.optional(),
})
export type CoverageEligibilityResponseEvent = z.infer<typeof CoverageEligibilityResponseEventSchema>

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
  expression: z.array(z.string()).optional(),
  _expression: ElementSchema.optional(),
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
  event: z.array(CoverageEligibilityResponseEventSchema).optional(),
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
 * time Type: A time during the day, with no date specified
 */
export const timeSchema = PrimitiveTypeSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type time = z.infer<typeof timeSchema>

/**
 * base64Binary Type: A stream of bytes
 */
export const base64BinarySchema = PrimitiveTypeSchema.extend({
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
 * Groups cannot have answers and therefore must nest directly within item. When dealing with questions, nesting must occur within each answer because some questions may have multiple answers (and the nesting occurs for each answer).\nWhen dealing with repeating items, each group repetition will be handled by a separate item.  However, repeating questions are handled with a single question item and potentially multiple answers.
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
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  questionnaire: z.string(),
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
 * To define a boundary shape for this location use the standard extension `[http://hl7.org/fhir/StructureDefinition/location-boundary-geojson](http://hl7.org/fhir/extensions/StructureDefinition-location-boundary-geojson.html)`, and search using the `contains` special search parameter.
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
 * Details and position information for a place where services are provided and resources and participants may be stored, found, contained, or accommodated.
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
  contact: z.array(ExtendedContactDetailSchema).optional(),
  address: AddressSchema.optional(),
  form: CodeableConceptSchema.optional(),
  position: LocationPositionSchema.optional(),
  managingOrganization: ReferenceSchema.optional(),
  partOf: ReferenceSchema.optional(),
  characteristic: z.array(CodeableConceptSchema).optional(),
  hoursOfOperation: z.array(AvailabilitySchema).optional(),
  virtualService: z.array(VirtualServiceDetailSchema).optional(),
  endpoint: z.array(ReferenceSchema).optional(),
})
export type Location = z.infer<typeof LocationSchema>

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
  contact: z.array(ExtendedContactDetailSchema).optional(),
  endpoint: z.array(ReferenceSchema).optional(),
  network: z.array(ReferenceSchema).optional(),
  coverage: z.array(InsurancePlanCoverageSchema).optional(),
  plan: z.array(InsurancePlanPlanSchema).optional(),
})
export type InsurancePlan = z.infer<typeof InsurancePlanSchema>

/**
 * A human-readable display of key concepts to represent the citation
 */
export const CitationSummarySchema = BackboneElementSchema.extend({
  style: CodeableConceptSchema.optional(),
  text: z.string(),
  _text: ElementSchema.optional(),
})
export type CitationSummary = z.infer<typeof CitationSummarySchema>

/**
 * The assignment to an organizing scheme
 * Use this element if you need to classify the citation record independently from classifying the cited artifact.
 */
export const CitationClassificationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  classifier: z.array(CodeableConceptSchema).optional(),
})
export type CitationClassification = z.infer<typeof CitationClassificationSchema>

/**
 * An effective date or period for a status of the citation record
 * The state or status of the citation record paired with an effective date or period for that state.
 * Use this if needed for reporting the state or status of the citation record, NOT FOR reporting the state or status of the cited article.
 */
export const CitationStatusDateSchema = BackboneElementSchema.extend({
  activity: CodeableConceptSchema,
  actual: z.boolean().optional(),
  _actual: ElementSchema.optional(),
  period: PeriodSchema,
})
export type CitationStatusDate = z.infer<typeof CitationStatusDateSchema>

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
 * An effective date or period, historical or future, actual or expected, for a status of the cited artifact.
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
 * The abstract may be used to convey article-contained abstracts, externally-created abstracts, or other descriptive summaries.
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
 * The citedArtifact.relatesTo element uses a BackboneElement instead of the RelatedArtifact Datatype to enable use of an extended value set for the required code for the type of relationship.
 */
export const CitationCitedArtifactRelatesToSchema = BackboneElementSchema.extend({
  type: z.enum(['documentation', 'justification', 'citation', 'predecessor', 'successor', 'derived-from', 'depends-on', 'composed-of', 'part-of', 'amends', 'amended-with', 'appends', 'appended-with', 'cites', 'cited-by', 'comments-on', 'comment-in', 'contains', 'contained-in', 'corrects', 'correction-in', 'replaces', 'replaced-with', 'retracts', 'retracted-by', 'signs', 'similar-to', 'supports', 'supported-with', 'transforms', 'transformed-into', 'transformed-with', 'documents', 'specification-of', 'created-with', 'cite-as', 'reprint', 'reprint-of']),
  _type: ElementSchema.optional(),
  classifier: z.array(CodeableConceptSchema).optional(),
  label: z.string().optional(),
  _label: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  citation: z.string().optional(),
  _citation: ElementSchema.optional(),
  document: AttachmentSchema.optional(),
  resource: z.string().optional(),
  _resource: ElementSchema.optional(),
  resourceReference: ReferenceSchema.optional(),
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
 * If multiple, used to represent alternative forms of the article that are not separate citations
 * A common use is a journal article with a publication date and pagination for a print version and a different publication date for the online version of the same article.
 */
export const CitationCitedArtifactPublicationFormSchema = BackboneElementSchema.extend({
  publishedIn: CitationCitedArtifactPublicationFormPublishedInSchema.optional(),
  citedMedium: CodeableConceptSchema.optional(),
  volume: z.string().optional(),
  _volume: ElementSchema.optional(),
  issue: z.string().optional(),
  _issue: ElementSchema.optional(),
  articleDate: z.string().optional(),
  _articleDate: ElementSchema.optional(),
  publicationDateText: z.string().optional(),
  _publicationDateText: ElementSchema.optional(),
  publicationDateSeason: z.string().optional(),
  _publicationDateSeason: ElementSchema.optional(),
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
  classifier: z.array(CodeableConceptSchema).optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
})
export type CitationCitedArtifactWebLocation = z.infer<typeof CitationCitedArtifactWebLocationSchema>

/**
 * The assignment to an organizing scheme
 */
export const CitationCitedArtifactClassificationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  classifier: z.array(CodeableConceptSchema).optional(),
  artifactAssessment: z.array(ReferenceSchema).optional(),
})
export type CitationCitedArtifactClassification = z.infer<typeof CitationCitedArtifactClassificationSchema>

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
 * An individual entity named as a contributor
 * An individual entity named as a contributor, for example in the author list or contributor list.
 * Used to report contributorship in individualized ways.
 */
export const CitationCitedArtifactContributorshipEntrySchema = BackboneElementSchema.extend({
  contributor: ReferenceSchema,
  forenameInitials: z.string().optional(),
  _forenameInitials: ElementSchema.optional(),
  affiliation: z.array(ReferenceSchema).optional(),
  contributionType: z.array(CodeableConceptSchema).optional(),
  role: CodeableConceptSchema.optional(),
  contributionInstance: z.array(CitationCitedArtifactContributorshipEntryContributionInstanceSchema).optional(),
  correspondingContact: z.boolean().optional(),
  _correspondingContact: ElementSchema.optional(),
  rankingOrder: z.number().optional(),
  _rankingOrder: ElementSchema.optional(),
})
export type CitationCitedArtifactContributorshipEntry = z.infer<typeof CitationCitedArtifactContributorshipEntrySchema>

/**
 * Used to record a display of the author/contributor list without separate data element for each list member
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
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
 * The SubscriptionStatus resource describes the state of a Subscription during notifications. It is not persisted.
 */
export const SubscriptionStatusSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SubscriptionStatus'),
  status: z.enum(['requested', 'active', 'error', 'off', 'entered-in-error']).optional(),
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
 * Defined terms used in the measure documentation
 * Provides a description of an individual term used within the measure.
 */
export const MeasureTermSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  definition: z.string().optional(),
  _definition: ElementSchema.optional(),
})
export type MeasureTerm = z.infer<typeof MeasureTermSchema>

/**
 * Population criteria
 * A population criteria for the measure.
 */
export const MeasureGroupPopulationSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  criteria: ExpressionSchema.optional(),
  groupDefinition: ReferenceSchema.optional(),
  inputPopulationId: z.string().optional(),
  _inputPopulationId: ElementSchema.optional(),
  aggregateMethod: CodeableConceptSchema.optional(),
})
export type MeasureGroupPopulation = z.infer<typeof MeasureGroupPopulationSchema>

/**
 * Stratifier criteria component for the measure
 * A component of the stratifier criteria for the measure report, specified as either the name of a valid CQL expression defined within a referenced library or a valid FHIR Resource Path.
 * Stratifiers are defined either as a single criteria, or as a set of component criteria.
 */
export const MeasureGroupStratifierComponentSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  criteria: ExpressionSchema.optional(),
  groupDefinition: ReferenceSchema.optional(),
})
export type MeasureGroupStratifierComponent = z.infer<typeof MeasureGroupStratifierComponentSchema>

/**
 * Stratifier criteria for the measure
 * The stratifier criteria for the measure report, specified as either the name of a valid CQL expression defined within a referenced library or a valid FHIR Resource Path.
 */
export const MeasureGroupStratifierSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  criteria: ExpressionSchema.optional(),
  groupDefinition: ReferenceSchema.optional(),
  component: z.array(MeasureGroupStratifierComponentSchema).optional(),
})
export type MeasureGroupStratifier = z.infer<typeof MeasureGroupStratifierSchema>

/**
 * Population criteria group
 * A group of population criteria for the measure.
 */
export const MeasureGroupSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  subjectCodeableConcept: CodeableConceptSchema.optional(),
  subjectReference: ReferenceSchema.optional(),
  basis: z.enum(['Base', 'Element', 'BackboneElement', 'DataType', 'Address', 'Annotation', 'Attachment', 'Availability', 'BackboneType', 'Dosage', 'ElementDefinition', 'MarketingStatus', 'ProductShelfLife', 'Timing', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'DataRequirement', 'Expression', 'ExtendedContactDetail', 'Extension', 'HumanName', 'Identifier', 'Meta', 'MonetaryComponent', 'Money', 'Narrative', 'ParameterDefinition', 'Period', 'PrimitiveType', 'base64Binary', 'boolean', 'date', 'dateTime', 'decimal', 'instant', 'integer', 'positiveInt', 'unsignedInt', 'integer64', 'string', 'code', 'id', 'markdown', 'time', 'uri', 'canonical', 'oid', 'url', 'uuid', 'Quantity', 'Age', 'Count', 'Distance', 'Duration', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'TriggerDefinition', 'UsageContext', 'VirtualServiceDetail', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'CanonicalResource', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MetadataResource', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']).optional(),
  _basis: ElementSchema.optional(),
  scoring: CodeableConceptSchema.optional(),
  scoringUnit: CodeableConceptSchema.optional(),
  rateAggregation: z.string().optional(),
  _rateAggregation: ElementSchema.optional(),
  improvementNotation: CodeableConceptSchema.optional(),
  library: z.array(z.string()).optional(),
  _library: ElementSchema.optional(),
  population: z.array(MeasureGroupPopulationSchema).optional(),
  stratifier: z.array(MeasureGroupStratifierSchema).optional(),
})
export type MeasureGroup = z.infer<typeof MeasureGroupSchema>

/**
 * What other data should be reported with the measure
 * The supplemental data criteria for the measure report, specified as either the name of a valid CQL expression within a referenced library, or a valid FHIR Resource Path.
 * Note that supplemental data are reported as resources for each patient and referenced in the supplementalData element of the MeasureReport. If the supplementalData expression results in a value other than a resource, it is reported using an Observation resource, typically contained in the resulting MeasureReport. See the MeasureReport resource and the Quality Reporting topic for more information.
 */
export const MeasureSupplementalDataSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  basis: z.enum(['Base', 'Element', 'BackboneElement', 'DataType', 'Address', 'Annotation', 'Attachment', 'Availability', 'BackboneType', 'Dosage', 'ElementDefinition', 'MarketingStatus', 'ProductShelfLife', 'Timing', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'DataRequirement', 'Expression', 'ExtendedContactDetail', 'Extension', 'HumanName', 'Identifier', 'Meta', 'MonetaryComponent', 'Money', 'Narrative', 'ParameterDefinition', 'Period', 'PrimitiveType', 'base64Binary', 'boolean', 'date', 'dateTime', 'decimal', 'instant', 'integer', 'positiveInt', 'unsignedInt', 'integer64', 'string', 'code', 'id', 'markdown', 'time', 'uri', 'canonical', 'oid', 'url', 'uuid', 'Quantity', 'Age', 'Count', 'Distance', 'Duration', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'TriggerDefinition', 'UsageContext', 'VirtualServiceDetail', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'CanonicalResource', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MetadataResource', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']).optional(),
  _basis: ElementSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
  scoringUnit: CodeableConceptSchema.optional(),
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
  term: z.array(MeasureTermSchema).optional(),
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
  type: z.enum(['careteam', 'device', 'group', 'healthcareservice', 'location', 'organization', 'patient', 'practitioner', 'practitionerrole', 'relatedperson']).optional(),
  _type: ElementSchema.optional(),
  typeCanonical: z.string().optional(),
  _typeCanonical: ElementSchema.optional(),
  typeReference: ReferenceSchema.optional(),
  role: CodeableConceptSchema.optional(),
  function: CodeableConceptSchema.optional(),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
  kind: z.enum(['Appointment', 'AppointmentResponse', 'CarePlan', 'Claim', 'CommunicationRequest', 'CoverageEligibilityRequest', 'DeviceRequest', 'EnrollmentRequest', 'ImmunizationRecommendation', 'MedicationRequest', 'NutritionOrder', 'RequestOrchestration', 'ServiceRequest', 'SupplyRequest', 'Task', 'Transport', 'VisionPrescription']).optional(),
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
  timingAge: AgeSchema.optional(),
  timingRange: RangeSchema.optional(),
  timingDuration: DurationSchema.optional(),
  asNeededBoolean: z.boolean().optional(),
  _asNeededBoolean: ElementSchema.optional(),
  asNeededCodeableConcept: CodeableConceptSchema.optional(),
  location: CodeableReferenceSchema.optional(),
  participant: z.array(ActivityDefinitionParticipantSchema).optional(),
  productReference: ReferenceSchema.optional(),
  productCodeableConcept: CodeableConceptSchema.optional(),
  quantity: QuantitySchema.optional(),
  dosage: z.array(DosageSchema).optional(),
  bodySite: z.array(CodeableConceptSchema).optional(),
  specimenRequirement: z.array(z.string()).optional(),
  _specimenRequirement: ElementSchema.optional(),
  observationRequirement: z.array(z.string()).optional(),
  _observationRequirement: ElementSchema.optional(),
  observationResultRequirement: z.array(z.string()).optional(),
  _observationResultRequirement: ElementSchema.optional(),
  transform: z.string().optional(),
  _transform: ElementSchema.optional(),
  dynamicValue: z.array(ActivityDefinitionDynamicValueSchema).optional(),
})
export type ActivityDefinition = z.infer<typeof ActivityDefinitionSchema>

/**
 * Defines an affiliation/assotiation/relationship between 2 distinct organizations, that is not a part-of relationship/sub-division relationship.
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
  contact: z.array(ExtendedContactDetailSchema).optional(),
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
 * The list of medical reasons that are expected to be addressed during the episode of care
 * The reason communicates what medical problem the patient has that should be addressed during the episode of care.  This reason could be patient reported complaint, a clinical indication that was determined in a previous encounter or episode of care, or some planned care such as an immunization recommendation.  In the case where you have a primary reason, but are expecting to also address other problems, you can list the primary reason with a use code of 'Chief Complaint', while the other problems being addressed would have a use code of 'Reason for Visit'.Examples: * pregnancy would use HealthcareService or a coding as the reason * patient home monitoring could use Condition as the reason
 */
export const EpisodeOfCareReasonSchema = BackboneElementSchema.extend({
  use: CodeableConceptSchema.optional(),
  value: z.array(CodeableReferenceSchema).optional(),
})
export type EpisodeOfCareReason = z.infer<typeof EpisodeOfCareReasonSchema>

/**
 * The list of medical conditions that were addressed during the episode of care
 * The diagnosis communicates what medical conditions were actually addressed during the episode of care.  If a diagnosis was provided as a reason, and was treated during the episode of care, it may be listed in both EpisodeOfCare.reason and EpisodeOfCare.diagnosis.Diagnoses related to billing can be documented on the Account resources which supports ranking for the purpose of reimbursement.
 */
export const EpisodeOfCareDiagnosisSchema = BackboneElementSchema.extend({
  condition: z.array(CodeableReferenceSchema).optional(),
  use: CodeableConceptSchema.optional(),
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
  reason: z.array(EpisodeOfCareReasonSchema).optional(),
  diagnosis: z.array(EpisodeOfCareDiagnosisSchema).optional(),
  patient: ReferenceSchema,
  managingOrganization: ReferenceSchema.optional(),
  period: PeriodSchema.optional(),
  referralRequest: z.array(ReferenceSchema).optional(),
  careManager: ReferenceSchema.optional(),
  careTeam: z.array(ReferenceSchema).optional(),
  account: z.array(ReferenceSchema).optional(),
})
export type EpisodeOfCare = z.infer<typeof EpisodeOfCareSchema>

/**
 * The item or items in this listing
 */
export const InventoryReportInventoryListingItemSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema.optional(),
  quantity: QuantitySchema,
  item: CodeableReferenceSchema,
})
export type InventoryReportInventoryListingItem = z.infer<typeof InventoryReportInventoryListingItemSchema>

/**
 * An inventory listing section (grouped by any of the attributes)
 */
export const InventoryReportInventoryListingSchema = BackboneElementSchema.extend({
  location: ReferenceSchema.optional(),
  itemStatus: CodeableConceptSchema.optional(),
  countingDateTime: z.string().optional(),
  _countingDateTime: ElementSchema.optional(),
  item: z.array(InventoryReportInventoryListingItemSchema).optional(),
})
export type InventoryReportInventoryListing = z.infer<typeof InventoryReportInventoryListingSchema>

/**
 * A report of inventory or stock items.
 */
export const InventoryReportSchema = DomainResourceSchema.extend({
  resourceType: z.literal('InventoryReport'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'requested', 'active', 'entered-in-error']),
  _status: ElementSchema.optional(),
  countType: z.enum(['snapshot', 'difference']),
  _countType: ElementSchema.optional(),
  operationType: CodeableConceptSchema.optional(),
  operationTypeReason: CodeableConceptSchema.optional(),
  reportedDateTime: z.string(),
  _reportedDateTime: ElementSchema.optional(),
  reporter: ReferenceSchema.optional(),
  reportingPeriod: PeriodSchema.optional(),
  inventoryListing: z.array(InventoryReportInventoryListingSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type InventoryReport = z.infer<typeof InventoryReportSchema>

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
 * Represents a request a device to be provided to a specific patient. The device may be an implantable device to be subsequently implanted, or an external assistive device, such as a walker, to be delivered and subsequently be used.
 */
export const DeviceRequestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceRequest'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.array(z.string()).optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.array(z.string()).optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  replaces: z.array(ReferenceSchema).optional(),
  groupIdentifier: IdentifierSchema.optional(),
  status: z.enum(['draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown']).optional(),
  _status: ElementSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  doNotPerform: z.boolean().optional(),
  _doNotPerform: ElementSchema.optional(),
  code: CodeableReferenceSchema,
  quantity: z.number().optional(),
  _quantity: ElementSchema.optional(),
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
  performer: CodeableReferenceSchema.optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  asNeeded: z.boolean().optional(),
  _asNeeded: ElementSchema.optional(),
  asNeededFor: CodeableConceptSchema.optional(),
  insurance: z.array(ReferenceSchema).optional(),
  supportingInfo: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  relevantHistory: z.array(ReferenceSchema).optional(),
})
export type DeviceRequest = z.infer<typeof DeviceRequestSchema>

/**
 * markdown type: A string that may contain Github Flavored Markdown syntax for optional processing by a mark down presentation engine
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
  type: z.enum(['Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'Binary', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'Bundle', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Parameters', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription']),
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
  conditionalPatch: z.boolean().optional(),
  _conditionalPatch: ElementSchema.optional(),
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
 * A Capability Statement documents a set of capabilities (behaviors) of a FHIR Server or Client for a particular version of FHIR that may be used as a statement of actual server functionality or a statement of required or desired server implementation.
 */
export const CapabilityStatementSchema = DomainResourceSchema.extend({
  resourceType: z.literal('CapabilityStatement'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  kind: z.enum(['instance', 'capability', 'requirements']),
  _kind: ElementSchema.optional(),
  instantiates: z.array(z.string()).optional(),
  _instantiates: ElementSchema.optional(),
  imports: z.array(z.string()).optional(),
  _imports: ElementSchema.optional(),
  software: CapabilityStatementSoftwareSchema.optional(),
  implementation: CapabilityStatementImplementationSchema.optional(),
  fhirVersion: z.enum(['0.01', '0.05', '0.06', '0.11', '0.0', '0.0.80', '0.0.81', '0.0.82', '0.4', '0.4.0', '0.5', '0.5.0', '1.0', '1.0.0', '1.0.1', '1.0.2', '1.1', '1.1.0', '1.4', '1.4.0', '1.6', '1.6.0', '1.8', '1.8.0', '3.0', '3.0.0', '3.0.1', '3.0.2', '3.3', '3.3.0', '3.5', '3.5.0', '4.0', '4.0.0', '4.0.1', '4.1', '4.1.0', '4.2', '4.2.0', '4.3', '4.3.0', '4.3.0-cibuild', '4.3.0-snapshot1', '4.4', '4.4.0', '4.5', '4.5.0', '4.6', '4.6.0', '5.0', '5.0.0', '5.0.0-cibuild', '5.0.0-snapshot1', '5.0.0-snapshot2', '5.0.0-ballot', '5.0.0-snapshot3', '5.0.0-draft-final']),
  _fhirVersion: ElementSchema.optional(),
  format: z.array(z.string()),
  _format: ElementSchema.optional(),
  patchFormat: z.array(z.string()).optional(),
  _patchFormat: ElementSchema.optional(),
  acceptLanguage: z.array(z.string()).optional(),
  _acceptLanguage: ElementSchema.optional(),
  implementationGuide: z.array(z.string()).optional(),
  _implementationGuide: ElementSchema.optional(),
  rest: z.array(CapabilityStatementRestSchema).optional(),
  messaging: z.array(CapabilityStatementMessagingSchema).optional(),
  document: z.array(CapabilityStatementDocumentSchema).optional(),
})
export type CapabilityStatement = z.infer<typeof CapabilityStatementSchema>

/**
 * Set of payloads that are provided by this endpoint
 * The set of payloads that are provided/available at this endpoint.
 * Note that not all mimetypes or types will be listed under the one endpoint resource, there may be multiple instances that information for cases where other header data such as the endpoint address, active status/period etc. is different.
 */
export const EndpointPayloadSchema = BackboneElementSchema.extend({
  type: z.array(CodeableConceptSchema).optional(),
  mimeType: z.array(z.string()).optional(),
  _mimeType: ElementSchema.optional(),
})
export type EndpointPayload = z.infer<typeof EndpointPayloadSchema>

/**
 * The technical details of an endpoint that can be used for electronic services, such as for web services providing XDS.b, a REST endpoint for another FHIR server, or a s/Mime email address. This may include any security context information.
 */
export const EndpointSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Endpoint'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'suspended', 'error', 'off', 'entered-in-error']),
  _status: ElementSchema.optional(),
  connectionType: z.array(CodeableConceptSchema),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  environmentType: z.array(CodeableConceptSchema).optional(),
  managingOrganization: ReferenceSchema.optional(),
  contact: z.array(ContactPointSchema).optional(),
  period: PeriodSchema.optional(),
  payload: z.array(EndpointPayloadSchema).optional(),
  address: z.string(),
  _address: ElementSchema.optional(),
  header: z.array(z.string()).optional(),
  _header: ElementSchema.optional(),
})
export type Endpoint = z.infer<typeof EndpointSchema>

/**
 * Who performed event
 * Indicates who or what performed the event.
 */
export const DeviceDispensePerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type DeviceDispensePerformer = z.infer<typeof DeviceDispensePerformerSchema>

/**
 * Indicates that a device is to be or has been dispensed for a named person/patient.  This includes a description of the product (supply) provided and the instructions for using the device.
 */
export const DeviceDispenseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceDispense'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['preparation', 'in-progress', 'cancelled', 'on-hold', 'completed', 'entered-in-error', 'stopped', 'declined', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: CodeableReferenceSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  device: CodeableReferenceSchema,
  subject: ReferenceSchema,
  receiver: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  performer: z.array(DeviceDispensePerformerSchema).optional(),
  location: ReferenceSchema.optional(),
  type: CodeableConceptSchema.optional(),
  quantity: QuantitySchema.optional(),
  preparedDate: z.string().optional(),
  _preparedDate: ElementSchema.optional(),
  whenHandedOver: z.string().optional(),
  _whenHandedOver: ElementSchema.optional(),
  destination: ReferenceSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  usageInstruction: z.string().optional(),
  _usageInstruction: ElementSchema.optional(),
  eventHistory: z.array(ReferenceSchema).optional(),
})
export type DeviceDispense = z.infer<typeof DeviceDispenseSchema>

/**
 * The starting materials - monomer(s) used in the synthesis of the polymer
 */
export const SubstancePolymerMonomerSetStartingMaterialSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  isDefining: z.boolean().optional(),
  _isDefining: ElementSchema.optional(),
  amount: QuantitySchema.optional(),
})
export type SubstancePolymerMonomerSetStartingMaterial = z.infer<typeof SubstancePolymerMonomerSetStartingMaterialSchema>

/**
 * Todo
 */
export const SubstancePolymerMonomerSetSchema = BackboneElementSchema.extend({
  ratioType: CodeableConceptSchema.optional(),
  startingMaterial: z.array(SubstancePolymerMonomerSetStartingMaterialSchema).optional(),
})
export type SubstancePolymerMonomerSet = z.infer<typeof SubstancePolymerMonomerSetSchema>

/**
 * Applies to homopolymer and block co-polymers where the degree of polymerisation within a block can be described
 */
export const SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  average: z.number().optional(),
  _average: ElementSchema.optional(),
  low: z.number().optional(),
  _low: ElementSchema.optional(),
  high: z.number().optional(),
  _high: ElementSchema.optional(),
})
export type SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation = z.infer<typeof SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisationSchema>

/**
 * A graphical structure for this SRU
 */
export const SubstancePolymerRepeatRepeatUnitStructuralRepresentationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  representation: z.string().optional(),
  _representation: ElementSchema.optional(),
  format: CodeableConceptSchema.optional(),
  attachment: AttachmentSchema.optional(),
})
export type SubstancePolymerRepeatRepeatUnitStructuralRepresentation = z.infer<typeof SubstancePolymerRepeatRepeatUnitStructuralRepresentationSchema>

/**
 * An SRU - Structural Repeat Unit
 */
export const SubstancePolymerRepeatRepeatUnitSchema = BackboneElementSchema.extend({
  unit: z.string().optional(),
  _unit: ElementSchema.optional(),
  orientation: CodeableConceptSchema.optional(),
  amount: z.number().optional(),
  _amount: ElementSchema.optional(),
  degreeOfPolymerisation: z.array(SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisationSchema).optional(),
  structuralRepresentation: z.array(SubstancePolymerRepeatRepeatUnitStructuralRepresentationSchema).optional(),
})
export type SubstancePolymerRepeatRepeatUnit = z.infer<typeof SubstancePolymerRepeatRepeatUnitSchema>

/**
 * Specifies and quantifies the repeated units and their configuration
 */
export const SubstancePolymerRepeatSchema = BackboneElementSchema.extend({
  averageMolecularFormula: z.string().optional(),
  _averageMolecularFormula: ElementSchema.optional(),
  repeatUnitAmountType: CodeableConceptSchema.optional(),
  repeatUnit: z.array(SubstancePolymerRepeatRepeatUnitSchema).optional(),
})
export type SubstancePolymerRepeat = z.infer<typeof SubstancePolymerRepeatSchema>

/**
 * Properties of a substance specific to it being a polymer.
 */
export const SubstancePolymerSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SubstancePolymer'),
  identifier: IdentifierSchema.optional(),
  class: CodeableConceptSchema.optional(),
  geometry: CodeableConceptSchema.optional(),
  copolymerConnectivity: z.array(CodeableConceptSchema).optional(),
  modification: z.string().optional(),
  _modification: ElementSchema.optional(),
  monomerSet: z.array(SubstancePolymerMonomerSetSchema).optional(),
  repeat: z.array(SubstancePolymerRepeatSchema).optional(),
})
export type SubstancePolymer = z.infer<typeof SubstancePolymerSchema>

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
  instance: z.boolean(),
  _instance: ElementSchema.optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableReferenceSchema,
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  expiry: z.string().optional(),
  _expiry: ElementSchema.optional(),
  quantity: QuantitySchema.optional(),
  ingredient: z.array(SubstanceIngredientSchema).optional(),
})
export type Substance = z.infer<typeof SubstanceSchema>

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
  type: z.enum(['person', 'animal', 'practitioner', 'device', 'careteam', 'healthcareservice', 'location', 'organization', 'relatedperson', 'specimen']),
  _type: ElementSchema.optional(),
  membership: z.enum(['definitional', 'enumerated']),
  _membership: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
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
  modality: CodeableConceptSchema,
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  numberOfInstances: z.number().optional(),
  _numberOfInstances: ElementSchema.optional(),
  endpoint: z.array(ReferenceSchema).optional(),
  bodySite: CodeableReferenceSchema.optional(),
  laterality: CodeableConceptSchema.optional(),
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
  modality: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  started: z.string().optional(),
  _started: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  referrer: ReferenceSchema.optional(),
  endpoint: z.array(ReferenceSchema).optional(),
  numberOfSeries: z.number().optional(),
  _numberOfSeries: ElementSchema.optional(),
  numberOfInstances: z.number().optional(),
  _numberOfInstances: ElementSchema.optional(),
  procedure: z.array(CodeableReferenceSchema).optional(),
  location: ReferenceSchema.optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  series: z.array(ImagingStudySeriesSchema).optional(),
})
export type ImagingStudy = z.infer<typeof ImagingStudySchema>

/**
 * The linkages between sugar residues will also be captured
 */
export const SubstanceNucleicAcidSubunitLinkageSchema = BackboneElementSchema.extend({
  connectivity: z.string().optional(),
  _connectivity: ElementSchema.optional(),
  identifier: IdentifierSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  residueSite: z.string().optional(),
  _residueSite: ElementSchema.optional(),
})
export type SubstanceNucleicAcidSubunitLinkage = z.infer<typeof SubstanceNucleicAcidSubunitLinkageSchema>

/**
 * 5.3.6.8.1 Sugar ID (Mandatory)
 */
export const SubstanceNucleicAcidSubunitSugarSchema = BackboneElementSchema.extend({
  identifier: IdentifierSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  residueSite: z.string().optional(),
  _residueSite: ElementSchema.optional(),
})
export type SubstanceNucleicAcidSubunitSugar = z.infer<typeof SubstanceNucleicAcidSubunitSugarSchema>

/**
 * Subunits are listed in order of decreasing length; sequences of the same length will be ordered by molecular weight; subunits that have identical sequences will be repeated multiple times
 */
export const SubstanceNucleicAcidSubunitSchema = BackboneElementSchema.extend({
  subunit: z.number().optional(),
  _subunit: ElementSchema.optional(),
  sequence: z.string().optional(),
  _sequence: ElementSchema.optional(),
  length: z.number().optional(),
  _length: ElementSchema.optional(),
  sequenceAttachment: AttachmentSchema.optional(),
  fivePrime: CodeableConceptSchema.optional(),
  threePrime: CodeableConceptSchema.optional(),
  linkage: z.array(SubstanceNucleicAcidSubunitLinkageSchema).optional(),
  sugar: z.array(SubstanceNucleicAcidSubunitSugarSchema).optional(),
})
export type SubstanceNucleicAcidSubunit = z.infer<typeof SubstanceNucleicAcidSubunitSchema>

/**
 * Nucleic acids are defined by three distinct elements: the base, sugar and linkage. Individual substance/moiety IDs will be created for each of these elements. The nucleotide sequence will be always entered in the 5’-3’ direction.
 */
export const SubstanceNucleicAcidSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SubstanceNucleicAcid'),
  sequenceType: CodeableConceptSchema.optional(),
  numberOfSubunits: z.number().optional(),
  _numberOfSubunits: ElementSchema.optional(),
  areaOfHybridisation: z.string().optional(),
  _areaOfHybridisation: ElementSchema.optional(),
  oligoNucleotideType: CodeableConceptSchema.optional(),
  subunit: z.array(SubstanceNucleicAcidSubunitSchema).optional(),
})
export type SubstanceNucleicAcid = z.infer<typeof SubstanceNucleicAcidSchema>

/**
 * dateTime Type: A date, date-time or partial date (e.g. just year or year + month).  If hours and minutes are specified, a UTC offset SHALL be populated. The format is a union of the schema types gYear, gYearMonth, date and dateTime. Seconds must be provided due to schema type constraints but may be zero-filled and may be ignored.                 Dates SHALL be valid dates.
 */
export const dateTimeSchema = PrimitiveTypeSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type dateTime = z.infer<typeof dateTimeSchema>

/**
 * Qualifications, certifications, accreditations, licenses, training, etc. pertaining to the provision of care
 * The official certifications, accreditations, training, designations and licenses that authorize and/or otherwise endorse the provision of care by the organization.For example, an approval to provide a type of services issued by a certifying body (such as the US Joint Commission) to an organization.
 */
export const OrganizationQualificationSchema = BackboneElementSchema.extend({
  identifier: z.array(IdentifierSchema).optional(),
  code: CodeableConceptSchema,
  period: PeriodSchema.optional(),
  issuer: ReferenceSchema.optional(),
})
export type OrganizationQualification = z.infer<typeof OrganizationQualificationSchema>

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
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  contact: z.array(ExtendedContactDetailSchema).optional(),
  partOf: ReferenceSchema.optional(),
  endpoint: z.array(ReferenceSchema).optional(),
  qualification: z.array(OrganizationQualificationSchema).optional(),
})
export type Organization = z.infer<typeof OrganizationSchema>

/**
 * Contributor Type: A contributor to the content of a knowledge asset, including authors, editors, reviewers, and endorsers.
 */
export const ContributorSchema = DataTypeSchema.extend({
  type: z.enum(['author', 'editor', 'reviewer', 'endorser']),
  _type: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
})
export type Contributor = z.infer<typeof ContributorSchema>

/**
 * A sequence used as starting sequence
 * A sequence that is used as a starting sequence to describe variants that are present in a sequence analyzed.
 */
export const MolecularSequenceRelativeStartingSequenceSchema = BackboneElementSchema.extend({
  genomeAssembly: CodeableConceptSchema.optional(),
  chromosome: CodeableConceptSchema.optional(),
  sequenceCodeableConcept: CodeableConceptSchema.optional(),
  sequenceString: z.string().optional(),
  _sequenceString: ElementSchema.optional(),
  sequenceReference: ReferenceSchema.optional(),
  windowStart: z.number().optional(),
  _windowStart: ElementSchema.optional(),
  windowEnd: z.number().optional(),
  _windowEnd: ElementSchema.optional(),
  orientation: z.enum(['sense', 'antisense']).optional(),
  _orientation: ElementSchema.optional(),
  strand: z.enum(['watson', 'crick']).optional(),
  _strand: ElementSchema.optional(),
})
export type MolecularSequenceRelativeStartingSequence = z.infer<typeof MolecularSequenceRelativeStartingSequenceSchema>

/**
 * Changes in sequence from the starting sequence
 */
export const MolecularSequenceRelativeEditSchema = BackboneElementSchema.extend({
  start: z.number().optional(),
  _start: ElementSchema.optional(),
  end: z.number().optional(),
  _end: ElementSchema.optional(),
  replacementSequence: z.string().optional(),
  _replacementSequence: ElementSchema.optional(),
  replacedSequence: z.string().optional(),
  _replacedSequence: ElementSchema.optional(),
})
export type MolecularSequenceRelativeEdit = z.infer<typeof MolecularSequenceRelativeEditSchema>

/**
 * A sequence defined relative to another sequence
 */
export const MolecularSequenceRelativeSchema = BackboneElementSchema.extend({
  coordinateSystem: CodeableConceptSchema,
  ordinalPosition: z.number().optional(),
  _ordinalPosition: ElementSchema.optional(),
  sequenceRange: RangeSchema.optional(),
  startingSequence: MolecularSequenceRelativeStartingSequenceSchema.optional(),
  edit: z.array(MolecularSequenceRelativeEditSchema).optional(),
})
export type MolecularSequenceRelative = z.infer<typeof MolecularSequenceRelativeSchema>

/**
 * Representation of a molecular sequence.
 */
export const MolecularSequenceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MolecularSequence'),
  identifier: z.array(IdentifierSchema).optional(),
  type: z.enum(['aa', 'dna', 'rna']).optional(),
  _type: ElementSchema.optional(),
  subject: ReferenceSchema.optional(),
  focus: z.array(ReferenceSchema).optional(),
  specimen: ReferenceSchema.optional(),
  device: ReferenceSchema.optional(),
  performer: ReferenceSchema.optional(),
  literal: z.string().optional(),
  _literal: ElementSchema.optional(),
  formatted: z.array(AttachmentSchema).optional(),
  relative: z.array(MolecularSequenceRelativeSchema).optional(),
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
  indication: z.array(CodeableReferenceSchema).optional(),
  intendedUse: CodeableConceptSchema.optional(),
  basis: z.array(CodeableConceptSchema).optional(),
  holder: ReferenceSchema.optional(),
  regulator: ReferenceSchema.optional(),
  attachedDocument: z.array(ReferenceSchema).optional(),
  case: RegulatedAuthorizationCaseSchema.optional(),
})
export type RegulatedAuthorization = z.infer<typeof RegulatedAuthorizationSchema>

/**
 * boolean Type: Value of "true" or "false"
 */
export const booleanSchema = PrimitiveTypeSchema.extend({
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
  condition?: Expression | undefined
  effectivePeriod?: Period | undefined
  relatedArtifact?: RelatedArtifact | undefined
}

export const ChargeItemDefinitionApplicabilitySchema: z.ZodType<ChargeItemDefinitionApplicability> = z.lazy(() =>
  BackboneElementSchema.extend({
    condition: ExpressionSchema.optional(),
    effectivePeriod: PeriodSchema.optional(),
    relatedArtifact: RelatedArtifactSchema.optional(),
  })
)

/**
 * Group of properties which are applicable under the same conditions
 * Group of properties which are applicable under the same conditions. If no applicability rules are established for the group, then all properties always apply.
 */
export const ChargeItemDefinitionPropertyGroupSchema = BackboneElementSchema.extend({
  applicability: z.lazy(() => z.array(ChargeItemDefinitionApplicabilitySchema)).optional(),
  priceComponent: z.array(MonetaryComponentSchema).optional(),
})
export type ChargeItemDefinitionPropertyGroup = z.infer<typeof ChargeItemDefinitionPropertyGroupSchema>

/**
 * The ChargeItemDefinition resource provides the properties that apply to the (billing) codes necessary to calculate costs and prices. The properties may differ largely depending on type and realm, therefore this resource gives only a rough structure and requires profiling for each type of billing code system.
 */
export const ChargeItemDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ChargeItemDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
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
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  instance: z.array(ReferenceSchema).optional(),
  applicability: z.array(ChargeItemDefinitionApplicabilitySchema).optional(),
  propertyGroup: z.array(ChargeItemDefinitionPropertyGroupSchema).optional(),
})
export type ChargeItemDefinition = z.infer<typeof ChargeItemDefinitionSchema>

/**
 * Only allow data when
 * A constraint indicating that this item should only be enabled (displayed/allow answers to be captured) when the specified condition is true.
 * If multiple repetitions of this extension are present, the interpretation is driven by enableBehavior (either all repetitions must evaluate to true for this item to be enabled, or only one must evaluate to true for the item to be enabled).  If the enableWhen.question has multiple answers, the condition evaluates to true if *any* of the answers for the referenced item match the enableWhen condition.  This element is a modifier because if enableWhen is present for an item, "required" is ignored unless one of the enableWhen conditions is met. When an item is disabled, all of its descendants are disabled, regardless of what their own enableWhen logic might evaluate to.  If enableWhen logic depends on an item that is disabled, the logic should proceed as though the item is not valued - even if a default value or other value might be retained in memory in the event of the item being re-enabled.  In some cases, the comparison between the indicated answer and the specified value may differ only by precision.  For example, the enableWhen might be Q1 > 1970, but the answer to Q1 is 1970-10-15.  There is not a clear answer as to whether 1970-10-15 should be considered 'greater' than 1970, given that it is an imprecise value.  In these indeterminate situations, the form filler has the option of refusing to render the form.  If the form **is** displayed, items where enableWhen is indeterminate SHOULD be treated as enabled with a warning indicating that the questionnaire logic was faulty and it is possible that the item should not be enabled.  Questionnaires SHOULD be designed to take into account challenges around varying precision to minimize non-deterministic situations by setting constraints around expected precision, etc.
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
 * One of the permitted answers for the question.
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
 * The user is allowed to change the value and override the default (unless marked as read-only). If the user doesn't change the value, then this initial value will be persisted when the QuestionnaireResponse is initially created.  Note that initial values can influence results.  The data type of initial.answer[x] must agree with the item.type, and only repeating items can have more then one initial value.
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
  type: ('group'|'display'|'question'|'boolean'|'decimal'|'integer'|'date'|'dateTime'|'time'|'string'|'text'|'url'|'coding'|'attachment'|'reference'|'quantity')
  _type?: Element | undefined
  enableWhen?: QuestionnaireItemEnableWhen[] | undefined
  enableBehavior?: ('all'|'any') | undefined
  _enableBehavior?: Element | undefined
  disabledDisplay?: ('hidden'|'protected') | undefined
  _disabledDisplay?: Element | undefined
  required?: boolean | undefined
  _required?: Element | undefined
  repeats?: boolean | undefined
  _repeats?: Element | undefined
  readOnly?: boolean | undefined
  _readOnly?: Element | undefined
  maxLength?: number | undefined
  _maxLength?: Element | undefined
  answerConstraint?: ('optionsOnly'|'optionsOrType'|'optionsOrString') | undefined
  _answerConstraint?: Element | undefined
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
    type: z.enum(['group', 'display', 'question', 'boolean', 'decimal', 'integer', 'date', 'dateTime', 'time', 'string', 'text', 'url', 'coding', 'attachment', 'reference', 'quantity']),
      _type: ElementSchema.optional(),
    enableWhen: z.array(QuestionnaireItemEnableWhenSchema).optional(),
    enableBehavior: z.enum(['all', 'any']).optional(),
      _enableBehavior: ElementSchema.optional(),
    disabledDisplay: z.enum(['hidden', 'protected']).optional(),
      _disabledDisplay: ElementSchema.optional(),
    required: z.boolean().optional(),
      _required: ElementSchema.optional(),
    repeats: z.boolean().optional(),
      _repeats: ElementSchema.optional(),
    readOnly: z.boolean().optional(),
      _readOnly: ElementSchema.optional(),
    maxLength: z.number().optional(),
      _maxLength: ElementSchema.optional(),
    answerConstraint: z.enum(['optionsOnly', 'optionsOrType', 'optionsOrString']).optional(),
      _answerConstraint: ElementSchema.optional(),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  subjectType: z.array(z.enum(['Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'Binary', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'Bundle', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Parameters', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription'])).optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
  url: z.string().optional(),
  _url: ElementSchema.optional(),
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
  url: z.string().optional(),
  _url: ElementSchema.optional(),
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
 * Indication of the artifact(s) that are tested by this test case
 * The scope indicates a conformance artifact that is tested by the test(s) within this test case and the expectation of the test outcome(s) as well as the intended test phase inclusion.
 */
export const TestScriptScopeSchema = BackboneElementSchema.extend({
  artifact: z.string(),
  _artifact: ElementSchema.optional(),
  conformance: CodeableConceptSchema.optional(),
  phase: CodeableConceptSchema.optional(),
})
export type TestScriptScope = z.infer<typeof TestScriptScopeSchema>

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
 * This gives control to test-script writers to set headers explicitly based on test requirements.  It will allow for testing using:  - "If-Modified-Since" and "If-None-Match" headers.  ["If-Match" header](http.html#2.1.0.5.1).  See [Conditional Create using "If-None-Exist"](http.html#2.1.0.11).  See [Invalid "Content-Type" header](http.html#2.1.0.13.1) for negative testing. - etc.
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
  resource?: string | undefined
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
    resource: z.string().optional(),
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
 * Links or references to the testing requirements
 * Links or references providing traceability to the testing requirements for this assert.
 * TestScript and TestReport instances are typically (and expected to be) based on known, defined test requirements and documentation. These links provide traceability from the executable/executed TestScript and TestReport tests to these requirements.
 */
export const TestScriptSetupActionAssertRequirementSchema = BackboneElementSchema.extend({
  linkUri: z.string().optional(),
  _linkUri: ElementSchema.optional(),
  linkCanonical: z.string().optional(),
  _linkCanonical: ElementSchema.optional(),
})
export type TestScriptSetupActionAssertRequirement = z.infer<typeof TestScriptSetupActionAssertRequirementSchema>

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
  defaultManualCompletion?: ('fail'|'pass'|'skip'|'stop') | undefined
  _defaultManualCompletion?: Element | undefined
  expression?: string | undefined
  _expression?: Element | undefined
  headerField?: string | undefined
  _headerField?: Element | undefined
  minimumId?: string | undefined
  _minimumId?: Element | undefined
  navigationLinks?: boolean | undefined
  _navigationLinks?: Element | undefined
  operator?: ('equals'|'notEquals'|'in'|'notIn'|'greaterThan'|'lessThan'|'empty'|'notEmpty'|'contains'|'notContains'|'eval'|'manualEval') | undefined
  _operator?: Element | undefined
  path?: string | undefined
  _path?: Element | undefined
  requestMethod?: ('delete'|'get'|'options'|'patch'|'post'|'put'|'head') | undefined
  _requestMethod?: Element | undefined
  requestURL?: string | undefined
  _requestURL?: Element | undefined
  resource?: string | undefined
  _resource?: Element | undefined
  response?: ('continue'|'switchingProtocols'|'okay'|'created'|'accepted'|'nonAuthoritativeInformation'|'noContent'|'resetContent'|'partialContent'|'multipleChoices'|'movedPermanently'|'found'|'seeOther'|'notModified'|'useProxy'|'temporaryRedirect'|'permanentRedirect'|'badRequest'|'unauthorized'|'paymentRequired'|'forbidden'|'notFound'|'methodNotAllowed'|'notAcceptable'|'proxyAuthenticationRequired'|'requestTimeout'|'conflict'|'gone'|'lengthRequired'|'preconditionFailed'|'contentTooLarge'|'uriTooLong'|'unsupportedMediaType'|'rangeNotSatisfiable'|'expectationFailed'|'misdirectedRequest'|'unprocessableContent'|'upgradeRequired'|'internalServerError'|'notImplemented'|'badGateway'|'serviceUnavailable'|'gatewayTimeout'|'httpVersionNotSupported') | undefined
  _response?: Element | undefined
  responseCode?: string | undefined
  _responseCode?: Element | undefined
  sourceId?: string | undefined
  _sourceId?: Element | undefined
  stopTestOnFail: boolean
  _stopTestOnFail?: Element | undefined
  validateProfileId?: string | undefined
  _validateProfileId?: Element | undefined
  value?: string | undefined
  _value?: Element | undefined
  warningOnly: boolean
  _warningOnly?: Element | undefined
  requirement?: TestScriptSetupActionAssertRequirement[] | undefined
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
    defaultManualCompletion: z.enum(['fail', 'pass', 'skip', 'stop']).optional(),
      _defaultManualCompletion: ElementSchema.optional(),
    expression: z.string().optional(),
      _expression: ElementSchema.optional(),
    headerField: z.string().optional(),
      _headerField: ElementSchema.optional(),
    minimumId: z.string().optional(),
      _minimumId: ElementSchema.optional(),
    navigationLinks: z.boolean().optional(),
      _navigationLinks: ElementSchema.optional(),
    operator: z.enum(['equals', 'notEquals', 'in', 'notIn', 'greaterThan', 'lessThan', 'empty', 'notEmpty', 'contains', 'notContains', 'eval', 'manualEval']).optional(),
      _operator: ElementSchema.optional(),
    path: z.string().optional(),
      _path: ElementSchema.optional(),
    requestMethod: z.enum(['delete', 'get', 'options', 'patch', 'post', 'put', 'head']).optional(),
      _requestMethod: ElementSchema.optional(),
    requestURL: z.string().optional(),
      _requestURL: ElementSchema.optional(),
    resource: z.string().optional(),
      _resource: ElementSchema.optional(),
    response: z.enum(['continue', 'switchingProtocols', 'okay', 'created', 'accepted', 'nonAuthoritativeInformation', 'noContent', 'resetContent', 'partialContent', 'multipleChoices', 'movedPermanently', 'found', 'seeOther', 'notModified', 'useProxy', 'temporaryRedirect', 'permanentRedirect', 'badRequest', 'unauthorized', 'paymentRequired', 'forbidden', 'notFound', 'methodNotAllowed', 'notAcceptable', 'proxyAuthenticationRequired', 'requestTimeout', 'conflict', 'gone', 'lengthRequired', 'preconditionFailed', 'contentTooLarge', 'uriTooLong', 'unsupportedMediaType', 'rangeNotSatisfiable', 'expectationFailed', 'misdirectedRequest', 'unprocessableContent', 'upgradeRequired', 'internalServerError', 'notImplemented', 'badGateway', 'serviceUnavailable', 'gatewayTimeout', 'httpVersionNotSupported']).optional(),
      _response: ElementSchema.optional(),
    responseCode: z.string().optional(),
      _responseCode: ElementSchema.optional(),
    sourceId: z.string().optional(),
      _sourceId: ElementSchema.optional(),
    stopTestOnFail: z.boolean(),
      _stopTestOnFail: ElementSchema.optional(),
    validateProfileId: z.string().optional(),
      _validateProfileId: ElementSchema.optional(),
    value: z.string().optional(),
      _value: ElementSchema.optional(),
    warningOnly: z.boolean(),
      _warningOnly: ElementSchema.optional(),
    requirement: z.array(TestScriptSetupActionAssertRequirementSchema).optional(),
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
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  origin: z.array(TestScriptOriginSchema).optional(),
  destination: z.array(TestScriptDestinationSchema).optional(),
  metadata: TestScriptMetadataSchema.optional(),
  scope: z.array(TestScriptScopeSchema).optional(),
  fixture: z.array(TestScriptFixtureSchema).optional(),
  profile: z.array(z.string()).optional(),
  _profile: ElementSchema.optional(),
  variable: z.array(TestScriptVariableSchema).optional(),
  setup: TestScriptSetupSchema.optional(),
  test: z.array(TestScriptTestSchema).optional(),
  teardown: TestScriptTeardownSchema.optional(),
})
export type TestScript = z.infer<typeof TestScriptSchema>

/**
 * Additional names for the study
 */
export const ResearchStudyLabelSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type ResearchStudyLabel = z.infer<typeof ResearchStudyLabelSchema>

/**
 * Sponsors, collaborators, and other parties
 * For a Sponsor or a PrincipalInvestigator use the dedicated attributes provided.
 */
export const ResearchStudyAssociatedPartySchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  role: CodeableConceptSchema,
  period: z.array(PeriodSchema).optional(),
  classifier: z.array(CodeableConceptSchema).optional(),
  party: ReferenceSchema.optional(),
})
export type ResearchStudyAssociatedParty = z.infer<typeof ResearchStudyAssociatedPartySchema>

/**
 * Status of study with time for that status
 */
export const ResearchStudyProgressStatusSchema = BackboneElementSchema.extend({
  state: CodeableConceptSchema,
  actual: z.boolean().optional(),
  _actual: ElementSchema.optional(),
  period: PeriodSchema.optional(),
})
export type ResearchStudyProgressStatus = z.infer<typeof ResearchStudyProgressStatusSchema>

/**
 * Target or actual group of participants enrolled in study
 */
export const ResearchStudyRecruitmentSchema = BackboneElementSchema.extend({
  targetNumber: z.number().optional(),
  _targetNumber: ElementSchema.optional(),
  actualNumber: z.number().optional(),
  _actualNumber: ElementSchema.optional(),
  eligibility: ReferenceSchema.optional(),
  actualGroup: ReferenceSchema.optional(),
})
export type ResearchStudyRecruitment = z.infer<typeof ResearchStudyRecruitmentSchema>

/**
 * Defined path through the study for a subject
 * Describes an expected event or sequence of events for one of the subjects of a study. E.g. for a living subject: exposure to drug A, wash-out, exposure to drug B, wash-out, follow-up. E.g. for a stability study: {store sample from lot A at 25 degrees for 1 month}, {store sample from lot A at 40 degrees for 1 month}.
 * In many clinical trials this is refered to as the ARM of the study, but such a term is not used in other sorts of trials even when there is a comparison between two or more groups.
 */
export const ResearchStudyComparisonGroupSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  intendedExposure: z.array(ReferenceSchema).optional(),
  observedGroup: ReferenceSchema.optional(),
})
export type ResearchStudyComparisonGroup = z.infer<typeof ResearchStudyComparisonGroupSchema>

/**
 * A goal for the study
 * A goal that the study is aiming to achieve in terms of a scientific question to be answered by the analysis of data collected during the study.
 */
export const ResearchStudyObjectiveSchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type ResearchStudyObjective = z.infer<typeof ResearchStudyObjectiveSchema>

/**
 * A variable measured during the study
 * An "outcome measure", "endpoint", "effect measure" or "measure of effect" is a specific measurement or observation used to quantify the effect of experimental variables on the participants in a study, or for observational studies, to describe patterns of diseases or traits or associations with exposures, risk factors or treatment.
 * A study may have multiple distinct outcome measures that can be used to assess the overall goal for a study. The goal of a study is in the objective whereas the metric by which the goal is assessed is the outcomeMeasure. Examples: Time to Local Recurrence (TLR), Disease-free Survival (DFS), 30 Day Mortality, Systolic BP
 */
export const ResearchStudyOutcomeMeasureSchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  reference: ReferenceSchema.optional(),
})
export type ResearchStudyOutcomeMeasure = z.infer<typeof ResearchStudyOutcomeMeasureSchema>

/**
 * A scientific study of nature that sometimes includes processes involved in health and disease. For example, clinical trials are research studies that involve people. These studies may be related to new ways to screen, prevent, diagnose, and treat disease. They may also study certain outcomes and certain groups of people by looking at data collected in the past or future.
 */
export const ResearchStudySchema = DomainResourceSchema.extend({
  resourceType: z.literal('ResearchStudy'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  label: z.array(ResearchStudyLabelSchema).optional(),
  protocol: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  primaryPurposeType: CodeableConceptSchema.optional(),
  phase: CodeableConceptSchema.optional(),
  studyDesign: z.array(CodeableConceptSchema).optional(),
  focus: z.array(CodeableReferenceSchema).optional(),
  condition: z.array(CodeableConceptSchema).optional(),
  keyword: z.array(CodeableConceptSchema).optional(),
  region: z.array(CodeableConceptSchema).optional(),
  descriptionSummary: z.string().optional(),
  _descriptionSummary: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  site: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  classifier: z.array(CodeableConceptSchema).optional(),
  associatedParty: z.array(ResearchStudyAssociatedPartySchema).optional(),
  progressStatus: z.array(ResearchStudyProgressStatusSchema).optional(),
  whyStopped: CodeableConceptSchema.optional(),
  recruitment: ResearchStudyRecruitmentSchema.optional(),
  comparisonGroup: z.array(ResearchStudyComparisonGroupSchema).optional(),
  objective: z.array(ResearchStudyObjectiveSchema).optional(),
  outcomeMeasure: z.array(ResearchStudyOutcomeMeasureSchema).optional(),
  result: z.array(ReferenceSchema).optional(),
})
export type ResearchStudy = z.infer<typeof ResearchStudySchema>

/**
 * A specific set of Roles/Locations/specialties/services that a practitioner may perform, or has performed at an organization during a period of time.
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
  contact: z.array(ExtendedContactDetailSchema).optional(),
  characteristic: z.array(CodeableConceptSchema).optional(),
  communication: z.array(CodeableConceptSchema).optional(),
  availability: z.array(AvailabilitySchema).optional(),
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
 * Links or references to the testing requirements
 * Links or references providing traceability to the testing requirements for this assert.
 * TestScript and TestReport instances are typically (and expected to be) based on known, defined test requirements and documentation. These links provide traceability from the executable/executed TestScript and TestReport tests to these requirements.
 */
export const TestReportSetupActionAssertRequirementSchema = BackboneElementSchema.extend({
  linkUri: z.string().optional(),
  _linkUri: ElementSchema.optional(),
  linkCanonical: z.string().optional(),
  _linkCanonical: ElementSchema.optional(),
})
export type TestReportSetupActionAssertRequirement = z.infer<typeof TestReportSetupActionAssertRequirementSchema>

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
  requirement?: TestReportSetupActionAssertRequirement[] | undefined
}

export const TestReportSetupActionAssertSchema: z.ZodType<TestReportSetupActionAssert> = z.lazy(() =>
  BackboneElementSchema.extend({
    result: z.enum(['pass', 'skip', 'fail', 'warning', 'error']),
      _result: ElementSchema.optional(),
    message: z.string().optional(),
      _message: ElementSchema.optional(),
    detail: z.string().optional(),
      _detail: ElementSchema.optional(),
    requirement: z.array(TestReportSetupActionAssertRequirementSchema).optional(),
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
  testScript: z.string(),
  _testScript: ElementSchema.optional(),
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
 * How device is being used
 * This indicates how or if the device is being used.
 */
export const DeviceUsageAdherenceSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  reason: z.array(CodeableConceptSchema),
})
export type DeviceUsageAdherence = z.infer<typeof DeviceUsageAdherenceSchema>

/**
 * A record of a device being used by a patient where the record is the result of a report from the patient or a clinician.
 */
export const DeviceUsageSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceUsage'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  status: z.enum(['active', 'completed', 'not-done', 'entered-in-error', 'intended', 'stopped', 'on-hold']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  patient: ReferenceSchema,
  derivedFrom: z.array(ReferenceSchema).optional(),
  context: ReferenceSchema.optional(),
  timingTiming: TimingSchema.optional(),
  timingPeriod: PeriodSchema.optional(),
  timingDateTime: z.string().optional(),
  _timingDateTime: ElementSchema.optional(),
  dateAsserted: z.string().optional(),
  _dateAsserted: ElementSchema.optional(),
  usageStatus: CodeableConceptSchema.optional(),
  usageReason: z.array(CodeableConceptSchema).optional(),
  adherence: DeviceUsageAdherenceSchema.optional(),
  informationSource: ReferenceSchema.optional(),
  device: CodeableReferenceSchema,
  reason: z.array(CodeableReferenceSchema).optional(),
  bodySite: CodeableReferenceSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type DeviceUsage = z.infer<typeof DeviceUsageSchema>

/**
 * The populations in the group
 * The populations that make up the population group, one for each type of population appropriate for the measure.
 */
export const MeasureReportGroupPopulationSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  count: z.number().optional(),
  _count: ElementSchema.optional(),
  subjectResults: ReferenceSchema.optional(),
  subjectReport: z.array(ReferenceSchema).optional(),
  subjects: ReferenceSchema.optional(),
})
export type MeasureReportGroupPopulation = z.infer<typeof MeasureReportGroupPopulationSchema>

/**
 * Stratifier component values
 * A stratifier component value.
 */
export const MeasureReportGroupStratifierStratumComponentSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  code: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueReference: ReferenceSchema.optional(),
})
export type MeasureReportGroupStratifierStratumComponent = z.infer<typeof MeasureReportGroupStratifierStratumComponentSchema>

/**
 * Population results in this stratum
 * The populations that make up the stratum, one for each type of population appropriate to the measure.
 */
export const MeasureReportGroupStratifierStratumPopulationSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  count: z.number().optional(),
  _count: ElementSchema.optional(),
  subjectResults: ReferenceSchema.optional(),
  subjectReport: z.array(ReferenceSchema).optional(),
  subjects: ReferenceSchema.optional(),
})
export type MeasureReportGroupStratifierStratumPopulation = z.infer<typeof MeasureReportGroupStratifierStratumPopulationSchema>

/**
 * Stratum results, one for each unique value, or set of values, in the stratifier, or stratifier components
 * This element contains the results for a single stratum within the stratifier. For example, when stratifying on administrative gender, there will be four strata, one for each possible gender value.
 */
export const MeasureReportGroupStratifierStratumSchema = BackboneElementSchema.extend({
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  component: z.array(MeasureReportGroupStratifierStratumComponentSchema).optional(),
  population: z.array(MeasureReportGroupStratifierStratumPopulationSchema).optional(),
  measureScoreQuantity: QuantitySchema.optional(),
  measureScoreDateTime: z.string().optional(),
  _measureScoreDateTime: ElementSchema.optional(),
  measureScoreCodeableConcept: CodeableConceptSchema.optional(),
  measureScorePeriod: PeriodSchema.optional(),
  measureScoreRange: RangeSchema.optional(),
  measureScoreDuration: DurationSchema.optional(),
})
export type MeasureReportGroupStratifierStratum = z.infer<typeof MeasureReportGroupStratifierStratumSchema>

/**
 * Stratification results
 * When a measure includes multiple stratifiers, there will be a stratifier group for each stratifier defined by the measure.
 */
export const MeasureReportGroupStratifierSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  stratum: z.array(MeasureReportGroupStratifierStratumSchema).optional(),
})
export type MeasureReportGroupStratifier = z.infer<typeof MeasureReportGroupStratifierSchema>

/**
 * Measure results for each group
 * The results of the calculation, one for each population group in the measure.
 */
export const MeasureReportGroupSchema = BackboneElementSchema.extend({
  linkId: z.string().optional(),
  _linkId: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  subject: ReferenceSchema.optional(),
  population: z.array(MeasureReportGroupPopulationSchema).optional(),
  measureScoreQuantity: QuantitySchema.optional(),
  measureScoreDateTime: z.string().optional(),
  _measureScoreDateTime: ElementSchema.optional(),
  measureScoreCodeableConcept: CodeableConceptSchema.optional(),
  measureScorePeriod: PeriodSchema.optional(),
  measureScoreRange: RangeSchema.optional(),
  measureScoreDuration: DurationSchema.optional(),
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
  type: z.enum(['individual', 'subject-list', 'summary', 'data-exchange']),
  _type: ElementSchema.optional(),
  dataUpdateType: z.enum(['incremental', 'snapshot']).optional(),
  _dataUpdateType: ElementSchema.optional(),
  measure: z.string().optional(),
  _measure: ElementSchema.optional(),
  subject: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  reporter: ReferenceSchema.optional(),
  reportingVendor: ReferenceSchema.optional(),
  location: ReferenceSchema.optional(),
  period: PeriodSchema,
  inputParameters: ReferenceSchema.optional(),
  scoring: CodeableConceptSchema.optional(),
  improvementNotation: CodeableConceptSchema.optional(),
  group: z.array(MeasureReportGroupSchema).optional(),
  supplementalData: z.array(ReferenceSchema).optional(),
  evaluatedResource: z.array(ReferenceSchema).optional(),
})
export type MeasureReport = z.infer<typeof MeasureReportSchema>

/**
 * Many complex materials are fractions of parts of plants, animals, or minerals. Fraction elements are often necessary to define both Substances and Specified Group 1 Substances. For substances derived from Plants, fraction information will be captured at the Substance information level ( . Oils, Juices and Exudates). Additional information for Extracts, such as extraction solvent composition, will be captured at the Specified Substance Group 1 information level. For plasma-derived products fraction information will be captured at the Substance and the Specified Substance Group 1 levels
 */
export const SubstanceSourceMaterialFractionDescriptionSchema = BackboneElementSchema.extend({
  fraction: z.string().optional(),
  _fraction: ElementSchema.optional(),
  materialType: CodeableConceptSchema.optional(),
})
export type SubstanceSourceMaterialFractionDescription = z.infer<typeof SubstanceSourceMaterialFractionDescriptionSchema>

/**
 * 4.9.13.6.1 Author type (Conditional)
 */
export const SubstanceSourceMaterialOrganismAuthorSchema = BackboneElementSchema.extend({
  authorType: CodeableConceptSchema.optional(),
  authorDescription: z.string().optional(),
  _authorDescription: ElementSchema.optional(),
})
export type SubstanceSourceMaterialOrganismAuthor = z.infer<typeof SubstanceSourceMaterialOrganismAuthorSchema>

/**
 * 4.9.13.8.1 Hybrid species maternal organism ID (Optional)
 */
export const SubstanceSourceMaterialOrganismHybridSchema = BackboneElementSchema.extend({
  maternalOrganismId: z.string().optional(),
  _maternalOrganismId: ElementSchema.optional(),
  maternalOrganismName: z.string().optional(),
  _maternalOrganismName: ElementSchema.optional(),
  paternalOrganismId: z.string().optional(),
  _paternalOrganismId: ElementSchema.optional(),
  paternalOrganismName: z.string().optional(),
  _paternalOrganismName: ElementSchema.optional(),
  hybridType: CodeableConceptSchema.optional(),
})
export type SubstanceSourceMaterialOrganismHybrid = z.infer<typeof SubstanceSourceMaterialOrganismHybridSchema>

/**
 * 4.9.13.7.1 Kingdom (Conditional)
 */
export const SubstanceSourceMaterialOrganismOrganismGeneralSchema = BackboneElementSchema.extend({
  kingdom: CodeableConceptSchema.optional(),
  phylum: CodeableConceptSchema.optional(),
  class: CodeableConceptSchema.optional(),
  order: CodeableConceptSchema.optional(),
})
export type SubstanceSourceMaterialOrganismOrganismGeneral = z.infer<typeof SubstanceSourceMaterialOrganismOrganismGeneralSchema>

/**
 * This subclause describes the organism which the substance is derived from. For vaccines, the parent organism shall be specified based on these subclause elements. As an example, full taxonomy will be described for the Substance Name: ., Leaf
 */
export const SubstanceSourceMaterialOrganismSchema = BackboneElementSchema.extend({
  family: CodeableConceptSchema.optional(),
  genus: CodeableConceptSchema.optional(),
  species: CodeableConceptSchema.optional(),
  intraspecificType: CodeableConceptSchema.optional(),
  intraspecificDescription: z.string().optional(),
  _intraspecificDescription: ElementSchema.optional(),
  author: z.array(SubstanceSourceMaterialOrganismAuthorSchema).optional(),
  hybrid: SubstanceSourceMaterialOrganismHybridSchema.optional(),
  organismGeneral: SubstanceSourceMaterialOrganismOrganismGeneralSchema.optional(),
})
export type SubstanceSourceMaterialOrganism = z.infer<typeof SubstanceSourceMaterialOrganismSchema>

/**
 * To do
 */
export const SubstanceSourceMaterialPartDescriptionSchema = BackboneElementSchema.extend({
  part: CodeableConceptSchema.optional(),
  partLocation: CodeableConceptSchema.optional(),
})
export type SubstanceSourceMaterialPartDescription = z.infer<typeof SubstanceSourceMaterialPartDescriptionSchema>

/**
 * Source material shall capture information on the taxonomic and anatomical origins as well as the fraction of a material that can result in or can be modified to form a substance. This set of data elements shall be used to define polymer substances isolated from biological matrices. Taxonomic and anatomical origins shall be described using a controlled vocabulary as required. This information is captured for naturally derived polymers ( . starch) and structurally diverse substances. For Organisms belonging to the Kingdom Plantae the Substance level defines the fresh material of a single species or infraspecies, the Herbal Drug and the Herbal preparation. For Herbal preparations, the fraction information will be captured at the Substance information level and additional information for herbal extracts will be captured at the Specified Substance Group 1 information level. See for further explanation the Substance Class: Structurally Diverse and the herbal annex.
 */
export const SubstanceSourceMaterialSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SubstanceSourceMaterial'),
  sourceMaterialClass: CodeableConceptSchema.optional(),
  sourceMaterialType: CodeableConceptSchema.optional(),
  sourceMaterialState: CodeableConceptSchema.optional(),
  organismId: IdentifierSchema.optional(),
  organismName: z.string().optional(),
  _organismName: ElementSchema.optional(),
  parentSubstanceId: z.array(IdentifierSchema).optional(),
  parentSubstanceName: z.array(z.string()).optional(),
  _parentSubstanceName: ElementSchema.optional(),
  countryOfOrigin: z.array(CodeableConceptSchema).optional(),
  geographicalLocation: z.array(z.string()).optional(),
  _geographicalLocation: ElementSchema.optional(),
  developmentStage: CodeableConceptSchema.optional(),
  fractionDescription: z.array(SubstanceSourceMaterialFractionDescriptionSchema).optional(),
  organism: SubstanceSourceMaterialOrganismSchema.optional(),
  partDescription: z.array(SubstanceSourceMaterialPartDescriptionSchema).optional(),
})
export type SubstanceSourceMaterial = z.infer<typeof SubstanceSourceMaterialSchema>

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
export const SubstanceDefinitionCharacterizationSchema = BackboneElementSchema.extend({
  technique: CodeableConceptSchema.optional(),
  form: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  file: z.array(AttachmentSchema).optional(),
})
export type SubstanceDefinitionCharacterization = z.infer<typeof SubstanceDefinitionCharacterizationSchema>

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
 * The average mass of a molecule of a compound
 * The average mass of a molecule of a compound compared to 1/12 the mass of carbon 12 and calculated as the sum of the atomic weights of the constituent atoms.
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
 * A depiction of the structure of the substance
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
  characterization: z.array(SubstanceDefinitionCharacterizationSchema).optional(),
  property: z.array(SubstanceDefinitionPropertySchema).optional(),
  referenceInformation: ReferenceSchema.optional(),
  molecularWeight: z.array(SubstanceDefinitionMolecularWeightSchema).optional(),
  structure: SubstanceDefinitionStructureSchema.optional(),
  code: z.array(SubstanceDefinitionCodeSchema).optional(),
  name: z.array(SubstanceDefinitionNameSchema).optional(),
  relationship: z.array(SubstanceDefinitionRelationshipSchema).optional(),
  nucleicAcid: ReferenceSchema.optional(),
  polymer: ReferenceSchema.optional(),
  protein: ReferenceSchema.optional(),
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
 * A record of a non-patient specific request for a medication, substance, device, certain types of biologically derived product, and nutrition product used in the healthcare setting.
 */
export const SupplyRequestSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SupplyRequest'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'active', 'suspended', 'cancelled', 'completed', 'entered-in-error', 'unknown']).optional(),
  _status: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  category: CodeableConceptSchema.optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  deliverFor: ReferenceSchema.optional(),
  item: CodeableReferenceSchema,
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
  reason: z.array(CodeableReferenceSchema).optional(),
  deliverFrom: ReferenceSchema.optional(),
  deliverTo: ReferenceSchema.optional(),
})
export type SupplyRequest = z.infer<typeof SupplyRequestSchema>

/**
 * Selector of the instances (human or machine)
 * Selector of the instances – human or machine.
 */
export const ImagingSelectionPerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema.optional(),
})
export type ImagingSelectionPerformer = z.infer<typeof ImagingSelectionPerformerSchema>

/**
 * A specific 2D region in a DICOM image / frame
 * Each imaging selection instance or frame list might includes an image region, specified by a region type and a set of 2D coordinates.
 *        If the parent imagingSelection.instance contains a subset element of type frame, the image region applies to all frames in the subset list.
 */
export const ImagingSelectionInstanceImageRegion2DSchema = BackboneElementSchema.extend({
  regionType: z.enum(['point', 'polyline', 'interpolated', 'circle', 'ellipse']),
  _regionType: ElementSchema.optional(),
  coordinate: z.array(z.number()),
  _coordinate: ElementSchema.optional(),
})
export type ImagingSelectionInstanceImageRegion2D = z.infer<typeof ImagingSelectionInstanceImageRegion2DSchema>

/**
 * A specific 3D region in a DICOM frame of reference
 * Each imaging selection might includes a 3D image region, specified by a region type and a set of 3D coordinates.
 */
export const ImagingSelectionInstanceImageRegion3DSchema = BackboneElementSchema.extend({
  regionType: z.enum(['point', 'multipoint', 'polyline', 'polygon', 'ellipse', 'ellipsoid']),
  _regionType: ElementSchema.optional(),
  coordinate: z.array(z.number()),
  _coordinate: ElementSchema.optional(),
})
export type ImagingSelectionInstanceImageRegion3D = z.infer<typeof ImagingSelectionInstanceImageRegion3DSchema>

/**
 * The selected instances
 * Each imaging selection includes one or more selected DICOM SOP instances.
 */
export const ImagingSelectionInstanceSchema = BackboneElementSchema.extend({
  uid: z.string(),
  _uid: ElementSchema.optional(),
  number: z.number().optional(),
  _number: ElementSchema.optional(),
  sopClass: CodingSchema.optional(),
  subset: z.array(z.string()).optional(),
  _subset: ElementSchema.optional(),
  imageRegion2D: z.array(ImagingSelectionInstanceImageRegion2DSchema).optional(),
  imageRegion3D: z.array(ImagingSelectionInstanceImageRegion3DSchema).optional(),
})
export type ImagingSelectionInstance = z.infer<typeof ImagingSelectionInstanceSchema>

/**
 * A selection of DICOM SOP instances and/or frames within a single Study and Series. This might include additional specifics such as an image region, an Observation UID or a Segmentation Number, allowing linkage to an Observation Resource or transferring this information along with the ImagingStudy Resource.
 */
export const ImagingSelectionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ImagingSelection'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['available', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  subject: ReferenceSchema.optional(),
  issued: z.string().optional(),
  _issued: ElementSchema.optional(),
  performer: z.array(ImagingSelectionPerformerSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema,
  studyUid: z.string().optional(),
  _studyUid: ElementSchema.optional(),
  derivedFrom: z.array(ReferenceSchema).optional(),
  endpoint: z.array(ReferenceSchema).optional(),
  seriesUid: z.string().optional(),
  _seriesUid: ElementSchema.optional(),
  seriesNumber: z.number().optional(),
  _seriesNumber: ElementSchema.optional(),
  frameOfReferenceUid: z.string().optional(),
  _frameOfReferenceUid: ElementSchema.optional(),
  bodySite: CodeableReferenceSchema.optional(),
  focus: z.array(ReferenceSchema).optional(),
  instance: z.array(ImagingSelectionInstanceSchema).optional(),
})
export type ImagingSelection = z.infer<typeof ImagingSelectionSchema>

/**
 * integer Type: A whole number
 */
export const integerSchema = PrimitiveTypeSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
})
export type integer = z.infer<typeof integerSchema>

/**
 * positiveInt type: An integer with a value that is positive (e.g. >0)
 */
export const positiveIntSchema = integerSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
})
export type positiveInt = z.infer<typeof positiveIntSchema>

/**
 * Inputs for the analysis event
 */
export const GenomicStudyAnalysisInputSchema = BackboneElementSchema.extend({
  file: ReferenceSchema.optional(),
  type: CodeableConceptSchema.optional(),
  generatedByIdentifier: IdentifierSchema.optional(),
  generatedByReference: ReferenceSchema.optional(),
})
export type GenomicStudyAnalysisInput = z.infer<typeof GenomicStudyAnalysisInputSchema>

/**
 * Outputs for the analysis event
 */
export const GenomicStudyAnalysisOutputSchema = BackboneElementSchema.extend({
  file: ReferenceSchema.optional(),
  type: CodeableConceptSchema.optional(),
})
export type GenomicStudyAnalysisOutput = z.infer<typeof GenomicStudyAnalysisOutputSchema>

/**
 * Performer for the analysis event
 */
export const GenomicStudyAnalysisPerformerSchema = BackboneElementSchema.extend({
  actor: ReferenceSchema.optional(),
  role: CodeableConceptSchema.optional(),
})
export type GenomicStudyAnalysisPerformer = z.infer<typeof GenomicStudyAnalysisPerformerSchema>

/**
 * Devices used for the analysis (e.g., instruments, software), with settings and parameters
 */
export const GenomicStudyAnalysisDeviceSchema = BackboneElementSchema.extend({
  device: ReferenceSchema.optional(),
  function: CodeableConceptSchema.optional(),
})
export type GenomicStudyAnalysisDevice = z.infer<typeof GenomicStudyAnalysisDeviceSchema>

/**
 * Genomic Analysis Event
 * The details about a specific analysis that was performed in this GenomicStudy.
 */
export const GenomicStudyAnalysisSchema = BackboneElementSchema.extend({
  identifier: z.array(IdentifierSchema).optional(),
  methodType: z.array(CodeableConceptSchema).optional(),
  changeType: z.array(CodeableConceptSchema).optional(),
  genomeBuild: CodeableConceptSchema.optional(),
  instantiatesCanonical: z.string().optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.string().optional(),
  _instantiatesUri: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  focus: z.array(ReferenceSchema).optional(),
  specimen: z.array(ReferenceSchema).optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  protocolPerformed: ReferenceSchema.optional(),
  regionsStudied: z.array(ReferenceSchema).optional(),
  regionsCalled: z.array(ReferenceSchema).optional(),
  input: z.array(GenomicStudyAnalysisInputSchema).optional(),
  output: z.array(GenomicStudyAnalysisOutputSchema).optional(),
  performer: z.array(GenomicStudyAnalysisPerformerSchema).optional(),
  device: z.array(GenomicStudyAnalysisDeviceSchema).optional(),
})
export type GenomicStudyAnalysis = z.infer<typeof GenomicStudyAnalysisSchema>

/**
 * A set of analyses performed to analyze and generate genomic data.
 */
export const GenomicStudySchema = DomainResourceSchema.extend({
  resourceType: z.literal('GenomicStudy'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['registered', 'available', 'cancelled', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  startDate: z.string().optional(),
  _startDate: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  referrer: ReferenceSchema.optional(),
  interpreter: z.array(ReferenceSchema).optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  instantiatesCanonical: z.string().optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.string().optional(),
  _instantiatesUri: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  analysis: z.array(GenomicStudyAnalysisSchema).optional(),
})
export type GenomicStudy = z.infer<typeof GenomicStudySchema>

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
  role: z.enum(['revision', 'quotation', 'source', 'instantiates', 'removal']),
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
  recorded: z.string().optional(),
  _recorded: ElementSchema.optional(),
  policy: z.array(z.string()).optional(),
  _policy: ElementSchema.optional(),
  location: ReferenceSchema.optional(),
  authorization: z.array(CodeableReferenceSchema).optional(),
  activity: CodeableConceptSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  patient: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
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
  reason: z.array(CodeableReferenceSchema).optional(),
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
  valueInteger64?: string | undefined
  _valueInteger64?: Element | undefined
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
  valueCodeableReference?: CodeableReference | undefined
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
  valueRatioRange?: RatioRange | undefined
  valueReference?: Reference | undefined
  valueSampledData?: SampledData | undefined
  valueSignature?: Signature | undefined
  valueTiming?: Timing | undefined
  valueContactDetail?: ContactDetail | undefined
  valueDataRequirement?: DataRequirement | undefined
  valueExpression?: Expression | undefined
  valueParameterDefinition?: ParameterDefinition | undefined
  valueRelatedArtifact?: RelatedArtifact | undefined
  valueTriggerDefinition?: TriggerDefinition | undefined
  valueUsageContext?: UsageContext | undefined
  valueAvailability?: Availability | undefined
  valueExtendedContactDetail?: ExtendedContactDetail | undefined
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
    valueInteger64: z.string().optional(),
      _valueInteger64: ElementSchema.optional(),
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
    valueDataRequirement: DataRequirementSchema.optional(),
    valueExpression: ExpressionSchema.optional(),
    valueParameterDefinition: ParameterDefinitionSchema.optional(),
    valueRelatedArtifact: RelatedArtifactSchema.optional(),
    valueTriggerDefinition: TriggerDefinitionSchema.optional(),
    valueUsageContext: UsageContextSchema.optional(),
    valueAvailability: AvailabilitySchema.optional(),
    valueExtendedContactDetail: ExtendedContactDetailSchema.optional(),
    valueDosage: DosageSchema.optional(),
    valueMeta: MetaSchema.optional(),
    resource: ResourceSchema.optional(),
    part: z.lazy(() => z.array(ParametersParameterSchema)).optional(),
  })
)

/**
 * This resource is used to pass information into and back from an operation (whether invoked directly from REST or within a messaging environment).  It is not persisted or allowed to be referenced by other resources except as described in the definition of the Parameters resource.
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
 * The details of a healthcare service available at a location or in a catalog.  In the case where there is a hierarchy of services (for example, Lab -> Pathology -> Wound Cultures), this can be represented using a set of linked HealthcareServices.
 */
export const HealthcareServiceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('HealthcareService'),
  identifier: z.array(IdentifierSchema).optional(),
  active: z.boolean().optional(),
  _active: ElementSchema.optional(),
  providedBy: ReferenceSchema.optional(),
  offeredIn: z.array(ReferenceSchema).optional(),
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
  contact: z.array(ExtendedContactDetailSchema).optional(),
  coverageArea: z.array(ReferenceSchema).optional(),
  serviceProvisionCode: z.array(CodeableConceptSchema).optional(),
  eligibility: z.array(HealthcareServiceEligibilitySchema).optional(),
  program: z.array(CodeableConceptSchema).optional(),
  characteristic: z.array(CodeableConceptSchema).optional(),
  communication: z.array(CodeableConceptSchema).optional(),
  referralMethod: z.array(CodeableConceptSchema).optional(),
  appointmentRequired: z.boolean().optional(),
  _appointmentRequired: ElementSchema.optional(),
  availability: z.array(AvailabilitySchema).optional(),
  endpoint: z.array(ReferenceSchema).optional(),
})
export type HealthcareService = z.infer<typeof HealthcareServiceSchema>

/**
 * A language which may be used to communicate with the related person about the patient's health
 * If no language is specified, this *implies* that the default local language is spoken.  If you need to convey proficiency for multiple modes, then you need multiple RelatedPerson.Communication associations.   If the RelatedPerson does not speak the default local language, then the Interpreter Required Standard can be used to explicitly declare that an interpreter is required.
 */
export const RelatedPersonCommunicationSchema = BackboneElementSchema.extend({
  language: CodeableConceptSchema,
  preferred: z.boolean().optional(),
  _preferred: ElementSchema.optional(),
})
export type RelatedPersonCommunication = z.infer<typeof RelatedPersonCommunicationSchema>

/**
 * Information about a person that is involved in a patient's health or the care for a patient, but who is not the target of healthcare, nor has a formal responsibility in the care process.
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
 * The Evidence Resource provides a machine-interpretable expression of an evidence concept including the evidence variables (e.g., population, exposures/interventions, comparators, outcomes, measured variables, confounding variables), the statistics, and the certainty of this evidence.
 */
export const EvidenceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Evidence'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  citeAsReference: ReferenceSchema.optional(),
  citeAsMarkdown: z.string().optional(),
  _citeAsMarkdown: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
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
  useContext: z.array(UsageContextSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  assertion: z.string().optional(),
  _assertion: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  variableDefinition: z.array(EvidenceVariableDefinitionSchema),
  synthesisType: CodeableConceptSchema.optional(),
  studyDesign: z.array(CodeableConceptSchema).optional(),
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
  type: z.enum(['oid', 'uuid', 'uri', 'iri-stem', 'v2csmnemonic', 'other']),
  _type: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
  preferred: z.boolean().optional(),
  _preferred: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  authoritative: z.boolean().optional(),
  _authoritative: ElementSchema.optional(),
})
export type NamingSystemUniqueId = z.infer<typeof NamingSystemUniqueIdSchema>

/**
 * A curated namespace that issues unique symbols within that namespace for the identification of concepts, people, devices, etc.  Represents a "System" used within the Identifier and Coding data types.
 */
export const NamingSystemSchema = DomainResourceSchema.extend({
  resourceType: z.literal('NamingSystem'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  kind: z.enum(['codesystem', 'identifier', 'root']),
  _kind: ElementSchema.optional(),
  experimental: z.boolean().optional(),
  _experimental: ElementSchema.optional(),
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
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
 * Event information
 * Information code for an event with a corresponding date or period.
 */
export const ExplanationOfBenefitEventSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  whenDateTime: z.string().optional(),
  _whenDateTime: ElementSchema.optional(),
  whenPeriod: PeriodSchema.optional(),
})
export type ExplanationOfBenefitEvent = z.infer<typeof ExplanationOfBenefitEventSchema>

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
  specialty: CodeableConceptSchema.optional(),
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
  valueIdentifier: IdentifierSchema.optional(),
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
 * Anatomical location
 * Physical location where the service is performed or applies.
 */
export const ExplanationOfBenefitItemBodySiteSchema = BackboneElementSchema.extend({
  site: z.array(CodeableReferenceSchema),
  subSite: z.array(CodeableConceptSchema).optional(),
})
export type ExplanationOfBenefitItemBodySite = z.infer<typeof ExplanationOfBenefitItemBodySiteSchema>

/**
 * Adjudication results
 * The high-level results of the adjudication if adjudication has been performed.
 */
export interface ExplanationOfBenefitItemReviewOutcome extends BackboneElement {
  decision?: CodeableConcept | undefined
  reason?: CodeableConcept[] | undefined
  preAuthRef?: string | undefined
  _preAuthRef?: Element | undefined
  preAuthPeriod?: Period | undefined
}

export const ExplanationOfBenefitItemReviewOutcomeSchema: z.ZodType<ExplanationOfBenefitItemReviewOutcome> = z.lazy(() =>
  BackboneElementSchema.extend({
    decision: CodeableConceptSchema.optional(),
    reason: z.array(CodeableConceptSchema).optional(),
    preAuthRef: z.string().optional(),
      _preAuthRef: ElementSchema.optional(),
    preAuthPeriod: PeriodSchema.optional(),
  })
)

/**
 * Adjudication details
 * If this item is a group then the values here are a summary of the adjudication of the detail items. If this item is a simple product or service then this is the result of the adjudication of this item.
 */
export interface ExplanationOfBenefitItemAdjudication extends BackboneElement {
  category: CodeableConcept
  reason?: CodeableConcept | undefined
  amount?: Money | undefined
  quantity?: Quantity | undefined
}

export const ExplanationOfBenefitItemAdjudicationSchema: z.ZodType<ExplanationOfBenefitItemAdjudication> = z.lazy(() =>
  BackboneElementSchema.extend({
    category: CodeableConceptSchema,
    reason: CodeableConceptSchema.optional(),
    amount: MoneySchema.optional(),
    quantity: QuantitySchema.optional(),
  })
)

/**
 * Additional items
 * Third-tier of goods and services.
 */
export const ExplanationOfBenefitItemDetailSubDetailSchema = BackboneElementSchema.extend({
  sequence: z.number(),
  _sequence: ElementSchema.optional(),
  traceNumber: z.array(IdentifierSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  patientPaid: MoneySchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ExplanationOfBenefitItemReviewOutcomeSchema).optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  patientPaid: MoneySchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ExplanationOfBenefitItemReviewOutcomeSchema).optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  request: z.array(ReferenceSchema).optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  locationCodeableConcept: CodeableConceptSchema.optional(),
  locationAddress: AddressSchema.optional(),
  locationReference: ReferenceSchema.optional(),
  patientPaid: MoneySchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  udi: z.array(ReferenceSchema).optional(),
  bodySite: z.array(ExplanationOfBenefitItemBodySiteSchema).optional(),
  encounter: z.array(ReferenceSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: ExplanationOfBenefitItemReviewOutcomeSchema.optional(),
  adjudication: z.array(ExplanationOfBenefitItemAdjudicationSchema).optional(),
  detail: z.array(ExplanationOfBenefitItemDetailSchema).optional(),
})
export type ExplanationOfBenefitItem = z.infer<typeof ExplanationOfBenefitItemSchema>

/**
 * Anatomical location
 * Physical location where the service is performed or applies.
 */
export const ExplanationOfBenefitAddItemBodySiteSchema = BackboneElementSchema.extend({
  site: z.array(CodeableReferenceSchema),
  subSite: z.array(CodeableConceptSchema).optional(),
})
export type ExplanationOfBenefitAddItemBodySite = z.infer<typeof ExplanationOfBenefitAddItemBodySiteSchema>

/**
 * Insurer added line items
 * The third-tier service adjudications for payor added services.
 */
export const ExplanationOfBenefitAddItemDetailSubDetailSchema = BackboneElementSchema.extend({
  traceNumber: z.array(IdentifierSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  patientPaid: MoneySchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ExplanationOfBenefitItemReviewOutcomeSchema).optional(),
  adjudication: z.lazy(() => z.array(ExplanationOfBenefitItemAdjudicationSchema)).optional(),
})
export type ExplanationOfBenefitAddItemDetailSubDetail = z.infer<typeof ExplanationOfBenefitAddItemDetailSubDetailSchema>

/**
 * Insurer added line items
 * The second-tier service adjudications for payor added services.
 */
export const ExplanationOfBenefitAddItemDetailSchema = BackboneElementSchema.extend({
  traceNumber: z.array(IdentifierSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  patientPaid: MoneySchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ExplanationOfBenefitItemReviewOutcomeSchema).optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
  provider: z.array(ReferenceSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  request: z.array(ReferenceSchema).optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  locationCodeableConcept: CodeableConceptSchema.optional(),
  locationAddress: AddressSchema.optional(),
  locationReference: ReferenceSchema.optional(),
  patientPaid: MoneySchema.optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  bodySite: z.array(ExplanationOfBenefitAddItemBodySiteSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ExplanationOfBenefitItemReviewOutcomeSchema).optional(),
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
  type: CodeableConceptSchema.optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
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
  provider: ReferenceSchema.optional(),
  priority: CodeableConceptSchema.optional(),
  fundsReserveRequested: CodeableConceptSchema.optional(),
  fundsReserve: CodeableConceptSchema.optional(),
  related: z.array(ExplanationOfBenefitRelatedSchema).optional(),
  prescription: ReferenceSchema.optional(),
  originalPrescription: ReferenceSchema.optional(),
  event: z.array(ExplanationOfBenefitEventSchema).optional(),
  payee: ExplanationOfBenefitPayeeSchema.optional(),
  referral: ReferenceSchema.optional(),
  encounter: z.array(ReferenceSchema).optional(),
  facility: ReferenceSchema.optional(),
  claim: ReferenceSchema.optional(),
  claimResponse: ReferenceSchema.optional(),
  outcome: z.enum(['queued', 'complete', 'error', 'partial']),
  _outcome: ElementSchema.optional(),
  decision: CodeableConceptSchema.optional(),
  disposition: z.string().optional(),
  _disposition: ElementSchema.optional(),
  preAuthRef: z.array(z.string()).optional(),
  _preAuthRef: ElementSchema.optional(),
  preAuthRefPeriod: z.array(PeriodSchema).optional(),
  diagnosisRelatedGroup: CodeableConceptSchema.optional(),
  careTeam: z.array(ExplanationOfBenefitCareTeamSchema).optional(),
  supportingInfo: z.array(ExplanationOfBenefitSupportingInfoSchema).optional(),
  diagnosis: z.array(ExplanationOfBenefitDiagnosisSchema).optional(),
  procedure: z.array(ExplanationOfBenefitProcedureSchema).optional(),
  precedence: z.number().optional(),
  _precedence: ElementSchema.optional(),
  insurance: z.array(ExplanationOfBenefitInsuranceSchema).optional(),
  accident: ExplanationOfBenefitAccidentSchema.optional(),
  patientPaid: MoneySchema.optional(),
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
 * MarketingStatus Type: The marketing status describes the date when a medicinal product is actually put on the market or the date as of which it is no longer available.
 */
export const MarketingStatusSchema = BackboneTypeSchema.extend({
  country: CodeableConceptSchema.optional(),
  jurisdiction: CodeableConceptSchema.optional(),
  status: CodeableConceptSchema,
  dateRange: PeriodSchema.optional(),
  restoreDate: z.string().optional(),
  _restoreDate: ElementSchema.optional(),
})
export type MarketingStatus = z.infer<typeof MarketingStatusSchema>

/**
 * ProductShelfLife Type: The shelf-life and storage information for a medicinal product item or container can be described using this class.
 */
export const ProductShelfLifeSchema = BackboneTypeSchema.extend({
  type: CodeableConceptSchema.optional(),
  periodDuration: DurationSchema.optional(),
  periodString: z.string().optional(),
  _periodString: ElementSchema.optional(),
  specialPrecautionsForStorage: z.array(CodeableConceptSchema).optional(),
})
export type ProductShelfLife = z.infer<typeof ProductShelfLifeSchema>

/**
 * General characteristics of this item
 */
export interface PackagedProductDefinitionPackagingProperty extends BackboneElement {
  type: CodeableConcept
  valueCodeableConcept?: CodeableConcept | undefined
  valueQuantity?: Quantity | undefined
  valueDate?: string | undefined
  _valueDate?: Element | undefined
  valueBoolean?: boolean | undefined
  _valueBoolean?: Element | undefined
  valueAttachment?: Attachment | undefined
}

export const PackagedProductDefinitionPackagingPropertySchema: z.ZodType<PackagedProductDefinitionPackagingProperty> = z.lazy(() =>
  BackboneElementSchema.extend({
    type: CodeableConceptSchema,
    valueCodeableConcept: CodeableConceptSchema.optional(),
    valueQuantity: QuantitySchema.optional(),
    valueDate: z.string().optional(),
      _valueDate: ElementSchema.optional(),
    valueBoolean: z.boolean().optional(),
      _valueBoolean: ElementSchema.optional(),
    valueAttachment: AttachmentSchema.optional(),
  })
)

/**
 * The item(s) within the packaging
 */
export const PackagedProductDefinitionPackagingContainedItemSchema = BackboneElementSchema.extend({
  item: CodeableReferenceSchema,
  amount: QuantitySchema.optional(),
})
export type PackagedProductDefinitionPackagingContainedItem = z.infer<typeof PackagedProductDefinitionPackagingContainedItemSchema>

/**
 * A packaging item, as a container for medically related items, possibly with other packaging items within, or a packaging component, such as bottle cap
 * A packaging item, as a container for medically related items, possibly with other packaging items within, or a packaging component, such as bottle cap (which is not a device or a medication manufactured item).
 */
export interface PackagedProductDefinitionPackaging extends BackboneElement {
  identifier?: Identifier[] | undefined
  type?: CodeableConcept | undefined
  componentPart?: boolean | undefined
  _componentPart?: Element | undefined
  quantity?: number | undefined
  _quantity?: Element | undefined
  material?: CodeableConcept[] | undefined
  alternateMaterial?: CodeableConcept[] | undefined
  shelfLifeStorage?: ProductShelfLife[] | undefined
  manufacturer?: Reference[] | undefined
  property?: PackagedProductDefinitionPackagingProperty[] | undefined
  containedItem?: PackagedProductDefinitionPackagingContainedItem[] | undefined
  packaging?: PackagedProductDefinitionPackaging[] | undefined
}

export const PackagedProductDefinitionPackagingSchema: z.ZodType<PackagedProductDefinitionPackaging> = z.lazy(() =>
  BackboneElementSchema.extend({
    identifier: z.array(IdentifierSchema).optional(),
    type: CodeableConceptSchema.optional(),
    componentPart: z.boolean().optional(),
      _componentPart: ElementSchema.optional(),
    quantity: z.number().optional(),
      _quantity: ElementSchema.optional(),
    material: z.array(CodeableConceptSchema).optional(),
    alternateMaterial: z.array(CodeableConceptSchema).optional(),
    shelfLifeStorage: z.array(ProductShelfLifeSchema).optional(),
    manufacturer: z.array(ReferenceSchema).optional(),
    property: z.array(PackagedProductDefinitionPackagingPropertySchema).optional(),
    containedItem: z.array(PackagedProductDefinitionPackagingContainedItemSchema).optional(),
    packaging: z.lazy(() => z.array(PackagedProductDefinitionPackagingSchema)).optional(),
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
  copackagedIndicator: z.boolean().optional(),
  _copackagedIndicator: ElementSchema.optional(),
  manufacturer: z.array(ReferenceSchema).optional(),
  attachedDocument: z.array(ReferenceSchema).optional(),
  packaging: PackagedProductDefinitionPackagingSchema.optional(),
  characteristic: z.lazy(() => z.array(PackagedProductDefinitionPackagingPropertySchema)).optional(),
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
 * Link to a Patient or RelatedPerson resource that concerns the same actual individual
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
 * uuid type: A UUID, represented as a URI
 */
export const uuidSchema = uriSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type uuid = z.infer<typeof uuidSchema>

/**
 * General characteristics of this item
 */
export interface ManufacturedItemDefinitionProperty extends BackboneElement {
  type: CodeableConcept
  valueCodeableConcept?: CodeableConcept | undefined
  valueQuantity?: Quantity | undefined
  valueDate?: string | undefined
  _valueDate?: Element | undefined
  valueBoolean?: boolean | undefined
  _valueBoolean?: Element | undefined
  valueMarkdown?: string | undefined
  _valueMarkdown?: Element | undefined
  valueAttachment?: Attachment | undefined
  valueReference?: Reference | undefined
}

export const ManufacturedItemDefinitionPropertySchema: z.ZodType<ManufacturedItemDefinitionProperty> = z.lazy(() =>
  BackboneElementSchema.extend({
    type: CodeableConceptSchema,
    valueCodeableConcept: CodeableConceptSchema.optional(),
    valueQuantity: QuantitySchema.optional(),
    valueDate: z.string().optional(),
      _valueDate: ElementSchema.optional(),
    valueBoolean: z.boolean().optional(),
      _valueBoolean: ElementSchema.optional(),
    valueMarkdown: z.string().optional(),
      _valueMarkdown: ElementSchema.optional(),
    valueAttachment: AttachmentSchema.optional(),
    valueReference: ReferenceSchema.optional(),
  })
)

/**
 * A reference to a constituent of the manufactured item as a whole, linked here so that its component location within the item can be indicated. This not where the item's ingredient are primarily stated (for which see Ingredient.for or ManufacturedItemDefinition.ingredient)
 */
export const ManufacturedItemDefinitionComponentConstituentSchema = BackboneElementSchema.extend({
  amount: z.array(QuantitySchema).optional(),
  location: z.array(CodeableConceptSchema).optional(),
  function: z.array(CodeableConceptSchema).optional(),
  hasIngredient: z.array(CodeableReferenceSchema).optional(),
})
export type ManufacturedItemDefinitionComponentConstituent = z.infer<typeof ManufacturedItemDefinitionComponentConstituentSchema>

/**
 * Physical parts of the manufactured item, that it is intrisically made from. This is distinct from the ingredients that are part of its chemical makeup
 */
export interface ManufacturedItemDefinitionComponent extends BackboneElement {
  type: CodeableConcept
  function?: CodeableConcept[] | undefined
  amount?: Quantity[] | undefined
  constituent?: ManufacturedItemDefinitionComponentConstituent[] | undefined
  property?: ManufacturedItemDefinitionProperty[] | undefined
  component?: ManufacturedItemDefinitionComponent[] | undefined
}

export const ManufacturedItemDefinitionComponentSchema: z.ZodType<ManufacturedItemDefinitionComponent> = z.lazy(() =>
  BackboneElementSchema.extend({
    type: CodeableConceptSchema,
    function: z.array(CodeableConceptSchema).optional(),
    amount: z.array(QuantitySchema).optional(),
    constituent: z.array(ManufacturedItemDefinitionComponentConstituentSchema).optional(),
    property: z.lazy(() => z.array(ManufacturedItemDefinitionPropertySchema)).optional(),
    component: z.lazy(() => z.array(ManufacturedItemDefinitionComponentSchema)).optional(),
  })
)

/**
 * The definition and characteristics of a medicinal manufactured item, such as a tablet or capsule, as contained in a packaged medicinal product.
 */
export const ManufacturedItemDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ManufacturedItemDefinition'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  manufacturedDoseForm: CodeableConceptSchema,
  unitOfPresentation: CodeableConceptSchema.optional(),
  manufacturer: z.array(ReferenceSchema).optional(),
  marketingStatus: z.array(MarketingStatusSchema).optional(),
  ingredient: z.array(CodeableConceptSchema).optional(),
  property: z.array(ManufacturedItemDefinitionPropertySchema).optional(),
  component: z.array(ManufacturedItemDefinitionComponentSchema).optional(),
})
export type ManufacturedItemDefinition = z.infer<typeof ManufacturedItemDefinitionSchema>

/**
 * The details about the device when it is in use to describe its operation
 */
export const DeviceAssociationOperationSchema = BackboneElementSchema.extend({
  status: CodeableConceptSchema,
  operator: z.array(ReferenceSchema).optional(),
  period: PeriodSchema.optional(),
})
export type DeviceAssociationOperation = z.infer<typeof DeviceAssociationOperationSchema>

/**
 * A record of association of a device.
 */
export const DeviceAssociationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceAssociation'),
  identifier: z.array(IdentifierSchema).optional(),
  device: ReferenceSchema,
  category: z.array(CodeableConceptSchema).optional(),
  status: CodeableConceptSchema,
  statusReason: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema.optional(),
  bodyStructure: ReferenceSchema.optional(),
  period: PeriodSchema.optional(),
  operation: z.array(DeviceAssociationOperationSchema).optional(),
})
export type DeviceAssociation = z.infer<typeof DeviceAssociationSchema>

/**
 * code type: A string which has at least one character and no leading or trailing whitespace and where there is no whitespace other than single spaces in the contents
 */
export const codeSchema = stringSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type code = z.infer<typeof codeSchema>

/**
 * The physical feature of a specimen
 * A physical feature or landmark on a specimen, highlighted for context by the collector of the specimen (e.g. surgeon), that identifies the type of feature as well as its meaning (e.g. the red ink indicating the resection margin of the right lobe of the excised prostate tissue or wire loop at radiologically suspected tumor location).
 */
export const SpecimenFeatureSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  description: z.string(),
  _description: ElementSchema.optional(),
})
export type SpecimenFeature = z.infer<typeof SpecimenFeatureSchema>

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
  device: CodeableReferenceSchema.optional(),
  procedure: ReferenceSchema.optional(),
  bodySite: CodeableReferenceSchema.optional(),
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
  method: CodeableConceptSchema.optional(),
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
  device: ReferenceSchema,
  location: ReferenceSchema.optional(),
  specimenQuantity: QuantitySchema.optional(),
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
  combined: z.enum(['grouped', 'pooled']).optional(),
  _combined: ElementSchema.optional(),
  role: z.array(CodeableConceptSchema).optional(),
  feature: z.array(SpecimenFeatureSchema).optional(),
  collection: SpecimenCollectionSchema.optional(),
  processing: z.array(SpecimenProcessingSchema).optional(),
  container: z.array(SpecimenContainerSchema).optional(),
  condition: z.array(CodeableConceptSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type Specimen = z.infer<typeof SpecimenSchema>

/**
 * Who or what participated in the activities related to the family member history and how they were involved
 * Indicates who or what participated in the activities related to the family member history and how they were involved.
 */
export const FamilyMemberHistoryParticipantSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type FamilyMemberHistoryParticipant = z.infer<typeof FamilyMemberHistoryParticipantSchema>

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
 * Procedures that the related person had
 * The significant Procedures (or procedure) that the family member had. This is a repeating section to allow a system to represent more than one procedure per resource, though there is nothing stopping multiple resources - one per procedure.
 */
export const FamilyMemberHistoryProcedureSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  outcome: CodeableConceptSchema.optional(),
  contributedToDeath: z.boolean().optional(),
  _contributedToDeath: ElementSchema.optional(),
  performedAge: AgeSchema.optional(),
  performedRange: RangeSchema.optional(),
  performedPeriod: PeriodSchema.optional(),
  performedString: z.string().optional(),
  _performedString: ElementSchema.optional(),
  performedDateTime: z.string().optional(),
  _performedDateTime: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type FamilyMemberHistoryProcedure = z.infer<typeof FamilyMemberHistoryProcedureSchema>

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
  participant: z.array(FamilyMemberHistoryParticipantSchema).optional(),
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
  reason: z.array(CodeableReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  condition: z.array(FamilyMemberHistoryConditionSchema).optional(),
  procedure: z.array(FamilyMemberHistoryProcedureSchema).optional(),
})
export type FamilyMemberHistory = z.infer<typeof FamilyMemberHistorySchema>

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
  scope?: ('instance'|'type'|'system')[] | undefined
  _scope?: Element | undefined
  min: number
  _min?: Element | undefined
  max: string
  _max?: Element | undefined
  documentation?: string | undefined
  _documentation?: Element | undefined
  type?: ('Base'|'Element'|'BackboneElement'|'DataType'|'Address'|'Annotation'|'Attachment'|'Availability'|'BackboneType'|'Dosage'|'ElementDefinition'|'MarketingStatus'|'ProductShelfLife'|'Timing'|'CodeableConcept'|'CodeableReference'|'Coding'|'ContactDetail'|'ContactPoint'|'Contributor'|'DataRequirement'|'Expression'|'ExtendedContactDetail'|'Extension'|'HumanName'|'Identifier'|'Meta'|'MonetaryComponent'|'Money'|'Narrative'|'ParameterDefinition'|'Period'|'PrimitiveType'|'base64Binary'|'boolean'|'date'|'dateTime'|'decimal'|'instant'|'integer'|'positiveInt'|'unsignedInt'|'integer64'|'string'|'code'|'id'|'markdown'|'time'|'uri'|'canonical'|'oid'|'url'|'uuid'|'Quantity'|'Age'|'Count'|'Distance'|'Duration'|'Range'|'Ratio'|'RatioRange'|'Reference'|'RelatedArtifact'|'SampledData'|'Signature'|'TriggerDefinition'|'UsageContext'|'VirtualServiceDetail'|'xhtml'|'Resource'|'Binary'|'Bundle'|'DomainResource'|'Account'|'ActivityDefinition'|'ActorDefinition'|'AdministrableProductDefinition'|'AdverseEvent'|'AllergyIntolerance'|'Appointment'|'AppointmentResponse'|'ArtifactAssessment'|'AuditEvent'|'Basic'|'BiologicallyDerivedProduct'|'BiologicallyDerivedProductDispense'|'BodyStructure'|'CanonicalResource'|'CapabilityStatement'|'CarePlan'|'CareTeam'|'ChargeItem'|'ChargeItemDefinition'|'Citation'|'Claim'|'ClaimResponse'|'ClinicalImpression'|'ClinicalUseDefinition'|'CodeSystem'|'Communication'|'CommunicationRequest'|'CompartmentDefinition'|'Composition'|'ConceptMap'|'Condition'|'ConditionDefinition'|'Consent'|'Contract'|'Coverage'|'CoverageEligibilityRequest'|'CoverageEligibilityResponse'|'DetectedIssue'|'Device'|'DeviceAssociation'|'DeviceDefinition'|'DeviceDispense'|'DeviceMetric'|'DeviceRequest'|'DeviceUsage'|'DiagnosticReport'|'DocumentReference'|'Encounter'|'EncounterHistory'|'Endpoint'|'EnrollmentRequest'|'EnrollmentResponse'|'EpisodeOfCare'|'EventDefinition'|'Evidence'|'EvidenceReport'|'EvidenceVariable'|'ExampleScenario'|'ExplanationOfBenefit'|'FamilyMemberHistory'|'Flag'|'FormularyItem'|'GenomicStudy'|'Goal'|'GraphDefinition'|'Group'|'GuidanceResponse'|'HealthcareService'|'ImagingSelection'|'ImagingStudy'|'Immunization'|'ImmunizationEvaluation'|'ImmunizationRecommendation'|'ImplementationGuide'|'Ingredient'|'InsurancePlan'|'InventoryItem'|'InventoryReport'|'Invoice'|'Library'|'Linkage'|'List'|'Location'|'ManufacturedItemDefinition'|'Measure'|'MeasureReport'|'Medication'|'MedicationAdministration'|'MedicationDispense'|'MedicationKnowledge'|'MedicationRequest'|'MedicationStatement'|'MedicinalProductDefinition'|'MessageDefinition'|'MessageHeader'|'MetadataResource'|'MolecularSequence'|'NamingSystem'|'NutritionIntake'|'NutritionOrder'|'NutritionProduct'|'Observation'|'ObservationDefinition'|'OperationDefinition'|'OperationOutcome'|'Organization'|'OrganizationAffiliation'|'PackagedProductDefinition'|'Patient'|'PaymentNotice'|'PaymentReconciliation'|'Permission'|'Person'|'PlanDefinition'|'Practitioner'|'PractitionerRole'|'Procedure'|'Provenance'|'Questionnaire'|'QuestionnaireResponse'|'RegulatedAuthorization'|'RelatedPerson'|'RequestOrchestration'|'Requirements'|'ResearchStudy'|'ResearchSubject'|'RiskAssessment'|'Schedule'|'SearchParameter'|'ServiceRequest'|'Slot'|'Specimen'|'SpecimenDefinition'|'StructureDefinition'|'StructureMap'|'Subscription'|'SubscriptionStatus'|'SubscriptionTopic'|'Substance'|'SubstanceDefinition'|'SubstanceNucleicAcid'|'SubstancePolymer'|'SubstanceProtein'|'SubstanceReferenceInformation'|'SubstanceSourceMaterial'|'SupplyDelivery'|'SupplyRequest'|'Task'|'TerminologyCapabilities'|'TestPlan'|'TestReport'|'TestScript'|'Transport'|'ValueSet'|'VerificationResult'|'VisionPrescription'|'Parameters') | undefined
  _type?: Element | undefined
  allowedType?: ('Base'|'Element'|'BackboneElement'|'DataType'|'Address'|'Annotation'|'Attachment'|'Availability'|'BackboneType'|'Dosage'|'ElementDefinition'|'MarketingStatus'|'ProductShelfLife'|'Timing'|'CodeableConcept'|'CodeableReference'|'Coding'|'ContactDetail'|'ContactPoint'|'Contributor'|'DataRequirement'|'Expression'|'ExtendedContactDetail'|'Extension'|'HumanName'|'Identifier'|'Meta'|'MonetaryComponent'|'Money'|'Narrative'|'ParameterDefinition'|'Period'|'PrimitiveType'|'base64Binary'|'boolean'|'date'|'dateTime'|'decimal'|'instant'|'integer'|'positiveInt'|'unsignedInt'|'integer64'|'string'|'code'|'id'|'markdown'|'time'|'uri'|'canonical'|'oid'|'url'|'uuid'|'Quantity'|'Age'|'Count'|'Distance'|'Duration'|'Range'|'Ratio'|'RatioRange'|'Reference'|'RelatedArtifact'|'SampledData'|'Signature'|'TriggerDefinition'|'UsageContext'|'VirtualServiceDetail'|'xhtml'|'Resource'|'Binary'|'Bundle'|'DomainResource'|'Account'|'ActivityDefinition'|'ActorDefinition'|'AdministrableProductDefinition'|'AdverseEvent'|'AllergyIntolerance'|'Appointment'|'AppointmentResponse'|'ArtifactAssessment'|'AuditEvent'|'Basic'|'BiologicallyDerivedProduct'|'BiologicallyDerivedProductDispense'|'BodyStructure'|'CanonicalResource'|'CapabilityStatement'|'CarePlan'|'CareTeam'|'ChargeItem'|'ChargeItemDefinition'|'Citation'|'Claim'|'ClaimResponse'|'ClinicalImpression'|'ClinicalUseDefinition'|'CodeSystem'|'Communication'|'CommunicationRequest'|'CompartmentDefinition'|'Composition'|'ConceptMap'|'Condition'|'ConditionDefinition'|'Consent'|'Contract'|'Coverage'|'CoverageEligibilityRequest'|'CoverageEligibilityResponse'|'DetectedIssue'|'Device'|'DeviceAssociation'|'DeviceDefinition'|'DeviceDispense'|'DeviceMetric'|'DeviceRequest'|'DeviceUsage'|'DiagnosticReport'|'DocumentReference'|'Encounter'|'EncounterHistory'|'Endpoint'|'EnrollmentRequest'|'EnrollmentResponse'|'EpisodeOfCare'|'EventDefinition'|'Evidence'|'EvidenceReport'|'EvidenceVariable'|'ExampleScenario'|'ExplanationOfBenefit'|'FamilyMemberHistory'|'Flag'|'FormularyItem'|'GenomicStudy'|'Goal'|'GraphDefinition'|'Group'|'GuidanceResponse'|'HealthcareService'|'ImagingSelection'|'ImagingStudy'|'Immunization'|'ImmunizationEvaluation'|'ImmunizationRecommendation'|'ImplementationGuide'|'Ingredient'|'InsurancePlan'|'InventoryItem'|'InventoryReport'|'Invoice'|'Library'|'Linkage'|'List'|'Location'|'ManufacturedItemDefinition'|'Measure'|'MeasureReport'|'Medication'|'MedicationAdministration'|'MedicationDispense'|'MedicationKnowledge'|'MedicationRequest'|'MedicationStatement'|'MedicinalProductDefinition'|'MessageDefinition'|'MessageHeader'|'MetadataResource'|'MolecularSequence'|'NamingSystem'|'NutritionIntake'|'NutritionOrder'|'NutritionProduct'|'Observation'|'ObservationDefinition'|'OperationDefinition'|'OperationOutcome'|'Organization'|'OrganizationAffiliation'|'PackagedProductDefinition'|'Patient'|'PaymentNotice'|'PaymentReconciliation'|'Permission'|'Person'|'PlanDefinition'|'Practitioner'|'PractitionerRole'|'Procedure'|'Provenance'|'Questionnaire'|'QuestionnaireResponse'|'RegulatedAuthorization'|'RelatedPerson'|'RequestOrchestration'|'Requirements'|'ResearchStudy'|'ResearchSubject'|'RiskAssessment'|'Schedule'|'SearchParameter'|'ServiceRequest'|'Slot'|'Specimen'|'SpecimenDefinition'|'StructureDefinition'|'StructureMap'|'Subscription'|'SubscriptionStatus'|'SubscriptionTopic'|'Substance'|'SubstanceDefinition'|'SubstanceNucleicAcid'|'SubstancePolymer'|'SubstanceProtein'|'SubstanceReferenceInformation'|'SubstanceSourceMaterial'|'SupplyDelivery'|'SupplyRequest'|'Task'|'TerminologyCapabilities'|'TestPlan'|'TestReport'|'TestScript'|'Transport'|'ValueSet'|'VerificationResult'|'VisionPrescription'|'Parameters')[] | undefined
  _allowedType?: Element | undefined
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
    scope: z.array(z.enum(['instance', 'type', 'system'])).optional(),
      _scope: ElementSchema.optional(),
    min: z.number(),
      _min: ElementSchema.optional(),
    max: z.string(),
      _max: ElementSchema.optional(),
    documentation: z.string().optional(),
      _documentation: ElementSchema.optional(),
    type: z.enum(['Base', 'Element', 'BackboneElement', 'DataType', 'Address', 'Annotation', 'Attachment', 'Availability', 'BackboneType', 'Dosage', 'ElementDefinition', 'MarketingStatus', 'ProductShelfLife', 'Timing', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'DataRequirement', 'Expression', 'ExtendedContactDetail', 'Extension', 'HumanName', 'Identifier', 'Meta', 'MonetaryComponent', 'Money', 'Narrative', 'ParameterDefinition', 'Period', 'PrimitiveType', 'base64Binary', 'boolean', 'date', 'dateTime', 'decimal', 'instant', 'integer', 'positiveInt', 'unsignedInt', 'integer64', 'string', 'code', 'id', 'markdown', 'time', 'uri', 'canonical', 'oid', 'url', 'uuid', 'Quantity', 'Age', 'Count', 'Distance', 'Duration', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'TriggerDefinition', 'UsageContext', 'VirtualServiceDetail', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'CanonicalResource', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MetadataResource', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters']).optional(),
      _type: ElementSchema.optional(),
    allowedType: z.array(z.enum(['Base', 'Element', 'BackboneElement', 'DataType', 'Address', 'Annotation', 'Attachment', 'Availability', 'BackboneType', 'Dosage', 'ElementDefinition', 'MarketingStatus', 'ProductShelfLife', 'Timing', 'CodeableConcept', 'CodeableReference', 'Coding', 'ContactDetail', 'ContactPoint', 'Contributor', 'DataRequirement', 'Expression', 'ExtendedContactDetail', 'Extension', 'HumanName', 'Identifier', 'Meta', 'MonetaryComponent', 'Money', 'Narrative', 'ParameterDefinition', 'Period', 'PrimitiveType', 'base64Binary', 'boolean', 'date', 'dateTime', 'decimal', 'instant', 'integer', 'positiveInt', 'unsignedInt', 'integer64', 'string', 'code', 'id', 'markdown', 'time', 'uri', 'canonical', 'oid', 'url', 'uuid', 'Quantity', 'Age', 'Count', 'Distance', 'Duration', 'Range', 'Ratio', 'RatioRange', 'Reference', 'RelatedArtifact', 'SampledData', 'Signature', 'TriggerDefinition', 'UsageContext', 'VirtualServiceDetail', 'xhtml', 'Resource', 'Binary', 'Bundle', 'DomainResource', 'Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'CanonicalResource', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MetadataResource', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription', 'Parameters'])).optional(),
      _allowedType: ElementSchema.optional(),
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
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  affectsState: z.boolean().optional(),
  _affectsState: ElementSchema.optional(),
  code: z.string(),
  _code: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  base: z.string().optional(),
  _base: ElementSchema.optional(),
  resource: z.array(z.enum(['BodySite', 'CatalogEntry', 'Conformance', 'DataElement', 'DeviceComponent', 'DeviceUseRequest', 'DeviceUseStatement', 'DiagnosticOrder', 'DocumentManifest', 'EffectEvidenceSynthesis', 'EligibilityRequest', 'EligibilityResponse', 'ExpansionProfile', 'ImagingManifest', 'ImagingObjectSelection', 'Media', 'MedicationOrder', 'MedicationUsage', 'MedicinalProduct', 'MedicinalProductAuthorization', 'MedicinalProductContraindication', 'MedicinalProductIndication', 'MedicinalProductIngredient', 'MedicinalProductInteraction', 'MedicinalProductManufactured', 'MedicinalProductPackaged', 'MedicinalProductPharmaceutical', 'MedicinalProductUndesirableEffect', 'Order', 'OrderResponse', 'ProcedureRequest', 'ProcessRequest', 'ProcessResponse', 'ReferralRequest', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'RiskEvidenceSynthesis', 'Sequence', 'ServiceDefinition', 'SubstanceSpecification'])).optional(),
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
 * Potential target for the link
 */
export const GraphDefinitionNodeSchema = BackboneElementSchema.extend({
  nodeId: z.string(),
  _nodeId: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  type: z.enum(['BodySite', 'CatalogEntry', 'Conformance', 'DataElement', 'DeviceComponent', 'DeviceUseRequest', 'DeviceUseStatement', 'DiagnosticOrder', 'DocumentManifest', 'EffectEvidenceSynthesis', 'EligibilityRequest', 'EligibilityResponse', 'ExpansionProfile', 'ImagingManifest', 'ImagingObjectSelection', 'Media', 'MedicationOrder', 'MedicationUsage', 'MedicinalProduct', 'MedicinalProductAuthorization', 'MedicinalProductContraindication', 'MedicinalProductIndication', 'MedicinalProductIngredient', 'MedicinalProductInteraction', 'MedicinalProductManufactured', 'MedicinalProductPackaged', 'MedicinalProductPharmaceutical', 'MedicinalProductUndesirableEffect', 'Order', 'OrderResponse', 'ProcedureRequest', 'ProcessRequest', 'ProcessResponse', 'ReferralRequest', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'RiskEvidenceSynthesis', 'Sequence', 'ServiceDefinition', 'SubstanceSpecification']),
  _type: ElementSchema.optional(),
  profile: z.string().optional(),
  _profile: ElementSchema.optional(),
})
export type GraphDefinitionNode = z.infer<typeof GraphDefinitionNodeSchema>

/**
 * Compartment Consistency Rules
 */
export const GraphDefinitionLinkCompartmentSchema = BackboneElementSchema.extend({
  use: z.enum(['where', 'requires']),
  _use: ElementSchema.optional(),
  rule: z.enum(['identical', 'matching', 'different', 'custom']),
  _rule: ElementSchema.optional(),
  code: z.enum(['Patient', 'Encounter', 'RelatedPerson', 'Practitioner', 'Device', 'EpisodeOfCare']),
  _code: ElementSchema.optional(),
  expression: z.string().optional(),
  _expression: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type GraphDefinitionLinkCompartment = z.infer<typeof GraphDefinitionLinkCompartmentSchema>

/**
 * Links this graph makes rules about
 */
export const GraphDefinitionLinkSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  min: z.number().optional(),
  _min: ElementSchema.optional(),
  max: z.string().optional(),
  _max: ElementSchema.optional(),
  sourceId: z.string(),
  _sourceId: ElementSchema.optional(),
  path: z.string().optional(),
  _path: ElementSchema.optional(),
  sliceName: z.string().optional(),
  _sliceName: ElementSchema.optional(),
  targetId: z.string(),
  _targetId: ElementSchema.optional(),
  params: z.string().optional(),
  _params: ElementSchema.optional(),
  compartment: z.array(GraphDefinitionLinkCompartmentSchema).optional(),
})
export type GraphDefinitionLink = z.infer<typeof GraphDefinitionLinkSchema>

/**
 * A formal computable definition of a graph of resources - that is, a coherent set of resources that form a graph by following references. The Graph Definition resource defines a set and makes rules about the set.
 */
export const GraphDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('GraphDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  start: z.string().optional(),
  _start: ElementSchema.optional(),
  node: z.array(GraphDefinitionNodeSchema).optional(),
  link: z.array(GraphDefinitionLinkSchema).optional(),
})
export type GraphDefinition = z.infer<typeof GraphDefinitionSchema>

/**
 * Active or inactive ingredient
 * Identifies a particular constituent of interest in the product.
 * The ingredients need not be a complete list.  If an ingredient is not specified, this does not indicate whether an ingredient is present or absent.  If an ingredient is specified it does not mean that all ingredients are specified.  It is possible to specify both inactive and active ingredients.
 */
export const MedicationIngredientSchema = BackboneElementSchema.extend({
  item: CodeableReferenceSchema,
  isActive: z.boolean().optional(),
  _isActive: ElementSchema.optional(),
  strengthRatio: RatioSchema.optional(),
  strengthCodeableConcept: CodeableConceptSchema.optional(),
  strengthQuantity: QuantitySchema.optional(),
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
 * This resource is primarily used for the identification and definition of a medication, including ingredients, for the purposes of prescribing, dispensing, and administering a medication as well as for making statements about medication use.
 */
export const MedicationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Medication'),
  identifier: z.array(IdentifierSchema).optional(),
  code: CodeableConceptSchema.optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  marketingAuthorizationHolder: ReferenceSchema.optional(),
  doseForm: CodeableConceptSchema.optional(),
  totalVolume: QuantitySchema.optional(),
  ingredient: z.array(MedicationIngredientSchema).optional(),
  batch: MedicationBatchSchema.optional(),
  definition: ReferenceSchema.optional(),
})
export type Medication = z.infer<typeof MedicationSchema>

/**
 * A fixed quantity (no comparator)
 */
export const SimpleQuantitySchema = QuantitySchema.extend({
})
export type SimpleQuantity = z.infer<typeof SimpleQuantitySchema>

/**
 * Additional information supporting the diagnostic report
 * This backbone element contains supporting information that was used in the creation of the report not included in the results already included in the report.
 */
export const DiagnosticReportSupportingInfoSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  reference: ReferenceSchema,
})
export type DiagnosticReportSupportingInfo = z.infer<typeof DiagnosticReportSupportingInfoSchema>

/**
 * Key images or data associated with this report
 * A list of key images or data associated with this report. The images or data are generally created during the diagnostic process, and may be directly of the patient, or of treated specimens (i.e. slides of interest).
 */
export const DiagnosticReportMediaSchema = BackboneElementSchema.extend({
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  link: ReferenceSchema,
})
export type DiagnosticReportMedia = z.infer<typeof DiagnosticReportMediaSchema>

/**
 * The findings and interpretation of diagnostic tests performed on patients, groups of patients, products, substances, devices, and locations, and/or specimens derived from these. The report includes clinical context such as requesting provider information, and some mix of atomic results, images, textual and coded interpretations, and formatted representation of diagnostic reports. The report also includes non-clinical context such as batch analysis and stability reporting of products and substances.
 */
export const DiagnosticReportSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DiagnosticReport'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  status: z.enum(['registered', 'partial', 'preliminary', 'modified', 'final', 'amended', 'corrected', 'appended', 'cancelled', 'entered-in-error', 'unknown']),
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
  note: z.array(AnnotationSchema).optional(),
  study: z.array(ReferenceSchema).optional(),
  supportingInfo: z.array(DiagnosticReportSupportingInfoSchema).optional(),
  media: z.array(DiagnosticReportMediaSchema).optional(),
  composition: ReferenceSchema.optional(),
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
  proposedNewTime: z.boolean().optional(),
  _proposedNewTime: ElementSchema.optional(),
  start: z.string().optional(),
  _start: ElementSchema.optional(),
  end: z.string().optional(),
  _end: ElementSchema.optional(),
  participantType: z.array(CodeableConceptSchema).optional(),
  actor: ReferenceSchema.optional(),
  participantStatus: z.enum(['accepted', 'declined', 'tentative', 'needs-action', 'entered-in-error']),
  _participantStatus: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  recurring: z.boolean().optional(),
  _recurring: ElementSchema.optional(),
  occurrenceDate: z.string().optional(),
  _occurrenceDate: ElementSchema.optional(),
  recurrenceId: z.number().optional(),
  _recurrenceId: ElementSchema.optional(),
})
export type AppointmentResponse = z.infer<typeof AppointmentResponseSchema>

/**
 * Message destination application(s)
 * The destination application which the message is intended for.
 * There SHOULD be at least one destination, but in some circumstances, the source system is unaware of any particular destination system.
 */
export const MessageHeaderDestinationSchema = BackboneElementSchema.extend({
  endpointUrl: z.string().optional(),
  _endpointUrl: ElementSchema.optional(),
  endpointReference: ReferenceSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  target: ReferenceSchema.optional(),
  receiver: ReferenceSchema.optional(),
})
export type MessageHeaderDestination = z.infer<typeof MessageHeaderDestinationSchema>

/**
 * Message source application
 * The source application from which this message originated.
 */
export const MessageHeaderSourceSchema = BackboneElementSchema.extend({
  endpointUrl: z.string().optional(),
  _endpointUrl: ElementSchema.optional(),
  endpointReference: ReferenceSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  software: z.string().optional(),
  _software: ElementSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  contact: ContactPointSchema.optional(),
})
export type MessageHeaderSource = z.infer<typeof MessageHeaderSourceSchema>

/**
 * If this is a reply to prior message
 * Information about the message that this message is a response to.  Only present if this message is a response.
 */
export const MessageHeaderResponseSchema = BackboneElementSchema.extend({
  identifier: IdentifierSchema,
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
  eventCanonical: z.string().optional(),
  _eventCanonical: ElementSchema.optional(),
  destination: z.array(MessageHeaderDestinationSchema).optional(),
  sender: ReferenceSchema.optional(),
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
 * xhtml Type definition
 */
export const xhtmlSchema = ElementSchema.extend({
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type xhtml = z.infer<typeof xhtmlSchema>

/**
 * Indicates whether and when the device is available on the market
 * Indicates where and when the device is available on the market.
 */
export const DeviceDefinitionUdiDeviceIdentifierMarketDistributionSchema = BackboneElementSchema.extend({
  marketPeriod: PeriodSchema,
  subJurisdiction: z.string(),
  _subJurisdiction: ElementSchema.optional(),
})
export type DeviceDefinitionUdiDeviceIdentifierMarketDistribution = z.infer<typeof DeviceDefinitionUdiDeviceIdentifierMarketDistributionSchema>

/**
 * Unique Device Identifier (UDI) Barcode string
 * Unique device identifier (UDI) assigned to device label or package.  Note that the Device may include multiple udiCarriers as it either may include just the udiCarrier for the jurisdiction it is sold, or for multiple jurisdictions it could have been sold.
 */
export interface DeviceDefinitionUdiDeviceIdentifier extends BackboneElement {
  deviceIdentifier: string
  _deviceIdentifier?: Element | undefined
  issuer: string
  _issuer?: Element | undefined
  jurisdiction: string
  _jurisdiction?: Element | undefined
  marketDistribution?: DeviceDefinitionUdiDeviceIdentifierMarketDistribution[] | undefined
}

export const DeviceDefinitionUdiDeviceIdentifierSchema: z.ZodType<DeviceDefinitionUdiDeviceIdentifier> = z.lazy(() =>
  BackboneElementSchema.extend({
    deviceIdentifier: z.string(),
      _deviceIdentifier: ElementSchema.optional(),
    issuer: z.string(),
      _issuer: ElementSchema.optional(),
    jurisdiction: z.string(),
      _jurisdiction: ElementSchema.optional(),
    marketDistribution: z.array(DeviceDefinitionUdiDeviceIdentifierMarketDistributionSchema).optional(),
  })
)

/**
 * Regulatory identifier(s) associated with this device
 * Identifier associated with the regulatory documentation (certificates, technical documentation, post-market surveillance documentation and reports) of a set of device models sharing the same intended purpose, risk class and essential design and manufacturing characteristics. One example is the Basic UDI-DI in Europe.
 * This should not be used for regulatory authorization numbers which are to be captured elsewhere.
 */
export const DeviceDefinitionRegulatoryIdentifierSchema = BackboneElementSchema.extend({
  type: z.enum(['basic', 'master', 'license']),
  _type: ElementSchema.optional(),
  deviceIdentifier: z.string(),
  _deviceIdentifier: ElementSchema.optional(),
  issuer: z.string(),
  _issuer: ElementSchema.optional(),
  jurisdiction: z.string(),
  _jurisdiction: ElementSchema.optional(),
})
export type DeviceDefinitionRegulatoryIdentifier = z.infer<typeof DeviceDefinitionRegulatoryIdentifierSchema>

/**
 * The name or names of the device as given by the manufacturer
 */
export const DeviceDefinitionDeviceNameSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  type: z.enum(['registered-name', 'user-friendly-name', 'patient-reported-name']),
  _type: ElementSchema.optional(),
})
export type DeviceDefinitionDeviceName = z.infer<typeof DeviceDefinitionDeviceNameSchema>

/**
 * What kind of device or device system this is
 * In this element various classifications can be used, such as GMDN, EMDN, SNOMED CT, risk classes, national product codes.
 */
export const DeviceDefinitionClassificationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  justification: z.array(RelatedArtifactSchema).optional(),
})
export type DeviceDefinitionClassification = z.infer<typeof DeviceDefinitionClassificationSchema>

/**
 * Identifies the standards, specifications, or formal guidances for the capabilities supported by the device
 * Identifies the standards, specifications, or formal guidances for the capabilities supported by the device. The device may be certified as conformant to these specifications e.g., communication, performance, process, measurement, or specialization standards.
 */
export const DeviceDefinitionConformsToSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema.optional(),
  specification: CodeableConceptSchema,
  version: z.array(z.string()).optional(),
  _version: ElementSchema.optional(),
  source: z.array(RelatedArtifactSchema).optional(),
})
export type DeviceDefinitionConformsTo = z.infer<typeof DeviceDefinitionConformsToSchema>

/**
 * A device, part of the current one
 * A device that is part (for example a component) of the present device.
 */
export const DeviceDefinitionHasPartSchema = BackboneElementSchema.extend({
  reference: ReferenceSchema,
  count: z.number().optional(),
  _count: ElementSchema.optional(),
})
export type DeviceDefinitionHasPart = z.infer<typeof DeviceDefinitionHasPartSchema>

/**
 * An organization that distributes the packaged device
 */
export const DeviceDefinitionPackagingDistributorSchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  organizationReference: z.array(ReferenceSchema).optional(),
})
export type DeviceDefinitionPackagingDistributor = z.infer<typeof DeviceDefinitionPackagingDistributorSchema>

/**
 * Information about the packaging of the device, i.e. how the device is packaged
 */
export interface DeviceDefinitionPackaging extends BackboneElement {
  identifier?: Identifier | undefined
  type?: CodeableConcept | undefined
  count?: number | undefined
  _count?: Element | undefined
  distributor?: DeviceDefinitionPackagingDistributor[] | undefined
  udiDeviceIdentifier?: DeviceDefinitionUdiDeviceIdentifier[] | undefined
  packaging?: DeviceDefinitionPackaging[] | undefined
}

export const DeviceDefinitionPackagingSchema: z.ZodType<DeviceDefinitionPackaging> = z.lazy(() =>
  BackboneElementSchema.extend({
    identifier: IdentifierSchema.optional(),
    type: CodeableConceptSchema.optional(),
    count: z.number().optional(),
      _count: ElementSchema.optional(),
    distributor: z.array(DeviceDefinitionPackagingDistributorSchema).optional(),
    udiDeviceIdentifier: z.lazy(() => z.array(DeviceDefinitionUdiDeviceIdentifierSchema)).optional(),
    packaging: z.lazy(() => z.array(DeviceDefinitionPackagingSchema)).optional(),
  })
)

/**
 * The version of the device or software
 */
export const DeviceDefinitionVersionSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  component: IdentifierSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type DeviceDefinitionVersion = z.infer<typeof DeviceDefinitionVersionSchema>

/**
 * Inherent, essentially fixed, characteristics of this kind of device, e.g., time properties, size, etc
 * Static or essentially fixed characteristics or features of this kind of device that are otherwise not captured in more specific attributes, e.g., time or timing attributes, resolution, accuracy, and physical attributes.
 * Dynamic or current properties, such as settings, of an individual device are described using a Device instance-specific DeviceMetric and recorded using Observation.  Static characteristics of an individual device could also be documented in a [Device] instance. The Device instance's properties, and their values, could be, but need not be, the same as in the associated DeviceDefinition.
 */
export const DeviceDefinitionPropertySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueQuantity: QuantitySchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueRange: RangeSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
})
export type DeviceDefinitionProperty = z.infer<typeof DeviceDefinitionPropertySchema>

/**
 * An associated device, attached to, used with, communicating with or linking a previous or new device model to the focal device
 */
export const DeviceDefinitionLinkSchema = BackboneElementSchema.extend({
  relation: CodingSchema,
  relatedDevice: CodeableReferenceSchema,
})
export type DeviceDefinitionLink = z.infer<typeof DeviceDefinitionLinkSchema>

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
 * Information aimed at providing directions for the usage of this model of device
 * For more structured data, a ClinicalUseDefinition that points to the DeviceDefinition can be used.
 */
export const DeviceDefinitionGuidelineSchema = BackboneElementSchema.extend({
  useContext: z.array(UsageContextSchema).optional(),
  usageInstruction: z.string().optional(),
  _usageInstruction: ElementSchema.optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  indication: z.array(CodeableConceptSchema).optional(),
  contraindication: z.array(CodeableConceptSchema).optional(),
  warning: z.array(CodeableConceptSchema).optional(),
  intendedUse: z.string().optional(),
  _intendedUse: ElementSchema.optional(),
})
export type DeviceDefinitionGuideline = z.infer<typeof DeviceDefinitionGuidelineSchema>

/**
 * Tracking of latest field safety corrective action
 */
export const DeviceDefinitionCorrectiveActionSchema = BackboneElementSchema.extend({
  recall: z.boolean(),
  _recall: ElementSchema.optional(),
  scope: z.enum(['model', 'lot-numbers', 'serial-numbers']).optional(),
  _scope: ElementSchema.optional(),
  period: PeriodSchema,
})
export type DeviceDefinitionCorrectiveAction = z.infer<typeof DeviceDefinitionCorrectiveActionSchema>

/**
 * Billing code or reference associated with the device
 */
export const DeviceDefinitionChargeItemSchema = BackboneElementSchema.extend({
  chargeItemCode: CodeableReferenceSchema,
  count: QuantitySchema,
  effectivePeriod: PeriodSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
})
export type DeviceDefinitionChargeItem = z.infer<typeof DeviceDefinitionChargeItemSchema>

/**
 * This is a specialized resource that defines the characteristics and capabilities of a device.
 */
export const DeviceDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DeviceDefinition'),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  udiDeviceIdentifier: z.array(DeviceDefinitionUdiDeviceIdentifierSchema).optional(),
  regulatoryIdentifier: z.array(DeviceDefinitionRegulatoryIdentifierSchema).optional(),
  partNumber: z.string().optional(),
  _partNumber: ElementSchema.optional(),
  manufacturer: ReferenceSchema.optional(),
  deviceName: z.array(DeviceDefinitionDeviceNameSchema).optional(),
  modelNumber: z.string().optional(),
  _modelNumber: ElementSchema.optional(),
  classification: z.array(DeviceDefinitionClassificationSchema).optional(),
  conformsTo: z.array(DeviceDefinitionConformsToSchema).optional(),
  hasPart: z.array(DeviceDefinitionHasPartSchema).optional(),
  packaging: z.array(DeviceDefinitionPackagingSchema).optional(),
  version: z.array(DeviceDefinitionVersionSchema).optional(),
  safety: z.array(CodeableConceptSchema).optional(),
  shelfLifeStorage: z.array(ProductShelfLifeSchema).optional(),
  languageCode: z.array(CodeableConceptSchema).optional(),
  property: z.array(DeviceDefinitionPropertySchema).optional(),
  owner: ReferenceSchema.optional(),
  contact: z.array(ContactPointSchema).optional(),
  link: z.array(DeviceDefinitionLinkSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  material: z.array(DeviceDefinitionMaterialSchema).optional(),
  productionIdentifierInUDI: z.array(z.enum(['lot-number', 'manufactured-date', 'serial-number', 'expiration-date', 'biological-source', 'software-version'])).optional(),
  _productionIdentifierInUDI: ElementSchema.optional(),
  guideline: DeviceDefinitionGuidelineSchema.optional(),
  correctiveAction: DeviceDefinitionCorrectiveActionSchema.optional(),
  chargeItem: z.array(DeviceDefinitionChargeItemSchema).optional(),
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
  continuous: z.boolean().optional(),
  _continuous: ElementSchema.optional(),
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
  source: ReferenceSchema.optional(),
  addresses: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  outcome: z.array(CodeableReferenceSchema).optional(),
})
export type Goal = z.infer<typeof GoalSchema>

/**
 * Set of qualified values for observation results
 * A set of qualified values associated with a context and a set of conditions -  provides a range for quantitative and ordinal observations and a collection of value sets for qualitative observations.
 */
export interface ObservationDefinitionQualifiedValue extends BackboneElement {
  context?: CodeableConcept | undefined
  appliesTo?: CodeableConcept[] | undefined
  gender?: ('male'|'female'|'other'|'unknown') | undefined
  _gender?: Element | undefined
  age?: Range | undefined
  gestationalAge?: Range | undefined
  condition?: string | undefined
  _condition?: Element | undefined
  rangeCategory?: ('reference'|'critical'|'absolute') | undefined
  _rangeCategory?: Element | undefined
  range?: Range | undefined
  validCodedValueSet?: string | undefined
  _validCodedValueSet?: Element | undefined
  normalCodedValueSet?: string | undefined
  _normalCodedValueSet?: Element | undefined
  abnormalCodedValueSet?: string | undefined
  _abnormalCodedValueSet?: Element | undefined
  criticalCodedValueSet?: string | undefined
  _criticalCodedValueSet?: Element | undefined
}

export const ObservationDefinitionQualifiedValueSchema: z.ZodType<ObservationDefinitionQualifiedValue> = z.lazy(() =>
  BackboneElementSchema.extend({
    context: CodeableConceptSchema.optional(),
    appliesTo: z.array(CodeableConceptSchema).optional(),
    gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
      _gender: ElementSchema.optional(),
    age: RangeSchema.optional(),
    gestationalAge: RangeSchema.optional(),
    condition: z.string().optional(),
      _condition: ElementSchema.optional(),
    rangeCategory: z.enum(['reference', 'critical', 'absolute']).optional(),
      _rangeCategory: ElementSchema.optional(),
    range: RangeSchema.optional(),
    validCodedValueSet: z.string().optional(),
      _validCodedValueSet: ElementSchema.optional(),
    normalCodedValueSet: z.string().optional(),
      _normalCodedValueSet: ElementSchema.optional(),
    abnormalCodedValueSet: z.string().optional(),
      _abnormalCodedValueSet: ElementSchema.optional(),
    criticalCodedValueSet: z.string().optional(),
      _criticalCodedValueSet: ElementSchema.optional(),
  })
)

/**
 * Component results
 * Some observations have multiple component observations, expressed as separate code value pairs.
 */
export const ObservationDefinitionComponentSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  permittedDataType: z.array(z.enum(['Quantity', 'CodeableConcept', 'string', 'boolean', 'integer', 'Range', 'Ratio', 'SampledData', 'time', 'dateTime', 'Period'])).optional(),
  _permittedDataType: ElementSchema.optional(),
  permittedUnit: z.array(CodingSchema).optional(),
  qualifiedValue: z.lazy(() => z.array(ObservationDefinitionQualifiedValueSchema)).optional(),
})
export type ObservationDefinitionComponent = z.infer<typeof ObservationDefinitionComponentSchema>

/**
 * Set of definitional characteristics for a kind of observation or measurement produced or consumed by an orderable health care service.
 */
export const ObservationDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ObservationDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: IdentifierSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  derivedFromCanonical: z.array(z.string()).optional(),
  _derivedFromCanonical: ElementSchema.optional(),
  derivedFromUri: z.array(z.string()).optional(),
  _derivedFromUri: ElementSchema.optional(),
  subject: z.array(CodeableConceptSchema).optional(),
  performerType: CodeableConceptSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema,
  permittedDataType: z.array(z.enum(['Quantity', 'CodeableConcept', 'string', 'boolean', 'integer', 'Range', 'Ratio', 'SampledData', 'time', 'dateTime', 'Period'])).optional(),
  _permittedDataType: ElementSchema.optional(),
  multipleResultsAllowed: z.boolean().optional(),
  _multipleResultsAllowed: ElementSchema.optional(),
  bodySite: CodeableConceptSchema.optional(),
  method: CodeableConceptSchema.optional(),
  specimen: z.array(ReferenceSchema).optional(),
  device: z.array(ReferenceSchema).optional(),
  preferredReportName: z.string().optional(),
  _preferredReportName: ElementSchema.optional(),
  permittedUnit: z.array(CodingSchema).optional(),
  qualifiedValue: z.array(ObservationDefinitionQualifiedValueSchema).optional(),
  hasMember: z.array(ReferenceSchema).optional(),
  component: z.array(ObservationDefinitionComponentSchema).optional(),
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
 * Patient eligibility for a specific vaccination program
 * Indicates a patient's eligibility for a funding program.
 */
export const ImmunizationProgramEligibilitySchema = BackboneElementSchema.extend({
  program: CodeableConceptSchema,
  programStatus: CodeableConceptSchema,
})
export type ImmunizationProgramEligibility = z.infer<typeof ImmunizationProgramEligibilitySchema>

/**
 * Details of a reaction that follows immunization
 * Categorical data indicating that an adverse event is associated in time to an immunization.
 * A reaction may be an indication of an allergy or intolerance and, if this is determined to be the case, it should be recorded as a new AllergyIntolerance resource instance as most systems will not query against past Immunization.reaction elements.
 */
export const ImmunizationReactionSchema = BackboneElementSchema.extend({
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  manifestation: CodeableReferenceSchema.optional(),
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
  doseNumber: z.string(),
  _doseNumber: ElementSchema.optional(),
  seriesDoses: z.string().optional(),
  _seriesDoses: ElementSchema.optional(),
})
export type ImmunizationProtocolApplied = z.infer<typeof ImmunizationProtocolAppliedSchema>

/**
 * Describes the event of a patient being administered a vaccine or a record of an immunization as reported by a patient, a clinician or another party.
 */
export const ImmunizationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Immunization'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  status: z.enum(['completed', 'entered-in-error', 'not-done']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  vaccineCode: CodeableConceptSchema,
  administeredProduct: CodeableReferenceSchema.optional(),
  manufacturer: CodeableReferenceSchema.optional(),
  lotNumber: z.string().optional(),
  _lotNumber: ElementSchema.optional(),
  expirationDate: z.string().optional(),
  _expirationDate: ElementSchema.optional(),
  patient: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrenceString: z.string().optional(),
  _occurrenceString: ElementSchema.optional(),
  primarySource: z.boolean().optional(),
  _primarySource: ElementSchema.optional(),
  informationSource: CodeableReferenceSchema.optional(),
  location: ReferenceSchema.optional(),
  site: CodeableConceptSchema.optional(),
  route: CodeableConceptSchema.optional(),
  doseQuantity: QuantitySchema.optional(),
  performer: z.array(ImmunizationPerformerSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  isSubpotent: z.boolean().optional(),
  _isSubpotent: ElementSchema.optional(),
  subpotentReason: z.array(CodeableConceptSchema).optional(),
  programEligibility: z.array(ImmunizationProgramEligibilitySchema).optional(),
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
  additionalUse?: Coding[] | undefined
  value: string
  _value?: Element | undefined
}

export const ValueSetComposeIncludeConceptDesignationSchema: z.ZodType<ValueSetComposeIncludeConceptDesignation> = z.lazy(() =>
  BackboneElementSchema.extend({
    language: z.string().optional(),
      _language: ElementSchema.optional(),
    use: CodingSchema.optional(),
    additionalUse: z.array(CodingSchema).optional(),
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
 * Select concepts by specifying a matching criterion based on the properties (including relationships) defined by the system, or on filters defined by the system. If multiple filters are specified within the include, they SHALL all be true.
 * Selecting codes by specifying filters based on properties is only possible where the underlying code system defines appropriate properties. Note that in some cases, the underlying code system defines the logical concepts but not the literal codes for the concepts. In such cases, the literal definitions may be provided by a third party.
 */
export const ValueSetComposeIncludeFilterSchema = BackboneElementSchema.extend({
  property: z.string(),
  _property: ElementSchema.optional(),
  op: z.enum(['=', 'is-a', 'descendent-of', 'is-not-a', 'regex', 'in', 'not-in', 'generalizes', 'child-of', 'descendent-leaf', 'exists']),
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
  copyright?: string | undefined
  _copyright?: Element | undefined
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
    copyright: z.string().optional(),
      _copyright: ElementSchema.optional(),
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
  property: z.array(z.string()).optional(),
  _property: ElementSchema.optional(),
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
 * Additional information supplied about each concept
 * A property defines an additional slot through which additional information can be provided about a concept.
 */
export const ValueSetExpansionPropertySchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  uri: z.string().optional(),
  _uri: ElementSchema.optional(),
})
export type ValueSetExpansionProperty = z.infer<typeof ValueSetExpansionPropertySchema>

/**
 * SubProperty value for the concept
 * A subproperty value for this concept.
 */
export const ValueSetExpansionContainsPropertySubPropertySchema = BackboneElementSchema.extend({
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
export type ValueSetExpansionContainsPropertySubProperty = z.infer<typeof ValueSetExpansionContainsPropertySubPropertySchema>

/**
 * Property value for the concept
 * A property value for this concept.
 */
export const ValueSetExpansionContainsPropertySchema = BackboneElementSchema.extend({
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
  subProperty: z.array(ValueSetExpansionContainsPropertySubPropertySchema).optional(),
})
export type ValueSetExpansionContainsProperty = z.infer<typeof ValueSetExpansionContainsPropertySchema>

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
  property?: ValueSetExpansionContainsProperty[] | undefined
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
    property: z.array(ValueSetExpansionContainsPropertySchema).optional(),
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
  next: z.string().optional(),
  _next: ElementSchema.optional(),
  timestamp: z.string(),
  _timestamp: ElementSchema.optional(),
  total: z.number().optional(),
  _total: ElementSchema.optional(),
  offset: z.number().optional(),
  _offset: ElementSchema.optional(),
  parameter: z.array(ValueSetExpansionParameterSchema).optional(),
  property: z.array(ValueSetExpansionPropertySchema).optional(),
  contains: z.array(ValueSetExpansionContainsSchema).optional(),
})
export type ValueSetExpansion = z.infer<typeof ValueSetExpansionSchema>

/**
 * Description of the semantic space the Value Set Expansion is intended to cover and should further clarify the text in ValueSet.description
 */
export const ValueSetScopeSchema = BackboneElementSchema.extend({
  inclusionCriteria: z.string().optional(),
  _inclusionCriteria: ElementSchema.optional(),
  exclusionCriteria: z.string().optional(),
  _exclusionCriteria: ElementSchema.optional(),
})
export type ValueSetScope = z.infer<typeof ValueSetScopeSchema>

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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
  compose: ValueSetComposeSchema.optional(),
  expansion: ValueSetExpansionSchema.optional(),
  scope: ValueSetScopeSchema.optional(),
})
export type ValueSet = z.infer<typeof ValueSetSchema>

/**
 * Event information
 * Information code for an event with a corresponding date or period.
 */
export const ClaimResponseEventSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  whenDateTime: z.string().optional(),
  _whenDateTime: ElementSchema.optional(),
  whenPeriod: PeriodSchema.optional(),
})
export type ClaimResponseEvent = z.infer<typeof ClaimResponseEventSchema>

/**
 * Adjudication results
 * The high-level results of the adjudication if adjudication has been performed.
 */
export interface ClaimResponseItemReviewOutcome extends BackboneElement {
  decision?: CodeableConcept | undefined
  reason?: CodeableConcept[] | undefined
  preAuthRef?: string | undefined
  _preAuthRef?: Element | undefined
  preAuthPeriod?: Period | undefined
}

export const ClaimResponseItemReviewOutcomeSchema: z.ZodType<ClaimResponseItemReviewOutcome> = z.lazy(() =>
  BackboneElementSchema.extend({
    decision: CodeableConceptSchema.optional(),
    reason: z.array(CodeableConceptSchema).optional(),
    preAuthRef: z.string().optional(),
      _preAuthRef: ElementSchema.optional(),
    preAuthPeriod: PeriodSchema.optional(),
  })
)

/**
 * Adjudication details
 * If this item is a group then the values here are a summary of the adjudication of the detail items. If this item is a simple product or service then this is the result of the adjudication of this item.
 */
export interface ClaimResponseItemAdjudication extends BackboneElement {
  category: CodeableConcept
  reason?: CodeableConcept | undefined
  amount?: Money | undefined
  quantity?: Quantity | undefined
}

export const ClaimResponseItemAdjudicationSchema: z.ZodType<ClaimResponseItemAdjudication> = z.lazy(() =>
  BackboneElementSchema.extend({
    category: CodeableConceptSchema,
    reason: CodeableConceptSchema.optional(),
    amount: MoneySchema.optional(),
    quantity: QuantitySchema.optional(),
  })
)

/**
 * Adjudication for claim sub-details
 * A sub-detail adjudication of a simple product or service.
 */
export const ClaimResponseItemDetailSubDetailSchema = BackboneElementSchema.extend({
  subDetailSequence: z.number(),
  _subDetailSequence: ElementSchema.optional(),
  traceNumber: z.array(IdentifierSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ClaimResponseItemReviewOutcomeSchema).optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ClaimResponseItemReviewOutcomeSchema).optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)).optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: ClaimResponseItemReviewOutcomeSchema.optional(),
  adjudication: z.array(ClaimResponseItemAdjudicationSchema).optional(),
  detail: z.array(ClaimResponseItemDetailSchema).optional(),
})
export type ClaimResponseItem = z.infer<typeof ClaimResponseItemSchema>

/**
 * Anatomical location
 * Physical location where the service is performed or applies.
 */
export const ClaimResponseAddItemBodySiteSchema = BackboneElementSchema.extend({
  site: z.array(CodeableReferenceSchema),
  subSite: z.array(CodeableConceptSchema).optional(),
})
export type ClaimResponseAddItemBodySite = z.infer<typeof ClaimResponseAddItemBodySiteSchema>

/**
 * Insurer added line items
 * The third-tier service adjudications for payor added services.
 */
export const ClaimResponseAddItemDetailSubDetailSchema = BackboneElementSchema.extend({
  traceNumber: z.array(IdentifierSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ClaimResponseItemReviewOutcomeSchema).optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)).optional(),
})
export type ClaimResponseAddItemDetailSubDetail = z.infer<typeof ClaimResponseAddItemDetailSubDetailSchema>

/**
 * Insurer added line details
 * The second-tier service adjudications for payor added services.
 */
export const ClaimResponseAddItemDetailSchema = BackboneElementSchema.extend({
  traceNumber: z.array(IdentifierSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  modifier: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  _factor: ElementSchema.optional(),
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ClaimResponseItemReviewOutcomeSchema).optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)).optional(),
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
  traceNumber: z.array(IdentifierSchema).optional(),
  provider: z.array(ReferenceSchema).optional(),
  revenue: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema.optional(),
  productOrServiceEnd: CodeableConceptSchema.optional(),
  request: z.array(ReferenceSchema).optional(),
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
  tax: MoneySchema.optional(),
  net: MoneySchema.optional(),
  bodySite: z.array(ClaimResponseAddItemBodySiteSchema).optional(),
  noteNumber: z.array(z.number()).optional(),
  _noteNumber: ElementSchema.optional(),
  reviewOutcome: z.lazy(() => ClaimResponseItemReviewOutcomeSchema).optional(),
  adjudication: z.lazy(() => z.array(ClaimResponseItemAdjudicationSchema)).optional(),
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
  type: CodeableConceptSchema.optional(),
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
  expression: z.array(z.string()).optional(),
  _expression: ElementSchema.optional(),
})
export type ClaimResponseError = z.infer<typeof ClaimResponseErrorSchema>

/**
 * This resource provides the adjudication details from the processing of a Claim resource.
 */
export const ClaimResponseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ClaimResponse'),
  identifier: z.array(IdentifierSchema).optional(),
  traceNumber: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  type: CodeableConceptSchema,
  subType: CodeableConceptSchema.optional(),
  use: z.enum(['claim', 'preauthorization', 'predetermination']),
  _use: ElementSchema.optional(),
  patient: ReferenceSchema,
  created: z.string(),
  _created: ElementSchema.optional(),
  insurer: ReferenceSchema.optional(),
  requestor: ReferenceSchema.optional(),
  request: ReferenceSchema.optional(),
  outcome: z.enum(['queued', 'complete', 'error', 'partial']),
  _outcome: ElementSchema.optional(),
  decision: CodeableConceptSchema.optional(),
  disposition: z.string().optional(),
  _disposition: ElementSchema.optional(),
  preAuthRef: z.string().optional(),
  _preAuthRef: ElementSchema.optional(),
  preAuthPeriod: PeriodSchema.optional(),
  event: z.array(ClaimResponseEventSchema).optional(),
  payeeType: CodeableConceptSchema.optional(),
  encounter: z.array(ReferenceSchema).optional(),
  diagnosisRelatedGroup: CodeableConceptSchema.optional(),
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
 * Security labels that protect the handling of information about the term and its elements, which may be specifically identified.
 * Within a Contract, a security label may apply to the one to many nested group of terms or to a term, whether inside a group or a singleton.  The security label on the entire set of term provision elements may be different from the security labels on a contained offer, asset, valuedItem, or data such as sensitive information, and must be the high water mark of all security labels within the term. Rationale is that a labelled term, which may be disaggregated from the Contract, and must persist the label on the term and on contained elements within other contexts. If more than one policy dictates a level of confidentiality of the term, then each applicable policy may be represented by a security label specific to its requirements.
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
  reason: z.array(CodeableReferenceSchema).optional(),
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
 * A property that is specific to this BiologicallyDerviedProduct instance
 * Property can be used to provide information on a wide range of additional information specific to a particular biologicallyDerivedProduct.
 */
export const BiologicallyDerivedProductPropertySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valuePeriod: PeriodSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
})
export type BiologicallyDerivedProductProperty = z.infer<typeof BiologicallyDerivedProductPropertySchema>

/**
 * A biological material originating from a biological entity intended to be transplanted or infused into another (possibly the same) biological entity.
 */
export const BiologicallyDerivedProductSchema = DomainResourceSchema.extend({
  resourceType: z.literal('BiologicallyDerivedProduct'),
  productCategory: CodingSchema.optional(),
  productCode: CodeableConceptSchema.optional(),
  parent: z.array(ReferenceSchema).optional(),
  request: z.array(ReferenceSchema).optional(),
  identifier: z.array(IdentifierSchema).optional(),
  biologicalSourceEvent: IdentifierSchema.optional(),
  processingFacility: z.array(ReferenceSchema).optional(),
  division: z.string().optional(),
  _division: ElementSchema.optional(),
  productStatus: CodingSchema.optional(),
  expirationDate: z.string().optional(),
  _expirationDate: ElementSchema.optional(),
  collection: BiologicallyDerivedProductCollectionSchema.optional(),
  storageTempRequirements: RangeSchema.optional(),
  property: z.array(BiologicallyDerivedProductPropertySchema).optional(),
})
export type BiologicallyDerivedProduct = z.infer<typeof BiologicallyDerivedProductSchema>

/**
 * The item name(s) - the brand name, or common name, functional name, generic name or others
 * The item name(s) - the brand name, or common name, functional name, generic name.
 */
export const InventoryItemNameSchema = BackboneElementSchema.extend({
  nameType: CodingSchema,
  language: z.enum(['ar', 'bg', 'bg-BG', 'bn', 'cs', 'cs-CZ', 'bs', 'bs-BA', 'da', 'da-DK', 'de', 'de-AT', 'de-CH', 'de-DE', 'el', 'el-GR', 'en', 'en-AU', 'en-CA', 'en-GB', 'en-IN', 'en-NZ', 'en-SG', 'en-US', 'es', 'es-AR', 'es-ES', 'es-UY', 'et', 'et-EE', 'fi', 'fr', 'fr-BE', 'fr-CH', 'fr-FR', 'fi-FI', 'fr-CA', 'fy', 'fy-NL', 'hi', 'hr', 'hr-HR', 'is', 'is-IS', 'it', 'it-CH', 'it-IT', 'ja', 'ko', 'lt', 'lt-LT', 'lv', 'lv-LV', 'nl', 'nl-BE', 'nl-NL', 'no', 'no-NO', 'pa', 'pl', 'pl-PL', 'pt', 'pt-PT', 'pt-BR', 'ro', 'ro-RO', 'ru', 'ru-RU', 'sk', 'sk-SK', 'sl', 'sl-SI', 'sr', 'sr-RS', 'sv', 'sv-SE', 'te', 'zh', 'zh-CN', 'zh-HK', 'zh-SG', 'zh-TW']),
  _language: ElementSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
})
export type InventoryItemName = z.infer<typeof InventoryItemNameSchema>

/**
 * Organization(s) responsible for the product
 */
export const InventoryItemResponsibleOrganizationSchema = BackboneElementSchema.extend({
  role: CodeableConceptSchema,
  organization: ReferenceSchema,
})
export type InventoryItemResponsibleOrganization = z.infer<typeof InventoryItemResponsibleOrganizationSchema>

/**
 * Descriptive characteristics of the item
 * The descriptive characteristics of the inventory item.
 */
export const InventoryItemDescriptionSchema = BackboneElementSchema.extend({
  language: z.enum(['ar', 'bg', 'bg-BG', 'bn', 'cs', 'cs-CZ', 'bs', 'bs-BA', 'da', 'da-DK', 'de', 'de-AT', 'de-CH', 'de-DE', 'el', 'el-GR', 'en', 'en-AU', 'en-CA', 'en-GB', 'en-IN', 'en-NZ', 'en-SG', 'en-US', 'es', 'es-AR', 'es-ES', 'es-UY', 'et', 'et-EE', 'fi', 'fr', 'fr-BE', 'fr-CH', 'fr-FR', 'fi-FI', 'fr-CA', 'fy', 'fy-NL', 'hi', 'hr', 'hr-HR', 'is', 'is-IS', 'it', 'it-CH', 'it-IT', 'ja', 'ko', 'lt', 'lt-LT', 'lv', 'lv-LV', 'nl', 'nl-BE', 'nl-NL', 'no', 'no-NO', 'pa', 'pl', 'pl-PL', 'pt', 'pt-PT', 'pt-BR', 'ro', 'ro-RO', 'ru', 'ru-RU', 'sk', 'sk-SK', 'sl', 'sl-SI', 'sr', 'sr-RS', 'sv', 'sv-SE', 'te', 'zh', 'zh-CN', 'zh-HK', 'zh-SG', 'zh-TW']).optional(),
  _language: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
})
export type InventoryItemDescription = z.infer<typeof InventoryItemDescriptionSchema>

/**
 * Association with other items or products
 */
export const InventoryItemAssociationSchema = BackboneElementSchema.extend({
  associationType: CodeableConceptSchema,
  relatedItem: ReferenceSchema,
  quantity: RatioSchema,
})
export type InventoryItemAssociation = z.infer<typeof InventoryItemAssociationSchema>

/**
 * Characteristic of the item
 * The descriptive or identifying characteristics of the item.
 */
export const InventoryItemCharacteristicSchema = BackboneElementSchema.extend({
  characteristicType: CodeableConceptSchema,
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueDecimal: z.number().optional(),
  _valueDecimal: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueUrl: z.string().optional(),
  _valueUrl: ElementSchema.optional(),
  valueDateTime: z.string().optional(),
  _valueDateTime: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueAnnotation: AnnotationSchema.optional(),
  valueAddress: AddressSchema.optional(),
  valueDuration: DurationSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
})
export type InventoryItemCharacteristic = z.infer<typeof InventoryItemCharacteristicSchema>

/**
 * Instances or occurrences of the product
 */
export const InventoryItemInstanceSchema = BackboneElementSchema.extend({
  identifier: z.array(IdentifierSchema).optional(),
  lotNumber: z.string().optional(),
  _lotNumber: ElementSchema.optional(),
  expiry: z.string().optional(),
  _expiry: ElementSchema.optional(),
  subject: ReferenceSchema.optional(),
  location: ReferenceSchema.optional(),
})
export type InventoryItemInstance = z.infer<typeof InventoryItemInstanceSchema>

/**
 * functional description of an inventory item used in inventory and supply-related workflows.
 */
export const InventoryItemSchema = DomainResourceSchema.extend({
  resourceType: z.literal('InventoryItem'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: z.array(CodeableConceptSchema).optional(),
  name: z.array(InventoryItemNameSchema).optional(),
  responsibleOrganization: z.array(InventoryItemResponsibleOrganizationSchema).optional(),
  description: InventoryItemDescriptionSchema.optional(),
  inventoryStatus: z.array(CodeableConceptSchema).optional(),
  baseUnit: CodeableConceptSchema.optional(),
  netContent: QuantitySchema.optional(),
  association: z.array(InventoryItemAssociationSchema).optional(),
  characteristic: z.array(InventoryItemCharacteristicSchema).optional(),
  instance: InventoryItemInstanceSchema.optional(),
  productReference: ReferenceSchema.optional(),
})
export type InventoryItem = z.infer<typeof InventoryItemSchema>

/**
 * The required criteria to execute the test plan - e.g. preconditions, previous tests
 * The required criteria to execute the test plan - e.g. preconditions, previous tests...
 */
export const TestPlanDependencySchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  predecessor: ReferenceSchema.optional(),
})
export type TestPlanDependency = z.infer<typeof TestPlanDependencySchema>

/**
 * Required criteria to execute the test case
 * The required criteria to execute the test case - e.g. preconditions, previous tests.
 */
export const TestPlanTestCaseDependencySchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  predecessor: ReferenceSchema.optional(),
})
export type TestPlanTestCaseDependency = z.infer<typeof TestPlanTestCaseDependencySchema>

/**
 * The test cases in a structured language e.g. gherkin, Postman, or FHIR TestScript
 */
export const TestPlanTestCaseTestRunScriptSchema = BackboneElementSchema.extend({
  language: CodeableConceptSchema.optional(),
  sourceString: z.string().optional(),
  _sourceString: ElementSchema.optional(),
  sourceReference: ReferenceSchema.optional(),
})
export type TestPlanTestCaseTestRunScript = z.infer<typeof TestPlanTestCaseTestRunScriptSchema>

/**
 * The actual test to be executed
 */
export const TestPlanTestCaseTestRunSchema = BackboneElementSchema.extend({
  narrative: z.string().optional(),
  _narrative: ElementSchema.optional(),
  script: TestPlanTestCaseTestRunScriptSchema.optional(),
})
export type TestPlanTestCaseTestRun = z.infer<typeof TestPlanTestCaseTestRunSchema>

/**
 * The test data used in the test case
 */
export const TestPlanTestCaseTestDataSchema = BackboneElementSchema.extend({
  type: CodingSchema,
  content: ReferenceSchema.optional(),
  sourceString: z.string().optional(),
  _sourceString: ElementSchema.optional(),
  sourceReference: ReferenceSchema.optional(),
})
export type TestPlanTestCaseTestData = z.infer<typeof TestPlanTestCaseTestDataSchema>

/**
 * Test assertions or expectations
 * The test assertions - the expectations of test results from the execution of the test case.
 */
export const TestPlanTestCaseAssertionSchema = BackboneElementSchema.extend({
  type: z.array(CodeableConceptSchema).optional(),
  object: z.array(CodeableReferenceSchema).optional(),
  result: z.array(CodeableReferenceSchema).optional(),
})
export type TestPlanTestCaseAssertion = z.infer<typeof TestPlanTestCaseAssertionSchema>

/**
 * The test cases that constitute this plan
 * The individual test cases that are part of this plan, when they they are made explicit.
 */
export const TestPlanTestCaseSchema = BackboneElementSchema.extend({
  sequence: z.number().optional(),
  _sequence: ElementSchema.optional(),
  scope: z.array(ReferenceSchema).optional(),
  dependency: z.array(TestPlanTestCaseDependencySchema).optional(),
  testRun: z.array(TestPlanTestCaseTestRunSchema).optional(),
  testData: z.array(TestPlanTestCaseTestDataSchema).optional(),
  assertion: z.array(TestPlanTestCaseAssertionSchema).optional(),
})
export type TestPlanTestCase = z.infer<typeof TestPlanTestCaseSchema>

/**
 * A plan for executing testing on an artifact or specifications
 */
export const TestPlanSchema = DomainResourceSchema.extend({
  resourceType: z.literal('TestPlan'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  scope: z.array(ReferenceSchema).optional(),
  testTools: z.string().optional(),
  _testTools: ElementSchema.optional(),
  dependency: z.array(TestPlanDependencySchema).optional(),
  exitCriteria: z.string().optional(),
  _exitCriteria: ElementSchema.optional(),
  testCase: z.array(TestPlanTestCaseSchema).optional(),
})
export type TestPlan = z.infer<typeof TestPlanSchema>

/**
 * date Type: A date or partial date (e.g. just year or year + month). There is no UTC offset. The format is a union of the schema types gYear, gYearMonth and date.  Dates SHALL be valid dates.
 */
export const dateSchema = PrimitiveTypeSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type date = z.infer<typeof dateSchema>

/**
 * integer64 Type: A very large whole number
 */
export const integer64Schema = PrimitiveTypeSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
})
export type integer64 = z.infer<typeof integer64Schema>

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
  language: z.array(z.enum(['ar', 'bg', 'bg-BG', 'bn', 'cs', 'cs-CZ', 'bs', 'bs-BA', 'da', 'da-DK', 'de', 'de-AT', 'de-CH', 'de-DE', 'el', 'el-GR', 'en', 'en-AU', 'en-CA', 'en-GB', 'en-IN', 'en-NZ', 'en-SG', 'en-US', 'es', 'es-AR', 'es-ES', 'es-UY', 'et', 'et-EE', 'fi', 'fr', 'fr-BE', 'fr-CH', 'fr-FR', 'fi-FI', 'fr-CA', 'fy', 'fy-NL', 'hi', 'hr', 'hr-HR', 'is', 'is-IS', 'it', 'it-CH', 'it-IT', 'ja', 'ko', 'lt', 'lt-LT', 'lv', 'lv-LV', 'nl', 'nl-BE', 'nl-NL', 'no', 'no-NO', 'pa', 'pl', 'pl-PL', 'pt', 'pt-PT', 'pt-BR', 'ro', 'ro-RO', 'ru', 'ru-RU', 'sk', 'sk-SK', 'sl', 'sl-SI', 'sr', 'sr-RS', 'sv', 'sv-SE', 'te', 'zh', 'zh-CN', 'zh-HK', 'zh-SG', 'zh-TW'])).optional(),
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
  content: z.enum(['not-present', 'example', 'fragment', 'complete', 'supplement']),
  _content: ElementSchema.optional(),
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
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  kind: z.enum(['instance', 'capability', 'requirements']),
  _kind: ElementSchema.optional(),
  software: TerminologyCapabilitiesSoftwareSchema.optional(),
  implementation: TerminologyCapabilitiesImplementationSchema.optional(),
  lockedDate: z.boolean().optional(),
  _lockedDate: ElementSchema.optional(),
  codeSystem: z.array(TerminologyCapabilitiesCodeSystemSchema).optional(),
  expansion: TerminologyCapabilitiesExpansionSchema.optional(),
  codeSearch: z.enum(['in-compose', 'in-expansion', 'in-compose-or-expansion']).optional(),
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
  treatment: CodeableReference
}

export const ClinicalUseDefinitionContraindicationOtherTherapySchema: z.ZodType<ClinicalUseDefinitionContraindicationOtherTherapy> = z.lazy(() =>
  BackboneElementSchema.extend({
    relationshipType: CodeableConceptSchema,
    treatment: CodeableReferenceSchema,
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
  applicability: ExpressionSchema.optional(),
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
  applicability: ExpressionSchema.optional(),
  otherTherapy: z.lazy(() => z.array(ClinicalUseDefinitionContraindicationOtherTherapySchema)).optional(),
})
export type ClinicalUseDefinitionIndication = z.infer<typeof ClinicalUseDefinitionIndicationSchema>

/**
 * The specific medication, product, food etc. or laboratory test that interacts
 * The specific medication, product, food, substance etc. or laboratory test that interacts.
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
  library: z.array(z.string()).optional(),
  _library: ElementSchema.optional(),
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
  singleUse: z.boolean().optional(),
  _singleUse: ElementSchema.optional(),
  rejectionCriterion: z.array(CodeableConceptSchema).optional(),
  handling: z.array(SpecimenDefinitionTypeTestedHandlingSchema).optional(),
  testingDestination: z.array(CodeableConceptSchema).optional(),
})
export type SpecimenDefinitionTypeTested = z.infer<typeof SpecimenDefinitionTypeTestedSchema>

/**
 * A kind of specimen with associated set of requirements.
 */
export const SpecimenDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SpecimenDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: IdentifierSchema.optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  derivedFromCanonical: z.array(z.string()).optional(),
  _derivedFromCanonical: ElementSchema.optional(),
  derivedFromUri: z.array(z.string()).optional(),
  _derivedFromUri: ElementSchema.optional(),
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
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  typeCollected: CodeableConceptSchema.optional(),
  patientPreparation: z.array(CodeableConceptSchema).optional(),
  timeAspect: z.string().optional(),
  _timeAspect: ElementSchema.optional(),
  collection: z.array(CodeableConceptSchema).optional(),
  typeTested: z.array(SpecimenDefinitionTypeTestedSchema).optional(),
})
export type SpecimenDefinition = z.infer<typeof SpecimenDefinitionSchema>

/**
 * Location of the patient at this point in the encounter
 * The location of the patient at this point in the encounter, the multiple cardinality permits de-normalizing the levels of the location hierarchy, such as site/ward/room/bed.
 * Virtual encounters can be recorded in the Encounter by specifying a location reference to a location of type "kind" such as "client's home" and an encounter.class = "virtual".
 */
export const EncounterHistoryLocationSchema = BackboneElementSchema.extend({
  location: ReferenceSchema,
  form: CodeableConceptSchema.optional(),
})
export type EncounterHistoryLocation = z.infer<typeof EncounterHistoryLocationSchema>

/**
 * A record of significant events/milestones key data throughout the history of an Encounter
 */
export const EncounterHistorySchema = DomainResourceSchema.extend({
  resourceType: z.literal('EncounterHistory'),
  encounter: ReferenceSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['planned', 'in-progress', 'on-hold', 'discharged', 'completed', 'cancelled', 'discontinued', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  class: CodeableConceptSchema,
  type: z.array(CodeableConceptSchema).optional(),
  serviceType: z.array(CodeableReferenceSchema).optional(),
  subject: ReferenceSchema.optional(),
  subjectStatus: CodeableConceptSchema.optional(),
  actualPeriod: PeriodSchema.optional(),
  plannedStartDate: z.string().optional(),
  _plannedStartDate: ElementSchema.optional(),
  plannedEndDate: z.string().optional(),
  _plannedEndDate: ElementSchema.optional(),
  length: DurationSchema.optional(),
  location: z.array(EncounterHistoryLocationSchema).optional(),
})
export type EncounterHistory = z.infer<typeof EncounterHistorySchema>

/**
 * Additional properties of the mapping
 * A property defines a slot through which additional information can be provided about a map from source -> target.
 * Properties may be used to supply for example, mapping priority, provenance, presentation hints, flag as experimental, and additional documentation. Multiple occurrences of ConceptMap.group.element.target.property may occur for a ConceptMap.property where ConceptMap.group.element.target.property.code is the same and the values in ConceptMap.group.element.target.property.value differ.
 */
export const ConceptMapPropertySchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  uri: z.string().optional(),
  _uri: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  type: z.enum(['Coding', 'string', 'integer', 'boolean', 'dateTime', 'decimal', 'code']),
  _type: ElementSchema.optional(),
  system: z.string().optional(),
  _system: ElementSchema.optional(),
})
export type ConceptMapProperty = z.infer<typeof ConceptMapPropertySchema>

/**
 * Definition of an additional attribute to act as a data source or target
 * An additionalAttribute defines an additional data element found in the source or target data model where the data will come from or be mapped to. Some mappings are based on data in addition to the source data element, where codes in multiple fields are combined to a single field (or vice versa).
 * Additional attributes are used to define additional data elements where mapping data can be found. For an example, see [Specimen Type v2 -> SNOMED CT Mapping(conceptmap-example-specimen-type.html)
 */
export const ConceptMapAdditionalAttributeSchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
  uri: z.string().optional(),
  _uri: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  type: z.enum(['code', 'Coding', 'string', 'boolean', 'Quantity']),
  _type: ElementSchema.optional(),
})
export type ConceptMapAdditionalAttribute = z.infer<typeof ConceptMapAdditionalAttributeSchema>

/**
 * Property value for the source -> target mapping
 * A property value for this source -> target mapping.
 */
export const ConceptMapGroupElementTargetPropertySchema = BackboneElementSchema.extend({
  code: z.string(),
  _code: ElementSchema.optional(),
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
  valueCode: z.string().optional(),
  _valueCode: ElementSchema.optional(),
})
export type ConceptMapGroupElementTargetProperty = z.infer<typeof ConceptMapGroupElementTargetPropertySchema>

/**
 * Other properties required for this mapping
 * A set of additional dependencies for this mapping to hold. This mapping is only applicable if the specified data attribute can be resolved, and it has the specified value.
 */
export interface ConceptMapGroupElementTargetDependsOn extends BackboneElement {
  attribute: string
  _attribute?: Element | undefined
  valueCode?: string | undefined
  _valueCode?: Element | undefined
  valueCoding?: Coding | undefined
  valueString?: string | undefined
  _valueString?: Element | undefined
  valueBoolean?: boolean | undefined
  _valueBoolean?: Element | undefined
  valueQuantity?: Quantity | undefined
  valueSet?: string | undefined
  _valueSet?: Element | undefined
}

export const ConceptMapGroupElementTargetDependsOnSchema: z.ZodType<ConceptMapGroupElementTargetDependsOn> = z.lazy(() =>
  BackboneElementSchema.extend({
    attribute: z.string(),
      _attribute: ElementSchema.optional(),
    valueCode: z.string().optional(),
      _valueCode: ElementSchema.optional(),
    valueCoding: CodingSchema.optional(),
    valueString: z.string().optional(),
      _valueString: ElementSchema.optional(),
    valueBoolean: z.boolean().optional(),
      _valueBoolean: ElementSchema.optional(),
    valueQuantity: QuantitySchema.optional(),
    valueSet: z.string().optional(),
      _valueSet: ElementSchema.optional(),
  })
)

/**
 * Concept in target system for element
 * A concept from the target value set that this concept maps to.
 * Ideally there would only be one map, with an 'equivalent' mapping. But multiple maps are allowed for several narrower (i.e. source-is-broader-than-target) options, or to assert that other concepts are not related.
 */
export const ConceptMapGroupElementTargetSchema = BackboneElementSchema.extend({
  code: z.string().optional(),
  _code: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  valueSet: z.string().optional(),
  _valueSet: ElementSchema.optional(),
  relationship: z.enum(['related-to', 'equivalent', 'source-is-narrower-than-target', 'source-is-broader-than-target', 'not-related-to']),
  _relationship: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  property: z.array(ConceptMapGroupElementTargetPropertySchema).optional(),
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
  valueSet: z.string().optional(),
  _valueSet: ElementSchema.optional(),
  noMap: z.boolean().optional(),
  _noMap: ElementSchema.optional(),
  target: z.array(ConceptMapGroupElementTargetSchema).optional(),
})
export type ConceptMapGroupElement = z.infer<typeof ConceptMapGroupElementSchema>

/**
 * What to do when there is no mapping target for the source concept and ConceptMap.group.element.noMap is not true
 * What to do when there is no mapping to a target concept from the source concept and ConceptMap.group.element.noMap is not true. This provides the "default" to be applied when there is no target concept mapping specified or the expansion of ConceptMap.group.element.target.valueSet is empty.
 * The 'unmapped' element is ignored if a code is specified to have relationship = not-related-to or if ConceptMap.group.element.noMap = true.
 */
export const ConceptMapGroupUnmappedSchema = BackboneElementSchema.extend({
  mode: z.enum(['use-source-code', 'fixed', 'other-map']),
  _mode: ElementSchema.optional(),
  code: z.string().optional(),
  _code: ElementSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  valueSet: z.string().optional(),
  _valueSet: ElementSchema.optional(),
  relationship: z.enum(['related-to', 'equivalent', 'source-is-narrower-than-target', 'source-is-broader-than-target', 'not-related-to']).optional(),
  _relationship: ElementSchema.optional(),
  otherMap: z.string().optional(),
  _otherMap: ElementSchema.optional(),
})
export type ConceptMapGroupUnmapped = z.infer<typeof ConceptMapGroupUnmappedSchema>

/**
 * Same source and target systems
 * A group of mappings that all have the same source and target system.
 */
export const ConceptMapGroupSchema = BackboneElementSchema.extend({
  source: z.string().optional(),
  _source: ElementSchema.optional(),
  target: z.string().optional(),
  _target: ElementSchema.optional(),
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
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
  property: z.array(ConceptMapPropertySchema).optional(),
  additionalAttribute: z.array(ConceptMapAdditionalAttributeSchema).optional(),
  sourceScopeUri: z.string().optional(),
  _sourceScopeUri: ElementSchema.optional(),
  sourceScopeCanonical: z.string().optional(),
  _sourceScopeCanonical: ElementSchema.optional(),
  targetScopeUri: z.string().optional(),
  _targetScopeUri: ElementSchema.optional(),
  targetScopeCanonical: z.string().optional(),
  _targetScopeCanonical: ElementSchema.optional(),
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
 * Line items of this Invoice
 * Each line item represents one charge for goods and services rendered. Details such.ofType(date), code and amount are found in the referenced ChargeItem resource.
 */
export const InvoiceLineItemSchema = BackboneElementSchema.extend({
  sequence: z.number().optional(),
  _sequence: ElementSchema.optional(),
  servicedDate: z.string().optional(),
  _servicedDate: ElementSchema.optional(),
  servicedPeriod: PeriodSchema.optional(),
  chargeItemReference: ReferenceSchema.optional(),
  chargeItemCodeableConcept: CodeableConceptSchema.optional(),
  priceComponent: z.array(MonetaryComponentSchema).optional(),
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
  creation: z.string().optional(),
  _creation: ElementSchema.optional(),
  periodDate: z.string().optional(),
  _periodDate: ElementSchema.optional(),
  periodPeriod: PeriodSchema.optional(),
  participant: z.array(InvoiceParticipantSchema).optional(),
  issuer: ReferenceSchema.optional(),
  account: ReferenceSchema.optional(),
  lineItem: z.array(InvoiceLineItemSchema).optional(),
  totalPriceComponent: z.array(MonetaryComponentSchema).optional(),
  totalNet: MoneySchema.optional(),
  totalGross: MoneySchema.optional(),
  paymentTerms: z.string().optional(),
  _paymentTerms: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type Invoice = z.infer<typeof InvoiceSchema>

/**
 * url type: A URI that is a literal reference
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
 * Identifies the types of resource or data type elements to which the extension can be applied. For more guidance on using the 'context' element, see the [defining extensions page](defining-extensions.html#context).
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  keyword: z.array(CodingSchema).optional(),
  fhirVersion: z.enum(['0.01', '0.05', '0.06', '0.11', '0.0', '0.0.80', '0.0.81', '0.0.82', '0.4', '0.4.0', '0.5', '0.5.0', '1.0', '1.0.0', '1.0.1', '1.0.2', '1.1', '1.1.0', '1.4', '1.4.0', '1.6', '1.6.0', '1.8', '1.8.0', '3.0', '3.0.0', '3.0.1', '3.0.2', '3.3', '3.3.0', '3.5', '3.5.0', '4.0', '4.0.0', '4.0.1', '4.1', '4.1.0', '4.2', '4.2.0', '4.3', '4.3.0', '4.3.0-cibuild', '4.3.0-snapshot1', '4.4', '4.4.0', '4.5', '4.5.0', '4.6', '4.6.0', '5.0', '5.0.0', '5.0.0-cibuild', '5.0.0-snapshot1', '5.0.0-snapshot2', '5.0.0-ballot', '5.0.0-snapshot3', '5.0.0-draft-final']).optional(),
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
 * Observations particularly relevant to this condition
 */
export const ConditionDefinitionObservationSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema.optional(),
  code: CodeableConceptSchema.optional(),
})
export type ConditionDefinitionObservation = z.infer<typeof ConditionDefinitionObservationSchema>

/**
 * Medications particularly relevant for this condition
 */
export const ConditionDefinitionMedicationSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema.optional(),
  code: CodeableConceptSchema.optional(),
})
export type ConditionDefinitionMedication = z.infer<typeof ConditionDefinitionMedicationSchema>

/**
 * Observation that suggets this condition
 * An observation that suggests that this condition applies.
 */
export const ConditionDefinitionPreconditionSchema = BackboneElementSchema.extend({
  type: z.enum(['sensitive', 'specific']),
  _type: ElementSchema.optional(),
  code: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
})
export type ConditionDefinitionPrecondition = z.infer<typeof ConditionDefinitionPreconditionSchema>

/**
 * Questionnaire for this condition
 */
export const ConditionDefinitionQuestionnaireSchema = BackboneElementSchema.extend({
  purpose: z.enum(['preadmit', 'diff-diagnosis', 'outcome']),
  _purpose: ElementSchema.optional(),
  reference: ReferenceSchema,
})
export type ConditionDefinitionQuestionnaire = z.infer<typeof ConditionDefinitionQuestionnaireSchema>

/**
 * Plan that is appropriate
 */
export const ConditionDefinitionPlanSchema = BackboneElementSchema.extend({
  role: CodeableConceptSchema.optional(),
  reference: ReferenceSchema,
})
export type ConditionDefinitionPlan = z.infer<typeof ConditionDefinitionPlanSchema>

/**
 * A definition of a condition and information relevant to managing it.
 */
export const ConditionDefinitionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ConditionDefinition'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  publisher: z.string().optional(),
  _publisher: ElementSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema,
  severity: CodeableConceptSchema.optional(),
  bodySite: CodeableConceptSchema.optional(),
  stage: CodeableConceptSchema.optional(),
  hasSeverity: z.boolean().optional(),
  _hasSeverity: ElementSchema.optional(),
  hasBodySite: z.boolean().optional(),
  _hasBodySite: ElementSchema.optional(),
  hasStage: z.boolean().optional(),
  _hasStage: ElementSchema.optional(),
  definition: z.array(z.string()).optional(),
  _definition: ElementSchema.optional(),
  observation: z.array(ConditionDefinitionObservationSchema).optional(),
  medication: z.array(ConditionDefinitionMedicationSchema).optional(),
  precondition: z.array(ConditionDefinitionPreconditionSchema).optional(),
  team: z.array(ReferenceSchema).optional(),
  questionnaire: z.array(ConditionDefinitionQuestionnaireSchema).optional(),
  plan: z.array(ConditionDefinitionPlanSchema).optional(),
})
export type ConditionDefinition = z.infer<typeof ConditionDefinitionSchema>

/**
 * Message payload
 * Text, attachment(s), or resource(s) to be communicated to the recipient.
 */
export const CommunicationRequestPayloadSchema = BackboneElementSchema.extend({
  contentAttachment: AttachmentSchema.optional(),
  contentReference: ReferenceSchema.optional(),
  contentCodeableConcept: CodeableConceptSchema.optional(),
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
  intent: z.enum(['proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
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
  informationProvider: z.array(ReferenceSchema).optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
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
  reporter: ReferenceSchema.optional(),
  payment: ReferenceSchema.optional(),
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
  reason: z.array(CodeableReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  evaluationMessage: ReferenceSchema.optional(),
  outputParameters: ReferenceSchema.optional(),
  result: z.array(ReferenceSchema).optional(),
  dataRequirement: z.array(DataRequirementSchema).optional(),
})
export type GuidanceResponse = z.infer<typeof GuidanceResponseSchema>

/**
 * Common Interface declaration for conformance and knowledge artifact resources.
 */
export const CanonicalResourceSchema = DomainResourceSchema.extend({
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
})
export type CanonicalResource = z.infer<typeof CanonicalResourceSchema>

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
  note: z.array(AnnotationSchema).optional(),
})
export type DetectedIssueMitigation = z.infer<typeof DetectedIssueMitigationSchema>

/**
 * Indicates an actual or potential clinical issue with or between one or more active or proposed clinical actions for a patient; e.g. Drug-drug interaction, Ineffective treatment frequency, Procedure-condition conflict, gaps in care, etc.
 */
export const DetectedIssueSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DetectedIssue'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['preliminary', 'final', 'entered-in-error', 'mitigated']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema.optional(),
  severity: z.enum(['high', 'moderate', 'low']).optional(),
  _severity: ElementSchema.optional(),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
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
 * Defines the characteristic using type and value
 * Defines the characteristic using both a type and value[x] elements.
 */
export const EvidenceVariableCharacteristicDefinitionByTypeAndValueSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  method: z.array(CodeableConceptSchema).optional(),
  device: ReferenceSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  valueId: z.string().optional(),
  _valueId: ElementSchema.optional(),
  offset: CodeableConceptSchema.optional(),
})
export type EvidenceVariableCharacteristicDefinitionByTypeAndValue = z.infer<typeof EvidenceVariableCharacteristicDefinitionByTypeAndValueSchema>

/**
 * Used to specify how two or more characteristics are combined
 * Defines the characteristic as a combination of two or more characteristics.
 */
export const EvidenceVariableCharacteristicDefinitionByCombinationSchema = BackboneElementSchema.extend({
  code: z.enum(['all-of', 'any-of', 'at-least', 'at-most', 'statistical', 'net-effect', 'dataset']),
  _code: ElementSchema.optional(),
  threshold: z.number().optional(),
  _threshold: ElementSchema.optional(),
  characteristic: z.lazy(() => z.array(EvidenceVariableCharacteristicSchema)),
})
export type EvidenceVariableCharacteristicDefinitionByCombination = z.infer<typeof EvidenceVariableCharacteristicDefinitionByCombinationSchema>

/**
 * Timing in which the characteristic is determined
 */
export const EvidenceVariableCharacteristicTimeFromEventSchema = BackboneElementSchema.extend({
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  eventCodeableConcept: CodeableConceptSchema.optional(),
  eventReference: ReferenceSchema.optional(),
  eventDateTime: z.string().optional(),
  _eventDateTime: ElementSchema.optional(),
  eventId: z.string().optional(),
  _eventId: ElementSchema.optional(),
  quantity: QuantitySchema.optional(),
  range: RangeSchema.optional(),
})
export type EvidenceVariableCharacteristicTimeFromEvent = z.infer<typeof EvidenceVariableCharacteristicTimeFromEventSchema>

/**
 * A defining factor of the EvidenceVariable
 * A defining factor of the EvidenceVariable. Multiple characteristics are applied with "and" semantics.
 * Characteristics can be defined flexibly to accommodate different use cases for membership criteria, ranging from simple codes, all the way to using an expression language to express the criteria.
 */
export interface EvidenceVariableCharacteristic extends BackboneElement {
  linkId?: string | undefined
  _linkId?: Element | undefined
  description?: string | undefined
  _description?: Element | undefined
  note?: Annotation[] | undefined
  exclude?: boolean | undefined
  _exclude?: Element | undefined
  definitionReference?: Reference | undefined
  definitionCanonical?: string | undefined
  _definitionCanonical?: Element | undefined
  definitionCodeableConcept?: CodeableConcept | undefined
  definitionExpression?: Expression | undefined
  definitionId?: string | undefined
  _definitionId?: Element | undefined
  definitionByTypeAndValue?: EvidenceVariableCharacteristicDefinitionByTypeAndValue | undefined
  definitionByCombination?: EvidenceVariableCharacteristicDefinitionByCombination | undefined
  instancesQuantity?: Quantity | undefined
  instancesRange?: Range | undefined
  durationQuantity?: Quantity | undefined
  durationRange?: Range | undefined
  timeFromEvent?: EvidenceVariableCharacteristicTimeFromEvent[] | undefined
}

export const EvidenceVariableCharacteristicSchema: z.ZodType<EvidenceVariableCharacteristic> = z.lazy(() =>
  BackboneElementSchema.extend({
    linkId: z.string().optional(),
      _linkId: ElementSchema.optional(),
    description: z.string().optional(),
      _description: ElementSchema.optional(),
    note: z.array(AnnotationSchema).optional(),
    exclude: z.boolean().optional(),
      _exclude: ElementSchema.optional(),
    definitionReference: ReferenceSchema.optional(),
    definitionCanonical: z.string().optional(),
      _definitionCanonical: ElementSchema.optional(),
    definitionCodeableConcept: CodeableConceptSchema.optional(),
    definitionExpression: ExpressionSchema.optional(),
    definitionId: z.string().optional(),
      _definitionId: ElementSchema.optional(),
    definitionByTypeAndValue: EvidenceVariableCharacteristicDefinitionByTypeAndValueSchema.optional(),
    definitionByCombination: EvidenceVariableCharacteristicDefinitionByCombinationSchema.optional(),
    instancesQuantity: QuantitySchema.optional(),
    instancesRange: RangeSchema.optional(),
    durationQuantity: QuantitySchema.optional(),
    durationRange: RangeSchema.optional(),
    timeFromEvent: z.array(EvidenceVariableCharacteristicTimeFromEventSchema).optional(),
  })
)

/**
 * A grouping for ordinal or polychotomous variables
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  shortTitle: z.string().optional(),
  _shortTitle: ElementSchema.optional(),
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
  note: z.array(AnnotationSchema).optional(),
  useContext: z.array(UsageContextSchema).optional(),
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  approvalDate: z.string().optional(),
  _approvalDate: ElementSchema.optional(),
  lastReviewDate: z.string().optional(),
  _lastReviewDate: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  author: z.array(ContactDetailSchema).optional(),
  editor: z.array(ContactDetailSchema).optional(),
  reviewer: z.array(ContactDetailSchema).optional(),
  endorser: z.array(ContactDetailSchema).optional(),
  relatedArtifact: z.array(RelatedArtifactSchema).optional(),
  actual: z.boolean().optional(),
  _actual: ElementSchema.optional(),
  characteristic: z.array(EvidenceVariableCharacteristicSchema).optional(),
  handling: z.enum(['continuous', 'dichotomous', 'ordinal', 'polychotomous']).optional(),
  _handling: ElementSchema.optional(),
  category: z.array(EvidenceVariableCategorySchema).optional(),
})
export type EvidenceVariable = z.infer<typeof EvidenceVariableSchema>

/**
 * instant Type: An instant in time - known at least to the second
 */
export const instantSchema = PrimitiveTypeSchema.extend({
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
  relation: ('about'|'acl'|'alternate'|'amphtml'|'appendix'|'apple-touch-icon'|'apple-touch-startup-image'|'archives'|'author'|'blocked-by'|'bookmark'|'canonical'|'chapter'|'cite-as'|'collection'|'contents'|'convertedFrom'|'copyright'|'create-form'|'current'|'describedby'|'describes'|'disclosure'|'dns-prefetch'|'duplicate'|'edit'|'edit-form'|'edit-media'|'enclosure'|'external'|'first'|'glossary'|'help'|'hosts'|'hub'|'icon'|'index'|'intervalAfter'|'intervalBefore'|'intervalContains'|'intervalDisjoint'|'intervalDuring'|'intervalEquals'|'intervalFinishedBy'|'intervalFinishes'|'intervalIn'|'intervalMeets'|'intervalMetBy'|'intervalOverlappedBy'|'intervalOverlaps'|'intervalStartedBy'|'intervalStarts'|'item'|'last'|'latest-version'|'license'|'linkset'|'lrdd'|'manifest'|'mask-icon'|'media-feed'|'memento'|'micropub'|'modulepreload'|'monitor'|'monitor-group'|'next'|'next-archive'|'nofollow'|'noopener'|'noreferrer'|'opener'|'openid2.local_id'|'openid2.provider'|'original'|'P3Pv1'|'payment'|'pingback'|'preconnect'|'predecessor-version'|'prefetch'|'preload'|'prerender'|'prev'|'preview'|'previous'|'prev-archive'|'privacy-policy'|'profile'|'publication'|'related'|'restconf'|'replies'|'ruleinput'|'search'|'section'|'self'|'service'|'service-desc'|'service-doc'|'service-meta'|'sponsored'|'start'|'status'|'stylesheet'|'subsection'|'successor-version'|'sunset'|'tag'|'terms-of-service'|'timegate'|'timemap'|'type'|'ugc'|'up'|'version-history'|'via'|'webmention'|'working-copy'|'working-copy-of')
  _relation?: Element | undefined
  url: string
  _url?: Element | undefined
}

export const BundleLinkSchema: z.ZodType<BundleLink> = z.lazy(() =>
  BackboneElementSchema.extend({
    relation: z.enum(['about', 'acl', 'alternate', 'amphtml', 'appendix', 'apple-touch-icon', 'apple-touch-startup-image', 'archives', 'author', 'blocked-by', 'bookmark', 'canonical', 'chapter', 'cite-as', 'collection', 'contents', 'convertedFrom', 'copyright', 'create-form', 'current', 'describedby', 'describes', 'disclosure', 'dns-prefetch', 'duplicate', 'edit', 'edit-form', 'edit-media', 'enclosure', 'external', 'first', 'glossary', 'help', 'hosts', 'hub', 'icon', 'index', 'intervalAfter', 'intervalBefore', 'intervalContains', 'intervalDisjoint', 'intervalDuring', 'intervalEquals', 'intervalFinishedBy', 'intervalFinishes', 'intervalIn', 'intervalMeets', 'intervalMetBy', 'intervalOverlappedBy', 'intervalOverlaps', 'intervalStartedBy', 'intervalStarts', 'item', 'last', 'latest-version', 'license', 'linkset', 'lrdd', 'manifest', 'mask-icon', 'media-feed', 'memento', 'micropub', 'modulepreload', 'monitor', 'monitor-group', 'next', 'next-archive', 'nofollow', 'noopener', 'noreferrer', 'opener', 'openid2.local_id', 'openid2.provider', 'original', 'P3Pv1', 'payment', 'pingback', 'preconnect', 'predecessor-version', 'prefetch', 'preload', 'prerender', 'prev', 'preview', 'previous', 'prev-archive', 'privacy-policy', 'profile', 'publication', 'related', 'restconf', 'replies', 'ruleinput', 'search', 'section', 'self', 'service', 'service-desc', 'service-doc', 'service-meta', 'sponsored', 'start', 'status', 'stylesheet', 'subsection', 'successor-version', 'sunset', 'tag', 'terms-of-service', 'timegate', 'timemap', 'type', 'ugc', 'up', 'version-history', 'via', 'webmention', 'working-copy', 'working-copy-of']),
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
  type: z.enum(['document', 'message', 'transaction', 'transaction-response', 'batch', 'batch-response', 'history', 'searchset', 'collection', 'subscription-notification']),
  _type: ElementSchema.optional(),
  timestamp: z.string().optional(),
  _timestamp: ElementSchema.optional(),
  total: z.number().optional(),
  _total: ElementSchema.optional(),
  link: z.array(BundleLinkSchema).optional(),
  entry: z.array(BundleEntrySchema).optional(),
  signature: SignatureSchema.optional(),
  issues: ResourceSchema.optional(),
})
export type Bundle = z.infer<typeof BundleSchema>

/**
 * Resource(s) that are the subject of the event
 * Identifies the resource (or resources) that are being addressed by the event.  For example, the Encounter for an admit message or two Account records for a merge.
 */
export const MessageDefinitionFocusSchema = BackboneElementSchema.extend({
  code: z.enum(['Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'Binary', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'Bundle', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Parameters', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription']),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
  graph: z.string().optional(),
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
  reason: z.string().optional(),
  _reason: ElementSchema.optional(),
})
export type ImplementationGuideDependsOn = z.infer<typeof ImplementationGuideDependsOnSchema>

/**
 * Profiles that apply globally
 * A set of profiles that all resources covered by this implementation guide must conform to.
 * See [Default Profiles](implementationguide.html#default) for a discussion of which resources are 'covered' by an implementation guide.
 */
export const ImplementationGuideGlobalSchema = BackboneElementSchema.extend({
  type: z.enum(['Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'Binary', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'Bundle', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Parameters', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription']),
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
  fhirVersion: z.array(z.enum(['0.01', '0.05', '0.06', '0.11', '0.0', '0.0.80', '0.0.81', '0.0.82', '0.4', '0.4.0', '0.5', '0.5.0', '1.0', '1.0.0', '1.0.1', '1.0.2', '1.1', '1.1.0', '1.4', '1.4.0', '1.6', '1.6.0', '1.8', '1.8.0', '3.0', '3.0.0', '3.0.1', '3.0.2', '3.3', '3.3.0', '3.5', '3.5.0', '4.0', '4.0.0', '4.0.1', '4.1', '4.1.0', '4.2', '4.2.0', '4.3', '4.3.0', '4.3.0-cibuild', '4.3.0-snapshot1', '4.4', '4.4.0', '4.5', '4.5.0', '4.6', '4.6.0', '5.0', '5.0.0', '5.0.0-cibuild', '5.0.0-snapshot1', '5.0.0-snapshot2', '5.0.0-ballot', '5.0.0-snapshot3', '5.0.0-draft-final'])).optional(),
  _fhirVersion: ElementSchema.optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  isExample: z.boolean().optional(),
  _isExample: ElementSchema.optional(),
  profile: z.array(z.string()).optional(),
  _profile: ElementSchema.optional(),
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
  sourceUrl?: string | undefined
  _sourceUrl?: Element | undefined
  sourceString?: string | undefined
  _sourceString?: Element | undefined
  sourceMarkdown?: string | undefined
  _sourceMarkdown?: Element | undefined
  name: string
  _name?: Element | undefined
  title: string
  _title?: Element | undefined
  generation: ('html'|'markdown'|'xml'|'generated')
  _generation?: Element | undefined
  page?: ImplementationGuideDefinitionPage[] | undefined
}

export const ImplementationGuideDefinitionPageSchema: z.ZodType<ImplementationGuideDefinitionPage> = z.lazy(() =>
  BackboneElementSchema.extend({
    sourceUrl: z.string().optional(),
      _sourceUrl: ElementSchema.optional(),
    sourceString: z.string().optional(),
      _sourceString: ElementSchema.optional(),
    sourceMarkdown: z.string().optional(),
      _sourceMarkdown: ElementSchema.optional(),
    name: z.string(),
      _name: ElementSchema.optional(),
    title: z.string(),
      _title: ElementSchema.optional(),
    generation: z.enum(['html', 'markdown', 'xml', 'generated']),
      _generation: ElementSchema.optional(),
    page: z.lazy(() => z.array(ImplementationGuideDefinitionPageSchema)).optional(),
  })
)

/**
 * Defines how IG is built by tools
 * A set of parameters that defines how the implementation guide is built. The parameters are defined by the relevant tools that build the implementation guides.
 * see [confluence](https://confluence.hl7.org/display/FHIR/Implementation+Guide+Parameters) for the parameters defined by the HL7 IG publisher.
 */
export const ImplementationGuideDefinitionParameterSchema = BackboneElementSchema.extend({
  code: CodingSchema,
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
  resource: z.array(ImplementationGuideDefinitionResourceSchema).optional(),
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
  isExample: z.boolean().optional(),
  _isExample: ElementSchema.optional(),
  profile: z.array(z.string()).optional(),
  _profile: ElementSchema.optional(),
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
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  packageId: z.string(),
  _packageId: ElementSchema.optional(),
  license: z.enum(['not-open-source', '0BSD', 'AAL', 'Abstyles', 'Adobe-2006', 'Adobe-Glyph', 'ADSL', 'AFL-1.1', 'AFL-1.2', 'AFL-2.0', 'AFL-2.1', 'AFL-3.0', 'Afmparse', 'AGPL-1.0-only', 'AGPL-1.0-or-later', 'AGPL-3.0-only', 'AGPL-3.0-or-later', 'Aladdin', 'AMDPLPA', 'AML', 'AMPAS', 'ANTLR-PD', 'Apache-1.0', 'Apache-1.1', 'Apache-2.0', 'APAFML', 'APL-1.0', 'APSL-1.0', 'APSL-1.1', 'APSL-1.2', 'APSL-2.0', 'Artistic-1.0-cl8', 'Artistic-1.0-Perl', 'Artistic-1.0', 'Artistic-2.0', 'Bahyph', 'Barr', 'Beerware', 'BitTorrent-1.0', 'BitTorrent-1.1', 'Borceux', 'BSD-1-Clause', 'BSD-2-Clause-FreeBSD', 'BSD-2-Clause-NetBSD', 'BSD-2-Clause-Patent', 'BSD-2-Clause', 'BSD-3-Clause-Attribution', 'BSD-3-Clause-Clear', 'BSD-3-Clause-LBNL', 'BSD-3-Clause-No-Nuclear-License-2014', 'BSD-3-Clause-No-Nuclear-License', 'BSD-3-Clause-No-Nuclear-Warranty', 'BSD-3-Clause', 'BSD-4-Clause-UC', 'BSD-4-Clause', 'BSD-Protection', 'BSD-Source-Code', 'BSL-1.0', 'bzip2-1.0.5', 'bzip2-1.0.6', 'Caldera', 'CATOSL-1.1', 'CC-BY-1.0', 'CC-BY-2.0', 'CC-BY-2.5', 'CC-BY-3.0', 'CC-BY-4.0', 'CC-BY-NC-1.0', 'CC-BY-NC-2.0', 'CC-BY-NC-2.5', 'CC-BY-NC-3.0', 'CC-BY-NC-4.0', 'CC-BY-NC-ND-1.0', 'CC-BY-NC-ND-2.0', 'CC-BY-NC-ND-2.5', 'CC-BY-NC-ND-3.0', 'CC-BY-NC-ND-4.0', 'CC-BY-NC-SA-1.0', 'CC-BY-NC-SA-2.0', 'CC-BY-NC-SA-2.5', 'CC-BY-NC-SA-3.0', 'CC-BY-NC-SA-4.0', 'CC-BY-ND-1.0', 'CC-BY-ND-2.0', 'CC-BY-ND-2.5', 'CC-BY-ND-3.0', 'CC-BY-ND-4.0', 'CC-BY-SA-1.0', 'CC-BY-SA-2.0', 'CC-BY-SA-2.5', 'CC-BY-SA-3.0', 'CC-BY-SA-4.0', 'CC0-1.0', 'CDDL-1.0', 'CDDL-1.1', 'CDLA-Permissive-1.0', 'CDLA-Sharing-1.0', 'CECILL-1.0', 'CECILL-1.1', 'CECILL-2.0', 'CECILL-2.1', 'CECILL-B', 'CECILL-C', 'ClArtistic', 'CNRI-Jython', 'CNRI-Python-GPL-Compatible', 'CNRI-Python', 'Condor-1.1', 'CPAL-1.0', 'CPL-1.0', 'CPOL-1.02', 'Crossword', 'CrystalStacker', 'CUA-OPL-1.0', 'Cube', 'curl', 'D-FSL-1.0', 'diffmark', 'DOC', 'Dotseqn', 'DSDP', 'dvipdfm', 'ECL-1.0', 'ECL-2.0', 'EFL-1.0', 'EFL-2.0', 'eGenix', 'Entessa', 'EPL-1.0', 'EPL-2.0', 'ErlPL-1.1', 'EUDatagrid', 'EUPL-1.0', 'EUPL-1.1', 'EUPL-1.2', 'Eurosym', 'Fair', 'Frameworx-1.0', 'FreeImage', 'FSFAP', 'FSFUL', 'FSFULLR', 'FTL', 'GFDL-1.1-only', 'GFDL-1.1-or-later', 'GFDL-1.2-only', 'GFDL-1.2-or-later', 'GFDL-1.3-only', 'GFDL-1.3-or-later', 'Giftware', 'GL2PS', 'Glide', 'Glulxe', 'gnuplot', 'GPL-1.0-only', 'GPL-1.0-or-later', 'GPL-2.0-only', 'GPL-2.0-or-later', 'GPL-3.0-only', 'GPL-3.0-or-later', 'gSOAP-1.3b', 'HaskellReport', 'HPND', 'IBM-pibs', 'ICU', 'IJG', 'ImageMagick', 'iMatix', 'Imlib2', 'Info-ZIP', 'Intel-ACPI', 'Intel', 'Interbase-1.0', 'IPA', 'IPL-1.0', 'ISC', 'JasPer-2.0', 'JSON', 'LAL-1.2', 'LAL-1.3', 'Latex2e', 'Leptonica', 'LGPL-2.0-only', 'LGPL-2.0-or-later', 'LGPL-2.1-only', 'LGPL-2.1-or-later', 'LGPL-3.0-only', 'LGPL-3.0-or-later', 'LGPLLR', 'Libpng', 'libtiff', 'LiLiQ-P-1.1', 'LiLiQ-R-1.1', 'LiLiQ-Rplus-1.1', 'Linux-OpenIB', 'LPL-1.0', 'LPL-1.02', 'LPPL-1.0', 'LPPL-1.1', 'LPPL-1.2', 'LPPL-1.3a', 'LPPL-1.3c', 'MakeIndex', 'MirOS', 'MIT-0', 'MIT-advertising', 'MIT-CMU', 'MIT-enna', 'MIT-feh', 'MIT', 'MITNFA', 'Motosoto', 'mpich2', 'MPL-1.0', 'MPL-1.1', 'MPL-2.0-no-copyleft-exception', 'MPL-2.0', 'MS-PL', 'MS-RL', 'MTLL', 'Multics', 'Mup', 'NASA-1.3', 'Naumen', 'NBPL-1.0', 'NCSA', 'Net-SNMP', 'NetCDF', 'Newsletr', 'NGPL', 'NLOD-1.0', 'NLPL', 'Nokia', 'NOSL', 'Noweb', 'NPL-1.0', 'NPL-1.1', 'NPOSL-3.0', 'NRL', 'NTP', 'OCCT-PL', 'OCLC-2.0', 'ODbL-1.0', 'OFL-1.0', 'OFL-1.1', 'OGTSL', 'OLDAP-1.1', 'OLDAP-1.2', 'OLDAP-1.3', 'OLDAP-1.4', 'OLDAP-2.0.1', 'OLDAP-2.0', 'OLDAP-2.1', 'OLDAP-2.2.1', 'OLDAP-2.2.2', 'OLDAP-2.2', 'OLDAP-2.3', 'OLDAP-2.4', 'OLDAP-2.5', 'OLDAP-2.6', 'OLDAP-2.7', 'OLDAP-2.8', 'OML', 'OpenSSL', 'OPL-1.0', 'OSET-PL-2.1', 'OSL-1.0', 'OSL-1.1', 'OSL-2.0', 'OSL-2.1', 'OSL-3.0', 'PDDL-1.0', 'PHP-3.0', 'PHP-3.01', 'Plexus', 'PostgreSQL', 'psfrag', 'psutils', 'Python-2.0', 'Qhull', 'QPL-1.0', 'Rdisc', 'RHeCos-1.1', 'RPL-1.1', 'RPL-1.5', 'RPSL-1.0', 'RSA-MD', 'RSCPL', 'Ruby', 'SAX-PD', 'Saxpath', 'SCEA', 'Sendmail', 'SGI-B-1.0', 'SGI-B-1.1', 'SGI-B-2.0', 'SimPL-2.0', 'SISSL-1.2', 'SISSL', 'Sleepycat', 'SMLNJ', 'SMPPL', 'SNIA', 'Spencer-86', 'Spencer-94', 'Spencer-99', 'SPL-1.0', 'SugarCRM-1.1.3', 'SWL', 'TCL', 'TCP-wrappers', 'TMate', 'TORQUE-1.1', 'TOSL', 'Unicode-DFS-2015', 'Unicode-DFS-2016', 'Unicode-TOU', 'Unlicense', 'UPL-1.0', 'Vim', 'VOSTROM', 'VSL-1.0', 'W3C-19980720', 'W3C-20150513', 'W3C', 'Watcom-1.0', 'Wsuipa', 'WTFPL', 'X11', 'Xerox', 'XFree86-1.1', 'xinetd', 'Xnet', 'xpp', 'XSkat', 'YPL-1.0', 'YPL-1.1', 'Zed', 'Zend-2.0', 'Zimbra-1.3', 'Zimbra-1.4', 'zlib-acknowledgement', 'Zlib', 'ZPL-1.1', 'ZPL-2.0', 'ZPL-2.1']).optional(),
  _license: ElementSchema.optional(),
  fhirVersion: z.array(z.enum(['0.01', '0.05', '0.06', '0.11', '0.0', '0.0.80', '0.0.81', '0.0.82', '0.4', '0.4.0', '0.5', '0.5.0', '1.0', '1.0.0', '1.0.1', '1.0.2', '1.1', '1.1.0', '1.4', '1.4.0', '1.6', '1.6.0', '1.8', '1.8.0', '3.0', '3.0.0', '3.0.1', '3.0.2', '3.3', '3.3.0', '3.5', '3.5.0', '4.0', '4.0.0', '4.0.1', '4.1', '4.1.0', '4.2', '4.2.0', '4.3', '4.3.0', '4.3.0-cibuild', '4.3.0-snapshot1', '4.4', '4.4.0', '4.5', '4.5.0', '4.6', '4.6.0', '5.0', '5.0.0', '5.0.0-cibuild', '5.0.0-snapshot1', '5.0.0-snapshot2', '5.0.0-ballot', '5.0.0-snapshot3', '5.0.0-draft-final'])),
  _fhirVersion: ElementSchema.optional(),
  dependsOn: z.array(ImplementationGuideDependsOnSchema).optional(),
  global: z.array(ImplementationGuideGlobalSchema).optional(),
  definition: ImplementationGuideDefinitionSchema.optional(),
  manifest: ImplementationGuideManifestSchema.optional(),
})
export type ImplementationGuide = z.infer<typeof ImplementationGuideSchema>

/**
 * Scheduling information for oral diets
 * Schedule information for an oral diet.
 */
export const NutritionOrderOralDietScheduleSchema = BackboneElementSchema.extend({
  timing: z.array(TimingSchema).optional(),
  asNeeded: z.boolean().optional(),
  _asNeeded: ElementSchema.optional(),
  asNeededFor: CodeableConceptSchema.optional(),
})
export type NutritionOrderOralDietSchedule = z.infer<typeof NutritionOrderOralDietScheduleSchema>

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
  schedule: NutritionOrderOralDietScheduleSchema.optional(),
  nutrient: z.array(NutritionOrderOralDietNutrientSchema).optional(),
  texture: z.array(NutritionOrderOralDietTextureSchema).optional(),
  fluidConsistencyType: z.array(CodeableConceptSchema).optional(),
  instruction: z.string().optional(),
  _instruction: ElementSchema.optional(),
})
export type NutritionOrderOralDiet = z.infer<typeof NutritionOrderOralDietSchema>

/**
 * Scheduling information for supplements
 * Schedule information for a supplement.
 */
export const NutritionOrderSupplementScheduleSchema = BackboneElementSchema.extend({
  timing: z.array(TimingSchema).optional(),
  asNeeded: z.boolean().optional(),
  _asNeeded: ElementSchema.optional(),
  asNeededFor: CodeableConceptSchema.optional(),
})
export type NutritionOrderSupplementSchedule = z.infer<typeof NutritionOrderSupplementScheduleSchema>

/**
 * Supplement components
 * Oral nutritional products given in order to add further nutritional value to the patient's diet.
 */
export const NutritionOrderSupplementSchema = BackboneElementSchema.extend({
  type: CodeableReferenceSchema.optional(),
  productName: z.string().optional(),
  _productName: ElementSchema.optional(),
  schedule: NutritionOrderSupplementScheduleSchema.optional(),
  quantity: QuantitySchema.optional(),
  instruction: z.string().optional(),
  _instruction: ElementSchema.optional(),
})
export type NutritionOrderSupplement = z.infer<typeof NutritionOrderSupplementSchema>

/**
 * Components to add to the feeding
 * Indicates modular components to be provided in addition or mixed with the base formula.
 */
export const NutritionOrderEnteralFormulaAdditiveSchema = BackboneElementSchema.extend({
  type: CodeableReferenceSchema.optional(),
  productName: z.string().optional(),
  _productName: ElementSchema.optional(),
  quantity: QuantitySchema.optional(),
})
export type NutritionOrderEnteralFormulaAdditive = z.infer<typeof NutritionOrderEnteralFormulaAdditiveSchema>

/**
 * Scheduling information for enteral formula products
 * Schedule information for an enteral formula.
 */
export const NutritionOrderEnteralFormulaAdministrationScheduleSchema = BackboneElementSchema.extend({
  timing: z.array(TimingSchema).optional(),
  asNeeded: z.boolean().optional(),
  _asNeeded: ElementSchema.optional(),
  asNeededFor: CodeableConceptSchema.optional(),
})
export type NutritionOrderEnteralFormulaAdministrationSchedule = z.infer<typeof NutritionOrderEnteralFormulaAdministrationScheduleSchema>

/**
 * Formula feeding instruction as structured data
 * Formula administration instructions as structured data.  This repeating structure allows for changing the administration rate or volume over time for both bolus and continuous feeding.  An example of this would be an instruction to increase the rate of continuous feeding every 2 hours.
 * See implementation notes below for further discussion on how to order continuous vs bolus enteral feeding using this resource.
 */
export const NutritionOrderEnteralFormulaAdministrationSchema = BackboneElementSchema.extend({
  schedule: NutritionOrderEnteralFormulaAdministrationScheduleSchema.optional(),
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
  baseFormulaType: CodeableReferenceSchema.optional(),
  baseFormulaProductName: z.string().optional(),
  _baseFormulaProductName: ElementSchema.optional(),
  deliveryDevice: z.array(CodeableReferenceSchema).optional(),
  additive: z.array(NutritionOrderEnteralFormulaAdditiveSchema).optional(),
  caloricDensity: QuantitySchema.optional(),
  routeOfAdministration: CodeableConceptSchema.optional(),
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
  basedOn: z.array(ReferenceSchema).optional(),
  groupIdentifier: IdentifierSchema.optional(),
  status: z.enum(['draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  dateTime: z.string(),
  _dateTime: ElementSchema.optional(),
  orderer: ReferenceSchema.optional(),
  performer: z.array(CodeableReferenceSchema).optional(),
  allergyIntolerance: z.array(ReferenceSchema).optional(),
  foodPreferenceModifier: z.array(CodeableConceptSchema).optional(),
  excludeFoodModifier: z.array(CodeableConceptSchema).optional(),
  outsideFoodAllowed: z.boolean().optional(),
  _outsideFoodAllowed: ElementSchema.optional(),
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
 * Event information
 * Information code for an event with a corresponding date or period.
 */
export const CoverageEligibilityRequestEventSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  whenDateTime: z.string().optional(),
  _whenDateTime: ElementSchema.optional(),
  whenPeriod: PeriodSchema.optional(),
})
export type CoverageEligibilityRequestEvent = z.infer<typeof CoverageEligibilityRequestEventSchema>

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
  event: z.array(CoverageEligibilityRequestEventSchema).optional(),
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
 * This resource describes a product or service that is available through a program and includes the conditions and constraints of availability.  All of the information in this resource is specific to the inclusion of the item in the formulary and is not inherent to the item itself.
 */
export const FormularyItemSchema = DomainResourceSchema.extend({
  resourceType: z.literal('FormularyItem'),
  identifier: z.array(IdentifierSchema).optional(),
  code: CodeableConceptSchema.optional(),
  status: z.enum(['active', 'entered-in-error', 'inactive']).optional(),
  _status: ElementSchema.optional(),
})
export type FormularyItem = z.infer<typeof FormularyItemSchema>

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
  operator: z.array(z.enum(['=', 'is-a', 'descendent-of', 'is-not-a', 'regex', 'in', 'not-in', 'generalizes', 'child-of', 'descendent-leaf', 'exists'])),
  _operator: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type CodeSystemFilter = z.infer<typeof CodeSystemFilterSchema>

/**
 * Additional information supplied about each concept
 * A property defines an additional slot through which additional information can be provided about a concept.
 * Multiple occurrences of CodeSystem.concept.property may occur for a CodeSystem.property where     CodeSystem.concept.property.code is the same and CodeSystem.concept.property.value differs. For example: multiple designations for a single concept.
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
  additionalUse: z.array(CodingSchema).optional(),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
  dispenser: ReferenceSchema.optional(),
  dispenserInstruction: z.array(AnnotationSchema).optional(),
  doseAdministrationAid: CodeableConceptSchema.optional(),
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
  basedOn: z.array(ReferenceSchema).optional(),
  priorPrescription: ReferenceSchema.optional(),
  groupIdentifier: IdentifierSchema.optional(),
  status: z.enum(['active', 'on-hold', 'ended', 'stopped', 'completed', 'cancelled', 'entered-in-error', 'draft', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  statusChanged: z.string().optional(),
  _statusChanged: ElementSchema.optional(),
  intent: z.enum(['proposal', 'plan', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  doNotPerform: z.boolean().optional(),
  _doNotPerform: ElementSchema.optional(),
  medication: CodeableReferenceSchema,
  subject: ReferenceSchema,
  informationSource: z.array(ReferenceSchema).optional(),
  encounter: ReferenceSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  requester: ReferenceSchema.optional(),
  reported: z.boolean().optional(),
  _reported: ElementSchema.optional(),
  performerType: CodeableConceptSchema.optional(),
  performer: z.array(ReferenceSchema).optional(),
  device: z.array(CodeableReferenceSchema).optional(),
  recorder: ReferenceSchema.optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  courseOfTherapyType: CodeableConceptSchema.optional(),
  insurance: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  renderedDosageInstruction: z.string().optional(),
  _renderedDosageInstruction: ElementSchema.optional(),
  effectiveDosePeriod: PeriodSchema.optional(),
  dosageInstruction: z.array(DosageSchema).optional(),
  dispenseRequest: MedicationRequestDispenseRequestSchema.optional(),
  substitution: MedicationRequestSubstitutionSchema.optional(),
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
 * A given instance of the .recommendation backbone element should correspond to a single recommended administration.
 */
export const ImmunizationRecommendationRecommendationSchema = BackboneElementSchema.extend({
  vaccineCode: z.array(CodeableConceptSchema).optional(),
  targetDisease: z.array(CodeableConceptSchema).optional(),
  contraindicatedVaccineCode: z.array(CodeableConceptSchema).optional(),
  forecastStatus: CodeableConceptSchema,
  forecastReason: z.array(CodeableConceptSchema).optional(),
  dateCriterion: z.array(ImmunizationRecommendationRecommendationDateCriterionSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  series: z.string().optional(),
  _series: ElementSchema.optional(),
  doseNumber: z.string().optional(),
  _doseNumber: ElementSchema.optional(),
  seriesDoses: z.string().optional(),
  _seriesDoses: ElementSchema.optional(),
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
  serviceType: z.array(CodeableReferenceSchema).optional(),
  specialty: z.array(CodeableConceptSchema).optional(),
  appointmentType: z.array(CodeableConceptSchema).optional(),
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
  code: z.enum(['Account', 'ActivityDefinition', 'ActorDefinition', 'AdministrableProductDefinition', 'AdverseEvent', 'AllergyIntolerance', 'Appointment', 'AppointmentResponse', 'ArtifactAssessment', 'AuditEvent', 'Basic', 'Binary', 'BiologicallyDerivedProduct', 'BiologicallyDerivedProductDispense', 'BodyStructure', 'Bundle', 'CapabilityStatement', 'CarePlan', 'CareTeam', 'ChargeItem', 'ChargeItemDefinition', 'Citation', 'Claim', 'ClaimResponse', 'ClinicalImpression', 'ClinicalUseDefinition', 'CodeSystem', 'Communication', 'CommunicationRequest', 'CompartmentDefinition', 'Composition', 'ConceptMap', 'Condition', 'ConditionDefinition', 'Consent', 'Contract', 'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue', 'Device', 'DeviceAssociation', 'DeviceDefinition', 'DeviceDispense', 'DeviceMetric', 'DeviceRequest', 'DeviceUsage', 'DiagnosticReport', 'DocumentReference', 'Encounter', 'EncounterHistory', 'Endpoint', 'EnrollmentRequest', 'EnrollmentResponse', 'EpisodeOfCare', 'EventDefinition', 'Evidence', 'EvidenceReport', 'EvidenceVariable', 'ExampleScenario', 'ExplanationOfBenefit', 'FamilyMemberHistory', 'Flag', 'FormularyItem', 'GenomicStudy', 'Goal', 'GraphDefinition', 'Group', 'GuidanceResponse', 'HealthcareService', 'ImagingSelection', 'ImagingStudy', 'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'ImplementationGuide', 'Ingredient', 'InsurancePlan', 'InventoryItem', 'InventoryReport', 'Invoice', 'Library', 'Linkage', 'List', 'Location', 'ManufacturedItemDefinition', 'Measure', 'MeasureReport', 'Medication', 'MedicationAdministration', 'MedicationDispense', 'MedicationKnowledge', 'MedicationRequest', 'MedicationStatement', 'MedicinalProductDefinition', 'MessageDefinition', 'MessageHeader', 'MolecularSequence', 'NamingSystem', 'NutritionIntake', 'NutritionOrder', 'NutritionProduct', 'Observation', 'ObservationDefinition', 'OperationDefinition', 'OperationOutcome', 'Organization', 'OrganizationAffiliation', 'PackagedProductDefinition', 'Parameters', 'Patient', 'PaymentNotice', 'PaymentReconciliation', 'Permission', 'Person', 'PlanDefinition', 'Practitioner', 'PractitionerRole', 'Procedure', 'Provenance', 'Questionnaire', 'QuestionnaireResponse', 'RegulatedAuthorization', 'RelatedPerson', 'RequestOrchestration', 'Requirements', 'ResearchStudy', 'ResearchSubject', 'RiskAssessment', 'Schedule', 'SearchParameter', 'ServiceRequest', 'Slot', 'Specimen', 'SpecimenDefinition', 'StructureDefinition', 'StructureMap', 'Subscription', 'SubscriptionStatus', 'SubscriptionTopic', 'Substance', 'SubstanceDefinition', 'SubstanceNucleicAcid', 'SubstancePolymer', 'SubstanceProtein', 'SubstanceReferenceInformation', 'SubstanceSourceMaterial', 'SupplyDelivery', 'SupplyRequest', 'Task', 'TerminologyCapabilities', 'TestPlan', 'TestReport', 'TestScript', 'Transport', 'ValueSet', 'VerificationResult', 'VisionPrescription']),
  _code: ElementSchema.optional(),
  param: z.array(z.string()).optional(),
  _param: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  startParam: z.string().optional(),
  _startParam: ElementSchema.optional(),
  endParam: z.string().optional(),
  _endParam: ElementSchema.optional(),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  purpose: z.string().optional(),
  _purpose: ElementSchema.optional(),
  code: z.enum(['Patient', 'Encounter', 'RelatedPerson', 'Practitioner', 'Device', 'EpisodeOfCare']),
  _code: ElementSchema.optional(),
  search: z.boolean(),
  _search: ElementSchema.optional(),
  resource: z.array(CompartmentDefinitionResourceSchema).optional(),
})
export type CompartmentDefinition = z.infer<typeof CompartmentDefinitionSchema>

/**
 * Self-pay parties and responsibility
 * Link to the paying party and optionally what specifically they will be responsible to pay.
 */
export const CoveragePaymentBySchema = BackboneElementSchema.extend({
  party: ReferenceSchema,
  responsibility: z.string().optional(),
  _responsibility: ElementSchema.optional(),
})
export type CoveragePaymentBy = z.infer<typeof CoveragePaymentBySchema>

/**
 * Additional coverage classifications
 * A suite of underwriter specific classifiers.
 * For example, class may be used to identify a class of coverage or employer group, policy, or plan.
 */
export const CoverageClassSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  value: IdentifierSchema,
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
  category: CodeableConceptSchema.optional(),
  network: CodeableConceptSchema.optional(),
  unit: CodeableConceptSchema.optional(),
  term: CodeableConceptSchema.optional(),
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
  kind: z.enum(['insurance', 'self-pay', 'other']),
  _kind: ElementSchema.optional(),
  paymentBy: z.array(CoveragePaymentBySchema).optional(),
  type: CodeableConceptSchema.optional(),
  policyHolder: ReferenceSchema.optional(),
  subscriber: ReferenceSchema.optional(),
  subscriberId: z.array(IdentifierSchema).optional(),
  beneficiary: ReferenceSchema,
  dependent: z.string().optional(),
  _dependent: ElementSchema.optional(),
  relationship: CodeableConceptSchema.optional(),
  period: PeriodSchema.optional(),
  insurer: ReferenceSchema.optional(),
  class: z.array(CoverageClassSchema).optional(),
  order: z.number().optional(),
  _order: ElementSchema.optional(),
  network: z.string().optional(),
  _network: ElementSchema.optional(),
  costToBeneficiary: z.array(CoverageCostToBeneficiarySchema).optional(),
  subrogation: z.boolean().optional(),
  _subrogation: ElementSchema.optional(),
  contract: z.array(ReferenceSchema).optional(),
  insurancePlan: ReferenceSchema.optional(),
})
export type Coverage = z.infer<typeof CoverageSchema>

/**
 * Settlement particulars
 * Distribution of the payment amount for a previously acknowledged payable.
 */
export const PaymentReconciliationAllocationSchema = BackboneElementSchema.extend({
  identifier: IdentifierSchema.optional(),
  predecessor: IdentifierSchema.optional(),
  target: ReferenceSchema.optional(),
  targetItemString: z.string().optional(),
  _targetItemString: ElementSchema.optional(),
  targetItemIdentifier: IdentifierSchema.optional(),
  targetItemPositiveInt: z.number().optional(),
  _targetItemPositiveInt: ElementSchema.optional(),
  encounter: ReferenceSchema.optional(),
  account: ReferenceSchema.optional(),
  type: CodeableConceptSchema.optional(),
  submitter: ReferenceSchema.optional(),
  response: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  responsible: ReferenceSchema.optional(),
  payee: ReferenceSchema.optional(),
  amount: MoneySchema.optional(),
})
export type PaymentReconciliationAllocation = z.infer<typeof PaymentReconciliationAllocationSchema>

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
  type: CodeableConceptSchema,
  status: z.enum(['active', 'cancelled', 'draft', 'entered-in-error']),
  _status: ElementSchema.optional(),
  kind: CodeableConceptSchema.optional(),
  period: PeriodSchema.optional(),
  created: z.string(),
  _created: ElementSchema.optional(),
  enterer: ReferenceSchema.optional(),
  issuerType: CodeableConceptSchema.optional(),
  paymentIssuer: ReferenceSchema.optional(),
  request: ReferenceSchema.optional(),
  requestor: ReferenceSchema.optional(),
  outcome: z.enum(['queued', 'complete', 'error', 'partial']).optional(),
  _outcome: ElementSchema.optional(),
  disposition: z.string().optional(),
  _disposition: ElementSchema.optional(),
  date: z.string(),
  _date: ElementSchema.optional(),
  location: ReferenceSchema.optional(),
  method: CodeableConceptSchema.optional(),
  cardBrand: z.string().optional(),
  _cardBrand: ElementSchema.optional(),
  accountNumber: z.string().optional(),
  _accountNumber: ElementSchema.optional(),
  expirationDate: z.string().optional(),
  _expirationDate: ElementSchema.optional(),
  processor: z.string().optional(),
  _processor: ElementSchema.optional(),
  referenceNumber: z.string().optional(),
  _referenceNumber: ElementSchema.optional(),
  authorization: z.string().optional(),
  _authorization: ElementSchema.optional(),
  tenderedAmount: MoneySchema.optional(),
  returnedAmount: MoneySchema.optional(),
  amount: MoneySchema,
  paymentIdentifier: IdentifierSchema.optional(),
  allocation: z.array(PaymentReconciliationAllocationSchema).optional(),
  formCode: CodeableConceptSchema.optional(),
  processNote: z.array(PaymentReconciliationProcessNoteSchema).optional(),
})
export type PaymentReconciliation = z.infer<typeof PaymentReconciliationSchema>

/**
 * Associated or related medication information
 * Associated or related medications. For example, if the medication is a branded product (e.g. Crestor), this is the Therapeutic Moeity (e.g. Rosuvastatin) or if this is a generic medication (e.g. Rosuvastatin), this would link to a branded product (e.g. Crestor.
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
 * The pricing of the medication
 * The price of the medication.
 */
export interface MedicationKnowledgeCost extends BackboneElement {
  effectiveDate?: Period[] | undefined
  type: CodeableConcept
  source?: string | undefined
  _source?: Element | undefined
  costMoney?: Money | undefined
  costCodeableConcept?: CodeableConcept | undefined
}

export const MedicationKnowledgeCostSchema: z.ZodType<MedicationKnowledgeCost> = z.lazy(() =>
  BackboneElementSchema.extend({
    effectiveDate: z.array(PeriodSchema).optional(),
    type: CodeableConceptSchema,
    source: z.string().optional(),
      _source: ElementSchema.optional(),
    costMoney: MoneySchema.optional(),
    costCodeableConcept: CodeableConceptSchema.optional(),
  })
)

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
export const MedicationKnowledgeIndicationGuidelineDosingGuidelineDosageSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  dosage: z.array(DosageSchema),
})
export type MedicationKnowledgeIndicationGuidelineDosingGuidelineDosage = z.infer<typeof MedicationKnowledgeIndicationGuidelineDosingGuidelineDosageSchema>

/**
 * Characteristics of the patient that are relevant to the administration guidelines
 * Characteristics of the patient that are relevant to the administration guidelines (for example, height, weight, gender, etc.).
 */
export const MedicationKnowledgeIndicationGuidelineDosingGuidelinePatientCharacteristicSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
})
export type MedicationKnowledgeIndicationGuidelineDosingGuidelinePatientCharacteristic = z.infer<typeof MedicationKnowledgeIndicationGuidelineDosingGuidelinePatientCharacteristicSchema>

/**
 * Guidelines for dosage of the medication
 * The guidelines for the dosage of the medication for the indication.
 */
export const MedicationKnowledgeIndicationGuidelineDosingGuidelineSchema = BackboneElementSchema.extend({
  treatmentIntent: CodeableConceptSchema.optional(),
  dosage: z.array(MedicationKnowledgeIndicationGuidelineDosingGuidelineDosageSchema).optional(),
  administrationTreatment: CodeableConceptSchema.optional(),
  patientCharacteristic: z.array(MedicationKnowledgeIndicationGuidelineDosingGuidelinePatientCharacteristicSchema).optional(),
})
export type MedicationKnowledgeIndicationGuidelineDosingGuideline = z.infer<typeof MedicationKnowledgeIndicationGuidelineDosingGuidelineSchema>

/**
 * Guidelines or protocols for administration of the medication for an indication
 * Guidelines or protocols that are applicable for the administration of the medication based on indication.
 */
export const MedicationKnowledgeIndicationGuidelineSchema = BackboneElementSchema.extend({
  indication: z.array(CodeableReferenceSchema).optional(),
  dosingGuideline: z.array(MedicationKnowledgeIndicationGuidelineDosingGuidelineSchema).optional(),
})
export type MedicationKnowledgeIndicationGuideline = z.infer<typeof MedicationKnowledgeIndicationGuidelineSchema>

/**
 * Categorization of the medication within a formulary or classification system
 */
export const MedicationKnowledgeMedicineClassificationSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  sourceString: z.string().optional(),
  _sourceString: ElementSchema.optional(),
  sourceUri: z.string().optional(),
  _sourceUri: ElementSchema.optional(),
  classification: z.array(CodeableConceptSchema).optional(),
})
export type MedicationKnowledgeMedicineClassification = z.infer<typeof MedicationKnowledgeMedicineClassificationSchema>

/**
 * Details about packaged medications
 * Information that only applies to packages (not products).
 */
export const MedicationKnowledgePackagingSchema = BackboneElementSchema.extend({
  cost: z.lazy(() => z.array(MedicationKnowledgeCostSchema)).optional(),
  packagedProduct: ReferenceSchema.optional(),
})
export type MedicationKnowledgePackaging = z.infer<typeof MedicationKnowledgePackagingSchema>

/**
 * Setting or value of environment for adequate storage
 * Describes a setting/value on the environment for the adequate storage of the medication and other substances.  Environment settings may involve temperature, humidity, or exposure to light.
 */
export const MedicationKnowledgeStorageGuidelineEnvironmentalSettingSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueQuantity: QuantitySchema.optional(),
  valueRange: RangeSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
})
export type MedicationKnowledgeStorageGuidelineEnvironmentalSetting = z.infer<typeof MedicationKnowledgeStorageGuidelineEnvironmentalSettingSchema>

/**
 * How the medication should be stored
 * Information on how the medication should be stored, for example, refrigeration temperatures and length of stability at a given temperature.
 */
export const MedicationKnowledgeStorageGuidelineSchema = BackboneElementSchema.extend({
  reference: z.string().optional(),
  _reference: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  stabilityDuration: DurationSchema.optional(),
  environmentalSetting: z.array(MedicationKnowledgeStorageGuidelineEnvironmentalSettingSchema).optional(),
})
export type MedicationKnowledgeStorageGuideline = z.infer<typeof MedicationKnowledgeStorageGuidelineSchema>

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
  schedule: z.array(CodeableConceptSchema).optional(),
  maxDispense: MedicationKnowledgeRegulatoryMaxDispenseSchema.optional(),
})
export type MedicationKnowledgeRegulatory = z.infer<typeof MedicationKnowledgeRegulatorySchema>

/**
 * Active or inactive ingredient
 * Identifies a particular constituent of interest in the product.
 */
export const MedicationKnowledgeDefinitionalIngredientSchema = BackboneElementSchema.extend({
  item: CodeableReferenceSchema,
  type: CodeableConceptSchema.optional(),
  strengthRatio: RatioSchema.optional(),
  strengthCodeableConcept: CodeableConceptSchema.optional(),
  strengthQuantity: QuantitySchema.optional(),
})
export type MedicationKnowledgeDefinitionalIngredient = z.infer<typeof MedicationKnowledgeDefinitionalIngredientSchema>

/**
 * Specifies descriptive properties of the medicine
 * Specifies descriptive properties of the medicine, such as color, shape, imprints, etc.
 */
export const MedicationKnowledgeDefinitionalDrugCharacteristicSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueBase64Binary: z.string().optional(),
  _valueBase64Binary: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
})
export type MedicationKnowledgeDefinitionalDrugCharacteristic = z.infer<typeof MedicationKnowledgeDefinitionalDrugCharacteristicSchema>

/**
 * Minimal definition information about the medication
 * Along with the link to a Medicinal Product Definition resource, this information provides common definitional elements that are needed to understand the specific medication that is being described.
 */
export const MedicationKnowledgeDefinitionalSchema = BackboneElementSchema.extend({
  definition: z.array(ReferenceSchema).optional(),
  doseForm: CodeableConceptSchema.optional(),
  intendedRoute: z.array(CodeableConceptSchema).optional(),
  ingredient: z.array(MedicationKnowledgeDefinitionalIngredientSchema).optional(),
  drugCharacteristic: z.array(MedicationKnowledgeDefinitionalDrugCharacteristicSchema).optional(),
})
export type MedicationKnowledgeDefinitional = z.infer<typeof MedicationKnowledgeDefinitionalSchema>

/**
 * Information about a medication that is used to support knowledge.
 */
export const MedicationKnowledgeSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicationKnowledge'),
  identifier: z.array(IdentifierSchema).optional(),
  code: CodeableConceptSchema.optional(),
  status: z.enum(['active', 'entered-in-error', 'inactive']).optional(),
  _status: ElementSchema.optional(),
  author: ReferenceSchema.optional(),
  intendedJurisdiction: z.array(CodeableConceptSchema).optional(),
  name: z.array(z.string()).optional(),
  _name: ElementSchema.optional(),
  relatedMedicationKnowledge: z.array(MedicationKnowledgeRelatedMedicationKnowledgeSchema).optional(),
  associatedMedication: z.array(ReferenceSchema).optional(),
  productType: z.array(CodeableConceptSchema).optional(),
  monograph: z.array(MedicationKnowledgeMonographSchema).optional(),
  preparationInstruction: z.string().optional(),
  _preparationInstruction: ElementSchema.optional(),
  cost: z.array(MedicationKnowledgeCostSchema).optional(),
  monitoringProgram: z.array(MedicationKnowledgeMonitoringProgramSchema).optional(),
  indicationGuideline: z.array(MedicationKnowledgeIndicationGuidelineSchema).optional(),
  medicineClassification: z.array(MedicationKnowledgeMedicineClassificationSchema).optional(),
  packaging: z.array(MedicationKnowledgePackagingSchema).optional(),
  clinicalUseIssue: z.array(ReferenceSchema).optional(),
  storageGuideline: z.array(MedicationKnowledgeStorageGuidelineSchema).optional(),
  regulatory: z.array(MedicationKnowledgeRegulatorySchema).optional(),
  definitional: MedicationKnowledgeDefinitionalSchema.optional(),
})
export type MedicationKnowledge = z.infer<typeof MedicationKnowledgeSchema>

/**
 * Todo
 */
export const SubstanceReferenceInformationGeneSchema = BackboneElementSchema.extend({
  geneSequenceOrigin: CodeableConceptSchema.optional(),
  gene: CodeableConceptSchema.optional(),
  source: z.array(ReferenceSchema).optional(),
})
export type SubstanceReferenceInformationGene = z.infer<typeof SubstanceReferenceInformationGeneSchema>

/**
 * Todo
 */
export const SubstanceReferenceInformationGeneElementSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  element: IdentifierSchema.optional(),
  source: z.array(ReferenceSchema).optional(),
})
export type SubstanceReferenceInformationGeneElement = z.infer<typeof SubstanceReferenceInformationGeneElementSchema>

/**
 * Todo
 */
export const SubstanceReferenceInformationTargetSchema = BackboneElementSchema.extend({
  target: IdentifierSchema.optional(),
  type: CodeableConceptSchema.optional(),
  interaction: CodeableConceptSchema.optional(),
  organism: CodeableConceptSchema.optional(),
  organismType: CodeableConceptSchema.optional(),
  amountQuantity: QuantitySchema.optional(),
  amountRange: RangeSchema.optional(),
  amountString: z.string().optional(),
  _amountString: ElementSchema.optional(),
  amountType: CodeableConceptSchema.optional(),
  source: z.array(ReferenceSchema).optional(),
})
export type SubstanceReferenceInformationTarget = z.infer<typeof SubstanceReferenceInformationTargetSchema>

/**
 * Todo.
 */
export const SubstanceReferenceInformationSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SubstanceReferenceInformation'),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  gene: z.array(SubstanceReferenceInformationGeneSchema).optional(),
  geneElement: z.array(SubstanceReferenceInformationGeneElementSchema).optional(),
  target: z.array(SubstanceReferenceInformationTargetSchema).optional(),
})
export type SubstanceReferenceInformation = z.infer<typeof SubstanceReferenceInformationSchema>

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
  doseNumber: z.string().optional(),
  _doseNumber: ElementSchema.optional(),
  seriesDoses: z.string().optional(),
  _seriesDoses: ElementSchema.optional(),
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
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
  name: z.string(),
  _name: ElementSchema.optional(),
  title: z.string().optional(),
  _title: ElementSchema.optional(),
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
  copyright: z.string().optional(),
  _copyright: ElementSchema.optional(),
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  code: z.string(),
  _code: ElementSchema.optional(),
  base: z.array(z.enum(['BodySite', 'CatalogEntry', 'Conformance', 'DataElement', 'DeviceComponent', 'DeviceUseRequest', 'DeviceUseStatement', 'DiagnosticOrder', 'DocumentManifest', 'EffectEvidenceSynthesis', 'EligibilityRequest', 'EligibilityResponse', 'ExpansionProfile', 'ImagingManifest', 'ImagingObjectSelection', 'Media', 'MedicationOrder', 'MedicationUsage', 'MedicinalProduct', 'MedicinalProductAuthorization', 'MedicinalProductContraindication', 'MedicinalProductIndication', 'MedicinalProductIngredient', 'MedicinalProductInteraction', 'MedicinalProductManufactured', 'MedicinalProductPackaged', 'MedicinalProductPharmaceutical', 'MedicinalProductUndesirableEffect', 'Order', 'OrderResponse', 'ProcedureRequest', 'ProcessRequest', 'ProcessResponse', 'ReferralRequest', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'RiskEvidenceSynthesis', 'Sequence', 'ServiceDefinition', 'SubstanceSpecification'])),
  _base: ElementSchema.optional(),
  type: z.enum(['number', 'date', 'string', 'token', 'reference', 'composite', 'quantity', 'uri', 'special']),
  _type: ElementSchema.optional(),
  expression: z.string().optional(),
  _expression: ElementSchema.optional(),
  processingMode: z.enum(['normal', 'phonetic', 'other']).optional(),
  _processingMode: ElementSchema.optional(),
  constraint: z.string().optional(),
  _constraint: ElementSchema.optional(),
  target: z.array(z.enum(['BodySite', 'CatalogEntry', 'Conformance', 'DataElement', 'DeviceComponent', 'DeviceUseRequest', 'DeviceUseStatement', 'DiagnosticOrder', 'DocumentManifest', 'EffectEvidenceSynthesis', 'EligibilityRequest', 'EligibilityResponse', 'ExpansionProfile', 'ImagingManifest', 'ImagingObjectSelection', 'Media', 'MedicationOrder', 'MedicationUsage', 'MedicinalProduct', 'MedicinalProductAuthorization', 'MedicinalProductContraindication', 'MedicinalProductIndication', 'MedicinalProductIngredient', 'MedicinalProductInteraction', 'MedicinalProductManufactured', 'MedicinalProductPackaged', 'MedicinalProductPharmaceutical', 'MedicinalProductUndesirableEffect', 'Order', 'OrderResponse', 'ProcedureRequest', 'ProcessRequest', 'ProcessResponse', 'ReferralRequest', 'RequestGroup', 'ResearchDefinition', 'ResearchElementDefinition', 'RiskEvidenceSynthesis', 'Sequence', 'ServiceDefinition', 'SubstanceSpecification'])).optional(),
  _target: ElementSchema.optional(),
  multipleOr: z.boolean().optional(),
  _multipleOr: ElementSchema.optional(),
  multipleAnd: z.boolean().optional(),
  _multipleAnd: ElementSchema.optional(),
  comparator: z.array(z.enum(['eq', 'ne', 'gt', 'lt', 'ge', 'le', 'sa', 'eb', 'ap'])).optional(),
  _comparator: ElementSchema.optional(),
  modifier: z.array(z.enum(['missing', 'exact', 'contains', 'not', 'text', 'in', 'not-in', 'below', 'above', 'type', 'identifier', 'of-type', 'code-text', 'text-advanced', 'iterate'])).optional(),
  _modifier: ElementSchema.optional(),
  chain: z.array(z.string()).optional(),
  _chain: ElementSchema.optional(),
  component: z.array(SearchParameterComponentSchema).optional(),
})
export type SearchParameter = z.infer<typeof SearchParameterSchema>

/**
 * Indicates whether the medication is or is not being consumed or administered
 * This element can be used to indicate whether a patient is following a course of treatment as instructed/prescribed or whether they are taking medications of their own volition.  It can also be used to indicate that a patient is not taking a medication, either because they were told not to or because they decided on their own.
 */
export const MedicationStatementAdherenceSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  reason: CodeableConceptSchema.optional(),
})
export type MedicationStatementAdherence = z.infer<typeof MedicationStatementAdherenceSchema>

/**
 * A record of a medication that is being consumed by a patient.   A MedicationStatement may indicate that the patient may be taking the medication now or has taken the medication in the past or will be taking the medication in the future.  The source of this information can be the patient, significant other (such as a family member or spouse), or a clinician.  A common scenario where this information is captured is during the history taking process during a patient visit or stay.   The medication information may come from sources such as the patient's memory, from a prescription bottle,  or from a list of medications the patient, clinician or other party maintains. 
 * The primary difference between a medicationstatement and a medicationadministration is that the medication administration has complete administration information and is based on actual administration information from the person who administered the medication.  A medicationstatement is often, if not always, less specific.  There is no required date/time when the medication was administered, in fact we only know that a source has reported the patient is taking this medication, where details such as time, quantity, or rate or even medication product may be incomplete or missing or less precise.  As stated earlier, the Medication Statement information may come from the patient's memory, from a prescription bottle or from a list of medications the patient, clinician or other party maintains.  Medication administration is more formal and is not missing detailed information.
 */
export const MedicationStatementSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicationStatement'),
  identifier: z.array(IdentifierSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['recorded', 'entered-in-error', 'draft']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  medication: CodeableReferenceSchema,
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  effectiveDateTime: z.string().optional(),
  _effectiveDateTime: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  effectiveTiming: TimingSchema.optional(),
  dateAsserted: z.string().optional(),
  _dateAsserted: ElementSchema.optional(),
  informationSource: z.array(ReferenceSchema).optional(),
  derivedFrom: z.array(ReferenceSchema).optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  relatedClinicalInformation: z.array(ReferenceSchema).optional(),
  renderedDosageInstruction: z.string().optional(),
  _renderedDosageInstruction: ElementSchema.optional(),
  dosage: z.array(DosageSchema).optional(),
  adherence: MedicationStatementAdherenceSchema.optional(),
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
  serviceType: z.array(CodeableReferenceSchema).optional(),
  specialty: z.array(CodeableConceptSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  actor: z.array(ReferenceSchema),
  planningHorizon: PeriodSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
})
export type Schedule = z.infer<typeof ScheduleSchema>

/**
 * A language which may be used to communicate with the person about his or her health
 * If no language is specified, this *implies* that the default local language is spoken.  If you need to convey proficiency for multiple modes, then you need multiple Person.Communication associations.   For animals, language is not a relevant field, and should be absent from the instance. If the Patient does not speak the default local language, then the Interpreter Required Standard can be used to explicitly declare that an interpreter is required.
 * Note that this property should not be used to update any linked/logically linked practitioner resources as it serves as a language that can be used to communicate with patients - however it may be used to inform the value on practitioner, along with their role at the organization (with the practitioner's permission)
 */
export const PersonCommunicationSchema = BackboneElementSchema.extend({
  language: CodeableConceptSchema,
  preferred: z.boolean().optional(),
  _preferred: ElementSchema.optional(),
})
export type PersonCommunication = z.infer<typeof PersonCommunicationSchema>

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
  photo: z.array(AttachmentSchema).optional(),
  communication: z.array(PersonCommunicationSchema).optional(),
  managingOrganization: ReferenceSchema.optional(),
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
  valueMarkdown: z.string().optional(),
  _valueMarkdown: ElementSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
  valueReference: ReferenceSchema.optional(),
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
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  property: z.array(AdministrableProductDefinitionPropertySchema).optional(),
  routeOfAdministration: z.array(AdministrableProductDefinitionRouteOfAdministrationSchema),
})
export type AdministrableProductDefinition = z.infer<typeof AdministrableProductDefinitionSchema>

/**
 * Who or what participated in the activities related to the allergy or intolerance and how they were involved
 * Indicates who or what participated in the activities related to the allergy or intolerance and how they were involved.
 */
export const AllergyIntoleranceParticipantSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type AllergyIntoleranceParticipant = z.infer<typeof AllergyIntoleranceParticipantSchema>

/**
 * Adverse Reaction Events linked to exposure to substance
 * Details about each adverse reaction event linked to exposure to the identified substance.
 */
export const AllergyIntoleranceReactionSchema = BackboneElementSchema.extend({
  substance: CodeableConceptSchema.optional(),
  manifestation: z.array(CodeableReferenceSchema),
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
  type: CodeableConceptSchema.optional(),
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
  participant: z.array(AllergyIntoleranceParticipantSchema).optional(),
  lastOccurrence: z.string().optional(),
  _lastOccurrence: ElementSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  reaction: z.array(AllergyIntoleranceReactionSchema).optional(),
})
export type AllergyIntolerance = z.infer<typeof AllergyIntoleranceSchema>

/**
 * Constraints on fulfillment transports
 * If the Transport.focus is a request resource and the transport is seeking fulfillment (i.e. is asking for the request to be actioned), this element identifies any limitations on what parts of the referenced request should be actioned.
 */
export const TransportRestrictionSchema = BackboneElementSchema.extend({
  repetitions: z.number().optional(),
  _repetitions: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  recipient: z.array(ReferenceSchema).optional(),
})
export type TransportRestriction = z.infer<typeof TransportRestrictionSchema>

/**
 * Information used to perform transport
 * Additional information that may be needed in the execution of the transport.
 */
export const TransportInputSchema = BackboneElementSchema.extend({
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
  valueInteger64: z.string().optional(),
  _valueInteger64: ElementSchema.optional(),
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
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueAvailability: AvailabilitySchema.optional(),
  valueExtendedContactDetail: ExtendedContactDetailSchema.optional(),
  valueDosage: DosageSchema.optional(),
  valueMeta: MetaSchema.optional(),
})
export type TransportInput = z.infer<typeof TransportInputSchema>

/**
 * Information produced as part of transport
 * Outputs produced by the Transport.
 */
export const TransportOutputSchema = BackboneElementSchema.extend({
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
  valueInteger64: z.string().optional(),
  _valueInteger64: ElementSchema.optional(),
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
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueAvailability: AvailabilitySchema.optional(),
  valueExtendedContactDetail: ExtendedContactDetailSchema.optional(),
  valueDosage: DosageSchema.optional(),
  valueMeta: MetaSchema.optional(),
})
export type TransportOutput = z.infer<typeof TransportOutputSchema>

/**
 * Record of transport.
 */
export const TransportSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Transport'),
  identifier: z.array(IdentifierSchema).optional(),
  instantiatesCanonical: z.string().optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesUri: z.string().optional(),
  _instantiatesUri: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  groupIdentifier: IdentifierSchema.optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['in-progress', 'completed', 'abandoned', 'cancelled', 'planned', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
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
  completionTime: z.string().optional(),
  _completionTime: ElementSchema.optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  lastModified: z.string().optional(),
  _lastModified: ElementSchema.optional(),
  requester: ReferenceSchema.optional(),
  performerType: z.array(CodeableConceptSchema).optional(),
  owner: ReferenceSchema.optional(),
  location: ReferenceSchema.optional(),
  insurance: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  relevantHistory: z.array(ReferenceSchema).optional(),
  restriction: TransportRestrictionSchema.optional(),
  input: z.array(TransportInputSchema).optional(),
  output: z.array(TransportOutputSchema).optional(),
  requestedLocation: ReferenceSchema,
  currentLocation: ReferenceSchema,
  reason: CodeableReferenceSchema.optional(),
  history: ReferenceSchema.optional(),
})
export type Transport = z.infer<typeof TransportSchema>

/**
 * decimal Type: A rational number with implicit precision
 */
export const decimalSchema = PrimitiveTypeSchema.extend({
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
  detailString: z.string().optional(),
  _detailString: ElementSchema.optional(),
  detailBoolean: z.boolean().optional(),
  _detailBoolean: ElementSchema.optional(),
  detailInteger: z.number().optional(),
  _detailInteger: ElementSchema.optional(),
  detailRatio: RatioSchema.optional(),
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
 * Who or what can be this actor
 * The characteristics of the candidates that could serve as the actor.
 */
export const PlanDefinitionActorOptionSchema = BackboneElementSchema.extend({
  type: z.enum(['careteam', 'device', 'group', 'healthcareservice', 'location', 'organization', 'patient', 'practitioner', 'practitionerrole', 'relatedperson']).optional(),
  _type: ElementSchema.optional(),
  typeCanonical: z.string().optional(),
  _typeCanonical: ElementSchema.optional(),
  typeReference: ReferenceSchema.optional(),
  role: CodeableConceptSchema.optional(),
})
export type PlanDefinitionActorOption = z.infer<typeof PlanDefinitionActorOptionSchema>

/**
 * Actors within the plan
 * Actors represent the individuals or groups involved in the execution of the defined set of activities.
 */
export const PlanDefinitionActorSchema = BackboneElementSchema.extend({
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  option: z.array(PlanDefinitionActorOptionSchema),
})
export type PlanDefinitionActor = z.infer<typeof PlanDefinitionActorSchema>

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
 * Input data requirements
 * Defines input data requirements for the action.
 */
export const PlanDefinitionActionInputSchema = BackboneElementSchema.extend({
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  requirement: DataRequirementSchema.optional(),
  relatedData: z.string().optional(),
  _relatedData: ElementSchema.optional(),
})
export type PlanDefinitionActionInput = z.infer<typeof PlanDefinitionActionInputSchema>

/**
 * Output data definition
 * Defines the outputs of the action, if any.
 */
export const PlanDefinitionActionOutputSchema = BackboneElementSchema.extend({
  title: z.string().optional(),
  _title: ElementSchema.optional(),
  requirement: DataRequirementSchema.optional(),
  relatedData: z.string().optional(),
  _relatedData: ElementSchema.optional(),
})
export type PlanDefinitionActionOutput = z.infer<typeof PlanDefinitionActionOutputSchema>

/**
 * Relationship to another action
 * A relationship to another action such as "before" or "30-60 minutes after start of".
 * When an action depends on multiple actions, the meaning is that all actions are dependencies, rather than that any of the actions are a dependency.
 */
export const PlanDefinitionActionRelatedActionSchema = BackboneElementSchema.extend({
  targetId: z.string(),
  _targetId: ElementSchema.optional(),
  relationship: z.enum(['before', 'before-start', 'before-end', 'concurrent', 'concurrent-with-start', 'concurrent-with-end', 'after', 'after-start', 'after-end']),
  _relationship: ElementSchema.optional(),
  endRelationship: z.enum(['before', 'before-start', 'before-end', 'concurrent', 'concurrent-with-start', 'concurrent-with-end', 'after', 'after-start', 'after-end']).optional(),
  _endRelationship: ElementSchema.optional(),
  offsetDuration: DurationSchema.optional(),
  offsetRange: RangeSchema.optional(),
})
export type PlanDefinitionActionRelatedAction = z.infer<typeof PlanDefinitionActionRelatedActionSchema>

/**
 * Who should participate in the action
 * Indicates who should participate in performing the action described.
 */
export const PlanDefinitionActionParticipantSchema = BackboneElementSchema.extend({
  actorId: z.string().optional(),
  _actorId: ElementSchema.optional(),
  type: z.enum(['careteam', 'device', 'group', 'healthcareservice', 'location', 'organization', 'patient', 'practitioner', 'practitionerrole', 'relatedperson']).optional(),
  _type: ElementSchema.optional(),
  typeCanonical: z.string().optional(),
  _typeCanonical: ElementSchema.optional(),
  typeReference: ReferenceSchema.optional(),
  role: CodeableConceptSchema.optional(),
  function: CodeableConceptSchema.optional(),
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
  linkId?: string | undefined
  _linkId?: Element | undefined
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
  code?: CodeableConcept | undefined
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
  input?: PlanDefinitionActionInput[] | undefined
  output?: PlanDefinitionActionOutput[] | undefined
  relatedAction?: PlanDefinitionActionRelatedAction[] | undefined
  timingAge?: Age | undefined
  timingDuration?: Duration | undefined
  timingRange?: Range | undefined
  timingTiming?: Timing | undefined
  location?: CodeableReference | undefined
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
    linkId: z.string().optional(),
      _linkId: ElementSchema.optional(),
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
    code: CodeableConceptSchema.optional(),
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
    input: z.array(PlanDefinitionActionInputSchema).optional(),
    output: z.array(PlanDefinitionActionOutputSchema).optional(),
    relatedAction: z.array(PlanDefinitionActionRelatedActionSchema).optional(),
    timingAge: AgeSchema.optional(),
    timingDuration: DurationSchema.optional(),
    timingRange: RangeSchema.optional(),
    timingTiming: TimingSchema.optional(),
    location: CodeableReferenceSchema.optional(),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
  actor: z.array(PlanDefinitionActorSchema).optional(),
  action: z.array(PlanDefinitionActionSchema).optional(),
  asNeededBoolean: z.boolean().optional(),
  _asNeededBoolean: ElementSchema.optional(),
  asNeededCodeableConcept: CodeableConceptSchema.optional(),
})
export type PlanDefinition = z.infer<typeof PlanDefinitionSchema>

/**
 * Subject status
 * The current state (status) of the subject and resons for status change where appropriate.
 * This is intended to deal with the confusion routinely created by haing two conflated concepts of being in a particular state and having achieved a particular milestone.  In strict terms a milestone is a point of time event that results in a change from one state to another.  The state before the milestone is achieved is often given the same name as the milestone, and sometimes the state may have the same description.  For instance "Randomised" and "Visit 1" may be different milestones but the state remains at "on study" after each of them. 
 */
export const ResearchSubjectProgressSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  subjectState: CodeableConceptSchema.optional(),
  milestone: CodeableConceptSchema.optional(),
  reason: CodeableConceptSchema.optional(),
  startDate: z.string().optional(),
  _startDate: ElementSchema.optional(),
  endDate: z.string().optional(),
  _endDate: ElementSchema.optional(),
})
export type ResearchSubjectProgress = z.infer<typeof ResearchSubjectProgressSchema>

/**
 * A ResearchSubject is a participant or object which is the recipient of investigative activities in a research study.
 */
export const ResearchSubjectSchema = DomainResourceSchema.extend({
  resourceType: z.literal('ResearchSubject'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  _status: ElementSchema.optional(),
  progress: z.array(ResearchSubjectProgressSchema).optional(),
  period: PeriodSchema.optional(),
  study: ReferenceSchema,
  subject: ReferenceSchema,
  assignedComparisonGroup: z.string().optional(),
  _assignedComparisonGroup: ElementSchema.optional(),
  actualComparisonGroup: z.string().optional(),
  _actualComparisonGroup: ElementSchema.optional(),
  consent: z.array(ReferenceSchema).optional(),
})
export type ResearchSubject = z.infer<typeof ResearchSubjectSchema>

/**
 * canonical type: A URI that is a reference to a canonical URL on a FHIR resource
 */
export const canonicalSchema = uriSchema.extend({
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type canonical = z.infer<typeof canonicalSchema>

/**
 * Possible or likely findings and diagnoses
 * Specific findings or diagnoses that were considered likely or relevant to ongoing treatment.
 */
export const ClinicalImpressionFindingSchema = BackboneElementSchema.extend({
  item: CodeableReferenceSchema.optional(),
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
  status: z.enum(['preparation', 'in-progress', 'not-done', 'on-hold', 'stopped', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  statusReason: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  effectiveDateTime: z.string().optional(),
  _effectiveDateTime: ElementSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  performer: ReferenceSchema.optional(),
  previous: ReferenceSchema.optional(),
  problem: z.array(ReferenceSchema).optional(),
  changePattern: CodeableConceptSchema.optional(),
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
 * Criteria for narrowing the subscription topic stream
 * The filter properties to be applied to narrow the subscription topic stream.  When multiple filters are applied, evaluates to true if all the conditions applicable to that resource are met; otherwise it returns false (i.e., logical AND).
 */
export const SubscriptionFilterBySchema = BackboneElementSchema.extend({
  resourceType: z.string().optional(),
  _resourceType: ElementSchema.optional(),
  filterParameter: z.string(),
  _filterParameter: ElementSchema.optional(),
  comparator: z.enum(['eq', 'ne', 'gt', 'lt', 'ge', 'le', 'sa', 'eb', 'ap']).optional(),
  _comparator: ElementSchema.optional(),
  modifier: z.enum(['missing', 'exact', 'contains', 'not', 'text', 'in', 'not-in', 'below', 'above', 'type', 'identifier', 'of-type', 'code-text', 'text-advanced', 'iterate']).optional(),
  _modifier: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type SubscriptionFilterBy = z.infer<typeof SubscriptionFilterBySchema>

/**
 * Channel type
 * Channel-dependent information to send as part of the notification (e.g., HTTP Headers).
 * Exactly what these mean depend on the channel type. They can convey additional information to the server or recipient and/or meet security requirements; for example, support of multiple headers in the outgoing notifications for rest-hook type subscriptions. Note that names are not required to be unique, but channel definitions can impose restrictions.
 */
export const SubscriptionParameterSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type SubscriptionParameter = z.infer<typeof SubscriptionParameterSchema>

/**
 * The subscription resource describes a particular client's request to be notified about a SubscriptionTopic.
 */
export const SubscriptionSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Subscription'),
  identifier: z.array(IdentifierSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  status: z.enum(['requested', 'active', 'error', 'off', 'entered-in-error']),
  _status: ElementSchema.optional(),
  topic: z.string(),
  _topic: ElementSchema.optional(),
  contact: z.array(ContactPointSchema).optional(),
  end: z.string().optional(),
  _end: ElementSchema.optional(),
  managingEntity: ReferenceSchema.optional(),
  reason: z.string().optional(),
  _reason: ElementSchema.optional(),
  filterBy: z.array(SubscriptionFilterBySchema).optional(),
  channelType: CodingSchema,
  endpoint: z.string().optional(),
  _endpoint: ElementSchema.optional(),
  parameter: z.array(SubscriptionParameterSchema).optional(),
  heartbeatPeriod: z.number().optional(),
  _heartbeatPeriod: ElementSchema.optional(),
  timeout: z.number().optional(),
  _timeout: ElementSchema.optional(),
  contentType: z.string().optional(),
  _contentType: ElementSchema.optional(),
  content: z.enum(['empty', 'id-only', 'full-resource']).optional(),
  _content: ElementSchema.optional(),
  maxCount: z.number().optional(),
  _maxCount: ElementSchema.optional(),
})
export type Subscription = z.infer<typeof SubscriptionSchema>

/**
 * Members of the team
 * Identifies all people and organizations who are expected to be involved in the care team.
 */
export const CareTeamParticipantSchema = BackboneElementSchema.extend({
  role: CodeableConceptSchema.optional(),
  member: ReferenceSchema.optional(),
  onBehalfOf: ReferenceSchema.optional(),
  coveragePeriod: PeriodSchema.optional(),
  coverageTiming: TimingSchema.optional(),
})
export type CareTeamParticipant = z.infer<typeof CareTeamParticipantSchema>

/**
 * The Care Team includes all the people and organizations who plan to participate in the coordination and delivery of care.
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
  period: PeriodSchema.optional(),
  participant: z.array(CareTeamParticipantSchema).optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
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
  deviceIdentifier: z.string(),
  _deviceIdentifier: ElementSchema.optional(),
  issuer: z.string(),
  _issuer: ElementSchema.optional(),
  jurisdiction: z.string().optional(),
  _jurisdiction: ElementSchema.optional(),
  carrierAIDC: z.string().optional(),
  _carrierAIDC: ElementSchema.optional(),
  carrierHRF: z.string().optional(),
  _carrierHRF: ElementSchema.optional(),
  entryType: z.enum(['barcode', 'rfid', 'manual', 'card', 'self-reported', 'electronic-transmission', 'unknown']).optional(),
  _entryType: ElementSchema.optional(),
})
export type DeviceUdiCarrier = z.infer<typeof DeviceUdiCarrierSchema>

/**
 * The name or names of the device as known to the manufacturer and/or patient
 * This represents the manufacturer's name of the device as provided by the device, from a UDI label, or by a person describing the Device.  This typically would be used when a person provides the name(s) or when the device represents one of the names available from DeviceDefinition.
 */
export const DeviceNameSchema = BackboneElementSchema.extend({
  value: z.string(),
  _value: ElementSchema.optional(),
  type: z.enum(['registered-name', 'user-friendly-name', 'patient-reported-name']),
  _type: ElementSchema.optional(),
  display: z.boolean().optional(),
  _display: ElementSchema.optional(),
})
export type DeviceName = z.infer<typeof DeviceNameSchema>

/**
 * The actual design of the device or software version running on the device
 */
export const DeviceVersionSchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema.optional(),
  component: IdentifierSchema.optional(),
  installDate: z.string().optional(),
  _installDate: ElementSchema.optional(),
  value: z.string(),
  _value: ElementSchema.optional(),
})
export type DeviceVersion = z.infer<typeof DeviceVersionSchema>

/**
 * Identifies the standards, specifications, or formal guidances for the capabilities supported by the device
 * Identifies the standards, specifications, or formal guidances for the capabilities supported by the device. The device may be certified as conformant to these specifications e.g., communication, performance, process, measurement, or specialization standards.
 */
export const DeviceConformsToSchema = BackboneElementSchema.extend({
  category: CodeableConceptSchema.optional(),
  specification: CodeableConceptSchema,
  version: z.string().optional(),
  _version: ElementSchema.optional(),
})
export type DeviceConformsTo = z.infer<typeof DeviceConformsToSchema>

/**
 * Inherent, essentially fixed, characteristics of the device.  e.g., time properties, size, material, etc.
 * Static or essentially fixed characteristics or features of the device (e.g., time or timing attributes, resolution, accuracy, intended use or instructions for use, and physical attributes) that are not otherwise captured in more specific attributes.
 * Dynamic or current properties, such as settings, of an individual device are described using a Device instance-specific [DeviceMetric] and recorded using [Observation].  Static characteristics of a device could also be documented in an associated [DeviceDefinition] instance. The Device instance's properties, and their values, could be, but need not be, the same as those described in an associated DeviceDefinition.
 */
export const DevicePropertySchema = BackboneElementSchema.extend({
  type: CodeableConceptSchema,
  valueQuantity: QuantitySchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueString: z.string().optional(),
  _valueString: ElementSchema.optional(),
  valueBoolean: z.boolean().optional(),
  _valueBoolean: ElementSchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
  valueRange: RangeSchema.optional(),
  valueAttachment: AttachmentSchema.optional(),
})
export type DeviceProperty = z.infer<typeof DevicePropertySchema>

/**
 * This resource describes the properties (regulated, has real time clock, etc.), adminstrative (manufacturer name, model number, serial number, firmware, etc.), and type (knee replacement, blood pressure cuff, MRI, etc.) of a physical unit (these values do not change much within a given module, for example the serail number, manufacturer name, and model number). An actual unit may consist of several modules in a distinct hierarchy and these are represented by multiple Device resources and bound through the 'parent' element.
 */
export const DeviceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Device'),
  identifier: z.array(IdentifierSchema).optional(),
  displayName: z.string().optional(),
  _displayName: ElementSchema.optional(),
  definition: CodeableReferenceSchema.optional(),
  udiCarrier: z.array(DeviceUdiCarrierSchema).optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error']).optional(),
  _status: ElementSchema.optional(),
  availabilityStatus: CodeableConceptSchema.optional(),
  biologicalSourceEvent: IdentifierSchema.optional(),
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
  name: z.array(DeviceNameSchema).optional(),
  modelNumber: z.string().optional(),
  _modelNumber: ElementSchema.optional(),
  partNumber: z.string().optional(),
  _partNumber: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  type: z.array(CodeableConceptSchema).optional(),
  version: z.array(DeviceVersionSchema).optional(),
  conformsTo: z.array(DeviceConformsToSchema).optional(),
  property: z.array(DevicePropertySchema).optional(),
  mode: CodeableConceptSchema.optional(),
  cycle: CountSchema.optional(),
  duration: DurationSchema.optional(),
  owner: ReferenceSchema.optional(),
  contact: z.array(ContactPointSchema).optional(),
  location: ReferenceSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  endpoint: z.array(ReferenceSchema).optional(),
  gateway: z.array(CodeableReferenceSchema).optional(),
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
export const NutritionProductCharacteristicSchema = BackboneElementSchema.extend({
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
export type NutritionProductCharacteristic = z.infer<typeof NutritionProductCharacteristicSchema>

/**
 * One or several physical instances or occurrences of the nutrition product
 * Conveys instance-level information about this product item. One or several physical, countable instances or occurrences of the product.
 */
export const NutritionProductInstanceSchema = BackboneElementSchema.extend({
  quantity: QuantitySchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  lotNumber: z.string().optional(),
  _lotNumber: ElementSchema.optional(),
  expiry: z.string().optional(),
  _expiry: ElementSchema.optional(),
  useBy: z.string().optional(),
  _useBy: ElementSchema.optional(),
  biologicalSourceEvent: IdentifierSchema.optional(),
})
export type NutritionProductInstance = z.infer<typeof NutritionProductInstanceSchema>

/**
 * A food or supplement that is consumed by patients.
 */
export const NutritionProductSchema = DomainResourceSchema.extend({
  resourceType: z.literal('NutritionProduct'),
  code: CodeableConceptSchema.optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  manufacturer: z.array(ReferenceSchema).optional(),
  nutrient: z.array(NutritionProductNutrientSchema).optional(),
  ingredient: z.array(NutritionProductIngredientSchema).optional(),
  knownAllergen: z.array(CodeableReferenceSchema).optional(),
  characteristic: z.array(NutritionProductCharacteristicSchema).optional(),
  instance: z.array(NutritionProductInstanceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type NutritionProduct = z.infer<typeof NutritionProductSchema>

/**
 * unsignedInt type: An integer with a value that is not negative (e.g. >= 0)
 */
export const unsignedIntSchema = integerSchema.extend({
  value: z.number().optional(),
  _value: ElementSchema.optional(),
})
export type unsignedInt = z.infer<typeof unsignedIntSchema>

/**
 * Computable version of the backing policy
 * A Reference or URL used to uniquely identify the policy the organization will enforce for this Consent. This Reference or URL should be specific to the version of the policy and should be dereferencable to a computable policy of some form.
 */
export const ConsentPolicyBasisSchema = BackboneElementSchema.extend({
  reference: ReferenceSchema.optional(),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
})
export type ConsentPolicyBasis = z.infer<typeof ConsentPolicyBasisSchema>

/**
 * Consent Verified by patient or family
 * Whether a treatment instruction (e.g. artificial respiration: yes or no) was verified with the patient, his/her family or another authorized person.
 */
export const ConsentVerificationSchema = BackboneElementSchema.extend({
  verified: z.boolean(),
  _verified: ElementSchema.optional(),
  verificationType: CodeableConceptSchema.optional(),
  verifiedBy: ReferenceSchema.optional(),
  verifiedWith: ReferenceSchema.optional(),
  verificationDate: z.array(z.string()).optional(),
  _verificationDate: ElementSchema.optional(),
})
export type ConsentVerification = z.infer<typeof ConsentVerificationSchema>

/**
 * Who|what controlled by this provision (or group, by role)
 * Who or what is controlled by this provision. Use group to identify a set of actors by some property they share (e.g. 'admitting officers').
 */
export const ConsentProvisionActorSchema = BackboneElementSchema.extend({
  role: CodeableConceptSchema.optional(),
  reference: ReferenceSchema.optional(),
})
export type ConsentProvisionActor = z.infer<typeof ConsentProvisionActorSchema>

/**
 * Data controlled by this provision
 * The resources controlled by this provision if specific resources are referenced.
 */
export const ConsentProvisionDataSchema = BackboneElementSchema.extend({
  meaning: z.enum(['instance', 'related', 'dependents', 'authoredby']),
  _meaning: ElementSchema.optional(),
  reference: ReferenceSchema,
})
export type ConsentProvisionData = z.infer<typeof ConsentProvisionDataSchema>

/**
 * Constraints to the base Consent.policyRule/Consent.policy
 * An exception to the base policy of this consent. An exception can be an addition or removal of access permissions.
 */
export interface ConsentProvision extends BackboneElement {
  period?: Period | undefined
  actor?: ConsentProvisionActor[] | undefined
  action?: CodeableConcept[] | undefined
  securityLabel?: Coding[] | undefined
  purpose?: Coding[] | undefined
  documentType?: Coding[] | undefined
  resourceType?: Coding[] | undefined
  code?: CodeableConcept[] | undefined
  dataPeriod?: Period | undefined
  data?: ConsentProvisionData[] | undefined
  expression?: Expression | undefined
  provision?: ConsentProvision[] | undefined
}

export const ConsentProvisionSchema: z.ZodType<ConsentProvision> = z.lazy(() =>
  BackboneElementSchema.extend({
    period: PeriodSchema.optional(),
    actor: z.array(ConsentProvisionActorSchema).optional(),
    action: z.array(CodeableConceptSchema).optional(),
    securityLabel: z.array(CodingSchema).optional(),
    purpose: z.array(CodingSchema).optional(),
    documentType: z.array(CodingSchema).optional(),
    resourceType: z.array(CodingSchema).optional(),
    code: z.array(CodeableConceptSchema).optional(),
    dataPeriod: PeriodSchema.optional(),
    data: z.array(ConsentProvisionDataSchema).optional(),
    expression: ExpressionSchema.optional(),
    provision: z.lazy(() => z.array(ConsentProvisionSchema)).optional(),
  })
)

/**
 * A record of a healthcare consumer’s  choices  or choices made on their behalf by a third party, which permits or denies identified recipient(s) or recipient role(s) to perform one or more actions within a given policy context, for specific purposes and periods of time.
 */
export const ConsentSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Consent'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['draft', 'active', 'inactive', 'not-done', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  period: PeriodSchema.optional(),
  grantor: z.array(ReferenceSchema).optional(),
  grantee: z.array(ReferenceSchema).optional(),
  manager: z.array(ReferenceSchema).optional(),
  controller: z.array(ReferenceSchema).optional(),
  sourceAttachment: z.array(AttachmentSchema).optional(),
  sourceReference: z.array(ReferenceSchema).optional(),
  regulatoryBasis: z.array(CodeableConceptSchema).optional(),
  policyBasis: ConsentPolicyBasisSchema.optional(),
  policyText: z.array(ReferenceSchema).optional(),
  verification: z.array(ConsentVerificationSchema).optional(),
  decision: z.enum(['deny', 'permit']).optional(),
  _decision: ElementSchema.optional(),
  provision: z.array(ConsentProvisionSchema).optional(),
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
export const MedicinalProductDefinitionNamePartSchema = BackboneElementSchema.extend({
  part: z.string(),
  _part: ElementSchema.optional(),
  type: CodeableConceptSchema,
})
export type MedicinalProductDefinitionNamePart = z.infer<typeof MedicinalProductDefinitionNamePartSchema>

/**
 * Country and jurisdiction where the name applies
 * Country and jurisdiction where the name applies, and associated language.
 */
export const MedicinalProductDefinitionNameUsageSchema = BackboneElementSchema.extend({
  country: CodeableConceptSchema,
  jurisdiction: CodeableConceptSchema.optional(),
  language: CodeableConceptSchema,
})
export type MedicinalProductDefinitionNameUsage = z.infer<typeof MedicinalProductDefinitionNameUsageSchema>

/**
 * The product's name, including full name and possibly coded parts
 */
export const MedicinalProductDefinitionNameSchema = BackboneElementSchema.extend({
  productName: z.string(),
  _productName: ElementSchema.optional(),
  type: CodeableConceptSchema.optional(),
  part: z.array(MedicinalProductDefinitionNamePartSchema).optional(),
  usage: z.array(MedicinalProductDefinitionNameUsageSchema).optional(),
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
  valueMarkdown: z.string().optional(),
  _valueMarkdown: ElementSchema.optional(),
  valueQuantity: QuantitySchema.optional(),
  valueInteger: z.number().optional(),
  _valueInteger: ElementSchema.optional(),
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
  comprisedOf: z.array(ReferenceSchema).optional(),
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
  contentAttachment: AttachmentSchema.optional(),
  contentReference: ReferenceSchema.optional(),
  contentCodeableConcept: CodeableConceptSchema.optional(),
})
export type CommunicationPayload = z.infer<typeof CommunicationPayloadSchema>

/**
 * A clinical or business level record of information being transmitted or shared; e.g. an alert that was sent to a responsible provider, a public health agency communication to a provider/reporter in response to a case report for a reportable condition.
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
  reason: z.array(CodeableReferenceSchema).optional(),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
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
 * Definition of the constant value used in the map rules
 * Definition of a constant value used in the map rules.
 */
export const StructureMapConstSchema = BackboneElementSchema.extend({
  name: z.string().optional(),
  _name: ElementSchema.optional(),
  value: z.string().optional(),
  _value: ElementSchema.optional(),
})
export type StructureMapConst = z.infer<typeof StructureMapConstSchema>

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
  defaultValue: z.string().optional(),
  _defaultValue: ElementSchema.optional(),
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
export interface StructureMapGroupRuleTargetParameter extends BackboneElement {
  valueId?: string | undefined
  _valueId?: Element | undefined
  valueString?: string | undefined
  _valueString?: Element | undefined
  valueBoolean?: boolean | undefined
  _valueBoolean?: Element | undefined
  valueInteger?: number | undefined
  _valueInteger?: Element | undefined
  valueDecimal?: number | undefined
  _valueDecimal?: Element | undefined
  valueDate?: string | undefined
  _valueDate?: Element | undefined
  valueTime?: string | undefined
  _valueTime?: Element | undefined
  valueDateTime?: string | undefined
  _valueDateTime?: Element | undefined
}

export const StructureMapGroupRuleTargetParameterSchema: z.ZodType<StructureMapGroupRuleTargetParameter> = z.lazy(() =>
  BackboneElementSchema.extend({
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
    valueDate: z.string().optional(),
      _valueDate: ElementSchema.optional(),
    valueTime: z.string().optional(),
      _valueTime: ElementSchema.optional(),
    valueDateTime: z.string().optional(),
      _valueDateTime: ElementSchema.optional(),
  })
)

/**
 * Content to create because of this mapping rule
 */
export const StructureMapGroupRuleTargetSchema = BackboneElementSchema.extend({
  context: z.string().optional(),
  _context: ElementSchema.optional(),
  element: z.string().optional(),
  _element: ElementSchema.optional(),
  variable: z.string().optional(),
  _variable: ElementSchema.optional(),
  listMode: z.array(z.enum(['first', 'share', 'last', 'single'])).optional(),
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
  parameter: z.lazy(() => z.array(StructureMapGroupRuleTargetParameterSchema)),
})
export type StructureMapGroupRuleDependent = z.infer<typeof StructureMapGroupRuleDependentSchema>

/**
 * Transform Rule from source to target
 */
export interface StructureMapGroupRule extends BackboneElement {
  name?: string | undefined
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
    name: z.string().optional(),
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
 * Organizes the mapping into managable chunks for human review/ease of maintenance.
 */
export const StructureMapGroupSchema = BackboneElementSchema.extend({
  name: z.string(),
  _name: ElementSchema.optional(),
  extends: z.string().optional(),
  _extends: ElementSchema.optional(),
  typeMode: z.enum(['types', 'type-and-types']).optional(),
  _typeMode: ElementSchema.optional(),
  documentation: z.string().optional(),
  _documentation: ElementSchema.optional(),
  input: z.array(StructureMapGroupInputSchema),
  rule: z.array(StructureMapGroupRuleSchema).optional(),
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
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  structure: z.array(StructureMapStructureSchema).optional(),
  import: z.array(z.string()).optional(),
  _import: ElementSchema.optional(),
  const: z.array(StructureMapConstSchema).optional(),
  group: z.array(StructureMapGroupSchema),
})
export type StructureMap = z.infer<typeof StructureMapSchema>

/**
 * Who or what performed the task
 * The entity who performed the requested task.
 */
export const TaskPerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type TaskPerformer = z.infer<typeof TaskPerformerSchema>

/**
 * Constraints on fulfillment tasks
 * If the Task.focus is a request resource and the task is seeking fulfillment (i.e. is asking for the request to be actioned), this element identifies any limitations on what parts of the referenced request should be actioned.
 * Task.restriction can only be present if the Task is seeking fulfillment of another Request resource, and the restriction identifies what subset of the authorization conveyed by the request is supposed to be fulfilled by this Task. A possible example could be a standing order (the request) covering a significant time period and/or individuals, while the Task seeks fulfillment for only a subset of that time-period and a single individual.
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
  valueInteger64: z.string().optional(),
  _valueInteger64: ElementSchema.optional(),
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
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueAvailability: AvailabilitySchema.optional(),
  valueExtendedContactDetail: ExtendedContactDetailSchema.optional(),
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
  valueInteger64: z.string().optional(),
  _valueInteger64: ElementSchema.optional(),
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
  valueDataRequirement: DataRequirementSchema.optional(),
  valueExpression: ExpressionSchema.optional(),
  valueParameterDefinition: ParameterDefinitionSchema.optional(),
  valueRelatedArtifact: RelatedArtifactSchema.optional(),
  valueTriggerDefinition: TriggerDefinitionSchema.optional(),
  valueUsageContext: UsageContextSchema.optional(),
  valueAvailability: AvailabilitySchema.optional(),
  valueExtendedContactDetail: ExtendedContactDetailSchema.optional(),
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
  statusReason: CodeableReferenceSchema.optional(),
  businessStatus: CodeableConceptSchema.optional(),
  intent: z.enum(['unknown', 'proposal', 'plan', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option']),
  _intent: ElementSchema.optional(),
  priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
  _priority: ElementSchema.optional(),
  doNotPerform: z.boolean().optional(),
  _doNotPerform: ElementSchema.optional(),
  code: CodeableConceptSchema.optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  focus: ReferenceSchema.optional(),
  for: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  requestedPeriod: PeriodSchema.optional(),
  executionPeriod: PeriodSchema.optional(),
  authoredOn: z.string().optional(),
  _authoredOn: ElementSchema.optional(),
  lastModified: z.string().optional(),
  _lastModified: ElementSchema.optional(),
  requester: ReferenceSchema.optional(),
  requestedPerformer: z.array(CodeableReferenceSchema).optional(),
  owner: ReferenceSchema.optional(),
  performer: z.array(TaskPerformerSchema).optional(),
  location: ReferenceSchema.optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
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
 * Target of the relationship
 * The target composition/document of this relationship.
 */
export const EvidenceReportRelatesToTargetSchema = BackboneElementSchema.extend({
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: IdentifierSchema.optional(),
  display: z.string().optional(),
  _display: ElementSchema.optional(),
  resource: ReferenceSchema.optional(),
})
export type EvidenceReportRelatesToTarget = z.infer<typeof EvidenceReportRelatesToTargetSchema>

/**
 * Relationships to other compositions/documents
 * Relationships that this composition has with other compositions or documents that already exist.
 * A document is a version specific composition.
 */
export const EvidenceReportRelatesToSchema = BackboneElementSchema.extend({
  code: z.enum(['replaces', 'amends', 'appends', 'transforms', 'replacedWith', 'amendedWith', 'appendedWith', 'transformedWith']),
  _code: ElementSchema.optional(),
  target: EvidenceReportRelatesToTargetSchema,
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
 * The EvidenceReport Resource is a specialized container for a collection of resources and codeable concepts, adapted to support compositions of Evidence, EvidenceVariable, and Citation resources and related concepts.
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
 * Actual statement as markdown
 * The actual statement of requirement, in markdown format.
 */
export const RequirementsStatementSchema = BackboneElementSchema.extend({
  key: z.string(),
  _key: ElementSchema.optional(),
  label: z.string().optional(),
  _label: ElementSchema.optional(),
  conformance: z.array(z.enum(['SHALL', 'SHOULD', 'MAY', 'SHOULD-NOT'])).optional(),
  _conformance: ElementSchema.optional(),
  conditionality: z.boolean().optional(),
  _conditionality: ElementSchema.optional(),
  requirement: z.string(),
  _requirement: ElementSchema.optional(),
  derivedFrom: z.string().optional(),
  _derivedFrom: ElementSchema.optional(),
  parent: z.string().optional(),
  _parent: ElementSchema.optional(),
  satisfiedBy: z.array(z.string()).optional(),
  _satisfiedBy: ElementSchema.optional(),
  reference: z.array(z.string()).optional(),
  _reference: ElementSchema.optional(),
  source: z.array(ReferenceSchema).optional(),
})
export type RequirementsStatement = z.infer<typeof RequirementsStatementSchema>

/**
 * The Requirements resource is used to describe an actor - a human or an application that plays a role in data exchange, and that may have obligations associated with the role the actor plays.
 */
export const RequirementsSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Requirements'),
  url: z.string().optional(),
  _url: ElementSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  versionAlgorithmString: z.string().optional(),
  _versionAlgorithmString: ElementSchema.optional(),
  versionAlgorithmCoding: CodingSchema.optional(),
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
  copyrightLabel: z.string().optional(),
  _copyrightLabel: ElementSchema.optional(),
  derivedFrom: z.array(z.string()).optional(),
  _derivedFrom: ElementSchema.optional(),
  reference: z.array(z.string()).optional(),
  _reference: ElementSchema.optional(),
  actor: z.array(z.string()).optional(),
  _actor: ElementSchema.optional(),
  statement: z.array(RequirementsStatementSchema).optional(),
})
export type Requirements = z.infer<typeof RequirementsSchema>

/**
 * Common Interface declaration for conformance and knowledge artifact resources.
 */
export const MetadataResourceSchema = DomainResourceSchema.extend({
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
})
export type MetadataResource = z.infer<typeof MetadataResourceSchema>

/**
 * Qualifications, certifications, accreditations, licenses, training, etc. pertaining to the provision of care
 * The official qualifications, certifications, accreditations, training, licenses (and other types of educations/skills/capabilities) that authorize or otherwise pertain to the provision of care by the practitioner.For example, a medical license issued by a medical board of licensure authorizing the practitioner to practice medicine within a certain locality.
 * The PractitionerRole.specialty defines the functional role that they are practicing at a given organization or location.  Those specialties may or might not require a qualification, and are not defined on the practitioner.
 */
export const PractitionerQualificationSchema = BackboneElementSchema.extend({
  identifier: z.array(IdentifierSchema).optional(),
  code: CodeableConceptSchema,
  period: PeriodSchema.optional(),
  issuer: ReferenceSchema.optional(),
})
export type PractitionerQualification = z.infer<typeof PractitionerQualificationSchema>

/**
 * A language which may be used to communicate with the practitioner
 * A language which may be used to communicate with the practitioner, often for correspondence/administrative purposes.The `PractitionerRole.communication` property should be used for publishing the languages that a practitioner is able to communicate with patients (on a per Organization/Role basis).
 * If no language is specified, this *implies* that the default local language is spoken.  If you need to convey proficiency for multiple modes, then you need multiple Practitioner.Communication associations.For animals, language is not a relevant field, and should be absent from the instance.
 */
export const PractitionerCommunicationSchema = BackboneElementSchema.extend({
  language: CodeableConceptSchema,
  preferred: z.boolean().optional(),
  _preferred: ElementSchema.optional(),
})
export type PractitionerCommunication = z.infer<typeof PractitionerCommunicationSchema>

/**
 * A person who is directly or indirectly involved in the provisioning of healthcare or related services.
 */
export const PractitionerSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Practitioner'),
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
  photo: z.array(AttachmentSchema).optional(),
  qualification: z.array(PractitionerQualificationSchema).optional(),
  communication: z.array(PractitionerCommunicationSchema).optional(),
})
export type Practitioner = z.infer<typeof PractitionerSchema>

/**
 * An amount of money. With regard to precision, see [Decimal Precision](datatypes.html#precision)
 */
export const MoneyQuantitySchema = QuantitySchema.extend({
})
export type MoneyQuantity = z.infer<typeof MoneyQuantitySchema>

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
  substance: CodeableReferenceSchema,
  strengthRatio: RatioSchema.optional(),
  strengthRatioRange: RatioRangeSchema.optional(),
  strengthQuantity: QuantitySchema.optional(),
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
  presentationCodeableConcept: CodeableConceptSchema.optional(),
  presentationQuantity: QuantitySchema.optional(),
  textPresentation: z.string().optional(),
  _textPresentation: ElementSchema.optional(),
  concentrationRatio: RatioSchema.optional(),
  concentrationRatioRange: RatioRangeSchema.optional(),
  concentrationCodeableConcept: CodeableConceptSchema.optional(),
  concentrationQuantity: QuantitySchema.optional(),
  textConcentration: z.string().optional(),
  _textConcentration: ElementSchema.optional(),
  basis: CodeableConceptSchema.optional(),
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
  group: CodeableConceptSchema.optional(),
  allergenicIndicator: z.boolean().optional(),
  _allergenicIndicator: ElementSchema.optional(),
  comment: z.string().optional(),
  _comment: ElementSchema.optional(),
  manufacturer: z.array(IngredientManufacturerSchema).optional(),
  substance: IngredientSubstanceSchema,
})
export type Ingredient = z.infer<typeof IngredientSchema>

/**
 * Triggering observation(s)
 * Identifies the observation(s) that triggered the performance of this observation.
 */
export const ObservationTriggeredBySchema = BackboneElementSchema.extend({
  observation: ReferenceSchema,
  type: z.enum(['reflex', 'repeat', 're-run']),
  _type: ElementSchema.optional(),
  reason: z.string().optional(),
  _reason: ElementSchema.optional(),
})
export type ObservationTriggeredBy = z.infer<typeof ObservationTriggeredBySchema>

/**
 * Provides guide for interpretation
 * Guidance on how to interpret the value by comparison to a normal or recommended range.  Multiple reference ranges are interpreted as an "OR".   In other words, to represent two distinct target populations, two `referenceRange` elements would be used.
 * Most observations only have one generic reference range. Systems MAY choose to restrict to only supplying the relevant reference range based on knowledge about the patient (e.g., specific to the patient's age, gender, weight and other factors), but this might not be possible or appropriate. Whenever more than one reference range is supplied, the differences between them SHOULD be provided in the reference range and/or age properties.
 */
export interface ObservationReferenceRange extends BackboneElement {
  low?: Quantity | undefined
  high?: Quantity | undefined
  normalValue?: CodeableConcept | undefined
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
    normalValue: CodeableConceptSchema.optional(),
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
  valueAttachment: AttachmentSchema.optional(),
  valueReference: ReferenceSchema.optional(),
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
  instantiatesCanonical: z.string().optional(),
  _instantiatesCanonical: ElementSchema.optional(),
  instantiatesReference: ReferenceSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  triggeredBy: z.array(ObservationTriggeredBySchema).optional(),
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
  valueAttachment: AttachmentSchema.optional(),
  valueReference: ReferenceSchema.optional(),
  dataAbsentReason: CodeableConceptSchema.optional(),
  interpretation: z.array(CodeableConceptSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  bodySite: CodeableConceptSchema.optional(),
  bodyStructure: ReferenceSchema.optional(),
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
 * Attests to accuracy of the document
 * A participant who has authenticated the accuracy of the document.
 * Only list each attester once.
 */
export const DocumentReferenceAttesterSchema = BackboneElementSchema.extend({
  mode: CodeableConceptSchema,
  time: z.string().optional(),
  _time: ElementSchema.optional(),
  party: ReferenceSchema.optional(),
})
export type DocumentReferenceAttester = z.infer<typeof DocumentReferenceAttesterSchema>

/**
 * Relationships to other documents
 * Relationships that this document has with other document references that already exist.
 * This element is labeled as a modifier because documents that append to other documents are incomplete on their own.
 */
export const DocumentReferenceRelatesToSchema = BackboneElementSchema.extend({
  code: CodeableConceptSchema,
  target: ReferenceSchema,
})
export type DocumentReferenceRelatesTo = z.infer<typeof DocumentReferenceRelatesToSchema>

/**
 * Content profile rules for the document
 * An identifier of the document constraints, encoding, structure, and template that the document conforms to beyond the base format indicated in the mimeType.
 * Note that IHE often issues URNs for formatCode codes, not all documents can be identified by a URI.
 */
export const DocumentReferenceContentProfileSchema = BackboneElementSchema.extend({
  valueCoding: CodingSchema.optional(),
  valueUri: z.string().optional(),
  _valueUri: ElementSchema.optional(),
  valueCanonical: z.string().optional(),
  _valueCanonical: ElementSchema.optional(),
})
export type DocumentReferenceContentProfile = z.infer<typeof DocumentReferenceContentProfileSchema>

/**
 * Document referenced
 * The document and format referenced.  If there are multiple content element repetitions, these must all represent the same document in different format, or attachment metadata.
 * content element shall not contain different versions of the same content. For version handling use multiple DocumentReference with .relatesTo.
 */
export const DocumentReferenceContentSchema = BackboneElementSchema.extend({
  attachment: AttachmentSchema,
  profile: z.array(DocumentReferenceContentProfileSchema).optional(),
})
export type DocumentReferenceContent = z.infer<typeof DocumentReferenceContentSchema>

/**
 * A reference to a document of any kind for any purpose. While the term “document” implies a more narrow focus, for this resource this “document” encompasses *any* serialized object with a mime-type, it includes formal patient-centric documents (CDA), clinical notes, scanned paper, non-patient specific documents like policy text, as well as a photo, video, or audio recording acquired or used in healthcare.  The DocumentReference resource provides metadata about the document so that the document can be discovered and managed.  The actual content may be inline base64 encoded data or provided by direct reference.
 */
export const DocumentReferenceSchema = DomainResourceSchema.extend({
  resourceType: z.literal('DocumentReference'),
  identifier: z.array(IdentifierSchema).optional(),
  version: z.string().optional(),
  _version: ElementSchema.optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  status: z.enum(['current', 'superseded', 'entered-in-error']),
  _status: ElementSchema.optional(),
  docStatus: z.enum(['registered', 'partial', 'preliminary', 'final', 'amended', 'corrected', 'appended', 'cancelled', 'entered-in-error', 'deprecated', 'unknown']).optional(),
  _docStatus: ElementSchema.optional(),
  modality: z.array(CodeableConceptSchema).optional(),
  type: CodeableConceptSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  subject: ReferenceSchema.optional(),
  context: z.array(ReferenceSchema).optional(),
  event: z.array(CodeableReferenceSchema).optional(),
  bodySite: z.array(CodeableReferenceSchema).optional(),
  facilityType: CodeableConceptSchema.optional(),
  practiceSetting: CodeableConceptSchema.optional(),
  period: PeriodSchema.optional(),
  date: z.string().optional(),
  _date: ElementSchema.optional(),
  author: z.array(ReferenceSchema).optional(),
  attester: z.array(DocumentReferenceAttesterSchema).optional(),
  custodian: ReferenceSchema.optional(),
  relatesTo: z.array(DocumentReferenceRelatesToSchema).optional(),
  description: z.string().optional(),
  _description: ElementSchema.optional(),
  securityLabel: z.array(CodeableConceptSchema).optional(),
  content: z.array(DocumentReferenceContentSchema),
})
export type DocumentReference = z.infer<typeof DocumentReferenceSchema>

/**
 * A single issue associated with the action
 * An error, warning, or information message that results from a system action.
 */
export const OperationOutcomeIssueSchema = BackboneElementSchema.extend({
  severity: z.enum(['fatal', 'error', 'warning', 'information', 'success']),
  _severity: ElementSchema.optional(),
  code: z.enum(['invalid', 'structure', 'required', 'value', 'invariant', 'security', 'login', 'unknown', 'expired', 'forbidden', 'suppressed', 'processing', 'not-supported', 'duplicate', 'multiple-matches', 'not-found', 'deleted', 'too-long', 'code-invalid', 'extension', 'too-costly', 'business-rule', 'conflict', 'limited-filter', 'transient', 'lock-error', 'no-store', 'exception', 'timeout', 'incomplete', 'throttled', 'informational', 'success']),
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
  responsibleParty: ReferenceSchema.optional(),
})
export type MedicationDispenseSubstitution = z.infer<typeof MedicationDispenseSubstitutionSchema>

/**
 * Indicates that a medication product is to be or has been dispensed for a named person/patient.  This includes a description of the medication product (supply) provided and the instructions for administering the medication.  The medication dispense is the result of a pharmacy system responding to a medication order.
 */
export const MedicationDispenseSchema = DomainResourceSchema.extend({
  resourceType: z.literal('MedicationDispense'),
  identifier: z.array(IdentifierSchema).optional(),
  basedOn: z.array(ReferenceSchema).optional(),
  partOf: z.array(ReferenceSchema).optional(),
  status: z.enum(['preparation', 'in-progress', 'cancelled', 'on-hold', 'completed', 'entered-in-error', 'stopped', 'declined', 'unknown']),
  _status: ElementSchema.optional(),
  notPerformedReason: CodeableReferenceSchema.optional(),
  statusChanged: z.string().optional(),
  _statusChanged: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  medication: CodeableReferenceSchema,
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  performer: z.array(MedicationDispensePerformerSchema).optional(),
  location: ReferenceSchema.optional(),
  authorizingPrescription: z.array(ReferenceSchema).optional(),
  type: CodeableConceptSchema.optional(),
  quantity: QuantitySchema.optional(),
  daysSupply: QuantitySchema.optional(),
  recorded: z.string().optional(),
  _recorded: ElementSchema.optional(),
  whenPrepared: z.string().optional(),
  _whenPrepared: ElementSchema.optional(),
  whenHandedOver: z.string().optional(),
  _whenHandedOver: ElementSchema.optional(),
  destination: ReferenceSchema.optional(),
  receiver: z.array(ReferenceSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  renderedDosageInstruction: z.string().optional(),
  _renderedDosageInstruction: ElementSchema.optional(),
  dosageInstruction: z.array(DosageSchema).optional(),
  substitution: MedicationDispenseSubstitutionSchema.optional(),
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
 * The list of diagnoses relevant to this account
 * When using an account for billing a specific Encounter the set of diagnoses that are relevant for billing are stored here on the account where they are able to be sequenced appropriately prior to processing to produce claim(s).
 */
export const AccountDiagnosisSchema = BackboneElementSchema.extend({
  sequence: z.number().optional(),
  _sequence: ElementSchema.optional(),
  condition: CodeableReferenceSchema,
  dateOfDiagnosis: z.string().optional(),
  _dateOfDiagnosis: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  onAdmission: z.boolean().optional(),
  _onAdmission: ElementSchema.optional(),
  packageCode: z.array(CodeableConceptSchema).optional(),
})
export type AccountDiagnosis = z.infer<typeof AccountDiagnosisSchema>

/**
 * The list of procedures relevant to this account
 * When using an account for billing a specific Encounter the set of procedures that are relevant for billing are stored here on the account where they are able to be sequenced appropriately prior to processing to produce claim(s).
 */
export const AccountProcedureSchema = BackboneElementSchema.extend({
  sequence: z.number().optional(),
  _sequence: ElementSchema.optional(),
  code: CodeableReferenceSchema,
  dateOfService: z.string().optional(),
  _dateOfService: ElementSchema.optional(),
  type: z.array(CodeableConceptSchema).optional(),
  packageCode: z.array(CodeableConceptSchema).optional(),
  device: z.array(ReferenceSchema).optional(),
})
export type AccountProcedure = z.infer<typeof AccountProcedureSchema>

/**
 * Other associated accounts related to this account
 */
export const AccountRelatedAccountSchema = BackboneElementSchema.extend({
  relationship: CodeableConceptSchema.optional(),
  account: ReferenceSchema,
})
export type AccountRelatedAccount = z.infer<typeof AccountRelatedAccountSchema>

/**
 * Calculated account balance(s)
 * The calculated account balances - these are calculated and processed by the finance system.The balances with a `term` that is not current are usually generated/updated by an invoicing or similar process.
 */
export const AccountBalanceSchema = BackboneElementSchema.extend({
  aggregate: CodeableConceptSchema.optional(),
  term: CodeableConceptSchema.optional(),
  estimate: z.boolean().optional(),
  _estimate: ElementSchema.optional(),
  amount: MoneySchema,
})
export type AccountBalance = z.infer<typeof AccountBalanceSchema>

/**
 * A financial tool for tracking value accrued for a particular purpose.  In the healthcare field, used to track charges for a patient, cost centers, etc.
 */
export const AccountSchema = DomainResourceSchema.extend({
  resourceType: z.literal('Account'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error', 'on-hold', 'unknown']),
  _status: ElementSchema.optional(),
  billingStatus: CodeableConceptSchema.optional(),
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
  diagnosis: z.array(AccountDiagnosisSchema).optional(),
  procedure: z.array(AccountProcedureSchema).optional(),
  relatedAccount: z.array(AccountRelatedAccountSchema).optional(),
  currency: CodeableConceptSchema.optional(),
  balance: z.array(AccountBalanceSchema).optional(),
  calculatedAt: z.string().optional(),
  _calculatedAt: ElementSchema.optional(),
})
export type Account = z.infer<typeof AccountSchema>

/**
 * Who performed the procedure and what they did
 * Indicates who or what performed the procedure and how they were involved.
 */
export const ProcedurePerformerSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
  onBehalfOf: ReferenceSchema.optional(),
  period: PeriodSchema.optional(),
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
 * An action that is or was performed on or for a patient, practitioner, device, organization, or location. For example, this can be a physical intervention on a patient like an operation, or less invasive like long term services, counseling, or hypnotherapy.  This can be a quality or safety inspection for a location, organization, or device.  This can be an accreditation procedure on a practitioner for licensing.
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
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema.optional(),
  subject: ReferenceSchema,
  focus: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  occurrenceString: z.string().optional(),
  _occurrenceString: ElementSchema.optional(),
  occurrenceAge: AgeSchema.optional(),
  occurrenceRange: RangeSchema.optional(),
  occurrenceTiming: TimingSchema.optional(),
  recorded: z.string().optional(),
  _recorded: ElementSchema.optional(),
  recorder: ReferenceSchema.optional(),
  reportedBoolean: z.boolean().optional(),
  _reportedBoolean: ElementSchema.optional(),
  reportedReference: ReferenceSchema.optional(),
  performer: z.array(ProcedurePerformerSchema).optional(),
  location: ReferenceSchema.optional(),
  reason: z.array(CodeableReferenceSchema).optional(),
  bodySite: z.array(CodeableConceptSchema).optional(),
  outcome: CodeableConceptSchema.optional(),
  report: z.array(ReferenceSchema).optional(),
  complication: z.array(CodeableReferenceSchema).optional(),
  followUp: z.array(CodeableConceptSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
  focalDevice: z.array(ProcedureFocalDeviceSchema).optional(),
  used: z.array(CodeableReferenceSchema).optional(),
  supportingInfo: z.array(ReferenceSchema).optional(),
})
export type Procedure = z.infer<typeof ProcedureSchema>

/**
 * This subclause refers to the description of each subunit constituting the SubstanceProtein. A subunit is a linear sequence of amino acids linked through peptide bonds. The Subunit information shall be provided when the finished SubstanceProtein is a complex of multiple sequences; subunits are not used to delineate domains within a single sequence. Subunits are listed in order of decreasing length; sequences of the same length will be ordered by decreasing molecular weight; subunits that have identical sequences will be repeated multiple times
 */
export const SubstanceProteinSubunitSchema = BackboneElementSchema.extend({
  subunit: z.number().optional(),
  _subunit: ElementSchema.optional(),
  sequence: z.string().optional(),
  _sequence: ElementSchema.optional(),
  length: z.number().optional(),
  _length: ElementSchema.optional(),
  sequenceAttachment: AttachmentSchema.optional(),
  nTerminalModificationId: IdentifierSchema.optional(),
  nTerminalModification: z.string().optional(),
  _nTerminalModification: ElementSchema.optional(),
  cTerminalModificationId: IdentifierSchema.optional(),
  cTerminalModification: z.string().optional(),
  _cTerminalModification: ElementSchema.optional(),
})
export type SubstanceProteinSubunit = z.infer<typeof SubstanceProteinSubunitSchema>

/**
 * A SubstanceProtein is defined as a single unit of a linear amino acid sequence, or a combination of subunits that are either covalently linked or have a defined invariant stoichiometric relationship. This includes all synthetic, recombinant and purified SubstanceProteins of defined sequence, whether the use is therapeutic or prophylactic. This set of elements will be used to describe albumins, coagulation factors, cytokines, growth factors, peptide/SubstanceProtein hormones, enzymes, toxins, toxoids, recombinant vaccines, and immunomodulators.
 */
export const SubstanceProteinSchema = DomainResourceSchema.extend({
  resourceType: z.literal('SubstanceProtein'),
  sequenceType: CodeableConceptSchema.optional(),
  numberOfSubunits: z.number().optional(),
  _numberOfSubunits: ElementSchema.optional(),
  disulfideLinkage: z.array(z.string()).optional(),
  _disulfideLinkage: ElementSchema.optional(),
  subunit: z.array(SubstanceProteinSubunitSchema).optional(),
})
export type SubstanceProtein = z.infer<typeof SubstanceProteinSchema>

/**
 * Who was involved in the adverse event or the potential adverse event and what they did
 * Indicates who or what participated in the adverse event and how they were involved.
 */
export const AdverseEventParticipantSchema = BackboneElementSchema.extend({
  function: CodeableConceptSchema.optional(),
  actor: ReferenceSchema,
})
export type AdverseEventParticipant = z.infer<typeof AdverseEventParticipantSchema>

/**
 * Information on the possible cause of the event
 */
export const AdverseEventSuspectEntityCausalitySchema = BackboneElementSchema.extend({
  assessmentMethod: CodeableConceptSchema.optional(),
  entityRelatedness: CodeableConceptSchema.optional(),
  author: ReferenceSchema.optional(),
})
export type AdverseEventSuspectEntityCausality = z.infer<typeof AdverseEventSuspectEntityCausalitySchema>

/**
 * The suspected agent causing the adverse event
 * Describes the entity that is suspected to have caused the adverse event.
 */
export const AdverseEventSuspectEntitySchema = BackboneElementSchema.extend({
  instanceCodeableConcept: CodeableConceptSchema.optional(),
  instanceReference: ReferenceSchema.optional(),
  causality: AdverseEventSuspectEntityCausalitySchema.optional(),
})
export type AdverseEventSuspectEntity = z.infer<typeof AdverseEventSuspectEntitySchema>

/**
 * Contributing factors suspected to have increased the probability or severity of the adverse event
 * The contributing factors suspected to have increased the probability or severity of the adverse event.
 */
export const AdverseEventContributingFactorSchema = BackboneElementSchema.extend({
  itemReference: ReferenceSchema.optional(),
  itemCodeableConcept: CodeableConceptSchema.optional(),
})
export type AdverseEventContributingFactor = z.infer<typeof AdverseEventContributingFactorSchema>

/**
 * Preventive actions that contributed to avoiding the adverse event
 */
export const AdverseEventPreventiveActionSchema = BackboneElementSchema.extend({
  itemReference: ReferenceSchema.optional(),
  itemCodeableConcept: CodeableConceptSchema.optional(),
})
export type AdverseEventPreventiveAction = z.infer<typeof AdverseEventPreventiveActionSchema>

/**
 * Ameliorating actions taken after the adverse event occured in order to reduce the extent of harm
 * The ameliorating action taken after the adverse event occured in order to reduce the extent of harm.
 */
export const AdverseEventMitigatingActionSchema = BackboneElementSchema.extend({
  itemReference: ReferenceSchema.optional(),
  itemCodeableConcept: CodeableConceptSchema.optional(),
})
export type AdverseEventMitigatingAction = z.infer<typeof AdverseEventMitigatingActionSchema>

/**
 * Supporting information relevant to the event
 */
export const AdverseEventSupportingInfoSchema = BackboneElementSchema.extend({
  itemReference: ReferenceSchema.optional(),
  itemCodeableConcept: CodeableConceptSchema.optional(),
})
export type AdverseEventSupportingInfo = z.infer<typeof AdverseEventSupportingInfoSchema>

/**
 * An event (i.e. any change to current patient status) that may be related to unintended effects on a patient or research participant. The unintended effects may require additional monitoring, treatment, hospitalization, or may result in death. The AdverseEvent resource also extends to potential or avoided events that could have had such effects. There are two major domains where the AdverseEvent resource is expected to be used. One is in clinical care reported adverse events and the other is in reporting adverse events in clinical  research trial management.  Adverse events can be reported by healthcare providers, patients, caregivers or by medical products manufacturers.  Given the differences between these two concepts, we recommend consulting the domain specific implementation guides when implementing the AdverseEvent Resource. The implementation guides include specific extensions, value sets and constraints.
 */
export const AdverseEventSchema = DomainResourceSchema.extend({
  resourceType: z.literal('AdverseEvent'),
  identifier: z.array(IdentifierSchema).optional(),
  status: z.enum(['in-progress', 'completed', 'entered-in-error', 'unknown']),
  _status: ElementSchema.optional(),
  actuality: z.enum(['actual', 'potential']),
  _actuality: ElementSchema.optional(),
  category: z.array(CodeableConceptSchema).optional(),
  code: CodeableConceptSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  occurrenceDateTime: z.string().optional(),
  _occurrenceDateTime: ElementSchema.optional(),
  occurrencePeriod: PeriodSchema.optional(),
  occurrenceTiming: TimingSchema.optional(),
  detected: z.string().optional(),
  _detected: ElementSchema.optional(),
  recordedDate: z.string().optional(),
  _recordedDate: ElementSchema.optional(),
  resultingEffect: z.array(ReferenceSchema).optional(),
  location: ReferenceSchema.optional(),
  seriousness: CodeableConceptSchema.optional(),
  outcome: z.array(CodeableConceptSchema).optional(),
  recorder: ReferenceSchema.optional(),
  participant: z.array(AdverseEventParticipantSchema).optional(),
  study: z.array(ReferenceSchema).optional(),
  expectedInResearchStudy: z.boolean().optional(),
  _expectedInResearchStudy: ElementSchema.optional(),
  suspectEntity: z.array(AdverseEventSuspectEntitySchema).optional(),
  contributingFactor: z.array(AdverseEventContributingFactorSchema).optional(),
  preventiveAction: z.array(AdverseEventPreventiveActionSchema).optional(),
  mitigatingAction: z.array(AdverseEventMitigatingActionSchema).optional(),
  supportingInfo: z.array(AdverseEventSupportingInfoSchema).optional(),
  note: z.array(AnnotationSchema).optional(),
})
export type AdverseEvent = z.infer<typeof AdverseEventSchema>
