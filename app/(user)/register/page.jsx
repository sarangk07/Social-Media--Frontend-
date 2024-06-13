'use client';

import Link from 'next/link';
import React, { useRef, useState } from 'react'
import axios from 'axios';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';





const validationSchema = Yup.object({
  name: Yup.string()
    .required('Please enter your name')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address'),
  password: Yup.string()
    .required('Please enter a password')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});



function Register() {
const[token,setToken]=useState(null);

console.log('resgisterrrrrr.........')
const handleSubmit = async (values, { resetForm }) => {
      try{
          const { name, email, password } = values; 
          const response = await axios.post('https://social-media-5ukj.onrender.com/auth/register/', {
          email:email, 
          password:password, 
          username:name
        });
          console.log('fetch',values)
          console.log('response stauts',response.status);
          setToken(response.token);
          toast.success("Account Created!")
          resetForm();

        }catch(error){
          console.log(error,'fetch error')
          if(error.response.status==409){
            toast.error("Bad Request. User Already Exist!")
          }
          else{
            toast.error("Error Accured!")
          }
        }
  }

  console.log('token',token)
  const backgroundImageClass = 'md:bg-[url("/path/to/image.jpg")]';

  return (

    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit} 
    >

      {(formik) => (
      <div className='flex flex-row justify-center items-center w-full h-fit'>
        <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        /> 
        </div>
        

      <div className=' bg-black p-0 w-full h-screen overflow-hidden flex flex-row justify-center items-center rounded-2xl'>
        <div className=' bg-black md:w-2/5 m-0 rounded-custom col-md-6 hidden'>
          <img  className='loginimg' src="https://i.pinimg.com/originals/d3/9a/0d/d39a0daf8440e7c1e985f448497c550b.jpg" alt="" />
        </div>
        
      <div className='w-4/6 h-screen flex flex-row justify-center items-center md:border-solid  ${backgroundImageClass}  md:items-center md:rounded-3xl' >
          <div className="md:hidden block overflow-hidden bg-zinc-800 z-[0] h-[511px] left-[0px] relative w-screen" />
          <div className="md:hidden block overflow-hidden bg-emerald-700 z-[0] h-[511px] right-[0px] relative top-[15px]  w-screen" />
              
          <div className="hidden md:block md:overflow-hidden md:bg-zinc-800 md:z-[0] md:h-full md:left-[0px] md:ab md:w-screen">
            <img className='h-screen w-full' src="https://i.pinimg.com/originals/e2/8b/b3/e28bb300ce6b70e265e8160a53e496cf.png" alt="" />
          </div>
          <div className="hidden md:block md:overflow-hidden md:bg-emerald-700 md:z-[0] md:h-full md:right-[0px] md:relative md:w-screen md:ml-28" >
            <img className='h-screen w-full' src="https://i.pinimg.com/originals/c6/2b/10/c62b1000c5ab646e693b5808e9d41335.jpg" alt="" />
          </div>





  
    <Form action="" className= 'font-mono font-bold absolute md:backdrop-blur-md  md:p-10'>
      <h4 className='flex flex-col items-center font-serif text-balance'>Get Start With <span className='text-emerald-300 text-4xl'> VM</span></h4><br />
      <h2 className='text-gray-200'>Create</h2><hr /><br />
      <div className='flex '>

      <div>
            <label htmlFor="name">Name</label><br />
            <Field className='w-36 h-fit rounded-lg text-white mr-2' type="text" id="name" name="name"  required/><br />
            <ErrorMessage name="name" component="div" className="error text-xs" /><br />
      </div>
                
      <div>
            <label htmlFor="email">Email</label><br />
            <Field className='text-white  rounded-lg w-36 h-fit' type="email" id="email" name="email"   required/><br />
            <ErrorMessage name="email" component="div" className="error text-xs" /><br />
      </div>
      </div>  
      <label htmlFor="password">Password</label><br />
      <Field className='text-emerald-400  rounded-lg w-full' type="password" id="password" name="password"    required/><br />
      <ErrorMessage name="password" component="div" className="error text-xs" /><br />

      <label htmlFor="confirmPassword">Confirm Password</label><br />
      <Field className='text-emerald-400  rounded-lg w-full' type="password" id="confirmPassword" name="confirmPassword"  required/><br />
      <ErrorMessage name="confirmPassword" component="div" className="error text-xs" /><br />

      <div className='btnDiv'>
        <button type='submit' disabled={!formik.isValid || formik.isSubmitting} className='px-4 py-2 font-bold text-white bg-emerald-500 rounded hover:bg-emerald-600-600'>Create</button><Link href='login' className='px-1 py-1 btn btn-secondary'>Have account?<span className='text-lg'> login</span></Link>
      </div>
    </Form>
        

      </div>
      </div>
    </div>
      )}
    </Formik>
   
  )
}

export default Register


