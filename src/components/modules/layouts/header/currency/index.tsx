// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Globe } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports

import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';
import Currencies from './Currencies';

// ⚙️ Functional component
const Currency = () => {
  return (
    <DropDownAggregator overlay="dark">
      <DropDownTrigger activeClassName="*:!bg-primary/85">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'secondary'}>
              <Globe />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Select Currency</TooltipContent>
        </Tooltip>
      </DropDownTrigger>

      <DropDownMenu className="mt-7 w-68 p-5">
        <h5 className="ml-2.5 text-lg font-semibold select-none">
          Select currency
        </h5>

        <Currencies />
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default Currency;
