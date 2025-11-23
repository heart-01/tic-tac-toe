import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const baseUrl = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    baseUrl.pathname = "/";
    return NextResponse.redirect(baseUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/game/:path*"],
};
