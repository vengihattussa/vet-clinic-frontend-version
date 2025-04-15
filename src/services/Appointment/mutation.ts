import {useMutation, useQueryClient} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {useHandleResponse} from "@src/hooks/response";
import {toFormData} from "axios";
import {AddAppointmentType} from "@src/@types/appointment";
import {useQuery} from "@tanstack/react-query";

export type IAppointmentSideComponent = {
  appointmentTime: string;
  appointmentStatus: string;
  doctorName: string;
  clientName: string;
  patientName: string;
};

export type IAppointmentsDataSideComponent = {
  [date: string]: IAppointmentSideComponent[];
};

const listAppointment = ({patientId}: {patientId: number | string}) => {
  return httpClient.post(API_ROUTE.GET_ALL_APPOINTMENT, {patientId});
};

const useListAppointment = () => {
  const queryClient = useQueryClient();
  const {onError} = useHandleResponse();
  return useMutation({
    mutationFn: listAppointment,
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_BY_ID],
      });
    },
  });
};

const addAppointment = (data: AddAppointmentType) => {
  return httpClient.post(API_ROUTE.CREATE_APPOINTMENT, toFormData(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useAddAppointment = () => {
  const queryClient = useQueryClient();
  const {onError, onSuccess} = useHandleResponse();
  return useMutation({
    mutationFn: addAppointment,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_BY_ID],
      });
      onSuccess(response.message || "Medical History Created");
    },
  });
};

type UpdateAppointmentStatusType = {
  status: string; // or your specific status type
};

type UpdateAppointmentReschedule = {
  date: string;
  time: string;
  doctorId: string; // or your specific status type
};

const updateAppointment = ({
  data,
  id,
}: {
  data: AddAppointmentType | UpdateAppointmentStatusType | UpdateAppointmentReschedule;
  id: string;
}) => {
  return httpClient.put(`${API_ROUTE.UPDATE_APPOINTMENT}/${id}`, data);
};

const useUpdateAppointment = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointment,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_BY_ID],
      });
      onSuccess(response ? "Appointment Updated" : response);
    },
  });
};

// update status

const updateAppointmentStatus = ({id, status}: {id: string; status: string}) => {
  return httpClient.put(`${API_ROUTE.UPDATE_APPOINTMENT_STATUS}?id=${id}&status=${status}`);
};

const useUpdateAppointmentStatus = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointmentStatus,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_BY_ID],
      });
      onSuccess(response ? "Appointment Updated" : response);
    },
  });
};

// update appointment
const DeleteAppointment = ({id}: {id: string}) => {
  return httpClient.delete(`${API_ROUTE.DELETE_APPOINTMENT}/${id}`);
};

const useDeleteAppointment = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteAppointment,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_BY_ID],
      });
      onSuccess(response ? "Appointment Deleted" : response);
    },
  });
};

// side component appointment

const sideComponentAppointment = ({
  year,
  month,
}: {
  year: string | number;
  month: string | number;
}) => {
  return httpClient.post(API_ROUTE.SIDE_COMPONENT_APPOINTMENT, {year, month});
};

const useSideComponentAppointment = (year: string | number, month: string | number) => {
  return useQuery({
    queryKey: [API_ROUTE.SIDE_COMPONENT_APPOINTMENT, year, month],
    queryFn: () => sideComponentAppointment({year, month}),
    enabled: !!year && !!month,
    select: (response) => response.data as IAppointmentsDataSideComponent[],
  });
};

// RESCHEDULE APPOINTMENT

const rescheduleAppointment = ({data, id}: {data: UpdateAppointmentReschedule; id: string}) => {
  return httpClient.patch(`${API_ROUTE.UPDATE_RESCHEDULE_APPOINTMENT}?id=${id}`, data);
};

const useRescheduleAppointment = () => {
  const {onError, onSuccess} = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rescheduleAppointment,
    onError,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.GET_BY_ID],
      });
      onSuccess(response ? "Appointment Updated" : response);
    },
  });
};

export {
  useAddAppointment,
  useUpdateAppointment,
  useListAppointment,
  useUpdateAppointmentStatus,
  useDeleteAppointment,
  useSideComponentAppointment,
  useRescheduleAppointment,
};
