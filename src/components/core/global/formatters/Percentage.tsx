// 📦 Third-Party imports
import { ChevronUp } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import { formatPercentage } from '~helpers/formatters';

// 🧾 Local types
interface PropsT {
  percentage: number;
  iconSize?: number;
  fontSize?: string;
}

// ⚙️ Functional component
export const Percentage: React.FC<PropsT> = (props) => {
  const { percentage, iconSize = 18, fontSize = '1rem' } = props;

  const formattedPercentage = formatPercentage(percentage);
  const isNegative = formattedPercentage.startsWith('-');

  return (
    <div
      className={clsx(
        'flex items-center gap-0.5',
        isNegative ? 'text-status-error-200' : 'text-status-success-200',
      )}
    >
      <ChevronUp
        strokeWidth={3}
        size={iconSize}
        className={clsx(
          iconSize < 18 ? 'mt-0.5' : 'mt-1',
          isNegative && 'rotate-180',
        )}
      />

      <p
        title={`${formattedPercentage.slice(0, 1)}${percentage}`}
        style={{ fontSize }}
      >
        {formattedPercentage.slice(1)}
      </p>
    </div>
  );
};
