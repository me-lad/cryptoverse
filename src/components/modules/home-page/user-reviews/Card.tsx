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
    <div className="glass-bg shadow-primary-300/10 mx-auto h-auto w-full rounded-lg border border-white/25 bg-clip-padding p-10 shadow-md">
      <div className={`mb-5 flex items-center gap-4`}>
        <div className="rounded-full border border-neutral-400 p-1">
          <Image
            src={userProfileImg}
            width={70}
            height={70}
            alt="User comment"
          />
        </div>
        <h3 className="text-xl font-semibold">
          {username}
          <small className="block text-xs font-normal text-neutral-400">
            Community member
          </small>
        </h3>
      </div>
      <p className="text-justify text-base text-neutral-100">{description}</p>
    </div>
  );
};
export default Card;
