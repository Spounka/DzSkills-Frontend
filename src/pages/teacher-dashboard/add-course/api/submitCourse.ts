import axiosInstance from '../../../../globals/axiosInstance';

export async function submitCourse(form: any) {
    const { data } = await axiosInstance.post('/courses/', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
}
