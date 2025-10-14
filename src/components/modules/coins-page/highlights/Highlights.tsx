// 📦 Third-Party imports
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

// 📦 Internal imports
import { highlightsList } from './local';
import { flexCenter, flexBetween } from '~styles/tw-custom';

// ⚙️ Functional component
const Highlights = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-10">
      {highlightsList.map((highlight) => (
        <div
          key={highlight.id}
          className={clsx(
            'bg-background-lighter h-[20rem] rounded-sm p-5 shadow-xs shadow-neutral-300/40',
          )}
        >
          {/* Highlight heading */}
          <div
            className={`${flexBetween} border-b border-neutral-600 pb-2 pl-1`}
          >
            <h3 className="font-semibold">{highlight.title}</h3>

            {!!highlight.moreUrl && (
              <Link
                href={highlight.moreUrl}
                className={`${flexCenter} gap-1 text-xs text-neutral-300`}
              >
                More
                <ChevronRight size={15} className="mt-0.5" />
              </Link>
            )}
          </div>

          {/* Highlights Content  (Conditional) */}
          <div className="h-[92%] py-5">
            <highlight.component />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Highlights;
