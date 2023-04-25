import React, { useState } from 'react'
import useLogin from '../../authenticate/hooks/useLogin'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AdminPanelSidebar } from '../landing-page/components/Sidebar';
import { AdminPanelTopBar } from '../landing-page/components/AdminPanelTopBar';
import { NotificationsBar } from '../landing-page/components/NotificationsBar';

function AdminCourses() {
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
                    title={'الكورسات'}
                    subtitle={''}
                    mainColor={theme.palette.secondary.main} />
                <Box sx={{
                    gridColumn: '1 / -3',
                    gridRow: '2 / 16',
                    height: '100%',

                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            p: 0

                        }}

                    >
                        {/* <DisplayTableDataGrid rows={rows} columns={columns} /> */}

                    </Box>
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

export default AdminCourses