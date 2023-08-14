import { MarkChatRead, Notifications } from '@mui/icons-material';
import { Badge, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack, useTheme } from '@mui/system';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/png/logo@2x.png';
import { ReactComponent as Profile } from '../../assets/svg/Profile icon.svg';
import axiosInstance from '../../globals/axiosInstance';
import { getUser } from '../../pages/edit-profile/api/getUser';
import { LandingPageNavbar } from '../../pages/landing-page/LandingPageNavbar';
import { Course } from '../../types/course';
import { Notification } from '../../types/notifications';
import { Order } from '../../types/payment';
import { DropdownPopper } from '../dropdown-popper';

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
    notification: Notification,
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

function NotificationElement({ notification }: { notification: Notification }) {
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

export default function TopNavigationBar() {
    const theme = useTheme();

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const token = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
        onSuccess: () => setLoggedIn(true),
        onError: () => setLoggedIn(false),
    });
    const notificationsQuery = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/notifications/');
            return data as Notification[];
        },
        refetchInterval: 1000 * 60 * 5,
    });

    const queryClient = useQueryClient();
    const notificationsReadMutation = useMutation({
        mutationKey: ['notifications', 'read'],
        mutationFn: async () => {
            return await axiosInstance.post('/notifications/read/');
        },
        onSuccess: () => queryClient.invalidateQueries(['notifications']),
    });

    const [popperActive, setPopperActive] = useState(false);
    const [notificationsActive, setNotificationsActive] = useState(false);
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const handleMarkAsReadClick = () => {
        notificationsReadMutation.mutate();
    };
    useEffect(() => {
        setLoggedIn(userQuery.isSuccess);
    }, [userQuery.data?.username]);

    if (!loggedIn) return <LandingPageNavbar />;

    return (
        <>
            <DropdownPopper
                clickAway={() => setPopperActive(false)}
                isOpen={popperActive}
                cardRef={navRef}
                placement='bottom-end'
            >
                <Stack
                    gap={2}
                    sx={{
                        direction: 'rtl',
                        pl: 2,
                    }}
                >
                    <Typography
                        onClick={() => setPopperActive(false)}
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                                transition: 'color 100ms ease-in-out',
                            },
                        }}
                    >
                        <NavLink to={'/profile/'}>الملف الشخصي</NavLink>
                    </Typography>
                    <Typography
                        onClick={() => setPopperActive(false)}
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                                transition: 'color 100ms ease-in-out',
                            },
                        }}
                    >
                        <Link to={'/profile/edit/'}>اعدادات الحساب</Link>
                    </Typography>
                    <Typography
                        onClick={() => setPopperActive(false)}
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                                transition: 'color 100ms ease-in-out',
                            },
                        }}
                    >
                        <Link to={'/support/'}>مساعدة</Link>
                    </Typography>

                    {userQuery.data?.groups.some(
                        g => g.name == 'TeacherGroup' || g.name == 'AdminGroup',
                    ) ? (
                        <Typography
                            onClick={() => setPopperActive(false)}
                            sx={{
                                '&:hover': {
                                    color: 'primary.main',
                                    transition: 'color 100ms ease-in-out',
                                },
                            }}
                        >
                            <Link to={'/dashboard/teacher/'}>لوحة تحكم المرشد</Link>
                        </Typography>
                    ) : (
                        <></>
                    )}
                    {userQuery.data?.groups.some(g => g.name == 'AdminGroup') ? (
                        <Typography
                            onClick={() => setPopperActive(false)}
                            sx={{
                                '&:hover': {
                                    color: 'primary.main',
                                    transition: 'color 100ms ease-in-out',
                                },
                            }}
                        >
                            <Link to={'/admin/'}>لوحة تحكم المسؤول</Link>
                        </Typography>
                    ) : (
                        <></>
                    )}

                    <Typography
                        color={'error'}
                        onClick={() => setPopperActive(false)}
                    >
                        <Link to={'/logout/'}>تسجيل الخروج</Link>
                    </Typography>
                </Stack>
            </DropdownPopper>
            <DropdownPopper
                clickAway={() => setNotificationsActive(false)}
                isOpen={notificationsActive}
                cardRef={menuRef}
                placement='bottom-end'
            >
                <Stack
                    gap={2}
                    sx={{
                        direction: 'rtl',
                        pl: 2,
                    }}
                >
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        gap={2}
                        width={'100%'}
                    >
                        <Typography>الإشعارات</Typography>
                        <Tooltip title={'اعتبر مقروء'}>
                            <IconButton
                                color={'primary'}
                                onClick={handleMarkAsReadClick}
                                disabled={
                                    !notificationsQuery.data?.some(n => !n.is_read)
                                }
                                sx={{
                                    px: 0,
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
                                        <NotificationElement notification={n} />
                                    </React.Fragment>
                                );
                            })
                        )}
                    </Stack>
                </Stack>
            </DropdownPopper>
            <nav style={{ width: '100%' }}>
                <Box
                    sx={{
                        backgroundColor: 'black',
                        display: {
                            xs: 'none',
                            md: 'grid',
                        },
                        px: {
                            lg: theme.spacing(16),
                            xl: theme.spacing(26),
                            xs: theme.spacing(4),
                        },
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        gap: {
                            xs: theme.spacing(2),
                            sm: theme.spacing(4),
                            md: theme.spacing(6),
                            lg: theme.spacing(8),
                        },
                        py: theme.spacing(3),
                    }}
                >
                    <Link to={'/'}>
                        <img
                            src={logo}
                            alt=''
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 3,
                                maxWidth: theme.spacing(18),
                            }}
                        />
                    </Link>

                    <Box
                        alignItems={'center'}
                        sx={{
                            gridColumnStart: 4,
                            gridColumnEnd: 9,
                            typography: 'subtitle1',
                            fontWeight: {
                                md: 500,
                                lg: 700,
                            },
                            color: 'white',
                            display: 'flex',
                            gap: {
                                lg: theme.spacing(5),
                                md: theme.spacing(6),
                            },
                        }}
                    >
                        <Typography
                            variant={'subtitle1'}
                            fontWeight={{ md: 500, lg: 600 }}
                            sx={{
                                transition: 'all ease 300ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink
                                to='/courses'
                                style={{}}
                            >
                                كورسات
                            </NavLink>
                        </Typography>

                        <Typography
                            variant={'subtitle1'}
                            fontWeight={{ md: 500, lg: 600 }}
                            sx={{
                                transition: 'all ease 100ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink to='/about'>من نحن</NavLink>
                        </Typography>

                        <Typography
                            variant={'subtitle1'}
                            fontWeight={{ md: 500, lg: 600 }}
                            sx={{
                                transition: 'all ease 100ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink to='/teachers'>المدربون</NavLink>
                        </Typography>

                        <Typography
                            variant={'subtitle1'}
                            fontWeight={{ md: 500, lg: 600 }}
                            sx={{
                                transition: 'all ease 100ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink to='/support'>تواصل</NavLink>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            gridColumnStart: 11,
                            gridColumnEnd: 13,
                            display: 'flex',
                            gap: theme.spacing(4),
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <Badge
                            color={'error'}
                            badgeContent={
                                notificationsQuery.data?.filter(n => !n.is_read).length
                            }
                        >
                            <Tooltip title={'الإشعارات'}>
                                <IconButton
                                    color={'secondary'}
                                    onClick={() => setNotificationsActive(val => !val)}
                                    ref={menuRef}
                                >
                                    <Notifications
                                        sx={{
                                            fill: 'white',
                                            height: theme.spacing(4),
                                            width: theme.spacing(4),
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Badge>
                        <IconButton
                            ref={navRef}
                            color={'secondary'}
                            onClick={() => setPopperActive(val => !val)}
                            sx={{
                                '& :hover': {
                                    color: 'primary.main',
                                    fill: 'primary.main',
                                },
                            }}
                        >
                            <Profile
                                style={{
                                    maxHeight: theme.spacing(3),
                                    maxWidth: theme.spacing(3),
                                    color: 'inherit',
                                    fill: 'inherit',
                                }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </nav>
        </>
    );
}
