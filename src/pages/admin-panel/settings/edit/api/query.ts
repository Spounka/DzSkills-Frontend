import axiosInstance from '../../../../../globals/axiosInstance';

export async function changePassword(body: FormData) {
    const { data } = await axiosInstance.post('rest-auth/password/change/', {
        body,
    });
    return data;
}
