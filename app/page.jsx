
import './style.css'
// import Link from 'next/link';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import IntroGSAP from './components/IntroGSAP';

export default function Home() {
 
  return (
    <main className='flex absolute items-center md:top-0 justify-center bg-black w-full h-screen'>
      {/* <div className='font-mono text-gray-600 bg-black flex flex-col items-center justify-center md:w-2/4'> <h1>WE<span className='text-emerald-400'>L</span>COME</h1>
      <div>TO</div>
      <div className='text-2xl w-2/4 items-center flex justify-center font-normal'><span className='text-emerald-400'>V</span>irtual  <span className='text-emerald-400'>M</span>ingle</div>
      <br />
      </div> */}
      <IntroGSAP/>
      <br />
      <div 
        className="relative h-full hidden md:w-2/4 md:flex bg-no-repeat" 
        style={{ 
          backgroundImage: "url('https://i.pinimg.com/564x/c6/24/66/c6246602e5babd535634488f03d07a71.jpg')", 
          backgroundPosition: '50%' 
        }}>
      </div>

    </main>
  );
}
