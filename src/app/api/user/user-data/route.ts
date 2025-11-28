import { NextResponse } from 'next/server';
import { UserServices } from '~services/repositories/user';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get('username') || '';
  const q = url.searchParams.get('query') || '';

  const userData = await UserServices.getUserDataByIdentifier(username, q);

  return NextResponse.json({ data: userData });
}
