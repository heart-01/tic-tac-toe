import { Card, Typography } from "antd";
import ButtonSignInGoogle from "@/app/components/molecules/Home/ButtonSignInGoogle";
import AppText from "@/app/components/atom/AppText";
import { useLoginForm } from "./useLoginForm";

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center from-purple-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <Title level={2} className="mb-2">
            <AppText>Tic-Tac-Toe</AppText>
          </Title>
          <Text type="secondary">
            <AppText>เข้าสู่ระบบเพื่อเริ่มเล่น</AppText>
          </Text>
        </div>
        <ButtonSignInGoogle />
      </Card>
    </div>
  );
};

export default LoginForm;
