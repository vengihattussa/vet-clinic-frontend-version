import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {IPatientRegistrationFormValues} from "@src/pages/Patient/Registration/form";

const getPatientById = (id: string) => {
  return httpClient.get<IPatientRegistrationFormValues>(API_ROUTE.GET_PATIENT.replace("{id}", id));
};

const useGetPatient = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_PATIENT, id],
    queryFn: () => getPatientById(id),
    enabled: !!id,
    select: (response) => response.data,
  });
};

export {useGetPatient};
