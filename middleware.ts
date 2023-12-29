import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

//when using withAuth, if current status is unauthenticated. System automatically redirect to signin page
export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if(request.nextUrl.pathname.startsWith("/dashboard") && !request.nextauth.token?.isSubscribed) {
            return NextResponse.rewrite(new URL("/page-not-found", request.url)) 
        } else if(request.nextUrl.pathname.startsWith("/dashboard") && request.nextauth.token?.isSubscribed) {
            if((request.nextUrl.pathname.startsWith("/dashboard/my-progress") || request.nextUrl.pathname.startsWith("/dashboard/my-courses") || request.nextUrl.pathname.startsWith("/dashboard/achievment") || request.nextUrl.pathname.startsWith("/dashboard/file-storage") || request.nextUrl.pathname.startsWith("/dashboard/my-portfolio") || request.nextUrl.pathname.startsWith("/dashboard/url-list")) 
                && 
                request.nextauth.token?.isSubscribed !== 'premium') {
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
            return NextResponse.next()
        }
    }
)

export const config = { matcher: ["/dashboard/:path*"] }