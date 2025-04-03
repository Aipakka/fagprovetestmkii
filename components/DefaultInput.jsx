"use client"
export default function DefaultInput({text, onValueChange = () => {}}) {
    return (<>
        <p className='w-4/5 lg:w-3/5  xl:w-2/5'> {text}<br />
            <input onChange={(e) => onValueChange(e)} className='p-1 rounded-lg bg-amber-50 outline-gray-800 outline w-full ' id={text} placeholder={text} />
        </p>
    </>)
}