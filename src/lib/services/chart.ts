interface ChartDataResponse {
  ok: boolean;
  status: number;
  data?: any;
  error?: string;
}

/**
 * Fetch mini chart data from TradingView
 * Use in route handlers or server components
 */
export async function fetchMiniChartData(
  symbol: string,
  interval: string = '1D',
): Promise<ChartDataResponse> {
  try {
    const url = `https://symbol-search.tradingview.com/symbol_search/v3/quotes?text=${encodeURIComponent(
      symbol,
    )}&hl=1&exchange=&lang=en&search_type=&domain=production&usage=`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: `Failed to fetch: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      status: 200,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function fetchAdvancedChartData(
  symbol: string,
  interval: string = 'D',
  range: string = '12M',
): Promise<ChartDataResponse> {
  try {
    // TradingView chart data endpoint
    const url = `https://scanner.tradingview.com/crypto/scan`;

    const payload = {
      filter: [{ left: 'exchange', operation: 'equal', right: 'BINANCE' }],
      symbols: { tickers: [`BINANCE:${symbol.toUpperCase()}USDT`] },
      columns: [
        'Recommend.All',
        'volume',
        'change',
        'high',
        'low',
        'close',
        'open',
      ],
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: `Failed to fetch: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      status: 200,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
