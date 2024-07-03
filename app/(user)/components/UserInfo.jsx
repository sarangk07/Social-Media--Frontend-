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

    const logOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
    };
  

  

  //Auth--------------
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     router.push('/login');
  //   }
    
  // }, []);


 
  

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
     
        <Link href='/' onClick={logOut}className='pr-2 pt-2 flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-orange-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg> LogOut
        </Link>
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
