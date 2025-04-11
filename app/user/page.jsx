"use server"
import UserClient from './client';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { CreateCar } from '../../lib/tools';


//oppretter ny bil til bruker med data sendt inn fra klient
//blir sendt til klient komponent
async function ServerCreateCar(regNr) {
    "use server"
    const userCookies = await cookies();
    const session = await getIronSession(userCookies, {cookieName: 'session', password: process.env.SESSION_PWD})
    console.log('sess: ', session)
    const userID = session.UserID;
     const res = await CreateCar(regNr, userID);
    return 'success'

}

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
//henter enkel data som trengs på klientsiden
export default async function AdminServer() {

    return (<UserClient DestroySession={DestroySession} CreateCar={ServerCreateCar} />)
}