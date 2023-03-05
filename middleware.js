// https://nextjs.org/docs/advanced-features/middleware
import { NextResponse } from 'next/server';

export function middleware(request) {
  // when user clicking 'dashborad in breadcrumb link, directly redirect to '/'
  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   if (request.nextUrl.pathname == '/dashboard') {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // } else {
  let loggedIn = request.cookies.get('name')?.value;
  if (!loggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
  // }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/search/:path*',
    '/statistics/:path*',
    '/settings/:path*',
    '/actor/:path*',
    '/category/:path*',
    '/country/:path*',
    '/director/:path*',
    '/movie/:path*',
    '/studio/:path*',
  ],
};
