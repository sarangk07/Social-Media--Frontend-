'use client';

import Link from 'next/link';
import React, {useRef, useContext} from 'react';
import AppContext from '@/app/context/myContext';
import ToggleButton from './ThemeChanger';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';



function Navbar() {
    
  const {currentUser} = useContext(AppContext)
  const virtualRef = useRef();
  const mingleRef = useRef();


  useGSAP(() => {
    gsap.from(virtualRef.current, { y: -50, opacity: 0, duration: 1 });
    gsap.from(mingleRef.current, { y: 50, opacity: 0, duration: 1 });
  });


  return (
    <div className='flex w-full h-8.5 bg-white items-center p-2   dark:bg-black dark:text-white'>
      <ToggleButton/>
      <div className='flex w-2/6 justify-center pr-0 ml-0'>
        <li className='list-none pl-5'>
          <Link href='home'>
            <div className='flex  font-semibold bg-gray-50 rounded-sm dark:bg-transparent'>
              <div ref={virtualRef}>Virtual</div>
              <div ref={mingleRef} className='ml-2 pl-0.5 pr-0.5 text-white bg-black dark:text-emerald-500 rounded-e-sm'>Mingle</div>
            </div>
          </Link>
        </li>
      </div>
        <div className= 'flex justify-end w-2/6 sm:flex  sm:justify-end md:hidden lg:hidden'>
            {currentUser ? <li className='list-none pr-5'><Link href='profile'>{currentUser.username}</Link></li> : <li className='list-none pr-5'>profile</li>}
        </div>
    </div>
  )
}

export default Navbar
