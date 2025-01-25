import { RiLoader5Fill } from 'react-icons/ri'
import PropTypes from 'prop-types';

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

// Reusable Loading button
export default function LoadingButton({
  loading,
  text,
  onClickHandler = () => { },
  className
}) {

  return (
    <button
      type='button'
      disabled={loading}
      onClick={onClickHandler}
      enterKeyHint='enter'
      className={className}
    >
      {loading ? <RiLoader5Fill className='animate-spin mx-auto' /> : text}
    </button>
  )
}


