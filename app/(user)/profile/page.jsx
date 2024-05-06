'use client'

import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';

function  Profile() {
    const[user,setUser]=useState(null)

    useEffect(()=>{
        const getUsers = async()=>{
          const response = await axios.get('https://social-media-5ukj.onrender.com/user/');
          console.log(response);
          const allUsers = await response.data
          console.log(response.data);
          console.log(allUsers,'nav  bar')
          const localEmail = localStorage.getItem('email') ;
          
          allUsers.map((x)=>{
              
              if(x.email === localEmail){
                console.log('found')
                console.log(x.username)
                setUser(x)
                localStorage.setItem('id',x._id)
              }
          })
        console.log(user)
  
          
        }
        getUsers()
      },[])
  return (
    <div className='flex flex-col w-screen h-screen bg-[#D9D9D9] '>
      <div className='flex flex-col h-2/6  items-center'>
        <div className='w-screen h-2/4 object-cover'>
            <img className='sm:rounded-b-md relative h-full w-full lg:rounded-b-full' src="https://www.dndspeak.com/wp-content/uploads/2021/04/Temple-1-768x512.jpg" alt="" />
        </div>
        <div className='bg-[#FFFFFF] h-2/4 flex flex-col w-4/5 rounded-b-3xl'>
            <div className='pl-1'>
              <img  src=" https://i.pinimg.com/564x/58/bc/a3/58bca38c4d21f72acb56ff32c99831fb.jpg" alt="profilePic" className='rounded-full border-white border-4 w-28 h-28 absolute top-16'/>
              </div>
            <div className='flex justify-between'>
            {user?<>
                <div className='flex justify-evenly w-1/3 top-5'>
                    
                    <div>
                    <h5>{user.username}</h5>
                    <p>{user.email}</p>
                    </div>
                    <div className='rounded-md bg-emerald-800 w-11 h-10 text-white cursor-pointer flex items-center justify-center hover:bg-emerald-700'>edit</div>
                    
                </div>
                
                
                <div >
                    <p>followers: {user.followers.length}</p>
                    <p>following: {user.following.length}</p>
                </div>
                </>:<div></div>}
            </div>

        </div>
    </div>
    <div className=' flex justify-around h-4/6 w-screen bg-[#D9D9D9]'>
      <div className='md:flex w-2/5 md:justify-center bg-[#FFFFFF] m-3 rounded-2xl sm:hidden '>messages</div>
      <div className='w-3/5 text-center bg-[#FFFFFF] m-3 rounded-2xl sm:w-4/5'>
      <div className='flex justify-evenly '>
        <h3 className='active: text-orange-600' >follower</h3>
        <h3 className='active: text-orange-600'>my
        
        </h3>
      </div>
      <div></div>
      </div>
    </div>



      
    </div>
  )
}

export default Profile
