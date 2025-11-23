import { AppENV } from "@/enums/app.enum";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/not-found",
  },
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.SESSION_MAX_AGE),
  },
  debug: process.env.APP_ENV !== AppENV.Production,
  callbacks: {
    async signIn({ user, account }) {
      const idToken = account?.id_token;
      if (!idToken) {
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user: {
            ...user.user,
          },
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
