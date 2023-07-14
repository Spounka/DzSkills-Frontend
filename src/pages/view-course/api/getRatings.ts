import axiosInstance from '../../../globals/axiosInstance';
import { Rating as Ratings } from '../../../types/course';

export async function getRatings(videoID: number) {
    if (videoID === 0) return Promise.reject('0 ID provided');
    const { data } = await axiosInstance.get(`/courses/${videoID}/ratings/`);
    return data as Ratings[];
}
