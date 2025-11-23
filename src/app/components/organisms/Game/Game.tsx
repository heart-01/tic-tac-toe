"use client";

import { Button, Typography, Card } from "antd";
import GameBoard from "@/app/components/molecules/Game/GameBoard";
import ScorePanel from "@/app/components/molecules/Game/ScorePanel";
import { useGame } from "./useGame";

const { Text } = Typography;

const Game = () => {
  const {
    gameStatus,
    board,
    handleCellClick,
    isPlayerTurn,
    isGameOver,
    handleNewGame,
    userScore,
  } = useGame();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <div className="text-center mb-4">
          <Text strong className="text-lg">
            {gameStatus}
          </Text>
        </div>

        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          disabled={!isPlayerTurn || isGameOver}
        />

        <div className="mt-6 text-center">
          <Button type="primary" size="large" onClick={handleNewGame}>
            เกมใหม่
          </Button>
        </div>
      </Card>

      <div>
        <ScorePanel userScore={userScore} />
      </div>
    </div>
  );
};

export default Game;
