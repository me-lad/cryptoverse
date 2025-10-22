// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use } from 'react';
import clsx from 'clsx';
import { flexRender, Table } from '@tanstack/react-table';
import {
  TableBody as TableBodyShadcn,
  TableCell,
  TableRow,
} from '~core/ui/shadcn/table';

// 📦 Internal imports
import { CoinsContext } from '../CoinsPage.context';
import { flexCenter } from '~styles/tw-custom';
import SkeltonTableRow from './SkeltonTableRow';

// 🧾 Local types
interface PropsT<TData> {
  table: Table<TData>;
}

// ⚙️ Functional component
function TableBody<TData>({ table }: PropsT<TData>) {
  const { params, isFetching } = use(CoinsContext);
  const firstIndex = (params.page - 1) * params.perPage + 1;

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
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
            <TableCell className="rounded-r-sm"></TableCell>
          </TableRow>
        ))}
      </TableBodyShadcn>
    );
  }

  //   Skelton ui
  if (isFetching) {
    return (
      <TableBodyShadcn>
        {Array.from({ length: params.perPage }).map((_, index) => (
          <TableRow className="mb-6 h-20" key={index}>
            <SkeltonTableRow />
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
          className="h-24 text-center"
        >
          No results.
        </TableCell>
      </TableRow>
    </TableBodyShadcn>
  );
}
export default TableBody;
