// 📌 Directives

// 📦 Third-Party imports
import React from 'react';
import { Button } from '~core/ui/shadcn/button';
import { flexRender, SortingState, Table } from '@tanstack/react-table';
import { RefreshCcw } from 'lucide-react';
import {
  TableCell,
  TableHeader,
  TableRow,
  TableHead as TableHeadShadcn,
} from '~core/ui/shadcn/table';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT<TData> {
  table: Table<TData>;
  sorting: SortingState;
}

// ⚙️ Functional component
function TableHead<TData>({ table, sorting }: PropsT<TData>) {
  return (
    <TableHeader className="sticky top-0 z-40">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow className="*:!bg-primary-700" key={headerGroup.id}>
          <TableCell className="!rounded-l-sm">
            <span className={`${flexCenter} cursor-pointer text-lg`}>#</span>
          </TableCell>
          {headerGroup.headers.map((header) => {
            return (
              <TableHeadShadcn key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHeadShadcn>
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
  );
}
export default TableHead;
