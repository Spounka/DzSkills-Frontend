import axiosInstance from "../../../globals/axiosInstance";

export async function getCourses() {
    return await axiosInstance.get("/courses");
}

export async function getTrendingCourses() {
    return await axiosInstance.get("/courses/trending");
}
