import  { Metadata } from "next";
import "./globals.css";


export const metadata = {
  title: "SkyttelPARK AS parkering",
  description: "SkyttelPARK AS parkering",
};

export default function RootLayout({children,}) {
  return (
    <html lang="en">
      <body className='bg-gray-400'>
        {children}
      </body>
    </html>
  );
}
