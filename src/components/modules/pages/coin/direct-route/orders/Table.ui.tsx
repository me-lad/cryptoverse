// 📌 Directives

// 📦 Third-Party imports
import React from 'react';
import { flexRender, Table as TableT } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~core/ui/shadcn/table';
import clsx from 'clsx';

// 🧾 Local types
interface PropsT {
  table: TableT<[string, string]>;
  tableT: 'Asks' | 'Bids';
}

// ⚙️ Functional component
const TableUi: React.FC<PropsT> = ({ table, tableT }) => {
  return (
    <Table className="border-separate border-spacing-y-2">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.depth}>
            {headerGroup.headers.map((header) => (
              <TableHead
                className={clsx(
                  '!border-none first:!rounded-l-xs last:!rounded-r-xs',
                  tableT === 'Asks'
                    ? '!bg-status-error-200'
                    : '!bg-status-success-200',
                )}
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
        {table.getRowModel().rows?.length &&
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="group">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  className={clsx(
                    'first:rounded-l-xs last:rounded-r-xs',
                    tableT === 'Asks'
                      ? 'group-hover:!bg-status-error-300'
                      : 'group-hover:!bg-status-success-300',
                  )}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
export default TableUi;
