

import React, { useContext, useState, useEffect } from 'react';
import AppContext from '@/app/context/myContext';

function LikeBtn({ postID }) {
  const { likeUnlikePost, posts } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const post = posts.find((p) => p._id === postID);
    if (post && post.likes.includes(localStorage.getItem('id'))) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [posts, postID]);

  const handleLikeUnlike = async () => {
    try {
      await likeUnlikePost(postID);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error occurred while liking/unliking post:', error);
    }
  };

  return (
    <button
      className={`rounded-full text-white w-10 ${
        isLiked ? 'bg-red-500' : 'bg-emerald-900'
      }`}
      onClick={handleLikeUnlike}
    >
      {isLiked ? 'Unlike' : 'Like'}
    </button>
  );
}

export default LikeBtn;