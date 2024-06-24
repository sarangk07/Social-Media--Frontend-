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
import LoadingGIF from '@/app/components/loadingGIF';
import ShareButtons from '@/app/components/ShareBTNs';




function FollowersPost() {

    const [id, setId] = useState(null);
    const recommendedUsersRef = useRef([]);
    const router = useRouter();
  
    
    const { data, currentUser, loading,comments, fetchComments, createComment ,followedPosts} = useContext(AppContext);
    
  
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
          {followedPosts && followedPosts.length > 0 ? (
            <div className='flex w-full flex-col h-fit justify-items-center rounded-lg'>
                    {followedPosts.map((itemf) => (
                      <div className='bg-emerald-50 rounded-xl mb-8  dark:bg-zinc-900' key={itemf._id}>


                        <div className="flex flex-col justify-between">
                          <div className='flex'>
                            <Link href={`/userProfileView/${itemf.userId}`}>
                            <img className='rounded-full w-12 h-12' src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745" alt="" />
                            </Link>
                            {data && data.allUsers ? (
                            <>
                              {data.allUsers.filter((x) => x._id === itemf.userId).map((user) => (
                                <h4 className='relative left-5' key={user._id}>
                                  {user.username}
                                </h4>
                              ))}
                              
                            </>
                            ) : (
                              <h4 className='relative left-5'>Unknown User</h4>
                            )}
                            
                          </div>
                            <br />
                          <p>{itemf.desc}</p>
                          
                        </div>
                    
                        <div className='flex justify-center relative'>
                          <img className='pl-7 pr-7 w-full  object-cover rounded-3xl' src={itemf.image} alt="" />
                        </div>
                        <div className='flex justify-around mb-5'>
                        <div className='flex '>
                          <LikeBtn postID={itemf._id} />
                          
                        </div>
                          <button onClick={() => commentClick(itemf._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                          </svg>
                          </button>
                          
                          <ShareButtons url={`http://localhost:3000//posts/${itemf._id}`} title={itemf.desc}/>

                        </div>
                        {openCMT === itemf._id ? (
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
                                  className='pl-3 relative top-1.5'
                                  onClick={() => handleCreateCMT(itemf._id)}
                                >
                                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                                </button>
                              )}
                              {comments.length > 0 ? (
                                <>
                                  {comments.map((commentss) => (
                                    <div key={`${commentss._id}-commentss`}>
                                      <div className='flex justify-between'>
                                      { commentss.userId ? (
                                <>
                                  {data.allUsers.find(x => x._id === commentss.userId)?.username}
                                </>
                              ) : (
                                <></>
                              )
                            }
                            <div className='flex '>{commentss.text}
                            
                            {
                          currentUser._id == commentss.userId ?
                            <>
                              <EditCMTButton commentId={commentss._id} postId={itemf._id} />
                              <CmtDeleteBTN commentId={commentss._id} postId={itemf._id} />
                            </>

                              :
                            <>
                              
                            </>
                        }</div>
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
                  {/* <div className="flex justify-center items-center w-12 h-12 bg-emerald-300 animate-spin rounded-full">
                    <div className="absolute w-10 h-1 bg-white rounded-full"></div>
                    <div className="absolute w-10 h-1 bg-white rounded-full transform rotate-90"></div>
                  </div> */}

                  <div className='flex'>
                    <LoadingGIF/>
                  </div>
                  </div>
                )}
              </>

    </div>
  )
}

export default FollowersPost
