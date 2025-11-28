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
          '!no-scrollbar mt-7 max-h-96 w-max overflow-auto p-5',
          'sm:min-w-96',
          'max-sm:fixed max-sm:top-10 max-sm:right-0 max-sm:left-0 max-sm:mx-auto max-sm:w-[90vw] max-sm:translate-x-0',
        )}
      >
        <GlobalSearchMenu />
      </DropDownMenu>
    </DropDownAggregator>
  );
}
