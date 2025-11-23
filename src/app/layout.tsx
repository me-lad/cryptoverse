import type { Metadata } from 'next';
import { IBM_Plex_Sans, Roboto } from 'next/font/google';
import clsx from 'clsx';

import ReactQueryProvider from '~vendors/react-query';
import ReactToastify from '~vendors/react-toastify';
import CurrencyContextProvider from '~contexts/Currency.context';
import FavoriteCoinsContextProvider from '~contexts/FavoriteCoins.context';
import HeaderFn from '~modules/layouts/header/Header.fn';
import FooterFn from '~modules/layouts/footer/Footer.fn';
import ThemeProvider from '~providers/Theme.provider';
import ThemeController from '~providers/Theme.controller';

import '../lib/styles/global.css';
import '../lib/styles/override.css';
import '../lib/vendors/react-toastify/index.css';

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
      className="*:selection:bg-primary-700 min-h-screen min-w-screen overflow-x-hidden *:selection:text-white"
      suppressHydrationWarning
    >
      <body
        className={clsx(ibmPlexSans.variable, roboto.variable, 'antialiased')}
      >
        <ReactQueryProvider>
          <CurrencyContextProvider>
            <FavoriteCoinsContextProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                {/* Header */}
                <HeaderFn />

                {/* Route interface */}
                <main className="w-full max-[81em]:overflow-x-hidden">
                  {children}
                </main>

                {/* Footer */}
                <FooterFn />

                {/* Theme controller */}
                <ThemeController />

                {/* Packages initialize */}
                <ReactToastify />
              </ThemeProvider>
            </FavoriteCoinsContextProvider>
          </CurrencyContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
