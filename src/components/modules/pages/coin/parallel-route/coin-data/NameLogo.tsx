// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { Button } from '~core/ui/shadcn/button';
import { Star } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

// 📦 Internal imports
import type { GetCoinData } from '~types/api-generated/getCoinData';
import { FavoriteCoinsContext } from '~modules/FavoriteCoins.context';
import { flexBetween, flexCenter } from '~styles/tw-custom';

// ⚙️ Functional component
const NameLogo: React.FC<GetCoinData> = ({
  name,
  image,
  symbol,
  id,
  last_updated,
}) => {
  const { favoriteIDs, changeHandler } = use(FavoriteCoinsContext);
  const [tick, setTick] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(true);
      setTimeout(() => setTick(false), 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={flexBetween}>
      <div className="flex items-center gap-3">
        <Tooltip>
          <div className="group relative h-8 w-8">
            <TooltipTrigger>
              <div
                className={clsx(
                  'hover:bg-background-lighter invisible absolute top-0 left-0 z-10 h-full w-full cursor-pointer rounded-sm opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100',
                  tick && '!visible !opacity-100',
                  flexCenter,
                )}
                onClick={() => changeHandler(id)}
              >
                <Star
                  className={clsx(favoriteIDs.includes(id) && 'text-[#DBA400]')}
                  size={16}
                  fill={favoriteIDs.includes(id) ? '#DBA400' : 'transparent'}
                />
              </div>
            </TooltipTrigger>

            <TooltipContent className="absolute bottom-full -left-14 mb-5 w-max text-center">
              <p className={clsx(!favoriteIDs.includes(id) && 'invisible h-0')}>
                Remove from favorites
              </p>
              <p className={clsx(favoriteIDs.includes(id) && 'invisible h-0')}>
                Add to favorites
              </p>
            </TooltipContent>

            <Image
              className={clsx(
                'group-hover:invalid: absolute top-0 left-0 cursor-pointer transition-all duration-200 group-hover:opacity-0',
                tick && '!invisible !opacity-0',
              )}
              src={image.large}
              width={34}
              height={34}
              alt={symbol}
            />
          </div>
        </Tooltip>
        <h1 className="text-2xl">
          {name} <small className="text-xs">( {symbol.toUpperCase()} )</small>
        </h1>
      </div>

      <p className="text-sm">
        ( Last Updated At : {updateDate} - {updateHour})
      </p>
    </div>
  );
};
export default NameLogo;
