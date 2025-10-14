// 📦 Third-Party imports
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

// 📦 Internal imports
import { CoinEntity_Gecko } from '~types/api-generated/shared';
import { formatPercentage } from '~helpers/formatters';
import { flexCenter } from '~styles/tw-custom';
import { Price } from '~core/global/formatters';

// ⚙️ Functional component
const SubtitleItem: React.FC<CoinEntity_Gecko> = ({
  image,
  name,
  high_24h,
  price_change_percentage_24h,
  symbol,
}) => {
  return (
    <Link
      href={`/coin/${symbol}`}
      className={`${flexCenter} hover:bg-primary-800 h-full min-w-[10%] gap-4 rounded-xs transition-colors`}
    >
      <div>
        <Image
          src={image || '/svgs/logo/logo.svg'}
          width={24}
          height={24}
          alt={name}
        />
      </div>
      <div>
        <span className="text-lg font-semibold">{name}</span>
      </div>
      <div>
        <span
          className="font-semibold"
          title={`$ ${high_24h.toLocaleString('en')}`}
        >
          <Price price={high_24h} />
        </span>
      </div>
      <div
        title={`${price_change_percentage_24h}`}
        className={clsx(
          'font-semibold',
          formatPercentage(price_change_percentage_24h).startsWith('-')
            ? 'text-status-error-200'
            : 'text-status-success-200',
        )}
      >
        ({formatPercentage(price_change_percentage_24h)})
      </div>
    </Link>
  );
};
export default SubtitleItem;
