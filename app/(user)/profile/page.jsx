'use client'

import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { useEffect,useState } from 'react';
import LikeBtn from '../components/likeBTN';

function  Profile() {
    const[user,setUser]=useState(null);
    const[post,setPosts] = useState([]);
    const [openCMT,setOpenCMT]= useState(false);
    const [comments,setComments] = useState([]);
    const [createCMT,setCreateCMT] = useState(null);

    useEffect(()=>{
        const getUsers = async()=>{
          const response = await axios.get('https://social-media-5ukj.onrender.com/user/');
          console.log(user,'user................................');
          const allUsers = await response.data
          // console.log(response.data);
          // console.log(allUsers,'nav  bar')
          const localEmail = localStorage.getItem('email') ;
          
          allUsers.map((x)=>{
              
              if(x.email === localEmail){
                // console.log('found')
                // console.log(x.username)
                setUser(x)
                // localStorage.setItem('id',x._id)
              }
          })
        console.log(user) 
        }
        getUsers()
      },[])



      useEffect(()=>{
        const getPosts = async ()=>{
          try{
          const id = localStorage.getItem('id')
          // console.log(id,': user idddddddddddddddddddddddddddddddddddddd11111111111111111111');
          const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${id}/timeline`)
          console.log(response,'responseeeeeeeeeeeeeeeeeeeeeeeeee')
          console.log(response.data,'post get responseeeeeeeeeeeeeeeeeeeeeeeeee')
          setPosts(response.data)
        }catch(error){
          console.log(error.response,'get error')
          if(error.response.status == 500){
            toast.error('Server Not Responting.....try again later...')
            // console.log('server error');
          }
        }
        }
        getPosts()
    },[])



    const commentClick = async (postId) => {
      const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${postId}/comments`);
      console.log(response,'comment get responseeeee');
      setComments(response.data)
      setOpenCMT(prevState => prevState === postId ? null : postId);
    };
    
  
    const logOut = ()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
    }

     const handleCrateCMT = async (postid)=>{
      const uid = localStorage.getItem('id')
      console.log(createCMT,'inputed comment..................',postid,': post id',uid,  ':usser id');
      const formdata = new FormData()
      formdata.append('userId',uid)
      formdata.append('text',createCMT)
      const response = await axios.post(`https://social-media-5ukj.onrender.com/posts/${postid}/comment`,formdata,{
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data,'comment created status');
     }

    

console.log(comments,'typed comment');
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
            <div className='flex justify-between pt-14'>
            {user?<>
                <div className='flex justify-evenly w-1/3 top-5'> 
                    
                    <div>
                    <h5>{user.username}</h5>
                    <p>{user.email}</p>
                    </div>
                    <div className='rounded-md bg-emerald-800 w-11 h-10 text-white cursor-pointer flex items-center justify-center hover:bg-emerald-700'>edit</div>
                    <Link href='/profile/upload' className='rounded-md bg-emerald-800 w-11 h-10 text-white cursor-pointer flex items-center justify-center hover:bg-emerald-700'>Create</Link>
                    
                    
                    <Link href='/' onClick={logOut}>
                     logout
                    </Link>

                    
                </div>
                
                
                <div >
                    <p>followers: {user.followers.length}</p>
                    <p>following: {user.following.length}</p>
                </div>
                </>:<div></div>}
            </div>

        </div>
    </div>
    <div className=' flex justify-around h-4/6 w-screen bg-[#D9D9D9]  ' >
      <div className='md:flex w-2/5 md:justify-center bg-[#FFFFFF] m-3 rounded-2xl sm:hidden '>messages</div>
      <div className='w-3/5 text-center bg-[#FFFFFF] m-3 rounded-2xl sm:w-4/5 overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className='flex  flex-col  '>
      <div className='flex justify-evenly'>
        <h3 className='active: text-orange-600'>my</h3>
      </div>
      <div className='ml-7 mr-7 pb-4'>

    {post && post.length > 0 ? (
      <div className='flex w-full flex-col h-fit justify-items-center  rounded-lg'>
        {post.map((item) => (
          <div className='bg-emerald-50 rounded-xl mb-5' key={item._id}>
            <div className="flex justify-between items-center">
              <div className='flex flex-col'>
                <p>{item.desc}</p>
              </div>
            </div>
            <div className='flex justify-center relative '>
              <img className='pl-7 pr-7 w-full h-52 object-cover rounded-3xl' src={item.image} alt=""/>
            </div>
            <div className='flex justify-around mb-5'>
              <LikeBtn postID={item._id} />
              <button onClick={() => commentClick(item._id)}>comment</button>
              <button>share</button>
            </div>
            {openCMT === item._id ? ( 
              <div>
                <input type="text" onChange={(e)=>setCreateCMT(e.target.value)} placeholder='comment...' className='text-gray-700 border-none rounded-md'/><button  href="" className='rounded-sm inline-block bg-teal-800 text-white w-8' onClick={()=>handleCrateCMT(item._id)}>Sent</button>
                {comments.length > 0 ? (
                  <>
                    {comments.map((comment) => (
                      <div key={comment._id}>
                        <p>{comment.text}</p>
                        <p>Posted by: {comment.userId}</p>
                        <p>Created at: {comment.createdAt}</p>
                        <hr />
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No comments found!</p>
                )}

              </div>
            ) : null}
            <hr className='mb-8'/>
          </div>
        ))}
      </div>
    ) : (
      <div>NO Post Yet...!</div>
    )}

</div>
</div>
  <div></div>
</div>
</div>
  
    </div>
  )
}

export default Profile
