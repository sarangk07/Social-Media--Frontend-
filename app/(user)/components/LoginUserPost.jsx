'use client';

import { useContext, useEffect, useState,useRef } from 'react';
import AppContext from '@/app/context/myContext';

import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

import EditCMTButton from '../components/editCMTbutton';
import CmtDeleteBTN from '../components/deleteCMTbutton';
import LikeBtn from '../components/likeBTN';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation'; 
import ShareButtons from '@/app/components/ShareBTNs';




function LoginUserPosts() {

    const [id, setId] = useState(null);
    const recommendedUsersRef = useRef([]);
    const router = useRouter();
  
    
    const { data, currentUser, loading,comments, fetchComments, createComment ,posts} = useContext(AppContext);
    
  
    const [openCMT, setOpenCMT] = useState(false);
    const [createCMT, setCreateCMT] = useState('');
  
    // //Auth--------------
    // useEffect(() => {
    //   const token = localStorage.getItem('token');
    //   if (!token) {
    //     router.push('/login');
    //   }else{
    //     setId(localStorage.getItem('id'))
    //   }
    // }, []);
  
    
  //comment functionalities-----------------
    const commentClick = (postId) => {
      fetchComments(postId);
      setOpenCMT((prevState) => (prevState === postId ? null : postId));
    };
  
    const handleCreateCMT = (postId) => {
      createComment(postId, createCMT);
      setCreateCMT('');
    };
  
  
  
  
    //GSAP Animation----------------
    useEffect(() => {
      if (data.lusers) {
        gsap.to(recommendedUsersRef.current, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power1.out',
        });
      }
    },[data.lusers]);
  
  
  
    if (loading) {
      return toast.loading('Loading...');
    }




  return (
    <div>
     
          <>
          {posts && posts.length > 0 ? (
              <div className='flex w-full flex-col h-fit justify-items-center rounded-lg'>
                {posts.filter((item) => item.userId === currentUser._id).map((itemc) => (
                  <div className='bg-emerald-50 rounded-xl mb-8  dark:bg-zinc-900' key={itemc._id}>
                    <div className="flex justify-between items-center">
                      <div className='flex flex-col'>
                        <Link href={`/userProfileView/${itemc.userId}`}>
                        <img className='rounded-full w-12 h-12' src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745" alt="" />
                        </Link>
                        {/* <h4 className='relative left-5'>{item._id}</h4><br /> */}
                        <p>{itemc.desc}</p>

                      </div>
                      
                    </div>
                    <div className='flex justify-center relative'>
                      <img className='pl-7 pr-7 w-full  object-cover rounded-3xl' src={itemc.image} alt="" />
                    </div>
                    <div className='flex justify-around mb-5'>
                        <div className='flex '>
                          <LikeBtn postID={itemc._id} />
                         
                        </div>
                      <button onClick={() => commentClick(itemc._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                      </button>
                      
                      <ShareButtons url={`http://localhost:3000//posts/${itemc._id}`} title={itemc.desc}/>

                    </div>
                    {openCMT === itemc._id ? (
                        <div>
                          <input
                            type="text"
                            value={createCMT || ''}
                            onChange={(e) => setCreateCMT(e.target.value)}
                            placeholder="comment..."
                            className="text-gray-700 border-none rounded-md animate-pulse"
                          />
                          {createCMT && (
                            <button
                              className="rounded-sm inline-block bg-teal-800 text-white w-8"
                              onClick={() => handleCreateCMT(itemc._id)}
                            >
                              Sent
                            </button>
                          )}
                          {comments.length > 0 ? (
                            <>
                              {comments.map((commentz) => (
                                <div key={`${itemc._id}-${commentz._id}`}>
                                  <div className='flex justify-between'>
                                  { commentz.userId ? (
                            <>
                              {data.allUsers.find(x => x._id === commentz.userId)?.username}
                            </>
                          ) : (
                            <></>
                          )
                        }
                        <div className='flex '>{commentz.text}
                        {
                          currentUser._id == commentz.userId ?
                            <>
                              <EditCMTButton commentId={commentz._id} postId={itemc._id} />
                              <CmtDeleteBTN commentId={commentz._id} postId={itemc._id} />
                            </>

                              :
                            <>
                              
                            </>
                        }</div>
                          {/* <div className='flex justify-evenly'>
                            
                            </div> */}
                          </div>
                          <hr />
                          </div>
                        ))}
                        </>
                        ) : (
                         <p>No comments found!</p>
                        )}
                      <hr />
                      </div>
                      ) : null}
                    <hr className='mb-8' />
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex justify-center flex-col items-center transition-shadow'>
              <div className="flex justify-center items-center w-12 h-12 bg-emerald-300 animate-spin rounded-full">
                <div className="absolute w-10 h-1 bg-white rounded-full"></div>
                <div className="absolute w-10 h-1 bg-white rounded-full transform rotate-90"></div>
              </div>

              <div className='flex animate-pulse'>Loading.....</div>
              </div>
            )}
        </>

    </div>
  )
}

export default LoginUserPosts
