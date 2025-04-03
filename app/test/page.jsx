import { neon } from '@neondatabase/serverless';
export default async function testing(){
    const sql = neon(process.env.DATABASE_URL);
    const res = await sql.query(`SELECT "StationName", "StationNo" FROM "ParkingStations" WHERE "StationName" = 'Test'`)
    console.log('test: ', res)
    return(<>{res.toString()}</>)
}