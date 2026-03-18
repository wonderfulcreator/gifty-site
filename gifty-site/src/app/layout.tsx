import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/providers/CartProvider";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Пакет Пакетыч";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : undefined;

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description:
    "Пакет Пакетыч — каталог подарочных пакетов, упаковки и открыток с розничным магазином и B2B-кабинетом.",
  metadataBase: baseUrl,
  openGraph: {
    title: siteName,
    description:
      "Весёлый бренд подарочной упаковки: магазин, блог, партнёрские заявки и оптовый кабинет.",
    type: "website",
    locale: "ru_RU",
    siteName,
    images: [
      {
        url: "/brand/logo-main.png",
        width: 480,
        height: 440,
        alt: siteName,
      },
    ],
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
      <body className="min-h-screen antialiased">
        <CartProvider>
          <div className="relative isolate flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
