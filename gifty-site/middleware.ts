import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/wholesale/:path*"],
};

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Пускаем на страницу логина всегда
  if (pathname.startsWith("/wholesale/login")) {
    return NextResponse.next();
  }

  // Проверяем только наличие cookie (Edge-safe)
  const token = req.cookies.get("b2b_token")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/wholesale/login";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
