import axiosInstance from '../../../globals/axiosInstance';
import { Progression } from '../../../types/course';

export async function getStudentProgress(courseID: number) {
    console.log('being called?');

    const { data, status, statusText } = await axiosInstance.get(
        `courses/progress/${courseID}`
    );
    if (status !== 200) return Promise.reject(statusText);
    return data as Progression;
}

export async function updateStudentProgress(courseID: number) {
    await axiosInstance.put('/courses/progress/' + courseID + '/update/');
}
