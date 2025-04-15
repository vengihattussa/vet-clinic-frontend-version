import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {SystemTableDefaultValues} from "./interface";

const getAllUsers = () => {
  return httpClient.get(API_ROUTE.GET_ALL_ABNORMALITIESTABLES);
};

export const useGetAllAbnormalitiesTable = () => {
  return useQuery({
    queryKey: [API_ROUTE.GET_ALL_ABNORMALITIESTABLES],
    queryFn: () => getAllUsers(),
    select: (response) => response.data,
  });
};

const getAbnormalitiesTableById = (id: string | number) => {
  return httpClient.get(`${API_ROUTE.GET_ABNORMALITIESTABLE_BY_ID}?id=${id}`);
};

export const useGetAbnormalitiesTableById = (id: string) => {
  return useQuery({
    queryKey: [`${API_ROUTE.GET_ABNORMALITIESTABLE_BY_ID}?id=${id}`, id],
    queryFn: () => getAbnormalitiesTableById(id),
    enabled: !!id,
    select: (response) => response.data as SystemTableDefaultValues,
  });
};

// const getAbnormalitiesTableDataById = (id: string) => {
//   return httpClient.get(API_ROUTE.GET_ABNORMALITIESTABLE_BY_ID.replace("{id}", id));
// };

// export const useGetAbnormalitiesTableDataById = (id: string) => {
//   return useQuery({
//     queryKey: [API_ROUTE.GET_ABNORMALITIESTABLE_BY_ID, id],
//     queryFn: () => getAbnormalitiesTableDataById(id),
//     enabled: !!id,
//     select: (response) => response.data as SystemTableValue,
//   });
// };
