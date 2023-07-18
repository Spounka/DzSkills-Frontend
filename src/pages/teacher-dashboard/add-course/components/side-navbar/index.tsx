import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import logo from '../../../../../assets/svg/DzSkills.svg';

import { ReactComponent as ProfileIcon } from '../../../../../assets/svg/profile gray.svg';

import { ReactComponent as HomeIcon } from '../../../../../assets/svg/home gray.svg';
import { ReactComponent as MessageIcon } from '../../../../../assets/svg/message-blue.svg';
import { ReactComponent as PlayIcon } from '../../../../../assets/svg/play gray.svg';

import Typography from '@mui/material/Typography';
import { CSSProperties } from 'react';

function DashboardSidebarLink({ url, label, iconActive, iconInactive }: any) {
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
        backgroundColor: theme.palette.secondary.dark,
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

function DashboardSidebar() {
    const theme = useTheme();
    return (
        <Card
            elevation={0}
            sx={{
                height: '100vh',
                width: '15%',
                p: theme.spacing(5),
                px: theme.spacing(3),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(6),
                position: 'fixed !important',
                right: 0,
                top: 0,
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
                    <DashboardSidebarLink
                        url={'/dashboard/teacher/'}
                        iconActive={<HomeIcon fill={'white'} />}
                        iconInactive={<HomeIcon fill={'#ccc'} />}
                        label={'الرئيسية'}
                    />
                    <DashboardSidebarLink
                        url={'/dashboard/teacher/messages/'}
                        iconActive={<MessageIcon style={{ fill: 'white' }} />}
                        iconInactive={<MessageIcon fill={'#ccc'} />}
                        label={'الرسائل'}
                    />
                    <DashboardSidebarLink
                        url={'/dashboard/teacher/courses/'}
                        iconActive={<PlayIcon style={{ fill: 'white' }} />}
                        iconInactive={<PlayIcon style={{ fill: '#ccc' }} />}
                        label={'كورساتي'}
                    />

                    <DashboardSidebarLink
                        url={'/dashboard/teacher/account/'}
                        iconActive={<ProfileIcon fill={'white'} />}
                        iconInactive={<ProfileIcon fill={'#ccc'} />}
                        label={'الحساب'}
                    />
                </Box>
            </nav>
        </Card>
    );
}

export default DashboardSidebar;
