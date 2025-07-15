import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './../lib/api/_auth';



// Rotas protegidas
const protectedRoutes = ['/dashboard', '/extrato', '/customer'];

// Rotas públicas (acesso liberado sem token)
const publicRoutes = ['/', '/reset', '/login', '/register'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;


  // Verifica se a rota atual está nas rotas públicas
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Verifica se a rota atual está nas protegidas
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Se for uma rota protegida e não tiver token, redireciona para /login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se for uma rota pública ou tiver token, permite o acesso
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // ignora arquivos estáticos
  ],
};
