import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set("b2b_token", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ ok: true });
}
