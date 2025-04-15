import {AxiosRequestConfig} from "axios";
import {axiosInstance} from "./axios";

type ApiResponse<TData> = {
  error: string;
  responseCode: string;
  message: string;
  data: TData;
  dataList: TData[];
};

const createRequest = async <TData>({
  url,
  method,
  data,
  config,
}: {
  url: string;
  method: "post" | "get" | "put" | "delete" | "patch";
  data?: unknown;
  config?: AxiosRequestConfig<TData>;
}) => {
  const response = await (method === "get" || method === "delete"
    ? axiosInstance[method]<ApiResponse<TData>>(url, config)
    : axiosInstance[method]<ApiResponse<TData>>(url, data, config));
  const repsonseData = response.data;
  return repsonseData;
};

export const httpClient = {
  post: <TData>(url: string, data?: unknown, config?: AxiosRequestConfig<TData>) =>
    createRequest<TData>({
      url,
      method: "post",
      data,
      config,
    }),
  put: <TData>(url: string, data?: unknown, config?: AxiosRequestConfig<TData>) =>
    createRequest<TData>({url, method: "put", data, config}),
  patch: <TData>(url: string, data?: unknown, config?: AxiosRequestConfig<TData>) =>
    createRequest<TData>({url, method: "patch", data, config}),
  delete: <TData>(url: string, config?: AxiosRequestConfig<TData>) =>
    createRequest<TData>({url, method: "delete", config}),
  get: <TData>(url: string, config?: AxiosRequestConfig<TData>) =>
    createRequest<TData>({url, method: "get", config}),
};

export type {ApiResponse};
