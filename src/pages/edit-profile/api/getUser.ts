import axiosInstance from '../../../globals/axiosInstance';
import { LoginUser } from '../../../redux/userSlice';
import { User } from '../../../types/user';

export async function updateProfile(values: LoginUser) {
    const { data } = await axiosInstance.patch('/rest-auth/', values);
    return data;
}

export async function refreshToken(refresh: string | any) {
    return await axiosInstance.post('/rest-auth/token/refresh/', {
        refresh: refresh,
    });
}

export async function verifyToken(token: any) {
    return await axiosInstance.post('/rest-auth/token/verify/', {
        token: token,
    });
}

export async function verifyOrRefreshToken(token: any, refresh: any) {
    return await verifyToken(token).catch(async (error: any) => {
        if (error.response && error.response.status === 401) {
            return await refreshToken(refresh).catch(error => {
                throw Error(error);
            });
        }
    });
}

export async function fetchUser(token: string | null) {
    const { data } = await axiosInstance.get('/rest-auth/user/', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return data as User;
}

export async function getUser(token: string | null, refresh: string | null) {
    return await verifyOrRefreshToken(token, refresh)
        .then(response => {
            if (!response) throw Error('failed');
            if (response.data.access === undefined) {
                return localStorage.getItem('access');
            } else {
                localStorage.setItem('access', response.data.access);
                return response.data.acesss;
            }
        })
        .catch(error => {
            throw Error(error);
        })
        .then(async access => {
            return await fetchUser(access);
        })
        .catch(error => {
            throw Error(error);
        });
}
