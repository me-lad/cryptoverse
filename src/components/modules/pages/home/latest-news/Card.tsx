// 📦 Third-Party imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { CalendarDays, LucideLink, Rss } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { NewsDataEntity } from '~types/api-generated/news/getLatestNews';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { formatDate } from '~helpers/time';

// ⚙️ Functional component
const Card: React.FC<NewsDataEntity> = (props) => {
  const {
    IMAGE_URL,
    TITLE,
    BODY,
    SENTIMENT,
    URL,
    PUBLISHED_ON,
    SOURCE_DATA: { NAME: SOURCE_NAME },
    CATEGORY_DATA,
  } = props;

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border-1 border-neutral-600">
      {/* Image */}
      <div
        className={clsx(
          'relative flex justify-center',
          SENTIMENT === 'NEUTRAL'
            ? 'bg-neutral-950'
            : SENTIMENT === 'POSITIVE'
              ? 'bg-status-success-300/40'
              : 'bg-status-error-300/40',
        )}
      >
        <Image
          className="m-6 rounded-sm"
          src={IMAGE_URL}
          width={280}
          height={280}
          alt={TITLE}
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Source/Publish */}
        <div className={`${flexBetween} `}>
          <div
            className={`${flexCenter} max-w-2/3 gap-2 rounded-sm bg-neutral-800 px-4 py-2 text-xs font-medium text-white sm:max-w-1/2`}
          >
            <Rss size={13} />
            <span className="line-clamp-1">{SOURCE_NAME}</span>
          </div>
          <div className={`${flexCenter} hidden gap-2 text-sm sm:flex`}>
            <CalendarDays size={13} />
            <span>{formatDate(PUBLISHED_ON * 1000)}</span>
          </div>
        </div>

        {/* Title */}
        <div className="relative mt-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="peer line-clamp-1 text-lg font-semibold">
                {TITLE}
              </h3>
            </TooltipTrigger>
            <TooltipContent className="text-sm">{TITLE}</TooltipContent>
          </Tooltip>
        </div>

        {/* Body */}
        <div className="mt-3 min-h-[48px]">
          <p className="line-clamp-4 tracking-wide text-neutral-400 max-sm:min-h-20 sm:line-clamp-2">
            {BODY}
          </p>
        </div>

        {/* Categories/Link */}
        <div className={`${flexBetween} relative mt-6`}>
          <div className={`${flexCenter} !justify-start *:text-xs`}>
            <span className="min-w-fit">CATEGORIES :</span>
            <div className="grow">
              {CATEGORY_DATA?.slice(0, 2)?.map((category) => (
                <span
                  key={category.ID}
                  className="px-2 not-first:border-l not-first:border-white"
                >
                  {category.NAME}
                </span>
              ))}
            </div>
          </div>
          <Link
            className="max-[25em]:absolute max-[25em]:right-0 max-[25em]:bottom-52"
            href={URL}
          >
            <LucideLink size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
