// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';

// 📦 Internal imports
import type { NewsLanguagesT } from '~types/news';
import { NewsContext } from '../NewsPage.context';
import { containerDefault, flexCenter } from '~styles/tw-custom';

// ⚙️ Functional component
const Language = () => {
  const { actions, params } = use(NewsContext);

  const changeLanguage = (language: NewsLanguagesT) => {
    if (actions?.setLanguageParam) {
      actions.setLanguageParam(language);
    }
  };

  if (params.searchString) return;
  return (
    <div className={`${containerDefault} mt-16`}>
      <h2 className="pl-1 text-2xl font-semibold">Select News Language</h2>

      <div className="mt-8 grid grid-cols-4">
        {['en', 'es', 'fr', 'tr'].map((lang) => (
          <div
            key={`news-lang-${lang}`}
            className="p-2 first:pl-0 last:pr-0"
            onClick={() => changeLanguage(lang.toUpperCase() as NewsLanguagesT)}
          >
            <div
              className={`${flexCenter} group h-48 cursor-pointer overflow-hidden rounded-md border-2 bg-clip-padding backdrop-blur-xs`}
              style={{
                backgroundImage: `url(/images/news-page/${lang}.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              <div
                className={`${flexCenter} min-h-full min-w-full text-3xl font-medium backdrop-blur-xs backdrop-brightness-[25%] group-hover:backdrop-blur-none`}
              >
                {lang.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Language;
