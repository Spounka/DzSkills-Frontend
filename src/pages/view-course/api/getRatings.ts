import axiosInstance from '../../../globals/axiosInstance';
import { Rating as Ratings } from '../../../types/course';

export async function getRatings(videoID: number) {
    const { data } = await axiosInstance.get(`/courses/${videoID}/ratings/`);
    return data as Ratings[];
}
