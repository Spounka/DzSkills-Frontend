import dayjs, {Dayjs} from "dayjs";

type NotificationUser = {
    pk: number,
    first_name: string,
    last_name: string,
    profile_image: string,
}

export type Notification = {
    id: number,
    sender: NotificationUser,
    recipient: NotificationUser,
    notification_type: string,
    is_read: boolean;
    date_created: Dayjs,
    extra_data: unknown
}