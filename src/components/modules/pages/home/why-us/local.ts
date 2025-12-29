// 📦 imports
import { buildRandomID } from '~helpers/generators';

// 🧾 types
interface PropertyT {
  id: number;
  title: string;
  description: string;
  img: string;
}

// 🧾 constants
export const properties: PropertyT[] = [
  {
    id: buildRandomID(),
    title: 'Your Gateway to Seamless Crypto Trading',
    description:
      'Discover an all-in-one platform that simplifies cryptocurrency trading. Whether you’re a beginner or a pro, explore real-time market data, spot trading, and secure asset management.',
    img: '/images/home-page/why-0.png',
  },
  {
    id: buildRandomID(),
    title: 'Instant Deposits and Withdrawals',
    description:
      'Experience lightning-fast deposits and withdrawals with our secure wallet. Manage your funds effortlessly and access your transaction history at any time.',
    img: '/images/home-page/why-1.png',
  },
  {
    id: buildRandomID(),
    title: 'Personalized Dashboard for Every Trader',
    description:
      'Keep track of your assets, open orders, and portfolio performance, all from one customizable dashboard designed to meet your unique needs.',
    img: '/images/home-page/why-2.png',
  },
  {
    id: buildRandomID(),
    title: 'Stay on Top of the Market',
    description:
      'Access the latest market trends and data with our comprehensive Market Overview. Analyze charts, track prices, and make informed decisions with confidence.',
    img: '/images/home-page/why-3.png',
  },
  {
    id: buildRandomID(),
    title: 'Crypto Insights & Market Trends',
    description:
      'Stay updated with the latest in cryptocurrency news, insights, and trends on our blog. Learn from expert analyses and engage with a community of crypto enthusiasts.',
    img: '/images/home-page/why-4.png',
  },
  {
    id: buildRandomID(),
    title: 'Expert Support, Anytime',
    description:
      'Have questions or need help? Our dedicated support team is available 24/7 to guide you through every step of your crypto journey.',
    img: '/images/home-page/why-5.png',
  },
] as const;
