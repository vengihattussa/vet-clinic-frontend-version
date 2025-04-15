import {z} from "zod";
import {
  notRequired,
  phoneNumber,
  requiredDateFormatOptional,
  requiredNameString,
  requiredNumber,
  requiredString,
} from "@src/common/Form/schemas";
const commonTLDs = new Set([
  "com",
  "org",
  "net",
  "edu",
  "gov",
  "mil",
  "co",
  "io",
  "ai",
  "dev",
  "tech",
  "info",
  "biz",
  "me",
  "us",
  "ca",
  "uk",
  "in",
]);

const emailSchema = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value) return true;

      // Check if the base email format is valid
      const isEmailValid = z.string().email().safeParse(value).success;

      // Custom regex to allow only up to two TLDs
      const customRegex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,6}(\.[a-zA-Z]{2,6})?$/;

      if (!isEmailValid || !customRegex.test(value)) return false;

      const parts = value.split("@");
      if (parts.length !== 2) return false;

      const domainParts = parts[1].split(".");

      // Ensure there are at most two domain extensions
      if (domainParts.length > 3) return false;

      // Check if the last one or two TLDs are in the common TLD set
      const tld1 = domainParts[domainParts.length - 1];
      const tld2 = domainParts.length > 2 ? domainParts[domainParts.length - 2] : null;

      // Check for repeated domains (like infiamtrix.com.com)
      const domainName = domainParts.slice(0, -1).join(".");
      if (tld2 && domainName.endsWith(tld1)) return false;

      if (!commonTLDs.has(tld1)) return false;
      if (tld2 && !commonTLDs.has(tld2)) return false;

      return true;
    },
    {
      message: "Invalid email format.",
    },
  );

const schema = z
  .object({
    premisesID: notRequired(),
    clientBusinessReferral: notRequired(),
    clientReferral: notRequired(),
    address1: notRequired(),
    statePremisesID: notRequired(),
    lastName: requiredNameString("Last name"),
    firstName: requiredNameString("First name"),
    title: z.string(),
    address: z.string(),
    zipCode: z.string(),
    city: z.string().regex(/^[A-Za-z\s]+$/, "City should contain only letters"),
    // State validation will be conditionally applied in superRefine
    // state: requiredString("state"),
    // state: z.string().min(1, {message: "State is Required"}),
    state: z.string().optional(),
    cellCode: z.string(),
    spouseCellCode: z.string(),
    phoneCode: z.string(),
    workPhoneCode: z.string(),
    phoneNo: phoneNumber(),
    faxNo: phoneNumber().or(z.literal("")),
    workPhoneNo: phoneNumber().or(z.literal("")),
    cellNo: phoneNumber().or(z.literal("")),
    country: requiredString("Country"),
    spousePhoneNo: phoneNumber().or(z.literal("")),
    contactPreference: z.string(),
    // email: z
    //   .string()
    //   .optional()
    //   .refine((value) => !value || z.string().email().safeParse(value).success, {
    //     message: "Invalid Email",
    //   }),
    email: emailSchema,
    historyZip: z.string(),
    historyZipName: z.string(),
    insuranceName: z.string(),
    insurancePolicyNumber: z.string(),
    // employerName: z.string().refine((value) => !/\d/.test(value), {
    //   message: "Employer name cannot contain numbers",
    // }),
    employerName: z.string(),
    relationshipType: z.string(),
    relationshipName: z.string(),
    preferredDoctor: z.string(),
    businessReferral: z.string(),
    referralCategory: z.string(),
    dateOfBirth: requiredDateFormatOptional(),
    createdAt: z.coerce.date(),
    createdBy: z.string(),

    // codes: requiredString("Codes"),
    codes: z.array(z.string()),
    suspendedReminder: z.boolean(),
    folder: z.coerce.number().superRefine((value, ctx) => {
      if (!Number.isInteger(value)) {
        ctx.addIssue({
          code: "custom",
          message: "Only whole numbers are allowed.",
        });
      }
    }),
    co: z
      .string()
      .transform((val) => val.trim()) // Trim leading and trailing spaces
      .refine(
        (val) => !val || /^[a-zA-Z0-9]+$/.test(val), // Allow only alphanumeric characters or empty value
        {
          message: "Invalid company number",
        },
      ),

    contractPriceType: requiredNumber("Contract Type"),
    clientSuspendDate: requiredDateFormatOptional(),
    clientClass: z.string(),
    statementSite: z.string(),
    // spouseWorkPhoneNo: phoneNumber().or(z.literal("")),
    spouseWorkPhoneNo: z.string(),
    quantity: z
      .string()
      .min(1, {message: "Quality must be at least 1"})
      .max(10, {message: "Quality cannot exceed 10"}),
    set: z.boolean(),
  })
  .partial()
  .superRefine((data, ctx) => {
    const isUS = data.country === "1"; // Replace "US" with the actual country ID for the United States
    if (isUS && !data.state) {
      ctx.addIssue({
        path: ["state"],
        message: "State is required",
        code: z.ZodIssueCode.custom,
      });
    }

    // Conditional validation for contact preference
    if (data.contactPreference === "4" && !data.email) {
      ctx.addIssue({
        path: ["email"],
        message: "Email is required",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.contactPreference === "2" && !data.workPhoneNo) {
      ctx.addIssue({
        path: ["workPhoneNo"],
        message: "Work Phone No is required",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.contactPreference === "3" && !data.cellNo) {
      ctx.addIssue({
        path: ["cellNo"],
        message: "Cell Phone No is required",
        code: z.ZodIssueCode.custom,
      });
    }
  });

type ClientRegistrationType = z.infer<typeof schema>;

const defaultValues = {
  premisesID: "",
  statePremisesID: "",
  lastName: "",
  firstName: "",
  title: "",
  address: "",
  address1: "",
  zipCode: "",
  city: "",
  state: "",
  workPhoneCode: "",
  phoneCode: "",
  cellCode: "",
  spouseCellCode: "",
  phoneNo: "",
  faxNo: "",
  workPhoneNo: "",
  cellNo: "",
  country: "",
  contactPreference: "",
  email: "",
  historyZip: "",
  historyZipName: "",
  insuranceName: "",
  insurancePolicyNumber: "",
  employerName: "",
  relationshipType: "",
  relationshipName: "",
  preferredDoctor: "",
  businessReferral: "",
  referralCategory: undefined,
  dateOfBirth: null as unknown as Date,
  createdAt: new Date(),
  createdBy: "",
  spousePhoneNo: "",
  spouseWorkPhoneNo: "",
  codes: [],
  suspendedReminder: false,
  folder: 0,
  co: "",
  contractPriceType: 0,
  clientSuspendDate: null as unknown as Date | string | null,
  clientClass: "",
  statementSite: "",
  quantity: "0",
  set: false,
  clientReferral: "",
  clientBusinessReferral: "",
} satisfies ClientRegistrationType;

export {schema, defaultValues};
export type {ClientRegistrationType};
