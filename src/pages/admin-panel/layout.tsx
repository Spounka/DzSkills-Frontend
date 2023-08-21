import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../authenticate/hooks/useLogin';
import { AdminPanelTopBar } from './landing-page/components/AdminPanelTopBar';
import { AdminPanelSidebar } from './landing-page/components/Sidebar';
import { Helmet } from 'react-helmet';

interface AdminDashboardLayoutProps {
    topbar_title: string;
    topbar_subtitle?: string;
    children?: ReactNode;
}

function AdminDashboardLayout({
    topbar_title,
    topbar_subtitle,
    children,
}: AdminDashboardLayoutProps) {
    const theme = useTheme();
    const user = useLogin();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setDrawerOpen(val => !val);
    };

    if (!user?.groups.some(group => group.name === 'AdminGroup'))
        navigate('/permission-denied/');

    return (
        <>
            <AdminPanelSidebar />
            <Box
                sx={{
                    p: 0,
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
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>DzSkills | Admin Panel</title>
                </Helmet>
                <Box
                    display={'grid'}
                    gridTemplateColumns={'repeat(26 , 1fr)'}
                    gridColumn={'6 / -1'}
                    gridRow={1}
                    rowGap={3}
                    padding={0}
                    pb={8}
                    paddingTop={4}
                    width={'100%'}
                    height={'100%'}
                >
                    <AdminPanelTopBar
                        onNotificationClick={toggleDrawer}
                        isOpen={drawerOpen}
                        title={topbar_title}
                        subtitle={topbar_subtitle || ''}
                        mainColor={theme.palette.secondary.main}
                    />

                    <Box
                        sx={{
                            gridColumn: '1 / -3',
                            gridRow: '2 / 16',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                        }}
                    >
                        {children}
                    </Box>
                    <Box
                        sx={{
                            gridColumn: '-1 / -7',
                            gridRow: '2',
                            display: 'flex',
                            justifyContent: 'center',
                            width: drawerOpen ? '100%' : '0',
                            overflow: 'hidden',
                        }}
                    ></Box>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboardLayout;
