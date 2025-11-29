import { Card, Statistic, Row, Col, Typography } from "antd";
import {
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { UserScore } from "@/types/userScore";
import { useAuthentication } from "@/utils/authTokenClientHelper";

const { Title } = Typography;

interface ScorePanelProps {
  userScore: UserScore;
}

const ScorePanel = ({ userScore }: ScorePanelProps) => {
  const { session } = useAuthentication();

  return (
    <Card>
      <Title level={4} className="mb-4">
        <TrophyOutlined className="mr-2" />
        สถิติของคุณ {session?.user?.email || "Guest"}
      </Title>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic
            title="คะแนนรวม"
            value={userScore?.score}
            prefix={<TrophyOutlined />}
            styles={{ content: { color: "#9b87f5" } }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="ชนะสูงสุดติดกัน"
            value={userScore?.bestWinStreak}
            prefix={<FireOutlined />}
            styles={{ content: { color: "#f97316" } }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="ชนะ"
            value={userScore?.wins}
            prefix={<CheckCircleOutlined />}
            styles={{ content: { color: "#10b981" } }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="แพ้"
            value={userScore?.losses}
            prefix={<CloseCircleOutlined />}
            styles={{ content: { color: "#ef4444" } }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="เสมอ"
            value={userScore?.draws}
            prefix={<MinusCircleOutlined />}
            styles={{ content: { color: "#6b7280" } }}
          />
        </Col>
      </Row>

      {userScore?.currentWinStreak > 0 && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-orange-700">
              <FireOutlined className="mr-2" />
              ชนะติดกัน
            </span>
            <span className="text-2xl font-bold text-orange-600">
              {userScore?.currentWinStreak}
            </span>
          </div>
          {userScore?.currentWinStreak === 2 && (
            <p className="text-xs text-orange-600 mt-1 mb-0">
              ชนะอีก 1 ครั้งเพื่อรับโบนัส +1 คะแนน! 🎯
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default ScorePanel;
