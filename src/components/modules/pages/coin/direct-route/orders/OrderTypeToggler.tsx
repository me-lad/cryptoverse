// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { Dispatch } from 'react';
import Image from 'next/image';
import { Button } from '~core/ui/shadcn/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { ShowSectionT } from './local';

// 🧾 Local types
interface PropsT {
  activeType: ShowSectionT;
  changeActiveType: Dispatch<React.SetStateAction<ShowSectionT>>;
}

// ⚙️ Functional component
const OrderTypeToggler: React.FC<PropsT> = ({
  activeType,
  changeActiveType,
}) => {
  const typesList: ShowSectionT[] = ['bids', 'asks', 'both'];

  return (
    <div className="absolute top-20 right-8 flex items-center gap-2.5 min-[86em]:top-7 min-[86em]:right-8">
      {typesList.map((type) => (
        <Tooltip key={type}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => changeActiveType(type)}
              className="hover:!bg-background cursor-pointer"
              size={'icon'}
              variant={'ghost'}
              disabled={activeType === type}
            >
              <Image
                src={`/svgs/coin-page/orders/${type}.svg`}
                width={22}
                height={22}
                alt="Both"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {type !== 'both'
              ? type.slice(0, 1).toUpperCase() + type.slice(1)
              : 'Asks & Bids'}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
export default OrderTypeToggler;
