export type ApiErrorType = {
  name: string;
  status: number;
  message: string;
  data?: unknown;
};

export type ApiResponseType<T> = {
  success: boolean;
  data: T;
};
