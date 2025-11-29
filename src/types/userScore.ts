export type UserScore = {
  username: string;
  score: number;
  wins: number;
  losses: number;
  draws: number;
  bestWinStreak: number;
  currentWinStreak: number;
};

export type UserScoreCreate = {
  score: number;
  wins: number;
  losses: number;
  draws: number;
  bestWinStreak: number;
  currentWinStreak: number;
};
