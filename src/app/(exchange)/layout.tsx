// 📌 Directives

// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
  coin: React.ReactNode;
}

// ⚙️ Functional component
const Layout: React.FC<Readonly<PropsT>> = ({ children, coin }) => {
  return (
    <>
      {children}
      {coin}
    </>
  );
};
export default Layout;
