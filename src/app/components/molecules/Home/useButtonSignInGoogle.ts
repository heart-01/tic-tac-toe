import { signIn } from "next-auth/react";

export const useButtonSignInGoogle = () => {
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/game" });
  };

  return {
    handleGoogleLogin,
  };
};
