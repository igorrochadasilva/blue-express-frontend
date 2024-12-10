import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

// Define protected and public routes
const PROTECTED_ROUTES = ['/dashboard', '/approvers', '/contract-requests'];
const PUBLIC_ROUTES = ['/', '/reset-password'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret });

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    ...PUBLIC_ROUTES,
    ...PROTECTED_ROUTES.map((route) => `${route}/:path*`),
  ],
};
