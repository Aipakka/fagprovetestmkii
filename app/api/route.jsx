import SQL from '../../lib/sql';

//forventet body
// {
// "type": "start"|"end"
// "station": "",
// "slot": "",
// "car": "",
// "user": ""
// }
//API for å registrere når kjøretøy parkerer  og drar fra parkeringsplassen
export async function POST(request) {
    try {
        const requestBody = await request.json();
        const type = requestBody.type
        const station = requestBody.station
        const slot = requestBody.slot
        const car = requestBody.car
        const user = requestBody.user
        // const dateTime = new Date();
        const dateTime = new Date();
        if (type === 'start') {
            await SQL.StartParking(car, dateTime.toLocaleDateString(), dateTime.toLocaleTimeString(), station, slot, user);
            return Response.json({ parking: 'started' });
        } else if (type === 'end') {
            await SQL.EndParking(car, dateTime.toLocaleDateString(), dateTime.toLocaleTimeString(), station, slot, user);
            return Response.json({ parking: 'ended' });
        } else
            Error('invalid type')

    } catch (error) {
        return Response.json({ error: error })
    }
}
export async function GET(request) {
    return (Response.json({ status: 'ok' }))
}