import axios from 'axios';

const token = localStorage.getItem('access_token');
const axiosInstance = axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
    },
});

export default axiosInstance;
