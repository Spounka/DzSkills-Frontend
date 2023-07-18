import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useNavigate } from 'react-router-dom';
import useLogin from '../authenticate/hooks/useLogin';
import { NotificationsBar } from './NotificationsBar';
import DashboardSidebar from './add-course/components/side-navbar';
import { DashboardTopbar } from './add-course/components/top-navbar/DashboardTopbar';

interface TeacherDashboardLayoutProps {
    topbar_title: string;
    topbar_subtitle?: string;
    fullScreen?: boolean;
    page_title?: string;
    children?: React.ReactNode;
}

function TeacherDashboardLayout({
    topbar_title,
    topbar_subtitle,
    fullScreen,
    children,
}: TeacherDashboardLayoutProps) {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

    const [user] = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.data) return;
        if (
            !user.data?.groups.some(
                group => group.name === 'TeacherGroup' || group.name === 'AdminGroup'
            )
        )
            navigate('/permission-denied/');
    }, [user]);

    function toggleDrawer() {
        setDrawerOpen(val => !val);
    }
    return (
        <>
            <DashboardSidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'grid',
                    width: '100%',
                    // minHeight: '100vh',
                    gridTemplateColumns: 'repeat(26, 1fr)',
                    gap: theme.spacing(1),
                    rowGap: theme.spacing(2),
                    bgcolor: theme.palette.gray.secondary,
                }}
            >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>DzSkills | Teacher Dashboard</title>
                </Helmet>
                <Box
                    display={'grid'}
                    gridTemplateColumns={'repeat(26 , 1fr)'}
                    gridColumn={'7 / -1'}
                    rowGap={3}
                    gridTemplateRows={'repeat(12, 1fr)'}
                    padding={0}
                    pb={8}
                    paddingTop={4}
                    // height={'100dvh'}
                    width={'100%'}
                >
                    <DashboardTopbar
                        title={topbar_title}
                        subtitle={topbar_subtitle}
                        onNotificationClick={toggleDrawer}
                    />
                    <Box
                        sx={{
                            gridColumn: fullScreen ? '1 / -3' : '1 / -8',
                            height: '100%',
                            gridRow: '2 / span 11',
                        }}
                    >
                        {children}
                        <Outlet />
                    </Box>
                    <Box
                        sx={{
                            gridColumn: '-1 / -7',
                            gridRow: '2 / span 11',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <NotificationsBar drawerOpen={drawerOpen} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default TeacherDashboardLayout;
