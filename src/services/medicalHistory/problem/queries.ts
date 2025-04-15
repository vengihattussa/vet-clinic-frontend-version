import {useQuery} from "@tanstack/react-query";
import {httpClient} from "@src/services/httpClient";
import {API_ROUTE} from "./api";

interface IProblemType {
  id: number;
  description: string;
}

const getAllProblem = () => {
  return httpClient.post(API_ROUTE.GET_ALL_PROBLEM);
};

export const useGetAllProblem = () => {
  return useQuery({
    queryKey: ["problem"],
    queryFn: getAllProblem,
    select: (response) => response.dataList as IProblemType[],
  });
};
