'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import './style.css';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [data, setData] = useState({ allUsers: [], lusers: [] });
  const [emailid,cEmail] = useState(null)
  const [currentUser,setCUser] = useState([]);


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://social-media-5ukj.onrender.com/user/');
        const allUsers = response.data;
        console.log(allUsers,'allsers');
        // const lusers = allUsers.slice(0, 6);

        const shuffledUsers = allUsers.sort(() => Math.random() - 0.5);
        const lusers = shuffledUsers.slice(0, 6);

        const cId = localStorage.getItem('email');
        cEmail(cId);
        console.log(cId,'email iddddddddddddddddddddddddddddddddddddddddddddddddd');
        setData({ allUsers, lusers });
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({ allUsers: [], lusers: [] });
      }
    };
    fetchData();
  }, []);


const { allUsers, lusers } = data;


useEffect(() => {
  if (allUsers && emailid) {
    console.log('entered in if');
    console.log(allUsers, 'x in if');
    console.log(emailid, 'c in if');
    const foundUser = allUsers.find(user => user.email === emailid);
    console.log(foundUser,'user foundddddddddddddddddddddddddddd')
    if (foundUser) {
      setCUser(foundUser);
    }
  }
}, [allUsers]); 
  

const handleFollow = async (userId) => {
  console.log('---------------------follow----------------------');
  try {
    const currentUserId = currentUser._id;
    console.log(userId, ': user to follow');
    

    const requestBody = { _id: currentUserId };
    const followUrl = `https://social-media-5ukj.onrender.com/user/${userId}/follow`;

    const authToken = localStorage.getItem('token')
    console.log(authToken,'authToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };
    const follow_response = await axios.put(followUrl, requestBody,config);
    console.log('follow response', follow_response.data);
  } catch (error) {
    toast.error(error.response.data);
  }
  console.log('-----------------------follow end----------------------');
};


const handleUnfollow = async (userId)=>{
  try{
    const currentUserId = currentUser._id;
    const requestBody = { _id: currentUserId };

    const unfollowUrl = `https://social-media-5ukj.onrender.com/user/${userId}/unfollow`;
    const authToken = localStorage.getItem('token')

    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };
    const unfollow_response = await axios.put(unfollowUrl, requestBody,config);
    console.log('Unfollow response', unfollow_response.data);

  }catch(error){
    toast.error(error.response.data);
    console.log(error.response.data)
  }
}

















  return (
    <div>
      <Navbar />
      <div className='flex w-screen h-screen sm:justify-center'>
        <div className='md:flex md:flex-col hidden  w-1/4 recomentedDiv text-center sm:hidden'>
          <p>Recommended users:</p>
          {lusers.map((x) => (
            <div className='flex usersDiv md:justify-around' key={x._id}>
              <div className='profileImgDiv'>

              <Link href={`/userProfileView/${x._id}`} >
                  <img
                    className="rounded-full lg:flex profilePic md:hidden"
                    src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg"
                    alt=""
                  />
                </Link>


                {/* <Link href={{
                  pathname:'/userProfileView/',
                  query:{
                    userid:x._id
                  }
                }} >
                  <img
                    className="rounded-full lg:flex profilePic md:hidden"
                    src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg"
                    alt=""
                  />
                </Link> */}
              </div>
              <p className='username md:flex'>{x.username}</p>
              
              {x.followers.includes(currentUser._id) ?<button className='followBTN' onClick={()=>handleUnfollow(x._id)}>unfolllow</button>: <button className='followBTN' onClick={() => handleFollow(x._id)}>Follow</button>}
              

              {/* <button className='followBTN '>follow</button> */}
            </div>
          ))}
        </div>
        <div className='bg-white w-3/4 feedDiv '>
          <div className='headingFeedDiv'>
            <a href="">follwers</a>
            <a href="">discover</a>
            <a href="">mypost</a>
          </div>
          <div>
            <div className='feedImgDiv'>
              <div>
                <div className="userPic flex justify-between items-center">
                  <div className='flex '>
                    <img className='rounded-full w-16 h-16' src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg" alt="" />
                    <h4 className='relative left-5'>name</h4>
                  </div>
                  <button className=' rounded-full text-white bg-emerald-400 hover:bg-emerald-500 text-sm w-16 h-10'>follow</button>
                </div>
              </div>
              <div className='flex justify-center '><img className='feedimg' src="https://i.pinimg.com/564x/8b/f9/c2/8bf9c277bd665c64ad71df0d1c6334ca.jpg" alt="" /></div>
              <div className='flex justify-around'>
                <button>like</button>
                <button>comment</button>
                <button>share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
