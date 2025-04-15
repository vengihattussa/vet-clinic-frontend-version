import {medicalConditionSchema} from "@src/schema/medicalcondition";
import z from "zod";

export interface Abnormality {
  note: string;
  type: string;
  isChecked: boolean;
}

export interface IMedicalCondition {
  weight: number;
  temp: number;
  heartRate: number;
  resp: number;
  crt: number;
  bcs: number;
  bcsOf: number;
  other: number;
  otherOf: number;
  painScale: number;
  presentingProblem: string;
  admittedBy: number;
  postFor: number;
  vitalOnly: boolean;
  subjective: string;
  note: string;
  objective: string;
  clientInstruction: string;
  medicalHistoryId: number;
  id: number;
  abnormalityList: IUser[];
}
export interface IUserDetails {
  label?: string;
  name?: string;
  labelWidth?: string;
  isChecked?: boolean;
  note?: string;
  type?: string;
}

export interface IUser {
  label: string;
  name: string;
  labelWidth: string;
  isChecked: boolean;
  note: string;
}
export type IMedicalConditionFields = z.infer<typeof medicalConditionSchema>;
