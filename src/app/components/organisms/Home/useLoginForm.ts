import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/utils/authTokenClientHelper";

export const useLoginForm = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/game");
    }
  }, [isAuthenticated, router]);

  return { router };
};
