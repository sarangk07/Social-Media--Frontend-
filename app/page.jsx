// import Image from "next/image";
import './style.css'
// import "./globals.css";
import Link from 'next/link';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



export default function Home() {
  return (
    <main className='container-fluid main bg-black'>
      <div className='text-blue textDiv'> <h1>WE<span style={{color:'yellow'}}>L</span>COME</h1>
      <br />
        <Link className='btn btn-warning' href="./login">Get Start!</Link><br />
      
      </div>
      <div className='imgDiv'></div>
    </main>
  );
}
