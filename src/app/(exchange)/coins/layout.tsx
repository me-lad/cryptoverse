// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import CoinsTableContext from '~modules/coins-page/coins-table/CoinsTable.context';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const Layout: React.FC<PropsT> = ({ children }) => {
  return <CoinsTableContext>{children}</CoinsTableContext>;
};
export default Layout;
