import {useToast, UseToastOptions} from "@chakra-ui/react";
import {AxiosError} from "axios";
import {useCallback} from "react";
import {isCustomError} from "./typeGuard";

const useHandleResponse = () => {
  const toast = useToast({
    position: "bottom-right",
    isClosable: true,
  });

  const onSuccess = useCallback(
    (description: string, options?: Omit<UseToastOptions, "status" | "description">) => {
      toast({
        status: "success",
        description: description,
        ...options,
      });
    },
    [],
  );

  const onError = useCallback((error: unknown) => {
    let message = "Network Error";

    if (isCustomError(error)) {
      message = extractErrorMessage(error.response?.data.message);
    } else if (error instanceof AxiosError) {
      message = error?.message;
    }

    toast({
      title: typeof message === "string" ? message : "Network Error",
      status: "error",
    });
  }, []);

  return {onSuccess, onError};
};

export {useHandleResponse};

export const extractErrorMessage = (msg?: string | Array<string>) => {
  if (Array.isArray(msg)) {
    return msg?.join(", ");
  }

  if (typeof msg === "string") {
    return msg;
  }

  return "Network Error";
};
