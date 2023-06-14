import axiosInstance from '../../../globals/axiosInstance';
import { Course } from '../../../types/course';

export async function getCourses() {
    const url = `/courses/`;
    const { data } = await axiosInstance.get(url);
    return data as Course[];
}

export async function getTrendingCourses() {
    const { data } = await axiosInstance.get('/courses/trending');
    return data as Course[];
}
