'use client';

import { useContext, useEffect } from 'react';
import AppContext from '@/app/context/myContext';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import FollowButton from '../components/followBTN';
import UnfollowButton from '../components/unFollowBtn';

export default function Home() {
  const { data, currentUser, allposts, loading } = useContext(AppContext);

  if (loading) {
    return toast.loading('Loading...');
  }

  return (
    <div className='bg-emerald-100 text-gray-700'>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className='flex w-screen h-screen sm:justify-center'>
        <div className='md:flex md:flex-col hidden w-1/4 mt-3 mr-3 p-3 rounded-3xl bg-white text-center sm:hidden'>
          <p>Recommended users:</p>
          {data.lusers.map((x) => (
            <div className='flex w-full m-1 justify-between items-center md:justify-around bg-emerald-50 rounded-lg p-4' key={x._id}>
              <div className='w-1/3'>
                <Link href={`/userProfileView/${x._id}`}>
                  <div className="w-12 h-12 lg:flex md:hidden rounded-full bg-emerald-300 flex items-center justify-center">
                    <span className="text-gray-700 text-xl font-bold">
                      {x.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Link>
              </div>
              <p className='w-2/5 overflow-hidden md:flex'>{x.username}</p>
              {x.followers.includes(currentUser._id) ? (
                <UnfollowButton userId={x._id} currentUser={currentUser} />
              ) : (
                <FollowButton userId={x._id} currentUser={currentUser} />
              )}
            </div>
          ))}
        </div>
        <div className='bg-white w-full flex flex-col rounded-2xl m-2 p-5 h-full'>
          <div className='m-5 flex justify-around'>
            <a href="">followers</a>
            <a href="">discover</a>
            <a href="">mypost</a>
          </div>
          <div className='m-6 h-screen overflow-y-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {allposts && allposts.length > 0 ? (
              <div className='flex w-full flex-col h-fit justify-items-center rounded-lg'>
                {allposts.map((item) => (
                  <div className='bg-emerald-50 rounded-xl mb-8' key={item._id}>
                    <div className="flex justify-between items-center">
                      <div className='flex flex-col'>
                        <img className='rounded-full w-16 h-16' src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg" alt="" />
                        <h4 className='relative left-5'>{item._id}</h4><br />
                        <p>{item.desc}</p>
                      </div>
                      {item.userId == currentUser._id ? (
                
                        <></>
                      ) : (
                        data.allUsers.map((x) => (
                          <div key={x._id}>
                            {x.followers.includes(currentUser._id) ? (
                              // <UnfollowButton userId={x._id} currentUser={currentUser} />
                              <></>
                            ) : (
                              // <FollowButton userId={x._id} currentUser={currentUser} />
                              <></>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    <div className='flex justify-center relative'>
                      <img className='pl-7 pr-7 w-full h-52 object-cover rounded-3xl' src={item.image} alt="" />
                    </div>
                    <div className='flex justify-around mb-5'>
                      <button>like</button>
                      <button>comment</button>
                      <button>share</button>
                    </div>
                    <hr className='mb-8' />
                  </div>
                ))}
              </div>
            ) : (
              <div>NO Post Yet...!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
