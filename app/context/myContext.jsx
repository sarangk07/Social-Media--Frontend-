

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
  const [allposts, setAllPosts] = useState([]);
  const [followedPosts, setFollowedPosts] = useState([]);
  const [comments, setComments] = useState([]);




  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('https://social-media-5ukj.onrender.com/auth/login', { email, password });
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
      handleError(error);
    } finally {
      setLoading(false);
    }
  };




  // Like/Unlike a post
  const likeUnlikePost = async (postId) => {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
      const fData = { userId };
      const response = await axios.put(`https://social-media-5ukj.onrender.com/posts/${postId}/like`, fData);
      toast.success(response.data);
    } catch (error) {
      handleError(error);
      console.error('Error occurred while liking/unliking post:', error);
    }
  };




//error handling
  const handleError = (error) => {
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
  };




  // Fetch all users and random users
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
        console.log('allusers : ',allUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({ allUsers: [], lusers: [] });
      }
    };
    fetchData();
  }, []);




  // Set current user
  useEffect(() => {
    if (data.allUsers && emailid) {
      const foundUser = data.allUsers.find(user => user.email === emailid);
      if (foundUser) {
        setCurrentUser(foundUser);
        localStorage.setItem('id', foundUser._id);
        console.log('ccurrrrrrrrrrrenttttttttttt userrrrrrrrrr: ',foundUser);
      }
    }
  }, [emailid,data.allUsers]);





  // Fetch posts of the logged-in user
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const ccid = localStorage.getItem('id');
        console.log('id:::::::::::::::::::::::::::::::::::::::',ccid);
        const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${ccid}/timeline`);
        if(response.data.length < 0){
          setPosts([])
        }else{
          setPosts(response.data);
        }
       
        console.log('current user post: ',response.data);
      } catch (error) {
        handleError(error);
      }
    };
    if (currentUser._id) {
      fetchPosts();
    }
  }, [currentUser]);





  // Fetch all posts, except current user post
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const id = localStorage.getItem('id')
        const requests = data.allUsers
          .filter(user => user._id !== '6646f9633ce360059d6ea7d5' && user._id !== '663b108898d7544f8f475a80')
          .map(user => axios.get(`https://social-media-5ukj.onrender.com/posts/${user._id}/timeline`));

        const responses = await Promise.all(requests);
        const allPosts = responses.flatMap(response => response.data);

       
        const excludedDescriptions = ['any Description', 'Any description'];
        const filterPost = allPosts.filter(x => !excludedDescriptions.includes(x.desc));

        setAllPosts(filterPost);
        console.log('all posts :',allPosts);
      } catch (error) {
        handleError(error);
      }
    };

    if (currentUser) {
      fetchAllPosts();
    }
  }, [currentUser]);




  //fetch post of followed users
  useEffect(() => {
    const fetchPostsFollowed = async () => {
      try {
        const requests = currentUser.following.map(userId => 
          axios.get(`https://social-media-5ukj.onrender.com/posts/${userId}/timeline`)
        );

        const responses = await Promise.all(requests);
        console.log(responses);
        const allPosts = responses.flatMap(response => response.data);
        console.log(allPosts,'Followed users posts');
        const cuid = localStorage.getItem('id');
          if (cuid) {
            const filterPosts = allPosts.filter(post => post.userId !== cuid);
            setFollowedPosts(filterPosts);
          } else {
            console.error('User ID not found in local storage');
          }
      } catch (error) {
        console.error('Error fetching followed users posts:', error);
      }
    };

    if (currentUser && currentUser.following && currentUser.following.length > 0) {
      fetchPostsFollowed();
    }
  }, [currentUser]);





  // Fetch comments form a specific post
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${postId}/comments`);
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      handleError(error);
    }
  };




  // Create a new comment
  const createComment = async (postId, text) => {
    if (!text) {
      toast.error('Comment cannot be empty');
      return;
    }
    try {
      const uid = localStorage.getItem('id');
      const formdata = new FormData();
      formdata.append('userId', uid);
      formdata.append('text', text);

      await axios.post(`https://social-media-5ukj.onrender.com/posts/${postId}/comment`, formdata, {
        headers: { 'Content-Type': 'application/json' }
      });

      toast.success('Comment created successfully');
      fetchComments(postId);
    } catch (error) {
      handleError(error);
    }
  };


  return (
    <AppContext.Provider value={{ user, likeUnlikePost, login, loading, data, currentUser, posts, allposts, comments,followedPosts, fetchComments, createComment }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
