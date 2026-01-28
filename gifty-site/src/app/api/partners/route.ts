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
    const company = clean(body?.company);
    const email = clean(body?.email);
    const phone = clean(body?.phone);
    const message = clean(body?.message);

    if (!name || !company || !email) {
      return NextResponse.json(
        { error: "Заполните имя, компанию и email." },
        { status: 400 }
      );
    }

    const to =
      process.env.PARTNERS_TO ||
      process.env.FORMS_TO ||
      process.env.CONTACT_TO ||
      "gifty@shopify.com";

    const mailSubject = `GIFTY — заявка партнёра: ${company}`;

    const text = [
      "Заявка партнёра (GIFTY)",
      "",
      `Имя: ${name}`,
      `Компания: ${company}`,
      `Email: ${email}`,
      phone ? `Телефон: ${phone}` : null,
      "",
      message ? "Комментарий:" : null,
      message ? message : null,
    ]
      .filter(Boolean)
      .join("\n");

    await sendMail({ to, subject: mailSubject, text, replyTo: email });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Не удалось отправить заявку." },
      { status: 500 }
    );
  }
}
