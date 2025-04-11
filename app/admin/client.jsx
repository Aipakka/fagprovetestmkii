"use client"
import Link from 'next/link'
import DefaultInput from '$/DefaultInput'
import { useState, useEffect } from 'react'
import DefaultButton from '$/DefaultButton'
import { useRouter } from 'next/navigation'

//komponent som blir sendt til server siden for sikker deling av kode som blir kjørt på server og klient
export default function AdminClient({ DestroySession, adminList, CreateUser, CreateStation }) {
    //file variables
    const router = useRouter();
    //user creation useStates
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [adress, setAdress] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [userlevel, setUserlevel] = useState(1)
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    //station creation useStates
    const [stationName, setStationName] = useState('')
    const [stationSlots, setStationSlots] = useState(0)
    const [stationPrice, setStationPrice] = useState(0)
    const [stationFloors, setStationFloors] = useState(1)
    const [stationMaxslotsFloor, setStationMaxSlotsFloor] = useState(0)
    const [stationAdmin, setStationAdmin] = useState('')


    //admin interface useStates
    const [errormsg, setErrormsg] = useState('')
    const [sucessMsg, setSucessmsg] = useState('')
    const [stage, setStage] = useState('CreationInterface')

    //setter hvilken fane sitt innhold som brukeren ser
    function swapStage() {
        switch (stage) {
            case 'CreationInterface':
                return CreationInterface()
            case 'userDataInterface':
                return
            case 'carDataInterface':
                return
            case 'parkingDataInterface':
                return
        }
    }

    //logger bruker ut av system
    async function ExitInterface() {
        let res = await DestroySession();
        if (res === 'success')
            router.replace('/')
    }

    //useEffects, kode som blir kjørt når en variabel blir oppdatert
    // fjerner varslinger for success og error, etter satt tid
    useEffect(() => { setTimeout(() => setErrormsg(''), 30000); }, [errormsg])
    useEffect(() => { setTimeout(() => setSucessmsg(''), 30000); }, [sucessMsg])

    //innhold for siden
    return (<>
        {/* Add back to test vaues in */}
        {/* <div className='absolute top-0 left-0 flex flex-col'>{stage} </div> */}
        <div className='absolute right-0 bottom-0 text-red-600'>
            {errormsg}
        </div>
        <div className='absolute right-0 bottom-0 text-green-600'>
            {sucessMsg}
        </div>
        <div className='flex flex-col  w-full h-full gap-10'>
            <div id='admHeader' className='h-[50px] items-center gap-[10%] justify-center  bg-cyan-100 opacity-50 flex flex-row'>
                <DefaultButton active={stage === 'CreationInterface' ? true : false} clickFunction={() => setStage('CreationInterface')} text={'Creation'} />
                <DefaultButton active={stage === 'userDataInterface' ? true : false} clickFunction={() => setStage('userDataInterface')} text={'User data'} />
                <DefaultButton active={stage === 'carDataInterface' ? true : false} clickFunction={() => setStage('carDataInterface')} text={'Cars'} />
                <DefaultButton active={stage === 'parkingDataInterface' ? true : false} clickFunction={() => setStage('parkingDataInterface')} text={'Parkings'} />
                <DefaultButton clickFunction={() => ExitInterface()} text={'Logg ut'} />
            </div>
            <div className='flex flex-col lg:flex-row w-full max-lg:items-center justify-center gap-10'>
                {swapStage()}
            </div>
        </div>

    </>)
    function CreationInterface() {
        return (<>
             <div className='rounded-lg justify-center items-center  bg-cyan-100 w-[30%] h-fit p-5 flex flex-col gap-3.5'>
                <p>Register new station</p>
                <div className='pb-5 flex flex-col gap-3.5 justify-center items-center w-full'>
                    <DefaultInput text={'Station name'} value={stationName} onValueChange={setStationName} />
                    <DefaultInput type={'number'} value={stationSlots} text={'Parking slots'} onValueChange={setStationSlots} />
                    <DefaultInput type={'number'} value={stationPrice} text={'Price'} onValueChange={setStationPrice} />
                    <DefaultInput type={'number'} value={stationFloors} text={'Floors'} onValueChange={setStationFloors} />
                    <DefaultInput type={'number'} value={stationMaxslotsFloor} text={'Max slots per floor'} onValueChange={setStationMaxSlotsFloor} />
                    <p className='w-4/5 lg:w-3/5  xl:w-2/5'>Station admin<br />
                        <select className='bg-amber-50 p-1 rounded-lg outline-gray-800 outline w-full ' >
                            {adminList.map((admin) => <option key={admin.UserID} className='bg-amber-50' onClick={() => setStationAdmin(admin.UserID)}>{admin.Name}</option>)}
                        </select>
                    </p>
                </div>
                <DefaultButton type={'submit'} clickFunction={CreateNewStation} text={'Create station'} />
            </div>
            <div className='rounded-lg justify-center items-center bg-cyan-100 w-[30%] h-fit p-5 flex flex-col gap-3.5'>
                <p>Register new user</p>
                <div className='pb-5 flex flex-col gap-3.5 justify-center items-center w-full'>
                    <DefaultInput value={username} text={'Username'} onValueChange={setUsername} />
                    <DefaultInput value={name} text={'Name'} onValueChange={setName} />
                    <DefaultInput value={adress} text={'Adress'} onValueChange={setAdress} />
                    <DefaultInput value={email} text={'Email'} onValueChange={setEmail} />
                    <DefaultInput value={telephone} text={'Telephone'} onValueChange={setTelephone} />
                    <p className='w-4/5 lg:w-3/5  xl:w-2/5'>User rights<br />
                        <select className='bg-amber-50 p-1 rounded-lg outline-gray-800 outline w-full ' >
                            <option key={'userLevel'} className='bg-amber-50' onClick={() => setUserlevel(1)}>1 (normal user)</option>
                            <option key={'stationAdmin'} onClick={() => setUserlevel(5)}>5 (station admin)</option>
                            <option key={'superAdmin'} onClick={() => setUserlevel(10)}>10 (super admin)</option>
                        </select>
                    </p>
                    <DefaultInput value={password} text={'Password'} onValueChange={setPassword} />
                    <DefaultInput value={cpassword} text={'Confirm password'} onValueChange={setCPassword} />
                </div>
                <DefaultButton type={'submit'} clickFunction={CreateNewUser} text={'Create user'} />
            </div>
        </>)
    }
}

