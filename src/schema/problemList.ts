import {requiredString} from "@src/common/Form/schemas";
import z from "zod";
export const problemListSchema = z.object({
  problemCategoryId: requiredString(" Problem Category"),
  code: requiredString("Code"),

  description: requiredString("Description"),

  actioncode: requiredString("Action Codes"),

  speciesId: requiredString("Species"),

  whiteBoard: requiredString("Whiteboard"),

  // name: requiredString("Company"),
});

export const remindAsSchema = z.object({
  remindas: requiredString("Remind As"),
});

export const documentSchema = z.object({
  docsDesc: requiredString("Species"),
  doc: z
    .custom<File | null>()
    .refine((file) => {
      return file && file instanceof File && file.type.startsWith("image/");
    }, "Must be an image file")
    .refine((file) => {
      return file && file.size < 1024 * 1024 * 5;
    }, "File must be less than 5MB")
    .nullable()
    .or(z.literal(null)),
});
