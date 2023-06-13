import axiosInstance from '../../../globals/axiosInstance';

export async function postEmailVerification(email: string | undefined) {
    if (!email) return Promise.reject('Email Invalid');
    return await axiosInstance.post('/rest-auth/registration/resend-email/', {
        email: email,
    });
}
