// 📦 Third-Party imports
import { NextResponse } from 'next/server';

// 📦 Internal imports
import { AuthServices } from '~services/auth';

export async function GET() {
  const { isAuthenticated } = await AuthServices.verifyAccessSession();
  if (isAuthenticated) return NextResponse.json({ isAuthenticated: true });

  const { isAllowed } = await AuthServices.verifyRefreshSession();
  if (isAllowed) return NextResponse.json({ isAuthenticated: true });

  return NextResponse.json({ isAuthenticated: false });
}
