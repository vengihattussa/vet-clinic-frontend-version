import {requiredDateFormatOptionalField, requiredString} from "@src/common/Form/schemas";
import {today} from "@src/utils/date";
import {z} from "zod";

function parseAgeString(input: string): number | undefined {
  const cleanedInput = input.trim().replace(/\s+/g, " "); // Clean up spaces

  // Strict format check: Only accepts proper units in order (y, m, w, d)
  const regex = /^(?:(\d+)y\s*)?(?:(\d+)m\s*)?(?:(\d+)w\s*)?(?:(\d+)d\s*)?$/;
  const match = cleanedInput.match(regex);

  if (!match) return undefined;

  const years = parseFloat(match[1] || "0");
  const months = parseFloat(match[2] || "0");
  const weeks = parseFloat(match[3] || "0");
  const days = parseFloat(match[4] || "0");

  const totalYears = years + months / 12 + weeks / 52 + days / 365;

  return Number(totalYears.toFixed(2));
}
const generalInformationSchema = z
  .object({
    name: requiredString("Name").regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),
    species: requiredString("Species"),
    breed: z.string().optional(),
    breedMixed: z.coerce.boolean(),
    color: z.string().optional(),
    // dateOfBirth: requiredDateFormat().nullable(),
    // dateOfBirth: requiredDateFormat().refine((val) => val !== null && val !== undefined, {
    //   message: "Date of birth is required",
    // }),
    dateOfBirth: z.union([requiredDateFormatOptionalField(), z.literal(null)]),
    isDobUnknown: z.coerce.boolean(),
    // age: z.preprocess((val) => {
    //   if (typeof val === "string") {
    //     const parsed = parseFloat(val);
    //     return isNaN(parsed) ? undefined : parsed;
    //   }
    //   return val;
    // }, z.number().min(1, "Invalid Age").optional()),

    age: z.preprocess((val) => {
      if (val === undefined || val === null || val === "") return undefined;

      if (typeof val === "number") return val;

      if (typeof val === "string") {
        const parsedAge = parseAgeString(val);
        if (parsedAge === undefined) {
          throw new z.ZodError([
            {
              code: z.ZodIssueCode.custom,
              path: ["age"],
              message: "Invalid age format.",
            },
          ]);
        }
        return parsedAge;
      }

      return val;
    }, z.number().min(0).max(120).optional()),

    sex: requiredString("Sex"),

    weightUnit: z.coerce.string().optional(),

    weight: z.union([
      z.coerce
        .number()
        .max(1000, {message: "Weight must be a reasonable value (≤ 1000)."})
        .refine((value) => value > 0, {
          message: "Weight must be greater than zero.",
        })
        .transform((value) => Number(value.toFixed(2)))
        .optional(),
      z.literal("").transform(() => undefined),
      z.undefined(),
    ]),

    codes: z.array(z.string()).optional(),

    certificate: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || /^\d+$/.test(value), {
        message: "Certificate must be a number",
      })
      .transform((value) => (value ? Number(value) : undefined))
      .refine((value) => value === undefined || value !== 0, {
        message: "Certificate cannot be zero",
      }),

    rabies: z
      .string()
      .optional()
      .refine((value) => !value || /^[a-zA-Z0-9]+$/.test(value), {
        message: "Please enter a valid input without special characters or spaces",
      }),

    patientRecordId: z.string(),

    microchip: z.preprocess((val) => {
      if (typeof val === "string") {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    }, z.number().optional()),

    plan: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9 ]+$/, "Plan cannot contain special characters")
      .optional()
      .or(z.literal(""))
      .nullable(),

    photo: z.string(),

    image: z
      .custom<File | null>()
      .refine((file) => file === null || (file instanceof File && file.type.startsWith("image/")), {
        message: "Must be an image file",
      })
      .refine((file) => file === null || file.size < 1024 * 1024 * 1, {
        message: "File must be less than 1MB",
      })
      .nullable(),

    folder: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9 ]+$/, "Folder name cannot contain special characters")
      .or(z.literal(""))
      .optional(),

    patientClass: z.string().optional(),
    wellnessDiscount: z.string().optional(),

    createdDate: z.string(),
    reminderDate: requiredDateFormatOptionalField()
      .optional()
      .refine(
        (val) => val === undefined || val === null || val !== "", // Allow undefined/null/empty values for optional field
        {
          message: "Invalid date format.",
        },
      ),

    // allergy: z.array(z.string()).min(1, {message: "At least one allergy must be specified."}),
    allergy: z.array(z.string()).optional(),

    suspendedDate: requiredDateFormatOptionalField().optional(),
    deceasedDate: requiredDateFormatOptionalField(),
  })
  .partial()
  .superRefine((data, ctx) => {
    // Date of birth is required when isDobUnknown is false
    if (!data.isDobUnknown && !data.dateOfBirth) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date of birth is required",
        path: ["dateOfBirth"],
      });
    }

    // Weight unit is required when weight is provided
    if (data.weight !== undefined && data.weight !== null) {
      if (!data.weightUnit) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Weight unit is required",
          path: ["weightUnit"],
        });
      }
    }

    // Deceased date is required if codes include "1"
    if (data.codes?.includes("1") && !data.deceasedDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Deceased Date is required",
        path: ["deceasedDate"],
      });
    }

    // if (data.weight) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "Unit is required",
    //     path: ["weightUnit"],
    //   });
    // }
  });

type IGeneralInformationFormValues = z.infer<typeof generalInformationSchema>;

const insuranceSchema = z.object({
  clientId: z.string(),
  policyHolder: z.string(),
  petOwnerName: z.string(),
  policyNumber: z.string().optional(),
  insuranceProvider: z.string().optional(),
});

type IInsuranceFormValues = z.infer<typeof insuranceSchema>;

const schema = generalInformationSchema.and(insuranceSchema);

type IPatientRegistrationFormValues = z.infer<typeof schema>;

const defaultValues: IPatientRegistrationFormValues = {
  name: "",
  species: "",
  breed: "",
  color: "",
  dateOfBirth: null,
  isDobUnknown: false,
  age: undefined,
  sex: "",
  weight: undefined,
  weightUnit: "",
  codes: [],
  certificate: undefined,
  rabies: "",
  patientRecordId: "",
  microchip: undefined,
  plan: "",
  photo: "",
  folder: "",
  patientClass: "",
  wellnessDiscount: "",
  createdDate: today,
  reminderDate: undefined,
  allergy: [],
  suspendedDate: null,
  deceasedDate: null,
  clientId: "",
  policyHolder: "",
  policyNumber: "",
  petOwnerName: "",
  insuranceProvider: "",
  image: null,
  breedMixed: false,
};

export {schema, defaultValues, generalInformationSchema, insuranceSchema};

export type {IGeneralInformationFormValues, IInsuranceFormValues, IPatientRegistrationFormValues};
