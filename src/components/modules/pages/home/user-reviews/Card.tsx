// 📦 Third-Party imports
import Image from 'next/image';
import React from 'react';

// 🧾 Local types
interface PropsT {
  description: string;
  username: string;
  userProfileImg: string;
}

// ⚙️ Functional component
const Card: React.FC<PropsT> = ({ description, userProfileImg, username }) => {
  return (
    <div className="glass-bg shadow-primary-300/10 mx-auto h-auto w-full rounded-lg border border-white/25 bg-clip-padding p-5 shadow-md min-[28em]:p-10">
      <div className={`mb-5 flex items-center gap-4`}>
        <div className="relative size-12 rounded-full border border-neutral-400 sm:size-16 lg:size-[4.5rem]">
          <Image
            className="scale-90"
            src={userProfileImg}
            fill
            alt="User comment"
          />
        </div>
        <h3 className="text-lg font-semibold sm:text-xl">
          {username}
          <small className="block text-xs font-normal text-neutral-400">
            Community member
          </small>
        </h3>
      </div>
      <p className="line-clamp-[8] text-base text-neutral-100 min-[28em]:line-clamp-5 sm:text-justify xl:line-clamp-none">
        {description}
      </p>
    </div>
  );
};
export default Card;
