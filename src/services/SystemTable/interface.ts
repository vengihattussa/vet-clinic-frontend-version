export type SystemTableDefaultValues = {
  id: string | number;
  table: string | null | undefined;
  code: string;
  abnormality: string;
  normal?: string;
  notExamined: string;
};

type ICategory = {
  id: number;
  name: string;
  description: string;
};
export type CategoryDataType = ICategory[];

export type SystemTableResponse = {
  id: string | number;
  code: string;
  abnormality: string;
  normal: string;
  notExamined: string;
};

export type SystemTableValue = SystemTableResponse[];
