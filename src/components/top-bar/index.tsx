import { Notifications } from '@mui/icons-material';
import { Badge, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';
import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/png/logo@2x.png';
import { ReactComponent as Profile } from '../../assets/svg/Profile icon.svg';
import axiosInstance from '../../globals/axiosInstance';
import { defaultUser } from '../../globals/default-values';
import { LandingPageNavbar } from '../../pages/landing-page/LandingPageNavbar';
import useReduxData from '../../stores/reduxUser';
import { Notification } from '../../types/notifications';
import { AvatarMenu } from '../avatar-menu/AvatarMenu';
import { NotificationsMenu } from '../notifications-menu/NotificationsMenu';

export default function TopNavigationBar() {
    const theme = useTheme();

    const user = useReduxData().user;
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
    const navRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLButtonElement>(null);
    const handleMarkAsReadClick = () => {
        notificationsReadMutation.mutate();
    };

    if (user.user.username === '') return <LandingPageNavbar />;

    return (
        <>
            <AvatarMenu
                active={popperActive}
                navRef={navRef}
                user={user.user}
                onClick={() => setPopperActive(s => !s)}
            />
            <NotificationsMenu
                isActive={notificationsActive}
                notificationsQuery={notificationsQuery}
                menuRef={menuRef}
                onClickAway={setNotificationsActive}
                handleMarkAsReadClick={handleMarkAsReadClick}
            />
            <nav style={{ width: '100%', zIndex: 1 }}>
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
                            fontWeight={{ md: 500, lg: 600 }}
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
                            fontWeight={{ md: 500, lg: 600 }}
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
                            fontWeight={{ md: 500, lg: 600 }}
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
                            fontWeight={{ md: 500, lg: 600 }}
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
                            type={'button'}
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
