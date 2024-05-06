'use client';


// import Navbar from '@/app/components/Navbar'
// import Link from 'next/link';
// import './style.css';
// import { use } from 'react';

// async function getData() {
//   const response = await fetch('https://social-media-5ukj.onrender.com/user/');
//   const allUsers = await response.json();
//   const lusers = allUsers.slice(0, 6);
//   return { allUsers, lusers };
// }

// export default function Home() {
//   const { allUsers, lusers } = use(getData());
//   return (
//     <div>
//       <Navbar />
//       <div className='flex w-screen h-screen sm:justify-center'>
//         <div className='md:flex md:flex-col  w-1/4 recomentedDiv text-center sm:hidden'>
//           <p>Recommended users:</p>
//           {lusers.map((x) => (
//             <div className='flex usersDiv md:justify-around' key={x._id}>
//               <div className='profileImgDiv'>
//                 <img
//                   className='rounded-full lg:flex profilePic md:hidden'
//                   src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg"
//                   alt=""
//                 />
//               </div>
//               <p className='username md:flex'>{x.username}</p>
//               <button className='followBTN '>follow</button>
//             </div>
//           ))}
//         </div>
//         <div className='bg-white w-3/4 feedDiv '>
          
//           {/* <p>Feed section</p> */}
          
//           <div className='headingFeedDiv'>
//             <a href="">follwers</a>
//             <a href="">discover</a>
//             <a href="">mypost</a>
//           </div>
//           <div>
          
//             <div className='feedImgDiv'>
//               <div>
//                 <div className="userPic flex justify-between items-center">
//                   <div className='flex '>
//                     <img className='rounded-full w-16 h-16' src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg" alt="" />
//                     <h4 className='relative left-5'>name</h4>
//                   </div>
//                   <button className=' rounded-full text-white bg-emerald-400 hover:bg-emerald-500 text-sm w-16 h-10'>follow</button>
//                 </div>
                
//                 {/* <p>content///////////////</p> */}
//               </div>
//               <div className='flex justify-center '><img className='feedimg' src="https://i.pinimg.com/564x/8b/f9/c2/8bf9c277bd665c64ad71df0d1c6334ca.jpg" alt="" /></div>
              

//               <div className='flex justify-around'>
//               <button>like</button>
//               <button>comment</button>
//               <button>share</button>
//               </div>
              
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import './style.css';

export default function Home() {
  const [data, setData] = useState({ allUsers: [], lusers: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://social-media-5ukj.onrender.com/user/');
        const allUsers = response.data;
        const lusers = allUsers.slice(0, 6);
        setData({ allUsers, lusers });
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({ allUsers: [], lusers: [] });
      }
    };
    fetchData();
  }, []);

  const { allUsers, lusers } = data;

  return (
    <div>
      <Navbar />
      <div className='flex w-screen h-screen sm:justify-center'>
        <div className='md:flex md:flex-col  w-1/4 recomentedDiv text-center sm:hidden'>
          <p>Recommended users:</p>
          {lusers.map((x) => (
            <div className='flex usersDiv md:justify-around' key={x._id}>
              <div className='profileImgDiv'>
                <img
                  className='rounded-full lg:flex profilePic md:hidden'
                  src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg"
                  alt=""
                />
              </div>
              <p className='username md:flex'>{x.username}</p>
              <button className='followBTN '>follow</button>
            </div>
          ))}
        </div>
        <div className='bg-white w-3/4 feedDiv '>
          <div className='headingFeedDiv'>
            <a href="">follwers</a>
            <a href="">discover</a>
            <a href="">mypost</a>
          </div>
          <div>
            <div className='feedImgDiv'>
              <div>
                <div className="userPic flex justify-between items-center">
                  <div className='flex '>
                    <img className='rounded-full w-16 h-16' src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg" alt="" />
                    <h4 className='relative left-5'>name</h4>
                  </div>
                  <button className=' rounded-full text-white bg-emerald-400 hover:bg-emerald-500 text-sm w-16 h-10'>follow</button>
                </div>
              </div>
              <div className='flex justify-center '><img className='feedimg' src="https://i.pinimg.com/564x/8b/f9/c2/8bf9c277bd665c64ad71df0d1c6334ca.jpg" alt="" /></div>
              <div className='flex justify-around'>
                <button>like</button>
                <button>comment</button>
                <button>share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
