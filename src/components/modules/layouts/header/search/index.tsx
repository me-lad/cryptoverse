// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Search as SearchIcon } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import clsx from 'clsx';

// 📦 Internal imports
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';
import GlobalSearchMenu from '~core/global/GlobalSearch';

// ⚙️ Functional component
export default function Search() {
  return (
    <DropDownAggregator overlay="dark">
      <DropDownTrigger activeClassName="*:!bg-primary/85">
        <Button variant={'secondary'}>
          <SearchIcon size={16} />
        </Button>
      </DropDownTrigger>

      <DropDownMenu
        className={clsx(
          '!no-scrollbar mt-7 max-h-96 w-max overflow-y-auto p-5',
          'sm:w-[30rem]',
          'max-md:fixed max-md:top-10 max-md:right-0 max-md:left-0 max-md:mx-auto max-md:w-[90dvw] max-md:translate-x-0',
        )}
      >
        <GlobalSearchMenu />
      </DropDownMenu>
    </DropDownAggregator>
  );
}
