import {notRequired, requiredString} from "@src/common/Form/schemas";
import {z} from "zod";

// const timeRegex = /^(0?[1-9]|1[0-2])[:.][0-5][0-9] (AM|PM)$/;
const timeRegex = /^(?:[01]?[0-9]|2[0-3]):(00|30)$/;

export const addAppointmentSchema = z.object({
  // date: requiredDate("Date"),
  // time: z.string().min(1, {message: "Time is required."}),
  date: z.string().min(1, {message: "Date is Required"}),
  time: z.string().refine((val) => timeRegex.test(val), {
    message: "Invalid time format (e.g.08:30 AM)",
  }),
  createdAt: notRequired(),
  doctorId: requiredString("Doctor name"),
  createdBy: notRequired(),
  roomId: notRequired(),
  // minutes: z.number().optional(),
  minutes: z.coerce.number().optional(),
  clientId: notRequired(),
  phoneCode: notRequired(),
  phoneNo: notRequired(),
  // patientId: notRequired(),
  patientId: z.string().nullable().optional(),
  speciesId: notRequired(),
  breedId: notRequired(),
  weight: notRequired(),
  notes: notRequired(),
  status: notRequired(),
  items: notRequired(),
  type: notRequired(),
  reminder: notRequired(),
  patientNames: notRequired(),
});
