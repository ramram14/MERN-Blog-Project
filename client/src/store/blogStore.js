import { create } from 'zustand';
import { axiosClient } from '../lib/axios';
import { formatError } from '../lib/utils';
import toast from 'react-hot-toast';

export const useBlogStore = create((set, get) => ({
  blog: [],
  slug: '',
  loading: false,

  setBlog: async (slug) => {
    try {
      const { data } = await axiosClient.get(`api/blog/${slug}`)
      if (data.success) {
        set({
          blog: data.data,
          slug
        })
      }
    } catch (error) {
      formatError(error)
    }
  },

  refreshBlog: async () => {
    const slug = get().slug;
    await get().setBlog(slug)
  },

  createComment: async (content) => {
    set({ loading: true })
    const blogId = get().blog._id;
    if (!blogId) {
      return
    };
    try {
      const { data } = await axiosClient.post(`/api/comment/${blogId}`, content)

      if (data.success) {
        await get().refreshBlog()
      }
    } catch (error) {
      if (error.response.data.errorMessages) {
        toast.dismiss()
        toast.error(error.response.data.errorMessages);
      } else {
        formatError(error)
      }
    } finally {
      set({ loading: false })
    }
  }
}))