import { Board, getEmptyCells, Cell } from "./gameLogic";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

const findWinningMove = (board: Board, player: Cell): number => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    const cells = [board[a], board[b], board[c]];
    const indices = [a, b, c];
    const playerCount = cells.filter((cell) => cell === player).length;
    const emptyCount = cells.filter((cell) => cell === null).length;

    if (playerCount === 2 && emptyCount === 1) {
      return indices[cells.indexOf(null)];
    }
  }
  return -1;
};

export const getBotMove = (board: Board): number => {
  const emptyCells = getEmptyCells(board);

  if (emptyCells.length === 0) {
    return -1;
  }

  const winMove = findWinningMove(board, "O");
  if (winMove !== -1) {
    return winMove;
  }

  const blockMove = findWinningMove(board, "X");
  if (blockMove !== -1) {
    return blockMove;
  }

  if (board[4] === null) {
    return 4;
  }

  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((i) => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[
      Math.floor(Math.random() * availableCorners.length)
    ];
  }

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};
