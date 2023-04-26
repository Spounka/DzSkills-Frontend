import axiosInstance from "../../../../globals/axiosInstance";
import { User } from "../../../../types/user";

export async function getAllUsers() {
    const { data } = await axiosInstance.get("/users/");
    return data as User[];
}
