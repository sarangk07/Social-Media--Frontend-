'use client';

import Link from 'next/link';
import React, { useEffect, useState ,useRef} from 'react'

import axios from 'axios';
import toast from 'react-hot-toast';

function Navbar() {
    const[user,setUser]=useState(null)


      useEffect(()=>{
      
        const getUsers = async()=>{
          try{
            const response = await axios.get('https://social-media-5ukj.onrender.com/user/');
            const allUsers = await response.data

            console.log(allUsers,'nav  bar')
          const localEmail = localStorage.getItem('email') ;
          // console.log(localEmail,'localEmail')
          allUsers.map((x)=>{
              // console.log(x.email);
              if(x.email === localEmail){
                console.log('found')
                console.log(x.username)
                setUser(x)
              }
          })
        console.log(user)
          }
          catch{
            toast.error('network error')
          }
          
          
  
          
        }
        getUsers()
      },[])
      const clickPoint = useRef();
      const handleFocus = () => {
          clickPoint.current.style.display = "none";
      };
  
      const handleBlur = () => {
          clickPoint.current.style.display = "block";
      };
  return (
    <div className='flex w-full h-4/5 bg-white items-center p-2'>
      <div className='flex w-2/4 justify-between'>
        <li className='list-none pl-5'><Link href='home'> Home </Link></li>

      </div>
        
    <div className='w-4/6'>
    <div className="items-center px-4 flex justify-center" >
            <div className="relative mr-3">
                <div className="absolute top-3 left-3 items-center" ref={clickPoint}>
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
</svg>
                </div>
                <input
                    type="text"
                    className="block p-2 pl-10 w-70 text-emerald-600 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                    placeholder="Search Here..."
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    </div>
        <div className='flex justify-end w-1/6'>
            {/* {user?<li>{user}</li>:<li>profile</li>} */}
            {user ? <li className='list-none pr-5'><Link href='profile'>{user.username}</Link></li> : <li>profile</li>}
            
        </div>
        
      
    </div>
  )
}

export default Navbar
