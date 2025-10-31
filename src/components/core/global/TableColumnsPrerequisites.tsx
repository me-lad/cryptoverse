// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { use } from 'react';
import { Column } from '@tanstack/react-table';
import { ArrowDownUp, Star } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import clsx from 'clsx';

// 📦 Internal imports
import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import { Percentage, Price } from '~core/global/formatters';
import { FavoriteCoinsContext } from '~modules/FavoriteCoins.context';
import { flexCenter } from '~styles/tw-custom';
import { useCurrency } from '~hooks/useCurrency';

// 🧾 Prerequisites for columns definition
interface FavoriteTogglerPropsT {
  id: string;
}
export const FavoriteToggler: React.FC<FavoriteTogglerPropsT> = ({ id }) => {
  const { favoriteIDs, changeHandler } = use(FavoriteCoinsContext);
  const isAlreadySelected = favoriteIDs.includes(id);

  return (
    <div
      onClick={() => changeHandler(id)}
      className={`${flexCenter} cursor-pointer`}
    >
      <Star
        className={clsx(isAlreadySelected && 'text-[#DBA400]')}
        size={16}
        fill={isAlreadySelected ? '#DBA400' : 'transparent'}
      />
    </div>
  );
};

interface SortableHeadersPropsT {
  tag: string;
  column: Column<CoinEntity_Gecko>;
}
export const SortableHeaders = ({ tag, column }: SortableHeadersPropsT) => {
  return (
    <Button
      className="cursor-pointer"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {tag}
      <ArrowDownUp size={16} />
    </Button>
  );
};

interface PriceCellPropsT {
  value: number;
}
export const PriceCell = ({ value }: PriceCellPropsT) => {
  const { convertedPrice } = useCurrency(value);

  return (
    <div>
      <Tooltip>
        <TooltipTrigger>
          <Price imageWidth={22} imageHeight={22} price={value} />
        </TooltipTrigger>
        <TooltipContent>{convertedPrice}</TooltipContent>
      </Tooltip>
    </div>
  );
};

interface PercentageCellPropsT {
  value: number;
  title?: string;
}
export const PercentageCell = ({ value }: PercentageCellPropsT) => {
  return (
    <div>
      <Tooltip>
        <TooltipTrigger>
          <Percentage percentage={value} iconSize={17} />
        </TooltipTrigger>
        <TooltipContent>{value}</TooltipContent>
      </Tooltip>
    </div>
  );
};
