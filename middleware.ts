import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseJwt } from "@/lib/utils";
import { db } from "./lib/prisma";

const PUBLIC_ROUTES = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, ...rest: any) {
  const payload = parseJwt(req.cookies.get("token")?.value!);

  const adminKey = req.cookies.get("adminKey")?.value;
  const adminAccess = req.cookies.get("adminAccess")?.value;

  if (req.nextUrl.pathname.startsWith("/admin") && adminAccess === "true") {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/admin") && adminKey === "true") {
    return NextResponse.redirect(new URL("/login?context=admin", req.nextUrl));
  }

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
