import axiosInstance from '../../../globals/axiosInstance';
import { Order } from '../../../types/payment';

export async function getRelatedOrders() {
    const { data } = await axiosInstance.get('/orders/all/');
    return data as Order[];
}
