import {httpClient} from "@src/services/httpClient";
import {API_ROUTE} from "./api";
import {useHandleResponse} from "@src/hooks/response";
import {useMutation} from "@tanstack/react-query";
import {IMedicalConditionPlan} from "./interface";

const addPlan = (data: IMedicalConditionPlan) => {
  return httpClient.post<IMedicalConditionPlan>(API_ROUTE.CREATE_PLAN, data);
};

export const useAddPlanMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  return useMutation({
    mutationFn: addPlan,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Register Successful");
    },
  });
};

const updatePlan = (data: IMedicalConditionPlan) => {
  return httpClient.post<IMedicalConditionPlan>(API_ROUTE.UPDATE_PLAN, data);
};

export const useUpdatePlanMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  return useMutation({
    mutationFn: updatePlan,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Update Successful");
    },
  });
};
