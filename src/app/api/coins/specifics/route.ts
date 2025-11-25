import { NextResponse } from 'next/server';
import { BaseHeaders } from '~constants/api';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const ids = url.searchParams.get('ids');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_REQUEST_COINGECKO;
    const fetchUrl = `${baseUrl}/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d%2C30d&ids=${ids}`;
    const key = process.env.API_KEY_COINGECKO || '';

    const resp = await fetch(fetchUrl, {
      method: 'GET',
      headers: { ...BaseHeaders, 'x-cg-demo-api-key': key },
    });
    const json = await resp.json();

    return NextResponse.json(json);
  } catch {
    return NextResponse.error();
  }
}
