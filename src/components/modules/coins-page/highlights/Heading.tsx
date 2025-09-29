// 📦 Third-Party imports
import { ChevronRight } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

// 📦 Internal imports
import type { HighlightT } from './local';
import { flexBetween, flexCenter } from '~styles/tw-custom';

// ⚙️ Functional component
const Heading: React.FC<Partial<HighlightT>> = ({ title, moreUrl }) => {
  return (
    <div className={`${flexBetween} border-b border-neutral-600 pb-2 pl-1`}>
      <h3 className="font-semibold">{title}</h3>

      {!!moreUrl && (
        <Link
          href={moreUrl}
          className={`${flexCenter} gap-1 text-xs text-neutral-300`}
        >
          More
          <ChevronRight size={15} className="mt-0.5" />
        </Link>
      )}
    </div>
  );
};
export default Heading;
