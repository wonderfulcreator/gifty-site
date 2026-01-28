import nodemailer from "nodemailer";

type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

function getEnv(name: string) {
  const v = process.env[name];
  return typeof v === "string" ? v.trim() : "";
}

export function isMailConfigured() {
  return Boolean(getEnv("SMTP_HOST") && getEnv("SMTP_USER") && getEnv("SMTP_PASS"));
}

export async function sendMail({ to, subject, text, replyTo }: SendMailInput) {
  const host = getEnv("SMTP_HOST");
  const port = Number(getEnv("SMTP_PORT") || "587");
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");
  const from = getEnv("SMTP_FROM") || user;
  const secure = (getEnv("SMTP_SECURE") || "").toLowerCase() === "true" || port === 465;

  if (!host || !user || !pass) {
    throw new Error(
      "Email service is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally SMTP_FROM)."
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
  });
}
