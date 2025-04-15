import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useHandleResponse} from "@src/hooks/response";
import {IPatientNotes} from "./interface";

const createPatientNotes = (data: IPatientNotes) => {
  return httpClient.post(API_ROUTE.POST, data);
};

const useCreatePatientNotes = () => {
  const queryClient = useQueryClient();
  const {onError, onSuccess} = useHandleResponse();
  return useMutation({
    mutationFn: createPatientNotes,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET],
      });
      onSuccess(response.message || "Notes Created");
    },
  });
};

export {useCreatePatientNotes};
