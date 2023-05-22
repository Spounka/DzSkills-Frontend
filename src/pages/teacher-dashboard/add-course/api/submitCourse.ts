import axios from 'axios';
import axiosInstance from '../../../../globals/axiosInstance';

export async function submitCourse(form: any) {
    const token = localStorage.getItem('access_token');
    const { data } = await axiosInstance.post('/courses/', form, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
}
