import type {
  DashboardSidebarContextT,
  DashboardSidebarSettingsT,
  DashboardSidebarMenuGroupT,
  DashboardSidebarMenuItemT,
} from '~types/dashboard';

// Sidebar context
const dashboardSidebarInitialSetting: DashboardSidebarSettingsT = {
  disabled: false,
  hoverable: false,
} as const;

export const dashboardSidebarInitialValue: DashboardSidebarContextT = {
  isOpen: true,
  isHover: false,
  settings: dashboardSidebarInitialSetting,
} as const;

// Sidebar items
const fallbackUrl = '/dashboard/developing';

const coreMenuGroupItems: DashboardSidebarMenuItemT[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: '/svgs/dashboard/icons/home.svg',
  },

  {
    title: 'Wallet',
    icon: '/svgs/dashboard/icons/wallet.svg',
    subItems: [
      {
        title: 'Assets',
        url: fallbackUrl,
      },

      {
        title: 'Deposit',
        url: fallbackUrl,
      },

      {
        title: 'Withdraw',
        url: fallbackUrl,
      },
    ],
  },

  {
    title: 'Transactions',
    url: fallbackUrl,
    icon: '/svgs/dashboard/icons/transactions.svg',
  },

  {
    title: 'Market Overview',
    url: fallbackUrl,
    icon: '/svgs/dashboard/icons/market-overview.svg',
  },
];

const securityMenuGroupItems: DashboardSidebarMenuItemT[] = [
  {
    title: 'KYC Verification',
    icon: '/svgs/dashboard/icons/kyc.svg',
    url: '/dashboard/kyc',
  },

  {
    title: '2FA Setup',
    icon: '/svgs/dashboard/icons/2fa.svg',
    url: fallbackUrl,
  },

  {
    title: 'Device Management',
    icon: '/svgs/dashboard/icons/device-management.svg',
    url: '/dashboard/device-management',
  },
];

const analyticsMenuGroupItems: DashboardSidebarMenuItemT[] = [
  {
    title: 'Performance Analytics',
    icon: '/svgs/dashboard/icons/performance.svg',
    url: fallbackUrl,
  },

  {
    title: 'Tax Reports',
    icon: '/svgs/dashboard/icons/tax.svg',
    url: fallbackUrl,
  },
];

const settingsMenuGroupItems: DashboardSidebarMenuItemT[] = [
  {
    title: 'Account Management',
    icon: '/svgs/dashboard/icons/account-management.svg',
    url: fallbackUrl,
  },

  {
    title: 'Support & Help Center',
    icon: '/svgs/dashboard/icons/support.svg',
    url: fallbackUrl,
  },

  {
    title: 'Notification Center',
    icon: '/svgs/dashboard/icons/notification.svg',
    url: fallbackUrl,
  },
];

export const dashboardSidebarMenuGroups: DashboardSidebarMenuGroupT[] = [
  {
    title: 'Core',
    items: coreMenuGroupItems,
  },

  {
    title: 'Security & Identity',
    items: securityMenuGroupItems,
  },

  {
    title: 'Analytics & Insight',
    items: analyticsMenuGroupItems,
  },

  {
    title: 'Settings & Support',
    items: settingsMenuGroupItems,
  },
] as const;
