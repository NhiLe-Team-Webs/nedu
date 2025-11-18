import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add any middleware logic here if needed
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     * - picture/ (local images directory)
     * - All files with extensions (static assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|picture/|.*\\.[^/]+$).*)",
  ],
}