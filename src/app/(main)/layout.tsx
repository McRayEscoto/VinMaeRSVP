import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VinMae Wedding",
  description: "We would like to invite you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="main_body" className='w-full h-dvh'>{children}</body>
    </html>
  );
}
