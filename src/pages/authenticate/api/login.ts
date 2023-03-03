import axiosInstance from "../../../globals/axiosInstance";

export async function login({ email, password }: any) {
    const { data } = await axiosInstance.post("/rest-auth/login/", {
        email,
        password,
    });
    return data;
}

export async function signUp({
    email,
    password1,
    password2,
    first_name,
    last_name,
}: any) {
    const { data } = await axiosInstance.post("/rest-auth/login", {
        first_name,
        last_name,
        email,
        password1,
        password2,
    });
    return data;
}
