import {useHandleResponse} from "@src/hooks/response";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {IPatientRegistrationFormValues} from "@src/pages/Patient/Registration/form";
import {API_ROUTE as CLIENT_API_ROUTE} from "../client/api";
import {IUpdatePatient} from "./interface";
import {toFormData} from "axios";

const registerPatient = (data: IPatientRegistrationFormValues) => {
  return httpClient.post(API_ROUTE.POST_PATIENT, toFormData({...data, age: +(data.age ?? "")}));
};

const useRegisterPatient = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerPatient,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [CLIENT_API_ROUTE.GET_CLIENT],
      });
      onSuccess(response.message || "Register Successful");
    },
  });
};

const updatePatient = (data: IUpdatePatient) => {
  return httpClient.post(API_ROUTE.UPDATE_PATIENT, toFormData({...data, age: +(data.age ?? "")}));
};

const useUpdatePatient = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePatient,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({queryKey: [CLIENT_API_ROUTE.GET_CLIENT]});
      onSuccess(response.message || "Update successful");
    },
  });
};

export {useRegisterPatient, useUpdatePatient};
