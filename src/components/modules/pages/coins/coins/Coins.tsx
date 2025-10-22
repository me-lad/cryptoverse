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
import { columns } from './ColumnsDefinition';
import { CoinsContext } from '../CoinsPage.context';
import { flexBetween } from '~styles/tw-custom';
import DataTable from './Table';
import Pagination from './Pagination';
import Filters from './Filters';
import Search from './Search';
import TableHead from './TableHead';
import TableBody from './TableBody';

// ⚙️ Functional component
const Coins = () => {
  const { coins } = use(CoinsContext);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable<CoinEntity_Gecko>({
    data: coins,
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
      <h1 className="mb-8 pl-2 text-3xl font-semibold">Coins Data</h1>

      {/* Search & Filters */}
      <div className={`${flexBetween} mb-8 px-2`}>
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
