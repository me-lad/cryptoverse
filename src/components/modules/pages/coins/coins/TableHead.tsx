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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

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
          <TableHeadShadcn className="h-[3.25rem] !rounded-l-sm">
            <span className={`${flexCenter} cursor-pointer text-lg`}>#</span>
          </TableHeadShadcn>
          {headerGroup.headers.map((header) => {
            return (
              <TableHeadShadcn key={header.id}>
                {header.id.includes('reset-sort') ? (
                  <div
                    className="flex cursor-pointer justify-center"
                    onClick={() => table.resetSorting()}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={'ghost'}
                          size={'icon'}
                          className="cursor-pointer"
                          disabled={!sorting.length}
                        >
                          <RefreshCcw size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reset Sort</TooltipContent>
                    </Tooltip>
                  </div>
                ) : header.isPlaceholder ? null : (
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )
                )}
              </TableHeadShadcn>
            );
          })}
          <TableHeadShadcn className="w-0 rounded-r-sm"></TableHeadShadcn>
        </TableRow>
      ))}
    </TableHeader>
  );
}
export default TableHead;
