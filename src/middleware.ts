import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
  const path:string = request.nextUrl.pathname

  const isPublic = path == '/login' || path == '/signup'

  const token:any = request.cookies.get("token")?.value || ''

  //based on the these two variables we can handle redirection

  //Authorized Users
  if(isPublic && token){
    return NextResponse.redirect(new URL('/profile' , request.nextUrl))
  }

  //Un-Authorized Access
  if(!isPublic && !token){
    return NextResponse.redirect(new URL('/login' , request.nextUrl))
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/profile','/login','/signup','/profile/:name'],
}