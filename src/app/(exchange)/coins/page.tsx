// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import CoinsPageWrapper from '~modules/coins-page/CoinsPage.wrapper';
import CoinsPageContext from '~modules/coins-page/CoinsPage.context';

interface PropsT {
  searchParams: {
    [key: string]: string | undefined;
  };
}

// ⚙️ Functional component
const CoinsPage: React.FC<PropsT> = async ({ searchParams }) => {
  const params = await searchParams;

  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key] = params[key].join(',');
    }
  }

  return (
    <CoinsPageContext>
      <CoinsPageWrapper />
    </CoinsPageContext>
  );
};
export default CoinsPage;
