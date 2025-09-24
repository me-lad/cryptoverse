// 📌 Directives
'use client';

// 📦 Third-Party imports
import Image from 'next/image';

// 📦 Internal imports
import { useScreenWidth } from '~hooks/useScreenWidth';

// ⚙️ Functional component
const Pattern = () => {
  const { screenWidth, hasMounted } = useScreenWidth();

  if (!hasMounted) return;

  return (
    <div
      className={`w-${screenWidth} absolute top-20 right-0 left-0 -z-[1] flex justify-center px-10 opacity-60 select-none`}
    >
      <Image
        src="/svgs/home-page/home-pattern.svg"
        alt="Home page"
        width={screenWidth}
        height={1000}
        className="h-auto"
      />
    </div>
  );
};
export default Pattern;
