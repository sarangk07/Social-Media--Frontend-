'use client'

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import LikeBtn from '../../components/likeBTN';
import AppContext from '@/app/context/myContext';
import FollowButton from '../../components/followUnfollowBTN';
import Link from 'next/link';
import CmtDeleteBTN from '../../components/deleteCMTbutton';
import EditCMTButton from '../../components/editCMTbutton';
import ShareButtons from '@/app/components/ShareBTNs';


const UserProfile = (params) => {
  const[userV,setVUser]=useState([]);
  const[id , setID] = useState(null);
  const[allUsers, setAllusers] = useState([]);
  const [followersFetched, setFollowersFetched] = useState(false);
  const[followedUsers,setFollowedUsers]=useState([]);
  const[post,setPosts]= useState([]);
  const [openCMT, setOpenCMT] = useState(false);
  const {fetchComments,createComment,comments,data,currentUser} = useContext(AppContext)
  const [createCMT, setCreateCMT] = useState('');

  


  
// console.log(params.params.userId,'sdddddddddddddddddddd');

//clicked user id
 useEffect(()=>{
  setID(params.params.userId)
 },[params])


 //cmt codes........
 const commentClick = (postId) => {
  fetchComments(postId);
  setOpenCMT((prevState) => (prevState === postId ? null : postId));
};
  
const handleCreateCMT = (postId) => {
  createComment(postId, createCMT);
  setCreateCMT('');
};

 console.log(id,': use');



 //user profile getting..............
 useEffect(()=>{
  const getUsers = async()=>{
    try{
      const response = await axios.get('https://social-media-5ukj.onrender.com/user/');
      console.log(response);
      const allUsers = await response.data
      console.log(response.data);
      // console.log(allUsers,'****************')
      setAllusers(allUsers)
      const foundUser = allUsers.find(x => String(x._id) === String(id));
        if (foundUser) {
          console.log('foun-----------------------------d',foundUser);
          setVUser(foundUser);
          console.log(userV)
        } 
    }
    catch(error){
      toast.error('NetWork Error')
      console.log(error.response);
    } 
  }
  getUsers()
},[id])


//display followersof that user................
const getFollowersProfile = () => {
  if (!followersFetched && userV.followers) {
    userV.followers.forEach((followerId) => {
      const followedUser = allUsers.find(user => user._id === followerId);
      if (followedUser) {
        setFollowedUsers(prevFollowedUsers => [...prevFollowedUsers, followedUser]);
      }
    });
    setFollowersFetched(true);
  }
};



//user post display.....................
useEffect(() => {
  const getPosts = async () => {
    try {
      if (id !== null) {
        console.log(id, ': user idddddddddddddddddddddddddddddddddddddd11111111111111111111');
        console.log(userV, 'clicked user id//////////////////////');
        const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${id}/timeline`);
        console.log(response, 'responseeeeeeeeeeeeeeeeeeeeeeeeee');
        console.log(response.data, 'post get responseeeeeeeeeeeeeeeeeeeeeeeeee');
        const fPost = response.data.filter((x)=>x.userId == id)
        if (response.data.length !== 0) {
          setPosts(fPost);
          console.log('filtered post=============================',fPost);
        }
        else{
          console.log('no post found!');
        }        
      }
    } catch (error) {
      console.log(error.response, 'get error'); 
    }
  };
  getPosts();
}, [id]);


// useEffect(() => {
//   console.log('Current User:', currentUser);
//   console.log('UserV:', userV);
// }, [currentUser, userV]);

console.log('postsss--------------------------------------',post);
console.log(followedUsers,'---------------------------followedUsers------------********************');


const [followersU, setFollowersU] = useState([]);
const [showFollowers, setShowFollowers] = useState(false);
const [followingU, setFollowingU] = useState([]);
const [showFollowing, setShowFollowing] = useState(false);
const [fUsers,setFusers] = useState('default');


//followers/following user display
const handleShowFollowers = () => {
  setFusers('followers');
  if (userV && userV.followers && data.allUsers) {
    const followersId = userV.followers;
    const foundUsers = data.allUsers.filter(user => followersId.includes(user._id));
    setFollowersU(foundUsers);
    console.log('followers', foundUsers);
    setShowFollowers(true);
  }
};
const handleShowFollowing = () => {
  setFusers('following');
  if (userV && userV.following && data.allUsers) {
    const followingId = userV.following;
    const foundUsers = data.allUsers.filter(user => followingId.includes(user._id));
    setFollowingU(foundUsers);
    console.log('following', foundUsers);
    setShowFollowing(true);
  }
};


  return (
    <div className='flex flex-col w-screen h-screen bg-[#D9D9D9] dark:bg-zinc-700 dark:text-white text-black'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='flex flex-col h-1/6 sm:h-2/6 md:h-2/6 items-center dark:bg-zinc-700'>
      <div className='w-screen h-2/4 object-cover'>
          <img className='sm:rounded-b-md  relative h-full w-full lg:rounded-b-full' src="https://www.dndspeak.com/wp-content/uploads/2021/04/Temple-1-768x512.jpg" alt="" />
          <Link className='absolute top-3 left-3' href='/home' >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </Link>
        </div>

        <div  className='bg-[#FFFFFF] h-2/4  flex flex-col w-4/5 rounded-b-3xl dark:bg-zinc-800'>
            <div className='pl-1'>
              <img  src=" https://i.pinimg.com/564x/58/bc/a3/58bca38c4d21f72acb56ff32c99831fb.jpg" alt="profilePic"  className='rounded-full border-white border-4 md:w-28 md:h-28 md:-top-16 h-16 w-16 relative -top-12' />
              </div>
            <div className='flex justify-between -mt-12 md:-mt-10 pl-5 pr-5  relative'>
            {userV?<>
                <div className='flex justify-evenly w-1/3 top-5 text-black  dark:text-white'>
                    
                    <div className='text-sm'>
                    <h5>{userV.username}</h5>
                    <p>{userV.email}</p>
                    </div>
                    {/* <div className='rounded-md bg-emerald-800 w-14 h-10 text-white cursor-pointer flex items-center justify-center hover:bg-emerald-700'>Follow</div> */}
                    
                    
                    {userV&&currentUser ?
                    <>
                    {userV._id !== currentUser._id ? 
                    <>
                    <FollowButton userId={userV._id} currentUser={currentUser}/>

                    </>
                    :
                    <></>  
                  }                    
                    </>:
                    <>
                    </>}
                    
                </div>
                
                
                <div className='cursor-pointer text-sm' onClick={getFollowersProfile}>
                  <p className='pr-3 cursor-pointer'onClick={handleShowFollowers}>followers:  {userV.followers ? userV.followers.length : 0}</p>
                  <p className='cursor-pointer' onClick={handleShowFollowing}>following: {userV.following ? userV.following.length : 0}</p>
                </div>

                </>:<div>Loading</div>}
            </div>

        </div>
    </div>












    <div className=' flex justify-around h-5/6 w-screen bg-[hsl(0,0%,85%)] dark:bg-zinc-600'>
      <div className='md:flex w-2/5 md:flex-col h-fit  md:justify-start pt-5 bg-[#FFFFFF] m-1 rounded-2xl hidden dark:bg-zinc-800'>
      {fUsers === 'default' ? (
          <>
            <p className='flex justify-center items-center'>Suggestions</p>
            
        </>
        ) : fUsers === 'followers' ? (
          <>
            <p>Followers</p>
            {showFollowers && (
              <div>
                {followersU.map(user => ( 
                  <div key={user._id} className="flex w-full relative  justify-between items-center md:justify-around bg-emerald-50 rounded-lg p-4 pr-0 dark:bg-zinc-900">
                    
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
                  {user._id !== currentUser._id?
                    <>
                      <FollowButton userId={user._id} currentUser={currentUser} />
                    </>
                    :
                    <>
                    </>
                  }
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
                  <div key={user._id} className="flex w-full relative  justify-between items-center md:justify-around bg-emerald-50 rounded-lg p-4 dark:bg-zinc-900">
                    
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
                  {user._id !== currentUser._id?
                    <>
                      <FollowButton userId={user._id} currentUser={currentUser} />
                    </>
                    :
                    <>
                    </>
                  }
              
                  </div>
                ))}
              </div>
            )}
            
          </>
        )}
    </div>




    <div className='w-4/5 text-center bg-[#FFFFFF] m-3 rounded-2xl sm:w-4/5 overflow-auto  dark:bg-zinc-900' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
    <div className='flex justify-evenly m-3 '>
     
      {post && post.length > 0 ? (
    <div className='flex w-full flex-col h-fit justify-items-center  rounded-lg'>
    {post.map((item) => (
    <div className='bg-emerald-50 rounded-xl mb-3  dark:bg-zinc-800' key={item._id}>
      
      <div className="flex justify-between items-center">
        <div className='flex flex-col'>
          {/* <img className='rounded-full w-16 h-16' src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg" alt="" /> */}
          {/* <h4 className='relative left-5'>{item._id}</h4><br /> */}
          <p>{item.desc}</p>
        </div>
  </div>
  <div className='flex justify-center relative '><img className='pl-7 pr-7 w-full h-52 object-cover rounded-3xl' src={item.image} alt=""/> </div>
  
  <div className='flex justify-around mb-5'>
        <div className='flex '>
            <LikeBtn postID={item._id} />
        </div>
        <button onClick={() => commentClick(item._id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        </button>
        <ShareButtons url={`http://localhost:3000//posts/${item._id}`} title={item.desc}/>
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
                      <div className='flex '>{comment.text}
                      {
                        currentUser._id == comment.userId ?
                          <>
                            <EditCMTButton commentId={comment._id} postId={item._id} />
                            <CmtDeleteBTN commentId={comment._id} postId={item._id} />
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
        <hr className='mb-8'/>
      </div>
      ))}
      </div>
      ) : (
      <div>NO Post Yet...!</div>
      )}  
      </div>
      <div>
        
      </div>
      </div>
    </div>  
    </div>
  );
};

export default UserProfile;
