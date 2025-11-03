// 📦 Third-Party imports
import Image from 'next/image';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';

// ⚙️ Functional component
const DevelopingPage = () => {
  return (
    <div className={`${flexCenter} bg-background-lighter rounded-sm py-20`}>
      <Image
        src={'/images/404/developing.webp'}
        width={500}
        height={500}
        alt="Developing Route"
      />
    </div>
  );
};
export default DevelopingPage;
