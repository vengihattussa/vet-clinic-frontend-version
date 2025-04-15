import {useHandleResponse} from "@src/hooks/response";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {SystemTableDefaultValues} from "./interface";
import {useMutation, useQueryClient} from "@tanstack/react-query";

// --------------- Abnormalities Table ---------------------

const addAbnormalitiesTable = (data: SystemTableDefaultValues) => {
  return httpClient.post<SystemTableDefaultValues>(API_ROUTE.CREATE_ABNORMALITIESTABLE, data);
};

export const useAddAbnormalitiesTableMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAbnormalitiesTable,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Register Successful");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_ALL_ABNORMALITIESTABLES],
      });
    },
  });
};

const updateAbnormalitiesTable = (data: SystemTableDefaultValues) => {
  return httpClient.put<SystemTableDefaultValues>(
    `${API_ROUTE.UPDATE_ABNORMALITIESTABLE}?id=${data.id.toString()}`,
    data,
  );
};

export const useUpdateAbnormalitiesTableMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAbnormalitiesTable,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Update Successful");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_ALL_ABNORMALITIESTABLES],
      });
    },
  });
};

// Delete

const deleteAbnormalitiesTable = (data: {id: string}) => {
  return httpClient.delete<SystemTableDefaultValues>(
    `${API_ROUTE.DELETE_ABNORMALITIESTABLE}?id=${data.id.toString()}`,
  );
};

export const useDeleteAbnormalitiesTableMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAbnormalitiesTable,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Delete Successful");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_ALL_ABNORMALITIESTABLES],
      });
    },
  });
};

// // --------------- Allergy Table ---------------------
