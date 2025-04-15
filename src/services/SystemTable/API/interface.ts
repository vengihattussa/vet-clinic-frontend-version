export type SystemTableDefaultValues = {
  id: string | number;
  name: string;
  description: string;
};

type ICategory = {
  id: number;
  name: string;
  description: string;
};

export type CategoryDataType = ICategory[];

export type AllergyTableResponse = {
  id: number;
  name: string;
  description: string;
};

export type AllergyTableValue = AllergyTableResponse[];
