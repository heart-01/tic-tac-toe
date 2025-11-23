"use client";

import { useRouter } from "next/navigation";
import { Button, Typography, Space } from "antd";
import { TrophyOutlined, LogoutOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import Game from "@/app/components/organisms/Game/Game";

const { Title } = Typography;

const Page = () => {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="mb-0">
            Game
          </Title>
          <Space>
            <Button
              icon={<TrophyOutlined />}
              onClick={() => router.push("/scores")}
            >
              ตารางคะแนน
            </Button>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              ออกจากระบบ
            </Button>
          </Space>
        </div>
        <Game />
      </div>
    </div>
  );
};

export default Page;
