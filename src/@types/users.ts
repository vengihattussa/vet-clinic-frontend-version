import {userSchema} from "@src/schema/users";
import {z} from "zod";

export type UserTypeFields = z.infer<typeof userSchema>;

export const userDefaultValues: UserTypeFields = {
  code: "",
  fullName: "",
  cellPhone: "",
  userEmail: "",
  address: "",
  inactive: false,
  doctor: false,
  password: "",
  username: "",
  locations: [],
  categoryId: "",
};
