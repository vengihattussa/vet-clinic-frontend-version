import {toFormData} from "axios";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {ICreateMedicalNote} from "./interface";
import {useHandleResponse} from "@src/hooks/response";
import {useMutation} from "@tanstack/react-query";

const addMedicalNotes = (data: ICreateMedicalNote) => {
  return httpClient.post(API_ROUTE.POST_MEDICAL_NOTES, toFormData(data));
};

const useAddMedicalNotes = () => {
  const {onError, onSuccess} = useHandleResponse();

  return useMutation({
    mutationFn: addMedicalNotes,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Register Successful");
    },
  });
};
export {useAddMedicalNotes};
