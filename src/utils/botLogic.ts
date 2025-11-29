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

/**
 * Check if a player can win in the next move
 */
const findWinningMove = (board: Board, player: Cell): number => {
  for (const combo of WINNING_COMBINATIONS) {
    const [firstIndex, secondIndex, thirdIndex] = combo;
    const cells = [board[firstIndex], board[secondIndex], board[thirdIndex]];
    const indices = [firstIndex, secondIndex, thirdIndex];

    // Count player's marks and empty cells in this combination
    const playerCount = cells.filter((cell) => cell === player).length;
    const emptyCount = cells.filter((cell) => cell === null).length;

    // If player has 2 marks and 1 empty, return the empty cell
    if (playerCount === 2 && emptyCount === 1) {
      return indices[cells.indexOf(null)];
    }
  }
  return -1;
};

/**
 * Get bot's next move with smart strategy
 */
export const getBotMove = (board: Board): number => {
  const emptyCells = getEmptyCells(board);

  if (emptyCells.length === 0) {
    return -1;
  }

  // 1. Try to win
  const winMove = findWinningMove(board, "O");
  if (winMove !== -1) {
    return winMove;
  }

  // 2. Block player's winning move
  const blockMove = findWinningMove(board, "X");
  if (blockMove !== -1) {
    return blockMove;
  }

  // 3. Take center if available
  if (board[4] === null) {
    return 4;
  }

  // 4. Take a corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((i) => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[
      Math.floor(Math.random() * availableCorners.length)
    ];
  }

  // 5. Take any remaining cell
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};
