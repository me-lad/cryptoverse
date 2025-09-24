import type { Metadata } from 'next';
import { IBM_Plex_Sans, Roboto } from 'next/font/google';
import clsx from 'clsx';

import ReactQueryProvider from '~configs/react-query';
import ReactToastify from '~configs/react-toastify';
import HeaderFn from '~core/layout/header/Header.fn';
import FooterFn from '~core/layout/footer/Footer.fn';
import '../lib/styles/global.css';
import '../lib/styles/override.css';
import '../lib/styles/utilities.css';
import '../lib/styles/react-toastify.css';

// Metadata
export const metadata: Metadata = {
  title: 'Crypto Verse',
  icons: {
    icon: '/svgs/logo/logo.svg',
  },
};

// Fonts
const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});
const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
      className="*:selection:bg-primary min-h-screen min-w-screen overflow-x-hidden *:selection:text-white"
    >
      <body
        className={clsx(ibmPlexSans.variable, roboto.variable, 'antialiased')}
      >
        <ReactQueryProvider>
          {/* Header */}
          <HeaderFn />

          {/* Route interface */}
          <main className="w-full">{children}</main>

          {/* Footer */}
          <FooterFn />

          {/* Packages initialize */}
          <ReactToastify />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
