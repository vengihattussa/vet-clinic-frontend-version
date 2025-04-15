import {useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {CategoryDataType, PermissionList, UserDefaultValues, UserTableValue} from "./interface";

const getAllUsers = () => {
  return httpClient.get(API_ROUTE.GET_ALL_USERS);
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [API_ROUTE.GET_ALL_USERS],
    queryFn: () => getAllUsers(),
    select: (response) => response.data,
  });
};

const getAllCategory = () => {
  return httpClient.get(API_ROUTE.GET_ALL_CATEGORY);
};

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: [API_ROUTE.GET_ALL_CATEGORY],
    queryFn: () => getAllCategory(),
    select: (response) => response.data as CategoryDataType,
  });
};

const getPermissionById = (id: string) => {
  return httpClient.get(API_ROUTE.GET_PERMISSION_BY_ID.replace(":id", id));
};

export const useGetPermissionById = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_PERMISSION_BY_ID, id],
    queryFn: () => getPermissionById(id),
    enabled: !!id,
    select: (response) => response.data as PermissionList,
  });
};

const getUsersById = (id: string | number) => {
  return httpClient.get(API_ROUTE.GET_USER_BY_ID.replace(":id", String(id)));
};

export const useGetUsersById = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_USER_BY_ID, id],
    queryFn: () => getUsersById(id),
    enabled: !!id,
    select: (response) => response.data as UserDefaultValues,
  });
};

const getUserDataByCategoryId = (id: string) => {
  return httpClient.get(API_ROUTE.GET_USER_DATA_BY_CATEGORY_ID.replace("{id}", id));
};

export const useGetUserDataByCategoryId = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTE.GET_USER_DATA_BY_CATEGORY_ID, id],
    queryFn: () => getUserDataByCategoryId(id),
    enabled: !!id,
    select: (response) => response.data as UserTableValue,
  });
};
