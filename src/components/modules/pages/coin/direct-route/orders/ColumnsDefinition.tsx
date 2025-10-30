// 📌 Directives
'use client';

// 📦 Third-Party imports
import { ColumnDef } from '@tanstack/react-table';

// 📦 Internal imports
import { PriceCell, SortableHeaders } from './ColumnsPrerequisites';

// 🧾 Table columns

export const columns: ColumnDef<[string, string]>[] = [
  {
    header: '#',
    cell: ({ row }) => row.index + 1,
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
    cell: ({ row }) => <PriceCell value={+row.original[1]} />,
  },
  {
    id: 'total',
    accessorFn: (row) => +row[0] * +row[1],
    header: ({ column }) => <SortableHeaders column={column} tag="Total" />,
    cell: ({ row }) => (
      <PriceCell value={+row.original[0] * +row.original[1]} />
    ),
  },
];
