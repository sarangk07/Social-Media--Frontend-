import axios from 'axios';
import React from 'react';

function CmtDeleteBTN({ commentId, postId }) {  // Use destructuring for props
  const handleDeleteCMT = async () => {
    try {
      const currentUserId = localStorage.getItem('id');
      console.log('commentID: ', commentId, ' postID: ', postId, ' currentUser: ', currentUserId);

      const response = await axios.delete(
        `https://social-media-5ukj.onrender.com/posts/${postId}/comment/${commentId}`,
        {
          data: { userId: currentUserId }  // Use 'data' property to send the userId in the request body
        }
      );

      console.log(response.data, ': delete comment response!');
    } catch (error) {
      console.error('There was an error deleting the comment:', error);
    }
  }

  return (
    <div>
      <button className='rounded-md text-white bg-red-500' onClick={handleDeleteCMT}>Remove</button>
    </div>
  );
}

export default CmtDeleteBTN;
