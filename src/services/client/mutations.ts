import {ClientRegistrationType} from "@src/pages/Client/form";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_ROUTE} from "./api";
import {useHandleResponse} from "@src/hooks/response";
import {httpClient} from "../httpClient";
import {IUpdateClient} from "./interface";

const postRegisterClient = (data: ClientRegistrationType) => {
  return httpClient.post<string | number>(API_ROUTE.POST_CLIENT_REGISTRATION, {
    data,
  });
};

const usePostRegisterClient = () => {
  const {onError, onSuccess} = useHandleResponse();
  return useMutation({
    mutationFn: postRegisterClient,
    onError,
    onSuccess: () => onSuccess("Register Successful!"),
  });
};

const updateClient = (data: IUpdateClient) => {
  return httpClient.post(API_ROUTE.UPDATE_CLIENT, {data});
};

const useUpdateClient = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClient,
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [API_ROUTE.GET_CLIENT]});
      onSuccess("Update Successful!");
    },
  });
};

//get state from zip code
const getStateByZip = (zip: string) => {
  return httpClient.get<{id: string; name: string}>(`${API_ROUTE.GET_STATE_BY_ZIP}/${zip}`);
};

const useGetStateByZip = (zip: string) => {
  return useQuery({
    queryKey: ["get-state-by-zip", zip],
    enabled: !!zip,
    queryFn: () => getStateByZip(zip),
    select: ({data}) => {
      localStorage.setItem("zipID", data?.id);
      return data;
    },
  });
};

export {usePostRegisterClient, useUpdateClient, useGetStateByZip};
