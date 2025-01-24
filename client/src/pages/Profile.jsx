import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/authStore';
import ProfileImage from '../components/ProfileImage';
import { FaSignOutAlt, } from "react-icons/fa";
import { RiLoader5Fill } from 'react-icons/ri';

export default function Profile() {
  const { user, signOut, isLoading } = useAuthStore();
  return (
    <>
      <Navbar />
      <div className='max-w-4xl mx-auto border mt-5 rounded-md overflow-hidden'>
        <h1 className='text-2xl font-bold text-center p-2 border-b-2 bg-amber-600 '>My Profile</h1>
        <section className='grid md:grid-cols-2  p-2 gap-2 md:gap-4'>
          <ProfileImage />

          <div>
            <div>
              <p className=''>Full Name</p>
              <p className='text-2xl font-semibold'>{user?.fullName}</p>
            </div>
            <div>
              <p className=''>Username</p>
              <p className='text-2xl font-semibold'>{user?.username}</p>
            </div>
            <div>
              <p className=''>Email</p>
              <p className='text-2xl font-semibold'>{user?.email}</p>
            </div>

          </div>
        </section>

        <div className='w-full flex justify-end'>
          <button
            type='button'
            onClick={signOut}
            className='flex  items-center p-2 rounded-md gap-2 cursor-pointer border font-medium bg-slate-400 hover:bg-slate-500'
          >
            <p>SignOut</p>
            {isLoading ? (
              <RiLoader5Fill className='animate-spin' />
            ) : (
              <FaSignOutAlt />
            )}
          </button>
        </div>
      </div>
    </>
  )
}