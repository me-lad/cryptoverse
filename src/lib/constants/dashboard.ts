import type {
  DashboardSidebarMenuGroupT,
  DashboardSidebarMenuItemT,
} from '~types/dashboard';

// Sidebar context

// Sidebar items
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
        url: '/dashboard/assets',
      },

      {
        title: 'Deposit',
        url: '/dashboard/deposit',
      },

      {
        title: 'Withdraw',
        url: '/dashboard/withdraw',
      },
    ],
  },

  {
    title: 'Transactions',
    icon: '/svgs/dashboard/icons/transactions.svg',
    url: '/dashboard/transactions',
  },

  {
    title: 'Market Overview',
    url: '/dashboard/market-overview',
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
    url: '/dashboard/two-factor-auth',
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
    url: '/dashboard/performance',
  },

  {
    title: 'Tax Reports',
    icon: '/svgs/dashboard/icons/tax.svg',
    url: '/dashboard/tax-reports',
  },
];

const settingsMenuGroupItems: DashboardSidebarMenuItemT[] = [
  {
    title: 'Account Management',
    icon: '/svgs/dashboard/icons/account-management.svg',
    url: '/dashboard/account-management',
  },

  {
    title: 'Support & Help Center',
    icon: '/svgs/dashboard/icons/support.svg',
    url: '/dashboard/support',
  },

  {
    title: 'Notification Center',
    icon: '/svgs/dashboard/icons/notification.svg',
    url: '/dashboard/notifications',
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
