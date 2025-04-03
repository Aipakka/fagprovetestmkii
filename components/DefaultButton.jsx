"use client"
export default function DefaultButton({clickFunction, text}){
    return(<>
    <button className='cursor-pointer p-1 h-8 bg-amber-50 w-30 rounded-lg outline-gray-800 outline' onClick={() => clickFunction()} > {text}</button>
    </>)
}