import axios from 'axios';
import React, { useState } from 'react';

function EditCMTButton({ postId, commentId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text,setText] = useState('');
    const id = localStorage.getItem('id')

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    console.log('postId: ',postId, 'commetId: ',commentId , 'text: ',text, ' id :', id);
    
    try{
        const response = await axios.put(`https://social-media-5ukj.onrender.com/posts/${postId}/comment/${commentId}`,{
            "userId": id,
            "text": text
        })
        console.log('response data:', response.data);
    }catch(error){
        console.log(error);
    }


    closeModal();
  };

  return (
    <div>
      <button
        className='rounded-sm bg-gray-700 text-white'
        onClick={openModal}
      >
        Edit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-xl mb-4">Edit Comment</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              defaultValue={text}
              onChange={(e)=>setText(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCMTButton;
