import {ProblemListDocumentColumnHelper} from "@src/@types/problemList";

type ProblemCategory = {
  id: number;
  name: string;
  description: string;
};

export type IProblemCategory = ProblemCategory[];

export type ISaveProblemProps = {
  id?: string | number;
  whiteBoard: string;
  speciesId: string;
  actioncode: string;
  description: string;
  code: string;
  // name: string;

  problemCategoryId: string;
};

export type DocumentTypeProps = {
  id?: number | string;
  docsDesc: string;
  doc: File | null;
};

export type DocumentResponse = ProblemListDocumentColumnHelper[];

export type IProblemListData = {
  id?: number;
  description: string;
  code: string;
  name: string;
  problemCategoryId: number;
  speciesId: string;
};
