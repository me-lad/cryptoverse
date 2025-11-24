// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Table } from '~core/ui/shadcn/table';
import { useRef, useEffect } from 'react';

// 📦 Internal imports
import { useMediaQuery } from '~hooks/useMediaQuery';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const DataTable: React.FC<PropsT> = ({ children }) => {
  const tableContainerElm = useRef<null | HTMLDivElement>(null);

  const isOverBreakpoint = useMediaQuery('min-width', 1296);

  useEffect(() => {
    if (tableContainerElm.current) {
      const innerContainer = tableContainerElm.current
        .firstElementChild as HTMLDivElement;
      if (isOverBreakpoint) {
        innerContainer.style.overflowX = 'unset';
      } else {
        innerContainer.style.overflowX = 'auto';
      }
    }
  }, [tableContainerElm.current, isOverBreakpoint]);

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
