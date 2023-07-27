import {
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    OutlinedInput,
    Typography,
    useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as NotificationsIcon } from '../../../../../assets/svg/notification purple.svg';
import { ReactComponent as UploadIcon } from '../../../../../assets/svg/upload.svg';
import { MainButton } from '../../../../../components/ui/MainButton';
import useLogin from '../../../../authenticate/hooks/useLogin';

interface props {
    title: string;
    subtitle?: string;
    onNotificationClick: () => void;
}

export function DashboardTopbar({ title, subtitle, onNotificationClick }: props) {
    const [query] = useLogin();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const theme = useTheme();

    if (!query.isSuccess) return <></>;

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
                gridRow: '1 / span 1',
                py: '1rem',
            }}
        >
            <Box gridColumn={'span 6'}>
                <Typography
                    variant={'h6'}
                    fontWeight={600}
                    color={'purple.main'}
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
                //@ts-expect-error
                color={'purple'}
                sx={{
                    gridColumn: '7 / 15',
                    borderRadius: theme.spacing(),
                    pr: theme.spacing(2),
                    pl: theme.spacing(),
                    py: theme.spacing(0.5),
                    maxHeight: theme.spacing(6),
                    color: 'gray.main',
                    fontWeight: 400,
                    fontSize: theme.typography.subtitle2,
                }}
                endAdornment={
                    <MainButton
                        text={'بحث'}
                        color={theme.palette.purple.main}
                        sx={{
                            height: theme.spacing(4),
                            width: 'auto',
                        }}
                    />
                }
            />
            <MainButton
                color={theme.palette.purple.main}
                text="اضف كورس"
                endIcon={
                    <UploadIcon
                        width={theme.spacing(3)}
                        height={theme.spacing(3)}
                        style={{ outline: theme.palette.purple.main }}
                    />
                }
                sx={{
                    gridColumn: {
                        sm: '17 / span 6',
                        xl: '19 / span 4',
                    },
                    gap: 2,
                    fontSize: theme.typography.subtitle1,
                    px: { sm: 1 / 4, lg: 2 },
                }}
                onClick={() => navigate('/dashboard/teacher/courses/add/')}
            />
            <NotificationsIcon
                onClick={onNotificationClick}
                fill={theme.palette.purple.main}
                style={{
                    gridColumn: '-3 / span 1',
                    cursor: 'pointer',
                }}
            />
            <IconButton
                onClick={e => {
                    setAnchorEl(e.currentTarget);
                    setMenuOpen(true);
                }}
                sx={{
                    gridColumn: '-1',
                }}
            >
                <Avatar src={query.data?.profile_image} />
            </IconButton>
            <Menu
                open={menuOpen}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
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

                {query.data.groups.some(g => g.name === 'AdminGroup') && (
                    <MenuItem
                        onClick={() => {
                            setMenuOpen(false);
                            setAnchorEl(undefined);
                        }}
                    >
                        <Link to={'/admin/'}>
                            <Typography
                                variant={'body1'}
                            >
                                لوحة تحكم المسؤول
                            </Typography>
                        </Link>
                    </MenuItem>
                )}
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
