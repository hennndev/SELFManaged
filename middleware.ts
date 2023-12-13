import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if(request.nextUrl.pathname.startsWith("/dashboard") && request.nextauth.token?.role !== 'admin') {
            return NextResponse.rewrite(new URL("/page-not-found", request.url))
        }

        if(request.nextUrl.pathname.startsWith("/api/users") && request.nextauth.token?.role !== 'admin') {
            return NextResponse.rewrite(new URL("/page-not-found", request.url))
        }
    }
)

export const config = { matcher: ["/admin/:path*"] }