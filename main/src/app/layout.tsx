import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/providers/CartProvider";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "GIFTY";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : undefined;

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description:
    "Подарочные пакеты, упаковка и открытки. Editorial‑витрина бренда + чистый e‑commerce + оптовый кабинет.",
  metadataBase: baseUrl,
  openGraph: {
    title: siteName,
    description:
      "Подарочные пакеты, упаковка и открытки. Витрина бренда, магазин и опт.",
    type: "website",
    locale: "ru_RU",
    siteName,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
