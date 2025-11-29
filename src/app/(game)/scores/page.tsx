"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Typography, Space, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getAllScores } from "@/utils/scoreManager";
import { ScoreTable } from "@/app/components/molecules/Game/ScoreTable";
import { UserScore } from "@/types/userScore";

const { Title } = Typography;

const Scores = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [scores, setScores] = useState<UserScore[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const allScores = await getAllScores();
      setScores(allScores);
    };
    setMounted(true);
    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="mb-0">
            🏆 ตารางคะแนน
          </Title>
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push("/game")}
            >
              กลับสู่เกม
            </Button>
          </Space>
        </div>

        <Card>{mounted && <ScoreTable scores={scores} />}</Card>
      </div>
    </div>
  );
};

export default Scores;
