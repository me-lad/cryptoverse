// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, useState } from 'react';

// 📦 Internal imports
import type {
  DashboardSidebarContextT,
  DashboardSidebarSettingsT,
} from '~types/dashboard';
import { dashboardSidebarInitialValue } from '~constants/dashboard';

// 🧾 Local types and context declare
interface PropsT {
  children: React.ReactNode;
}

export const DashboardSidebarContext = createContext<DashboardSidebarContextT>(
  dashboardSidebarInitialValue,
);

// ⚙️ Functional component
const DashboardContext: React.FC<PropsT> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(dashboardSidebarInitialValue.isOpen);
  const [isHover, setIsHover] = useState(dashboardSidebarInitialValue.isHover);
  const [settings, setSettings] = useState<DashboardSidebarSettingsT>(
    dashboardSidebarInitialValue.settings,
  );

  const getOpenState = () => {
    if (settings.disabled) return false;

    if (settings.hoverable) {
      return isHover;
    } else {
      return isOpen;
    }
  };

  const value: DashboardSidebarContextT = {
    isOpen,
    isHover,
    settings,
    action: {
      setOpenState: setIsOpen,
      setHoverState: setIsHover,
      setSettings,
      getOpenState,
    },
  };

  return (
    <DashboardSidebarContext value={value}>{children}</DashboardSidebarContext>
  );
};
export default DashboardContext;
