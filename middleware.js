// https://nextjs.org/docs/advanced-features/middleware
import { NextResponse } from 'next/server';

export function middleware(request) {
  let loggedIn = request.cookies.get('name')?.value;
  if (!loggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/actor/:path*',
    '/category/:path*',
    '/country/:path*',
    '/director/:path*',
    '/movie/:path*', 
    '/studio/:path*', 
  ],
};
