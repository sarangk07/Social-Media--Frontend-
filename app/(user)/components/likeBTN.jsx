'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'

function LikeBtn({postID}) {
        const [responseText,setRT] = useState(null);
        const userId = localStorage.getItem('id');
        

        const likeAndUnlike = async ()=>{
            try{
                console.log(postID,'postId');   
                const userId = localStorage.getItem('id');
                if (!userId) {
                    console.error('User ID not found in localStorage');
                    return;
                }
                console.log(userId,'userid');
                const fData = {
                    "userId": userId
                }
                const response = await axios.put(`https://social-media-5ukj.onrender.com/posts/${postID}/like`,fData)
                console.log(response);
                setRT(response.data)

            }catch{
                console.log('error!');
                console.error('Error occurred while liking/unliking post:', error);
            }



        }
    


  return (
    <>
     <button className='rounded-full bg-emerald-900 text-white w-10' onClick={likeAndUnlike}>
            {responseText === 'Post liked' ? 'unlike' : 'like'}
        </button>
      
    </>
  )
}

export default LikeBtn
