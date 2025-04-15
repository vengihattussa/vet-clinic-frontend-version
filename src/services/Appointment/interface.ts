export interface IAppointment {
  id: number;
  date: string;
  time: string;
  createdAt: string;
  doctorId: number;
  createdBy: number;
  roomId: number;
  minutes: number;
  clientId: number;
  phoneNo: string;
  patientId: number;
  speciesId: number;
  breedId: number;
  weight: number;
  startTime: string;
  endTime: string;
  notes: string;
  status: string;
}
