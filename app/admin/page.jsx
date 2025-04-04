"use server"
import AdminClient from './client';
import SQL from '../../lib/sql';
import { CreateNewParkingSlot, CreateNewStation, CreateNewUser } from '../../lib/tools';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
async function CreateUser(username, password, name, adress, email, telephone, userlevel) {
    "use server"
    const res = await CreateNewUser(username, password, name, adress, email, telephone, userlevel);
    return res;

}
async function CreateStation(stationName, admin, slots, price, floors, maxSlotsPerFloor) {
    "use server"
    const res = await CreateNewStation(stationName, admin, slots, price, floors, maxSlotsPerFloor);
    console.log('Sres: ', res[0])
    for (let index = 0; index < slots; index++) {
        await  CreateNewParkingSlot(res[0].StationName +' '+index, res[0].StationName, res[0].StationNo)
    }
    return res;

}
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
export default async function AdminServer() {
    const admins = await SQL.GetStationAdmins();
    let cleanedArray = []
    let tempArray = [];
    let usedString = '';
    admins.forEach((item) => {
        usedString = item.row
        usedString = usedString.replace('(', '')
        usedString = usedString.replace(')', '')
        tempArray = usedString.split(',')
        cleanedArray.push({ Name: tempArray[1], UserID: tempArray[0] })
    })

    return (<AdminClient DestroySession={DestroySession} CreateStation={CreateStation} CreateUser={CreateUser} adminList={cleanedArray} />)
}