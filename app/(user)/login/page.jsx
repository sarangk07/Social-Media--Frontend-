'use client';


import Link from 'next/link';
import React, { useState } from 'react'
import './style.css'

import axios from 'axios';
// import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';





function Login() {
  
  const [showPass,setShowPass]=useState(false)
  const [email,setEmail]=useState(null)
  const [password,setPassword]=useState(null)
  const [login,setLogin] = useState(false)

  console.log(email,password)

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
     
      console.log('entered in the  api login')
      const response = await axios.post('https://social-media-5ukj.onrender.com/auth/login',{
        email:email,
        password:password
      });
      console.log(response,'login respons')
      console.log(response.request.status)
      if(response.request.status==true){
        setLogin(true)
      }else{
        setLogin(false)
      }
      toast.success('login success')
    }catch(error){
      toast.error('No user found with the give data!')
      console.log(error,'error')
    } 
    }






  const getPassword = (e)=>{
    setPassword(e.target.value) 
  }
  const getEmail = (e)=>{
    setEmail(e.target.value) 
  }
  const showPassword = ()=>{
    setShowPass(!showPass)
  }
  return (
    <div>
      <div className='mainDivLogin '>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='secondDivLogin'>
      <div className='loginImgDiv'>
        <img  className='loginimg' src="https://i.pinimg.com/originals/04/e1/52/04e1525a0ba8ab8b642ef9a455c175cd.jpg" alt="" />
      </div>
      <div className='FormDivLogin ' >
          
        <form action="" onSubmit={handleSubmit}>
          <div style={{display:'flex',justifyContent:'center'}}>
            <h4 style={{color:'yellow',fontFamily:'-moz-initial', fontSize:50}}> W</h4>
          </div>
          <div className='retangle'/>
          <div className='retangle2'/>
          
          <h2>Login</h2>
          <label htmlFor="">email</label><br />
          <input  className='text-black' type="email" onChange={getEmail}/><br /><br />
          <label htmlFor="">password</label><br />
          <input  className='text-black' onChange={getPassword}  type={showPass ? 'text' : 'password'}/><br/>
          {/* <img className='eyeIcon' src="https://www.svgrepo.com/show/372406/eye-hide-1.svg" width='25px' height='25px' alt=""
          /> */}
          <br />
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showPassword}>{showPass ? 'Hide Password' : 'Show Password'}</a><br />
          {/* <p>error</p> */}
          <br />
          <div className='btnDiv'>
          
           
            <button type='submit' className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'>Login</button>



            <Link href='register' className='btn px-1 py-1 btn-secondary'>New here? create</Link>
          </div>
        </form>
      </div>
      </div>
    </div>
    </div>
    
  )
}

export default Login
