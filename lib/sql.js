import { neon } from "@neondatabase/serverless";

// Klasse for SQL queries til hver tabell
//Skal inneholde 
// INSERT
// SELECT
// UPDATE
export default class SQL {
    //Copy paste for ny sqlquery
    static async sqlquery() {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql.query(``);
        return result
    }
    //SQL INSERT for oppretting av brukerrrrr
    static async InsertUser(username, password, name, adress, email, telephone, userlevel) {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql.query(`INSERT INTO "Users" ("Username", "Password", "Name", "Adress", "Email", "Telephone", "userLevel") values ($1, $2, $3, $4, $5, $6, $7)`, [username, password, name, adress, email, telephone, userlevel]);
        return result

    }

    //SQL SELECT for å hente bruker fra databasen
    static async GetUser(username, password) {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql.query(`SELECT * FROM "Users" WHERE "Username" = $1 and "Password" = $1`, [username, password]);
        return result
    }
    //SQL SELECT for å hente ut stasjons administratorer fra databasen
    static async GetStationAdmins() {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql.query(`SELECT ("UserID","Name") FROM "Users" WHERE "userLevel" = 5`);
        return result
    }

    //test funksjon for å sjekke kobling til tabell i databasen 
    static async SelectTable(table) {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql.query(`SELECT * FROM "${table}"`)
        return result

    }
}