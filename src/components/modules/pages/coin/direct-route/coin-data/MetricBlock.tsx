// 📌 Directives

// 📦 Third-Party imports
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';
import { Price } from '~core/global/formatters';

// 🧾 Local types
interface PropsT {
  label: string;
  icon?: React.ReactNode;
  value: number;
}

// ⚙️ Functional component
const MetricBlock: React.FC<PropsT> = ({ label, value, icon }) => {
  return (
    <div className={`${flexCenter} flex-col gap-3.5`}>
      <p className="flex items-center gap-2">
        {icon}
        {label}
      </p>
      <Tooltip>
        <TooltipTrigger>
          <Price
            className="mr-2"
            imageHeight={26}
            imageWidth={26}
            price={value}
            shortenUnits
          />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <Price price={value} darkTheme imageHeight={20} imageWidth={20} />
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
export default MetricBlock;
