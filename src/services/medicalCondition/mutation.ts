import {useMutation, useQueryClient} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE_MEDICALCONDITION} from "./api";
import {IMedicalConditionFields} from "@src/@types/medicalCondition";

const addMedicalCondition = (data: IMedicalConditionFields) => {
  return httpClient.post(API_ROUTE_MEDICALCONDITION.CREATE, data);
};

const useAddMedicalCondition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMedicalCondition,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medical-condition"],
      });
    },
  });
};

export {useAddMedicalCondition};
