'use client';

import Link from 'next/link';
import React, { useState, useContext ,useEffect} from 'react';
import './style.css';
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
    <div>
      <div className='flex justify-center font-mono items-center w-full h-screen mainDivLogin'>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='secondDivLogin bg-zinc-900 p-2 w-full h-[80vh] overflow-hidden flex flex-row justify-center items-center rounded-md'>
          <div className='loginImgDiv bg-zinc-900 w-[40%] m-0'>
            <img className='loginimg w-full h-[80vh] m-0 ' src="https://i.pinimg.com/originals/04/e1/52/04e1525a0ba8ab8b642ef9a455c175cd.jpg" alt="" />
          </div>
          <div className='FormDivLogin w-[60%] h-[80vh] flex flex-row justify-center items-center'>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h4 className='font-mono text-5xl text-emerald-500'>VM</h4>
              </div>
              <div className="md:hidden block bg-[#2f2f30] z-[-1] h-[611px] left-[85px] absolute top-[75px] -rotate-30 w-[711px]" />

              <div className='block bg-[#2f2f30] top-[-565px] overflow-visible z-[-1] h-[611px] w-[411px] left-[-415px] transform -rotate-30 absolute md:hidden' />

              <h2>Login</h2>
              <label htmlFor="">email</label><br />
              <input className='text-black' type="email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
              <label htmlFor="">password</label><br />
              <input className='text-black' type={showPass ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} /><br />
              <br />
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showPassword}>
                {showPass ? 'Hide Password' : 'Show Password'}
              </a><br /><br />
              <div className='btnDiv'>
                <button type='submit' className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded'>
                  {loading ? 'Loading...' : 'Login'}
                </button>
                <Link href='register' className='text-cyan-400'>New here? create</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
