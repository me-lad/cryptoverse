// 📦 Third-Party imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

// 📦 Internal imports
import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import styles from './AnimatedSubtitle.module.css';
import SubtitleItem from './SubtitleItem';

// 🧾 Local types
interface PropsT {
  coins: CoinEntity_Gecko[];
}

// ⚙️ Functional component
const AnimatedSubtitleUi: React.FC<PropsT> = ({ coins }) => {
  return (
    <div className="group bg-background-lighter fixed right-0 bottom-0 left-0 z-[49] h-12 w-screen overflow-hidden">
      <div className="relative h-full w-full">
        <div
          className={`${styles['animate-marquee']} group-hover:pause-animation absolute flex h-full items-center whitespace-nowrap [will-change:transform]`}
        >
          {/* Original content */}
          {coins.map((coin) => (
            <SubtitleItem key={coin.id} {...coin} />
          ))}
          {/* Duplicate content for seamless loop */}
          {coins.map((coin) => (
            <SubtitleItem key={`duplicate-${coin.id}`} {...coin} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AnimatedSubtitleUi;
