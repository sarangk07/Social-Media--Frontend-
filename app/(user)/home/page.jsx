'use client';

import { useContext, useEffect, useState } from 'react';
import AppContext from '@/app/context/myContext';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import FollowButton from '../components/followBTN';
import UnfollowButton from '../components/unFollowBtn';
import EditCMTButton from '../components/editCMTbutton';
import CmtDeleteBTN from '../components/deleteCMTbutton';
import LikeBtn from '../components/likeBTN';

import { useRouter } from 'next/navigation'; 



export default function Home() {
  const [id, setId] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }else{
      setId(localStorage.getItem('id'))
    }
  }, []);


  const { data, currentUser, allposts, loading,posts,comments, fetchComments, createComment ,followedPosts} = useContext(AppContext);
  const fieldArray = ['discover', 'followers', 'mypost']

  const [openCMT, setOpenCMT] = useState(false);
  const [createCMT, setCreateCMT] = useState('');
  const [field,setField] = useState(fieldArray[0]);
  


  

  

  const commentClick = (postId) => {
    fetchComments(postId);
    setOpenCMT((prevState) => (prevState === postId ? null : postId));
  };

  const handleCreateCMT = (postId) => {
    createComment(postId, createCMT);
    setCreateCMT('');
  };


  if (loading) {
    return toast.loading('Loading...');
  }

  return (
    <div className='bg-emerald-100 text-gray-700'>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className='flex w-screen h-screen sm:justify-center'>
        <div className='md:flex md:flex-col hidden w-1/4 mt-3 mr-3 p-3 rounded-3xl bg-white text-center sm:hidden'>
          <p>Recommended Users</p>
          {data.lusers?<>
          {data.lusers.filter((x)=>x._id != id).map((x) => (
            <div className='flex w-full m-1 justify-between items-center md:justify-around bg-emerald-50 rounded-lg p-4' key={x._id}>
              <div className='w-1/3'>
                <Link href={`/userProfileView/${x._id}`}>
                  <div className="w-12 h-12 lg:flex md:hidden rounded-full bg-emerald-300 flex items-center justify-center">
                    <span className="text-gray-700 text-xl font-bold">
                      {x.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Link>
              </div>
              <p className='w-2/5 overflow-hidden md:flex'>{x.username}</p>
              {x.followers.includes(currentUser._id) ? (
                <UnfollowButton userId={x._id} currentUser={currentUser} />
              ) : (
                <FollowButton userId={x._id} currentUser={currentUser} />
              )}
            </div>
          ))}
          </>
        :
        <div className='flex animate-pulse'>Loading.....</div>
        }
          
        </div>
        <div className='bg-white w-full flex flex-col rounded-2xl m-2 p-5 h-full'>
          <div className='m-5 flex justify-around'>
            <button href="" onClick={()=>setField(fieldArray[1])} className='focus:text-emerald-500'>followers</button>
            <button href="" onClick={()=>setField(fieldArray[0])} className='focus:text-emerald-500'>discover</button>
            <button href="" onClick={()=>setField(fieldArray[2])} className='focus:text-emerald-500'>mypost</button>
          </div>
          <div className='m-6 h-screen overflow-y-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
           
           
           {field == 'discover'?
          <>

{/*----------------------- All users post display -----------------------*/}


          {allposts && allposts.length > 0 ? (
              <div className='flex w-full flex-col h-fit justify-items-center rounded-lg'>
                {allposts.map((item) => (
                  <div className='bg-emerald-50 rounded-xl mb-8' key={item._id}>
                    <div className="flex flex-col justify-between ">
                      <div className='flex'>
                        <Link href={`/userProfileView/${item.userId}`}>
                        <img className='rounded-full w-12 h-12' src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745" alt="" />
                        </Link>
                        {data && data.allUsers ? (
                            <>
                              {data.allUsers.filter((x) => x._id === item.userId).map((user) => (
                                <h4 className='relative left-5' key={user._id}>
                                  {user.username}
                                </h4>
                              ))}
                            </>
                          ) : (
                            <h4 className='relative left-5'>Unknown User</h4>
                          )}
                      </div>
                      <p>{item.desc}</p>
                      
                    </div>
                    <div className='flex justify-center rounded-md relative'>
                      <img className='pl-7 pr-7 w-full  object-cover rounded-3xl' src={item.image} alt="" />
                    </div>
                    <div className='flex justify-around mb-5'>
                      <div className='flex '>
                          <LikeBtn postID={item._id} />
                    
                      </div>
                      <button onClick={() => commentClick(item._id)}>comment</button>
                      <button>share</button>
                    </div>

                    {openCMT === item._id ? (
                        <div className='pl-4 pr-4'>
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
                              onClick={() => handleCreateCMT(item._id)}
                            >
                              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                              </svg>
                            </button>
                          )}
                          {comments.length > 0 ? (
                            <>
                            {console.log('comments : ',comments)}
                              {comments.map((comment) => (
                                <div key={`${item._id}-${comment._id}`}>
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
                                    {/* <div className='flex justify-evenly'>
                                      <EditCMTButton commentId={comment._id} postId={item._id} />
                                      <CmtDeleteBTN commentId={comment._id} postId={item._id} />
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
          
          :

          <>

{/*----------------------- followed users post display -----------------------*/}

          {field == 'followers'?
          <>
          {followedPosts && followedPosts.length > 0 ? (
            <div className='flex w-full flex-col h-fit justify-items-center rounded-lg'>
                    {followedPosts.map((item) => (
                      <div className='bg-emerald-50 rounded-xl mb-8' key={item._id}>
                        <div className="flex justify-between items-center">
                          <div className='flex flex-col'>
                            <Link href={`/userProfileView/${item.userId}`}>
                            <img className='rounded-full w-12 h-12' src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745" alt="" />
                            </Link>
                            {data && data.allUsers ? (
                            <>
                              {data.allUsers.filter((x) => x._id === item.userId).map((user) => (
                                <h4 className='relative left-5' key={user._id}>
                                  {user.username}
                                </h4>
                              ))}
                            </>
                            ) : (
                              <h4 className='relative left-5'>Unknown User</h4>
                            )}
                            <br />
                            <p>{item.desc}</p>

                          </div>
                          
                        </div>
                        <div className='flex justify-center relative'>
                          <img className='pl-7 pr-7 w-full  object-cover rounded-3xl' src={item.image} alt="" />
                        </div>
                        <div className='flex justify-around mb-5'>
                        <div className='flex '>
                          <LikeBtn postID={item._id} />
                          
                        </div>
                          <button onClick={() => commentClick(item._id)}>comment</button>
                          
                          <button>share</button>
                        </div>
                        {openCMT === item._id ? (
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
                                  onClick={() => handleCreateCMT(item._id)}
                                >
                                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                                </button>
                              )}
                              {comments.length > 0 ? (
                                <>
                                  {comments.map((commentss) => (
                                    <div key={`${item._id}-${commentss._id}`}>
                                      <div className='flex justify-between'>
                                      { commentss.userId ? (
                                <>
                                  {data.allUsers.find(x => x._id === commentss.userId)?.username}
                                </>
                              ) : (
                                <></>
                              )
                            }
                            <p>{commentss.text}</p>
                            
                              {/* <div className='flex justify-evenly'>
                                <EditCMTButton commentId={commentss._id} postId={item._id} />
                                  <CmtDeleteBTN commentId={commentss._id} postId={item._id} />
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

                  <div className='flex animate-pulse'>Loading...../ No post found</div>
                  </div>
                )}
              </>

             :

              <>

{/*----------------------- Current users post display -----------------------*/}

            {posts && posts.length > 0 ? (
              <div className='flex w-full flex-col h-fit justify-items-center rounded-lg'>
                {posts.filter((item) => item.userId === currentUser._id).map((item) => (
                  <div className='bg-emerald-50 rounded-xl mb-8' key={item._id}>
                    <div className="flex justify-between items-center">
                      <div className='flex flex-col'>
                        <Link href={`/userProfileView/${item.userId}`}>
                        <img className='rounded-full w-12 h-12' src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745" alt="" />
                        </Link>
                        {/* <h4 className='relative left-5'>{item._id}</h4><br /> */}
                        <p>{item.desc}</p>

                      </div>
                      
                    </div>
                    <div className='flex justify-center relative'>
                      <img className='pl-7 pr-7 w-full  object-cover rounded-3xl' src={item.image} alt="" />
                    </div>
                    <div className='flex justify-around mb-5'>
                        <div className='flex '>
                          <LikeBtn postID={item._id} />
                         
                        </div>
                      <button onClick={() => commentClick(item._id)}>comment</button>
                      
                      <button>share</button>
                    </div>
                    {openCMT === item._id ? (
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
                              onClick={() => handleCreateCMT(item._id)}
                            >
                              Sent
                            </button>
                          )}
                          {comments.length > 0 ? (
                            <>
                              {comments.map((commentz) => (
                                <div key={`${item._id}-${commentz._id}`}>
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
                          {/* <div className='flex justify-evenly'>
                            <EditCMTButton commentId={commentz._id} postId={item._id} />
                              <CmtDeleteBTN commentId={commentz._id} postId={item._id} />
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
          }
       </>           
        }
    </div>
  </div>
</div>
</div>
  );
}
