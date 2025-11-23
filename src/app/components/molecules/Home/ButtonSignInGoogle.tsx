import React from "react";
import Image from "next/image";
import { Button } from "antd";
import { useButtonSignInGoogle } from "./useButtonSignInGoogle";
import AppText from "../../atom/AppText";

const ButtonSignInGoogle = () => {
  const { handleGoogleLogin } = useButtonSignInGoogle();
  return (
    <Button block size="large" onClick={handleGoogleLogin}>
      <Image
        src="/images/google-logo.svg"
        width={20}
        height={20}
        alt="iamge google"
        priority
      />
      <AppText>เข้าสู่ระบบด้วย Google</AppText>
    </Button>
  );
};

export default ButtonSignInGoogle;
