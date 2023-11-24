import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, ...rest: any) {
  const payload = parseJwt(req.cookies.get("token")?.value!);

  if (payload && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (payload?.exp < Date.now() / 1000) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!payload?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/v1/:path*", "/admin/:path*"],
};

function parseJwt(token: string) {
  if (!token) return null;
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}
