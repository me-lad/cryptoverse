export interface SymbolT {
  symbol: string;
  description: string;
  type: Type;
  exchange: Exchange;
  found_by_isin: boolean;
  found_by_cusip: boolean;
  currency_code: CurrencyCode;
  'currency-logoid': CurrencyLogoid;
  'base-currency-logoid'?: string;
  provider_id: ProviderID;
  source_logoid?: SourceLogoid;
  source2: Source2;
  source_id: Prefix;
  typespecs: Typespec[];
  prefix: Prefix;
}

enum CurrencyLogoid {
  CountryUS = 'country/US',
  CryptoXTVCUSDC = 'crypto/XTVCUSDC',
  CryptoXTVCUSDT = 'crypto/XTVCUSDT',
}

enum CurrencyCode {
  Usd = 'USD',
  Usdc = 'USDC',
  Usdt = 'USDT',
}

enum Exchange {
  Binance = 'Binance',
}

enum Prefix {
  Binance = 'BINANCE',
}

enum ProviderID {
  Binance = 'binance',
}

interface Source2 {
  id: Prefix;
  name: Exchange;
  description: Exchange;
}

enum SourceLogoid {
  ProviderBinance = 'provider/binance',
}

enum Type {
  Spot = 'spot',
  Swap = 'swap',
}

enum Typespec {
  Crypto = 'crypto',
  Defi = 'defi',
  Perpetual = 'perpetual',
  Synthetic = 'synthetic',
  TvCalculatedPair = 'tv-calculated-pair',
}

export interface GetTradingViewAvailableSymbols {
  symbols_remaining: number;
  symbols: SymbolT[];
}
