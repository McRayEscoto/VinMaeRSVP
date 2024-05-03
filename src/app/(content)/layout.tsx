import TopBar from "@/components/TopBar";
import "../globals.css";
import type { Metadata } from "next";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Philip+Jane Wedding",
  description: "We would like to invite you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="main_body" className="w-full h-dvh bg-opacity-25 flex flex-col items-center">
        <TopBar></TopBar>
        {children}
      </body>
    </html>
  );
}
