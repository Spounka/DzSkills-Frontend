import axiosInstance from '../../../globals/axiosInstance';
import { Receipt } from '../../../types/admin_config';

export async function createOrder(data: FormData) {
    return await axiosInstance.post('/orders/', data, {});
}

export async function getCurrentReceipt() {
    const { data } = await axiosInstance.get('/configs/receipts/current/');
    return data as Receipt;
}
