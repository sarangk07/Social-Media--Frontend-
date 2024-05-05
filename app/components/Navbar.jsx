'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import './navStyle.css'
import axios from 'axios';

function Navbar() {
    const[user,setUser]=useState(null)

    useEffect(()=>{
      const getUsers = async()=>{
        const response = await fetch('https://social-media-5ukj.onrender.com/user/');
        const allUsers = await response.json();
        // console.log(allUsers,'nav  bar')
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
      getUsers()
    },[])




    const logOut = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
  return (
    <div className='main'>
      <div className='leftDiv'>
        <li><Link href='home'> Home </Link></li>
        <li>Messages</li>
        <li> <Link href='/' onClick={logOut}>
            logout
          </Link> </li>

      </div>
        
    <div className='searchDiv'>
      <li>Search</li>
    </div>
        <div className='rightDiv'>
            {/* {user?<li>{user}</li>:<li>profile</li>} */}
            {user ? <li><Link href='profile'>{user.username}</Link></li> : <li>profile</li>}
            
        </div>
        
      
    </div>
  )
}

export default Navbar
