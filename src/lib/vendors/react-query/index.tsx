// 📌 Directives
'use client';

// 📦 Third-Party imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useEffect, useState } from 'react';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const ReactQueryProvider: React.FC<PropsT> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 120_000,
            gcTime: 300_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  // Custom console.log
  useEffect(() => {
    console.log(
      `%c
  ┌─────────────────────────────────────┐
  │                                     │
         🧑‍💻 Developed by me-lad       
  │                                     │
  └─────────────────────────────────────┘
  `,
      'color: #33A1E0; font-size: 13px; font-weight: bold; font-family: monospace;',
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default ReactQueryProvider;
