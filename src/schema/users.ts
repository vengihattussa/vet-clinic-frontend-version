import {phoneNumber, requiredString} from "@src/common/Form/schemas";
import {z} from "zod";

export const userSchema = z.object({
  code: z.string(),
  fullName: requiredString("FullName"),
  cellPhone: phoneNumber(),
  userEmail: requiredString("User Email"),
  address: requiredString("Address"),
  categoryId: requiredString("Category"),
  username: requiredString("UserName"),
  password: requiredString("Password"),
  locations: z.array(z.string()).min(1, "Must select at least one allergy"),
  inactive: z.boolean(),
  doctor: z.boolean(),
});
