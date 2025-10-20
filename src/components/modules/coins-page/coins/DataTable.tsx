// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  Row,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~core/ui/shadcn/table';
import { use, useState, useRef, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import clsx from 'clsx';

// 📦 Internal imports
import { CoinsContext } from '../CoinsPage.context';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import SkeltonTableRow from './SkeltonTableRow';
import TableSearch from './TableSearch';
import Filters from './Filters';
import { Button } from '@/components/core/ui/shadcn/button';

// 🧾 Local types
interface PropsT<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// ⚙️ Functional component
function DataTable<TData, TValue>({ columns, data }: PropsT<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
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

  const tableContainerElm = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (tableContainerElm.current) {
      (
        tableContainerElm.current.firstElementChild as HTMLDivElement
      ).style.overflowX = 'unset';
    }
  }, [tableContainerElm.current]);

  const { params, isFetching } = use(CoinsContext);
  const firstIndex = (params.page - 1) * params.perPage + 1;

  const searchInputValue =
    columnFilters.find((f) => f.id === 'pair')?.value ?? '';
  const setSearchInputValue = (value: string) => {
    setColumnFilters([
      {
        id: 'pair',
        value,
      },
    ]);
  };

  return (
    <>
      <div className={`${flexBetween} mb-8 px-2`}>
        <Filters />
        <TableSearch
          value={searchInputValue as string}
          setValue={(value: string) => setSearchInputValue(value)}
        />
      </div>

      <div className="relative max-w-full" ref={tableContainerElm}>
        <Table className="border-separate border-spacing-0">
          <TableHeader className="sticky top-0 z-40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="*:!bg-primary-700" key={headerGroup.id}>
                <TableCell className="!rounded-l-sm">
                  <span className={`${flexCenter} cursor-pointer text-lg`}>
                    #
                  </span>
                </TableCell>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
                <TableCell
                  className="cursor-pointer !rounded-r-sm"
                  title="Reset Sort"
                  onClick={() => table.resetSorting()}
                >
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    className="cursor-pointer"
                    disabled={!sorting.length}
                  >
                    <RefreshCcw size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="rounded-r-sm"></TableCell>
                </TableRow>
              ))
            ) : isFetching ? (
              Array.from({ length: params.perPage }).map((_, index) => (
                <TableRow className="mb-6 h-20" key={index}>
                  <SkeltonTableRow />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default DataTable;
