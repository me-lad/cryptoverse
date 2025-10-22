// 📦 Third-Party imports
import { Table } from '~core/ui/shadcn/table';
import { useRef, useEffect } from 'react';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const DataTable: React.FC<PropsT> = ({ children }) => {
  const tableContainerElm = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (tableContainerElm.current) {
      (
        tableContainerElm.current.firstElementChild as HTMLDivElement
      ).style.overflowX = 'unset';
    }
  }, [tableContainerElm.current]);

  return (
    <div className="relative max-w-full" ref={tableContainerElm}>
      <Table className="border-separate border-spacing-0">{children}</Table>
    </div>
  );
};

export default DataTable;
