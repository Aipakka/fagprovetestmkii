import LoginnClient from './client.jsx'
import SQL from '../lib/sql';
import {VerifyLoginn} from '../lib/tools.js'
export default function loginnServer() {
  async function InitVerifyLoginn(username, password) {
    "use server"
    const res = await VerifyLoginn(username, password);
    return res
  }

  return (<LoginnClient VerifyLoginn={InitVerifyLoginn} />);
}
