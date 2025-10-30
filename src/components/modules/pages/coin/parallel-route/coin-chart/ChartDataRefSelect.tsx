// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';
import { Button } from '~core/ui/shadcn/button';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import React, { useState } from 'react';

// 📦 Internal imports
import { GetCoinChartData } from '~types/api-generated/getCoinChartData';
import { chartReferences, chartReferencesLabels } from '../../local';

// 🧾 Local types and variables
interface PropsT {
  chartRef: keyof GetCoinChartData;
  changeRefHandler: (newRef: keyof GetCoinChartData) => void;
}

// ⚙️ Functional component
const ChartDataRefSelect: React.FC<PropsT> = (props) => {
  const { chartRef, changeRefHandler } = props;
  const [customKey, setCustomKey] = useState(0);

  return (
    <DropDownAggregator key={customKey} hideScroll={false}>
      <DropDownTrigger activeClassName="*:*:last:rotate-180">
        <Button className="!bg-background-lighter w-44" variant={'outline'}>
          {chartReferencesLabels[chartRef].upperCased}
          <ChevronDown
            className="mt-0.5 transition-all duration-300"
            strokeWidth={2.5}
          />
        </Button>
      </DropDownTrigger>
      <DropDownMenu className="mt-2 flex w-full flex-col gap-2 p-2.5">
        {chartReferences.map((ref) => (
          <Button
            key={ref}
            variant={'ghost'}
            className={clsx(
              '!justify-start font-medium',
              chartRef === ref ? '!bg-background' : 'cursor-pointer',
            )}
            onClick={() => {
              changeRefHandler(ref);
              setCustomKey((prev) => prev + 1);
            }}
          >
            {chartReferencesLabels[ref].upperCased}
          </Button>
        ))}
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default ChartDataRefSelect;
