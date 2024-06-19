'use client'

import { useContext, useEffect, useState,useRef } from 'react';
import AppContext from '@/app/context/myContext';

import Link from 'next/link';


import FollowersPost from '../components/FollowersPost';
import Allpost from '../components/AllPosts';
import LoginUserPosts from '../components/LoginUserPost';

function PostSection() {
  const { data } = useContext(AppContext);
  const fieldArray = ['discover', 'followers', 'mypost']
  const [field,setField] = useState(fieldArray[0]);
  const [changes, setChange] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const searchInputContainer = useRef(null);
  const clickPoint = useRef();
  const [isFocused, setIsFocused] = useState(false); 


  //-------search functionalities---------
  const SearchClick = () => {
    if (changes.trim() !== '') {
      const filtered = data.allUsers.filter((user) =>
        user.username.toLowerCase().includes(changes.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleOutsideClick = (event) => {
    if (
      searchInputContainer.current &&
      !searchInputContainer.current.contains(event.target)
    ) {
      setFilteredUsers([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleFocus = () => {
    clickPoint.current.style.display = "none";
    setIsFocused(true);

  };

  const handleBlur = () => {
    setTimeout(() => {
      clickPoint.current.style.display = 'block';
      setIsFocused(false);
    }, 200);
  };



  return (
    <>
    <div className='bg-white w-full flex flex-col rounded-2xl mt-2 ml-2 mr-2 -mb-3 p-1 h-screen  dark:bg-black dark:text-white overflow-hidden'>
   
    <div className="items-center  px-4 flex justify-center" >
    <div className="relative mr-3 " ref={searchInputContainer}>
            <div className="absolute top-3 left-3 items-center" ref={clickPoint}>
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-input"
              className="block focus:border-none  border-none p-2 pl-10 w-54 md:w-72 lg:w-72 xl:w-72 text-emerald-600 bg-gray-50  dark:bg-zinc-200 rounded-lg border border-gray-300 focus:pl-3"
              placeholder="Search . . ."
              value={changes}
              onChange={(e) => {
                setChange(e.target.value);
                SearchClick();
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            {isFocused && filteredUsers.length > 0 && (
              <div className="absolute bg-white shadow-md rounded-md mt-2 w-full z-10">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer dark:text-white text-black"
                  >
                    <Link href={`/userProfileView/${user._id}`}  key={user._id} passHref>
                    <img
                      src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    
                    <span className="dark:text-black text-black">{user.username}</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      <div className='m-2 flex justify-around'>
        <button href="" onClick={()=>setField(fieldArray[1])} className='focus:text-emerald-500'>followers</button>
        <button href="" onClick={()=>setField(fieldArray[0])} className='focus:text-emerald-500'>discover</button>
        <button href="" onClick={()=>setField(fieldArray[2])} className='focus:text-emerald-500'>mypost</button>
      </div>
      <div className='m-3 h-screen overflow-y-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
{/*----------------------- All users post display -----------------------*/}
        {field == 'discover'?
          <>
          <Allpost/>
          </>  
            :
          <>
{/*----------------------- followed users post display -----------------------*/}
          {field == 'followers'?
          <>
          <FollowersPost/>
          </>
             :
          <>
{/*----------------------- Current users post display -----------------------*/}
            <LoginUserPosts/>
          </>
          }
          </>           
        }
    </div>
  </div>
    </>
  )
}

export default PostSection
