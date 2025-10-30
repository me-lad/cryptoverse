// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { Column } from '@tanstack/react-table';
import { ArrowDownUp } from 'lucide-react';
import { Price } from '~core/global/formatters';
import { flexCenter } from '~styles/tw-custom';

// 🧾 Prerequisites for columns definition
interface SortableHeadersPropsT {
  tag: string;
  column: Column<[string, string]>;
}
export const SortableHeaders = ({ tag, column }: SortableHeadersPropsT) => {
  return (
    <div
      className={`${flexCenter} group relative cursor-pointer gap-2 rounded-sm px-3 py-1.5 hover:text-transparent`}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {tag}
      <div
        className={`${flexCenter} invisible absolute top-0 left-0 h-full w-full gap-2 rounded-sm bg-black/30 px-3 py-1.5 !text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100`}
      >
        {tag}
        <ArrowDownUp size={15} />
      </div>
      <ArrowDownUp size={15} />
    </div>
  );
};

interface PriceCellPropsT {
  value: number;
}
export const PriceCell = ({ value }: PriceCellPropsT) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div>
          <Price className="mx-auto w-fit" price={value} />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">{value.toLocaleString()}</TooltipContent>
    </Tooltip>
  );
};
