import axiosInstance from '../../../globals/axiosInstance';

export async function validateEmail(key: string | undefined) {
    if (!key) return Promise.reject('Invalide Key');
    return await axiosInstance.post(
        '/rest-auth/registration/verify-email/',
        { key: key },
        {}
    );
}
