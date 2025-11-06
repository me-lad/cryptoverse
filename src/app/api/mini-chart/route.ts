import { fetchMiniChartData } from '~services/chart';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json(
      { error: 'Symbol parameter is required' },
      { status: 400 },
    );
  }

  try {
    const data = await fetchMiniChartData(symbol);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch mini chart data' },
      { status: 500 },
    );
  }
}
