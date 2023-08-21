import axiosInstance from '../../../../../globals/axiosInstance';

export async function changePassword(body: FormData, id: number) {
    const { data } = await axiosInstance.patch(`users/${id}/password/update/`, body);
    return data;
}
