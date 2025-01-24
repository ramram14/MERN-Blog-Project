import toast from 'react-hot-toast';
import moment from 'moment';

export const formatError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message)
  } else {
    console.log(error.message)
    toast.error(error.message)
  }
}


export const timeAgo = (date) => {
  return moment(date).fromNow();
};