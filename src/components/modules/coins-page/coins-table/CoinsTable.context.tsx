// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, useReducer } from 'react';

// 📦 Internal imports

// 🧾 Local types and variables
const CoinsContext = createContext({});

interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const CoinsTableContext: React.FC<PropsT> = ({ children }) => {
  return <CoinsContext value={{}}>{children}</CoinsContext>;
};
export default CoinsTableContext;
