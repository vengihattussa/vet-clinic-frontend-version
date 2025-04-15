import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {ICreateNote} from "./interface";
import {useHandleResponse} from "@src/hooks/response";
import {useMutation} from "@tanstack/react-query";

const addNotes = (data: ICreateNote) => {
  return httpClient.post(API_ROUTE.POST_NOTES, data);
};

const useAddNotes = () => {
  const {onError, onSuccess} = useHandleResponse();

  return useMutation({
    mutationFn: addNotes,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Register Successful");
    },
  });
};
export {useAddNotes};
