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




function LoginUserPosts() {

    const [id, setId] = useState(null);
    const recommendedUsersRef = useRef([]);
    const router = useRouter();
  
    
    const { data, currentUser, loading,comments, fetchComments, createComment ,posts} = useContext(AppContext);
    
  
    const [openCMT, setOpenCMT] = useState(false);
    const [createCMT, setCreateCMT] = useState('');
  
    //Auth--------------
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }else{
        setId(localStorage.getItem('id'))
      }
    }, []);
  
    
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
                      <button onClick={() => commentClick(itemc._id)}>comment</button>
                      
                      <button>share</button>
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
                        <p>{commentz.text}</p>
                        {
                          currentUser._id == commentz.userId ?
                            <>
                              <EditCMTButton commentId={commentz._id} postId={itemc._id} />
                              <CmtDeleteBTN commentId={commentz._id} postId={itemc._id} />
                            </>

                              :
                            <>
                              
                            </>
                        }
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
