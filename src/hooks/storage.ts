import Cookies from "js-cookie";
export const getToken = () => Cookies.get("access_token");
export const addToken = (token: string) => Cookies.set("access_token", token);
export const removeToken = () => Cookies.remove("access_token");

export const getRefreshToken = () => Cookies.get("refresh_token");
export const addRefreshToken = (token: string) => Cookies.set("refresh_token", token);
export const removeRefreshToken = () => Cookies.remove("refresh_token");
export interface TokenInfo {
  sub: string;
  iat: number;
  exp: number;
}

export function getTokenDetails(): TokenInfo | null {
  try {
    const token = getToken();
    return token ? (JSON.parse(window.atob(token.split(".")[1])) as TokenInfo) : null;
  } catch (e) {
    return null;
  }
}

export const getUsername = () => getTokenDetails()?.sub ?? "";

export const isAuthenticated = () => {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return tokenDetails?.exp * 1000 > Date.now();
  } else {
    return false;
  }
};
