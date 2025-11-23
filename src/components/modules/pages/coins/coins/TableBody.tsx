// 📌 Directives
'use client';

// 📦 Third-Party imports
import clsx from 'clsx';
import Link from 'next/link';
import React, { use } from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import { Button } from '~core/ui/shadcn/button';
import { Ellipsis, Link2 } from 'lucide-react';
import {
  TableBody as TableBodyShadcn,
  TableCell,
  TableRow,
} from '~core/ui/shadcn/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import { CoinsContext } from '../CoinsPage.context';
import { flexCenter } from '~styles/tw-custom';
import { FavoriteCoinsContext } from '@/components/contexts/FavoriteCoins.context';
import SkeltonTableRow from './SkeltonTableRow';
import { useHasMounted } from '~hooks/useHasMounted';

// 🧾 Local types
interface PropsT<TData> {
  table: Table<TData>;
}

// ⚙️ Functional component
function TableBody<TData>({ table }: PropsT<TData>) {
  const { params, flags } = use(CoinsContext);
  const { showFavorites, isFetchingFavorites } = use(FavoriteCoinsContext);
  const firstIndex = (params.page - 1) * params.perPage + 1;
  const hasMounted = useHasMounted();

  //   Loading ui
  if (!hasMounted || flags?.isFetching || isFetchingFavorites) {
    return (
      <TableBodyShadcn>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow className="mb-6 h-20" key={index}>
            <SkeltonTableRow />
          </TableRow>
        ))}
      </TableBodyShadcn>
    );
  }

  //   General ui
  if (table.getRowModel().rows?.length) {
    return (
      <TableBodyShadcn>
        {table.getRowModel().rows.map((row, index) => (
          <TableRow
            className={clsx('hover:*:border-primary/50 h-20 *:border-b')}
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
          >
            <TableCell className="rounded-l-sm font-semibold">
              <span className={flexCenter}>{firstIndex + index}</span>
            </TableCell>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {cell.id.includes('reset-sort') ? (
                  <div className="flex justify-center">
                    {/* Parallel page link */}
                    <Tooltip>
                      <Link
                        href={`/coin/${(cell.row.original as CoinEntity_Gecko).id}`}
                        scroll={false}
                      >
                        <TooltipTrigger asChild>
                          <Button
                            className="hover:!bg-background cursor-pointer"
                            variant={'ghost'}
                            size={'icon'}
                          >
                            <Ellipsis />
                          </Button>
                        </TooltipTrigger>
                      </Link>
                      <TooltipContent>Modal</TooltipContent>
                    </Tooltip>

                    {/* Direct page link */}
                    <Tooltip>
                      <a
                        href={`/coin/${(cell.row.original as CoinEntity_Gecko).id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TooltipTrigger asChild>
                          <Button
                            className="hover:!bg-background cursor-pointer"
                            variant={'ghost'}
                            size={'icon'}
                          >
                            <Link2 />
                          </Button>
                        </TooltipTrigger>
                      </a>
                      <TooltipContent>Page</TooltipContent>
                    </Tooltip>
                  </div>
                ) : (
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )}
              </TableCell>
            ))}
            <TableCell className="w-0 rounded-r-sm"></TableCell>
          </TableRow>
        ))}
      </TableBodyShadcn>
    );
  }

  //   No data ui
  return (
    <TableBodyShadcn>
      <TableRow>
        <TableCell
          colSpan={table.getAllColumns().length + 2}
          className="h-24 text-center text-lg"
        >
          {showFavorites
            ? 'You have not added anything to your favorites list yet.'
            : 'No results.'}
        </TableCell>
      </TableRow>
    </TableBodyShadcn>
  );
}
export default TableBody;
