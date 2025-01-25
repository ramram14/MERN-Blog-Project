import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import UserIconSmall from '../profile/UserIconSmall';
import LoadingButton from '../LoadingButton';
import { useBlogStore } from '../../store/blogStore';




export default function FormComment() {
  const [inputData, setInputData] = useState({
    content: ''
  })
  const { loading, createComment } = useBlogStore()
  const { isAuthenticated, user } = useAuthStore();
  const handleUploadComment = async () => {
    await createComment(inputData)
  }
  return (
    <>
      <div className='flex gap-2 md:gap-4'>
        {
          isAuthenticated && (
            <UserIconSmall image={user?.profileImage} />
          )
        }
        {/* We set up the form element also for upload comment with enter button */}
        <form onSubmit={(e) => {
          e.preventDefault()
          handleUploadComment()
        }}
          className='w-full'
        >
          <input
            type="text"
            id='comment'
            name='comment'
            autoComplete='off'
            onChange={(e) => setInputData({ content: e.target.value })}
            placeholder='Write a comment'
            className='w-full p-2 rounded-lg outline-none border-2 border-gray-200'
          />
          <button type='submit' hidden className='hidden'></button>
        </form>
      </div>
      <div
        hidden={inputData.content.length === 0}
        className='w-full flex justify-end gap-4'
      >
        <button
          type='button'
          onClick={() => {
            document.getElementById('comment').value = '';
            setInputData({ content: '' })
          }}
          className=' font-medium rounded-4xl p-3 cursor-pointer hover:border'
        >
          Clear

        </button>
        <LoadingButton
          loading={loading}
          onClickHandler={handleUploadComment}
          text='Comment'
          className={'font-medium border rounded-4xl p-3 bg-black text-white cursor-pointer hover:bg-neutral-700'}
        />
      </div>
      {
        !isAuthenticated && (
          <h1 className='text-center font-semibold'>Please
            {' '}
            <a
              href="/signin"
              className='text-blue-600 underline'
            >signin</a>
            {' '}
            to comment</h1>
        )
      }
    </>
  )
}