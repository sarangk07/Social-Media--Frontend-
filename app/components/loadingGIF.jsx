import React from 'react';


function LoadingGIF() {
  

  return ( 
   <div className='flex flex-col justify-center text-center'>
    <h1 className='animate-pulse'>Loading......</h1>
    <img src="/ZNet.gif" alt="" />
   </div>
  );
}

export default LoadingGIF;
