import {useQuery} from "@tanstack/react-query";
import {httpClient} from "@src/services/httpClient";

const getAll = (GET_ALL_API: string) => {
  return httpClient.get(GET_ALL_API);
};

export const useGetAllTableData = (GET_ALL_API: string) => {
  return useQuery({
    queryKey: [GET_ALL_API],
    queryFn: () => getAll(GET_ALL_API),
    select: (response) => response.data,
  });
};

const getAllCustomColor = () => {
  return httpClient.get("/api/vet_clinic/ColorCode/getAllColorCodes");
};

export const useGetAllCustomColor = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => getAllCustomColor(),
    select: (response) => response.data,
  });
};

const getTableById = (id: string | number, GET_BY_ID_API: string) => {
  return httpClient.get(`${GET_BY_ID_API}?id=${id}`);
};

export const useGetTableById = (id: string, GET_BY_ID_API: string) => {
  return useQuery({
    queryKey: [`${GET_BY_ID_API}?id=${id}`, id],
    queryFn: () => getTableById(id, GET_BY_ID_API),
    enabled: !!id,
    select: (response) => response.data as any,
  });
};
