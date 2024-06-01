
'use client';

// import axios from 'axios';
import Link from 'next/link';
import React, { useState,useEffect, useContext } from 'react';
import LikeBtn from '../components/likeBTN';
import CmtDeleteBTN from '../components/deleteCMTbutton';
import EditCMTButton from '../components/editCMTbutton';
import PostDeleteBTN from '../components/postDeleteBTN';
import AppContext from '@/app/context/myContext';
import { useRouter } from 'next/navigation'; 


function Profile() {
  const router = useRouter(); 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);
  const [openCMT, setOpenCMT] = useState(false);
  const [createCMT, setCreateCMT] = useState('');

  const { currentUser, posts, comments, fetchComments, createComment,data } = useContext(AppContext);
console.log(comments, ': comments');



  const commentClick = (postId) => {
    fetchComments(postId);
    setOpenCMT((prevState) => (prevState === postId ? null : postId));
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
  };

  const handleCreateCMT = (postId) => {
    createComment(postId, createCMT);
    setCreateCMT('');
  };

  return (
    <div className='flex flex-col w-screen h-screen bg-emerald-100 '>
      <div className='flex flex-col h-2/6 items-center'>
        <div className='w-screen h-2/4 object-cover'>
        

          <img className='sm:rounded-b-md relative h-full w-full lg:rounded-b-full' src="https://www.dndspeak.com/wp-content/uploads/2021/04/Temple-1-768x512.jpg" alt="" />
          <Link className='absolute top-3 left-3' href='/home' >

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </Link>
        </div>
        <div className='bg-[#FFFFFF] h-3/4 flex flex-col w-4/5 rounded-b-3xl'>
          <div className='pl-1'>
            <img  src=" https://i.pinimg.com/564x/58/bc/a3/58bca38c4d21f72acb56ff32c99831fb.jpg" alt="profilePic" className='rounded-full border-white border-4 w-28 h-28 relative -top-16' />
          </div>
          <div className='flex justify-between -mt-16  relative'>
            {currentUser ? (
              <>
                <div className='flex flex-col  justify-evenly w-1/3 top-5 pl-1 -mt-3'>
                  <div>
                    <h5>{currentUser.username}</h5>
                    <p>{currentUser.email}</p>
                  </div>
                  



                  


                </div>


                <div className='flex flex-col relative -top-8 pt-0 pl-1'>
                  <div>
                  <div className='flex pr-3 relative top-5'>
                    <p className='pr-3'>followers: {currentUser.followers ? currentUser.followers.length : 0}</p>
                    <p>following: {currentUser.following ? currentUser.following.length : 0}</p>
                  </div>
                  </div>
                  <div className='flex pt-4 justify-center'>
                  <div className='pr-2 pt-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                  </div>
                  
                  <Link href='/profile/upload'className='pr-2 pt-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </Link>
                  
                  
                  <Link href='/' onClick={logOut}className='pr-2 pt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-orange-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                  </Link>
                  </div>
                  </div>
               
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
      <div className='flex justify-around h-5/6 w-screen  bg-emerald-100 overflow-auto'style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className='hidden md:flex w-1/5 md:justify-center bg-[#FFFFFF] m-3 rounded-2xl sm:hidden '>messages</div>
        <div className=' w-4/5 text-center  bg-[#FFFFFF] m-3 rounded-2xl sm:w-4/5 overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className='flex flex-col '>
            <div className='flex justify-evenly'>
              <br />
            </div>
            <div className='ml-7 mr-7 pb-4'>
              {posts && posts.length > 0 ? (
                <div className='flex w-full flex-col h-fit justify-items-center rounded-lg'>
                  {posts.filter((item) => item.userId === currentUser._id).map((item) =>
                  
                    
                      <div className='bg-emerald-50 rounded-xl mb-5' key={item._id}>
                        <div className="flex justify-between items-center">
                          <div className='flex flex-col'>
                            <p>{item.desc}</p>                        
                          </div>
                        </div>
                        <div className='flex justify-center relative'>
                          <img className='pl-7 pr-7 w-full object-cover rounded-3xl' src={item.image} alt="" />
                        </div>
                        <div className='flex justify-around mb-5'>
                          <div className='flex '>
                            <LikeBtn postID={item._id} />
                            
                          </div>
                          
                          <button onClick={() => commentClick(item._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                          </svg>
                          </button>
                          <PostDeleteBTN postId={item._id} />
                          <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>
                          </button>
                        </div>
                        {openCMT === item._id ? (
                          <div>
                            <input
                              type="text"
                              value={createCMT || ''}
                              onChange={(e) => setCreateCMT(e.target.value)}
                              placeholder="comment..."
                              className="text-gray-700 border-none rounded-md -mt-5 animate-pulse"
                            />
                            {createCMT && (
                              <button
                                onClick={() => handleCreateCMT(item._id)}
                                className='pl-3 relative top-1.5'
                              >
                                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                              </button>
                            )}
                            {comments.length > 0 ? (
                              <>
                                {comments.map((comment) => (
                                  <div key={comment._id}>
                                    <div className='flex justify-between'>
                                    { comment.userId ? (
                                        <>
                                          {data.allUsers.find(x => x._id === comment.userId)?.username}
                                        </>
                                      ) : (
                                        <></>
                                      )
                                    }
                                      <p>{comment.text}</p>
                                      <div className='flex justify-evenly'>
                                        <EditCMTButton commentId={comment._id} postId={item._id} />
                                        <CmtDeleteBTN commentId={comment._id} postId={item._id} />
                                      </div>
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
                      
                    
                  )}
                </div>
              ) : (
                <div className='flex justify-center flex-col items-center'>
                  <div className='flex justify-center align-middle items-center w-12 rounded-full h-12 bg-emerald-300 animate-spin'>
                    <div className='rounded-full bg-white w-10 h-1'></div>
                  </div>
                  Loading<span className='animate-bounce'>.....</span>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
