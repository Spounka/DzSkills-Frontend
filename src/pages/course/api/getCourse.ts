import axiosInstance from "../../../globals/axiosInstance";
import { Course } from "../../../types/course";

export async function getCourse(id: number) {
    const { data } = await axiosInstance.get("/courses/" + id);
    return data as Course;
}
