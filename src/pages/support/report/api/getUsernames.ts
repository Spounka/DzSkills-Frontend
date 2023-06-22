import axiosInstance from '../../../../globals/axiosInstance';
import { User } from '../../../../types/user';

// TODO: Remove waiting line
export async function getUsernames() {
    const { data } = await axiosInstance.get('/users/usernames/');
    return data as User[];
}
