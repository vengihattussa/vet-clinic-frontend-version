import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";

const getMedicalNotesById = (id: string) => {
  return httpClient.get(API_ROUTE.GET_MEDICAL_NOTES.replace("{id}", id));
};

const useGetMedicalNotesById = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_MEDICAL_NOTES, id],
    queryFn: () => getMedicalNotesById(id),
    enabled: !!id,
    select: (response) => response.data as NoteData,
  });
};
export {useGetMedicalNotesById};

type NoteData = {
  id: number;
  patientId: number;
  notes: string;
};
