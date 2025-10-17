// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { ChevronLeft } from 'lucide-react';

// 📦 Internal imports
import { CoinsContext } from '../CoinsPage.context';
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types

// ⚙️ Functional component
const Pagination = () => {
  const { params, actions, coins, isFetching } = use(CoinsContext);

  const changePageHandler = (newPage: number) => {
    if (actions && !isFetching) actions.setPage(newPage);
  };

  return (
    <div className={`${flexCenter} mt-10 gap-2`}>
      <Button
        variant={'secondary'}
        size={'icon'}
        className="cursor-pointer"
        disabled={params.page === 1 || isFetching}
        onClick={() => changePageHandler(params.page - 1)}
      >
        <ChevronLeft strokeWidth={3} size={20} className="text-white" />
      </Button>
      <Button variant={'secondary'} className="px-10">
        Page {params.page}
      </Button>
      <Button
        size={'icon'}
        variant={'secondary'}
        className="cursor-pointer"
        disabled={isFetching || !coins.length}
        onClick={() => changePageHandler(params.page + 1)}
      >
        <ChevronLeft
          strokeWidth={3}
          size={20}
          className="rotate-y-180 text-white"
        />
      </Button>
    </div>
  );
};
export default Pagination;
