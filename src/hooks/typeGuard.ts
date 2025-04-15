import {AxiosError} from "axios";

const isCustomError = (
  obj: unknown,
): obj is AxiosError<{
  message: string | Array<string>;
  error: string;
  status: number;
}> => {
  if (obj instanceof AxiosError) {
    return (
      typeof obj.response?.data?.message === "string" ||
      Array.isArray(obj.response?.data?.message) ||
      typeof obj.response?.data?.error === "string"
    );
  } else {
    return false;
  }
};

const doesKeyExist = <T extends object>(key: unknown, obj: T): key is keyof T => {
  return typeof key === "string" && key in obj;
};

export {isCustomError, doesKeyExist};
