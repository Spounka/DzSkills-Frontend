import {MarkChatRead, MarkunreadMailboxRounded, Notifications} from '@mui/icons-material';
import {IconButton, Menu, Tooltip} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Stack, useTheme} from '@mui/system';
import {useRef, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../assets/png/logo@2x.png';
import {ReactComponent as Profile} from '../../assets/svg/Profile icon.svg';
import {getUser} from '../../pages/edit-profile/api/getUser';
import {DropdownPopper} from '../dropdown-popper';
import axiosInstance from "../../globals/axiosInstance";
import {Notification} from "../../types/notifications";
import React from 'react';
import Image from "mui-image";
import {Course} from "../../types/course";
import {Order} from "../../types/payment";
import dayjs, {Dayjs} from "dayjs";


function get_notification_string_from_type(notification_type: string): string | null {
    switch (notification_type) {
        case 'payment_accepted':
            return 'تم قبول الدفع'
        case 'payment_refused':
            return 'تم رفض الدفع'
        case 'course_bought':
            return 'مستخدم اشترى دورتك'
        case 'course_accepted':
            return 'تم قبول دورتك'
        case 'course_favourite':
            return 'دورتك شائعة الآن'
        case 'course_refused':
            return 'تم رفض دورتك'
        case 'course_blocked':
            return 'تم تجميد دورتك'
        case 'removed_from_course':
            return 'لقد تم إخراجك من الدورة'
        default:
            throw new Error('unkown notification type')
    }
}

function get_notification_subtitle_from_type(notification: Notification): string[] | null {
    switch (notification.notification_type) {
        case 'removed_from_course':
        case 'course_favourite':
        case 'payment_accepted':
        case 'payment_refused':
        case 'course_accepted':
        case 'course_refused':
        case 'course_blocked':
            if (typeof notification.extra_data === 'object' &&
                notification.extra_data &&
                'course' in notification.extra_data) {
                const course = notification.extra_data?.course as Course;
                const dateDiffrence = dayjs().diff(notification.date_created, 'minutes')
                let dateString = '';
                if (dateDiffrence < 60)
                    dateString = `${dateDiffrence}m`
                else if (dateDiffrence > 60 && dateDiffrence < 3600)
                    dateString = `${dateDiffrence % 60}m`
                else if (dateDiffrence < 86400)
                    dateString = `${(dateDiffrence / 60) % 60}h`
                return [course.title, dateString]
            }
            return []
        case 'course_bought':
            if (typeof notification.extra_data === 'object' &&
                notification.extra_data &&
                'order' in notification.extra_data) {
                const order = notification.extra_data?.order as Order;
                return [order.course.title, order.buyer.profile_image]
            }
            return []
        default:
            return []
    }
}

function NotificationElement({notification}: { notification: Notification }) {
    return (
        <Stack direction={"row"} width={"100%"} justifyContent={'space-between'} gap={2} alignItems={'center'}>
            <Stack sx={{flex: '1 1 50%'}}>
                <Typography flex={'0 1 50%'} color={notification.is_read ? 'gray.main' : 'black'}>
                    {get_notification_string_from_type(notification.notification_type)}
                </Typography>
                <Typography flex={'0 1 50%'} variant={'subtitle2'} color={'gray.main'}>
                    {get_notification_subtitle_from_type(notification)?.at(0) ?? 'jjj'}
                </Typography>
            </Stack>
            <Typography variant={'overline'} color={'gray.main'}>
                {get_notification_subtitle_from_type(notification)?.at(1) ?? 'jjj'}
            </Typography>
        </Stack>
    );
}

export default function TopNavigationBar() {
    const theme = useTheme();

    const token = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
    });
    const notificationsQuery = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const {data} = await axiosInstance.get('/notifications/')
            return data as Notification[];
        }
    })

    const queryClient = useQueryClient()
    const notificationsReadMutation = useMutation({
        mutationKey: ['notifications', 'read'],
        mutationFn: async () => {
            return await axiosInstance.post('/notifications/read/')
        },
        onSuccess: () => queryClient.invalidateQueries(['notifications'])
    })

    const [popperActive, setPopperActive] = useState(false);
    const [notificationsActive, setNotificationsActive] = useState(false);
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const handleMarkAsReadClick = () => {
        notificationsReadMutation.mutate()
    }

    return (
        <>
            <DropdownPopper
                clickAway={() => setPopperActive(false)}
                isOpen={popperActive}
                cardRef={navRef}
                placement="bottom-end"
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
                        g => g.name == 'TeacherGroup' || g.name == 'AdminGroup'
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
                placement="bottom-end"
            >
                <Stack
                    gap={2}
                    sx={{
                        direction: 'rtl',
                        pl: 2,
                    }}
                >
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}
                           width={'100%'}>
                        <Typography>
                            الإشعارات
                        </Typography>
                        <Tooltip title={'اعتبر مقروء'}>
                            <IconButton
                                color={'primary'}
                                onClick={handleMarkAsReadClick}
                                disabled={!notificationsQuery.data?.some(n => !n.is_read)}
                                sx={{
                                    px: 0
                                }}
                            >
                                <MarkChatRead/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Stack direction={'column-reverse'} gap={1}>

                        {
                            notificationsQuery.data?.length === 0 ?
                                <Typography>لا يوجد أي إشعارات</Typography>
                                : notificationsQuery.data?.map(
                                    n => {
                                        return (
                                            <React.Fragment key={n.id}>
                                                <NotificationElement notification={n}/>
                                            </React.Fragment>
                                        )
                                    }
                                )

                        }
                    </Stack>
                </Stack>
            </DropdownPopper>
            <nav style={{width: '100%'}}>
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
                            alt=""
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
                            fontWeight={{md: 500, lg: 600}}
                            sx={{
                                transition: 'all ease 300ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink
                                to="/courses"
                                style={{}}
                            >
                                كورسات
                            </NavLink>
                        </Typography>

                        <Typography
                            variant={'subtitle1'}
                            fontWeight={{md: 500, lg: 600}}
                            sx={{
                                transition: 'all ease 100ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink to="/about">من نحن</NavLink>
                        </Typography>

                        <Typography
                            variant={'subtitle1'}
                            fontWeight={{md: 500, lg: 600}}
                            sx={{
                                transition: 'all ease 100ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink to="/teachers">المدربون</NavLink>
                        </Typography>

                        <Typography
                            variant={'subtitle1'}
                            fontWeight={{md: 500, lg: 600}}
                            sx={{
                                transition: 'all ease 100ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink to="/support">تواصل</NavLink>
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
