export type IDiagnosesData = {
  id: number;
  recordDate: string;
  recordTime: string;
  doctorFirstName: string | null;
  doctorLastName: string | null;
  type: string;
  code: string;
  description: string;
  quantity: number;
  amount: number;
  createdByFirstName: string | null;
  createdByLastName: string | null;
  photo: string | null;
  isPublic: boolean;
};

export const dummyDiagnosesData: IDiagnosesData[] = [
  {
    id: 1,
    recordDate: "2025-03-10",
    recordTime: "14:30",
    doctorFirstName: "John",
    doctorLastName: "Doe",
    type: "General Checkup",
    code: "DX001",
    description: "Routine health checkup",
    quantity: 1,
    amount: 100,
    createdByFirstName: "Alice",
    createdByLastName: "Smith",
    photo: "https://via.placeholder.com/150",
    isPublic: true,
  },
  {
    id: 2,
    recordDate: "2025-03-11",
    recordTime: "10:15",
    doctorFirstName: "Jane",
    doctorLastName: "Williams",
    type: "Cardiology",
    code: "DX002",
    description: "ECG and heart examination",
    quantity: 1,
    amount: 250,
    createdByFirstName: "Bob",
    createdByLastName: "Brown",
    photo: "https://via.placeholder.com/150",
    isPublic: false,
  },
  {
    id: 3,
    recordDate: "2025-03-12",
    recordTime: "16:45",
    doctorFirstName: "Emily",
    doctorLastName: "Johnson",
    type: "Orthopedics",
    code: "DX003",
    description: "Knee joint assessment",
    quantity: 1,
    amount: 300,
    createdByFirstName: "Charlie",
    createdByLastName: "Davis",
    photo: "https://via.placeholder.com/150",
    isPublic: true,
  },
  {
    id: 4,
    recordDate: "2025-03-13",
    recordTime: "09:00",
    doctorFirstName: "Michael",
    doctorLastName: "Clark",
    type: "Neurology",
    code: "DX004",
    description: "Brain MRI analysis",
    quantity: 1,
    amount: 500,
    createdByFirstName: "David",
    createdByLastName: "Lee",
    photo: "https://via.placeholder.com/150",
    isPublic: false,
  },
];

export type IChronologicalData = {
  id: string;
  date: string;
  time: string;
  dr: string;
  type: string;
  code: string;
  description: string;
  qty: string;
  amount: string;
  by: string;
  photo: string;
  public: string;
};

export const chronologicalData: IChronologicalData[] = [
  {
    id: "1",
    date: "11/30/23",
    time: "11:40a",
    dr: "JRS",
    type: "s (nm)",
    code: "JDR TTO",
    description: "Communications",
    qty: "1",
    amount: "0.00",
    by: "JDR",
    photo: "",
    public: "Yes",
  },
  {
    id: "2",
    date: "11/30/23",
    time: "11:40a",
    dr: "JRS",
    type: "s (nm)",
    code: "JDR TTO",
    description: "Communications",
    qty: "1",
    amount: "0.00",
    by: "JDR",
    photo: "",
    public: "Yes",
  },
  {
    id: "3",
    date: "11/30/23",
    time: "11:40a",
    dr: "JRS",
    type: "s (nm)",
    code: "JDR TTO",
    description: "Communications",
    qty: "1",
    amount: "0.00",
    by: "JDR",
    photo: "",
    public: "Yes",
  },
  {
    id: "4",
    date: "11/30/23",
    time: "11:40a",
    dr: "JRS",
    type: "s (nm)",
    code: "JDR TTO",
    description: "Communications",
    qty: "1",
    amount: "0.00",
    by: "JDR",
    photo: "",
    public: "Yes",
  },
  {
    id: "5",
    date: "11/30/23",
    time: "11:40a",
    dr: "JRS",
    type: "s (nm)",
    code: "JDR TTO",
    description: "Communications",
    qty: "1",
    amount: "0.00",
    by: "JDR",
    photo: "",
    public: "Yes",
  },
];
