import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {IClient, ISearchCriteriaProps} from "./interface";
import {IClientData} from "@src/components/Clients/ClientSelectionForm/interface";
const HALF_MINUTE = 1000 * 60 * 0.5;

const getClient = (id: string | number) => {
  return httpClient.get<IClient>(API_ROUTE.GET_CLIENT.replace("{id}", id.toString()));
};

const useGetClient = (id: string | number) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_CLIENT, id],
    queryFn: () => getClient(id),
    enabled: !!id,
    select: (response) => response.data,
    staleTime: HALF_MINUTE,
  });
};

const searchRegisteredClient = (data?: ISearchCriteriaProps) => {
  return httpClient.post<IClientData>(API_ROUTE.SEARCH_CLIENT, data);
};

const useSearchRegisteredClient = (data?: ISearchCriteriaProps) => {
  return useQuery({
    queryKey: [API_ROUTE.SEARCH_CLIENT, data],
    enabled: !!data,
    queryFn: () => searchRegisteredClient(data),
    select: (response) => response,
  });
};

const getClientName = (id: string | number) => {
  return httpClient.get<string>(API_ROUTE.GET_CLIENT_NAME.replace("{id}", id.toString()));
};

const useGetClientName = (id: string | number) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_CLIENT_NAME, id],
    queryFn: () => getClientName(id),
    enabled: !!id,
    select: (response) => response.data,
    staleTime: HALF_MINUTE,
  });
};
export {useGetClient, useSearchRegisteredClient, useGetClientName};
