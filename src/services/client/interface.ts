import {ClientRegistrationType} from "@src/pages/Client/form";
import {IPatientList} from "../patient/interface";

export interface IClient {
  id?: number;
  lastName?: string;
  firstName?: string;
  title?: string;
  address?: string;
  address1?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  phoneNo?: string;
  faxNo?: number;
  workPhoneNo?: string;
  workPhoneCode?: string;
  cellNo?: string;
  country?: string;
  spousePhoneNo?: string;
  contactPreference?: string;
  email?: string;
  historyZip?: string;
  insuranceName?: string;
  petOwnerName?: string;
  insurancePolicyNumber?: string;
  employerName?: string;
  relationshipType?: string;
  relationshipName?: string;
  preferredDoctor?: string;
  businessReferral?: string;
  referralCategory?: string;
  dateOfBirth?: string;
  createdAt?: string;
  createdBy?: string;
  codes?: string[];
  folder?: number;
  co?: string;
  contractPriceType?: number;
  cellCode?: string;
  spouseCellCode?: string;
  clientSuspendDate?: string;
  clientClass?: string;
  statementSite?: string;
  quantity?: string;
  spouseWorkPhoneNo?: string;
  spouseWorkPhoneCode?: string;
  phoneCode?: string;
  set?: boolean;
  suspendedReminder?: boolean;
  clientReferral?: string;
  clientBusinessReferral?: string;
  patientList?: IPatientList[];
}

interface ISearchClient {
  client?: string;
  phoneNo?: string;
  folder?: string;
  account_no?: string;
  patientName?: string;
  tag?: string;
  microchip?: string;
  patientId?: string;
  patient_record?: string;
}
export interface ISearchCriteriaProps {
  searchCriteria: ISearchClient;
}
export interface IUpdateClient extends ClientRegistrationType {
  id: string | number;
}
