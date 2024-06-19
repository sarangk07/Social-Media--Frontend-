'use client';

import { useContext, useEffect, useState,useRef } from 'react';
import AppContext from '@/app/context/myContext';
import Link from 'next/link';
import FollowButton from '../components/followUnfollowBTN';

import { gsap } from 'gsap';




function UserList() {

    const recommendedUsersRef = useRef([]);
    const { data,currentUser} = useContext(AppContext);
  
  
  
    //GSAP Animation----------------
    useEffect(() => {
      if (data.lusers) {
        gsap.to(recommendedUsersRef.current, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power1.out',
        });
      }
    },[data.lusers]);

  return (
    <>
    <div className='md:flex md:flex-col hidden h-fit w-1/4 mt-3 mr-3 p-3 rounded-3xl bg-white text-center sm:hidden  dark:bg-black dark:text-white'>
    
      <>
        <p>Suggestions</p>
        {data?.lusers ? (
          <>
            {data.lusers.filter((x) => x._id !== currentUser._id).map((x, index) => (
              <div
                className="flex w-full m-1 justify-between items-center md:justify-around bg-emerald-50 rounded-lg p-4 dark:bg-zinc-900"
                key={x._id}
                ref={(el) => (recommendedUsersRef.current[index] = el)}
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                <div className="w-1/3">
                  <Link href={`/userProfileView/${x._id}`}>
                    <div className="w-12 h-12 lg:flex md:hidden rounded-full bg-emerald-500 flex items-center justify-center">
                      <span className="text-gray-700 text-xl font-bold">
                        {x.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Link>
                </div>
                <p className="w-2/5 overflow-hidden md:flex">{x.username}</p>
                <FollowButton userId={x._id} currentUser={currentUser} />
              </div>
            ))}
          </>
        ) : (
          <div className="flex animate-pulse">Loading.....</div>
        )}
     </>
    
    </div>
    </>
  )
}

export default UserList
