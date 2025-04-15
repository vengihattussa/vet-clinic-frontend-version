import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {AddMedicalHistoryFormValues} from "@src/@types/medicalHistory";

const getMedicalHistoryById = (id: number) => {
  return httpClient.get<AddMedicalHistoryFormValues>(
    API_ROUTE.GET_BY_ID.replace(":id", String(id)),
  );
};

export const useMedicalHistoryById = (id: number) => {
  return useQuery({
    enabled: id !== 0,
    queryKey: [API_ROUTE.GET_BY_ID, id],
    queryFn: () => getMedicalHistoryById(id),
    select: (response) => response.data,
  });
};
