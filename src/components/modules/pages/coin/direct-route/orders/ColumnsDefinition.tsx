// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Column, ColumnDef } from '@tanstack/react-table';

// 📦 Internal imports
import { PriceCell } from '~core/global/TableColumnsPrerequisites';
import { flexCenter } from '@/lib/styles/tw-custom';
import { ArrowDownUp } from 'lucide-react';

// 🧾 Table columns

interface SortableHeadersPropsT {
  tag: string;
  column: Column<[string, string]>;
}
const SortableHeaders = ({ tag, column }: SortableHeadersPropsT) => {
  return (
    <div
      className={`${flexCenter} group relative cursor-pointer gap-2 rounded-sm px-3 py-1.5 text-xs hover:text-transparent`}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {tag}
      <div
        className={`${flexCenter} invisible absolute top-0 left-0 h-full w-full gap-2 rounded-sm bg-black/30 px-3 py-1.5 !text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100`}
      >
        {tag}
        <ArrowDownUp size={13} />
      </div>
      <ArrowDownUp size={13} />
    </div>
  );
};

export const columns: ColumnDef<[string, string]>[] = [
  {
    header: '#',
    cell: ({ row }) => <span className="text-xs">{row.index + 1}</span>,
  },
  {
    accessorKey: '0',
    header: ({ column }) => <SortableHeaders column={column} tag="Price" />,
    cell: ({ row }) => (
      <div>
        <PriceCell value={+row.original[0]} />
      </div>
    ),
  },
  {
    accessorKey: '1',
    header: ({ column }) => <SortableHeaders column={column} tag="Quantity" />,
    cell: ({ row }) => (
      <div>
        <PriceCell value={+row.original[1]} />
      </div>
    ),
  },
  {
    id: 'total',
    accessorFn: (row) => +row[0] * +row[1],
    header: ({ column }) => <SortableHeaders column={column} tag="Total" />,
    cell: ({ row }) => (
      <div>
        <PriceCell value={+row.original[0] * +row.original[1]} />
      </div>
    ),
  },
];
