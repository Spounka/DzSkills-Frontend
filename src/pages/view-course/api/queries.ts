import axiosInstance, { axiosBare } from '../../../globals/axiosInstance';
import { Progression } from '../../../types/course';
import { VideoComment } from '../../../types/VideoComment';

export async function getStudentProgress(courseID: number) {
    const { data, status, statusText } = await axiosBare.get(
        `courses/progress/${courseID}`
    );
    if (status !== 200) return Promise.reject(statusText);
    return data as Progression;
}

export async function updateStudentProgress(courseID: number) {
    await axiosInstance.put('/courses/progress/' + courseID + '/update/');
}

export async function getVideoComments(id: number) {
    const { data } = await axiosInstance.get(`comments/video/${id}`);
    return data as VideoComment[];
}

export async function submitComment(content: string, video: number) {
    const { data } = await axiosInstance.post('comments/', {
        content: content,
        video: video,
    });
    return data;
}
