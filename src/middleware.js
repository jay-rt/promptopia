import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const authMiddleware = async (req) => {
  const res = NextResponse.next();
  const token = await getToken({ req });
  if (!token) {
    return new NextResponse("Please sign in to view this page!", {
      status: 401,
    });
  }
  res.cookies.set("userId", token.id);
  return res;
};

export const config = {
  matcher: ["/api/prompts/:path*", "/api/users/:path*"],
};

export default authMiddleware;
