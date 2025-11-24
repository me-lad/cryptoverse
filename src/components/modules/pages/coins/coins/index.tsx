// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use, useState } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

// 📦 Internal imports
import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import { columns } from './table/ColumnsDefinition';
import { CoinsContext } from '../CoinsPage.context';
import { flexBetween } from '~styles/tw-custom';
import DataTable from './table/Table';
import Pagination from './pagination';
import Filters from './filters';
import Search from './search';
import TableHead from './table/TableHead';
import TableBody from './table/TableBody';

// ⚙️ Functional component
const Coins = () => {
  const { data } = use(CoinsContext);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable<CoinEntity_Gecko>({
    data: data.coins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const setSearchInputValue = (value: string) => {
    setColumnFilters([
      {
        id: 'pair',
        value,
      },
    ]);
  };

  return (
    <div className="mt-32">
      {/* Title */}
      <h1 className="mb-8 pl-2 text-3xl font-semibold max-md:text-center">
        Coins Data
      </h1>

      {/* Search & Filters */}
      <div
        className={`${flexBetween} mb-8 pl-2 max-md:flex-col max-md:gap-y-5`}
      >
        <Filters />
        <Search setValue={(value: string) => setSearchInputValue(value)} />
      </div>

      {/* Table view */}
      <DataTable>
        <TableHead table={table} sorting={sorting} />
        <TableBody table={table} />
      </DataTable>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};
export default Coins;
