import Image from 'next/image';

// ⚙️ Functional component
const Pattern = () => {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 -z-[1] m-auto h-screen w-screen select-none">
      <div className="absolute top-40 left-0">
        <Image
          src="/svgs/auth-page/auth-pattern-1.svg"
          alt="Auth page"
          width={564}
          height={385}
        />
      </div>
      <div className="absolute right-0 bottom-60">
        <Image
          src="/svgs/auth-page/auth-pattern-2.svg"
          alt="Auth page"
          width={683}
          height={385}
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 m-auto w-fit">
        <Image
          src="/svgs/auth-page/auth-pattern-3.svg"
          alt="Auth page"
          width={252}
          height={184}
        />
      </div>
    </div>
  );
};
export default Pattern;
