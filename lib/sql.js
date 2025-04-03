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
    //SQL INSERT for oppretting av bruker
    static async InsertUser(username, password, name, adress, email, telephone, userlevel) {
        const sql = neon(process.env.DATABASE_URL);
        await sql.query(`INSERT INTO "Users" ("Username", "Password", "Name", "Adress", "Email", "Telephone", "userLevel") values ($1, $2, $3, $4, $5, $6, $7)`, [username, password, name, adress, email, telephone, userlevel]);
        const result = await sql.query(`SELECT * FROM "Users" WHERE "Username" = $1`, [username])
        return result

    }

    //SQL INSERT for å lage ny parkeringsstasjon
    static async InsertStation(stationName, admin, slots, price, floors, maxSlotsPerFloor) {
        const sql = neon(process.env.DATABASE_URL);
        console.log(`INSERT INTO "ParkingStations" ("StationName", "admin", "slots", "Price", "Floors, "MaxSlotsFloor") values ($1, $2, $3, $4, $5, $6)`, [stationName, admin, slots, price, floors, maxSlotsPerFloor])
        await sql.query(`INSERT INTO "ParkingStations" ("StationName", "admin", "slots", "Price", "Floors, "MaxSlotsFloor") values ($1, $2, $3, $4, $5, $6)`, [stationName, admin, slots, price, floors, maxSlotsPerFloor]);
        const stationCreatedData = await sql.query(`SELECT "StationName", "StationID" FROM "ParkingStations" WHERE "StationName" = $1`, [stationName]);
        return stationCreatedData
    }
    //SQL INSERT for å lage ny parkeringsstasjon
    static async InsertParkingSlot(name, station, stationID) {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql.query(`INSERT INTO "ParkingSlots" ("Name", "Station", "StationID") values ($1, $2, $3)`, [name, station, stationID]);
        return result
    }
    //SQL get parkingslots
    static async GetSlots(name, station, stationID){
        const sql = neon(process.env.DATABASE_URL);

        const result = await sql.query(`SELECT * FROM "ParkingSlots" WHERE "Name" = $1 and "Station" = $2 and "StationID" = $3`, [name, station, stationID]);
        return result

    }

    //SQL SELECT for å hente bruker fra databasen
    static async GetUser(username, password) {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql.query(`SELECT * FROM "Users" WHERE "Username" = $1 and "Password" = $2`, [username, password]);
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