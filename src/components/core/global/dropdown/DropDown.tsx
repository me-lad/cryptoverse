// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useRef, useEffect, useState, createContext, use } from 'react';
import { DarkOverlay } from '~core/ui/shared/overlays';
import { cn } from '~utils/shadcn';

// 📦 Internal imports
import type {
  AggregatorPropsT,
  DropDownContextT,
  MenuPropsT,
  TriggerPropsT,
} from './local';

// 🧾 context declaration
const DropDownContext = createContext<DropDownContextT>({
  menuStatus: 'closed',
  menuStatusChanger: () => {},
});

// ⚙️ Functional components
const DropDownTrigger: React.FC<TriggerPropsT> = (props) => {
  const { children, activeClassName = '' } = props;
  const { menuStatus, menuStatusChanger } = use(DropDownContext);

  return (
    <div
      onClick={() => menuStatusChanger()}
      className={cn(
        '*:cursor-pointer',
        menuStatus === 'open' && activeClassName,
      )}
    >
      {children}
    </div>
  );
};

const DropDownMenu: React.FC<MenuPropsT> = (props) => {
  const { children, className, ...rest } = props;
  const { menuStatus } = use(DropDownContext);

  return (
    <div
      className={cn(
        'bg-background-lighter glass-bg absolute top-full left-1/2 -translate-x-1/2 rounded-sm border border-neutral-700 shadow-2xs shadow-neutral-800 transition-all',
        className,
        menuStatus === 'closed'
          ? 'invisible z-10 -translate-y-3 opacity-0'
          : 'visible z-50 opacity-100',
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const DropDownAggregator: React.FC<AggregatorPropsT> = ({
  children,
  overlay,
  className,
  hideScroll = true,
}) => {
  const [menuStatus, setMenuStatus] = useState<'open' | 'closed'>('closed');
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuStatus('closed');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined' && hideScroll) {
      if (menuStatus === 'open') {
        document.documentElement.style.marginRight = '6px';
        document.documentElement.style.overflowY = 'hidden';
      } else {
        document.documentElement.style.marginRight = 'unset';
        document.documentElement.style.overflowY = 'unset';
      }
    }
  }, [menuStatus]);

  const menuStatusChanger = () => {
    if (menuRef.current) {
      if (menuStatus === 'closed') {
        setMenuStatus('open');
      } else {
        setMenuStatus('closed');
      }
    }
  };

  return (
    <DropDownContext value={{ menuStatus, menuStatusChanger }}>
      {overlay === 'dark' && menuStatus === 'open' && <DarkOverlay />}

      <div
        ref={menuRef}
        className={cn(
          'relative',
          className,
          menuStatus === 'open' ? 'z-50' : 'z-10',
        )}
      >
        {children}
      </div>
    </DropDownContext>
  );
};

export { DropDownAggregator, DropDownMenu, DropDownTrigger };
