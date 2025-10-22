// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import CoinsPageWrapper from '~modules/pages/coins/CoinsPage.wrapper';
import CoinsPageContext from '~modules/pages/coins/CoinsPage.context';

// ⚙️ Functional component
const CoinsPage = () => {
  return (
    <CoinsPageContext>
      <CoinsPageWrapper />
    </CoinsPageContext>
  );
};
export default CoinsPage;
