import {requiredString} from "@src/common/Form/schemas";
import {z} from "zod";

export const medicalNotesSchema = z.object({
  note: requiredString("Note"),
});
