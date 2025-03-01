import { create } from 'zustand';
import { axiosClient } from '../lib/axios';
import { formatError } from '../lib/utils';
import toast from 'react-hot-toast';
import { useAuthStore } from './authStore';

const { user } = useAuthStore.getState();
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

  setBlogByAuthor: async () => {
    try {
      set({ loading: true })
      const { data } = await axiosClient.get(`api/blog/author`);
      if (data.success) {
        set({
          blog: data.data,
        })
      }
    } catch (error) {
      formatError(error)
    } finally {
      set({ loading: false })
    }
  },

  deleteBlog: async (slug) => {
    try {
      set({ loading: true })
      const { data } = await axiosClient.delete(`/api/blog/${slug}`)
      if (data.success) {
        toast.success(data.message)
        // If success we call setBlogByAuthor again to get newest blog data
        await get().setBlogByAuthor()
      }

    } catch (error) {
      formatError(error)
    } finally {
      set({ loading: false })
    }

  },

  refreshBlog: async () => {
    // We make new function to refresh blog because we need to get the slug
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
        // If success we call refreshBlog again to get newest comment data,
        // Why we dont set the new comment on state to avoid re render?
        // It can be, but we need to provide data user as well like image url, name and more, It can and i will change it later.
        // TODO: Set the new comment on state
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
  },

  deleteComment: async (commentId) => {
    set({ loading: true })
    try {
      const { data } = await axiosClient.delete(`/api/comment/${commentId}`)
      if (data.success) {
        set((prev) => ({
          blog: {
            ...prev.blog,
            comments: prev.blog.comments.filter((comment) => comment._id !== commentId)
          }
        }))
      }
    } catch (error) {
      formatError(error)
    } finally {
      set({ loading: false })
    }
  },

  likeOrUnlikeComment: async (commentId) => {
    try {
      const { data } = await axiosClient.post(`/api/comment/${commentId}/like`)
      if (data.success) {
        set((prev) => {
          const userId = user._id;
          return {
            blog: {
              ...prev.blog,
              comments: prev.blog.comments.map((comment) => {
                if (comment._id === commentId) {
                  if (comment.LikeUsers.includes(userId)) {
                    comment.LikeUsers = comment.LikeUsers.filter((id) => id !== userId)
                    comment.likesNumber = comment.likesNumber - 1
                  } else {
                    comment.LikeUsers.push(userId)
                    comment.likesNumber = comment.likesNumber + 1
                  }
                }
                return comment
              })
            }
          }
        })
      }
    } catch (error) {
      console.log(error)
      formatError(error)
    }
  }
}))