import {worklistSchema} from "@src/schema/worklistSchema";
import {z} from "zod";

export type IWorklistFormValues = z.infer<typeof worklistSchema>;

export const worklistDefaultValues: IWorklistFormValues = {
  clientId: "",
  workTypeId: "",
  patientId: "",
  createdOn: new Date(),
  status: "",
  acceptedBy: 0,
  acceptedOnDate: new Date(),
  acceptedOnTime: "",
};

export interface IUpdateWorklist extends IWorklistFormValues {
  id: string | number;
}

export type IWorklistTableValues = {
  id: number | string;
  clientFirstName: string;
  clientLastName: string;
  patientName: string;
  createdOn: Date; // Date in string format
  status: string; // Assuming it's a string since "1" is used
  acceptedBy: string; // Assuming it's a string since "12" is used
  acceptedOnDate: Date; // Date in string format
  acceptedOnTime: string; // Time in string format
  acceptedTod: string; // String, as it appears empty
};
