import axiosInstance from '../../../globals/axiosInstance';
import { Progression } from '../../../types/course';

export async function getStudentProgress(courseID: number) {
    const { data } = await axiosInstance.get(
        `courses/progress/${courseID}`,
        {}
    );
    return data as Progression;
}

export async function updateStudentProgress(courseID: number) {
    await axiosInstance.put('/courses/progress/' + courseID + '/update/');
}
