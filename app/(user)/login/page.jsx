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
      <div className='mainDivLogin'>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='secondDivLogin'>
          <div className='loginImgDiv'>
            <img className='loginimg' src="https://i.pinimg.com/originals/04/e1/52/04e1525a0ba8ab8b642ef9a455c175cd.jpg" alt="" />
          </div>
          <div className='FormDivLogin'>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h4 className='font-mono text-5xl text-emerald-500'>VM</h4>
              </div>
              <div className='retangle' />
              <div className='retangle2' />
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
