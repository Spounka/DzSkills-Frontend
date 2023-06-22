import axiosInstance from '../../../../globals/axiosInstance';

export async function submitReport(body: FormData) {
    const { data } = await axiosInstance.post('/support/tickets/', body);
    return data;
}
