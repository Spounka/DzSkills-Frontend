import dayjs from 'dayjs';
import { Notification } from '../types/notifications';
import { Course } from '../types/course';
import { Order } from '../types/payment';

function fileNameFromPath(path: string): string {
    const arr = path.split('/');
    return arr[arr.length - 1];
}
function get_notification_string_from_type(notification_type: string): string | null {
    switch (notification_type) {
        case 'payment_accepted':
            return 'تم قبول الدفع';
        case 'payment_refused':
            return 'تم رفض الدفع';
        case 'course_bought':
            return 'مستخدم اشترى دورتك';
        case 'course_accepted':
            return 'تم قبول دورتك';
        case 'course_favourite':
            return 'دورتك شائعة الآن';
        case 'course_refused':
            return 'تم رفض دورتك';
        case 'course_blocked':
            return 'تم تجميد دورتك';
        case 'removed_from_course':
            return 'لقد تم إخراجك من الدورة';
        case 'user_registration':
            return 'قام مستخدم جديد بالتسجيل';
        default:
            return '';
    }
}

function get_notification_subtitle_from_type(
    notification: Notification
): string[] | null {
    const dateDiffrence = dayjs().diff(notification.date_created, 'minutes');
    let dateString = '';
    if (dateDiffrence < 60) dateString = `${dateDiffrence}m`;
    else if (dateDiffrence < 1440) dateString = `${dateDiffrence % 60}h`;
    else dateString = `${(dateDiffrence / 60 / 24).toFixed(0)}d`;
    switch (notification.notification_type) {
        case 'removed_from_course':
        case 'course_favourite':
        case 'payment_accepted':
        case 'payment_refused':
        case 'course_accepted':
        case 'course_refused':
        case 'course_blocked':
            if (
                typeof notification.extra_data === 'object' &&
                notification.extra_data &&
                'course' in notification.extra_data
            ) {
                const course = notification.extra_data?.course as Course;
                return [course.title, dateString];
            }
            return [];
        case 'course_bought':
            if (
                typeof notification.extra_data === 'object' &&
                notification.extra_data &&
                'order' in notification.extra_data
            ) {
                const order = notification.extra_data?.order as Order;
                return [order.course.title, dateString];
            }
            return [];
        case 'user_registration':
            return [
                `${notification.sender.first_name} ${notification.sender.last_name}`,
                dateString,
            ];
        default:
            return [];
    }
}

export {
    fileNameFromPath,
    get_notification_string_from_type,
    get_notification_subtitle_from_type,
};
