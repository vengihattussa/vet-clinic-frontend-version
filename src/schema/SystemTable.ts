import {z} from "zod";

export const AbnormalitiesTableSchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  abnormality: z.string(),
  normal: z.string(),
  notExamined: z.string(),
});

// Allergy
export const AllergySchema = z.object({
  id: z.string(),
  table: z.string(),
  name: z.string(),
  description: z.string(),
});

// body subsystem
export const BodySubsystemSchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),

  description: z.string(),
});

// color
export const ColorSchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  name: z.string(),
  colorCategory: z.string(),
  species: z.string(),
});

// Company
export const CompanySchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  companyName: z.string(),
  phone: z.string(),
  leftMargin: z.string(),
  topMargin: z.string(),
  isBorder: z.string(),
  colorDto: z.string(),
});

// Breed
export const BreedSchema = z.object({
  id: z.string(),
  table: z.string(),
  species: z.string(),
  code: z.string(),
  type: z.string(),
  name: z.string(),
});

// Chemistry
export const ChemistrySchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  description: z.string(),
});

// Appointment Type
export const AppointmentTypeSchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  description: z.string(),
  color: z.string(),
  duration: z.string(),
});

// white board category
export const WhiteBoardCategorySchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  description: z.string(),
});

// Contract prices
export const ContractPricesSchema = z.object({
  id: z.string(),
  table: z.string(),
  name: z.string(),
  description: z.string(),
});

// Insurance Provider
export const InsuranceProviderSchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  tableName: z.string(),
  name: z.string(),
  description: z.string(),
  phone: z.string(),
  website: z.string(),
  vetEnvoyId: z.string(),
});

// vaccine
export const VaccineSchema = z.object({
  id: z.string(),
  table: z.string(),
  vaccine: z.string(),
  serial: z.string(),
  expiration: z.string(),
  manufacturer: z.string(),
  virus: z.string(),
  administered: z.string(),
});

// zip code
export const ZipCodeSchema = z.object({
  id: z.string(),
  table: z.string(),
  tableName: z.string(),
  zipCode: z.string(),
  city: z.string(),
  province: z.string(),
  area: z.string(),
  taxArea: z.string(),
  country: z.string(),
});

// block off table
export const BlockOffTableSchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  color: z.string(),
  description: z.string(),
});

//work list
export const WorkListTableSchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  description: z.string(),
  listCode: z.string(),
});

// UnitOfMeasures;
export const UnitOfMeasuresTableSchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  description: z.string(),
});

// DiscountClassTableSchema
export const DiscountClassTableSchema = z.object({
  id: z.string(),
  table: z.string(),
  code: z.string(),
  discountClass: z.string(),
});
