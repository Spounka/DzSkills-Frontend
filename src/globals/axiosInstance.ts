import axios from 'axios';

const token = localStorage.getItem('access_token');
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_HOST || 'http://localhost:80/api',
    headers: token
        ? {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
          }
        : {
              'Content-Type': 'multipart/form-data',
          },
});

export default axiosInstance;
