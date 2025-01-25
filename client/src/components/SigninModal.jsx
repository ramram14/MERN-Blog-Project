import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export default function SigninModal() {
  const navigate = useNavigate();

  return (
    <div
      className='fixed inset-0  flex items-center justify-center backdrop-blur-lg z-50 '
    >
      <div className='border-2  rounded-lg text-center space-y-2 bg-white p-2'>
        <FaArrowLeft
          onClick={() => navigate(-1)}
          size={30}
          className='cursor-pointer hover:bg-slate-600 p-2 rounded-full'
        />
        <h1 className='text-2xl font-medium'>Seems like you are doesn&apos;t have an account</h1>
        <h1>Sign in first an you can create a blog free</h1>
        <div className='flex justify-around items-center mt-4'>
          <button
            type='button'
            onClick={() => navigate('/signin')}
            className='font-medium border rounded-xl p-2  cursor-pointer bg-slate-400 hover:bg-slate-600 '
          >
            Signin
          </button>
          <button
            type='button'
            onClick={() => navigate('/signup')}
            className='font-medium border rounded-xl p-2  cursor-pointer bg-slate-400 hover:bg-slate-600 '
          >
            Signup
          </button>
        </div>
      </div>

    </div>
  )
}