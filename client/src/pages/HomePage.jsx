import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { axiosClient } from '../lib/axios';
import { formatError, timeAgo } from '../lib/utils';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosClient.get('api/blog')
        if (data.success) {
          setData(data.data)
        }
      } catch (error) {
        formatError(error)
      }

    }
    fetchData();
  }, [])

  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto border-2 min-h-dvh'>

        <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2'>
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
                  <p className='text-sm text-slate-600'>{item.category}</p>
                  <h1>{item.title}</h1>

                  <span className='absolute bottom-0 left-0'>@{item.author.username}</span>
                  <span className='absolute bottom-0 right-0 text-xs text-slate-700'>{timeAgo(item.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <div>Oops no content</div>
          )}
        </main>
      </section>
    </>
  )
}