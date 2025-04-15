import {requiredString, requiredNumber} from "@src/common/Form/schemas";
import z from "zod";

// Define the schema for IUserDetails
export const userDetailsSchema = z.object({
  label: z.string().optional(),
  name: z.string().optional(),
  labelWidth: z.string().optional(),
  isChecked: z.boolean().optional(),
  note: z.string().optional(),
  type: z.string().optional(),
});

// Define the schema for IMedicalCondition
export const medicalConditionSchema = z.object({
  weight: requiredNumber("Weight"),
  temp: requiredNumber("Temperature"),
  heartRate: requiredNumber("Heart Rate"),
  resp: requiredNumber("Respiration"),
  crt: requiredNumber("Capillary Refill Time"),
  bcs: requiredNumber("Body Condition Score"),
  bcsOf: requiredNumber("Body Condition Score Out Of"),
  other: requiredNumber("Other"),
  otherOf: requiredNumber("Other Out Of"),
  painScale: requiredNumber("Pain Scale"),
  presentingProblem: requiredString("Presenting Problem"),
  admittedBy: requiredNumber("Admitted By"),
  postFor: requiredNumber("Post For"),
  vitalOnly: z.boolean(),
  subjective: requiredString("Subjective"),
  note: requiredString("Note"),
  objective: requiredString("Objective"),
  clientInstruction: requiredString("Client Instruction"),
  medicalHistoryId: requiredNumber("Medical History ID"),
  id: requiredNumber("ID"),
  abnormalityList: z.array(userDetailsSchema),
});
