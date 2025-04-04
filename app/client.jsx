"use client"

import Link from 'next/link.js';
import DefaultInput from '$/DefaultInput'
import DefaultButton from '$/DefaultButton'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
export default function LoginnClient({ VerifyLoginn, redirect }) {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function ClientLoginn() {
        const res = await VerifyLoginn(username, password)
        if (res === 'sqlErr' || res === 'sesionErr')
            alert('error')
        router.push(`/${res}`)
    }
    useEffect(() => {
        if (redirect != undefined) {
            console.log(redirect)
            router.push(redirect);
        }

    }, [])

    return (
        <>
            <div className='rounded-lg justify-center items-center bg-cyan-100 w-[30%] h-fit p-5 flex flex-col gap-7'>
                <div className='flex flex-col  w-full items-center justify-center gap-3.5'>
                    <p>Loginn</p>

                    <DefaultInput text={'Username'} value={username} onValueChange={setUsername} type={'text'} />
                    <DefaultInput text={'Password'} value={password} onValueChange={setPassword} type={'password'} />
                </div>
                <DefaultButton clickFunction={ClientLoginn} text={'Loginn'} />
            </div>
        </>
    );
}
