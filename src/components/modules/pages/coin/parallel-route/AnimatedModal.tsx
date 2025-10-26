// 📌 Directives
'use client';

// 📦 Third-Party imports
import { X } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import { posCenter } from '~styles/tw-custom';
import Navigator from '~core/global/Navigator';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const AnimatedModal: React.FC<PropsT> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <div
        className="absolute top-0 left-0 h-full w-full cursor-pointer"
        onClick={() => {
          setHasMounted(false);
          setHasClosed(true);
        }}
      >
        <Navigator delay={900} className="h-full w-full" order="back" />
      </div>

      <div
        className={clsx(
          'z-[51] rounded-sm border border-neutral-700 bg-[#151515e6] px-14 py-11 transition-all duration-1000 ease-out *:transition-opacity *:duration-1000 *:ease-in',
          posCenter,
          hasMounted && !hasClosed
            ? 'visible h-[85%] w-1/2 *:opacity-100'
            : 'invisible h-0 w-0 *:h-0 *:w-0 *:opacity-0',
          hasClosed ? 'delay-300' : '*:delay-300',
          !hasMounted && hasClosed && '*:hidden',
        )}
      >
        <div
          onClick={() => {
            setHasMounted(false);
            setHasClosed(true);
          }}
        >
          <Navigator
            order="back"
            className="absolute top-3 right-3 *:cursor-pointer"
            delay={900}
          >
            <Button variant={'ghost'} size={'icon'}>
              <X className="text-neutral-300" size={18} strokeWidth={3} />
            </Button>
          </Navigator>
        </div>

        {children}
      </div>
    </>
  );
};
export default AnimatedModal;
