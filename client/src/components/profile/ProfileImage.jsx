import React from 'react'
import { FaUserCircle, FaTrashAlt, FaCheck } from 'react-icons/fa'
import { useAuthStore } from '../../store/authStore'
import { RiLoader5Fill } from 'react-icons/ri'
export default function ProfileImage() {
  const { user, updateProfileImage, isLoading } = useAuthStore()
  const [imagePreview, setImagePreview] = React.useState('')
  const [file, setFile] = React.useState('')

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      const formData = new FormData()
      formData.append('profileImage', file, file.name)
      setFile(formData)
    }
  }

  const handleUpdateProfileImage = async () => {
    await updateProfileImage(file)
  }
  return (
    <div className='space-y-4 text-center'>
      <div className='w-52 h-52 mx-auto'>
        {imagePreview || user?.profileImage ? (
          <img
            src={imagePreview || user?.profileImage}
            alt='profile image'
            className='w-full h-full rounded-full object-cover  border-2' />
        ) : (
          <FaUserCircle className='h-full w-full' />

        )}
      </div>
      <div >
        <form id='updateProfileImage'>
          <input type="file" id='profileImage' onChange={handleImageChange} name='profileImage' hidden />

          {imagePreview ? (
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={() => setImagePreview('')}
                disabled={isLoading}
                className='bg-red-700 w-full p-2 cursor-pointer hover:bg-red-900 rounded-md'
                aria-label='Remove profile image'
              >
                <FaTrashAlt className='text-lg mx-auto' />
              </button>
              <button
                type='button'
                onClick={handleUpdateProfileImage}
                disabled={isLoading}
                className='bg-green-600 w-full p-2 cursor-pointer hover:bg-green-700 rounded-md'
                aria-label='Remove profile image'
              >
                {isLoading ? (
                  <RiLoader5Fill className='animate-spin mx-auto' />
                ) : (
                  <FaCheck className='text-lg mx-auto' />
                )}
              </button>
            </div>
          ) : (
            <button
              type='button'
              onClick={() => document.getElementById('profileImage')?.click()}
              className='bg-black text-white w-full p-2 cursor-pointer rounded-md'>
              Change Image
            </button>
          )}
        </form>
      </div>
      <p className='text-xs text-start'>*File size: maximum 2,000,000 bytes (2 Mb).</p>
    </div>
  )
}