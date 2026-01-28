import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signB2BToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const username = body?.username as string | undefined;
  const password = body?.password as string | undefined;

  const expectedUser = process.env.B2B_USERNAME || "wholesale";
  const expectedPass = process.env.B2B_PASSWORD || "gifty2026";

  if (!username || !password || username !== expectedUser || password !== expectedPass) {
    return NextResponse.json(
      { ok: false, error: "Неверный логин или пароль" },
      { status: 401 }
    );
  }

  const token = await signB2BToken();

  cookies().set("b2b_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ ok: true });
}
