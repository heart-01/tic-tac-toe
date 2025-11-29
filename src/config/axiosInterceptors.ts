/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiErrorType } from "@/types/apiHandler";

export const interceptorHandleRequestSuccess = async (
  config: InternalAxiosRequestConfig
) => config;

export const interceptorHandleRequestError = (error: any) =>
  Promise.reject(error);

export const interceptorHandleResponseSuccess = (response: AxiosResponse) =>
  response;

export const interceptorHandleResponseError = (
  err: any
): Promise<ApiErrorType> => {
  let apiError: ApiErrorType;

  const externalError = err.response?.data?.error;
  const internalError = err;

  if (externalError) {
    apiError = {
      ...externalError,
    };
    return Promise.reject(apiError);
  }

  const { status } = internalError;
  const message =
    internalError.response?.data?.message ||
    internalError.response?.data ||
    internalError?.message ||
    "Unknown error occurred";

  apiError = {
    name: "router error",
    status,
    message,
    data: internalError?.response?.data,
  };

  return Promise.reject(apiError);
};
