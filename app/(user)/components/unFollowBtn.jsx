'use client'

import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const UnfollowButton = ({ userId, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnFollowing, setIsUnFollowing] = useState(false);

  const handleUnfollow = async () => {
    try {
      setIsLoading(true);

      const currentUserId = currentUser._id;
      const requestBody = { _id: currentUserId };

      const unfollowUrl = `https://social-media-5ukj.onrender.com/user/${userId}/unfollow`;
      const authToken = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      };

      const unfollow_response = await axios.put(unfollowUrl, requestBody, config);
      console.log('Unfollow response:', unfollow_response.data);

      setIsLoading(false);
      setIsUnFollowing(true)
      toast.success('Unfollowed!')

    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <>
    <Toaster
          position="top-center"
          reverseOrder={false}
        />
    
    <button className='rounded-md bg-gray-400 text-yellow-200' onClick={handleUnfollow} disabled={isUnFollowing} >
        
        {isLoading ? 'Unfollowing...' : (isUnFollowing ? 'Follow' : 'Unfollow')}
    </button>
    </>
  );
};


export default UnfollowButton;
