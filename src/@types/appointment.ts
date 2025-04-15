import {addAppointmentSchema} from "@src/schema/appointment";
import {z} from "zod";

export type AddAppointmentType = z.infer<typeof addAppointmentSchema>;

export const appointmentDefaultValue: AddAppointmentType = {
  date: "",
  time: "",
  createdAt: "",
  doctorId: "",
  createdBy: "",
  roomId: "",
  minutes: 0,
  clientId: "",
  phoneCode: "",
  phoneNo: "",
  patientId: "",
  speciesId: "",
  breedId: "",
  weight: "",
  notes: "",
  status: "1",
  items: "",
  type: "",
  reminder: "",
  patientNames: "",
};
