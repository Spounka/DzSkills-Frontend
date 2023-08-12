import { MarkChatRead } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosInstance from '../../../../globals/axiosInstance';
import { Notification as NotificationType } from '../../../../types/notifications';
import { Order } from '../../../../types/payment';

interface NotificationsProps {
    drawerOpen: boolean;
    mainColor: string | undefined;
}

export function NotificationsBar({ drawerOpen, mainColor }: NotificationsProps) {
    const theme = useTheme();
    const notificationsQuery = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/notifications/');
            return data as NotificationType[];
        },
        refetchInterval: 1000 * 60 * 5,
    });
    const handleMarkAsReadClick = () => {
        notificationsReadMutation.mutate();
    };

    const queryClient = useQueryClient();
    const notificationsReadMutation = useMutation({
        mutationKey: ['notifications', 'read'],
        mutationFn: async () => {
            return await axiosInstance.post('/notifications/read/');
        },
        onSuccess: () => queryClient.invalidateQueries(['notifications']),
    });
    return (
        <Card
            aria-label="notifcations-bar"
            sx={{
                transition: 'all ease-out 300ms',
                transform: drawerOpen ? 'translate(0, 0)' : 'translate(-105%, 0)',
                p: 2,
                mt: 0,
                bgcolor: mainColor ?? theme.palette.purple.light,
                color: 'white',
                borderRadius: `0 ${theme.spacing()} ${theme.spacing()} 0`,
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                position: 'fixed',
                left: 0,
                width: '20%',
                height: '100%',
                zIndex: 4,
            }}
        >
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={2}
                width={'100%'}
                pl={2}
            >
                <Typography>الإشعارات</Typography>
                <Tooltip title={'اعتبر مقروء'}>
                    <IconButton
                        onClick={handleMarkAsReadClick}
                        disabled={!notificationsQuery.data?.some(n => !n.is_read)}
                        sx={{
                            px: 0,
                            fill: 'white',
                            color: 'white',
                        }}
                    >
                        <MarkChatRead />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Stack
                direction={'column-reverse'}
                gap={1}
            >
                {notificationsQuery.data?.length === 0 ? (
                    <Typography>لا يوجد أي إشعارات</Typography>
                ) : (
                    notificationsQuery.data?.slice(-5).map(n => {
                        return (
                            <React.Fragment key={n.id}>
                                <Notification notification={n} />
                            </React.Fragment>
                        );
                    })
                )}
            </Stack>
        </Card>
    );
}

function Notification({ notification }: { notification: NotificationType }) {
    const theme = useTheme();

    const getNotificationTitleFromType = (notification_type: string): string | null => {
        switch (notification_type) {
            case 'course_bought':
                return 'قام مستخدم بشراء كورس';
            case 'user_registration':
                return 'قام مستخدم جديد بالتسجيل';
            default:
                return '';
        }
    };

    const getNotificationSubtitle = (
        notification: NotificationType
    ): string[] | null => {
        const dateDiffrence = dayjs().diff(notification.date_created, 'minutes');
        let dateString = '';
        if (dateDiffrence < 60) dateString = `${dateDiffrence}m`;
        else if (dateDiffrence < 1440) dateString = `${dateDiffrence % 60}h`;
        else dateString = `${Math.floor(dateDiffrence / 60 / 24)}d`;
        switch (notification.notification_type) {
            case 'course_bought':
                if (
                    typeof notification.extra_data === 'object' &&
                    notification.extra_data &&
                    'order' in notification.extra_data
                ) {
                    const order = notification.extra_data?.order as Order;
                    return [order.course.title, order.buyer.profile_image, dateString];
                }
                return [];
            case 'user_registration':
                return [
                    `${notification.sender.first_name} ${notification.sender.last_name}`,
                    notification.sender.profile_image,
                    dateString,
                ];
            default:
                return [];
        }
    };

    return (
        <Box
            display={'flex'}
            gap={2}
            alignItems={'center'}
        >
            <Avatar
                src={getNotificationSubtitle(notification)?.at(1) ?? ''}
                sx={{
                    width: theme.spacing(6),
                    height: theme.spacing(6),
                    aspectRatio: '1/1',
                }}
            />
            <Box
                display={'flex'}
                flexDirection={'column'}
            >
                <Typography
                    variant={'caption'}
                    fontWeight={notification.is_read ? 500 : 600}
                >
                    {getNotificationTitleFromType(notification.notification_type)}
                </Typography>
                <Typography
                    variant={'caption'}
                    fontWeight={notification.is_read ? 300 : 400}
                >
                    {getNotificationSubtitle(notification)?.at(0) ?? ''}
                </Typography>
            </Box>
            <Typography
                variant={'subtitle2'}
                flex={'1 1'}
                textAlign={'left'}
                fontWeight={notification.is_read ? 300 : 400}
            >
                {getNotificationSubtitle(notification)?.at(2) ?? ''}
            </Typography>
        </Box>
    );
}
