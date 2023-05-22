import axiosInstance from '../../../../globals/axiosInstance';
import { Payment } from '../../../../types/payment';

export async function getAllPayments() {
    const { data } = await axiosInstance.get('/orders/payments/manage/');
    return data as Payment[];
}

export async function acceptPayment(id: number, token: string | null) {
    if (!token) return;
    await axiosInstance.patch(
        `/orders/payments/${id}/accept/`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

export async function rejectPayment(id: number, token: string | null) {
    await axiosInstance.patch(
        `/orders/payments/${id}/reject/`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}
