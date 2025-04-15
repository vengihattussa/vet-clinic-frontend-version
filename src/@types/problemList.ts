import {problemListSchema, remindAsSchema, documentSchema} from "@src/schema/problemList";
import z from "zod";

export interface ProblemListValues {
  category: string;
  code: string;
  description: string;
  actionCodes: string;
  species: string;
  whiteboard: string;
  company: string;
}

export type ProblemListModalValues = z.infer<typeof problemListSchema>;

export const problemListDefultValues = <ProblemListModalValues>{
  problemCategoryId: "",
  code: "",
  description: "",
  actioncode: "",
  speciesId: "",
  whiteBoard: "",
};

export type RemindAsModalValues = z.infer<typeof remindAsSchema>;

export const remindAdDefaultValues = <RemindAsModalValues>{
  remindas: "",
};
export type ProblemListDocumentValues = z.infer<typeof documentSchema>;
export const documentDefaultValues = <ProblemListDocumentValues>{
  docsDesc: "",
  doc: null as unknown as File | null,
};

export type ProblemListColumnHelper = {
  id: string | number;
  code: string;
  description: string;
  name?: string;
};
export type ProblemListDocumentColumnHelper = {
  id: string | number;
  docsPath: string;
  docsDesc: string;
};
export type ProblemListTableValues = ProblemListColumnHelper[];
