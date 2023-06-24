import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../authenticate/hooks/useLogin';
import { NotificationsBar } from './NotificationsBar';
import DashboardSidebar from './add-course/components/side-navbar';
import { DashboardTopbar } from './add-course/components/top-navbar/DashboardTopbar';

interface TeacherDashboardLayoutProps {
    topbar_title: string;
    topbar_subtitle?: string;
    fullScreen?: boolean;
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
        if (!user || !user.data) return;
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
        <Box
            sx={{
                flexGrow: 1,
                display: 'grid',
                width: '100%',
                minHeight: '100vh',
                gridTemplateColumns: 'repeat(26, 1fr)',
                gap: theme.spacing(1),
                rowGap: theme.spacing(2),
                bgcolor: theme.palette.gray.secondary,
            }}
        >
            <Box
                display={'grid'}
                gridColumn={'span 5'}
                height={'100%'}
                width={'100%'}
            >
                <DashboardSidebar />
            </Box>
            <Box
                display={'grid'}
                gridTemplateColumns={'repeat(26 , 1fr)'}
                gridColumn={'7 / -1'}
                rowGap={3}
                gridTemplateRows={'repeat(26, 1fr)'}
                padding={0}
                pb={8}
                paddingTop={4}
                width={'100%'}
                height={'100%'}
            >
                <DashboardTopbar
                    title={topbar_title}
                    subtitle={topbar_subtitle}
                    onNotificationClick={toggleDrawer}
                />
                <Box
                    sx={{
                        gridColumn: fullScreen ? '1 / -3' : '1 / -8',
                        gridRow: '2 / -1',
                    }}
                >
                    {children}
                </Box>
                <Box
                    sx={{
                        gridColumn: '-1 / -7',
                        gridRow: '2 / -1',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    <NotificationsBar drawerOpen={drawerOpen} />
                </Box>
            </Box>
        </Box>
    );
}

export default TeacherDashboardLayout;
