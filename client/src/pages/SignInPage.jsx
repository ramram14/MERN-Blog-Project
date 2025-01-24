import React from 'react';
import { useAuthStore } from '../store/authStore';
import LoadingButton from '../components/LoadingButton';
import { useNavigate } from 'react-router';

export default function SignInPage() {
  const { signIn, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/', { replace: true });
  };
  const [userData, setUserData] = React.useState({
    email: '',
    password: '',
  });
  const [errorInvalidFields, setErrorInvalidFields] = React.useState([]);


  const handleSignIn = async () => {
    setErrorInvalidFields([]);
    const data = await signIn(userData);
    if (data.errorMessages) {
      setErrorInvalidFields(data.errorMessages);
    }
  }

  return (
    <main className='w-screen h-screen relative'>
      <section className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg space-y-6 border-2 p-2 md:p-4 rounded-md'>
        <h1 className='text-2xl md:text-3xl font-semibold w-fit mx-auto'>Sign In</h1>
        <div>
          <label htmlFor="email" className='text-xs md:text-lg font-semibold'>Email</label>
          <input
            type="email"
            id='email'
            name='email'
            placeholder='Email'
            className='border w-full p-2 rounded-lg'
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password" className='text-xs md:text-lg font-semibold'>Password</label>
          <input
            type="password"
            id='password'
            name='password'
            placeholder='Password'
            className='border w-full p-2 rounded-lg'
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
        </div>
        {
          errorInvalidFields.length > 0 && (
            <div className='text-red-700 bg-red-100 font-semibold rounded-md p-2'>
              {errorInvalidFields.map((error, i) => (
                <p key={i} className=''>{error}</p>
              ))}
            </div>
          )
        }
        <LoadingButton
          loading={isLoading}
          text="Sign In"
          onClickHandler={handleSignIn}
          className={'w-full p-2 bg-orange-500 font-semibold rounded-lg  border-2 cursor-pointer hover:bg-orange-600'}
        />
        <p>Don&apos;t have an account?  <a onClick={() => navigate('/signup')} className='text-blue-600 hover:border-b cursor-pointer'>Sign Up</a></p>
      </section>
    </main>
  )
}