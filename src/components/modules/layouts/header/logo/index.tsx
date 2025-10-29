// 📦 Third-Party imports
import Image from 'next/image';
import Link from 'next/link';

// ⚙️ Functional component
const Logo = () => {
  return (
    <div>
      <Link href={'/'}>
        <Image
          src="/svgs/logo/logo-text.svg"
          alt="Coin Verse"
          width={204}
          height={43}
        />
      </Link>
    </div>
  );
};
export default Logo;
