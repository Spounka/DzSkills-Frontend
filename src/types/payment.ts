import { Course } from "./course";
import { User } from "./user";

export type Order = {
    id: number;
    course: Course;
    buyer: User;
    date_issued: string;
    payment: Payment;
};

export type Payment = {
    id: number;
    order: Order;
    receipt: string | undefined;
    // pending, accepted, refused
    status: "p" | "a" | "r" | undefined;
};
