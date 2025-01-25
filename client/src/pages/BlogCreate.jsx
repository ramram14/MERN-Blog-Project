import { useState } from 'react'
import ReactQuill from 'react-quill';
import { CiImageOn } from "react-icons/ci";
import LoadingButton from '../components/LoadingButton';
import { axiosClient } from '../lib/axios';
import { formatError } from '../lib/utils';
import toast from 'react-hot-toast';
import { categoryBlog } from '../lib/data';
import Navbar from '../components/navbar/Navbar';
import { useAuthStore } from '../store/authStore';
import SigninModal from '../components/SigninModal';

export default function BlogCreate() {
  const { isAuthenticated } = useAuthStore()
  const [inputData, setInputData] = useState({
    title: '',
    content: '',
    category: '',
  })
  const [value, setValue] = useState('');
  const [imagePreview, setimagePreview] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorInvalidFields, setErrorInvalidFields] = useState([]);

  const handleimageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      setimagePreview(URL.createObjectURL(file))
    }
  }

  const handlePost = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', inputData.title)
      formData.append('content', value)
      formData.append('category', inputData.category)
      formData.append('image', image)


      const { data } = await axiosClient.post('/api/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (data.success) {
        toast.success(data.message)
        return
      }
    } catch (error) {
      if (error.response.data.errorMessages) {
        setErrorInvalidFields(error.response.data.errorMessages);
      }
      formatError(error)
    } finally {

      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      {
        !isAuthenticated && (
          <SigninModal />
        )
      }
      <section className='max-w-4xl mx-auto space-y-6 p-2 md:p-4 border-2'>
        <h1 className='text-3xl font-semibold p-2'>Create Blog</h1>
        <label htmlFor="title" className='font-medium text-xl'>Title</label>
        <input
          type="text"
          id='title'
          name='title'
          placeholder='Title'
          className='w-full p-2 font-semibold border rounded-md'
          onChange={(e) => setInputData({ ...inputData, title: e.target.value })}
        />
        <label htmlFor="category" className='font-medium text-xl'>Category Blog</label>
        <select
          name="category"
          id="category"
          onChange={(e) => setInputData({ ...inputData, category: e.target.value })}
          className='w-full p-2 font-semibold border rounded-md cursor-pointer'
        >
          {categoryBlog.map((item, i) => (
            <option key={i} value={item}>{item}</option>
          ))}
        </select>
        <br />
        <label htmlFor="title" className='font-medium text-xl'>Add your cover image blog</label>
        <div className='bg-slate-100 w-full h-52 md:h-72 lg:h-96 relative border-2'>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt='image'
              className='aspect-video object-cover mx-auto h-full'
            />
          ) : (
            <CiImageOn
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl cursor-pointer'
              onClick={() => document.querySelector('input[type="file"]').click()}
            />
          )}
          <input
            type="file"
            hidden
            onChange={handleimageChange}
          />
        </div>
        {imagePreview && (
          <button
            className='w-full p-2 font-semibold border rounded-md cursor-pointer bg-slate-500 hover:bg-slate-700'
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Change image
          </button>
        )}
        <label htmlFor="title" className='font-medium text-xl'>Content</label>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue} />
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
          className={'w-full p-2 md:p-4 font-semibold border rounded-md cursor-pointer bg-black text-white'}
          text='Create Blog'
          onClickHandler={handlePost}
          loading={loading}
        />
      </section>
    </>
  )
}