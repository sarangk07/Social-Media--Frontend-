'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const FollowButton = ({ userId, currentUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Checking user is already following
    const isUserFollowing =
      currentUser && currentUser.following
        ? currentUser.following.includes(userId)
        : false;
    setIsFollowing(isUserFollowing);
  }, [currentUser, currentUser.following, userId]);

  const handleFollowUnfollow = async () => {
    try {
      setIsLoading(true);
      const currentUserId = currentUser?._id;
      const requestBody = { _id: currentUserId };

      const url = isFollowing
        ? `https://social-media-5ukj.onrender.com/user/${userId}/unfollow`
        : `https://social-media-5ukj.onrender.com/user/${userId}/follow`;
      const authToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.put(url, requestBody, config);
      console.log(response.data);

      setIsLoading(false);
      setIsFollowing(!isFollowing);
      toast.success(isFollowing ? 'Unfollowed' : 'Followed');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <>
      <button
        className={`rounded-md p-1 text-sm hover:text-black ${
          isFollowing ? 'bg-orange-300' : 'bg-emerald-300'
        }`}
        onClick={handleFollowUnfollow}
        disabled={isLoading}
      >
        {isLoading
          ? isFollowing
            ? 'Unfollowing...'
            : 'Following...'
          : isFollowing
            ? 'Unfollow'
            : 'Follow'}
      </button>
    </>
  );
};

export default FollowButton;