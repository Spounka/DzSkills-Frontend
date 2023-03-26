import axiosInstance from "../../../globals/axiosInstance";

export async function getRelatedOrders(token: string | null) {
    return await axiosInstance.get("/orders/all/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
