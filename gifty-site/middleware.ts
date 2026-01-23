import { NextRequest, NextResponse } from "next/server";
import { verifyB2BToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow login page
  if (pathname === "/wholesale/login") return NextResponse.next();

  // protect everything under /wholesale
  if (pathname.startsWith("/wholesale")) {
    const token = req.cookies.get("b2b_token")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/wholesale/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    try {
      await verifyB2BToken(token);
      return NextResponse.next();
    } catch {
      const url = req.nextUrl.clone();
      url.pathname = "/wholesale/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/wholesale/:path*"],
};
