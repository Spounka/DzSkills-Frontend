import axiosInstance from '../../../../../globals/axiosInstance';

export async function createAdmin(data: FormData) {
    return await axiosInstance.post('/users/admin/create/', data);
}
