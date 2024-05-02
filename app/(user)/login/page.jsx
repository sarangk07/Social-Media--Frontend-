'use client';


import Link from 'next/link';
import React, { useState } from 'react'
import './style.css'

function Login() {
  
  const [showPass,setShowPass]=useState(false)

  const getPassword = (e)=>{
    let password= e.target.value
    
    console.log(password)
  }
  const showPassword = ()=>{
    setShowPass(!showPass)
  }
  return (
    <div>
      <div className='mainDivLogin '>
      <div className='secondDivLogin'>
      <div className='loginImgDiv'>
        <img  className='loginimg' src="https://i.pinimg.com/originals/04/e1/52/04e1525a0ba8ab8b642ef9a455c175cd.jpg" alt="" />
      </div>
      <div className='FormDivLogin ' >
          
        <form action="">
          <div style={{display:'flex',justifyContent:'center'}}>
            <h4 style={{color:'yellow',fontFamily:'-moz-initial', fontSize:50}}> W</h4>
          </div>
          <div className='retangle'/>
          <div className='retangle2'/>
          
          <h2>Login</h2>
          <label htmlFor="">email</label><br />
          <input  className='text-black' type="email" /><br /><br />
          <label htmlFor="">password</label><br />
          <input  className='text-black' onChange={getPassword}  type={showPass ? 'text' : 'password'}/><br/>
          {/* <img className='eyeIcon' src="https://www.svgrepo.com/show/372406/eye-hide-1.svg" width='25px' height='25px' alt=""
          /> */}
          <br />
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showPassword}>{showPass ? 'Hide Password' : 'Show Password'}</a><br />
          {/* <p>error</p> */}
          <br />
          <div className='btnDiv'>
          
            
            <a className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'>Login</a><Link href='register' className='btn px-1 py-1 btn-secondary'>New here? create</Link>
          </div>
        </form>
      </div>
      </div>
    </div>
    </div>
    
  )
}

export default Login
