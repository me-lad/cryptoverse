// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use, useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import type { CurrencyT } from '~types/coins';
import { CurrencyContext } from '~modules/Currency.context';
import { DarkOverlay } from '@/components/core/ui/shared/overlays';

// ⚙️ Functional component
const Currency = () => {
  const { currency, setCurrency } = use(CurrencyContext);

  const [menuStatus, setMenuStatus] = useState<'open' | 'closed'>('closed');
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuStatus('closed');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  const handlerCurrencyChange = (value: CurrencyT) => {
    if (currency !== value && setCurrency) {
      setCurrency(value);
    }
  };

  const handlerMenu = () => {
    if (menuRef.current) {
      if (menuStatus === 'closed') {
        setMenuStatus('open');
      } else {
        setMenuStatus('closed');
      }
    }
  };

  return (
    <>
      {menuStatus === 'open' && <DarkOverlay />}

      <div ref={menuRef} className="relative z-50">
        {/* Icon */}
        <div
          className="relative z-50 hover:cursor-pointer"
          onClick={() => handlerMenu()}
          title="Change currency"
        >
          <Globe size={22} color={menuStatus === 'open' ? '#1a80e6' : '#fff'} />
        </div>

        {/* Menu */}
        <div
          className={clsx(
            'bg-background-lighter absolute top-full left-1/2 z-50 mt-7 w-68 -translate-x-1/2 rounded-sm border border-neutral-700 p-5 shadow-2xs shadow-neutral-800 transition-all',
            menuStatus === 'closed'
              ? 'invisible -translate-y-3 opacity-0'
              : 'visible opacity-100',
          )}
        >
          <h5 className="ml-2.5 text-lg font-semibold select-none">
            Select currency
          </h5>

          <ul className="mt-5">
            {(['USD', 'EUR', 'GBP', 'JPY', 'IRR'] as CurrencyT[]).map(
              (curr, index) => (
                <li
                  key={index}
                  className={clsx(
                    'mt-3 flex items-center gap-4 p-2.5 py-1.5 select-none hover:cursor-pointer',
                    curr === currency && 'bg-background rounded-sm',
                  )}
                  onClick={() => handlerCurrencyChange(curr)}
                >
                  <Image
                    src={`/svgs/logo/currencies/${curr.toLowerCase()}.svg`}
                    width={32}
                    height={32}
                    alt={curr}
                  />
                  <span>{curr}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Currency;
