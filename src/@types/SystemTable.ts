import {
  AbnormalitiesTableSchema,
  AllergySchema,
  AppointmentTypeSchema,
  BlockOffTableSchema,
  BodySubsystemSchema,
  BreedSchema,
  ChemistrySchema,
  ColorSchema,
  CompanySchema,
  ContractPricesSchema,
  DiscountClassTableSchema,
  InsuranceProviderSchema,
  UnitOfMeasuresTableSchema,
  VaccineSchema,
  WhiteBoardCategorySchema,
  WorkListTableSchema,
  ZipCodeSchema,
} from "@src/schema/SystemTable";
import {z} from "zod";

export type AbnormalitiesTablTypeFields = z.infer<typeof AbnormalitiesTableSchema>;
export type AllergyTypeFields = z.infer<typeof AllergySchema>;
export type BodySubsystemTypeFields = z.infer<typeof BodySubsystemSchema>;
export type ColorTypeFields = z.infer<typeof ColorSchema>;
export type CompanyTypeFields = z.infer<typeof CompanySchema>;
export type BreedTypeFields = z.infer<typeof BreedSchema>;
export type ChemistryTypeFields = z.infer<typeof ChemistrySchema>;
export type AppointmentTypeTypeFields = z.infer<typeof AppointmentTypeSchema>;
export type WhiteBoardCategoryTypeFields = z.infer<typeof WhiteBoardCategorySchema>;
export type ContractPricesTypeFields = z.infer<typeof ContractPricesSchema>;
export type InsuranceProviderTypeFields = z.infer<typeof InsuranceProviderSchema>;
export type VaccineTypeFields = z.infer<typeof VaccineSchema>;
export type ZipCodeTypeFields = z.infer<typeof ZipCodeSchema>;
export type BlockOffTableTypeFields = z.infer<typeof BlockOffTableSchema>;
export type WorkListTableTypeFields = z.infer<typeof WorkListTableSchema>;
export type UnitOfMeasuresTableTypeFields = z.infer<typeof UnitOfMeasuresTableSchema>;
export type DiscountClassTableTypeFields = z.infer<typeof DiscountClassTableSchema>;

export const AbnormalitiesTablDefaultValues: AbnormalitiesTablTypeFields = {
  id: "",
  table: "",
  code: "",
  abnormality: "",
  normal: "",
  notExamined: "",
};

// allergy
export const AllergyTablDefaultValues: AllergyTypeFields = {
  id: "",
  table: "",
  name: "",
  description: "",
};

// body subsystem
export const BodySubsystemDefaultValues: BodySubsystemTypeFields = {
  id: "",
  table: "",
  code: "",
  description: "",
};

// color
export const ColorDefaultValues: ColorTypeFields = {
  id: "",
  table: "",
  code: "",
  name: "",
  colorCategory: "",
  species: "",
};

// company
export const CompanyDefaultValues: CompanyTypeFields = {
  id: "",
  table: "",
  code: "",
  companyName: "",
  phone: "",
  leftMargin: "",
  topMargin: "",
  isBorder: "",
  colorDto: "",
};

// breed
export const BreedDefaultValues: BreedTypeFields = {
  id: "",
  table: "",
  species: "",
  code: "",
  type: "",
  name: "",
};

// Chemistry
export const ChemistryDefaultValues: ChemistryTypeFields = {
  id: "",
  table: "",
  code: "",
  description: "",
};

// appointment Type
export const AppointmentTypeDefaultValues: AppointmentTypeTypeFields = {
  id: "",
  table: "",
  code: "",
  description: "",
  color: "",
  duration: "",
};

// white board category
export const WhiteBoardCategoryDefaultValues: WhiteBoardCategoryTypeFields = {
  id: "",
  table: "",
  code: "",
  description: "",
};

// Contract Prices
export const ContractPricesDefaultValues: ContractPricesTypeFields = {
  id: "",
  table: "",
  name: "",
  description: "",
};

// Insurance provider
export const InsuranceProviderDefaultValues: InsuranceProviderTypeFields = {
  id: "",
  table: "",
  code: "",
  tableName: "",
  name: "",
  description: "",
  phone: "",
  website: "",
  vetEnvoyId: "",
};

// vaccine
export const VaccineDefaultValues: VaccineTypeFields = {
  id: "",
  table: "",
  vaccine: "",
  serial: "",
  expiration: "",
  manufacturer: "",
  virus: "",
  administered: "",
};

// zip code
export const ZipCodeDefaultValues: ZipCodeTypeFields = {
  id: "",
  table: "",
  tableName: "",
  zipCode: "",
  city: "",
  province: "",
  area: "",
  taxArea: "",
  country: "",
};

// zip code
export const BlockOffTableDefaultValues: BlockOffTableTypeFields = {
  id: "",
  table: "",
  code: "",
  color: "",
  description: "",
};

// worklist
export const WorkListTableDefaultValues: WorkListTableTypeFields = {
  id: "",
  table: "",
  code: "",
  description: "",
  listCode: "",
};

export const UnitOfMeasuresDefaultValues: UnitOfMeasuresTableTypeFields = {
  id: "",
  table: "",
  code: "",
  description: "",
};

// discount class
export const DiscountClassDefaultValues: DiscountClassTableTypeFields = {
  id: "",
  table: "",
  code: "",
  discountClass: "",
};
