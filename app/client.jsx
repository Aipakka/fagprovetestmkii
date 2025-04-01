import DefaultButton from '../components/DefaultButton.jsx'
export default function LoginnClient() { 
    async function ClientLoginn(){
    }
    return (
        <div className='flex justify-center items-center  w-[100dvw] h-[100dvh]' >
            <div className='rounded-lg justify-center items-center bg-cyan-100 w-2/5 h-2/5 flex flex-col gap-3.5'>
                <p>Loginn</p>
                <p > Username<br/>
                <input className=' p-1 rounded-lg outline-gray-800 outline w-md' id='Username' placeholder='Username' />
                </p>
                <p> Password<br/>
                <input className='p-1 rounded-lg outline-gray-800 outline w-md' id='Password' placeholder='Password'/>
                </p>
                <DefaultButton clickFunction={ClientLoginn} text={'Loginn'}/>
            </div>
        </div> 
    );
}
