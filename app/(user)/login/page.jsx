'use client';

import Link from 'next/link';
import React, { useState, useContext ,useEffect} from 'react';
import AppContext from '@/app/context/myContext'; 
import toast, { Toaster } from 'react-hot-toast';

import { useRouter } from 'next/navigation'; 


function Login() {
    const router = useRouter(); 
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/home');
      }
    }, []);


  const { login, loading } = useContext(AppContext);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    // if(loading){
    //   toast.loading('please wait...')
    // }
  };

  const showPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <div className='flex flex-row justify-center items-center w-full h-fit '>
    <div>
    <Toaster
      position="top-center"
      reverseOrder={false}
    /> 
    </div>
    

  <div className=' bg-black md:bg-gradient-to-r from-[#211C30] to-black p-0 w-full h-screen overflow-hidden flex flex-row justify-center items-center'>
    <div className=' bg-black md:w-2/5 m-0 rounded-custom col-md-6 hidden'>
      <img  className='loginimg' src="https://i.pinimg.com/originals/d3/9a/0d/d39a0daf8440e7c1e985f448497c550b.jpg" alt="" />
    </div>
    
  <div className='  w-4/6 h-screen flex flex-row justify-center items-center md:border-solid  ${backgroundImageClass}  md:items-center md:rounded-3xl' >
      <div className="md:hidden block overflow-hidden bg-zinc-800 z-[0] h-[511px] left-[0px] relative w-screen" />
      <div className="md:hidden block overflow-hidden bg-emerald-700 z-[0] h-[511px] right-[0px] relative top-[15px]  w-screen" />
          
      <div className="hidden md:block md:overflow-hidden md:bg-zinc-800 md:z-[0] md:h-full md:left-[0px] md:ab md:w-screen">
        <img className='h-screen w-full' src="https://i.pinimg.com/originals/5b/63/bb/5b63bb09479d5c514283cda91e06e5f2.jpg" alt="" />
      </div>
      <div className="hidden md:block md:overflow-hidden md:bg-emerald-700 md:z-[0] md:h-full md:right-[0px] md:relative md:w-screen md:ml-28" >
        <img className='h-screen w-full' src="https://i.pinimg.com/originals/3d/b2/31/3db23167e07635ea6f47caa002228603.jpg" alt="" />
      </div>

<form onSubmit={handleSubmit} action="" className= 'font-playfair font-bold absolute md:backdrop-blur-md  md:p-10'>
  <h4 className='flex flex-col items-center font-merriweather text-balance '>Get Start With <span className='text-emerald-300 text-4xl'> VM</span></h4><br />
  <h2 className='text-gray-200'>LogIn</h2><hr /><br />
  <div className='flex '>
    
  <div className='flex flex-col relative w-full'>
        <label htmlFor="email">Email</label><br />
        <input className='text-gray-800 dark:text-white rounded-md -mt-5 relative' type="email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
       
        <label htmlFor="password">Password</label><br />
        <input className='text-gray-800 dark:text-white rounded-md -mt-5' type={showPass ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} /><br />
        <a className="bg-slate-600 hover:bg-slate-700 cursor-pointer text-white font-bold p-1 rounded w-[130px] h-[30px]" onClick={showPassword}>
          {showPass ? 'Hide Password' : 'Show Password'}
        </a><br />
  </div>
  
  </div>  
  <div className='btnDiv'>
  <button type='submit' className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded'>
    {loading ? 'Loading...' : 'Login'}
  </button>
    <Link href='register' className='text-cyan-400 pl-3'>New here? create</Link>  
  </div>
</form>
    

  </div>
  </div>
</div>





  );
}

export default Login;
