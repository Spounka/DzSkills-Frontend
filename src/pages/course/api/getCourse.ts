import axiosInstance from '../../../globals/axiosInstance';
import { Course } from '../../../types/course';

export async function getCourse(id: number) {
    const { data, status } = await axiosInstance.get('/courses/' + id);
    if (status === 403) return Promise.reject('Permission Denied');
    return data as Course;
}
