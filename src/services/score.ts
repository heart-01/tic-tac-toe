"use server";

import { UserScore, UserScoreCreate } from "@/types/userScore";
import { axiosInstance } from "../config/axios";
import { ApiErrorType, ApiResponseType } from "@/types/apiHandler";

const axios = axiosInstance();

export const findAllScores = async (): Promise<
  ApiResponseType<UserScore[] | ApiErrorType>
> => {
  try {
    const response = await axios.get<UserScore[]>("/api/score");
    const result: ApiResponseType<UserScore[]> = {
      success: true,
      data: response.data as UserScore[],
    };
    return result;
  } catch (error) {
    const err: ApiResponseType<ApiErrorType> = {
      success: false,
      data: error as ApiErrorType,
    };
    return err;
  }
};

export const findScoreByUser = async (
  username: string
): Promise<ApiResponseType<UserScore | ApiErrorType>> => {
  try {
    const response = await axios.get<UserScore>("/api/score", {
      params: { username },
    });
    const result: ApiResponseType<UserScore> = {
      success: true,
      data: response.data,
    };
    return result;
  } catch (error) {
    const err: ApiResponseType<ApiErrorType> = {
      success: false,
      data: error as ApiErrorType,
    };
    return err;
  }
};

export const updateScoreUser = async (
  scoreData: UserScoreCreate
): Promise<ApiResponseType<UserScore | ApiErrorType>> => {
  try {
    const response = await axios.post<UserScore>("/api/score", scoreData);
    const result: ApiResponseType<UserScore> = {
      success: true,
      data: response.data,
    };
    return result;
  } catch (error) {
    const err: ApiResponseType<ApiErrorType> = {
      success: false,
      data: error as ApiErrorType,
    };
    return err;
  }
};
