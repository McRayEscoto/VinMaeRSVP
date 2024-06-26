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
         <body id="main_body" className="flex flex-col items-center justify-center w-full h-full lg:w-dvw lg:min-h-dvh">
            {children}
         </body>
      </html>
   );
}
