import axiosInstance from "../../../../globals/axiosInstance";
import { Course } from "../../../../types/course";
import { User } from "../../../../types/user";

export async function getUserByID(id: number) {
    const { data } = await axiosInstance.get(`/users/${id}/`);
    return data as User;
}

export async function getRelatedCourses(id: number) {
    const { data } = await axiosInstance.get(`/courses/owner/${id}/related/`);
    return data as Course[];
}
