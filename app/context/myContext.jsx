'use client';

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ allUsers: [], lusers: [] });
  const [emailid, setEmail] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [allposts,setAllPosts] = useState([]);



  //login----------
  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await axios.post('https://social-media-5ukj.onrender.com/auth/login', {
        email,
        password
      });

      if (response.status === 200) {
        setUser({ email });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        router.push('home');
        toast.success('Login success');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      if (!error.response) {
        toast.error('Network error!');
      } else {
        const status = error.response.status;
        if (status === 401) {
          toast.error('Unauthorized User!');
        } else if (status === 404) {
          toast.error('No user found with the given data!');
        } else if (status === 500) {
          toast.error('Server error! Please try again later!');
        } else {
          toast.error('Something went wrong!');
        }
      }
    } finally {
      setLoading(false);
    }
  };



  //Allusers + random 10 users ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://social-media-5ukj.onrender.com/user/');
        const allUsers = response.data;

        const shuffledUsers = allUsers.sort(() => Math.random() - 0.5);
        const lusers = shuffledUsers.slice(0, 6);

        const cId = localStorage.getItem('email');
        setEmail(cId);

        setData({ allUsers, lusers });
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({ allUsers: [], lusers: [] });
      }
    };
    fetchData();
  }, []);





  //CurrentUser----------
  useEffect(() => {
    if (data.allUsers && emailid) {
      const foundUser = data.allUsers.find(user => user.email === emailid);
      if (foundUser) {
        setCurrentUser(foundUser);
        localStorage.setItem('id', foundUser._id);
      }
    }
  }, [data.allUsers, emailid]);




  //PostOfAUser----------
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${id}/timeline`);
        setPosts(response.data);
      } catch (error) {
        if (error.response.status === 500) {
          toast.error('Server not responding...!..');
        }
      }
    };

    if (currentUser._id) {
    fetchPosts();
  }
  }, [currentUser]);


/// All users Posts----------
useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allPosts = [];
        for (const user of data.allUsers) {
          if (user._id === '6646f9633ce360059d6ea7d5') {
            continue;
          }
          const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${user._id}/timeline`);
          allPosts.push(...response.data);
        }
        setAllPosts(allPosts);
        console.log('-----------------------------*************allposts: ', allPosts);
      } catch (error) {
        if (error.response.status === 500) {
          toast.error('Server not responding...!..');
        }
      }
    };
  
    if (currentUser) {
      fetchAllPosts();
    }
  }, [currentUser]);
  



  return (
    <AppContext.Provider value={{ user, login, loading, data, currentUser, posts ,allposts}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
