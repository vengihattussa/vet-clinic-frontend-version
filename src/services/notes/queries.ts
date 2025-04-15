import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";

const getNotesById = (id: string) => {
  return httpClient.get(API_ROUTE.GET_NOTES.replace("{id}", id));
};

const useGetNotesById = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_NOTES, id],
    queryFn: () => getNotesById(id),
    enabled: !!id,
    select: (response) => response.data as NoteData,
  });
};
export {useGetNotesById};

type NoteData = {
  id: number;
  patientId: string;
  notes: string;
};
