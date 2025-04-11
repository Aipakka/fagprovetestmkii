import  { Metadata } from "next";
import "./globals.css";

//metadata for nettsiden
export const metadata = {
  title: "SkyttelPARK AS parkering",
  description: "SkyttelPARK AS parkering",
};


//layout som blir brukt hvor hver side under denne
//alt som blir generert under vil inneholde dette
//det som blir generert under er innholdet som kommer i "children" variabelen
export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className='overflow-x-hidden flex justify-center items-center  w-[100dvw] h-[100dvh] bg-gray-400 '>
        {children}
      </body>
    </html>
  );
}
