import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const pass = new TextEncoder().encode("secret");
    const token = request.cookies.get('myToken');

    const registrationData = request.cookies.get('registrationData'); 
    const aux = request.cookies.get('aux'); 

    if (request.nextUrl.pathname === '/verify') {
        if (!registrationData) {
            console.log("Redirigiendo a /login desde /verify por falta de registrationData");
            return NextResponse.redirect(new URL('/login', request.url));
        } else {
            console.log("Acceso permitido a /verify");
            return NextResponse.next();
        }
    }

    if (request.nextUrl.pathname === '/resetPass' && aux) {
        console.log("Acceso permitido a /resetPass con aux presente");
        return NextResponse.next();
    }

    if (token === undefined) {
        if (request.nextUrl.pathname.includes('/login')) {
            console.log("Acceso permitido a /login sin token");
            return NextResponse.next(); 
        } else {
            console.log("Redirigiendo a /login por falta de token");
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else {
        try {
            const { payload } = await jwtVerify(token?.value, pass);
            const rol = payload?.rol;

            if (rol === 1 && !['/home', '/estado', '/complaint', '/perfil', '/detalle'].some(path => request.url.includes(path))) {
                console.log("Redirigiendo a /home para rol 1");
                return NextResponse.redirect(new URL('/home', request.url));
            }

            else if (rol === 2 && !['/gestion', '/resultados', '/detalle', '/perfil'].some(path => request.url.includes(path))) {
                console.log("Redirigiendo a /gestion para rol 2");
                return NextResponse.redirect(new URL('/gestion', request.url));
            }

            console.log("Acceso permitido");
            return NextResponse.next();
        } catch (error) {
            console.error("Error de verificación de token:", error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}

export const config = {
    matcher: [
        '/home', '/estado', '/complaint/:path*', '/gestion', 
        '/perfil', '/resultados', '/detalle/:path*', 
        '/login', '/verify', '/resetPass'
    ]
};
