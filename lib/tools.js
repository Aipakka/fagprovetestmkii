import bcrypt from "bcrypt"
import SQL from './sql';

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
export async function VerifyLoginn(Username, Password) {
    const passwordHash = await HashPassword(Password)
}
async function DefaultSalt() {
    const salt = await bcrypt.genSalt(3);
    return salt;
}