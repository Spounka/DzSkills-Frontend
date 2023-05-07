import axiosInstance from "../../../globals/axiosInstance";
import { Course } from "../../../types/course";

export async function getCourses(token: string | null) {
    if (!token) return null;
    const { data } = await axiosInstance.get("/courses/", {
        headers: {
            Authorization: "Bearer" + token,
        },
    });
    return data as Course[];
}

export async function getTrendingCourses() {
    const { data } = await axiosInstance.get("/courses/trending");
    return data as Course[];
}
