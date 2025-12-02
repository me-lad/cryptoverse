// 📦 Third-Party imports
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

// 📦 Internal imports
import type { NewsDataEntity } from '~types/api-generated/news/getLatestNews';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { TimeAgo } from '~core/global/formatters';
import { Skeleton } from '~core/ui/shadcn/skeleton';

export const NewsLoadingItem = () => {
  return (
    <div className="flex w-full items-center gap-8 border-b border-b-neutral-500 py-8">
      {/* Image */}
      <div className="h-[105px] w-[105px]">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content */}
      <div className="w-full">
        {/* Source & Time */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Title */}
        <div className="mt-2">
          <Skeleton className="h-6 w-1/4" />
        </div>

        {/* Body */}
        <div>
          <Skeleton className="mt-3 h-24 w-5/6" />
        </div>
      </div>
    </div>
  );
};

// ⚙️ Functional component
const NewsListItem: React.FC<NewsDataEntity> = (props) => {
  const {
    IMAGE_URL,
    URL,
    TITLE,
    BODY,
    SENTIMENT,
    CATEGORY_DATA,
    PUBLISHED_ON,
    SOURCE_DATA,
  } = props;

  return (
    <div className="w-full border-b border-b-neutral-500 py-8 text-left">
      {/* Image */}
      <Link
        href={URL}
        className={`float-left min-h-[105px] min-w-[125px] max-[22em]:mr-2.5 max-[22em]:max-w-[90px] max-[22em]:min-w-[90px]`}
      >
        <Image
          className={`${flexCenter} rounded-sm object-contain text-center`}
          src={IMAGE_URL || '/svgs/logo/logo.svg'}
          width={105}
          height={105}
          alt={TITLE.slice(0, 20)}
        />
      </Link>

      {/* Content */}
      <div className="w-full">
        {/* Source & Time */}
        <div className="flex items-center gap-5 text-xs">
          <Link href={SOURCE_DATA.URL} className="text-status-warning-200">
            {SOURCE_DATA.NAME}
          </Link>
          <TimeAgo publishedAt={PUBLISHED_ON * 1000} />
        </div>

        {/* Title */}
        <div className="mt-2">
          <Link href={URL}>
            <h3 className="line-clamp-2 text-lg font-semibold sm:line-clamp-1 sm:text-xl">
              {TITLE}
            </h3>
          </Link>
        </div>

        {/* Body */}
        <div>
          <p className="mt-3 line-clamp-3 text-sm font-medium text-neutral-300 max-sm:hidden">
            {BODY}
          </p>
          <p className="mt-3 text-sm font-medium text-neutral-300 sm:hidden">
            {BODY.slice(0, 250) + '...'}
          </p>
        </div>

        {/* Categories & Sentiment */}
        <div
          className={`${flexBetween} mt-4 flex-nowrap overflow-hidden text-xs text-neutral-400 max-[34em]:flex-wrap max-[34em]:gap-2.5 sm:ml-[125px] sm:w-[calc(100%_-_125px)]`}
        >
          <div className="flex w-3/4 items-center max-[34em]:w-fit">
            <p className="mr-1">CATEGORIES: </p>
            <p className="text-primary-400 line-clamp-1 max-w-[70%] font-semibold">
              {CATEGORY_DATA?.map(
                (category, index) =>
                  `${index !== 0 ? ' | ' : ''} ${category.NAME}`,
              )}
            </p>
          </div>
          <div className="flex w-1/4 items-center justify-end gap-2 max-[34em]:w-fit">
            <p className="text-sm">Sentiment:</p>
            <span
              className={clsx(
                'rounded- rounded-xs px-2 py-1 text-xs font-medium text-white',
                SENTIMENT === 'POSITIVE'
                  ? 'bg-status-success-200'
                  : SENTIMENT === 'NEGATIVE'
                    ? 'bg-status-error-200'
                    : 'bg-gray-600',
              )}
            >
              {SENTIMENT}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsListItem;
