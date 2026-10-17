import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// Work Sans из направления не содержит кириллицы, поэтому взят Manrope с тем же характером.
const sans = Manrope({
  variable: "--font-work",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Природа — магазин сезонных букетов",
  description:
    "Букеты из того, что сейчас в цвету. Календарь сезона, каталог и заказ в один клик.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
