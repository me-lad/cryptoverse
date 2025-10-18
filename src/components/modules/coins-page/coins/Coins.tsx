// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';

// 📦 Internal imports
import { columns } from './ColumnsDefinition';
import { CoinsContext } from '../CoinsPage.context';
import DataTable from './DataTable';
import Pagination from './Pagination';

// ⚙️ Functional component
const Coins = () => {
  const { coins } = use(CoinsContext);

  return (
    <div className="mt-32">
      <h1 className="mb-8 pl-2 text-3xl font-semibold">Coins Data</h1>
      <DataTable columns={columns} data={coins} />
      <Pagination />
    </div>
  );
};
export default Coins;
