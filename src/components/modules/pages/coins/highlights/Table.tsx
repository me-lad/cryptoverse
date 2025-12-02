// 📌 Directives

// 📦 Third-Party imports
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~core/ui/shadcn/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { CoinEntity_Compare } from '~types/api-generated/shared';
import type { Coin } from '~types/api-generated/coins/getTrendingCoins';
import { Percentage, Price } from '~core/global/formatters';
import TableBodyItem from './TableBodyItem';

// 🧾 Local types
type PropsT =
  | {
      list: CoinEntity_Compare[];
      source: 'Compare';
    }
  | {
      list: Coin[];
      source: 'Gecko';
    };

// ⚙️ Functional component
const TableComp: React.FC<PropsT> = ({ list, source }) => {
  return (
    <div className="max-sm:max-w-[calc(100dvw-5rem)]">
      <Table className="overflow-x-auto max-sm:max-w-[calc(100dvw_-_2.5rem)]">
        {/* Header */}
        <TableHeader>
          <TableRow className="!border-0 !outline-0">
            <TableHead className="min-w-max">Pair</TableHead>
            <TableHead className="min-w-max max-sm:px-5">Price</TableHead>
            <TableHead className="min-w-max max-sm:px-5">24h Change</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {source === 'Compare' &&
            list.map((item, index) => (
              <TableBodyItem
                key={item.ID}
                source="Compare"
                data={item}
                index={index}
              />
            ))}

          {source === 'Gecko' &&
            list.map((item, index) => (
              <TableBodyItem
                key={item.item.id}
                source="Gecko"
                data={item}
                index={index}
              />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableComp;
