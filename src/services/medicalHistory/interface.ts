export interface IMedicalHistoy {
  recordDate: string;
  patientId: string;
  code: string;
  description: string;
  quantity: string;
  amount: string;
  co: string;
  recordTime: string;
  historyType: string;
  xlsFilePath: string;
  problem: string;
  isPublic: boolean;
  isCarePlan: boolean;
  doctorId: number;
  admittedHospitalId: number;
}
