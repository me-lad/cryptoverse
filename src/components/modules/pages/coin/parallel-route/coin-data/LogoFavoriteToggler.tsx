// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { Star } from 'lucide-react';
import React, { use, useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

// 📦 Internal imports
import { FavoriteCoinsContext } from '@/components/contexts/FavoriteCoins.context';
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  imageUrl: string;
  coinId: string;
}

// ⚙️ Functional component
const LogoFavoriteToggler: React.FC<PropsT> = ({ coinId, imageUrl }) => {
  const { favoriteIDs, changeHandler } = use(FavoriteCoinsContext);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(true);
      setTimeout(() => setTick(false), 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Tooltip>
      <div className="group relative h-8 w-8">
        <TooltipTrigger>
          <div
            className={clsx(
              'hover:bg-background-lighter invisible absolute top-0 left-0 z-10 h-full w-full cursor-pointer rounded-sm opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100',
              tick && '!visible !opacity-100',
              flexCenter,
            )}
            onClick={() => changeHandler(coinId)}
          >
            <Star
              className={clsx(favoriteIDs.includes(coinId) && 'text-[#DBA400]')}
              size={16}
              fill={favoriteIDs.includes(coinId) ? '#DBA400' : 'transparent'}
            />
          </div>
        </TooltipTrigger>

        <TooltipContent className="absolute bottom-full -left-14 mb-5 w-max text-center">
          <p className={clsx(!favoriteIDs.includes(coinId) && 'invisible h-0')}>
            Remove from favorites
          </p>
          <p className={clsx(favoriteIDs.includes(coinId) && 'invisible h-0')}>
            Add to favorites
          </p>
        </TooltipContent>

        <Image
          className={clsx(
            'absolute top-0 left-0 cursor-pointer rounded-sm transition-all duration-200 group-hover:opacity-0',
            tick && '!invisible !opacity-0',
          )}
          src={imageUrl}
          width={34}
          height={34}
          alt={coinId}
        />
      </div>
    </Tooltip>
  );
};
export default LogoFavoriteToggler;
