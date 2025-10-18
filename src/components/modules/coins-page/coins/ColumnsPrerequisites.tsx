// 📦 Third-Party imports
import { Column } from '@tanstack/react-table';
import { ArrowDownUp } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';

// 📦 Internal imports
import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import { Percentage, Price } from '~core/global/formatters';

// 🧾 Prerequisites for columns definition
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
  return (
    <div>
      <Price price={value} />
    </div>
  );
};

interface PercentageCellPropsT {
  value: number;
  title?: string;
}
export const PercentageCell = ({ value, title }: PercentageCellPropsT) => {
  return (
    <div title={typeof title === 'string' ? title : ''}>
      <Percentage percentage={value} iconSize={17} />
    </div>
  );
};
