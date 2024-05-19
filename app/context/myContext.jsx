// 'use client';

// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState({ allUsers: [], lusers: [] });
//   const [emailid, setEmail] = useState(null);
//   const [currentUser, setCurrentUser] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [allposts,setAllPosts] = useState([]);



//   //login----------
//   const login = async (email, password) => {
//     setLoading(true);

//     try {
//       const response = await axios.post('https://social-media-5ukj.onrender.com/auth/login', {
//         email,
//         password
//       });

//       if (response.status === 200) {
//         setUser({ email });
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('email', email);
//         router.push('home');
//         toast.success('Login success');
//       } else {
//         toast.error('Login failed');
//       }
//     } catch (error) {
//       if (!error.response) {
//         toast.error('Network error!');
//       } else {
//         const status = error.response.status;
//         if (status === 401) {
//           toast.error('Unauthorized User!');
//         } else if (status === 404) {
//           toast.error('No user found with the given data!');
//         } else if (status === 500) {
//           toast.error('Server error! Please try again later!');
//         } else {
//           toast.error('Something went wrong!');
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };



//   //Allusers + random 10 users ----------
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://social-media-5ukj.onrender.com/user/');
//         const allUsers = response.data;

//         const shuffledUsers = allUsers.sort(() => Math.random() - 0.5);
//         const lusers = shuffledUsers.slice(0, 6);

//         const cId = localStorage.getItem('email');
//         setEmail(cId);

//         setData({ allUsers, lusers });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setData({ allUsers: [], lusers: [] });
//       }
//     };
//     fetchData();
//   }, []);





//   //CurrentUser----------
//   useEffect(() => {
//     if (data.allUsers && emailid) {
//       const foundUser = data.allUsers.find(user => user.email === emailid);
//       if (foundUser) {
//         setCurrentUser(foundUser);
//         localStorage.setItem('id', foundUser._id);
//       }
//     }
//   }, [data.allUsers, emailid]);




//   //PostOfLoginUser----------
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const id = localStorage.getItem('id');
//         const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${id}/timeline`);
//         setPosts(response.data);
//       } catch (error) {
//         if (error.response.status === 500) {
//           toast.error('Server not responding...!..');
//         }
//       }
//     };

//     if (currentUser._id) {
//     fetchPosts();
//   }
//   }, [currentUser]);


// useEffect(() => {
//   const fetchAllPosts = async () => {
//     try {
//       const allPosts = [];
//       const requests = data.allUsers
//         .filter(user => user._id !== '6646f9633ce360059d6ea7d5')
//         .map(user => axios.get(`https://social-media-5ukj.onrender.com/posts/${user._id}/timeline`));

//       const responses = await Promise.all(requests);

//       responses.forEach(response => {
//         allPosts.push(...response.data);
//       });

//       setAllPosts(allPosts);
//       console.log('-----------------------------*************allposts: ', allPosts);
//     } catch (error) {
//       if (error.response && error.response.status === 500) {
//         toast.error('Server not responding...!..');
//       } else {
//         toast.error('An error occurred while fetching posts.');
//       }
//     }
//   };

//   if (currentUser) {
//     fetchAllPosts();
//   }
// }, [currentUser, data.allUsers]);




//   return (
//     <AppContext.Provider value={{ user, login, loading, data, currentUser, posts ,allposts}}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContext;






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
      }
    }
  }, [data.allUsers, emailid]);

  // Fetch posts of the logged-in user
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${id}/timeline`);
        setPosts(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    if (currentUser._id) {
      fetchPosts();
    }
  }, [currentUser]);

  // Fetch all posts
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const requests = data.allUsers
          .filter(user => user._id !== '6646f9633ce360059d6ea7d5')
          .map(user => axios.get(`https://social-media-5ukj.onrender.com/posts/${user._id}/timeline`));

        const responses = await Promise.all(requests);
        const allPosts = responses.flatMap(response => response.data);
        setAllPosts(allPosts);
      } catch (error) {
        handleError(error);
      }
    };

    if (currentUser) {
      fetchAllPosts();
    }
  }, [currentUser, data.allUsers]);

  // Fetch comments for a specific post
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${postId}/comments`);
      setComments(response.data);
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
      fetchComments(postId); // Refresh comments
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AppContext.Provider value={{ user, login, loading, data, currentUser, posts, allposts, comments, fetchComments, createComment }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
