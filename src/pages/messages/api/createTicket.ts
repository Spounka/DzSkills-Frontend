import axiosInstance from '../../../globals/axiosInstance';
import { Ticket } from '../../../types/messages';

export async function createTicket() {
    const { data } = await axiosInstance.post(`/support/`);
    return data as Ticket;
}
