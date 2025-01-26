import { useAuthStore } from '../../store/authStore';
import { useNavigate } from "react-router";
import UserIconSmall from '../profile/UserIconSmall';
import TopicDropdown from './TopicDropdown';
import NavSearch from './NavSearch';
import { FaHome, FaUser } from 'react-icons/fa';
// import ButtomNavbar from './ButtomNavbar';
export default function Navbar() {

  return (
    <>
      <TopNavbar />
      <ButtomNavbar />
    </>
  )
}

function TopNavbar() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className='w-full p-1 md:p-2 md:px-6 flex justify-between items-center border-b-2 sticky top-0 bg-white z-50'>
      {/* Logo for large screens */}
      <div className='text-xs md:text-xl font-bold bg-orange-600 p-1 md:p-2 rounded-lg md:rounded-xl cursor-pointer hidden md:block' onClick={() => navigate('/')}>
        <h1> WriteSphere</h1>
      </div>

      {/* Logo for small screens */}
      <div className='text-xs text-center cursor-pointer md:hidden  font-semibold border mr-1 rounded-md bg-orange-600' onClick={() => navigate('/')}>
        <h1>Write Sphere</h1>
      </div>

      <div className='flex items-center gap-1 md:gap-4 justify-end w-full'>
        <NavSearch />
        <button
          type='button'
          // We navigate to the home page to handle if user search blog in other page
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
              className='font-medium rounded-4xl p-3 cursor-pointer hover:border hidden md:block'
            >
              Sign In
            </button>
            <button
              type='button'
              onClick={() => navigate('/signup')}
              className='font-medium border rounded-md md:rounded-4xl P-1 md:p-3 bg-black text-white cursor-pointer hover:bg-neutral-700 hidden md:block'
            >
              Sign Up
            </button>

          </div>
        )}
      </div>
    </nav>
  )
}

function ButtomNavbar() {
  const navigate = useNavigate();
  return (
    <nav className=' fixed bottom-0 left-0 z-50 block md:hidden  bg-white w-full'>
      <div className='flex items-center justify-around border-t-2'>
        <FaHome
          onClick={() => navigate('/')}
          size={30}
          className='text-2xl border-r-2 flex-1 p-1 hover:bg-orange-600'
        />
        <FaUser
          onClick={() => navigate('/profile')}
          size={30}
          className='text-2xl border-l-2 flex-1 p-1 hover:bg-orange-600'
        />
      </div>
    </nav>
  )
}