import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://write-sphere-backend-jh4170qts-ikrams-projects-e50d00ad.vercel.app:8000/',
  withCredentials: true
})