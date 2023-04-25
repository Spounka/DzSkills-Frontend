import axiosInstance from "../../../globals/axiosInstance";
import { LoginUser } from "../../../redux/userSlice";

export async function login({ email, password }: any) {
    const { data } = await axiosInstance.post("/rest-auth/login/", {
        email,
        password,
    });
    return data as LoginUser;
}

export async function signUp({
    email,
    password1,
    password2,
    first_name,
    last_name,
}: any) {
    const { data } = await axiosInstance.post("/rest-auth/registration/", {
        first_name,
        last_name,
        email,
        password1,
        password2,
    });
    return data as LoginUser;
}
