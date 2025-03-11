
import './style.css'
import IntroGSAP from './components/IntroGSAP';

export default function Home() {
 
  return (
    <main className='flex absolute items-center md:top-0 justify-center  bg-gradient-to-tr from-black to-cyan-500 w-full h-screen'>
      <IntroGSAP/>
      <br />
      <div 
        className="relative h-full hidden w-0 md:w-2/4 md:flex bg-no-repeat" 
        style={{
          backgroundImage: 'url(/meadias.png)', 
          backgroundPosition: '50%' ,
          backgroundSize: 'cover',
          backgroundSize: '80%',
        }}>
      </div>
    </main>
  );
}
