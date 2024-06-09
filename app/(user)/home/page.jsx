'use client';

import { useContext, useEffect, useState,useRef } from 'react';
import AppContext from '@/app/context/myContext';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import FollowButton from '../components/followUnfollowBTN';
import EditCMTButton from '../components/editCMTbutton';
import CmtDeleteBTN from '../components/deleteCMTbutton';
import LikeBtn from '../components/likeBTN';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation'; 



export default function Home() {
  const [id, setId] = useState(null);
  const recommendedUsersRef = useRef([]);
  const router = useRouter();

  
  const { data, currentUser, allposts, loading,posts,comments, fetchComments, createComment ,followedPosts} = useContext(AppContext);
  const fieldArray = ['discover', 'followers', 'mypost']

  const [openCMT, setOpenCMT] = useState(false);
  const [createCMT, setCreateCMT] = useState('');
  const [field,setField] = useState(fieldArray[0]);
  const [fUsers,setFusers] = useState('default');

  const [changes, setChange] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const searchInputContainer = useRef(null);
  const clickPoint = useRef();
  const [isFocused, setIsFocused] = useState(false); 

  const [followersU, setFollowersU] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [followingU, setFollowingU] = useState([]);
  const [showFollowing, setShowFollowing] = useState(false);

  //Auth--------------
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }else{
      setId(localStorage.getItem('id'))
    }
  }, []);



  //-------search functionalities---------
  const SearchClick = () => {
    if (changes.trim() !== '') {
      const filtered = data.allUsers.filter((user) =>
        user.username.toLowerCase().includes(changes.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleOutsideClick = (event) => {
    if (
      searchInputContainer.current &&
      !searchInputContainer.current.contains(event.target)
    ) {
      setFilteredUsers([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleFocus = () => {
    clickPoint.current.style.display = "none";
    setIsFocused(true);

  };

  const handleBlur = () => {
    setTimeout(() => {
      clickPoint.current.style.display = 'block';
      setIsFocused(false);
    }, 200);
  };



  
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




//followers/following user display
const handleShowFollowers = () => {
  setFusers('followers');
  if (currentUser && currentUser.followers && data.allUsers) {
    const followersId = currentUser.followers;
    const foundUsers = data.allUsers.filter(user => followersId.includes(user._id));
    setFollowersU(foundUsers);
    console.log('followers', foundUsers);
    setShowFollowers(true);
  }
};
const handleShowFollowing = () => {
  setFusers('following');
  if (currentUser && currentUser.following && data.allUsers) {
    const followingId = currentUser.following;
    const foundUsers = data.allUsers.filter(user => followingId.includes(user._id));
    setFollowingU(foundUsers);
    console.log('following', foundUsers);
    setShowFollowing(true);
  }
};



  if (loading) {
    return toast.loading('Loading...');
  }


  return (
    <div className='bg-emerald-100 text-black w-screen dark:bg-zinc-900'>
    <Toaster position="top-center" reverseOrder={false} />
    <Navbar />
    <div className='flex w-screen h-screen sm:justify-center'>

    {/* -----------suggestion users-------- */}


    <div className='md:flex md:flex-col hidden h-fit w-1/4 mt-3 mr-3 p-3 rounded-3xl bg-white text-center sm:hidden  dark:bg-black dark:text-white'>
    {fUsers === 'default' ? (
      <>
        <p>Suggestions</p>
        {data?.lusers ? (
          <>
            {data.lusers.filter((x) => x._id !== id).map((x, index) => (
              <div
                className="flex w-full m-1 justify-between items-center md:justify-around bg-emerald-50 rounded-lg p-4 dark:bg-zinc-900"
                key={x._id}
                ref={(el) => (recommendedUsersRef.current[index] = el)}
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                <div className="w-1/3">
                  <Link href={`/userProfileView/${x._id}`}>
                    <div className="w-12 h-12 lg:flex md:hidden rounded-full bg-emerald-500 flex items-center justify-center">
                      <span className="text-gray-700 text-xl font-bold">
                        {x.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Link>
                </div>
                <p className="w-2/5 overflow-hidden md:flex">{x.username}</p>
                <FollowButton userId={x._id} currentUser={currentUser} />
              </div>
            ))}
          </>
        ) : (
          <div className="flex animate-pulse">Loading.....</div>
        )}
     </>
    ) : fUsers === 'followers' ? (
      <>
        <p>Followers</p>
        {showFollowers && (
          <div>
            {followersU.map(user => ( 
              <div key={user._id} className="flex w-full m-1 justify-between items-center md:justify-around bg-emerald-50 rounded-lg p-4 dark:bg-zinc-900">
                
              <div className="w-1/3">
                <Link href={`/userProfileView/${user._id}`}>
                  <div className="w-12 h-12 lg:flex md:hidden rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-gray-700 text-xl font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Link>
              </div>
              <p className="w-2/5 overflow-hidden md:flex">{user.username}</p>
              <FollowButton userId={user._id} currentUser={currentUser} />
           
              </div>
            ))}
          </div>
        )}
      
      </>
    ) : (
      <>
        <h1>Following</h1>
        {showFollowing && (
          <div>
            {followingU.map(user => ( 
              <div key={user._id} className="flex w-full m-1 justify-between items-center md:justify-around bg-emerald-50 rounded-lg p-4 dark:bg-zinc-900">
                
              <div className="w-1/3">
                <Link href={`/userProfileView/${user._id}`}>
                  <div className="w-12 h-12 lg:flex md:hidden rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-gray-700 text-xl font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Link>
              </div>
              <p className="w-2/5 overflow-hidden md:flex">{user.username}</p>
              <FollowButton userId={user._id} currentUser={currentUser} />
           
              </div>
            ))}
          </div>
        )}
        
      </>
    )}
    </div>


    {/* --------post divs----------- */}

    <div className='bg-white w-full flex flex-col rounded-2xl mt-2 ml-2 mr-2 -mb-3 p-1 h-screen  dark:bg-black dark:text-white overflow-hidden'>
    <div className="items-center  px-4 flex justify-center" >
    <div className="relative mr-3 " ref={searchInputContainer}>
            <div className="absolute top-3 left-3 items-center" ref={clickPoint}>
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-input"
              className="block focus:border-none  border-none p-2 pl-10 w-54 md:w-72 lg:w-72 xl:w-72 text-emerald-600 bg-gray-50  dark:bg-zinc-200 rounded-lg border border-gray-300 focus:pl-3"
              placeholder="Search . . ."
              value={changes}
              onChange={(e) => {
                setChange(e.target.value);
                SearchClick();
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            {isFocused && filteredUsers.length > 0 && (
              <div className="absolute bg-white shadow-md rounded-md mt-2 w-full z-10">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer dark:text-white text-black"
                  >
                    <Link href={`/userProfileView/${user._id}`}  key={user._id} passHref>
                    <img
                      src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    
                    <span className="dark:text-black text-black">{user.username}</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      <div className='m-2 flex justify-around'>
        <button href="" onClick={()=>setField(fieldArray[1])} className='focus:text-emerald-500'>followers</button>
        <button href="" onClick={()=>setField(fieldArray[0])} className='focus:text-emerald-500'>discover</button>
        <button href="" onClick={()=>setField(fieldArray[2])} className='focus:text-emerald-500'>mypost</button>
      </div>
      <div className='m-3 h-screen overflow-y-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        
        {field == 'discover'?
      <>

{/*----------------------- All users post display -----------------------*/}


          {allposts && allposts.length > 0 ? (
              <div className='flex w-full flex-col h-fit justify-items-center rounded-lg'>
                {allposts.map((item) => (
                  <div className='bg-emerald-50 rounded-xl mb-8 dark:bg-zinc-900' key={item._id}>
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
                      <br />
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
                                    {
                              currentUser._id == comment.userId ?
                                <>
                                  <EditCMTButton commentId={comment._id} postId={item._id} />
                                  <CmtDeleteBTN commentId={comment._id} postId={item._id} />
                                </>
                              :
                            <>   
                                </>
                            }
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
                      <div className='bg-emerald-50 rounded-xl mb-8  dark:bg-zinc-900' key={item._id}>


                        <div className="flex flex-col justify-between">
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
                            <br />
                          <p>{item.desc}</p>
                          
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
                            
                            {
                          currentUser._id == commentss.userId ?
                            <>
                              <EditCMTButton commentId={commentss._id} postId={item._id} />
                              <CmtDeleteBTN commentId={commentss._id} postId={item._id} />
                            </>

                              :
                            <>
                              
                            </>
                        }
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
                  <div className='bg-emerald-50 rounded-xl mb-8  dark:bg-zinc-900' key={item._id}>
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
                        {
                          currentUser._id == commentz.userId ?
                            <>
                              <EditCMTButton commentId={commentz._id} postId={item._id} />
                              <CmtDeleteBTN commentId={commentz._id} postId={item._id} />
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
          }
       </>           
        }
    </div>
  </div>


  {/* ------User Info-------- */}
    <div  className='md:flex md:flex-co h-fit  hidden w-1/4 mt-3 mr-3 p-3 rounded-3xl dark:bg-black dark:text-white bg-white text-center sm:hidden'>
      <h3>{currentUser ?
      <> 
      <li className='list-none pr-5'><Link href='profile'>
      
        <img className='rounded-full w-12 h-12' src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745" alt="" />
                    
        </Link>{currentUser.username}</li>
      <li className='list-none pr-5'>{currentUser.email}</li>
      <div>
        <div className='flex justify-between'>
          <div>
            <div> {currentUser.followers&&currentUser.followers.length}</div>
            <div className='font-extralight text-sm cursor-pointer' onClick={handleShowFollowers}>followers</div>
          </div>
          <div>
            <div> {currentUser.followers&&currentUser.following.length}</div>
            <div className='font-extralight text-sm cursor-pointer' onClick={handleShowFollowing}>followings</div>
          </div>
        </div>
        <br />
        <div>liked posts</div>
        <div>saved</div>
      </div>
      </> 
      : 
      <li className='list-none pr-5'>profile</li>}
      </h3> 
    </div>
</div>
</div>
  );
}
