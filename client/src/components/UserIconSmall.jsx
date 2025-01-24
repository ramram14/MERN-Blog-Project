import { FaUserCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

UserIconSmall.propTypes = {
  image: PropTypes.string,
}

export default function UserIconSmall({ image }) {
  return (
    <>
      {
        image ? (
          <img
            src={image}
            alt='profile image'
            className='w-10 h-10 rounded-full object-cover'
          />
        ) : (
          <FaUserCircle className='w-10 h-10' />
        )
      }
    </>
  )
}