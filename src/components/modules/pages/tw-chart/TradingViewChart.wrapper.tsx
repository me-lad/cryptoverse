// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ChevronRight, Menu } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import clsx from 'clsx';

// 📦 Internal imports
import { toastsCustomID } from '~configs/react-toastify';
import { flexCenter } from '~styles/tw-custom';
import ChartView from './chart-view';
import SymbolsListFn from './symbols-list/SymbolsList.fn';

// ⚙️ Functional component
const TradingViewChartWrapper = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');
  const [sidebarStatus, setSidebarStatus] = useState<'open' | 'closed'>(
    'closed',
  );

  useEffect(() => {
    toast('Use a VPN if you have any problems visiting this page.', {
      type: 'info',
      autoClose: 6000,
      toastId: toastsCustomID,
      position: 'top-center',
    });
  }, []);

  return (
    <div className="grid max-h-screen grid-cols-12 grid-rows-1 overflow-hidden">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <ChartView key={selectedSymbol} symbol={selectedSymbol} />
      </div>

      <Button
        className={`${flexCenter} fixed top-5 right-20 size-10 cursor-pointer rounded-full !p-0 text-white max-sm:top-16 lg:hidden`}
        onClick={() => setSidebarStatus('open')}
      >
        <Menu className="size-1/2" />
      </Button>

      <div
        className={clsx(
          'bg-background-lighter relative h-screen transition-all duration-700 max-lg:fixed max-lg:right-0 max-lg:min-w-[20rem] lg:col-span-4 xl:col-span-3',
          sidebarStatus === 'open'
            ? 'max-lg:visible max-lg:translate-x-0'
            : 'max-lg:invisible max-lg:translate-x-[40rem]',
        )}
      >
        <SymbolsListFn
          activeSymbol={selectedSymbol}
          changeSymbol={setSelectedSymbol}
        />

        <Button
          variant={'secondary'}
          size={'icon'}
          className="absolute top-0 left-0 cursor-pointer lg:hidden"
          onClick={() => setSidebarStatus('closed')}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
export default TradingViewChartWrapper;
