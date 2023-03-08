import axiosInstance from "../../../globals/axiosInstance";
import User from "../../../redux/userSlice";

export async function updateProfile(values: typeof User) {
    const { data } = await axiosInstance.patch("/rest-auth/", values);
    return data;
}

export async function refreshToken(refresh_token: string | any) {
    return await axiosInstance.post("/rest-auth/token/refresh/", {
        refresh: refresh_token,
    });
}

export async function verifyToken(token: any) {
    return await axiosInstance.post("/rest-auth/token/verify/", {
        token: token,
    });
}

export async function verifyOrRefreshToken(
    token: any,
    refresh_token: any
) {
    return await verifyToken(token).catch(async (error: any) => {
        if (error.response && error.response.status === 401) {
            return await refreshToken(refresh_token).catch(
                (error) => {
                    throw Error(error);
                }
            );
        }
    });
}

export async function fetchUser(token: string | null) {
    return await axiosInstance.get("/rest-auth/user/", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
}

export async function getUser(
    token: string | null,
    refresh_token: string | null
) {
    return await verifyOrRefreshToken(token, refresh_token)
        .then((response) => {
            if (!response) throw Error("failed");
            if (response.data.access === undefined) {
                console.log("old token valid");
                return localStorage.getItem("access_token");
            } else {
                console.log("setting new token");
                localStorage.setItem(
                    "access_token",
                    response.data.access
                );
                return response.data.acesss;
            }
        })
        .catch((error) => {
            console.log("error occured");
            throw Error(error);
        })
        .then(async (access) => {
            return await fetchUser(access);
        })
        .then((result) => result.data)
        .catch((error) => {
            throw Error(error);
        });
}
