import {IPatientRegistrationFormValues} from "@src/pages/Patient/Registration/form";

export interface ICreatePatient {
  id?: number;
  name?: string;
  species?: string;
  breed?: string;
  color?: string;
  dateOfBirth?: string;
  isDobUnknown?: boolean;
  age?: string;
  sex?: string;
  weight?: number;
  weightUnit?: string;
  codes?: [string];
  certificate?: string;
  rabies?: string;
  patientRecordId?: string;
  microchip: number;
  plan?: string;
  photo?: string;
  folder?: number;
  patientClass?: string;
  wellnessDiscount?: string;
  createdDate?: string;
  reminderDate?: string;
  allergy?: [string];
  suspendedDate?: string;
  deceasedDate?: string;
  clientId?: string;
  policyHolder?: string;
  policyNumber?: string;
  insuranceProvider?: string;
  wasPreviouslyInsured?: boolean;
  removePolicy?: boolean;
  breedMixed?: boolean;
}
export interface IPatientList {
  codes: string;
  species: string;
  name: string;
  weight: string;
  rabies: string;
  id: string;
  age: string;
  breed: string;
  weightUnit?: string;
  sex: string;
}

export interface IUpdatePatient extends IPatientRegistrationFormValues {
  id: string | number;
}
