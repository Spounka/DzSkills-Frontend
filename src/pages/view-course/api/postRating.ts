import axiosInstance from '../../../globals/axiosInstance';

export async function postRating(
    studentID: number | undefined,
    videoID: number,
    rating: number,
    update?: boolean
) {
    if (!studentID) return Promise.reject('Student ID must be provided');
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
