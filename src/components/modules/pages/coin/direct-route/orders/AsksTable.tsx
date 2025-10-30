// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useState } from 'react';
import {
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
import { columns } from './ColumnsDefinition';

// 🧾 Local types
interface PropsT {
  data: [string, string][];
}

// ⚙️ Functional component
const AsksTable: React.FC<PropsT> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const asksTable = useReactTable({
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
        {asksTable.getHeaderGroups().map((headerGroup) => (
          <TableRow
            className="!bg-status-error-200 !border-none"
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
        {asksTable.getRowModel().rows?.length &&
          asksTable.getRowModel().rows.map((row) => (
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
export default AsksTable;
