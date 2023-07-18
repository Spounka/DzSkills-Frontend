import axios from 'axios';

const token = localStorage.getItem('access');
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_HOST || 'https://dzskills.com/api',
    headers: token
        ? {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
          }
        : {
              'Content-Type': 'multipart/form-data',
          },
});
const axiosBare = axios.create({
    baseURL: import.meta.env.VITE_HOST || 'https://dzskills.com/api',
    headers: token
        ? {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
          }
        : {
              'Content-Type': 'multipart/form-data',
          },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403)
            window.location.href = '/permission-denied/';
        return Promise.reject(error);
    }
);

export default axiosInstance;
export { axiosBare };
