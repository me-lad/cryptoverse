// 📦 Third-Party imports
import Image from 'next/image';

// 📦 Internal imports
import { flexCenter, posCenter } from '~styles/tw-custom';

// ⚙️ Functional component
const DevelopingPage = () => {
  return (
    <div className="relative h-full w-full">
      <div className={`h-fit w-fit ${posCenter}`}>
        <h2 className="absolute bottom-0 left-1/3">
          It Will Be Ready Soon :))
        </h2>
        <Image
          src={'/images/404/developing.webp'}
          width={400}
          height={400}
          alt="Developing Route"
        />
      </div>
    </div>
  );
};
export default DevelopingPage;
