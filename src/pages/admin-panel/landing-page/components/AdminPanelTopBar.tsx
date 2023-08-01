import {
    Avatar,
    Badge,
    Card,
    Menu,
    MenuItem,
    OutlinedInput,
    Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {Link, useNavigate} from 'react-router-dom';
import {MainButton} from '../../../../components/ui/MainButton';
import useLogin from '../../../authenticate/hooks/useLogin';
import {getCourses} from '../../../courses-page/api/getAllCourses';
import {ReactComponent as NotificationsIcon} from './../../../../assets/svg/notification purple.svg';
import axiosInstance from "../../../../globals/axiosInstance";
import {Notification as NotificationType} from "../../../../types/notifications";

interface props {
    onNotificationClick: () => void;
    title: string;
    subtitle?: string;
    mainColor: string;
}

export function AdminPanelTopBar({
                                     onNotificationClick,
                                     title,
                                     subtitle,
                                     mainColor,
                                 }: props) {
    const [user] = useLogin();
    const coursesQuery = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });

    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        setMenuOpen(Boolean(anchorEl));
    }, [anchorEl]);

    const notificationsQuery = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const {data} = await axiosInstance.get('/notifications/')
            return data as NotificationType[];
        },
        refetchInterval: 1000 * 60 * 5,
    })

    if (!user?.isSuccess) return <></>;
    return (
        <Card
            elevation={0}
            sx={{
                px: theme.spacing(3),
                display: 'grid',
                gap: theme.spacing(),
                gridTemplateColumns: 'repeat(26, 1fr)',
                alignItems: 'center',
                boxShadow: '7px 20px 40px #00000014',
                borderRadius: theme.spacing(),
                gridColumn: '1 / -3',
                gridRow: '1',
                py: '1rem',
            }}
        >
            <Box gridColumn={'span 6'}>
                <Typography
                    variant={'h6'}
                    fontWeight={600}
                    color={mainColor}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant={'caption'}
                        fontWeight={300}
                        color={'gray.main'}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
            <OutlinedInput
                placeholder={'ابحث عن الدورة المناسبة لك'}
                color={'secondary'}
                sx={{
                    gridColumn: '11 / -8',
                    borderRadius: theme.spacing(),
                    pr: theme.spacing(2),
                    pl: theme.spacing(),
                    py: theme.spacing(0.5),
                    maxHeight: theme.spacing(6),
                    color: 'gray.main',
                    fontWeight: 400,
                    // @ts-ignore
                    fontSize: theme.typography.subtitle2,
                }}
                endAdornment={
                    <MainButton
                        text={'بحث'}
                        color={mainColor}
                        sx={{
                            height: theme.spacing(4),
                            width: 'auto',
                        }}
                    />
                }
            />
            {coursesQuery.data?.some(course => course.status === 'pend') ? (
                <Badge
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    // overlap={'circular'}
                    // badgeContent=" "
                    variant={'dot'}
                    color={'error'}
                    sx={{
                        gridColumn: '-7 / span 3',
                        width: '100%',
                        px: 0,
                        '.MuiBadge-dot': {
                            height: 12,
                            width: 12,
                            borderRadius: '50%',
                        },
                    }}
                >
                    <MainButton
                        color={theme.palette.secondary.light}
                        text="للمراجعة"
                        onClick={() => navigate('/admin/courses/pending/')}
                        sx={{
                            width: '100%',
                            px: 0,
                            py: 0.5,
                        }}
                    />
                </Badge>
            ) : (
                <></>
            )}

            <span
                onClick={onNotificationClick}
                style={{
                    gridColumn: '-3',
                    cursor: 'pointer',
                }}
            >
               <Badge badgeContent={notificationsQuery.data?.filter(n => !n.is_read).length} color={'error'}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <NotificationsIcon
                        width={'20'}
                        height={'26'}
                        fill={mainColor}
                    />
               </Badge>
            </span>

            <Avatar
                onClick={e => setAnchorEl(e.currentTarget)}
                src={user.data?.profile_image}
                sx={{
                    gridColumn: '-1',
                    ':hover': {
                        cursor: 'pointer',
                    },
                }}
            />
            <Menu
                open={menuOpen}
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                onClose={() => {
                    setMenuOpen(false);
                    setAnchorEl(undefined);
                }}
                sx={{
                    '&root': {
                        borderRadius: theme.spacing(2),
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        setMenuOpen(false);
                        setAnchorEl(undefined);
                    }}
                >
                    <Link to={'/profile/'}>
                        <Typography
                            variant={'body1'}
                            // color={theme.palette.error.main}
                        >
                            الملف الشخصي
                        </Typography>
                    </Link>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setMenuOpen(false);
                        setAnchorEl(undefined);
                    }}
                >
                    <Link to={'/dashboard/teacher/'}>
                        <Typography
                            variant={'body1'}
                            // color={theme.palette.error.main}
                        >
                            لوحة تحكم المرشد
                        </Typography>
                    </Link>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setMenuOpen(false);
                        setAnchorEl(undefined);
                    }}
                >
                    <Link to={'/logout/'}>
                        <Typography
                            variant={'body1'}
                            color={theme.palette.error.main}
                        >
                            تسجيل خروج
                        </Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </Card>
    );
}
