import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Redirect to the admin login page
    if (!req.cookies.get("admin")) {
      return NextResponse.redirect(new URL("/login?context=admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/"],
};
