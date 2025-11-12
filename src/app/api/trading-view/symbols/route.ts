import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get('text') || '';
    const start = url.searchParams.get('start') || '0';

    const tvUrl = `https://symbol-search.tradingview.com/local_search/v3/?text=${encodeURIComponent(
      q,
    )}&hl=1&search_type=crypto&start=${encodeURIComponent(start)}&promo=true`;

    const resp = await fetch(tvUrl, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'application/json',
      },
    });

    if (!resp.ok) {
      return NextResponse.json(
        { ok: false, status: resp.status, error: resp.statusText },
        { status: 502 },
      );
    }

    const data = await resp.json();

    console.log(data);
    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 },
    );
  }
}
