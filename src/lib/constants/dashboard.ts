import type {
  DashboardSidebarContextT,
  DashboardSidebarSettingsT,
} from '~types/dashboard';

export const dashboardSidebarInitialSetting: DashboardSidebarSettingsT = {
  disabled: false,
  hoverable: false,
} as const;

export const dashboardSidebarInitialValue: DashboardSidebarContextT = {
  isOpen: true,
  isHover: false,
  settings: dashboardSidebarInitialSetting,
} as const;
