import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { formatRUB } from "@/lib/utils";

export const runtime = "nodejs";

function clean(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

type OrderLine = {
  productId: string;
  title: string;
  mode: "retail" | "wholesale";
  qty: number;
  price: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const customer = body?.customer || {};
    const name = clean(customer?.name);
    const email = clean(customer?.email);
    const phone = clean(customer?.phone);
    const comment = clean(body?.comment);
    const total = Number(body?.total || 0);
    const linesRaw = Array.isArray(body?.lines) ? body.lines : [];

    const lines: OrderLine[] = linesRaw
      .map((l: any) => ({
        productId: clean(l?.productId),
        title: clean(l?.title),
        mode: l?.mode === "wholesale" ? "wholesale" : "retail",
        qty: Number(l?.qty || 0),
        price: Number(l?.price || 0),
      }))
      .filter((l: OrderLine) => l.title && l.qty > 0 && l.price >= 0);

    if (!name || !email) {
      return NextResponse.json(
        { error: "Заполните имя и email." },
        { status: 400 }
      );
    }

    if (lines.length === 0) {
      return NextResponse.json(
        { error: "Корзина пуста." },
        { status: 400 }
      );
    }

    const to = process.env.ORDERS_TO || process.env.FORMS_TO || "gifty@shopify.com";

    const subject = "GIFTY — новая заявка с сайта";

    const linesText = lines
      .map((l) => {
        const modeLabel = l.mode === "wholesale" ? "Опт" : "Розница";
        const sum = l.price * l.qty;
        return `• ${l.title} — ${modeLabel} — ${l.qty} шт. × ${formatRUB(l.price)} = ${formatRUB(sum)}`;
      })
      .join("\n");

    const text = [
      "Новая заявка с сайта GIFTY",
      "",
      `Имя: ${name}`,
      `Email: ${email}`,
      phone ? `Телефон: ${phone}` : null,
      "",
      "Состав:",
      linesText,
      "",
      `Итого: ${formatRUB(total)}`,
      comment ? "" : null,
      comment ? "Комментарий:" : null,
      comment ? comment : null,
    ]
      .filter(Boolean)
      .join("\n");

    await sendMail({ to, subject, text, replyTo: email });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Не удалось отправить заявку." },
      { status: 500 }
    );
  }
}
