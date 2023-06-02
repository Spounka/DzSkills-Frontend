import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import logo from '../../../../../assets/svg/DzSkills.svg';

import grayMessage from '../../../../../assets/svg/message gray.svg';
import whiteMessage from '../../../../../assets/svg/message white.svg';

import grayProfile from '../../../../../assets/svg/profile gray.svg';
import whiteProfile from '../../../../../assets/svg/profile white.svg';

import grayPlay from '../../../../../assets/svg/play gray.svg';
import whitePlay from '../../../../../assets/svg/play white.svg';

import grayData from '../../../../../assets/svg/data gray.svg';
import whiteData from '../../../../../assets/svg/data white.svg';

import grayHome from '../../../../../assets/svg/home gray.svg';
import whiteHome from '../../../../../assets/svg/home white.svg';

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
                    <DashboardSidebarLink
                        url={'/dashboard/teacher/courses/add/'}
                        iconActive={<img src={whiteHome} />}
                        iconInactive={
                            <img
                                style={{ margin: 0 }}
                                src={grayHome}
                            />
                        }
                        label={'الرئيسية'}
                    />
                    <DashboardSidebarLink
                        url={'/dashboard/teacher/messages/'}
                        iconActive={<img src={whiteMessage} />}
                        iconInactive={<img src={grayMessage} />}
                        label={'الرسائل'}
                    />
                    <DashboardSidebarLink
                        url={'/dashboard/teacher/courses/'}
                        iconActive={<img src={whitePlay} />}
                        iconInactive={<img src={grayPlay} />}
                        label={'كورساتي'}
                    />
                    <DashboardSidebarLink
                        url={'/dashboard/teacher/statistics/'}
                        iconActive={<img src={whiteData} />}
                        iconInactive={<img src={grayData} />}
                        label={'الإحصائيات'}
                    />
                    <DashboardSidebarLink
                        url={'/dashboard/teacher/account/'}
                        iconActive={<img src={whiteProfile} />}
                        iconInactive={<img src={grayProfile} />}
                        label={'الحساب'}
                    />
                </Box>
            </nav>
        </Card>
    );
}

export default DashboardSidebar;
