import axios from 'axios';
import React from 'react';

function PostDeleteBTN({ postId }) {
    const handleDelete = async () => {
        const id = localStorage.getItem('id');
        const authToken = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: {
                userId: id
            }
        };

        try {
            const response = await axios.delete(`http://social-media-5ukj.onrender.com/posts/${postId}`, config.data);
            console.log(response.data, 'delete post response!');
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} className='rounded-md bg-red-500 text-white'>Delete</button>
        </div>
    );
}

export default PostDeleteBTN;
