import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {DocumentResponse, IProblemCategory, IProblemListData} from "./interface";
import {ProblemListDocumentColumnHelper, ProblemListTableValues} from "@src/@types/problemList";

const getAllProblemCategory = () => {
  return httpClient.get(API_ROUTE.GET_ALL_CATEGORY);
};
export const useGetAllProblemCategory = () => {
  return useQuery({
    queryKey: [API_ROUTE.GET_ALL_CATEGORY],
    queryFn: () => getAllProblemCategory(),
    select: (response) => response.data as IProblemCategory,
  });
};

const getProblemById = (problemId: string) => {
  return httpClient.get(API_ROUTE.GET_PROBLEM_BY_ID.replace("{problemId}", problemId));
};
export const useGetByProblemById = (problemId: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_PROBLEM_BY_ID],
    queryFn: () => getProblemById(problemId),
    enabled: !!problemId,
    select: (response) => response.data as IProblemListData,
  });
};
const getProblemListByCategoryId = (data: {categoryId: string; search: string}) => {
  return httpClient.post(API_ROUTE.FITLER_PROBLEM, data);
};

export const useGetProblemListByCategoryId = (data: {categoryId: string; search: string}) => {
  return useQuery({
    queryKey: [API_ROUTE.FITLER_PROBLEM, data],
    queryFn: () => getProblemListByCategoryId(data),
    select: (response) => response.data as ProblemListTableValues,
  });
};
const getDocListById = (problemId: string) => {
  return httpClient.get(`${API_ROUTE.GET_DOC_BY_PROBLEM_ID}?problemId=${problemId}`);
};
export const useGetDocListById = (problemId: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_DOC_BY_PROBLEM_ID],
    queryFn: () => getDocListById(problemId),
    enabled: !!problemId,
    select: (response) => response.data as DocumentResponse,
  });
};
const getDocumnetById = (docId: string) => {
  return httpClient.get(API_ROUTE.GET_DOC_BY_ID.replace("{docId}", docId));
};
export const useGetDocumentById = (docId: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_DOC_BY_ID],
    queryFn: () => getDocumnetById(docId),
    enabled: !!docId,
    select: (response) => response.data as ProblemListDocumentColumnHelper,
  });
};
