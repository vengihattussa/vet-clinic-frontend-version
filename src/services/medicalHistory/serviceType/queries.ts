import {useQuery} from "@tanstack/react-query";
import {httpClient} from "@src/services/httpClient";
import {API_ROUTE} from "./api";

interface IServiceType {
  id: number;
  code: string;
  description: string;
}

const getAllServiceType = () => {
  return httpClient.post(API_ROUTE.GET_ALL_TYPE);
};

export const usegetAllServiceType = () => {
  return useQuery({
    queryKey: ["serviceType"],
    queryFn: getAllServiceType,
    select: (response) => response.dataList as IServiceType[],
  });
};
