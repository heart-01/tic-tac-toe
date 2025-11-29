import {
  findScoreByUser,
  findAllScores,
  updateScoreUser,
} from "@/services/score";
import { UserScore } from "@/types/userScore";

export const getAllScores = async (): Promise<UserScore[] | []> => {
  const result = await findAllScores();
  return result.success ? (result.data as UserScore[]) : [];
};

export const getUserScore = async (username: string): Promise<UserScore> => {
  const result = await findScoreByUser(username);
  if (!result.success || (result.success && !result.data)) {
    return {
      username,
      score: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      bestWinStreak: 0,
      currentWinStreak: 0,
    };
  }
  return result.data as UserScore;
};

export const updateScore = async (
  username: string,
  result: "win" | "loss" | "draw"
): Promise<UserScore> => {
  const userScore: UserScore = await getUserScore(username);

  if (result === "win") {
    userScore.wins += 1;
    userScore.score += 1;
    userScore.currentWinStreak += 1;

    // Check for 3-win streak bonus
    if (userScore.currentWinStreak === 3) {
      userScore.score += 1; // Bonus point
      userScore.currentWinStreak = 0; // Reset streak
    }

    if (userScore.currentWinStreak > userScore.bestWinStreak) {
      userScore.bestWinStreak = userScore.currentWinStreak;
    }
  } else if (result === "loss") {
    userScore.losses += 1;
    userScore.score = Math.max(0, userScore.score - 1);
    userScore.currentWinStreak = 0;
  } else {
    userScore.draws += 1;
    userScore.currentWinStreak = 0;
  }

  await updateScoreUser({
    score: userScore.score,
    wins: userScore.wins,
    losses: userScore.losses,
    draws: userScore.draws,
    bestWinStreak: userScore.bestWinStreak,
    currentWinStreak: userScore.currentWinStreak,
  });

  return userScore;
};
