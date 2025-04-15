import {API_ROUTE} from "./api";
import {useMutation} from "@tanstack/react-query";
import {ILoginProps} from "./interface";
import {useHandleResponse} from "@src/hooks/response";
import {httpClient} from "../httpClient";

export type ILoginResponse = {
  token: string;
  refreshToken: string;
};

const userLogin = (data: ILoginProps) => {
  return httpClient.post<ILoginResponse>(API_ROUTE.LOGIN, {data: data});
};

const useUserLogin = () => {
  const {onError, onSuccess} = useHandleResponse();
  return useMutation({
    mutationFn: userLogin,
    onError,
    onSuccess: () => onSuccess("Login Successfull!"),
  });
};

export {useUserLogin};
