"use client"
import Link from 'next/link'
import DefaultInput from '$/DefaultInput'
import { useState } from 'react'
import DefaultButton from '$/DefaultButton'
export default function AdminClient({ adminList, CreateUser }) {
    //user creation useStates
    const [username, setUsername] = useState('')
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [userlevel, setUserlevel] = useState(1)
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    //station creation useStates
    const [stationName, setstationName] = useState('')
    const [stationAdmin, setstationAdmin] = useState('')

    //admin interface useStates
    const [stage, setStage] = useState('CreationInterface')
    switch (stage) {
        case 'CreationInterface':

            break;

        default:
            break;
    }
    function ExitAdminInterface() {

    }
    return (<>
        <div className='flex flex-col  w-full h-full gap-10'>
            <div id='admHeader' className='h-[50px] items-center gap-64 justify-center  bg-cyan-100 opacity-50 flex flex-row'>
                <DefaultButton clickFunction={() => setStage('CreationInterface')} text={'Creation'} />
                <DefaultButton clickFunction={() => setStage('userDataInterface')} text={'User data'} />
                <DefaultButton clickFunction={() => setStage('carDataInterface')} text={'Cars'} />
                <DefaultButton clickFunction={() => setStage('parkingDataInterface')} text={'Parkings'} />
                <DefaultButton clickFunction={() => ExitAdminInterface} text={'Exit admin'} />
            </div>
            <div className='flex flex-row w-full justify-center gap-10'>
                <div className='rounded-lg justify-center items-center bg-cyan-100 w-[30%] h-fit p-5 flex flex-col gap-3.5'>
                    <p>Register new station</p>
                    <div className='pb-5 flex flex-col gap-3.5 justify-center items-center w-full'>
                        <DefaultInput text={'Station name'} onValueChange={setUsername} />
                        <DefaultInput text={'Parking slots'} onValueChange={setName} />
                        <DefaultInput text={'Floors'} onValueChange={setEmail} />
                        <DefaultInput text={'Max slots per floor'} onValueChange={setTelephone} />
                        <p className='w-4/5 lg:w-3/5  xl:w-2/5'>Station admin<br />
                            <select className='bg-amber-50 p-1 rounded-lg outline-gray-800 outline w-full ' >
                                {adminList.map((admin) => <option key={admin.UserID} className='bg-amber-50' onClick={() => setstationAdmin(admin.UserID)}>{admin.Name}</option>)}
                            </select>
                        </p>
                    </div>
                    <DefaultButton text={'Create station'} />
                </div>
                <div className='rounded-lg justify-center items-center bg-cyan-100 w-[30%] h-fit p-5 flex flex-col gap-3.5'>
                    <p>Register new user</p>
                    <div className='pb-5 flex flex-col gap-3.5 justify-center items-center w-full'>
                        <DefaultInput text={'Username'} onValueChange={setUsername} />
                        <DefaultInput text={'Name'} onValueChange={setName} />
                        <DefaultInput text={'Email'} onValueChange={setEmail} />
                        <DefaultInput text={'Telephone'} onValueChange={setTelephone} />
                        <p className='w-4/5 lg:w-3/5  xl:w-2/5'>User rights<br />
                            <select className='bg-amber-50 p-1 rounded-lg outline-gray-800 outline w-full ' >
                                <option key={'userLevel'} className='bg-amber-50' onClick={() => setUserlevel(1)}>1 (normal user)</option>
                                <option key={'stationAdmin'} onClick={() => setUserlevel(5)}>5 (station admin)</option>
                                <option key={'superAdmin'} onClick={() => setUserlevel(10)}>10 (super admin)</option>
                            </select>
                        </p>
                        <DefaultInput text={'Password'} onValueChange={setPassword} />
                        <DefaultInput text={'Confirm password'} onValueChange={setCPassword} />
                    </div>
                    <DefaultButton text={'Create user'} />
                </div>
            </div>
        </div>

    </>)
}