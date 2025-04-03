"use server"
import AdminClient from './client';
import SQL from '../../lib/sql';
import { CreateNewUser } from '../../lib/tools';
async function CreateUser(params) {
    "use server"
    const res = await CreateNewUser(username, password, name, adress, email, telephone, userlevel)
    
}
export default async function AdminServer(){
    const admins = await SQL.GetStationAdmins()
    console.log('SQLadminget: ', admins)
    return(<AdminClient CreateUser={CreateUser} adminList={[{Name: 'bob', UserID: 1 }]}/>)
}