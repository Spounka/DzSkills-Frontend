import axiosInstance from '../../../../globals/axiosInstance';
import { User } from '../../../../types/user';

export async function getUsernames() {
    const { data } = await axiosInstance.get('/users/usernames/');
    return data as User[];
}
