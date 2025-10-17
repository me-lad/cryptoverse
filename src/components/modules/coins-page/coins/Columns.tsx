// 📌 Directives
'use client';

// 📦 Third-Party imports
import { ColumnDef } from '@tanstack/react-table';
import { Star } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import Image from 'next/image';
import Link from 'next/link';

// 📦 Internal imports
import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import { flexCenter } from '~styles/tw-custom';
import { Percentage, Price } from '~core/global/formatters';
import { buildCoinChart } from '~helpers/generators';

// 🧾 Local variables
export const columns: ColumnDef<CoinEntity_Gecko>[] = [
  {
    accessorKey: 'id',
    header: '',
    cell: () => (
      <div className={`${flexCenter} cursor-pointer`}>
        <Star size={16} />
      </div>
    ),
  },
  {
    accessorKey: 'pair',
    header: 'Pair',
    cell: ({ row }) => (
      <Link
        href={`/coin/${row.original.symbol}`}
        className="flex w-fit items-center gap-4"
      >
        <Image
          src={row.original.image}
          width={30}
          height={30}
          alt={row.original.name}
          className="mix-blend-screen"
        />
        <div>
          <h4 className="text-lg font-semibold">
            {row.original.symbol.toUpperCase()}
          </h4>
          <p className="mt-0.5 text-sm text-neutral-400">
            {row.original.id.slice(0, 1).toUpperCase() +
              row.original.id.slice(1)}
          </p>
        </div>
      </Link>
    ),
  },
  {
    accessorKey: 'current_price',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Price
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <Price price={row.original.current_price} />
      </div>
    ),
  },
  {
    accessorKey: 'price_change_percentage_24h_in_currency',
    header: ({ column }) => (
      <Button
        className="cursor-pointer"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        24h
      </Button>
    ),
    cell: ({ row }) => (
      <div
        title={row.original.price_change_percentage_24h_in_currency.toString()}
      >
        <Percentage
          percentage={row.original.price_change_percentage_24h_in_currency}
          iconSize={17}
        />
      </div>
    ),
  },
  {
    accessorKey: 'price_change_percentage_7d_in_currency',
    header: ({ column }) => (
      <Button
        className="cursor-pointer"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        7d
      </Button>
    ),
    cell: ({ row }) => (
      <div
        title={row.original.price_change_percentage_7d_in_currency.toString()}
      >
        <Percentage
          percentage={row.original.price_change_percentage_7d_in_currency}
          iconSize={17}
        />
      </div>
    ),
  },
  {
    accessorKey: 'price_change_percentage_30d_in_currency',
    header: ({ column }) => (
      <Button
        className="cursor-pointer"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        30d
      </Button>
    ),
    cell: ({ row }) => (
      <div
        title={row.original.price_change_percentage_30d_in_currency.toString()}
      >
        <Percentage
          percentage={row.original.price_change_percentage_30d_in_currency}
          iconSize={17}
        />
      </div>
    ),
  },
  {
    accessorKey: 'market_cap',
    header: ({ column }) => (
      <Button
        className="cursor-pointer"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Market Cap
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <Price price={row.original.market_cap} />
      </div>
    ),
  },
  {
    accessorKey: 'total_volume',
    header: ({ column }) => (
      <Button
        className="cursor-pointer"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Total Volume
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <Price price={row.original.total_volume} />
      </div>
    ),
  },
  {
    accessorKey: 'chart',
    header: '7d SparkLine',
    cell: ({ row }) => (
      <div>
        <Image
          src={buildCoinChart(row.original.symbol)}
          width={175}
          height={30}
          alt={row.original.symbol}
        />
      </div>
    ),
  },
];
