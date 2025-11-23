import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthenticationResultType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
};

export const useAuthentication = (): AuthenticationResultType => {
  const { data: session, status } = useSession();

  const isAuthenticated = Boolean(session && status === "authenticated");
  const isLoading = status === "loading";

  return {
    isAuthenticated,
    isLoading,
    session,
    status,
  };
};

export const useAuthenticationCheck = (): void => {
  const { isAuthenticated, isLoading } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);
};
