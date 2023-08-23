import axiosInstance from '../../../globals/axiosInstance';

export async function logout() {
    const { data } = await axiosInstance.post('rest-auth/logout/');
    return data;
}
