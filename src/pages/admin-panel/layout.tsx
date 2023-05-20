import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { ReactNode, useState } from 'react';
import useLogin from '../authenticate/hooks/useLogin';
import { AdminPanelTopBar } from './landing-page/components/AdminPanelTopBar';
import { NotificationsBar } from './landing-page/components/NotificationsBar';
import { AdminPanelSidebar } from './landing-page/components/Sidebar';

interface AdminDashboardLayoutProps {
    topbar_title: string,
    topbar_subtitle?: string,
    children?: ReactNode
}

function AdminDashboardLayout({ topbar_title, topbar_subtitle, children }: AdminDashboardLayoutProps) {
    const theme = useTheme()
    useLogin()
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer() {
        setDrawerOpen(val => !val)
    }
    return (
        <Box sx={{
            p: 0,
            flexGrow: 1,
            display: 'grid',
            width: '100%',
            minHeight: '100vh',
            gridTemplateColumns: 'repeat(26, 1fr)',
            gap: theme.spacing(1),
            rowGap: theme.spacing(2),
            bgcolor: theme.palette.gray.secondary,
        }}>

            <Box
                display={'grid'}
                gridColumn={'span 5'}
                height={'100%'}
                width={'100%'}
            >
                <AdminPanelSidebar />
            </Box>
            <Box
                display={'grid'}
                gridTemplateColumns={'repeat(26 , 1fr)'}
                gridColumn={'7 / -1'}
                gridRow={1}
                rowGap={3}
                padding={0}
                pb={8}
                paddingTop={4}
                width={'100%'}
                height={'100%'}
            >

                <AdminPanelTopBar onNotificationClick={toggleDrawer}
                    title={topbar_title}
                    subtitle={topbar_subtitle || ""}
                    mainColor={theme.palette.secondary.main} />
                <Box
                    id={'Hello'}
                    sx={{
                        gridColumn: '1 / -3',
                        gridRow: '2 / 16',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,

                    }}>
                    {children}
                </Box>
                <Box sx={{
                    gridColumn: '-1 / -7',
                    gridRow: '2',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    overflow: 'hidden',

                }}>
                    <NotificationsBar mainColor={theme.palette.secondary.main} drawerOpen={drawerOpen} />
                </Box>
            </Box >
        </Box >
    )

}

export default AdminDashboardLayout