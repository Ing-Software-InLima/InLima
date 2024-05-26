import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const pass = new TextEncoder().encode("secret") //formato que pide jose
    const token = request.cookies.get('myToken')
    if (token === undefined) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
        
        await jwtVerify(token?.value, pass);
        return NextResponse.next();

    } catch (error) {
        console.error(error)
        console.log("No token")
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/home', '/estado', '/complaint/:path*']
}