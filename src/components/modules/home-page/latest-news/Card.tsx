// 📦 Third-Party imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { CalendarDays, LucideLink, Rss } from 'lucide-react';

// 📦 Internal imports
import type { DataEntity } from '~types/api-generated/getLatestNews';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { formatDate } from '~helpers/time';

// ⚙️ Functional component
const Card: React.FC<DataEntity> = (props) => {
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
    <div className="w-full overflow-hidden rounded-lg border-1 border-neutral-600">
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
        <div className={`${flexBetween}`}>
          <div
            className={`${flexCenter} max-w-1/2 gap-2 rounded-sm bg-neutral-800 px-4 py-2 text-xs font-medium text-white`}
          >
            <Rss size={13} />
            <span title={SOURCE_NAME} className="line-clamp-1">
              {SOURCE_NAME}
            </span>
          </div>
          <div className={`${flexCenter} gap-2 text-sm`}>
            <CalendarDays size={13} />
            <span>{formatDate(PUBLISHED_ON * 1000)}</span>
          </div>
        </div>

        {/* Title */}
        <div className="relative mt-6">
          <h3 className="peer line-clamp-1 text-lg font-semibold">{TITLE}</h3>
          <p className="invisible absolute bottom-full z-10 mt-2 w-11/12 rounded border bg-white p-2 font-medium text-neutral-950 opacity-0 shadow-lg transition duration-300 peer-hover:visible peer-hover:opacity-100">
            {TITLE}
          </p>
        </div>

        {/* Body */}
        <div className="mt-3 min-h-[48px]">
          <p className="line-clamp-2 tracking-wide text-neutral-400">{BODY}</p>
        </div>

        {/* Categories/Link */}
        <div className={`${flexBetween} mt-6`}>
          <div className={`${flexCenter} !justify-start *:text-xs`}>
            <span>CATEGORIES :</span>
            <div>
              {CATEGORY_DATA?.slice(0, 2)?.map((category) => (
                <span
                  key={category.ID}
                  className="px-2 not-first:border-l-2 not-first:border-white"
                >
                  {category.NAME}
                </span>
              ))}
            </div>
          </div>
          <Link href={URL}>
            <LucideLink size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
