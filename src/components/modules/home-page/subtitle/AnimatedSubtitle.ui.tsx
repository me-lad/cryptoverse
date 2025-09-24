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
import SubtitleItem from './SubtitleItem';

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
            <SubtitleItem key={coin.ID} {...coin} />
          ))}
          {/* Duplicate content for seamless loop */}
          {coins.map((coin) => (
            <SubtitleItem key={`duplicate-${coin.ID}`} {...coin} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AnimatedSubtitleUi;
