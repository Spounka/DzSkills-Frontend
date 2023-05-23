import axiosInstance from '../../../../globals/axiosInstance';
import { Payment } from '../../../../types/payment';

export async function getAllPayments() {
    const { data } = await axiosInstance.get('/orders/payments/manage/');
    return data as Payment[];
}

export async function acceptPayment(id: number) {
    await axiosInstance.patch(`/orders/payments/${id}/accept/`);
}

export async function rejectPayment(id: number) {
    await axiosInstance.patch(`/orders/payments/${id}/reject/`);
}
