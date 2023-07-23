import axiosInstance from '../../globals/axiosInstance';
import { Course } from '../../types/course';

export async function getStudentRelatedCourses(id?: number) {
    const url = id ? `/courses/student/${id}/related/` : '/courses/student/related/';
    const { data } = await axiosInstance.get(url);
    return data as Course[];
}
