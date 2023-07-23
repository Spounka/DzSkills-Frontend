import logo from '../../../..//assets/svg/DzSkills.svg';

import { ReactComponent as HomeIcon } from '../../../../assets/svg/home gray.svg';
import { ReactComponent as MessageIcon } from '../../../../assets/svg/message-gray.svg';
import { ReactComponent as MoneyIcon } from '../../../../assets/svg/money-white.svg';
import { ReactComponent as PlayIcon } from '../../../../assets/svg/play gray.svg';
import { ReactComponent as ProfileIcon } from '../../../../assets/svg/profile gray.svg';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import { Link, NavLink } from 'react-router-dom';

export function AdminPanelSidebarLink({ url, label, iconActive, iconInactive }: any) {
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
                    <Box
                        sx={{
                            maxHeight: theme.spacing(3),
                            maxWidth: theme.spacing(3),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {isActive ? iconActive : iconInactive}
                    </Box>
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
                minWidth: '15dvw',
                // width: '100%',
                p: theme.spacing(5),
                px: theme.spacing(3),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(6),
                position: 'fixed',
                top: 0,
                right: 0,
            }}
        >
            <Link to={'/'}>
                <img
                    src={logo}
                    alt=""
                    width={theme.spacing(15)}
                    style={{
                        paddingRight: theme.spacing(2),
                        paddingLeft: theme.spacing(2),
                    }}
                />
            </Link>
            <nav>
                <Box
                    gap={0.5}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <AdminPanelSidebarLink
                        url={'/admin/'}
                        iconActive={<HomeIcon fill={'white'} />}
                        iconInactive={<HomeIcon fill={'#ccc'} />}
                        label={'الرئيسية'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/messages/'}
                        iconActive={<MessageIcon fill={'white'} />}
                        iconInactive={<MessageIcon fill={'#ccc'} />}
                        label={'الرسائل'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/courses/'}
                        iconActive={<PlayIcon fill={'white'} />}
                        iconInactive={<PlayIcon fill={'#ccc'} />}
                        label={'الكورسات'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/hashtags-categories/'}
                        iconActive={<span style={{ paddingRight: '8px' }}> #</span>}
                        iconInactive={<span style={{ paddingRight: '8px' }}> #</span>}
                        label={'الأقسام و الوسوم'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/payments/'}
                        iconActive={<MoneyIcon fill={'white'} />}
                        iconInactive={<MoneyIcon fill={'#ccc'} />}
                        label={'المعاملات المالية'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/users/'}
                        iconActive={<ProfileIcon fill={'white'} />}
                        iconInactive={<ProfileIcon fill={'#ccc'} />}
                        label={'المستخدمين'}
                    />
                    <AdminPanelSidebarLink
                        url={'/admin/settings/'}
                        iconActive={<ProfileIcon fill={'white'} />}
                        iconInactive={<ProfileIcon fill={'#ccc'} />}
                        label={'الإعدادت'}
                    />
                </Box>
            </nav>
        </Card>
    );
}
