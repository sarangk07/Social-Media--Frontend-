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
          className={`w-16 h-6 flex items-center justify-center rounded-full text-zinc-900 bg-white `}
          onClick={handleClick}
          style={{ perspective: '1000px' }}
        >L</button>
        
        ) : (
          <button
          className={`w-16 h-6 flex items-center justify-center rounded-full  text-white bg-zinc-900`}
          onClick={handleClick}
          style={{ perspective: '1000px' }}
        >D</button>
        )}
      </>
    
  );
}

