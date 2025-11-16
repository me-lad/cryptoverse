import React, { Dispatch } from 'react';

export interface DashboardSidebarSettingsT {
  disabled: boolean;
  hoverable: boolean;
}

interface DashboardSidebarContextActions {
  setOpenState: Dispatch<React.SetStateAction<boolean>>;
  setHoverState: Dispatch<React.SetStateAction<boolean>>;
  setSettings: Dispatch<React.SetStateAction<DashboardSidebarSettingsT>>;
  getOpenState: () => boolean;
}

export interface DashboardSidebarContextT {
  isOpen: boolean;
  isHover: boolean;
  settings: DashboardSidebarSettingsT;
  action?: DashboardSidebarContextActions;
}

export type DashboardSidebarMenuBaseT = {
  title: string;
  icon: string;
};

export type DashboardSidebarMenuLeafT = DashboardSidebarMenuBaseT & {
  url: string;
  subItems?: never;
};

export type DashboardSidebarMenuNodeT = DashboardSidebarMenuBaseT & {
  url?: never;
  subItems: Partial<DashboardSidebarMenuItemT>[];
};

export type DashboardSidebarMenuItemT =
  | DashboardSidebarMenuLeafT
  | DashboardSidebarMenuNodeT;

export interface DashboardSidebarMenuGroupT {
  title: string;
  items: DashboardSidebarMenuItemT[];
}
