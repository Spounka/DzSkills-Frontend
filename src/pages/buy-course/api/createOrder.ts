import axiosInstance from '../../../globals/axiosInstance';
import { Receipt } from '../../../types/admin_config';

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

export async function getCurrentReceipt() {
    const { data } = await axiosInstance.get('/configs/receipts/current/');
    return data as Receipt;
}
