"use server"
import StationAdminClient from './client';
import { cookies } from 'next/headers.js';
import { getIronSession } from 'iron-session';

//ødelegger session, funksjonelt logger brukeren ut
//fjerner cookien som knytter bruker til session data på serveren
async function DestroySession() {
    "use server"
    try {
        const userCookies = await cookies();
        const session = await getIronSession(userCookies, {
            password: process.env.SESSION_PWD,
            cookieName: 'session',
        });
         session.destroy()
        return 'success'
    } catch (error) {
        return 'error'
    }

}
//innholdet som blir vist til brukeren
//blir generert fra server siden for sikkererhet 
//server siden genererer et komponent som er kan kontrolleres fra klienten
export default async function AdminServer() {
    return (<StationAdminClient DestroySession={DestroySession} />)
}