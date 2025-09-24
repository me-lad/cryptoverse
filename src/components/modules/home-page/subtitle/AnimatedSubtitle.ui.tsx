// 📦 Third-Party imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

// 📦 Internal imports
import type { LISTEntity } from '~types/api-generated/getTopCoins';
import { flexCenter } from '~styles/tw-custom';
import { formatPercentage, formatPrice } from '~helpers/formatters';
import styles from './AnimatedSubtitle.module.css';

// 🧾 Local types
interface PropsT {
  coins: LISTEntity[];
}

// ⚙️ Functional component
const AnimatedSubtitleUi: React.FC<PropsT> = ({ coins }) => {
  return (
    <div className="group bg-background-lighter fixed right-0 bottom-0 left-0 z-[1000] h-12 w-screen overflow-hidden">
      <div className="relative h-full w-full">
        <div
          className={`${styles['animate-marquee']} group-hover:pause-animation absolute flex h-full items-center whitespace-nowrap [will-change:transform]`}
        >
          {/* Original content */}
          {coins.map((coin) => (
            <Link
              href={`/coin/${coin.SYMBOL}`}
              key={coin.ID}
              className={`${flexCenter} min-w-[13%] gap-4`}
            >
              <div>
                <Image
                  src={coin.LOGO_URL || '/svgs/logo/logo.svg'}
                  width={24}
                  height={24}
                  alt={coin.NAME}
                />
              </div>
              <div>
                <span className="text-lg font-semibold">{coin.NAME}</span>
              </div>
              <div>
                <span className="font-semibold">
                  {formatPrice(coin.PRICE_USD)}
                </span>
              </div>
              <div
                className={clsx(
                  'font-semibold',
                  formatPercentage(
                    coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD,
                  ).startsWith('-')
                    ? 'text-status-error-200'
                    : 'text-status-success-200',
                )}
              >
                (
                {formatPercentage(
                  coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD,
                )}
                )
              </div>
            </Link>
          ))}
          {/* Duplicate content for seamless loop */}
          {coins.map((coin) => (
            <Link
              href={`/coin/${coin.SYMBOL}`}
              key={`duplicate-${coin.ID}`}
              className={`${flexCenter} min-w-[10%] gap-4`}
            >
              <div>
                <Image
                  src={coin.LOGO_URL || '/svgs/logo/logo.svg'}
                  width={24}
                  height={24}
                  alt={coin.NAME}
                />
              </div>
              <div>
                <span className="text-lg font-semibold">{coin.NAME}</span>
              </div>
              <div>
                <span className="font-semibold">
                  {formatPrice(coin.PRICE_USD)}
                </span>
              </div>
              <div
                className={clsx(
                  'font-semibold',
                  formatPercentage(
                    coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD,
                  ).startsWith('-')
                    ? 'text-status-error-200'
                    : 'text-status-success-200',
                )}
              >
                (
                {formatPercentage(
                  coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD,
                )}
                )
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AnimatedSubtitleUi;
