
import Navbar from '@/app/components/Navbar'
import Link from 'next/link';
import './style.css';
import { use } from 'react';

async function getData() {
  const response = await fetch('https://social-media-5ukj.onrender.com/user/');
  const allUsers = await response.json();
  const lusers = allUsers.slice(0, 6);
  return { allUsers, lusers };
}

export default function Home() {
  const { allUsers, lusers } = use(getData());
  return (
    <div>
      <Navbar />
      <div className='flex w-screen h-screen'>
        <div className='w-1/4 recomentedDiv text-center'>
          <p>Recommended users:</p>
          {lusers.map((x) => (
            <div className='flex usersDiv' key={x._id}>
              <div className='profileImgDiv'>
                <img
                  className='rounded-full profilePic'
                  src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg"
                  alt=""
                />
              </div>
              <p className='username'>{x.username}</p>
              <button className='followBTN'>follow</button>
            </div>
          ))}
        </div>
        <div className='bg-white w-3/4 feedDiv '>
          
          {/* <p>Feed section</p> */}
          
          <div className='headingFeedDiv'>
            <a href="">follwers</a>
            <a href="">discover</a>
            <a href="">mypost</a>
          </div>
          <div>
          
            <div className='feedImgDiv'>
              <div>
                <div className="userPic">
                  <img src="" alt="" />
                </div>
                <h4>name</h4>
                <p>content///////////////</p>
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