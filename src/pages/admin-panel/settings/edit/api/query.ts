import axiosInstance from '../../../../../globals/axiosInstance';

export async function changePassword(body: FormData, token: string | null) {
    if (!token) Promise.reject();
    const { data } = await axiosInstance.post(
        'rest-auth/password/change/',
        {
            body,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}
