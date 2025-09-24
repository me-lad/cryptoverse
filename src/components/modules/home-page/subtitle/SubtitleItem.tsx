// 📦 Third-Party imports
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

// 📦 Internal imports
import { LISTEntity } from '~types/api-generated/getTopCoins';
import { formatPercentage, formatPrice } from '~helpers/formatters';
import { flexCenter } from '~styles/tw-custom';

// ⚙️ Functional component
const SubtitleItem: React.FC<LISTEntity> = ({
  LOGO_URL,
  NAME,
  PRICE_USD,
  SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD,
  SYMBOL,
}) => {
  return (
    <Link
      href={`/coin/${SYMBOL}`}
      className={`${flexCenter} hover:bg-primary-800 h-full min-w-[10%] gap-4 rounded-xs transition-colors`}
    >
      <div>
        <Image
          src={LOGO_URL || '/svgs/logo/logo.svg'}
          width={24}
          height={24}
          alt={NAME}
        />
      </div>
      <div>
        <span className="text-lg font-semibold">{NAME}</span>
      </div>
      <div>
        <span className="font-semibold">{formatPrice(PRICE_USD)}</span>
      </div>
      <div
        className={clsx(
          'font-semibold',
          formatPercentage(
            SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD,
          ).startsWith('-')
            ? 'text-status-error-200'
            : 'text-status-success-200',
        )}
      >
        ({formatPercentage(SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD)})
      </div>
    </Link>
  );
};
export default SubtitleItem;
