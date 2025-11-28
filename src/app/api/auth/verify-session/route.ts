// 📦 Third-Party imports
import { NextResponse } from 'next/server';

// 📦 Internal imports
import { AuthServices } from '~services/repositories/auth';

export async function GET() {
  const { isAuthenticated, username: accessUsername } =
    await AuthServices.verifyAccessSession();

  if (isAuthenticated) {
    return NextResponse.json({
      isAuthenticated: true,
      username: accessUsername,
    });
  }

  const { isAllowed, username: refreshUsername } =
    await AuthServices.verifyRefreshSession();
  if (isAllowed)
    return NextResponse.json({
      isAuthenticated: true,
      username: refreshUsername,
    });

  return NextResponse.json({ isAuthenticated: false });
}
