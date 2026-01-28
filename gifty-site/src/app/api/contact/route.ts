import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export const runtime = "nodejs";

function clean(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const name = clean(body?.name);
    const email = clean(body?.email);
    const subject = clean(body?.subject);
    const message = clean(body?.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Заполните имя, email и сообщение." },
        { status: 400 }
      );
    }

    const to =
      process.env.CONTACT_TO ||
      process.env.FORMS_TO ||
      process.env.PARTNERS_TO ||
      "gifty@shopify.com";

    const mailSubject = subject
      ? `GIFTY — сообщение с сайта: ${subject}`
      : "GIFTY — сообщение с сайта";

    const text = [
      "Сообщение с сайта GIFTY",
      "",
      `Имя: ${name}`,
      `Email: ${email}`,
      subject ? `Тема: ${subject}` : null,
      "",
      "Сообщение:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await sendMail({ to, subject: mailSubject, text, replyTo: email });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Не удалось отправить сообщение." },
      { status: 500 }
    );
  }
}
