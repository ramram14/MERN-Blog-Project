import toast from 'react-hot-toast';
import moment from 'moment';

export const formatError = (error) => {
  toast.dismiss()
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

export const formatViews = (views) => {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M views`;
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K views`;
  } else {
    return views;
  }
};
