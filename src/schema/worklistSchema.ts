import {requiredNumber, requiredString} from "@src/common/Form/schemas";
import {z} from "zod";

export const worklistSchema = z.object({
  clientId: requiredString("Client"),
  workTypeId: requiredString("worklist"),
  patientId: requiredString("patient"),
  createdOn: z.coerce.date(),
  status: requiredString("Status"),
  acceptedBy: requiredNumber("ID is required"),
  acceptedOnDate: z.coerce.date(),
  acceptedOnTime: requiredString("Accepted on time "),
});
