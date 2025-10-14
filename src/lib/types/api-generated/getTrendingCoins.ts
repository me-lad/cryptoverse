export interface GetTrendingCoins {
  coins: Coin[];
}

export interface Coin {
  item: Item;
}

interface Item {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data: ItemData;
}

interface ItemData {
  price: number;
  price_btc: string;
  price_change_percentage_24h: { [key: string]: number };
  market_cap: string;
  market_cap_btc: string;
  total_volume: string;
  total_volume_btc: string;
  sparkline: string;
  content: Content | null;
}

interface Content {
  title: string;
  description: string;
}
