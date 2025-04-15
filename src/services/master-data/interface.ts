export type Data = Record<string, string>;

export interface MasterData {
  zipCode: Data;
  country: Data;
  codes: Data;
  businessReferralCategory: Data;
  referralCategory: Data;
  relationshipType: Data;
  contactPreference: Data;
  historyZip: Data;
  statementSites: Data;
  title: Data;
  class: Data;
  contractPriceType: Data;
  preferredDoctor: Data;
  state: Data;
}

export interface MasterDataPatient {
  codes: Data;
  wellnessDiscount: Data;
  color: Data;
  species: Data;
  sex: Data;
  allergy: Data;
  class: Data;
  weightUnit: Data;
  insuranceProviders: Data;
}
