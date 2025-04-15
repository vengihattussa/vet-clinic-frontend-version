import {useQuery} from "@tanstack/react-query";

import {API_ROUTE} from "./api";
import {httpClient} from "@src/services/httpClient";

interface ISiteType {
  id: number;
  siteNo: number;
}

const getAllSite = () => {
  return httpClient.post(API_ROUTE.GET_ALL_SITE);
};

export const useGetAllSite = () => {
  return useQuery({
    queryKey: ["site"],
    queryFn: getAllSite,
    select: (response) => response.dataList as ISiteType[],
  });
};
