'use client'

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';



export default function ToggleButton() {
  const [darkMode, setDarkMode] = useState(false);



  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if(theme === "dark") setDarkMode(true)
  },[])

  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add('dark')
      localStorage.setItem("theme", "dark")
    }else{
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme", "light")
    }
  },[darkMode])

  const handleClick = () => {
    setDarkMode(prevMode => !prevMode);
    gsap.to('.toggle-text', {
      duration: 0.5,
      rotationX: 180,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.set('.toggle-text', { rotationX: 0 });
      }
    });
  };

  return (
    
      <>
        {darkMode ? (
          <button
          className={`w-16 h-6 flex items-center justify-start rounded-full text-zinc-900 bg-white `}
          onClick={handleClick}
          style={{ perspective: '1000px' }}
        >
          <div className='w-5 h-5 rounded-full  ml-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          </div>
        </button>
        
        ) : (
          <button
          className={`w-16 h-6 flex items-center justify-end rounded-full  text-white bg-zinc-900`}
          onClick={handleClick}
          style={{ perspective: '1000px' }}
        >
         <div className='w-5 h-5 rounded-full mr-1'>
         
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-yellow-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>

        </div >
        </button>
        )}
      </>
    
  );
}

