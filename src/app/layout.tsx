import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QueryVault",
  description: "It answer your query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
