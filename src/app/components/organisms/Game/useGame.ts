import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createEmptyBoard,
  checkWinner,
  GameResult,
  Board,
} from "@/utils/gameLogic";
import { getBotMove } from "@/utils/botLogic";
import { updateScore, getUserScore } from "@/utils/scoreManager";
import { UserScore } from "@/types/userScore";
import { useAuthentication } from "@/utils/authTokenClientHelper";

export const useGame = () => {
  const router = useRouter();
  const { session, isAuthenticated } = useAuthentication();
  const username = session?.user?.email || "Guest";
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState<string>("เป็นตาของคุณ");
  const [isGameOver, setIsGameOver] = useState(false);
  const [userScore, setUserScore] = useState<UserScore>({
    username,
    score: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    bestWinStreak: 0,
    currentWinStreak: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setUserScore(getUserScore(username!));
  }, [username]);

  useEffect(() => {
    if (!isPlayerTurn && !isGameOver) {
      setGameStatus("บอทกำลังคิด...");

      const timer = setTimeout(() => {
        const botMove: number = getBotMove(board);
        if (botMove !== -1) {
          const newBoard = [...board];
          newBoard[botMove] = "O";
          setBoard(newBoard);

          const result = checkWinner(newBoard);
          handleGameResult(result);

          if (result === "continue") {
            setIsPlayerTurn(true);
            setGameStatus("เป็นตาของคุณ");
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, isGameOver, board]);

  const handleGameResult = (result: GameResult) => {
    if (result === "X") {
      setGameStatus("🎉 คุณชนะ!");
      setIsGameOver(true);
      const updated = updateScore(username!, "win");
      setUserScore(updated);
      alert(
        userScore.currentWinStreak === 2
          ? "🔥 ชนะ 3 ครั้งติดกัน! +1 คะแนนโบนัส!"
          : "คุณชนะ! 🎉"
      );
    } else if (result === "O") {
      setGameStatus("คุณแพ้!");
      setIsGameOver(true);
      const updated = updateScore(username!, "loss");
      setUserScore(updated);
      alert("คุณแพ้!");
    } else if (result === "draw") {
      setGameStatus("เสมอ!");
      setIsGameOver(true);
      const updated = updateScore(username!, "draw");
      setUserScore(updated);
      alert("เสมอ!");
    }
  };

  const handleCellClick = (index: number) => {
    if (!isPlayerTurn || isGameOver || board[index] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    handleGameResult(result);

    if (result === "continue") {
      setIsPlayerTurn(false);
    }
  };

  const handleNewGame = () => {
    setBoard(createEmptyBoard());
    setIsPlayerTurn(true);
    setGameStatus("เป็นตาของคุณ");
    setIsGameOver(false);
  };

  return {
    gameStatus,
    board,
    handleCellClick,
    isPlayerTurn,
    isGameOver,
    handleNewGame,
    userScore,
  };
};
