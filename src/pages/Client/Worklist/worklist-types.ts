export interface IWorklistTableData {
  id: string;
  client: string;
  patient: string;
  addedOn: string;
  status: string;
  acceptedById: string;
  acceptedTod: string;
  acceptedOn: string;
}

export const worklistData: IWorklistTableData[] = [
  {
    id: "1",
    client: "ABC Corp",
    patient: "John Doe",
    addedOn: "11/30/23",
    status: "Pending",
    acceptedById: "EMP123",
    acceptedTod: "11:40a",
    acceptedOn: "11/30/23",
  },
  {
    id: "2",
    client: "XYZ Inc",
    patient: "Jane Smith",
    addedOn: "11/30/23",
    status: "Accepted",
    acceptedById: "EMP456",
    acceptedTod: "02:15p",
    acceptedOn: "11/30/23",
  },
  {
    id: "3",
    client: "ABC Corp",
    patient: "John Doe",
    addedOn: "11/30/23",
    status: "Pending",
    acceptedById: "EMP123",
    acceptedTod: "11:40a",
    acceptedOn: "11/30/23",
  },
  {
    id: "4",
    client: "XYZ Inc",
    patient: "Jane Smith",
    addedOn: "11/30/23",
    status: "Accepted",
    acceptedById: "EMP456",
    acceptedTod: "02:15p",
    acceptedOn: "11/30/23",
  },
];
