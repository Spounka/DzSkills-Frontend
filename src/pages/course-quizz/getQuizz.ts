import axiosInstance from '../../globals/axiosInstance';
import { CourseQuizz } from '../../types/quizz';

export async function getQuizz(id: number) {
    const { data } = await axiosInstance.get(`/courses/${id}/quizz/`);
    return data as CourseQuizz;
}
