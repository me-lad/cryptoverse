// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useState } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

// 📦 Internal imports
import { columns } from './ColumnsDefinition';
import TableUi from './Table.ui';

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

  return <TableUi table={bidsTable} tableT="Bids" />;
};
export default BidsTable;
