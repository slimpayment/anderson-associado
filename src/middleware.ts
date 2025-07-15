import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middlewares/auth';
import { sessionMiddleware } from './middlewares/session';


export function middleware(request: NextRequest) {


  let response = sessionMiddleware(request);

  


  return NextResponse.next();
}


