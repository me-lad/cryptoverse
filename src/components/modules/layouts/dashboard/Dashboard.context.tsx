// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, useState } from 'react';

// 📦 Internal imports
import type {
  DashboardSidebarContextT,
  DashboardSidebarSettingsT,
} from '~types/dashboard';
import {
  dashboardSidebarInitialSetting,
  dashboardSidebarInitialValue,
} from '~constants/dashboard';

// 🧾 Local types and context declare
interface PropsT {
  children: React.ReactNode;
}

export const DashboardSidebarContext = createContext<DashboardSidebarContextT>(
  dashboardSidebarInitialValue,
);

// ⚙️ Functional component
const DashboardContext: React.FC<PropsT> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [settings, setSettings] = useState<DashboardSidebarSettingsT>(
    dashboardSidebarInitialSetting,
  );

  const value: DashboardSidebarContextT = {
    isOpen,
    isHover,
    settings,
    action: {
      setOpenState: setIsOpen,
      setHoverState: setIsHover,
      setSettings,
    },
  };

  return (
    <DashboardSidebarContext value={value}>{children}</DashboardSidebarContext>
  );
};
export default DashboardContext;
