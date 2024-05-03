import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VinMae Wedding",
  description: "We're glad to invite you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-dvh h-dvh bg-texture-bg">{children}</body>
    </html>
  );
}
