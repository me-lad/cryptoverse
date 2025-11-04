import React, { Dispatch } from 'react';

export interface DashboardSidebarSettingsT {
  disabled: boolean;
  hoverable: boolean;
}

export interface DashboardSidebarContextT {
  isOpen: boolean;
  isHover: boolean;
  settings: DashboardSidebarSettingsT;

  action?: {
    setOpenState: Dispatch<React.SetStateAction<boolean>>;
    setHoverState: Dispatch<React.SetStateAction<boolean>>;
    setSettings: Dispatch<React.SetStateAction<DashboardSidebarSettingsT>>;
    getOpenState: () => boolean;
  };
}

export type DashboardSidebarMenuItemT = {
  title: string;
  icon: string;
} & (
  | {
      url: string;
      subItems?: never;
    }
  | {
      url?: never;
      subItems: Partial<DashboardSidebarMenuItemT>[];
    }
);

export interface DashboardSidebarMenuGroupT {
  title: string;
  items: DashboardSidebarMenuItemT[];
}
