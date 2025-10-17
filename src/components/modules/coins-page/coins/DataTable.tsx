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
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~core/ui/shadcn/table';
import { use, useState } from 'react';
import { Skeleton } from '~core/ui/shadcn/skeleton';

// 📦 Internal imports
import { CoinsContext } from '../CoinsPage.context';
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// ⚙️ Functional component
function DataTable<TData, TValue>({ columns, data }: PropsT<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const { params, isFetching } = use(CoinsContext);
  const firstIndex = (params.page - 1) * params.perPage + 1;

  return (
    <div className="relative overflow-hidden rounded-sm border">
      <Table>
        <TableHeader className="bg-background-lighter">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <>
                {!!table.getRowModel().rows?.length && !isFetching && (
                  <TableCell>
                    <span
                      title="Reset Sort"
                      onClick={() => table.resetSorting()}
                      className={`${flexCenter} cursor-pointer text-lg`}
                    >
                      #
                    </span>
                  </TableCell>
                )}
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
              </>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                className=""
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                <>
                  <TableCell>
                    <span className={`${flexCenter} font-semibold`}>
                      {firstIndex + index}
                    </span>
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </>
              </TableRow>
            ))
          ) : isFetching ? (
            Array.from({ length: params.perPage }).map((_, index) => (
              <TableRow key={index}>
                <TableCell
                  colSpan={columns.length}
                  className="h-20 text-center"
                >
                  <Skeleton className="h-full w-full rounded-sm" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
