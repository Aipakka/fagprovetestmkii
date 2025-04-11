import { getIronSession } from 'iron-session';
import { NextResponse } from 'next/server';

//middleware, blir kjørt imellom hver request som brukeren av nettsiden gjør
//funksjonaliteten sender brukere tilbake til hvor de har rettigheter til å være
//f. eks stopper vanlige brukere fra å ha tilgang til admin sidene og stopper brukere som ikke har logget inn.
export async function middleware(request) {
    const needsSession = ["/admin", "/stationAdmin", "/user","/test"]
    if (needsSession.some(url => request.nextUrl.pathname.startsWith(url))) {
        const session = await getIronSession(request.cookies, {
            password: process.env.SESSION_PWD,
            cookieName: 'session',
        });
        if (!session.UserID) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (session.userLevel) {
            if (request.nextUrl.pathname.startsWith("/admin") && session.userLevel != 10) {
                if (session.userLevel === 5) {
                    return NextResponse.redirect(new URL('/stationAdmin', request.url));
                } else if (session.userLevel === 1) {
                    return NextResponse.redirect(new URL('/user', request.url));
                } else
                    return NextResponse.redirect(new URL('/', request.url));
            }
            if (request.nextUrl.pathname.startsWith("/stationAdmin") && session.userLevel != 5) {
                if (session.userLevel === 10) {
                    return NextResponse.redirect(new URL('/admin', request.url));
                } else if (session.userLevel === 1) {
                    return NextResponse.redirect(new URL('/user', request.url));
                } else
                    return NextResponse.redirect(new URL('/', request.url));
            }
            if (request.nextUrl.pathname.startsWith("/user") && session.userLevel != 1) {
                if (session.userLevel === 10) {
                    return NextResponse.redirect(new URL('/admin', request.url));
                } else if (session.userLevel === 5) {
                    return NextResponse.redirect(new URL('/stationAdmin', request.url));
                } else
                    return NextResponse.redirect(new URL('/', request.url));
            }
        }

        //the user is active so the session is extended to 5 minuttes into the future
        const response = NextResponse.next();
        response.cookies.set('session', request.cookies.get('session').value, { maxAge: 60 * 30 }); // endre fra 30 min til 5 eller 10
        return response;
    }

}