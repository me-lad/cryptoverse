// 📦 Third-Party imports
import { ChevronUp, Minus } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import { formatPercentage } from '~helpers/formatters';
import Image from 'next/image';

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
        'flex items-center gap-1.5',
        percentage === 0 || !percentage
          ? 'text-neutral-300'
          : isNegative
            ? 'text-status-error-200'
            : 'text-status-success-200',
      )}
    >
      {!percentage ? (
        <p className="w-full text-center">__</p>
      ) : (
        <>
          {percentage === 0 ? (
            <Minus
              strokeWidth={3}
              size={iconSize}
              className={clsx(iconSize < 18 ? 'mt-0.5' : 'mt-1')}
            />
          ) : (
            <Image
              className="size-4"
              src={
                !isNegative
                  ? '/svgs/percentage/up.svg'
                  : '/svgs/percentage/down.svg'
              }
              width={17}
              height={17}
              alt="percentage"
            />
          )}

          <p style={{ fontSize }}>
            {formattedPercentage.slice(1).padStart(6, '0')}
          </p>
        </>
      )}
    </div>
  );
};
