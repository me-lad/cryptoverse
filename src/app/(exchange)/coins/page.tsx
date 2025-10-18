// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import CoinsPageWrapper from '~modules/coins-page/CoinsPage.wrapper';
import CoinsPageContext from '~modules/coins-page/CoinsPage.context';

// ⚙️ Functional component
const CoinsPage = () => {
  return (
    <CoinsPageContext>
      <CoinsPageWrapper />
    </CoinsPageContext>
  );
};
export default CoinsPage;
