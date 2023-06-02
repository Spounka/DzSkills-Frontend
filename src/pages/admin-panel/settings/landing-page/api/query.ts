import axiosInstance from '../../../../../globals/axiosInstance';
import { AdminConfig } from '../../../../../types/AdminConfig';

export async function getAdminConfigs() {
    const { data } = await axiosInstance.get('configs/');
    return data as AdminConfig;
}
