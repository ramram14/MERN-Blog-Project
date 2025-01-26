import { useNavigate, useSearchParams } from 'react-router-dom'
import { categoryBlog } from '../../lib/data'
import { useEffect, useRef, useState } from 'react';


export default function TopicDropdown() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='relative' ref={dropdownRef}>
        <button
          type='button'
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className='font-medium bg-orange-600 md:bg-slate-100 rounded-md md:rounded-xl p-1 md:p-3 cursor-pointer hover:border-b '
        >
          Topics
        </button>
        <div
          hidden={!isCategoryOpen}
          className='flex flex-col w-fit absolute p-1 right-0 md:right-auto md:-ml-4 '
        >
          {categoryBlog.sort().map((category, i) => {
            return (
              <button
                key={i}
                type='button'
                onClick={() => {
                  setIsCategoryOpen(false)
                  if (categoryParam === category) {
                    setSearchParams({ category: '' })
                  } else {
                    navigate(`/?category=${category}`, { replace: true })
                  }
                }}
                className='font-medium bg-slate-100 p-2 cursor-pointer hover:border-b text-start border-b border-r border-l hover:bg-slate-200 '
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}