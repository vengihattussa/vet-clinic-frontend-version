import {z} from "zod";

const notRequired = () => z.string().nullable();
// const requiredNameString = (label: string) =>
//   z
//     .string()
//     .min(1, `${label} is required`)
//     .regex(/^[\p{L}\p{M}]+(?:[-' ][\p{L}\p{M}]+)*$/u, `Please enter valid ${label}`);

const requiredNameString = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .max(50, `${label} must be at most 50 characters long`)
    .regex(/^[\p{L}\p{M}]+$/u, `Please enter a valid ${label}`);

const requiredString = (label: string) => z.string().min(1, `${label} is required`);
const requiredNumber = (label: string) => z.coerce.number().min(0, `${label} is required`);
// const phoneNumber = () =>
//   z
//     .string()
//     .min(1, "Phone number is required")
//     .regex(/^[0-9()-\s]+$/, "Must contain valid number")
//     .refine((val) => val.replace(/\D/g, "").length === 10, {message: "Must be 10 digits"});

const phoneNumber = () =>
  z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9()-\s]+$/, "Must contain valid number")
    .refine((val) => val.replace(/\D/g, "").length === 10, {message: "Must be 10 digits"})
    .refine((val) => !/(.)\1{2,}/.test(val.replace(/\D/g, "")), {
      message: "Invalid Phone number",
    })
    .refine(
      (val) => {
        const cleaned = val.replace(/\D/g, ""); // Remove non-digit characters
        const sequentialPatterns = [
          "0123456789",
          "1234567890",
          "2345678901",
          "3456789012",
          "4567890123",
          "5678901234",
          "6789012345",
          "7890123456",
          "8901234567",
          "9012345678",
          "9876543210",
          "8765432109",
          "7654321098",
          "6543210987",
          "5432109876",
          "4321098765",
          "3210987654",
          "2109876543",
          "1098765432",
          "0987654321",
        ];
        return !sequentialPatterns.some((pattern) => pattern.includes(cleaned));
      },
      {message: "Invalid Phone Number"},
    );

const requiredDate = (label: string) => z.string().date(`${label} is required`);
const requiredDateFormatOptional = () =>
  z
    .union([z.string(), z.date(), z.null()])
    .optional()
    .refine(
      (value) => {
        if (!value) return true; // Skip refinement if value is null or undefined
        const date = typeof value === "string" ? new Date(value) : value;
        return date instanceof Date && !isNaN(date.getTime()); // Validate date
      },
      {
        message: "Invalid date format", // Message for invalid Date or string format
      },
    );

const requiredDateFormatOptionalField = () =>
  z
    .union([z.string(), z.date(), z.null()])
    .optional()
    .refine(
      (value) => {
        if (!value) return true; // Skip refinement if value is null or undefined
        const date = typeof value === "string" ? new Date(value) : value;
        return date instanceof Date && !isNaN(date.getTime()); // Validate date
      },
      {
        message: "Invalid date format",
      },
    )
    .transform((value) => {
      if (!value) return value;
      const date = typeof value === "string" ? new Date(value) : value;
      return date.toLocaleDateString("en-GB");
    });

const requiredDateFormat = () =>
  z.union([
    z.date(),
    z.string().refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()); // Ensure it's a valid Date string
      },
      {message: "Invalid date format"},
    ),
    z.null(),
  ]);

export {
  notRequired,
  requiredDateFormat,
  requiredDateFormatOptional,
  requiredString,
  requiredNumber,
  phoneNumber,
  requiredDate,
  requiredNameString,
  requiredDateFormatOptionalField,
};
