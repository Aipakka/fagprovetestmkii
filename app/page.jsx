import LoginnClient from './client.jsx'
import SQL from '../lib/sql';
import {VerifyLoginn} from '../lib/tools.js'
import { cookies } from 'next/headers.js';
import { getIronSession } from 'iron-session';

export default async function loginnServer() {
  async function InitVerifyLoginn(username, password) {
    "use server"
    const res = await VerifyLoginn(username, password);
    return res
  }
  let redirect = undefined;
  const userCookies = await cookies();
  const session = await getIronSession(userCookies, {
    password: process.env.SESSION_PWD,
    cookieName: 'session',
});
if (session.UserID && session.userLevel){
  switch (session.userLevel) {
    case 1:
      redirect = '/user';      
    case 5:
      redirect = '/stationAdmin';      
    case 10:
      redirect = '/admin';      
  
  }
}

  return (<LoginnClient redirect={redirect} VerifyLoginn={InitVerifyLoginn} />);
}
