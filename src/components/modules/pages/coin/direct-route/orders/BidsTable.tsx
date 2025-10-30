// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~core/ui/shadcn/table';

// 📦 Internal imports
import { GetCoinOrders } from '~types/api-generated/getCoinOrders';
import { columns } from './ColumnsDefinition';

// 🧾 Local types
interface PropsT {
  data: [string, string][];
}

// ⚙️ Functional component
const BidsTable: React.FC<PropsT> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const bidsTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table>
      <TableHeader>
        {bidsTable.getHeaderGroups().map((headerGroup) => (
          <TableRow
            className="!bg-status-success-200 !border-none"
            key={headerGroup.depth}
          >
            {headerGroup.headers.map((header) => (
              <TableHead
                className="first:rounded-l-sm last:rounded-r-sm"
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {bidsTable.getRowModel().rows?.length &&
          bidsTable.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
export default BidsTable;
