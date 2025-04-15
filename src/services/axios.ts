import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {refreshAuth} from "./auth/refresh-auth";
import {getToken, isAuthenticated} from "@src/hooks/storage";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});
createAuthRefreshInterceptor(axiosInstance, refreshAuth, {
  statusCodes: [401],
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getToken();
    const isLoggedIn = isAuthenticated();

    if (isLoggedIn) config.headers["authorization"] = `Bearer ${token}`;

    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

export {axiosInstance};
