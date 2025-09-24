// 📦 Third-Party imports
import Image from 'next/image';
import React from 'react';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  title: string;
  description: string;
  img: string;
}

// ⚙️ Functional component
const Card: React.FC<PropsT> = ({ title, img, description }) => {
  return (
    <li className="border-primary overflow-hidden rounded-md border-t bg-neutral-950 transition-transform duration-300 hover:scale-[1.02] hover:border-t-2">
      <div className={`${flexCenter} py-4`}>
        <Image
          className="drop-shadow-primary drop-shadow-[0_0_0.75rem_var(--color-primary)]"
          src={img}
          alt="Why us property"
          width={246}
          height={190}
        />
      </div>
      <div className="h-full border-t border-t-neutral-700 bg-gradient-to-br from-neutral-900 from-50% to-neutral-700 px-6 pb-8">
        <h4 className="text-foreground mt-6 mb-3 line-clamp-1 text-xl font-semibold">
          {title}
        </h4>
        <p className="line-clamp-3 font-medium tracking-tight text-neutral-500">
          {description}
        </p>
      </div>
    </li>
  );
};
export default Card;
