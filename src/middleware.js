import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { parse } from "cookie";

export async function middleware(request) {
    const pass = new TextEncoder().encode("secret"); // Formato que pide jose
    const cookies = parse(request.headers.get('cookie') || '');

    const token = cookies.myToken;
    const registrationData = cookies.registrationData;

    // Protección de la ruta /verify
    if (request.nextUrl.pathname === '/verify' && !registrationData) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verificación del token JWT para otras rutas
    if (request.nextUrl.pathname !== '/verify' && request.nextUrl.pathname !== '/login') {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        try {
            const { payload } = await jwtVerify(token, pass);
            const rol = payload?.rol;
            if (rol === 1 && !['/home', '/estado', '/complaint', '/perfil', '/detalle'].some(path => request.url.includes(path))) {
                return NextResponse.redirect(new URL('/home', request.url));
            } else if (rol === 2 && !['/gestion', '/resultados', '/detalle', '/perfil'].some(path => request.url.includes(path))) {
                return NextResponse.redirect(new URL('/gestion', request.url));
            }
            return NextResponse.next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/estado', '/complaint/:path*', '/gestion', '/perfil', '/resultados', '/detalle/:path*', '/login', '/verify']
};
