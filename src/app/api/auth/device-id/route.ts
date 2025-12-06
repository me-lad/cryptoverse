import { NextResponse } from 'next/server';
import { getOrCreateDeviceId } from '~helpers/cookies';

export async function GET() {
  const id = await getOrCreateDeviceId();
  return NextResponse.json({ deviceId: id });
}
