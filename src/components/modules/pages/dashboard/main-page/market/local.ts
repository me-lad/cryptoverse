export type OrderT = 'trending' | 'top-volume' | 'favorite';

export const coinsSymbolList: Partial<{ [key in OrderT]: string[] }> = {
  trending: ['BTC', 'ETH', 'SOL', 'XRP'],
  'top-volume': ['USDT', 'BTC', 'ETH', 'USDC'],
} as const;
