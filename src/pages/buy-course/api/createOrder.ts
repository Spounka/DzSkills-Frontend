import axiosInstance from '../../../globals/axiosInstance';

export async function createOrder(
    courseId: number,
    token: string | null,
    data: FormData
) {
    return await axiosInstance.post('/orders/', data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
}
