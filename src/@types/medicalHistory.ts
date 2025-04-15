import {addMedicalHistorySchema} from "@src/schema/medicalHistory";
import {z} from "zod";

export type AddMedicalHistoryFormValues = z.infer<typeof addMedicalHistorySchema>;
export const medicalHistoryDefaultValues: AddMedicalHistoryFormValues = {
  recordDate: "",
  patientId: "",
  code: "",
  description: "",
  quantity: 1,
  amount: 0,
  photo: null as unknown as File | null,
  co: "",
  recordTime: "",
  typeId: "",

  formNo: null as unknown as File | null,
  xlsFilePath: null as unknown as File | null,
  problemId: "",
  isPublic: false,
  variance: "",
  variance2: "",
  createdBy: 0,
  siteId: "",
  journal: null as unknown as File | null,
  zipCode: "",
  isCarePlan: false,
  doctorId: "",
  admittedId: "",
};
