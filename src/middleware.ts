// middleware.ts
// Middleware — só verifica se o cookie token existe
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/'; // redireciona se não tiver token
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // token existe, segue em frente
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/extrato/:path*',
    '/extrato',
  ],
};
