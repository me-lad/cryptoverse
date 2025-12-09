// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import type { NewsLanguagesT } from '~types/news';
import { NewsContext } from '../NewsPage.context';
import { containerDefault, flexCenter } from '~styles/tw-custom';

// 🧾 Local variables
const languagesMap: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  tr: 'Türkiye',
};

// ⚙️ Functional component
const Language = () => {
  const { actions, params } = use(NewsContext);

  const changeLanguage = (language: NewsLanguagesT) => {
    if (actions?.setParams) {
      actions.setParams('language', language);
    }
  };

  if (params.searchString) return;
  return (
    <div className={`${containerDefault} mt-16`}>
      <h2 className="pl-1 text-2xl font-semibold">Select News Language</h2>

      <div className="mt-8 flex items-center justify-between gap-5 overflow-x-auto pb-5">
        {['en', 'es', 'fr', 'tr'].map((lang) => (
          <div
            key={lang}
            onClick={() => changeLanguage(lang.toUpperCase() as NewsLanguagesT)}
            className="group relative h-52 w-1/4 cursor-pointer overflow-hidden rounded-sm border max-xl:min-w-[17.5rem]"
          >
            <div className="group absolute inset-0 z-[1] h-full w-full">
              <Image
                src={`/svgs/news-page/${lang}.svg`}
                fill
                alt={languagesMap[lang]}
                className="object-cover opacity-25 blur-xs transition-all group-hover:opacity-75 group-hover:blur-none"
              />
            </div>
            <div
              className={clsx(
                'absolute inset-0 z-[2] h-full w-full text-3xl font-medium group-hover:hidden',
                flexCenter,
                params.language?.toLowerCase() === lang && 'text-primary',
              )}
            >
              {languagesMap[lang]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Language;
