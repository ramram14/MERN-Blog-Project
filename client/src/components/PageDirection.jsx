import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

PageDirection.propTypes = {
  direction: PropTypes.string
}
const pageDirection = [
  {
    title: 'Profile',
    url: '/profile'
  },
  {
    title: 'My Post',
    url: '/my-post'
  }
]

export default function PageDirection({ direction }) {
  const navigate = useNavigate()
  return (
    <div className={`w-full flex justify-around items-center border-b-2`}>
      {pageDirection.map((item, i) => {
        return (
          <h1
            key={i}
            onClick={() => navigate(item.url)}
            className={`w-full text-center p-2 cursor-pointer text-sm ${direction === item.title ? 'bg-amber-600 border-b-2' : 'hover:text-slate-600'} hover:border-b-2 font-semibold ${direction === item.title && 'text-black border-b border-primary '}`}
          >
            {item.title}
          </h1>
        )
      })}
    </div>
  )
}