import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function NavSearch() {
  const [searchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState(searchParams.get('search') || '')
  const navigate = useNavigate();
  return (
    <div className='flex items-center gap-2'>
      <input
        placeholder='Search'
        type="search"
        className='p-2 lg:w-96 border-2 rounded-md'
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <button
        type='button'
        onClick={() => navigate(`/?search=${inputSearch}`)}
      >
        <FaSearch
          className='text-xl md:text-2xl bg-slate-100 cursor-pointer'
        />
      </button>
    </div>
  )
}
