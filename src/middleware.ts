// 📦 Third-Party imports
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 🧾 Local variables
const loginNecessaryRoutes = ['/dashboard'];
const logoutNecessaryRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/verify',
  '/auth/reset-password',
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isLoginNecessary = loginNecessaryRoutes.includes(path);
  const isLogoutNecessary = logoutNecessaryRoutes.includes(path);
  1;
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get('access_token')?.value;
  const refreshCookie = cookieStore.get('refresh_token')?.value;

  if (isLoginNecessary && !accessCookie && !refreshCookie) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }

  if (isLogoutNecessary && accessCookie && refreshCookie) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  NextResponse.next();
}

export const config = {
  // Routes that middleware should not run
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
