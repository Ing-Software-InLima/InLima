import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const pass = new TextEncoder().encode("secret") // Formato que pide jose
    const token = request.cookies.get('myToken')

    if (token === undefined) {
        if(request.nextUrl.pathname.includes('/login')){
            return NextResponse.next();
        }else{
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    
    try {
        const { payload } = await jwtVerify(token?.value, pass);
        const rol = payload?.rol;
        if (rol === 1 && !['/home', '/estado', '/complaint', '/perfil', '/detalle'].some(path => request.url.includes(path))) {
            console.log("Usuario no puede entrar a esta página")
            return NextResponse.redirect(new URL('/home', request.url));
        }
        else if (rol === 2 && !['/gestion', '/resultados', '/detalle', '/perfil'].some(path => request.url.includes(path))) {
            console.log("Admin no puede entrar a esta página")
            return NextResponse.redirect(new URL('/gestion', request.url));
        }
        console.log("pasa pasa nomas")
        return NextResponse.next();
    } catch (error) {
        console.error(error)
        console.log("No token")
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/home', '/estado', '/complaint/:path*', '/gestion', '/perfil', '/resultados', '/detalle/:path*', '/login']
}