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
    <button
      className={`w-32 h-12 flex items-center justify-center rounded-full transition-colors duration-300 dark:bg-gray-700 dark:text-white bg-gray-300 text-black`}
      onClick={handleClick}
      style={{ perspective: '1000px' }} // Added for 3D effect
    >
      <span className="toggle-text text-lg font-bold block backface-hidden">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}

