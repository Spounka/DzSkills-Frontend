import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useQuery } from 'react-query';
import money from '../../../assets/svg/money-white.svg';
import students from '../../../assets/svg/school-blue.svg';
import teaching from '../../../assets/svg/teaching-blue.svg';
import timeBlue from '../../../assets/svg/time-transparent.svg';
import useLogin from '../../authenticate/hooks/useLogin';
import { getAllUsers } from '../user-management/api/getUsers';
import { InformationCard } from './InformationCard';
import { AdminPanelTopBar } from './components/AdminPanelTopBar';
import { NotificationsBar } from './components/NotificationsBar';
import { AdminPanelSidebar } from './components/Sidebar';
import { getAllPayments } from '../payment-management/api/payments';

function AdminLandingPage() {
    const theme = useTheme()
    useLogin()
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer() {
        setDrawerOpen(val => !val)
    }

    const users = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    })


    const paymentsQuery = useQuery({
        queryKey: ['payments'],
        queryFn: () => getAllPayments(),
    })

    if (users.isError)
        return <>users error...</>
    if (users.isLoading)
        return <>users loading...</>

    if (paymentsQuery.isError)
        return <>paymentsQuery error...</>
    if (paymentsQuery.isLoading)
        return <>paymentsQuery loading...</>



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
                    title={'مرحبا بك'}
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
                            gap: 2,
                            p: 0

                        }}

                    >
                        <InformationCard
                            title={'طلبات معلقة'}
                            subtitle={paymentsQuery.data?.length.toString() || '0'}
                            icon={timeBlue}
                            sx={{
                                flexBasis: '20%',
                                flexShrink: '1',
                            }}
                        />
                        <InformationCard
                            title={'عدد الطلبة'}
                            subtitle={users.data?.length.toString() || '12'}
                            icon={students}
                            sx={{
                                flexBasis: '25%',
                                flexGrow: '1',
                            }}
                        />

                        <InformationCard
                            title={'عدد المدربين'}
                            subtitle={'2'}
                            icon={teaching}
                            sx={{
                                flexBasis: '25%',
                                flexGrow: '1',
                            }}
                        />

                        <InformationCard
                            title={'إجمالي الأرباح'}
                            subtitle={'250000DA'}
                            icon={money}
                            sx={{
                                flexBasis: '20%',
                                flexShrink: '1',
                                bgcolor: theme.palette.secondary.main,
                                color: 'white',
                            }}
                        />
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

export default AdminLandingPage