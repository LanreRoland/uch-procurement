import { NextResponse, type NextRequest } from "next/server";

const adminCookieName = "uch_admin_session";

export function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const hasSession = Boolean(request.cookies.get(adminCookieName)?.value);

  if (!isLoginPage && !hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
