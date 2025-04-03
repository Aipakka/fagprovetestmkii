import SQL from '?/lib/sql'
import DefaultButton from '../../components/DefaultButton'
import { HashPassword } from '?/lib/tools'
export default function AdminClient(){
    async function sqlWrapper() {
        "use server"
        const pwdHash = HashPassword('Password01')
        const result = await SQL.InsertUser('admin', pwdHash, 'MainAdmin', 'Server', 'admin@admin.fake', '+4744477999');
        console.log(result)
    }
    async function sqlSelect() {
        "use server"
        const result = await SQL.SelectTable('Users');
        console.log(result)
    }
    return(<>
    <DefaultButton text={'add admin'} clickFunction={sqlWrapper}/>
    <DefaultButton text={'select users'} clickFunction={sqlSelect}/>
     </>)
}