import bcrypt from "bcrypt"
import SQL from './sql';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function HashPassword(Password) {
    const salt = await DefaultSalt();
    const passwordHash = await bcrypt.hash(Password, salt);
    return passwordHash;

}
export async function CreateNewUser(username, password, name, adress, email, telephone, userlevel = 1) {
    const pwdHash = await HashPassword(password)
    const result = await SQL.InsertUser(username, pwdHash, name, adress, email, telephone, userlevel);
    return result

}
export async function CreateNewStation(stationName, admin, slots, price, floors, maxSlotsPerFloor) {
    const result = await SQL.InsertStation(stationName, admin, slots, price, floors, maxSlotsPerFloor);
    return result
}
export async function CreateNewParkingSlot(name, station, stationID) {
    const result = await SQL.InsertParkingSlot(name, station, stationID);
    return result

}
export async function VerifyLoginn(username, password) {
    const dbPassword = await SQL.GetUserPassword(username);
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
async function DefaultSalt() {
    const salt = await bcrypt.genSalt(3);
    return salt;
}