import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://write-sphere-backend.vercel.app',
  withCredentials: true
})