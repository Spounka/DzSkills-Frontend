import logo from '../../../..//assets/svg/DzSkills.svg';

import grayMessage from '../../../../assets/svg/message-gray.svg';
import whiteMessage from '../../../../assets/svg/message-white.svg';

import grayProfile from '../../../../assets/svg/profile gray.svg';
import whiteProfile from '../../../../assets/svg/profile white.svg';

import grayPlay from '../../../../assets/svg/play gray.svg';
import whitePlay from '../../../../assets/svg/play white.svg';

import grayHome from '../../../../assets/svg/home gray.svg';
import whiteHome from '../../../../assets/svg/home white.svg';

import grayMoney from '../../../../assets/svg/money-gray.svg';
import whiteMoney from '../../../../assets/svg/money-white.svg';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

export function AdminPanelSidebarLink({
    url,
    label,
    iconActive,
    iconInactive,
}: any) {
    const theme = useTheme();
    const commonStyle: CSSProperties = {
        display: 'flex',
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        gap: theme.spacing(2),
        alignItems: 'center',
    };
    const activeStyle = {
        ...commonStyle,
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        borderRadius: theme.spacing(),
        color: 'white',
        backgroundColor: theme.palette.secondary.main,
    };

    const inactiveStyle = {
        ...commonStyle,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        color: theme.palette.gray.main,
        borderRadius: 0,
        backgroundColor: 'white',
    };

    return (
        <NavLink
            to={url}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
            {({ isActive }) => (
                <>
                    {isActive ? iconActive : iconInactive}
                    <Typography
                        variant={'subtitle2'}
                        fontWeight={isActive ? 400 : 300}
                    >
                        {label}
                    </Typography>
                </>
            )}
        </NavLink>
    );
}

export function AdminPanelSidebar() {
    const theme = useTheme();
    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                width: '100%',
                p: theme.spacing(5),
                px: theme.spacing(3),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(6),
            }}
        >
            <img
                src={logo}
                alt=""
                width={theme.spacing(15)}
                style={{
                    paddingRight: theme.spacing(2),
                    paddingLeft: theme.spacing(2),
                }}
            />
            <nav>
                <Box
                    gap={0.5}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <AdminPanelSidebarLink
                        url={'/admin/'}
                        iconActive={<img src={whiteHome} />}
                        iconInactive={<img src={grayHome} />}
                        label={'الرئيسية'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/messages'}
                        iconActive={<img src={whiteMessage} />}
                        iconInactive={<img src={grayMessage} />}
                        label={'الرسائل'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/courses'}
                        iconActive={<img src={whitePlay} />}
                        iconInactive={<img src={grayPlay} />}
                        label={'الكورسات'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/hashtags-categories'}
                        iconActive={
                            <span style={{ paddingRight: '8px' }}> #</span>
                        }
                        iconInactive={
                            <span style={{ paddingRight: '8px' }}> #</span>
                        }
                        label={'الأقسام و الوسوم'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/payments'}
                        iconActive={
                            <img
                                style={{ scale: '0.8 0.8' }}
                                src={whiteMoney}
                            />
                        }
                        iconInactive={
                            <img
                                style={{ scale: '0.8 0.8' }}
                                src={grayMoney}
                            />
                        }
                        label={'المعاملات المالية'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/users'}
                        iconActive={<img src={whiteProfile} />}
                        iconInactive={<img src={grayProfile} />}
                        label={'المستخدمين'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/settings'}
                        iconActive={<img src={whiteProfile} />}
                        iconInactive={<img src={grayProfile} />}
                        label={'الإعدادت'}
                    />
                </Box>
            </nav>
        </Card>
    );
}
