import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Super App",
  description: "40 AI apps in one — 毎日開く、を作る。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
