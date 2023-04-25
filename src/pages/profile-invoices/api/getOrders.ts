import axiosInstance from "../../../globals/axiosInstance";
import { Order } from "../../../types/payment";

export async function getRelatedOrders(token: string | null) {
    const { data } = await axiosInstance.get("/orders/all/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data as Order[];
}
