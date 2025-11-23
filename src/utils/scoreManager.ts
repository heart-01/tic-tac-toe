import { UserScore } from "@/types/userScore";

const STORAGE_KEY = "scores";

export const getAllScores = (): UserScore[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getUserScore = (username: string): UserScore => {
  const scores = getAllScores();
  const userScore = scores.find((s) => s.username === username);

  if (userScore) {
    return userScore;
  }

  return {
    username,
    score: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    bestWinStreak: 0,
    currentWinStreak: 0,
  };
};

export const updateScore = (
  username: string,
  result: "win" | "loss" | "draw"
): UserScore => {
  const scores = getAllScores();
  const userScore = getUserScore(username);

  if (result === "win") {
    userScore.wins += 1;
    userScore.score += 1;
    userScore.currentWinStreak += 1;

    if (userScore.currentWinStreak === 3) {
      userScore.score += 1;
      userScore.currentWinStreak = 0;
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

  const updatedScores = scores.filter((s) => s.username !== username);
  updatedScores.push(userScore);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
  }

  return userScore;
};
