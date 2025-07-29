import type { Metadata } from "next";
import { IBM_Plex_Sans, Roboto } from "next/font/google";
import "./globals.css";

// Metadata
export const metadata: Metadata = {
  title: "Crypto Verse",
  icons: {
    icon: "/svgs/logo.svg",
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
    <html lang="en">
      <body className={`${ibmPlexSans.variable} ${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
