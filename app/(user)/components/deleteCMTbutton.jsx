import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';


function CmtDeleteBTN({ commentId, postId }) { 
  const handleDeleteCMT = async () => {
    try {
      const currentUserId = localStorage.getItem('id');
      console.log('commentID: ', commentId, ' postID: ', postId, ' currentUser: ', currentUserId);

      const response = await axios.delete(
        `https://social-media-5ukj.onrender.com/posts/${postId}/comment/${commentId}`,
        {
          data: { userId: currentUserId }
        }
      );

      console.log(response.data, ': delete comment response!');
      toast.success('comment deleted!')
    } catch (error) {
      console.error('There was an error deleting the comment:', error);
      toast.error('somthing went wrong!')
    }
  }

  return (
    <div>
      <button  onClick={handleDeleteCMT} className='pl-3'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
      </button>
    </div>
  );
}

export default CmtDeleteBTN; 
