import {z} from "zod";
import {requiredString} from "@src/common/Form/schemas";
const MAX_AMOUNT = 999999999.99;
export const addMedicalHistorySchema = z.object({
  id: z.number().optional(),
  recordDate: z
    .union([z.string(), z.date()])
    .transform((val) => {
      if (val instanceof Date) {
        return val.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      }
      if (typeof val === "string" && val) {
        const parsedDate = new Date(val);
        return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString().split("T")[0];
      }
      return null;
    })
    .nullable()
    .refine((date) => date !== null, {
      message: "Date is required",
    })
    .refine(
      (date) => {
        if (date) {
          const today = new Date().toISOString().split("T")[0];
          return date <= today; // Ensures date is not in the future
        }
        return false;
      },
      {
        message: "Date cannot be in the future",
      },
    ),
  // patientId: requiredString("Patient is required"),
  patientId: z
    .union([z.string(), z.number()])
    .transform((val) => String(val)) // Convert number to string
    .refine((val) => val.trim() !== "", {message: "Patient is required"}),
    code: z
    .string()
    .min(1, "Code must be at least 1 character long")
    .max(15, "Code cannot exceed 15 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Please enter a valid code")
    .refine((val) => !/^\s+$/.test(val), {
      message: "Code cannot contain only spaces",
    }),
  
  

  description: requiredString("Description"),

 
  quantity: z.coerce
  .number()
  .refine((val) => val >= 0, {message: "Quantity cannot be negative."})
  .refine((val) => val >= 1, {message: "Quantity must be greater than zero"})
  .optional(),
  amount: z.coerce
    .number({invalid_type_error: "Amount must be a number"})
    .transform((val) => parseFloat(val.toFixed(2))) // Round off to 2 decimal places
    .refine((val) => val >= 0, {message: "Amount cannot be negative."})
    .refine(
      (val) => {
        const decimalPlaces = val.toString().split(".")[1]?.length || 0;
        return decimalPlaces <= 2;
      },
      {message: "Only up to two decimal places are allowed."},
    )
    .refine((val) => val <= MAX_AMOUNT, {
      message: "Amount exceeds the maximum allowed value.",
    })
    .optional(),

  photo: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/"), {
          message: "Must be an image file",
        })
        .refine((file) => file.size < 1024 * 1024 * 5, {
          message: "File must be less than 5MB",
        }),
      z.null(),
    ])
    .optional(),

    co: z
    .string()
    .max(10, "Company number cannot exceed 10")
    .transform((val) => val.trim()) // Trim leading and trailing spaces
    .refine(
      (val) => !val || /^[a-zA-Z0-9]+$/.test(val), // Allow only alphanumeric characters or empty value
      {
        message: "Invalid company number",
      },
    )
    .optional(),
  // recordTime: z
  //   .string()
  //   .default(() => {
  //     // Get current time in HH:MM format
  //     const now = new Date();
  //     const hours = now.getHours().toString().padStart(2, "0");
  //     const minutes = now.getMinutes().toString().padStart(2, "0");
  //     return `${hours}:${minutes}`;
  //   })
  //   .optional(),
  recordTime: z.union([z.string(), z.null()]).transform((val) => {
    if (!val) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return val;
  }),

  typeId: z.string().optional(),

  // formNo: z
  //   .union([
  //     z
  //       .instanceof(File)
  //       .refine(
  //         (file) =>
  //           file.type === "application/msword" ||
  //           file.type ===
  //             "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
  //           file.name.endsWith(".doc") ||
  //           file.name.endsWith(".docx"),
  //         {message: "Must be a Word document (.doc or .docx)"},
  //       )
  //       .refine((file) => file.size < 1024 * 1024 * 5, {
  //         message: "File must be less than 5MB",
  //       }),
  //     z.null(),
  //   ])
  //   .nullable()
  //   .optional(),

  formNo: z
    .union([
      z
        .instanceof(File)
        .refine(
          (file) =>
            file.type === "application/msword" || // .doc
            file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
            file.name.toLowerCase().endsWith(".doc") ||
            file.name.toLowerCase().endsWith(".docx"),
          {message: "Must be a Word document (.doc or .docx)"},
        )
        .refine((file) => file.size < 5 * 1024 * 1024, {
          message: "File must be less than 5MB",
        }),
      z.string().refine((val) => !["", "unknown"].includes(val.trim()), {
        message: "Invalid value for formNo",
      }),
      z.null(),
    ])
    .nullable()
    .optional(),

   

    xlsFilePath: z
      .union([
        z
          .instanceof(File)
          .refine(
            (file) =>
              file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
              file.type === "application/vnd.ms-excel" || // .xls
              file.name.toLowerCase().endsWith(".xlsx") ||
              file.name.toLowerCase().endsWith(".xls"),
            { message: "Must be an Excel file (.xlsx or .xls)" }
          )
          .refine((file) => file.size < 5 * 1024 * 1024, {
            message: "File must be less than 5MB",
          }),
        z.string().refine((val) => !["", "unknown"].includes(val.trim()), {
          message: "Invalid value for xlsFilePath",
        }),
        z.null(),
      ])
      .nullable()
      .optional(),

  problemId: z.string().optional(),
  isPublic: z.boolean().optional(),
  //varinace:z.string().optional(),
  variance: z.coerce
  .string()
  .refine(
    (val) => !val || /^[0-9]+$/.test(val),
    {
      message: "nums are allowed",
    },
  )
  .optional(),
  variance2: z.string().optional(),
  createdBy: z.coerce.number().optional(),
  siteId: z.string().optional(),
 
  journal:z
  .union([
    z.instanceof(File).refine((file) => {
      // Check file size
      if (file.size > 1024 * 1024 * 5) {
        return false;
      }
      
      // Check file extension
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const isPdfExtension = fileExtension === 'pdf';
      
      // Check PDF MIME types
      const pdfMimeTypes = [
        'application/pdf',
        'application/x-pdf'
      ];
      const isPdfMimeType = pdfMimeTypes.includes(file.type);
      
      return isPdfExtension && isPdfMimeType;
    }, {
      message: "File must be a valid PDF (less than 5MB)",
    }),
    z.null(),
  ])
  .nullable()
  .optional(),
  zipCode: z
  .string()
  .regex(/^\d{6}$/, "Invalid Zip Code")
  .optional()
  .nullable()
  .or(z.literal("")),



  isCarePlan: z.boolean().optional(),
  doctorId: z.string().optional(),
  admittedId: z.string().optional(),
});
