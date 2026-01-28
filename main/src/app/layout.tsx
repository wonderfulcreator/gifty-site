import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/providers/CartProvider";
import { I18nProvider } from "@/providers/I18nProvider";

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
    "Минималистичная подарочная упаковка: пакеты, бумага, открытки и аксессуары. Розница и опт.",
  metadataBase: baseUrl,
  openGraph: {
    title: siteName,
    description:
      "Минималистичная подарочная упаковка: витрина бренда, магазин и оптовый кабинет.",
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
        <I18nProvider>
          <CartProvider>
            <Header />
            <main className="min-h-[70vh]">{children}</main>
            <Footer />
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
