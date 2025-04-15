export type IPatientData = {
  id: string;
  name: string;
  species: string;
  sex: string;
  codes: string;
  age: string;
  weight: string;
  rabies: string;
  breed: string;
};

export const patientData: IPatientData[] = [
  {
    id: "1",
    name: "Baelfyre",
    species: "Canine",
    sex: "M",
    codes: "",
    age: "3y",
    weight: "105.40 lbs",
    rabies: "4781",
    breed: "Shiloh Shephered",
  },
  {
    id: "2",
    name: "Blaze",
    species: "Canine",
    sex: "M",
    codes: "D",
    age: "d@10y",
    weight: "95.60 lbs",
    rabies: "1022",
    breed: "Shephered German",
  },
  {
    id: "3",
    name: "Blaze 11",
    species: "Canine",
    sex: "M",
    codes: "D",
    age: "d@10y",
    weight: "95.60 lbs",
    rabies: "1022",
    breed: "Shephered German",
  },
];
