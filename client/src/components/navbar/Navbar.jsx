import { useAuthStore } from '../../store/authStore';
import { useNavigate } from "react-router";
import UserIconSmall from '../profile/UserIconSmall';
import TopicDropdown from './TopicDropdown';
import NavSearch from './NavSearch';

export default function Navbar() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  return (
    <>
      <nav className='w-full p-2 md:px-6 flex justify-between items-center border-b-2 sticky top-0 bg-white z-50'>
        <div className='text-xs md:text-xl font-bold bg-orange-600 p-1 md:p-2 rounded-lg md:rounded-xl cursor-pointer hidden md:block' onClick={() => navigate('/')}>
          <h1> WriteSphere</h1>
        </div>
        <div className='text-xs text-center cursor-pointer md:hidden  font-semibold backdrop-blur-2xl border mr-1 rounded-md' onClick={() => navigate('/')}>
          <h1>Write Sphere</h1>
        </div>

        <div className='flex items-center gap-1 md:gap-4 justify-end w-full'>
          <NavSearch />
          <button
            type='button'
            onClick={() => navigate('/')}
            className={`font-medium bg-slate-100 rounded-xl p-3 cursor-pointer hover:border-b hidden md:block`}
          >
            Home
          </button>
          <TopicDropdown />


          <button
            type='button'
            onClick={() => navigate('/blog/create')}
            className='font-medium border rounded-xl p-3  cursor-pointer bg-orange-600 hover:bg-orange-700 hidden md:block'
          >
            Write
          </button>
          {isAuthenticated ? (
            <div
              onClick={() => navigate('/profile')}
              className='flex items-center font-medium  gap-3 md:p-2 cursor-pointer'>
              <UserIconSmall image={user?.profileImage} />
              <p className='hidden md:block'>{user?.username}</p>
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

    </>
  )
}