import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";

const getAppointmentsByDoctor = (date: string) => {
  return httpClient.post(API_ROUTE.GET_APPOINTMENT_BY_DOCTOR, {date});
};

export const useAppointmentsByDoctor = (date: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_APPOINTMENT_BY_DOCTOR, date],
    queryFn: () => getAppointmentsByDoctor(date),
    select: (response) => response.data || [],
    enabled: !!date,
  });
};

// Doctor List

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
}

const getAppointmentsDoctorList = () => {
  return httpClient.post(API_ROUTE.GET_DOCTOR_LIST);
};

export const useAppointmentsDoctorList = () => {
  return useQuery({
    queryKey: [API_ROUTE.GET_DOCTOR_LIST],
    queryFn: () => getAppointmentsDoctorList(),
    select: (response) => (response.dataList as Doctor[]) || [],
  });
};

// Room List
interface Room {
  id: string;
  name: string;
}

const getAppointmentsRoomList = () => {
  return httpClient.get(API_ROUTE.GET_ROOM_LIST);
};

export const useAppointmentsRoomList = () => {
  return useQuery({
    queryKey: [API_ROUTE.GET_ROOM_LIST],
    queryFn: () => getAppointmentsRoomList(),
    select: (response) => (response.data as Room[]) || [],
  });
};

// Client List
interface CLIENT {
  id: number;
  clientNo: number;
  firstName: string;
  lastName: string;
}

const getAppointmentsClientList = () => {
  return httpClient.post(API_ROUTE.GET_CLIENT_LIST);
};

export const useAppointmentsClientList = () => {
  return useQuery({
    queryKey: [API_ROUTE.GET_CLIENT_LIST],
    queryFn: () => getAppointmentsClientList(),
    select: (response) => (response.dataList as CLIENT[]) || [],
  });
};

// PAtient list by Client
const getAppointmentsPatientList = (id: string) => {
  return httpClient.get(API_ROUTE.GET_PATIENT_LIST, {
    params: {clientId: id},
  });
};

export const useAppointmentsPatientList = (id: string) => {
  return useQuery({
    queryKey: [`${API_ROUTE.GET_PATIENT_LIST}?clientId=${id}`],
    queryFn: () => getAppointmentsPatientList(id),
    select: (response) => response.data || [], // Now properly accessing array
  });
};
