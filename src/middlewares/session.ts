// src/middlewares/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/api/_auth';



export async function sessionMiddleware(request: NextRequest) {
  const tokenSession = request.cookies.get('token')?.value;
  console.log('***************************** -sessionMiddleware')
  console.log( tokenSession )
  console.log('***************************** -sessionMiddleware')


    //const dataNovoLancamento = await verifySession(tokenSession);



  
  if (!tokenSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
