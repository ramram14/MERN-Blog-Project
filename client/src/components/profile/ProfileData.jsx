import { useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import { CiEdit } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import LoadingButton from '../LoadingButton';



export default function ProfileData() {
  const { user, updateProfileData, isLoading, isAuthenticated } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [inputData, setInputData] = useState({
    fullName: '',
    username: '',
    email: ''
  })
  const [errorInvalidFields, setErrorInvalidFields] = useState([]);

  const handleUpdateProfile = async () => {
    const data = await updateProfileData(inputData);
    if (data && data.errorMessages) {
      setErrorInvalidFields(data.errorMessages);
    }
    setIsEditing(false);
  }

  return (
    <div className='flex flex-col gap-2'  >
      {
        isAuthenticated && (
          <button
            type='button'
            onClick={() => {
              setIsEditing(!isEditing);
              document.getElementById('fullName').value = user?.fullName;
              document.getElementById('username').value = user?.username;
              document.getElementById('email').value = user?.email;
              setInputData({ fullName: user?.fullName, username: user?.username, email: user?.email });
              setErrorInvalidFields([]);
            }}
            className={`ml-auto cursor-pointer p-2 flex items-center gap-2 border rounded-md ${isEditing ? 'bg-red-500 hover:bg-red-600' : ' hover:bg-slate-200 '}`}
          >
            {
              isEditing ? (
                <>
                  <p>Save</p>
                  <MdOutlineCancel className='text-2xl' />
                </>
              ) : (
                <>
                  Edit
                  <CiEdit className='text-2xl' />
                </>
              )
            }
          </button>
        )
      }
      {
        isAuthenticated ? (
          <>
            <div>
              <p className=''>Full Name</p>
              <p
                hidden={isEditing}
                className='text-2xl font-semibold'
              >{user?.fullName}</p>
              <input
                type="text"
                id='fullName'
                name='fullName'
                placeholder={user?.fullName}
                className='border w-full p-1 rounded-md'
                hidden={!isEditing}
                autoComplete='off'
                onChange={(e) => setInputData({ ...inputData, fullName: e.target.value })}
              />
            </div>
            <div>
              <p className=''>Username</p>
              <p
                hidden={isEditing}
                className='text-2xl font-semibold'
              >{user?.username}</p>
              <input
                type="text"
                id='username'
                name='username'
                placeholder={user?.username}
                className='border w-full p-1 rounded-md'
                hidden={!isEditing}
                autoComplete='off'
                onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
              />
            </div>
            <div>
              <p className=''>Email</p>
              <p
                hidden={isEditing}
                className='text-2xl font-semibold'
              >{user?.email}</p>
              <input
                type="email"
                id='email'
                name='email'
                placeholder={user?.email}
                className='border w-full p-1 rounded-md'
                hidden={!isEditing}
                autoComplete='off'
                onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
              />
            </div>
          </>
        ) : (
          <div className='text-red-700 bg-red-100 font-semibold rounded-md p-2'>
            <h1>You are not logged in</h1>
          </div>
        )
      }
      {
        errorInvalidFields.length > 0 && (
          <div className='text-red-700 bg-red-100 font-semibold rounded-md p-2'>
            {errorInvalidFields.map((error, i) => (
              <p key={i} className=''>{error}</p>
            ))}
          </div>
        )
      }
      {isEditing && (
        <LoadingButton
          onClickHandler={handleUpdateProfile}
          className={`ml-auto mt-6 cursor-pointer p-2 flex items-center gap-2 border rounded-md bg-green-400`}
          text='Save'
          isLoading={isLoading}
        />

      )}
    </div>
  )
}