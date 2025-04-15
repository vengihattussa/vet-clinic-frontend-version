import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";

interface IDoctorListResponse {
  id: number;
  firstName: string;
  lastName: string;
}

const getDoctorList = () => {
  return httpClient.post(API_ROUTE.GET_ALL);
};

export const useGetDoctorList = () => {
  return useQuery({
    queryKey: ["doctorList"],
    queryFn: getDoctorList,
    select: (response) => response.dataList as IDoctorListResponse[],
  });
};
