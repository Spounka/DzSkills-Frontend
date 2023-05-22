import axiosInstance from '../../../globals/axiosInstance';
import { Progression } from '../../../types/course';

export async function getStudentProgress(
    courseID: number,
    access_token: string | null
) {
    if (!access_token) return null;
    const { data } = await axiosInstance.get(`courses/progress/${courseID}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    });
    return data as Progression;
}

export async function updateStudentProgress(
    courseID: number,
    access_token: string | null
) {
    if (!access_token) throw Error('access token is required');
    await axiosInstance.put(
        '/courses/progress/' + courseID + '/update/',
        {},
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        }
    );
}
