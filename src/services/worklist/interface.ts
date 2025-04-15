export interface IWorklistModalProps {
  status: string;
  clientId: string;
  workTypeId: string;
  patientId: string;
  createdOn: string;
  acceptedBy: number;
  acceptedOnDate: Date;
  acceptedOnTime: string;
}

export type PatientList = PatientListProps[];

type PatientListProps = {
  id: string;
  name: string;
  code: string;
  co: string;
};
