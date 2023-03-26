import axiosInstance from "../../../globals/axiosInstance";

export async function getCourse(id: number) {
    return await axiosInstance.get("/courses/" + id);
}
