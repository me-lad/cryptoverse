// Packages imports
import { NextResponse } from "next/server";

// Local imports
import { AuthService } from "~services/auth.service";

export async function GET() {
  const { isAuthenticated } = await AuthService.verifyAccessSession();
  if (isAuthenticated) return NextResponse.json({ isAuthenticated: true });

  const { isAllowed } = await AuthService.verifyRefreshSession();
  if (isAllowed) return NextResponse.json({ isAuthenticated: true });

  return NextResponse.json({ isAuthenticated: false });
}
