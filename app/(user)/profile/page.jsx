'use client'

import React from 'react'
import { useEffect,useState } from 'react';

function  Profile() {
    const[user,setUser]=useState(null)

    useEffect(()=>{
        const getUsers = async()=>{
          const response = await fetch('https://social-media-5ukj.onrender.com/user/');
          const allUsers = await response.json();
          console.log(allUsers,'nav  bar')
          const localEmail = localStorage.getItem('email') ;
          
          allUsers.map((x)=>{
              
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
  return (
    <div>
      profile
      {user?<div>
        <h1>{user.username}</h1>
        <h3>{user.email}</h3>
        <p>{user.followers}</p>
      </div>:<div>not found</div>}
    </div>
  )
}

export default Profile
