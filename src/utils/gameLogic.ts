export type Cell = "X" | "O" | null;
export type Board = Cell[];
export type GameResult = "X" | "O" | "draw" | "continue";

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Anti-diagonal
];

export const checkWinner = (board: Board): GameResult => {
  // Check for a winning combination
  for (const combo of WINNING_COMBINATIONS) {
    const [firstIndex, secondIndex, thirdIndex] = combo;
    if (
      board[firstIndex] &&
      board[firstIndex] === board[secondIndex] &&
      board[firstIndex] === board[thirdIndex]
    ) {
      return board[firstIndex] as "X" | "O";
    }
  }

  // Check for draw (board full)
  if (board.every((cell) => cell !== null)) {
    return "draw";
  }

  return "continue";
};

export const getEmptyCells = (board: Board): number[] => {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((i) => i !== -1);
};

export const createEmptyBoard = (): Board => {
  return Array(9).fill(null);
};
