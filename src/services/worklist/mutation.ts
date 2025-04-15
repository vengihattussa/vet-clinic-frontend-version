import {useHandleResponse} from "@src/hooks/response";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {IWorklistFormValues} from "@src/@types/worklist";

const addWorklist = (data: IWorklistFormValues) => {
  return httpClient.post(API_ROUTE.POST_WORKLIST, data);
};

// const editWorklist = (data: IWorklistModalProps) => {
//   return httpClient.put(API_ROUTE.POST_WORKLIST, toFormData(data));
// };

export const useAddWorklistMutation = () => {
  const queryClient = useQueryClient();
  const {onError, onSuccess} = useHandleResponse();

  return useMutation({
    mutationFn: addWorklist,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({queryKey: [API_ROUTE.GET_WORKLIST]});
      onSuccess(response.message || "Added Successfully");
    },
  });
};
const updateWorklist = (data: IWorklistFormValues) => {
  return httpClient.post(API_ROUTE.UPDATE_WORKLIST, data);
};

export const useUpdateWorklistMutation = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorklist,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({queryKey: [API_ROUTE.GET_WORKLIST]});
      onSuccess(response.message || "Update successful");
    },
  });
};

const getAllWorklistData = (data: {workTypeId: string}) => {
  return httpClient.post(API_ROUTE.GET_WORKLIST, data);
};
export const useListWorklistDataById = () => {
  const {onError} = useHandleResponse();
  return useMutation({
    mutationFn: getAllWorklistData,
    onError,
  });
};

const getAllPatientList = (data: {clientId: string}) => {
  return httpClient.post(API_ROUTE.PATIENT_LIST, data);
};
export const useGetPatientListById = () => {
  const {onError} = useHandleResponse();
  return useMutation({
    mutationFn: getAllPatientList,
    onError,
  });
};
