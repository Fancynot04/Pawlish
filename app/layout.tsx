import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pawlish 宠物洗护店",
  description: "Pawlish 宠物洗护店精品单页官网"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
