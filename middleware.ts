import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, ...rest: any) {
  const payload = parseJwt(req.cookies.get("token")?.value!);

  if(req.nextUrl.pathname === "/login" && payload.id) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if(req.nextUrl.pathname === "/register" && payload.id) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if(req.nextUrl.pathname === "/logout") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  
  if(payload.exp < Date.now() / 1000) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if(!payload.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/v1/:path*", "/admin/:path*", "/login", "/api/auth/logout", "/register"],
};

function parseJwt (token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}