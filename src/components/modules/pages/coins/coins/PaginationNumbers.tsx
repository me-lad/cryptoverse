// 📦 Third-Party imports
import { MoreHorizontal } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import React, { use } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import { CoinsContext } from '../CoinsPage.context';

// 🧾 Local types and variables
interface PropsT {
  changePageHandler: (value: number) => void;
  totalPagesCount: number;
}

// ⚙️ Functional component
const PaginationNumbers: React.FC<PropsT> = ({
  changePageHandler,
  totalPagesCount,
}) => {
  const { params, flags } = use(CoinsContext);

  if (params.page < 4) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <Button
            className="cursor-pointer"
            key={index}
            onClick={() => changePageHandler(index + 1)}
            variant={params.page === index + 1 ? 'secondary' : 'ghost'}
            disabled={params.page === index + 1 || flags?.isFetching}
          >
            {index + 1}
          </Button>
        ))}

        <MoreHorizontal size={16} className="mx-4 mt-2.5" />

        <Button
          className="cursor-pointer"
          variant={'ghost'}
          onClick={() => changePageHandler(totalPagesCount)}
        >
          {totalPagesCount}
        </Button>
      </>
    );
  }

  if (params.page > totalPagesCount - 3 && params.page <= totalPagesCount) {
    return (
      <>
        <Button
          className="cursor-pointer"
          variant={'ghost'}
          onClick={() => changePageHandler(1)}
        >
          1
        </Button>

        <MoreHorizontal size={16} className="mx-4 mt-2.5" />

        <div className="flex flex-row-reverse">
          {Array.from({ length: 4 }).map((_, index) => (
            <Button
              key={index}
              onClick={() => changePageHandler(totalPagesCount - index)}
              className="cursor-pointer"
              variant={
                params.page === totalPagesCount - index ? 'secondary' : 'ghost'
              }
              disabled={
                params.page === totalPagesCount - index || flags?.isFetching
              }
            >
              {totalPagesCount - index}
            </Button>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Button
        className="cursor-pointer"
        variant={'ghost'}
        onClick={() => changePageHandler(1)}
      >
        1
      </Button>

      <MoreHorizontal size={16} className="mx-4 mt-2.5" />

      <Button
        onClick={() => changePageHandler(params.page - 1)}
        className="cursor-pointer"
        variant={'ghost'}
      >
        {params.page - 1}
      </Button>
      <Button className="cursor-pointer" variant={'secondary'} disabled>
        {params.page}
      </Button>
      <Button
        onClick={() => changePageHandler(params.page + 1)}
        className="cursor-pointer"
        variant={'ghost'}
      >
        {params.page + 1}
      </Button>

      <MoreHorizontal size={16} className="mx-4 mt-2.5" />

      <Button
        className="cursor-pointer"
        variant={'ghost'}
        onClick={() => changePageHandler(totalPagesCount)}
      >
        {totalPagesCount}
      </Button>
    </>
  );
};
export default PaginationNumbers;
