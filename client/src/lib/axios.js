import axios from 'axios';
const development = null /*'http://localhost:8000'*/
export const axiosClient = axios.create({
  baseURL: development ? development : 'https://write-sphere-backend.vercel.app',
  withCredentials: true
})