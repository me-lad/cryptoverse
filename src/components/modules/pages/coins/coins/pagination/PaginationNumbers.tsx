// 📌 Directives
'use client';

// 📦 Third-Party imports
import { MoreHorizontal } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import React, { use } from 'react';

// 📦 Internal imports
import { CoinsContext } from '../../CoinsPage.context';

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

  // Safety checks
  const currentPage = Number(params.page) || 1;
  const totalPages = Math.max(1, Number(totalPagesCount));

  if (currentPage < 4) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <Button
            className="cursor-pointer"
            key={index}
            onClick={() => changePageHandler(index + 1)}
            variant={currentPage === index + 1 ? 'secondary' : 'ghost'}
            disabled={currentPage === index + 1 || flags?.isFetching}
          >
            {index + 1}
          </Button>
        ))}

        <MoreHorizontal size={16} className="mx-4 mt-2.5" />

        <Button
          className="cursor-pointer"
          variant={'ghost'}
          onClick={() => changePageHandler(totalPages)}
        >
          {totalPages}
        </Button>
      </>
    );
  }

  if (currentPage > totalPages - 3 && currentPage <= totalPages) {
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
              onClick={() => changePageHandler(totalPages - index)}
              className="cursor-pointer"
              variant={
                currentPage === totalPages - index ? 'secondary' : 'ghost'
              }
              disabled={currentPage === totalPages - index || flags?.isFetching}
            >
              {totalPages - index}
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
        onClick={() => changePageHandler(currentPage - 1)}
        className="cursor-pointer"
        variant={'ghost'}
      >
        {currentPage - 1}
      </Button>
      <Button className="cursor-pointer" variant={'secondary'} disabled>
        {currentPage}
      </Button>
      <Button
        onClick={() => changePageHandler(currentPage + 1)}
        className="cursor-pointer"
        variant={'ghost'}
      >
        {currentPage + 1}
      </Button>

      <MoreHorizontal size={16} className="mx-4 mt-2.5" />

      <Button
        className="cursor-pointer"
        variant={'ghost'}
        onClick={() => changePageHandler(totalPages)}
      >
        {totalPages}
      </Button>
    </>
  );
};
export default PaginationNumbers;
