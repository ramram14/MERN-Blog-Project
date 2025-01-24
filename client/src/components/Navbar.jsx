import { useAuthStore } from '../store/authStore';
import { useNavigate } from "react-router";
import UserIconSmall from './UserIconSmall';

export default function Navbar() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  return (
    <nav className='w-full p-2 md:px-6 flex justify-between items-center border-b-2 sticky top-0 bg-white z-50'>
      <div className='text-xl font-bold bg-orange-600 p-2 rounded-xl cursor-pointer' onClick={() => navigate('/')}>
        <h1> WriteSphere</h1>
      </div>

      <div>
        {isAuthenticated ? (
          <div
            onClick={() => navigate('/profile')}
            className='flex items-center font-medium  gap-3 md:p-2 cursor-pointer'>
            <UserIconSmall image={user?.profileImage} />
            <p>{user?.username}</p>
          </div>
        ) : (
          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={() => navigate('/signin')}
              className='font-medium rounded-4xl p-3 cursor-pointer hover:border'
            >
              Sign In
            </button>
            <button
              type='button'
              onClick={() => navigate('/signup')}
              className='font-medium border rounded-4xl p-3 bg-black text-white cursor-pointer hover:bg-neutral-700'
            >
              Sign Up
            </button>

          </div>
        )}
      </div>
    </nav>
  )
}