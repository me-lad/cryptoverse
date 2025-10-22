interface FooterLinkT {
  title: string;
  items: { name: string; url: string }[];
}
export const footerLinks: FooterLinkT[] = [
  {
    title: 'Explore',
    items: [
      { name: 'Coins list', url: '/coins' },
      { name: 'Spot', url: '/' },
    ],
  },

  {
    title: 'News',
    items: [
      { name: 'Latest news', url: '/news' },
      { name: 'Spanish news', url: '/news?language=ES' },
      { name: 'French news', url: '/news?language=FR' },
      { name: 'Turkish news', url: '/news?language=TR' },
    ],
  },

  {
    title: 'Help & Resources',
    items: [
      { name: 'About Us', url: '/about-us' },
      { name: 'Contact Us', url: '/contact-us' },
      { name: 'Customer support', url: '/support' },
      { name: 'FAQs', url: '/faq' },
    ],
  },

  {
    title: 'Services',
    items: [
      { name: 'Academy', url: '/' },
      { name: 'Currency converter', url: '/' },
      { name: 'Guides', url: '/' },
      { name: 'Advertisement', url: '/' },
    ],
  },

  {
    title: 'Currencies price',
    items: [
      { name: 'Bitcoin price', url: '/coin/bitcoin' },
      { name: 'Ethereum price', url: '/coin/ethereum' },
      { name: 'Tether price', url: '/coin/tether' },
      { name: 'TRON price', url: '/coin/tron' },
      { name: 'Ripple price', url: '/coin/ripple' },
    ],
  },
];

interface socialsDataT {
  iconPath: string;
  url: string;
}
export const socialsData: socialsDataT[] = [
  {
    iconPath: '/svgs/logo/linkedin.svg',
    url: '/',
  },
  {
    iconPath: '/svgs/logo/instagram.svg',
    url: '/',
  },
  {
    iconPath: '/svgs/logo/facebook.svg',
    url: '/',
  },
  {
    iconPath: '/svgs/logo/twitter.svg',
    url: '/',
  },
];
