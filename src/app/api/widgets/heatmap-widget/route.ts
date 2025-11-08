import { NextResponse } from 'next/server';
import { fetchHeatmapData } from '@/lib/services/widgets';

export async function GET() {
  try {
    const response = await fetchHeatmapData();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch heatmap data' },
      { status: 500 },
    );
  }
}
