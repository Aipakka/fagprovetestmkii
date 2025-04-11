"use client"
import DefaultInput from '$/DefaultInput'
import { useState, useEffect } from 'react'
import DefaultButton from '$/DefaultButton'
import { useRouter } from 'next/navigation'

/**komponent som blir sendt til server siden for sikker deling av kode som blir kjørt på server og klient*/
export default function UserClient({ DestroySession, CreateCar }) {
    //file variables
    const router = useRouter();
    //user creation useStates
    const [regNr, setRegNr] = useState('')

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
                return CarDataInterface()
            case 'parkingDataInterface':
                return
        }
    }

    //wrapper funksjon for funksjon sendt fra serversiden slik at den kan bli trigget av en knapp og gi feilmeldinger
    async function CreateNewCar() {
        if (!regNr) {
            setErrormsg('You are missing regNr fields')
        } else {
            let res = await CreateCar(regNr)
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
    //komponenter opprettet for ryddighet i koden

    //komponent for oppretting av biler til bruker
    function CreationInterface() {
        return (<>
            <div className='rounded-lg justify-center items-center  bg-cyan-100 w-[30%] h-fit p-5 flex flex-col gap-3.5'>
                <p>Register new car</p>
                <div className='pb-5 flex flex-col gap-3.5 justify-center items-center w-full'>
                    <DefaultInput text={'Car registration number'} value={regNr} onValueChange={setRegNr} />
                </div>
                <DefaultButton type={'submit'} clickFunction={CreateNewCar} text={'Add car'} />
            </div>

        </>)
    }
    //komponent for listing av brukers biler
    function CarDataInterface() {
        return (<>
            <div className='rounded-lg justify-center items-center  bg-cyan-100 w-[30%] h-fit p-5 flex flex-col gap-3.5'>
                <p>Cars</p>
                <table>
                    <tr><td>hi</td><td>bye</td></tr>
                    <tr>car1</tr>
                    <tr>car2</tr>
                </table>
            </div>

        </>)
    }
}

