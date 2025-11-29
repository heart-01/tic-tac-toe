import axios, { AxiosInstance } from "axios";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import {
  interceptorHandleResponseSuccess,
  interceptorHandleResponseError,
  interceptorHandleRequestError,
} from "./axiosInterceptors";

const localBaseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

const getNextAuthSession = async (): Promise<JWT | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    const requestHeaders = new Headers(await headers());
    requestHeaders.set("cookie", cookieHeader);
    const localBaseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
    const req = new NextRequest(localBaseURL, { headers: requestHeaders });
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    console.error("Error getting NextAuth token:", error);
    return null;
  }
};

export function axiosInstance(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: localBaseURL,
    timeout: Number(process.env.API_TIME_OUT),
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const token = await getNextAuthSession();
    config.headers.set(
      "Authorization",
      `${token?.accessToken ? token.accessToken : ""}`
    );
    config.headers.set(
      "x-user",
      encodeURIComponent(JSON.stringify(token?.user ?? {}))
    );
    return config;
  }, interceptorHandleRequestError);

  axiosInstance.interceptors.response.use(
    interceptorHandleResponseSuccess,
    interceptorHandleResponseError
  );

  return axiosInstance;
}
