import Link from 'next/link.js';
import DefaultButton from '$/DefaultButton'
export default function LoginnClient() { 
    async function ClientLoginn(){
        "use server"
    }
    return (
        <>
            <div className='rounded-lg justify-center items-center bg-cyan-100 w-[30%] h-fit p-5 flex flex-col gap-3.5'>
                <p>Loginn</p>
                <p className='w-4/5 lg:w-3/5  xl:w-2/5' > Username<br/>
                <input className=' p-1 rounded-lg outline-gray-800 outline w-full' id='Username' placeholder='Username' />
                </p>
                <p className='w-4/5 lg:w-3/5  xl:w-2/5'> Password<br/>
                <input className='p-1 rounded-lg outline-gray-800 outline w-full ' id='Password' placeholder='Password'/>
                </p>
                <DefaultButton clickFunction={ClientLoginn} text={'Loginn'}/>
                <p className='bottom-2.5'>Not a user? <Link href={'/register'} className='text-blue-900'> Register one</Link> </p>
            </div>
        </> 
    );
}
