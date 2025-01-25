import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useBlogStore } from '../store/blogStore';
import { ImSpinner11 } from "react-icons/im";


DeleteBlogModal.propTypes = {
  onClose: PropTypes.func,
  slug: PropTypes.string
}
export default function DeleteBlogModal({ onClose, slug }) {
  const modalRef = useRef()
  const { deleteBlog, loading } = useBlogStore()

  const modalClose = (e) => {
    if (modalRef.current === e.target) {
      onClose()
    }
  }

  const handleDeleteBlog = async (slug) => {
    await deleteBlog(slug)
    onClose()
  }
  return (

    <div
      ref={modalRef}
      onClick={modalClose}
      className='fixed inset-0  flex items-center justify-center backdrop-blur-lg '
    >
      <div className='border-2 p-2 rounded-lg text-center space-y-2 bg-white'>
        <h1 className='text-2xl'>Are you sure?</h1>
        <h1 className=''>Once deleted, you will not be able to recover</h1>
        <div className='flex justify-around items-center mt-4'>
          <button
            type='button'
            onClick={onClose}
            disabled={loading}
            className='font-medium border rounded-xl p-2  cursor-pointer bg-slate-400 hover:bg-slate-600 '
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => handleDeleteBlog(slug)}
            disabled={loading}
            className='font-medium border rounded-xl p-2  cursor-pointer bg-red-600 hover:bg-red-700 '
          >
            {loading ? <ImSpinner11 className='animate-spin' /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}