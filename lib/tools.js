import bcrypt from "bcrypt"
import SQL from './sql';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

//salt som blir brukt for hashing av passord
async function DefaultSalt() {
    const salt = await bcrypt.genSalt(3);
    return salt;
}

//lager Hash til passord-strengen som blir sendt inn
export async function HashPassword(Password) {
    const salt = await DefaultSalt();
    const passwordHash = await bcrypt.hash(Password, salt);
    return passwordHash;

}
//lager Hash fra passordet brukeren har skrevet inn, oppretter bruker
export async function CreateNewUser(username, password, name, adress, email, telephone, userlevel = 1) {
    const pwdHash = await HashPassword(password)
    const result = await SQL.InsertUser(username, pwdHash, name, adress, email, telephone, userlevel);
    return result

}

//oppretter ny stasjon
export async function CreateNewStation(stationName, admin, slots, price, floors, maxSlotsPerFloor) {
    const result = await SQL.InsertStation(stationName, admin, slots, price, floors, maxSlotsPerFloor);
    return result
}

//oppretter ny parkeringsplass til stasjon
export async function CreateNewParkingSlot(name, station, stationID) {
    const result = await SQL.InsertParkingSlot(name, station, stationID);
    return result

}

//oppretter ny bil til bruker
export async function CreateCar(regNr, userID) {
    const result = await SQL.InsertCar(regNr, userID)
    return result;
    
}

//Logger inn bruker
//henter ut passord hash Basert på brukernavn skrevet inn
//dette må bli gjort for at hashen skal bli den samme når hashen blir sjekket
//blir gjort gjennom bcrypt.compare(passord, hash)
//om loginn er valid setter session gjennom iron-session 
export async function VerifyLoginn(username, password) {
    const dbPassword = await SQL.GetUserPassword(username);
    if (!dbPassword[0].Password)
        return'noUser';
    const passwordHash = dbPassword[0].Password;
    const validLoginn = await bcrypt.compare(password, passwordHash);
    if (validLoginn) {

        const simpleUserData = await SQL.GetUserWithUserAndPass(username, passwordHash);
        if (simpleUserData === 'error')
            return 'sqlErr'
        try {
            const userCookies = await cookies();
            const session = await getIronSession(userCookies, {
                password: process.env.SESSION_PWD, 
                cookieName: 'session', 
                cookieOptions: {
                    maxAge: 60 * 30
                }
            });
            console.log(simpleUserData[0].UserID);
            console.log(simpleUserData[0].userLevel);
            //sesion verdire, session."name" bliur opprettet av session om det ikke eksisterer
            session.UserID = simpleUserData[0].UserID;
            session.userLevel = simpleUserData[0].userLevel;
            await session.save();
            if (Number(simpleUserData[0].userLevel) === 10) {
                return 'admin'
            } else if (Number(simpleUserData[0].userLevel) === 5) {
                return 'stationAdmin'
            } else {
                return 'user'
            }
        } catch (error) {
            console.log(error)
            return 'sessionErr'
        }
    }


}

