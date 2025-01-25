import toast from 'react-hot-toast';
import { axiosClient } from '../lib/axios';
import { create } from 'zustand';
import { formatError } from '../lib/utils';
import { persist } from "zustand/middleware";

export const useAuthStore = create()(
  persist(
    ((set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),
      signUp: async (userData) => {
        try {
          set({ isLoading: true })
          toast.dismiss()
          const { data } = await axiosClient.post('/api/auth/signup', userData)
          if (data.success) {
            set({
              user: data.data,
              isAuthenticated: true
            })
            toast.success(data.message)
            window.location.href = '/'
            return
          }
          toast.error(data.message)
        } catch (error) {
          formatError(error)
          return error.response.data
        } finally {
          set({ isLoading: false })
        }
      },

      signIn: async (userData) => {
        try {
          set({ isLoading: true })
          toast.dismiss()
          const { data } = await axiosClient.post('/api/auth/signin', userData);
          if (data.success) {
            set({
              user: data.data,
              isAuthenticated: true
            })
            toast.success(data.message)
            window.location.href = '/'
            return
          }
        } catch (error) {
          formatError(error)
          return error.response.data
        } finally {
          set({ isLoading: false })
        }
      },

      signOut: async () => {
        try {
          await axiosClient.post('/api/auth/signout')
          set({
            user: null,
            isAuthenticated: false
          })
        } catch (error) {
          formatError(error)
        }
      },

      updateProfileData: async (formData) => {
        try {
          set({ isLoading: true })
          toast.dismiss()
          const { data } = await axiosClient.patch('/api/user/profile-data', formData)
          if (data.success) {
            set({
              user: data.data,
            })
            toast.success(data.message)
            return
          }
        } catch (error) {
          formatError(error)
          return error.response.data

        } finally {
          set({ isLoading: false })
        }
      },

      updateProfileImage: async (formData) => {
        try {
          set({ isLoading: true })
          toast.dismiss()
          const { data } = await axiosClient.patch('/api/user/profile-data-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (data.success) {
            set({
              user: data.data,
              isAuthenticated: true
            })
            toast.success(data.message)
            return
          }
          toast.error(data.message)
        } catch (error) {
          formatError(error)
        } finally {
          set({ isLoading: false })
        }
      }
    }))
  )
)