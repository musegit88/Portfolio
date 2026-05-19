import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // check if the user is on the admin page
  const adminPath = request.nextUrl.pathname === "/admin";
  // get token from cookies
  const token = request.cookies.get("next-auth.session-token");
  // check if the user is on the login page
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // Redirect to login page if accessing /admin
  if (adminPath) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  // Redirect to login page if accessing /admin/dashboard without token
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  // Redirect to dashboard if accessing /admin/login with token
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
