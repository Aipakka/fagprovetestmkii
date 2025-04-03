import  { Metadata } from "next";
import "./globals.css";


export const metadata = {
  title: "SkyttelPARK AS parkering",
  description: "SkyttelPARK AS parkering",
};

export default function RootLayout({children,}) {
  return (
    <html lang="en">
      <body className='overflow-x-hidden flex justify-center items-center  w-[100dvw] h-[100dvh] bg-gray-400 '>
        {children}
      </body>
    </html>
  );
}
