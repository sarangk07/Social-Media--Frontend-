'use client';

import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const FollowButton = ({ userId, currentUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    console.log('---------------------follow----------------------');
    try {
      setIsLoading(true);
      const currentUserId = currentUser._id;
      console.log(userId, ': user to follow');
      
      const requestBody = { _id: currentUserId };
      const followUrl = `https://social-media-5ukj.onrender.com/user/${userId}/follow`;
      const authToken = localStorage.getItem('token')

      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      };

      const follow_response = await axios.put(followUrl, requestBody, config);
      console.log('follow response', follow_response.data);
      
      
      setIsLoading(false);
      setIsFollowing(true);
      toast.success('followed')
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
      console.log(error.response.data);
    }
    console.log('-----------------------follow end----------------------');
  };

  return (
    <>
     <Toaster
          position="top-center"
          reverseOrder={false}
        />
    <button className='rounded-md p-2 hover:bg-emerald-300 hover:text-black bg-white text-gray-800' onClick={handleFollow} disabled={isFollowing}>
         {isLoading ? 'following...' : (isFollowing ? 'Unfollow' : 'Follow')}
      {/* {isFollowing ? 'unfollow' : 'Follow'} */}
    </button>
    </>

  );
};

export default FollowButton;
