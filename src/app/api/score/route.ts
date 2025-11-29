/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/config/mongodb";
import UserScore from "@/models/UserScore";
import { ApiErrorType } from "@/types/apiHandler";
import { UserScoreCreate } from "@/types/userScore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const username = request.nextUrl.searchParams.get("username");
    if (!username) {
      const response = await UserScore.find({}).sort({ score: -1 });
      return NextResponse.json(response);
    } else {
      const response = await UserScore.findOne({ username });
      return NextResponse.json(response);
    }
  } catch (err: any) {
    const error = err as ApiErrorType;
    return NextResponse.json({ error }, { status: error.status });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    const getUser = request.headers.get("x-user") || null;
    const {
      score,
      wins,
      losses,
      draws,
      bestWinStreak,
      currentWinStreak,
    }: UserScoreCreate = await request.json();

    if (!getUser) {
      return NextResponse.json(
        { message: "user is required." },
        { status: 565 }
      );
    }

    const user = JSON.parse(decodeURIComponent(getUser));

    const response = await UserScore.findOneAndUpdate(
      { username: user.email },
      {
        score,
        wins,
        losses,
        draws,
        bestWinStreak,
        currentWinStreak,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(response);
  } catch (err: any) {
    const error = err as ApiErrorType;
    return NextResponse.json({ error }, { status: error.status });
  }
};
