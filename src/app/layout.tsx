import type { Metadata } from "next";
import { IBM_Plex_Sans, Roboto } from "next/font/google";
import clsx from "clsx";

import { containerDefault } from "@/lib/shared/tw-custom";
import HeaderFn from "@/components/modules/header/Header.fn";
import FooterFn from "@/components/modules/footer/Footer.fn";
import ReactToastify from "@/lib/configs/react-toastify";
import "./globals.css";

// Metadata
export const metadata: Metadata = {
  title: "Crypto Verse",
  icons: {
    icon: "/svgs/logo/logo.svg",
  },
};

// Fonts
const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="relative z-[2] min-h-screen min-w-screen overflow-x-hidden"
    >
      <body
        className={clsx(
          ibmPlexSans.variable,
          roboto.variable,
          containerDefault,
          "min-h-screen antialiased",
        )}
      >
        {/* Header */}
        <HeaderFn />

        {/* Route interface */}
        <main className="w-full">{children}</main>

        {/* Footer */}
        <FooterFn />

        {/* Packages initialize */}
        <ReactToastify />
      </body>
    </html>
  );
}
