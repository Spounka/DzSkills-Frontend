import axiosInstance from '../../../globals/axiosInstance';

export async function closeTicket(id: number) {
    if (id <= 0) return Promise.reject('ID Invalid');
    const { data } = await axiosInstance.patch(`/support/${id}/`, { state: 'closed' });
    return data;
}
