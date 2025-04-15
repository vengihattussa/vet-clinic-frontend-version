import {useHandleResponse} from "@src/hooks/response";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {httpClient} from "@src/services/httpClient";

const addTable = (data: any, API: string) => {
  return httpClient.post<any>(API, data);
};

export const useAddTableMutation = (API: string, GET: string) => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => addTable(data, API),
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Register Successful");
      queryClient.invalidateQueries({
        queryKey: [GET],
      });
    },
  });
};

// UPDATE
const updateTable = (data: any, API: string) => {
  return httpClient.put<any>(`${API}?id=${data.id.toString()}`, data);
};

export const useUpdateTableMutation = (API: string, GET: string) => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateTable(data, API),
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Update Successful");
      queryClient.invalidateQueries({
        queryKey: [GET],
      });
    },
  });
};

const deleteTable = (data: {id: string}, API: string) => {
  return httpClient.delete<any>(`${API}?id=${data.id.toString()}`);
};

export const useDeleteTableMutation = (API: string, GET: string) => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {id: string}) => deleteTable(data, API),
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Delete Successful");
      queryClient.invalidateQueries({
        queryKey: [GET],
      });
    },
  });
};

// // --------------- Allergy Table ---------------------
