


// const handleUpload = (e)=>{
//     e.preventDefault()
//     useEffect(()=>{
//         const uploadMedia = async ()=>{
    
//             const id = localStorage.getItem('id')
    
//             const response = await axios.post(`https://social-media-5ukj.onrender.com/createPost`,{
//                 desc:selectedFile,
//                 userId:id
//             })
//             close.log(response)
//         }
//         uploadMedia()
//     },[])
// }








'use client'


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption,setCaption] = useState(null);

  const handleCaption = (e)=>{
    setCaption(e.target.value)
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
    console.log(caption,'captions');




const handleUpload = async (e) => {
    e.preventDefault(); 
    

    try {

    const id = localStorage.getItem('id');  
    const formData = new FormData();
    formData.append('desc', caption); 
    formData.append('userId', id);
    formData.append('file', selectedFile);



        const response = await axios.post(`https://social-media-5ukj.onrender.com/createPost`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      console.log(response,': RESPONSEEEEEEEE');
      if(response.status == 200){
        toast.success('file Uploaded!')
      }else{
        toast.error('somthing went wrong!')
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };







  return (
    <div className='bg-gray-900 text-gray-50 h-screen w-screen flex flex-col'>
      <Toaster
          position="top-center"
          reverseOrder={false}
        />
      <form className='text-center ' onSubmit={handleUpload} >
        <h1>Upload images or videos</h1><br />
        <input className='border m-3' type="file" name='file' onChange={handleFileChange} /><br />
        <input className='text-white border-none bg-gray-900 m-3' type="text" onChange={handleCaption} placeholder='type a caption' /><br />
        {selectedFile&&caption?
        <button type='submit' className='rounded-lg w-16 bg-lime-600 text-white m-3'>Upload</button>
        :
        <button type='submit' className='rounded-lg w-16 bg-lime-600 text-white m-3' disabled>Upload</button>
        }
      </form>
      {selectedFile && (
        <div className='flex flex-col items-center'>
          <h2>Preview:</h2>
          {selectedFile.type.startsWith('image/') ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '30%' }} />
          ) : selectedFile.type.startsWith('video/') ? (
            <video controls style={{ maxWidth: '30%' }}>
              <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>File type not supported for preview.</p>
          )}
        </div>
        
      )}
    </div>
  );
}

export default Upload;

