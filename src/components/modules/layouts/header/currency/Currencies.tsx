// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import type { CurrencyT } from '~types/coins';
import { CurrencyContext } from '~contexts/Currency.context';
import { currencies } from './local';

// ⚙️ Functional component
const Currencies = () => {
  const { data, actions } = use(CurrencyContext);

  const handlerCurrencyChange = (value: CurrencyT) => {
    if (data.currency !== value && actions) {
      actions.setData('currency', value);
    }
  };

  return (
    <ul className="mt-5">
      {currencies.map((curr) => (
        <li
          key={curr.id}
          className={clsx(
            'hover:bg-background mt-3 flex items-center gap-4 rounded-sm p-2.5 py-1.5 transition-all select-none hover:cursor-pointer',
            curr.id === data.currency && 'bg-background',
          )}
          onClick={() => handlerCurrencyChange(curr.id)}
        >
          <Image
            src={`/svgs/logo/currencies/${curr.id.toLowerCase()}.svg`}
            width={32}
            height={32}
            alt={curr.id}
          />
          <span title={curr.titleAttr + '  ' + curr.id}>{curr.label}</span>
        </li>
      ))}
    </ul>
  );
};
export default Currencies;
