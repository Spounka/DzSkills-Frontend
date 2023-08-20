import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { get_notification_string_from_type, get_notification_subtitle_from_type } from '../../globals/utils';
import { Notification } from '../../types/notifications';

export function NotificationElement({ notification }: { notification: Notification; }) {
    return (
        <Stack
            direction={'row'}
            width={'100%'}
            justifyContent={'space-between'}
            gap={2}
            alignItems={'center'}
        >
            <Stack sx={{ flex: '1 1 50%' }}>
                <Typography
                    flex={'0 1 50%'}
                    color={notification.is_read ? 'gray.main' : 'black'}
                >
                    {get_notification_string_from_type(notification.notification_type)}
                </Typography>
                <Typography
                    flex={'0 1 50%'}
                    variant={'subtitle2'}
                    color={'gray.main'}
                >
                    {get_notification_subtitle_from_type(notification)?.at(0) ?? 'jjj'}
                </Typography>
            </Stack>
            <Typography
                variant={'overline'}
                color={'gray.main'}
            >
                {get_notification_subtitle_from_type(notification)?.at(1) ?? 'jjj'}
            </Typography>
        </Stack>
    );
}

