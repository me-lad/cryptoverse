// 📦 Third-Party imports
import { Copyright } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

// 📦 Internal imports
import { containerDefault, flexBetween, flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  isHomePage?: boolean;
}

// ⚙️ Functional component
export default function FooterUi({ isHomePage }: PropsT) {
  return (
    <footer className={clsx('mt-32 w-screen', isHomePage && 'mb-12')}>
      <div className="w-full bg-gradient-to-r from-neutral-950 from-15% via-neutral-800 to-neutral-950 to-85% pt-8 pb-4">
        {/* Footer content */}
        <div className={`${flexBetween} ${containerDefault} w-1/4 pb-8`}>
          <div className={`${flexCenter} flex-col`}>
            <Link className={`${flexCenter} flex-col`} href={'/'}>
              <Image
                src={'/images/logo/logo-56h.png'}
                alt="Crypto Verse"
                width={84}
                height={40}
              />
              <h6 className="text-primary mt-2 text-center text-2xl font-semibold">
                CryptoVerse
              </h6>
            </Link>
            <span className="mt-1 block text-sm font-normal tracking-wide text-neutral-300">
              Trade smarter, Grow faster
            </span>
            <div className="mt-4 flex items-center gap-3 *:cursor-pointer *:transition-all *:hover:-translate-y-0.5">
              <Image
                src={'/svgs/logo/facebook.svg'}
                width={20}
                height={20}
                alt="Socials"
              />
              <Image
                src={'/svgs/logo/twitter.svg'}
                width={20}
                height={20}
                alt="Socials"
              />
              <Image
                src={'/svgs/logo/instagram.svg'}
                width={20}
                height={20}
                alt="Socials"
              />
              <Image
                src={'/svgs/logo/linkedin.svg'}
                width={20}
                height={20}
                alt="Socials"
              />
            </div>
          </div>

          <div className="grid w-3/4 grid-cols-5 items-start *:min-w-1/5">
            <div className={`${flexCenter} flex-col items-start`}>
              <h6 className="text-base font-medium">Explore</h6>
              <ul className="mt-4 *:text-neutral-400 *:not-first:mt-1">
                <li>
                  <Link href={'/markets'}>Markets</Link>
                </li>
                <li>
                  <Link href={''}>Spot</Link>
                </li>
              </ul>
            </div>
            <div className={`${flexCenter} flex-col items-start`}>
              <h6 className="text-base font-medium">News</h6>
              <ul className="mt-4 *:text-neutral-400 *:not-first:mt-1">
                <li>
                  <a href={'/news'}>Latest news</a>
                </li>
                <li>
                  <a href={'/news?language=ES'}>Spanish news</a>
                </li>
                <li>
                  <a href={'/news?language=FR'}>French news</a>
                </li>
                <li>
                  <a href={'/news?language=TR'}>Turkish news</a>
                </li>
              </ul>
            </div>
            <div className={`${flexCenter} flex-col items-start`}>
              <h6 className="text-base font-medium">About us</h6>
              <ul className="mt-4 *:text-neutral-400 *:not-first:mt-1">
                <li>
                  <Link href={'/contact-us'}>About Us</Link>
                </li>
                <li>
                  <Link href={'/about-us'}>Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className={`${flexCenter} flex-col items-start`}>
              <h6 className="text-base font-medium">Support</h6>
              <ul className="mt-4 *:text-neutral-400 *:not-first:mt-1">
                <li>
                  <Link href={'/support'}>Customer support</Link>
                </li>
                <li>
                  <Link href={'/faq'}>FAQs</Link>
                </li>
              </ul>
            </div>
            <div className={`${flexCenter} flex-col items-start`}>
              <h6 className="text-base font-medium">Currencies price </h6>
              <ul className="mt-4 *:text-neutral-400 *:not-first:mt-1">
                <li>
                  <Link href={'/coin/BTC'}>Bitcoin price</Link>
                </li>
                <li>
                  <Link href={'/coin/ETH'}>Ethereum price</Link>
                </li>
                <li>
                  <Link href={'/coin/USDT'}>Tether price</Link>
                </li>
                <li>
                  <Link href={'/coin/TRX'}>TRON price</Link>
                </li>
                <li>
                  <Link href={'/coin/BNB'}>Binance Coin price</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Foot note */}
        <div
          className={`${containerDefault} ${flexCenter} gap-2 border-t border-neutral-700 pt-4 text-neutral-500`}
        >
          <Copyright size={19} className="mt-0.5" />
          <p className="text-sm">2025 CryptoVerse. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
