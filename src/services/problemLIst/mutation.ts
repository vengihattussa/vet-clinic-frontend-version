import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {useHandleResponse} from "@src/hooks/response";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DocumentTypeProps, ISaveProblemProps} from "./interface";
import {toFormData} from "axios";

const addProblemMutation = (data: ISaveProblemProps) => {
  return httpClient.post<ISaveProblemProps>(API_ROUTE.SAVE_PROBLEM, data);
};

const useAddProblemMutation = () => {
  const queryClient = useQueryClient();

  const {onError, onSuccess} = useHandleResponse();

  return useMutation({
    mutationFn: addProblemMutation,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Register Successful");
      queryClient?.invalidateQueries({queryKey: [API_ROUTE.FITLER_PROBLEM]});
    },
  });
};

const updateProblemMutation = (data: ISaveProblemProps) => {
  return httpClient.post<ISaveProblemProps>(API_ROUTE.UPDATE_PROBLEM, data);
};

const useUpdateProblemMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProblemMutation,
    onError,
    onSuccess: (response) => {
      queryClient?.invalidateQueries({queryKey: [API_ROUTE.FITLER_PROBLEM]});
      onSuccess(response.message || "Update Successful");
    },
  });
};

const addDocumentMuation = (data: DocumentTypeProps) => {
  return httpClient.post(API_ROUTE.CREATE_DOCS, toFormData(data));
};

const useAddDocumentMuation = () => {
  const queryClient = useQueryClient();
  const {onError, onSuccess} = useHandleResponse();

  return useMutation({
    mutationFn: addDocumentMuation,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Add Successful");
      queryClient.invalidateQueries({queryKey: [API_ROUTE.GET_DOC_BY_PROBLEM_ID]});
    },
  });
};

const updateDocumentMuation = (data: DocumentTypeProps) => {
  return httpClient.post(API_ROUTE.UPDATE_DOCS, toFormData(data));
};

const useUpdateDocumentMutation = () => {
  const queryClient = useQueryClient();

  const {onError, onSuccess} = useHandleResponse();

  return useMutation({
    mutationFn: updateDocumentMuation,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Update Successful");
      queryClient.invalidateQueries({queryKey: [API_ROUTE.GET_DOC_BY_PROBLEM_ID]});
    },
  });
};

export {
  useUpdateProblemMutation,
  useAddProblemMutation,
  useAddDocumentMuation,
  useUpdateDocumentMutation,
};
