import {useHandleResponse} from "@src/hooks/response";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {UserDefaultValues} from "./interface";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const addUser = (data: UserDefaultValues) => {
  return httpClient.post<UserDefaultValues>(API_ROUTE.CREATE_USER, data);
};

export const useAddUserMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Register Successful");
      queryClient.invalidateQueries({queryKey: [API_ROUTE.GET_USER_DATA_BY_CATEGORY_ID]});
    },
  });
};
const updateUser = (data: UserDefaultValues) => {
  return httpClient.put<UserDefaultValues>(API_ROUTE.UPDATE_USER, data);
};

export const useUpdateUserMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Update Successful");
      queryClient.invalidateQueries({queryKey: [API_ROUTE.GET_USER_DATA_BY_CATEGORY_ID]});
    },
  });
};

const changeUserStatus = (id: string) => {
  return httpClient.post<UserDefaultValues>(API_ROUTE.CHANGE_USER_STATUS.replace(":id", id));
};

export const useChangeUserStatusMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeUserStatus,
    onError,
    onSuccess: (response) => {
      onSuccess(response.message || "Status Changed Successfully");
      queryClient.invalidateQueries({queryKey: [API_ROUTE.GET_USER_DATA_BY_CATEGORY_ID]});
    },
  });
};
