// import Image from "next/image";
import './style.css'
// import "./globals.css";
import Link from 'next/link';




import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



export default function Home() {
 
  return (
    <main className='container-fluid main bg-black'>
      <div className='text-gray-600 textDiv'> <h1>WE<span className='text-emerald-400'>L</span>COME</h1>
      <div>TO</div>
      <div className='text-2xl w-2/4 font-normal'><span className='text-emerald-400'>V</span>irtual  <span className='text-emerald-400'>M</span>ingle</div>
      <br />
        <Link className='rounded-full bg-emerald-500 p-2 text-gray-800 no-underline' href="./login">Get Start!</Link><br />
      
      </div>
      <div className='imgDiv'></div>
    </main>
  );
}
