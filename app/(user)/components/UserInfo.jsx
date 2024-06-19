'use client';

import { useContext, useEffect, useState,useRef } from 'react';
import AppContext from '@/app/context/myContext';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation'; 


function UserInfo() {

    // const [id, setId] = useState(null);
    const recommendedUsersRef = useRef([]);
    const router = useRouter();
    const { data, currentUser, loading} = useContext(AppContext);



  

  //Auth--------------
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    // else{
    //   setId(localStorage.getItem('id'))
    // }
  }, []);


 
  

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



// //followers/following user display
// const handleShowFollowers = () => {
//   setFusers('followers');
//   if (currentUser && currentUser.followers && data.allUsers) {
//     const followersId = currentUser.followers;
//     const foundUsers = data.allUsers.filter(user => followersId.includes(user._id));
//     setFollowersU(foundUsers);
//     console.log('followers', foundUsers);
//     setShowFollowers(true);
//   }
// };
// const handleShowFollowing = () => {
//   setFusers('following');
//   if (currentUser && currentUser.following && data.allUsers) {
//     const followingId = currentUser.following;
//     const foundUsers = data.allUsers.filter(user => followingId.includes(user._id));
//     setFollowingU(foundUsers);
//     console.log('following', foundUsers);
//     setShowFollowing(true);
//   }
// };



  if (loading) {
    return toast.loading('Loading...');
  }

  return (
    <>
    <div  className='md:flex md:flex-co h-fit md:justify-center hidden w-1/4 mt-3 mr-3 p-3 rounded-3xl dark:bg-black dark:text-white bg-white text-center sm:hidden'>
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
            <div className='font-extralight text-sm cursor-pointer' >followers</div>
          </div>
          <div>
            <div> {currentUser.followers&&currentUser.following.length}</div>
            <div className='font-extralight text-sm cursor-pointer'>followings</div>
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
    </>
  )
}

export default UserInfo
