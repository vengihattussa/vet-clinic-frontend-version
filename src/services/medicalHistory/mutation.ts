import {useMutation, useQueryClient} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {useHandleResponse} from "@src/hooks/response";
import {AddMedicalHistoryFormValues} from "@src/@types/medicalHistory";
import {useQuery} from "@tanstack/react-query";
import {IDiagnosesData} from "@src/constants/chronologicalData";

const listMedicalHistory = ({
  patientId,
  clientId,
}: {
  patientId: number | string;
  clientId: number | string;
}) => {
  return httpClient.post(API_ROUTE.GET_ALL, {patientId, clientId});
};

const useListMedicalHistory = () => {
  const queryClient = useQueryClient();
  const {onError} = useHandleResponse();
  return useMutation({
    mutationFn: listMedicalHistory,
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_BY_ID],
      });
    },
  });
};

const fetchMedicalHistoryList = ({
  patientId,
  clientId,
}: {
  patientId: string | number;
  clientId: string | number;
}) => {
  return httpClient.post(API_ROUTE.GET_ALL, {patientId, clientId});
};

const useListMedicalHistoryTwo = (patientId: string | number, clientId: string | number) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_ALL, patientId, clientId],
    queryFn: () => fetchMedicalHistoryList({patientId, clientId}),
    enabled: !!patientId && !!clientId,
    select: (response) => response.dataList as IDiagnosesData[],
  });
};

const addMedicalHistory = (data: AddMedicalHistoryFormValues) => {
  return httpClient.post(API_ROUTE.CREATE_MEDICAL_HISTORY, data);
};

const useAddMedicalHistory = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  const {onError, onSuccess} = useHandleResponse();
  return useMutation({
    mutationFn: addMedicalHistory,
    onError,
    onSuccess: (response) => {
      // queryClient.invalidateQueries({
      //   queryKey: [API_ROUTE.GET_BY_ID],
      // });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_ALL],
      });
      onSuccess(response.message || "Medical History Created");
      onClose?.();
    },
  });
};

const updateMedicalHistory = (data: AddMedicalHistoryFormValues) => {
  return httpClient.put(API_ROUTE.UPDATE_MEDICAL_HISTORY, data);
};

const useUpdateMedicalHistory = (onClose?: () => void) => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMedicalHistory,
    onError,
    onSuccess: (response) => {
      // queryClient.invalidateQueries({
      //   queryKey: [API_ROUTE.GET_BY_ID],
      // });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_ALL],
      });
      onSuccess(response.message || "Medical History Updated");
      onClose?.();
    },
  });
};

export {
  useAddMedicalHistory,
  useUpdateMedicalHistory,
  useListMedicalHistory,
  useListMedicalHistoryTwo,
};
