// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Table } from '~core/ui/shadcn/table';
import { useRef, useEffect } from 'react';

// 📦 Internal imports
import { useScreenWidth } from '~hooks/useScreenWidth';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const DataTable: React.FC<PropsT> = ({ children }) => {
  const tableContainerElm = useRef<null | HTMLDivElement>(null);
  const { screenWidth } = useScreenWidth();

  useEffect(() => {
    if (tableContainerElm.current && screenWidth >= 1296) {
      (
        tableContainerElm.current.firstElementChild as HTMLDivElement
      ).style.overflowX = 'unset';
    }
  }, [tableContainerElm.current, screenWidth]);

  return (
    <div
      className="relative max-w-full max-[81em]:overflow-hidden max-[81em]:rounded-sm"
      ref={tableContainerElm}
    >
      <Table className="border-separate border-spacing-0">{children}</Table>
    </div>
  );
};

export default DataTable;
