import bcrypt from "bcrypt"
import SQL from './sql';

export async function HashPassword(Password) {
    const salt = await DefaultSalt();
    const passwordHash = await bcrypt.hash(Password, salt);
    return passwordHash;
    
}
export async function VerifyLoginn(Username, Password) {
    
}
async function DefaultSalt() {
    const salt = await bcrypt.genSalt(3);
    return salt;
}