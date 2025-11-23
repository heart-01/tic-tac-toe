import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { UserScore } from "@/types/userScore";

interface ScoreTableProps {
  scores: UserScore[];
}

export const ScoreTable = ({ scores }: ScoreTableProps) => {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  const columns: ColumnsType<UserScore> = [
    {
      title: "อันดับ",
      key: "rank",
      width: 70,
      fixed: "left",
      render: (_, __: UserScore, index: number) => (
        <span className="font-bold text-base sm:text-lg">
          {index === 0 && "🥇"}
          {index === 1 && "🥈"}
          {index === 2 && "🥉"}
          {index > 2 && `#${index + 1}`}
        </span>
      ),
    },
    {
      title: "ผู้เล่น",
      dataIndex: "username",
      key: "username",
      width: 120,
      fixed: "left",
      ellipsis: true,
      render: (username: string) => (
        <span className="font-semibold text-sm sm:text-base">{username}</span>
      ),
    },
    {
      title: (
        <span>
          <TrophyOutlined /> <span className="hidden sm:inline">คะแนน</span>
        </span>
      ),
      dataIndex: "score",
      key: "score",
      width: 90,
      render: (score: number) => (
        <span className="font-bold text-base sm:text-lg text-purple-600">
          {score}
        </span>
      ),
    },
    {
      title: (
        <span>
          <CheckCircleOutlined /> <span className="hidden sm:inline">ชนะ</span>
        </span>
      ),
      dataIndex: "wins",
      key: "wins",
      width: 80,
      sorter: (a, b) => b.wins - a.wins,
      render: (wins: number) => (
        <span className="text-green-600 font-semibold text-sm sm:text-base">
          {wins}
        </span>
      ),
    },
    {
      title: (
        <span>
          <CloseCircleOutlined /> <span className="hidden sm:inline">แพ้</span>
        </span>
      ),
      dataIndex: "losses",
      key: "losses",
      width: 80,
      sorter: (a, b) => b.losses - a.losses,
      render: (losses: number) => (
        <span className="text-red-600 font-semibold text-sm sm:text-base">
          {losses}
        </span>
      ),
    },
    {
      title: (
        <span>
          <MinusCircleOutlined /> <span className="hidden sm:inline">เสมอ</span>
        </span>
      ),
      dataIndex: "draws",
      key: "draws",
      width: 80,
      sorter: (a, b) => b.draws - a.draws,
      render: (draws: number) => (
        <span className="text-gray-600 font-semibold text-sm sm:text-base">
          {draws}
        </span>
      ),
    },
    {
      title: (
        <span>
          <FireOutlined /> <span className="hidden sm:inline">ชนะติดกัน</span>
        </span>
      ),
      dataIndex: "bestWinStreak",
      key: "bestWinStreak",
      width: 100,
      sorter: (a, b) => b.bestWinStreak - a.bestWinStreak,
      render: (streak: number) => (
        <span className="text-orange-600 font-bold text-base sm:text-lg">
          {streak}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={sortedScores}
      rowKey="username"
      pagination={false}
      bordered
      size="middle"
      scroll={{ x: 620 }}
    />
  );
};
