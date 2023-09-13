import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useNavigate } from 'react-router-dom';
import useLogin from '../authenticate/hooks/useLogin';
import DashboardSidebar from './add-course/components/side-navbar';
import { DashboardTopbar } from './add-course/components/top-navbar/DashboardTopbar';
import { useIsBanned } from '../banned-page/BannedPage';

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

    const user = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        if (
            !user.groups.some(
                group => group.name === 'TeacherGroup' || group.name === 'AdminGroup'
            )
        )
            navigate('/permission-denied/');
    }, [user]);

    function toggleDrawer() {
        setDrawerOpen(val => !val);
    }

    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DzSkills | Teacher Dashboard</title>
            </Helmet>
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
                    <Box sx={{
                        gridColumn: '1 / -3',
                        gridRow: 'span 1',
                    }}>

                        <DashboardTopbar
                            title={topbar_title}
                            subtitle={topbar_subtitle}
                            onNotificationClick={toggleDrawer}
                            isOpen={drawerOpen}
                        />
                    </Box>
                    <Box
                        sx={{
                            gridColumn: fullScreen ? '1 / -3' : '1 / -8',
                            height: '100%',
                            gridRow: '2 / -1',
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default TeacherDashboardLayout;
