import axios from 'axios';

let axiosInstance = axios.create({
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
let axiosBare = axios.create({
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
    axiosInstance = axios.create({
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
    axiosBare = axios.create({
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
