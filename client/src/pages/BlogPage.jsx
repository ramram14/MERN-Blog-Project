import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { timeAgo } from '../lib/utils';
import DisplayHTML from '../components/DisplayHTML';
import Navbar from '../components/Navbar';
import FormComment from '../components/FormComment';
import { useBlogStore } from '../store/blogStore';
import UserIconSmall from '../components/UserIconSmall';
import CommentBlogContainer from '../components/CommentBlogContainer';
import { FaEdit } from "react-icons/fa";
import { useAuthStore } from '../store/authStore';

export default function BlogPage() {
  const { slug } = useParams();
  const { blog, setBlog } = useBlogStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      await setBlog(slug)
    }
    fetchData()
  }, [slug, setBlog])
  return (
    <>
      <Navbar />
      <section className='max-w-6xl mx-auto space-y-6 p-2 md:p-4 border-2 my-6 rounded-md'>
        {blog && (
          <div>
            <div className='border-b-2 p-2'>
              <div className='flex gap-2 items-center justify-between border-b p-2'>
                <div className='flex gap-2 items-center'>
                  <UserIconSmall image={blog.author?.profileImage} />
                  <div>
                    <h1>@{blog.author?.username}</h1>
                    <h1>{blog.author?.fullName}</h1>
                  </div>

                </div>


                {blog.author?._id === user._id && (
                  <button
                    type='button'
                    onClick={() => navigate(`/${blog.slug}/edit`)}
                    className='flex gap-2 items-center p-2 bg-slate-400 hover:bg-slate-600 rounded-md cursor-pointer font-medium border-2'
                  >
                    Edit
                    <FaEdit />
                  </button>
                )}

              </div>
              <p className=' text-slate-600 p-2'>{blog.category}</p>
              <div className='bg-slate-100 w-full h-52 md:h-72 lg:h-96'>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className='aspect-video object-cover mx-auto h-full'
                />
              </div>

              <h1 className='text-2xl font-bold text-center p-4'>{blog.title}</h1>
              <div className='p-2 mt-2 md:mt-4'>
                <DisplayHTML
                  htmlContent={blog.content}
                />
              </div>

              <p className='text-xs text-end'>Created at: {timeAgo(blog.createdAt)}</p>
              <p className='text-xs text-end'>Updated at: {timeAgo(blog.updatedAt)}</p>
            </div>

            <div className='space-y-4'>
              <h1 className='text-2xl font-bold'>Comments</h1>
              <FormComment />
              <CommentBlogContainer />
            </div>
          </div>
        )}
      </section>
    </>
  )
}