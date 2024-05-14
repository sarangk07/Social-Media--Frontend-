'use client'




import { useEffect, useState } from 'react';
import axios from 'axios';



const UserProfile = (params) => {
  const[userV,setVUser]=useState([]);
  const[id , setID] = useState(null);
  const[allUsers, setAllusers] = useState([]);
  const [followersFetched, setFollowersFetched] = useState(false);
  const[followedUsers,setFollowedUsers]=useState([]);
  const[post,setPosts]= useState([]);
  
  // console.log(params.params.userId,'sdddddddddddddddddddd');
 useEffect(()=>{
  setID(params.params.userId)
 },[params])
  


 console.log(id,': use');


 useEffect(()=>{
  const getUsers = async()=>{
    try{
      const response = await axios.get('https://social-media-5ukj.onrender.com/user/');
      console.log(response);
      const allUsers = await response.data
      console.log(response.data);
      // console.log(allUsers,'****************')
      setAllusers(allUsers)
      const foundUser = allUsers.find(x => String(x._id) === String(id));
      
        if (foundUser) {
          console.log('foun-----------------------------d',foundUser);
          setVUser(foundUser);
          console.log(userV)
        } 
    }
    catch(error){
      console.log(error.response.data);
    }
    

    
  }
  getUsers()
},[id])

const getFollowersProfile = () => {
  if (!followersFetched && userV.followers) {
    userV.followers.forEach((followerId) => {
      const followedUser = allUsers.find(user => user._id === followerId);
      if (followedUser) {
        setFollowedUsers(prevFollowedUsers => [...prevFollowedUsers, followedUser]);
      }
    });
    setFollowersFetched(true);
  }
};


useEffect(() => {
  const getPosts = async () => {
    try {
      if (id !== null) { // Check if id is not null before making the request
        console.log(id, ': user idddddddddddddddddddddddddddddddddddddd11111111111111111111');
        console.log(userV, 'clicked user id//////////////////////');
        const response = await axios.get(`https://social-media-5ukj.onrender.com/posts/${id}/timeline`);
        console.log(response, 'responseeeeeeeeeeeeeeeeeeeeeeeeee');
        console.log(response.data, 'post get responseeeeeeeeeeeeeeeeeeeeeeeeee');
        if (response.data.length !== 0) {
          setPosts(response.data);
        }
        else{
          console.log('no post found!');
        }        
      }
    } catch (error) {
      console.log(error.response, 'get error');
      if (error.response.status == 500) {
        console.log('server error');
      }
    }
  };
  getPosts();
}, [id]);



console.log(followedUsers,'---------------------------followedUsers------------********************');
  return (
    <div className='flex flex-col w-screen h-screen bg-[#D9D9D9] '>
      <div className='flex flex-col h-2/6  items-center'>
        <div className='w-screen h-2/4 object-cover'>
            <img className='sm:rounded-b-md relative h-full w-full lg:rounded-b-full' src="https://www.dndspeak.com/wp-content/uploads/2021/04/Temple-1-768x512.jpg" alt="" />
        </div>
        <div className='bg-[#FFFFFF] h-2/4 flex flex-col w-4/5 rounded-b-3xl'>
            <div className='pl-1'>
              <img  src=" https://i.pinimg.com/564x/58/bc/a3/58bca38c4d21f72acb56ff32c99831fb.jpg" alt="profilePic" className='rounded-full border-white border-4 w-28 h-28 absolute top-16'/>
              </div>
            <div className='flex justify-between pt-14'>
            {userV?<>
                <div className='flex justify-evenly w-1/3 top-5'>
                    
                    <div>
                    <h5>{userV.username}</h5>
                    <p>{userV.email}</p>
                    </div>
                    <div className='rounded-md bg-emerald-800 w-14 h-10 text-white cursor-pointer flex items-center justify-center hover:bg-emerald-700'>Follow</div>
                    
                </div>
                
                
                <div className='cursor-pointer' onClick={getFollowersProfile}>
                  <p>followers: {userV.followers ? userV.followers.length : 0}</p>
                  <p>following: {userV.following ? userV.following.length : 0}</p>
                </div>

                </>:<div></div>}
            </div>

        </div>
    </div>
    <div className=' flex justify-around h-4/6 w-screen bg-[#D9D9D9]'>
      <div className='md:flex w-2/5 flex flex-col md:justify-center bg-[#FFFFFF] m-1 rounded-2xl sm:hidden '>
      {followedUsers.length > 0 ?
      followedUsers.map((followedUser, index) => (
        <div>
        <div className=' flex  justify-evenly  m-2 rounded-md bg-slate-400 w-5/5' key={index}>
          <p>Name: {followedUser.username}</p>
          <p>Email: {followedUser.email}</p>
        </div>
        </div>
      )) :
      <p>No followed users found</p>
    }
      
      
      
      </div>
      <div className='w-3/5 text-center bg-[#FFFFFF] m-3 rounded-2xl sm:w-4/5 overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className='flex justify-evenly m-3 '>
        <h3 className='active: text-orange-600 pb-3 mb-3' >
        
        </h3>
        {post && post.length > 0 ? (
<div className='flex w-full flex-col h-fit justify-items-center  rounded-lg'>
{post.map((item) => (
<div className='bg-emerald-50 rounded-xl mb-3' key={item._id}>
  <div className="flex justify-between items-center">
    <div className='flex flex-col'>
      {/* <img className='rounded-full w-16 h-16' src="https://i.pinimg.com/236x/ce/4b/57/ce4b573d0f130c205217d607c3b8e81f.jpg" alt="" /> */}
      {/* <h4 className='relative left-5'>{item._id}</h4><br /> */}
      <p>{item.desc}</p>
    </div>




   

  </div>
  <div className='flex justify-center relative '><img className='pl-7 pr-7 w-full h-52 object-cover rounded-3xl' src={item.image} alt=""/> </div>
  
  <div className='flex justify-around mb-5'>
    <button>likes: </button>
    <button>comment</button>
    <button>share</button>
  </div>
  <hr className='mb-8'/>
</div>
))}
</div>
) : (
<div>NO Post Yet...!</div>
)}
  
        
      </div>
      <div></div>
      </div>
    </div>



      
    </div>
  );
};

export default UserProfile;
