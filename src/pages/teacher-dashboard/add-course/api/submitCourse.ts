import { AxiosProgressEvent } from 'axios';
import axiosInstance from '../../../../globals/axiosInstance';

export async function submitCourse(
    form: any,
    uploadProgress?: (event: AxiosProgressEvent) => void
) {
    const { data } = await axiosInstance.post('/courses/', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgress,
    });
    return data;
}
