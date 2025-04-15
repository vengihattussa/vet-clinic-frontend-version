import {addToken, getRefreshToken} from "@src/hooks/storage";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";

type RefreshAuthResponse = {
  data: {
    token: string;
  };
};

export const refreshAuth = async () => {
  try {
    await httpClient
      .post<RefreshAuthResponse>(API_ROUTE.REFRESH_TOKEN, {
        data: {
          refreshToken: getRefreshToken(),
        },
      })
      .then(async (response) => {
        const accessToken = response?.data?.data?.token;

        if (accessToken && typeof accessToken === "string") {
          addToken(accessToken);

          return Promise.resolve(accessToken);
        }
      })
      .catch(async () => {
        return Promise.reject(new Error());
      });
  } catch (error) {
    return Promise.reject(new Error());
  }
};
