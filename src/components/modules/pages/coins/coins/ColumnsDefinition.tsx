// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useState } from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// 📦 Internal imports
import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import { flexCenter } from '~styles/tw-custom';
import { buildCoinChart } from '~helpers/generators';
import {
  PercentageCell,
  PriceCell,
  SortableHeaders,
} from './ColumnsPrerequisites';

// 🧾 Table columns
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
    filterFn: <TData,>(
      row: Row<TData>,
      columnId: string,
      filterValue: string,
      addMeta: (meta: any) => void,
    ) => {
      const coinName = (row.original as CoinEntity_Gecko).id || '';
      const coinSymbol = (row.original as CoinEntity_Gecko).symbol || '';
      const match =
        coinName.toLowerCase().includes(filterValue.toLowerCase()) ||
        coinSymbol.toLowerCase().includes(filterValue.toLowerCase());

      addMeta({ match });
      return match;
    },
    cell: ({ row }) => {
      const [src, setSrc] = useState(row.original.image);
      const fallbackLogo = '/svgs/logo/logo.svg';

      return (
        <Link
          href={`/coin/${row.original.symbol}`}
          className="flex w-fit items-center gap-4"
        >
          <Image
            src={
              !src.startsWith('http') && !src.startsWith('/')
                ? fallbackLogo
                : src
            }
            width={30}
            height={30}
            alt={row.original.name}
            className="mix-blend-screen"
            onError={() => setSrc(fallbackLogo)}
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
      );
    },
  },
  {
    accessorKey: 'current_price',
    header: ({ column }) => <SortableHeaders column={column} tag="Price" />,
    cell: ({ row }) => <PriceCell value={row.original.current_price} />,
  },
  {
    accessorKey: 'price_change_percentage_24h_in_currency',
    header: ({ column }) => <SortableHeaders column={column} tag="24h" />,
    cell: ({ row }) => (
      <PercentageCell
        title={String(row.original.price_change_percentage_24h_in_currency)}
        value={row.original.price_change_percentage_24h_in_currency}
      />
    ),
  },
  {
    accessorKey: 'price_change_percentage_7d_in_currency',
    header: ({ column }) => <SortableHeaders column={column} tag="7d" />,
    cell: ({ row }) => (
      <PercentageCell
        title={String(row.original.price_change_percentage_7d_in_currency)}
        value={row.original.price_change_percentage_7d_in_currency}
      />
    ),
  },
  {
    accessorKey: 'price_change_percentage_30d_in_currency',
    header: ({ column }) => <SortableHeaders column={column} tag="30d" />,
    cell: ({ row }) => (
      <PercentageCell
        title={String(row.original.price_change_percentage_30d_in_currency)}
        value={row.original.price_change_percentage_30d_in_currency}
      />
    ),
  },
  {
    accessorKey: 'market_cap',
    header: ({ column }) => (
      <SortableHeaders column={column} tag="Market Cap" />
    ),
    cell: ({ row }) => <PriceCell value={row.original.market_cap} />,
  },
  {
    accessorKey: 'total_volume',
    header: ({ column }) => (
      <SortableHeaders column={column} tag=" Total Volume" />
    ),
    cell: ({ row }) => <PriceCell value={row.original.total_volume} />,
  },
  {
    accessorKey: 'chart',
    header: '7d SparkLine',
    cell: ({ row }) => {
      const [src, setSrc] = useState(buildCoinChart(row.original.symbol));
      const fallbackChart =
        row.original.price_change_percentage_7d_in_currency > 0
          ? '/images/coins-page/fallback-chart-positive.webp'
          : '/images/coins-page/fallback-chart-negative.webp';

      return (
        <div>
          <Image
            src={
              !src.startsWith('http') && !src.startsWith('/')
                ? fallbackChart
                : src
            }
            width={175}
            height={30}
            alt={row.original.symbol.toUpperCase()}
            onError={() => setSrc(fallbackChart)}
          />
        </div>
      );
    },
  },
];
