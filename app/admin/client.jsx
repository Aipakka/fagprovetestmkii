import SQL from '../../lib/sql'
import bcrypt from "bcrypt"
import DefaultButton from '../../components/DefaultButton'
export default function AdminClient(){
    async function sqlWrapper() {
        "use server"
        const pwdHash = await bcrypt.hash('Password01', 3);
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