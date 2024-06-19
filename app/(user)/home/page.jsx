
import Navbar from '@/app/components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import PostSection from '../components/PostSection';
import UserList from '../components/UserList';
import UserInfo from '../components/UserInfo';


export default function Home() {

  return (
  <div className='bg-emerald-100 text-black w-screen dark:bg-zinc-900'>
    <Toaster position="top-center" reverseOrder={false} />
    <Navbar />
    <div className='flex w-screen h-screen sm:justify-center'>
      {/* -----------Suggestion Users-------- */}
      <UserList/>
      {/* --------Post Display----------- */}
      <PostSection/>
      {/* ------User Info-------- */}
      <UserInfo/>
    </div>
  </div>
  );
}
