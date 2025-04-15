import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";

const getPatientNotesById = (id: number) => {
  return httpClient.get(API_ROUTE.GET.replace(":id", String(id)));
};

export const useGetPatientNotes = (id: number) => {
  return useQuery({
    queryKey: [`${API_ROUTE.GET}`, id],
    queryFn: () => getPatientNotesById(id),
    select: (response) => response.data,
  });
};
