// 📌 Directives

// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import type { LISTEntity } from '~types/api-generated/getTopCoins';

// 🧾 Local types
interface PropsT {
  list: LISTEntity[];
}

// ⚙️ Functional component
const Table: React.FC<PropsT> = ({}) => {
  return <div>Table component</div>;
};
export default Table;
