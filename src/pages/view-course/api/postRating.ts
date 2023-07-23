import axiosInstance from '../../../globals/axiosInstance';

export async function postRating(
    studentID: number | undefined,
    rating: number,
    videoID?: number,
    update?: boolean
) {
    if (!studentID) return Promise.reject('Student ID must be provided');
    if (!videoID) return Promise.reject('Video ID invalid');
    if (update)
        return await axiosInstance.patch(`/courses/${videoID}/ratings/`, {
            rating: rating,
            // student: studentID,
            // video: videoID,
        });
    return await axiosInstance.post(`/courses/${videoID}/ratings/`, {
        rating: rating,
        student: studentID,
        video: videoID,
    });
}
