import {requiredString} from "@src/common/Form/schemas";
import {z} from "zod";

export const notesSchema = z.object({
  notes: requiredString("Notes"),
});
