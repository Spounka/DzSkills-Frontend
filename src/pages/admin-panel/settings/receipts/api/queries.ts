import axiosInstance from '../../../../../globals/axiosInstance';
import { Receipt } from '../../../../../types/admin_config';

export async function getAllReceipts() {
    const { data } = await axiosInstance.get('/configs/receipts/');
    return data as Receipt[];
}

export async function createReceipt(body: FormData) {
    const { data } = await axiosInstance.post('/configs/receipts/', body, {});
    return data;
}
