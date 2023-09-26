import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_HOST || 'https://dzskills.com/api',
    headers: localStorage.getItem('access')
        ? {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
            'Accept-Language': 'ar',
        }
        : {
            'Content-Type': 'multipart/form-data',
            'Accept-Language': 'ar',
        },
});
const axiosBare = axios.create({
    baseURL: import.meta.env.VITE_HOST || 'https://dzskills.com/api',
    headers: localStorage.getItem('access')
        ? {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
            'Accept-Language': 'ar',
        }
        : {
            'Content-Type': 'multipart/form-data',
            'Accept-Language': 'ar',
        },
});

function resetAxiosInstances() {
    const value = localStorage.getItem('access') ? `Bearer ${localStorage.getItem('access')}` : ''
    axiosInstance.defaults.headers.common.Authorization = value
    axiosBare.defaults.headers.common.Authorization = value
}

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403)
            window.location.href = '/permission-denied/';
        return Promise.reject(error);
    }
);

export default axiosInstance;
export { axiosBare, resetAxiosInstances };
