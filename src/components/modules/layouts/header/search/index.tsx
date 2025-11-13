// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Search as SearchIcon } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';

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

      <DropDownMenu className="!no-scrollbar mt-7 max-h-96 w-96 overflow-auto p-5 xl:w-[28rem]">
        <GlobalSearchMenu />
      </DropDownMenu>
    </DropDownAggregator>
  );
}
