// variance/queries.ts
import {useQuery} from "@tanstack/react-query";
import {httpClient} from "@src/services/httpClient";
import {API_ROUTE} from "./api";

interface IVariance {
  id: number;
  code: string;
  description: string;
}

const getAllVariance = () => {
  return httpClient.get(API_ROUTE.GET_ALL_VARIANCE);
};

export const usegetAllVariance = () => {
  return useQuery({
    queryKey: ["variance"],
    queryFn: getAllVariance,
    select: (response) => response.data as IVariance[],  // Using data property instead of dataList
  });
};