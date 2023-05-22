import axiosInstance from '../../../globals/axiosInstance';

export async function logout(token: string | null) {
    if (!token) return;
    const { data } = await axiosInstance.post(
        'rest-auth/logout/',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
}
