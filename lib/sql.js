import { neon } from "@neondatabase/serverless";
import { error } from 'console';

// Klasse for SQL queries til hver tabell
//Skal inneholde 
// INSERT
// SELECT
// UPDATE
export default class SQL {
    //Copy paste for ny sqlquery
    static async sqlquery() {
        try {
            const sql = neon(process.env.DATABASE_URL);
            const result = await sql.query(``);
            return result
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }
    }
    //SQL INSERT for oppretting av bruker
    static async InsertUser(username, password, name, adress, email, telephone, userlevel) {
        try {
            const sql = neon(process.env.DATABASE_URL);
            await sql.query(`INSERT INTO "Users" ("Username", "Password", "Name", "Adress", "Email", "Telephone", "userLevel") values ($1, $2, $3, $4, $5, $6, $7)`, [username, password, name, adress, email, telephone, userlevel]);
            const result = await sql.query(`SELECT * FROM "Users" WHERE "Username" = $1`, [username])
            return result
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }

    }

    //SQL INSERT for å lage ny parkeringsstasjon
    static async InsertStation(stationName, admin, slots, price, floors, maxSlotsPerFloor) {
        try {
            const sql = neon(process.env.DATABASE_URL);
            await sql.query(`INSERT INTO "ParkingStations" ("StationName", "admin", "slots", "Price", "Floors", "MaxSlotsFloor") values ($1, $2, $3, $4, $5, $6)`, [stationName, admin, slots, price, floors, maxSlotsPerFloor]);
            const stationCreatedData = await sql.query(`SELECT "StationName", "StationNo" FROM "ParkingStations" WHERE "StationName" = $1`, [stationName]);
            return stationCreatedData
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }
    }
    //SQL INSERT for å lage ny parkeringsstasjon
    static async InsertParkingSlot(name, station, stationID) {
        try {
            const sql = neon(process.env.DATABASE_URL);
            const result = await sql.query(`INSERT INTO "ParkingSlots" ("Name", "Station", "StationID") values ($1, $2, $3)`, [name, station, stationID]);
            return result
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }
    }
    //SQL get parkingslots
    static async GetSlots(name, station, stationID) {
        try {
            const sql = neon(process.env.DATABASE_URL);
            const result = await sql.query(`SELECT * FROM "ParkingSlots" WHERE "Name" = $1 and "Station" = $2 and "StationID" = $3`, [name, station, stationID]);
            return result
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }

    }
    //SQL SELECT for å hente bruker fra databasen
    static async GetUserWithUserAndPass(username, password) {
        try {
            const sql = neon(process.env.DATABASE_URL);
            const result = await sql.query(`SELECT "UserID", "userLevel" FROM "Users" WHERE "Username" = $1 and "Password" = $2`, [username, password]);
            return result
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }
    }
    //SQL SELECT for å hente bruker fra databasen
    static async GetUserPassword(username) {
        try {
            const sql = neon(process.env.DATABASE_URL);
            const result = await sql.query(`SELECT "Password" FROM "Users" WHERE "Username" = $1 `, [username]);
            return result
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }
    }
    //SQL SELECT for å hente ut hele raden til brukeren
    static async GetUserFromID(userID) {
        try {
            const sql = neon(process.env.DATABASE_URL);
            const result = await sql.query(`SELECT * FROM "Users" WHERE "UserID" = $1 `, [userID]);
            return result
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }
    }
    //SQL SELECT for å hente ut stasjons administratorer fra databasen
    static async GetStationAdmins() {
        try {
            const sql = neon(process.env.DATABASE_URL);
            const result = await sql.query(`SELECT ("UserID","Name") FROM "Users" WHERE "userLevel" = 5`);
            return result
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }
    }

    //test funksjon for å sjekke kobling til tabell i databasen
    //kan også bli brukt for å hente ut all data fra en tabell
    static async SelectTable(table) {
        try {
            const sql = neon(process.env.DATABASE_URL);
            const result = await sql.query(`SELECT * FROM "${table}"`)
            return result
        } catch (error) {
            console.log('SQL error: ', error);
            return 'error'
        }
    }
}