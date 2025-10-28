// 📦 Third-Party imports
import Image from 'next/image';
import React from 'react';

// 🧾 Local types
interface PropsT {
  image: string;
}

// ⚙️ Functional component
const ChartFallback: React.FC<PropsT> = ({ image }) => {
  return (
    <div className="mt-4 flex h-92 w-full items-center justify-center">
      <Image
        className="animate-spin"
        src={image}
        width={100}
        height={100}
        alt="Crypto Verse"
      />
    </div>
  );
};
export default ChartFallback;
