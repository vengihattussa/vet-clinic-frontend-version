import AddOrEditSystemTable from "../Forms/AddOrEditSystemTable";
import AllergyForm from "../Forms/AllergyForm";
import AppointmentTypeForm from "../Forms/AppointementTypeForm";
import BlockOffTableForm from "../Forms/BlockOffTableForm";
import BodySubsystemForm from "../Forms/BodySubsystemTableForm";
import BreedTableForm from "../Forms/BreedTableForm";
import ChemistryTableForm from "../Forms/ChemistryTableForm";
import ColorTableForm from "../Forms/ColorTableForm";
import CompanyTableForm from "../Forms/CompanyTableForm";
import ContractPricesForm from "../Forms/ContractPricesForm";
import DiscountClassForm from "../Forms/DiscountClass";
import InsuranceProviderForm from "../Forms/InsuranceProviderForm";
import UnitOfMeasuresForm from "../Forms/UnitOfMeasuresForm";
import VaccineForm from "../Forms/VaccineForm";
import WhiteBoardCategoryForm from "../Forms/WhiteBoardCategoryForm";
import WorkListForm from "../Forms/WorkListForm";
import ZipCodeForm from "../Forms/ZipCodeForm";
export const COMPONENT_REGISTRY = {
  1: AddOrEditSystemTable,
  4: AllergyForm,
  5: AppointmentTypeForm,
  8: BlockOffTableForm,
  9: BodySubsystemForm,
  10: BreedTableForm,
  11: ChemistryTableForm,
  12: DiscountClassForm,
  15: ColorTableForm,
  17: CompanyTableForm,
  18: WhiteBoardCategoryForm,
  19: ContractPricesForm,
  20: InsuranceProviderForm,
  21: VaccineForm,
  23: WorkListForm,
  24: UnitOfMeasuresForm,
  25: ZipCodeForm,
} as const;

export type CategoryComponentMap = typeof COMPONENT_REGISTRY;
export type CategoryID = keyof CategoryComponentMap;
