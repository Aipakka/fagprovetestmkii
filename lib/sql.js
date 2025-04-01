import { neon } from "@neondatabase/serverless";

export default class SQL {

    static async InsertUser(username, password, name, adress, email, telephone) {
        const sql = neon(process.env.DATABASE_URL);
        console.log(`INSERT INTO Users (Username, Password, Name, Adress, Email, Telephone) values ($1, $2, $3, $4, $5, $6)`, [username, password, name, adress, email, telephone])
        const result = await sql.query(`INSERT INTO Users (Username, Password, Name, Adress, Email, Telephone) values ($1, $2, $3, $4, $5, $6)`, [username, password, name, adress, email, telephone]);
        return result

    }
    static async SelectTable(table) {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql.query(`SELECT * FROM ${table}`)
        return result

    }
}