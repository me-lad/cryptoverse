export interface DashboardSidebarContextFlagsT {
  isOpen: boolean;
  isHovered: boolean;
  isDisabled: boolean;
  isHoverable: boolean;
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
