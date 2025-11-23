import { Board, Cell } from "@/utils/gameLogic";
import { cn } from "@/utils/classnames";

interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

const GameBoard = ({ board, onCellClick, disabled }: GameBoardProps) => {
  const getCellContent = (cell: Cell) => {
    if (!cell) return "";
    return cell;
  };

  const getCellClass = (cell: Cell) => {
    if (cell === "X") return "text-player-x";
    if (cell === "O") return "text-player-o";
    return "";
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
          className={cn(
            "aspect-square rounded-lg border-2 border-border",
            "flex items-center justify-center text-6xl font-bold",
            "transition-all duration-200",
            "hover:bg-cell-hover disabled:cursor-not-allowed",
            "disabled:hover:bg-background",
            getCellClass(cell)
          )}
        >
          {getCellContent(cell)}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
