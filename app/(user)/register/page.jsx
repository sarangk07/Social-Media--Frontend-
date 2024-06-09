'use client';

import Link from 'next/link';
import './style.css'
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
    .required('Please enter your email address'),
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
      <div className='mainDivLogin flex flex-row justify-center items-center w-full'>
        <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        </div>
      <div className='bg-black w-full h-4/5 overflow-hidden flex flex-row justify-center items-center rounded-2xl'>
      <div className=' bg-black w-2/5 m-0 rounded-custom col-md-6'>
        <img  className='loginimg' src="https://i.pinimg.com/originals/d3/9a/0d/d39a0daf8440e7c1e985f448497c550b.jpg" alt="" />
      </div>
      <div className='FormDivLogin w-4/6 flex flex-row justify-center items-center' >
      <div className='retangle'/>
      <div className='retangle2'/>
            
          
         
          <Form action="">
            <h4 className='font-serif text-balance'>Get Start With <span style={{color:'yellow', fontSize:40}}> W</span></h4><br />
            <h2 className='text-gray-200'>Create</h2><hr /><br />

            <label htmlFor="name">Name</label><br />
            <Field className='text-black' type="text" id="name" name="name"  required/><br />
            <ErrorMessage name="name" component="div" className="error" /><br />

            <label htmlFor="email">Email</label><br />
            <Field className='text-black' type="email" id="email" name="email"   required/><br />
            <ErrorMessage name="email" component="div" className="error" /><br />

            <label htmlFor="password">Password</label><br />
            <Field className='text-black' type="password" id="password" name="password"    required/><br />
            <ErrorMessage name="password" component="div" className="error" /><br />

            <label htmlFor="confirmPassword">Confirm Password</label><br />
            <Field className='text-black' type="password" id="confirmPassword" name="confirmPassword"  required/><br />
            <ErrorMessage name="confirmPassword" component="div" className="error" /><br />

            <div className='btnDiv'>
              <button type='submit' disabled={!formik.isValid || formik.isSubmitting} className='px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600'>Create</button><Link href='login' className='px-1 py-1 btn btn-secondary'>Have account? login</Link>
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


