"use client"
export default function DefaultButton({active, clickFunction, text, type}){
    return(<>
    <button type={type} className={`${active ? 'bg-amber-200 ': ''}cursor-pointer p-1 h-8 bg-amber-50 hover:bg-amber-300 w-30 rounded-lg hover:outline-white outline-gray-800 outline`} onClick={() => clickFunction()} > {text}</button>
    </>)
}