"use client"
import Link from 'next/link.js';
import DefaultButton from '$/DefaultButton.jsx';
export default function RegisterClient({serverRegister}){
    async function ClientLoginn(){
        let res = await serverRegister()
    }
    return(
        <>
        <div className='rounded-lg justify-center items-center bg-cyan-100 w-[30%] h-fit p-5 flex flex-col gap-3.5'>
            <p>Register new user</p>
            <div className='pb-5 flex flex-col gap-3.5 justify-center items-center w-full'>
            <p className='w-4/5 lg:w-3/5  xl:w-2/5' > Username<br/>
            <input className=' p-1 rounded-lg outline-gray-800 outline w-full' id='Username' placeholder='Username' />
            </p>
            <p className='w-4/5 lg:w-3/5  xl:w-2/5' > Name<br/>
            <input className=' p-1 rounded-lg outline-gray-800 outline w-full' id='Username' placeholder='Username' />
            </p>
            <p className='w-4/5 lg:w-3/5  xl:w-2/5'> Email<br/>
            <input className='p-1 rounded-lg outline-gray-800 outline w-full ' id='email' placeholder='Password'/>
            </p>
            <p className='w-4/5 lg:w-3/5  xl:w-2/5'> Telephone<br/>
            <input className='p-1 rounded-lg outline-gray-800 outline w-full ' id='telephone' placeholder='Password'/>
            </p>
            <p className='w-4/5 lg:w-3/5  xl:w-2/5'> Password<br/>
            <input className='p-1 rounded-lg outline-gray-800 outline w-full ' id='Password' placeholder='Password'/>
            </p>
            <p className='w-4/5 lg:w-3/5  xl:w-2/5'> Confirm password<br/>
            <input className='p-1 rounded-lg outline-gray-800 outline w-full ' id='confirmPassword' placeholder='Password'/>
            </p>
            </div>
            <DefaultButton clickFunction={ClientLoginn} text={'Loginn'}/>
            <p className='bottom-2.5'>Already a user? <Link href={'/'} className='text-blue-900'> loginn</Link> </p>
        </div>
    </> 
    )
}