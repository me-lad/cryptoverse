// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import type { GetCoinData } from '@/lib/types/api-generated/coins/getCoinData';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import LogoFavoriteToggler from './LogoFavoriteToggler';

// ⚙️ Functional component
const NameLogo: React.FC<GetCoinData> = ({
  image,
  symbol,
  id,
  last_updated,
}) => {
  const updateHour = new Date(last_updated).toLocaleString('en-Us', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hourCycle: 'h24',
  });
  const updateDate = new Date(last_updated).toLocaleString('en-Us', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div className={flexBetween}>
      <div className="flex items-center gap-3">
        <LogoFavoriteToggler coinId={id} imageUrl={image.large} />

        <h1 className="text-2xl">
          {id.slice(0, 1).toUpperCase() + id.slice(1)}{' '}
          <small className="text-xs">( {symbol.toUpperCase()} )</small>
        </h1>
      </div>

      <p className="text-sm max-md:hidden">
        ( Last Updated At : {updateDate} - {updateHour})
      </p>
    </div>
  );
};
export default NameLogo;
