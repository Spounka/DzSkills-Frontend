import axiosInstance from '../../../globals/axiosInstance';

export async function getCertificate(courseID: number) {
    return axiosInstance.get(`/courses/${courseID}/certificate/`);
}
