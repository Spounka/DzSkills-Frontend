import axiosInstance from '../../../../globals/axiosInstance';
import { Category, Hashtag, Level } from '../../../../types/course';

export async function getHashtags() {
    const { data } = await axiosInstance.get('/courses/hashtags/');
    return data as Hashtag[];
}
export async function getLevels() {
    const { data } = await axiosInstance.get('/courses/levels/');
    return data as Level[];
}
export async function getCategories() {
    const { data } = await axiosInstance.get('/courses/categories/');
    return data as Category[];
}

async function postObject(url: string, body: FormData) {
    const { data } = await axiosInstance.post(url, body, {});
    return data;
}

export async function createHashtag(hashtag: FormData) {
    const { data } = await postObject('/courses/hashtags/', hashtag);
    return data;
}

export async function createLevel(level: FormData) {
    const { data } = await postObject('/courses/levels/', level);
    return data;
}
export async function createCategory(category: FormData) {
    const { data } = await postObject('/courses/categories/', category);
    return data;
}
