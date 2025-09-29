// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use } from 'react';

// 📦 Internal imports
import { formatPrice } from '~helpers/formatters';

// 🧾 Local types
interface PropsT {
  price: number;
}

// ⚙️ Functional component
export const Price: React.FC<PropsT> = ({ price }) => {
  return <>$ {formatPrice(price)}</>;
};
