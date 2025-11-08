import { fetchAdvancedChartData } from '@/lib/services/widgets';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const interval = searchParams.get('interval') || 'D';
  const range = searchParams.get('range') || '12M';

  if (!symbol) {
    return NextResponse.json(
      { error: 'Symbol parameter is required' },
      { status: 400 },
    );
  }

  try {
    const data = await fetchAdvancedChartData(symbol, interval, range);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch advanced chart data' },
      { status: 500 },
    );
  }
}
