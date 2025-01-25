import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import PageDirection from '../components/PageDirection';
import { FaSpinner } from "react-icons/fa";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import DeleteBlogModal from '../components/DeleteBlogModal';
import { useBlogStore } from '../store/blogStore';

export default function MyPost() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { setBlogByAuthor, blog, loading } = useBlogStore()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      await setBlogByAuthor()
    }
    fetchData()
  }, [setBlogByAuthor])
  return (
    <>
      <Navbar />
      <div className='max-w-4xl mx-auto border mt-5 rounded-md overflow-hidden'>
        <PageDirection direction={'My Post'} />
        <section className='w-full min-h-screen p-4'>
          {loading ? <FaSpinner className='animate-spin mx-auto text-2xl h-screen my-auto' /> : (
            <div>
              <h1 className='p-2 text-2xl font-semibold'>Total Post : {blog.length}</h1>
              {blog.length > 0 ? (
                blog.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className='grid md:grid-cols-2 border-2 rounded-lg overflow-hidden w-full gap-2'
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        onClick={() => navigate(`/${item.slug}`)}
                        className='aspect-video w-full object-cover cursor-pointer'
                      />
                      <div className='p-2 flex flex-col justify-between'>
                        <div className='space-y-2 '>
                          <h1 className='text-xl font-medium'>{item.title}</h1>
                          <p>Views : {item.views}</p>
                          <p className='text-slate-600'>Created at : {moment(item.createdAt).format('DD-MMMM-YYYY')}</p>
                          <p className='text-slate-600'>Updated at : {moment(item.updatedAt).format('DD-MMMM-YYYY')}</p>
                        </div>

                        <div className='flex justify-between'>
                          <button
                            type='button'
                            onClick={() => navigate(`/${item.slug}/edit`)}
                            className='font-medium bg-slate-100 rounded-xl p-3 cursor-pointer border hover:bg-slate-500 w-24'
                          >
                            Edit
                          </button>
                          <button
                            type='button'
                            onClick={() => setShowDeleteModal(true)}
                            className='font-medium bg-slate-100 rounded-xl p-3 cursor-pointer border hover:bg-red-500 w-24'
                          >
                            Delete
                          </button>
                          {showDeleteModal && <DeleteBlogModal onClose={() => setShowDeleteModal(false)} slug={item.slug} />}
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <h1 className='text-2xl text-center h-screen my-auto mt-4'>You don&apos;t have any post yet</h1>
              )}
            </div >
          )
          }
        </section >
      </div >
    </>
  )
}