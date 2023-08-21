import axiosInstance from '../../../globals/axiosInstance';
import { Certificate } from '../../../types/course';

export async function getCertificate(courseID: number) {
    const { data } = await axiosInstance.get(`/courses/${courseID}/certificate/`);
    return data as Certificate;
}
