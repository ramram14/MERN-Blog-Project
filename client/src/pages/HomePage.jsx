import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { axiosClient } from '../lib/axios';
import { formatError, formatViews, timeAgo } from '../lib/utils';
import { useNavigate, useSearchParams } from 'react-router';
import Spinner from '../components/Spinner';
import { FaRegEye } from "react-icons/fa";


export default function HomePage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get(`api/blog?${search ? `search=${search}` : ''}${category ? `&category=${category}` : ''}`);
        if (data.success) {
          setData(data.data);
        }
      } catch (error) {
        formatError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, searchParams, search]);


  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto border-2 min-h-dvh relative'>
        {loading && <Spinner />}
        <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 overflow-hidden'>
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item._id}
                onClick={() => navigate(`/${item.slug}`)}
                className='w-full max-w-xs mx-auto border-2 rounded-md cursor-pointer hover:bg-slate-100 '
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='aspect-video w-full object-cover'
                  />
                </div>

                <div className='p-2 text-xl font-medium h-32 relative'>
                  <div className='text-sm text-slate-600 flex justify-between'>
                    <p >{item.category}</p>
                    <p className='flex items-center gap-1'>{formatViews(item.views)} <FaRegEye /></p>
                  </div>
                  <h1>{item.title}</h1>

                  <span className='text-xs text-slate-700 absolute bottom-0 left-0'>@{item.author.username}</span>
                  <span className='absolute bottom-0 right-0 text-xs text-slate-700'>{timeAgo(item.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className='flex flex-col gap-4 items-center justify-center w-full h-screen absolute'>
              <h2>No blogs found for &quot;{search || category}&quot;</h2>
              <button
                type='button'
                onClick={() => navigate('/')}
                className='p-2 bg-orange-600 font-medium rounded-lg cursor-pointer hover:bg-orange-800'
              >
                Go To Homepage
              </button>
            </div>
          )}
        </main>
      </section>
    </>
  )
}