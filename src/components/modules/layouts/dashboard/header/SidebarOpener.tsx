// 📌 Directives
'use client';

// 📦 Third-Party imports
import { AlignJustify } from 'lucide-react';
import { use } from 'react';

// 📦 Internal imports
import { DashboardSidebarContext } from '../Dashboard.context';

// ⚙️ Functional component
const SidebarOpener = () => {
  const { actions } = use(DashboardSidebarContext);

  const openSidebar = () => actions?.setFlags('isOpen', true);

  return (
    <div onClick={openSidebar}>
      <AlignJustify size={20} className="mt-1 mr-5 lg:hidden" />
    </div>
  );
};
export default SidebarOpener;
