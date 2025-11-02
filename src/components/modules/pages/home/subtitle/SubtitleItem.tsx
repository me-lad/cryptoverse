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
const SubtitleItem: React.FC<CoinEntity_Gecko> = (props) => {
  const { image, name, current_price, price_change_percentage_24h, id } = props;

  return (
    <Link
      href={`/coin/${id}`}
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
        <span className="font-semibold">
          <Price price={current_price} />
        </span>
      </div>
      <div
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
