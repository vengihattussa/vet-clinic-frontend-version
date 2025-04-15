import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {IWorklistModalProps} from "./interface";

const getWorklistType = () => {
  return httpClient.post(API_ROUTE.WORKLIST_TYPE);
};

const useGetWorklistType = () => {
  return useQuery({
    queryKey: [API_ROUTE.WORKLIST_TYPE],
    queryFn: () => getWorklistType(),
    select: (response) => response?.dataList as WorkList,
  });
};

const getClientList = () => {
  return httpClient.post(API_ROUTE.CLIENT_LIST);
};

const useGetClientList = () => {
  return useQuery({
    queryKey: [API_ROUTE.CLIENT_LIST],
    queryFn: () => getClientList(),
    select: (response) => response?.dataList as ClientList,
  });
};

const getWorklsitById = (id: string) => {
  return httpClient.get(API_ROUTE.WORKLIST_BY_ID.replace("{id}", id));
};

const useGetWorklistById = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTE.WORKLIST_BY_ID, id],
    queryFn: () => getWorklsitById(id),
    enabled: !!id,
    select: (response) => response.data as IWorklistModalProps,
  });
};

export {useGetWorklistType, useGetWorklistById, useGetClientList};

type WorkListType = {
  id: string;
  name: string;
};

type ClientListType = {
  id: string;
  clientNo: string;
  lastName: string;
  firstName: string;
};
export type ClientList = ClientListType[];

export type WorkList = WorkListType[];
