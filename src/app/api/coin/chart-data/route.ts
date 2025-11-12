import { Base_Headers } from '~constants/api';
import { AuthMessages } from '~constants/messages';
import { minutesToMillisecond } from '~helpers/time';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const coinId = searchParams.get('coinId');
    const cycle = searchParams.get('cycle');

    if (!coinId || !cycle) {
      return Response.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${cycle}`;
    
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        ...Base_Headers,
        'x-cg-demo-api-key': process.env.API_KEY_COINGECKO || '',
      },
      next: {
        revalidate: minutesToMillisecond(2.5),
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        return Response.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json({ ok: true, data });

  } catch (error: any) {
    console.error('Chart data fetch error:', error);
    return Response.json(
      { 
        ok: false, 
        error: AuthMessages.Error.CatchHandler 
      },
      { status: 500 }
    );
  }
}