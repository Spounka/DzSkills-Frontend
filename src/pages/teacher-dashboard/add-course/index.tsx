import { Avatar, Card, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { useState } from 'react';
import { useMutation } from 'react-query';
import useLogin from '../../authenticate/hooks/useLogin';
import { submitCourse } from './api/submitCourse';
import { NewCourseCard } from './components/new-course-card/NewCourseCard';
import DashboardSidebar from './components/side-navbar';
import { DashboardTopbar } from './components/top-navbar/DashboardTopbar';


function TeacherAddCourse() {
    const theme = useTheme()
    useLogin()
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer() {
        setDrawerOpen(val => !val)
    }

    const query = useMutation({
        mutationFn: (p: any) => submitCourse(p),
        mutationKey: ['course-submit'],

    })

    async function mutate(e: any) {
        e.preventDefault()
        const form = document.querySelector('form')
        if (form) {
            let formData = new FormData(form)
            query.mutate(formData)
        }
    }

    return (
        <Box sx={{
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
                <DashboardSidebar />
            </Box>
            <Box
                display={'grid'}
                gridTemplateColumns={'repeat(26 , 1fr)'}
                gridColumn={'7 / -1'}
                rowGap={3}
                padding={0}
                pb={8}
                paddingTop={4}
                width={'100%'}
                height={'100%'}
            >

                <DashboardTopbar onNotificationClick={toggleDrawer} />
                <Box sx={{
                    gridColumn: '1 / -8',
                    gridRow: '3'
                }}>
                    <form onSubmit={mutate} style={{
                        width: '100%',
                        height: '100%',
                    }}>
                        <NewCourseCard />
                    </form>

                </Box>
                <Box sx={{
                    gridColumn: '-1 / -7',
                    gridRow: '3',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    overflow: 'hidden',

                }}>
                    <NotificationsBar drawerOpen={drawerOpen} />
                </Box>
            </Box >
        </Box >
    )
}



interface NotificationsProps {
    drawerOpen: boolean
}
function NotificationsBar({ drawerOpen }: NotificationsProps) {
    const theme = useTheme()
    return (<Card sx={{
        transition: 'all ease-out 300ms',
        transform: drawerOpen ? 'translate(0, 0)' : 'translate(-105%, 0)',
        p: 2,
        mt: 0,
        bgcolor: theme.palette.purple.light,
        color: 'white',
        borderRadius: `0 ${theme.spacing()} ${theme.spacing()} 0`,
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        position: 'fixed',
        left: 0,
        width: '20%',
        height: '80%'
    }}>
        <Typography variant={'subtitle2'} fontWeight={400}>
            التنبيهات
        </Typography>
        <Box gap={2} display={'flex'} flexDirection={'column'}>

            <Box display={"flex"} gap={2}>
                <Avatar sx={{
                    width: theme.spacing(6),
                    height: theme.spacing(6),
                    aspectRatio: '1/1',
                    flexGrow: '1'
                }} />
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant={'caption'} fontWeight={400}>
                        اشتراك جديد
                    </Typography>
                    <Typography variant={'caption'} fontWeight={300}>
                        قام اسم المستخدم بالاشتراك في كورس اسم الكورس
                    </Typography>
                </Box>
            </Box>
            <Box display={"flex"} gap={2}>
                <Avatar sx={{
                    width: theme.spacing(6),
                    height: theme.spacing(6),
                    aspectRatio: '1/1',
                    flexGrow: '1'
                }} />
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant={'caption'} fontWeight={400}>
                        اشتراك جديد
                    </Typography>
                    <Typography variant={'caption'} fontWeight={300}>
                        قام اسم المستخدم بالاشتراك في كورس اسم الكورس
                    </Typography>
                </Box>
            </Box>
            <Box display={"flex"} gap={2}>
                <Avatar sx={{
                    width: theme.spacing(6),
                    height: theme.spacing(6),
                    aspectRatio: '1/1',
                    flexGrow: '1'
                }} />
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant={'caption'} fontWeight={400}>
                        اشتراك جديد
                    </Typography>
                    <Typography variant={'caption'} fontWeight={300}>
                        قام اسم المستخدم بالاشتراك في كورس اسم الكورس
                    </Typography>
                </Box>
            </Box>
            <Box display={"flex"} gap={2}>
                <Avatar sx={{
                    width: theme.spacing(6),
                    height: theme.spacing(6),
                    aspectRatio: '1/1',
                    flexGrow: '1'
                }} />
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant={'caption'} fontWeight={400}>
                        اشتراك جديد
                    </Typography>
                    <Typography variant={'caption'} fontWeight={300}>
                        قام اسم المستخدم بالاشتراك في كورس اسم الكورس
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Card>);
}
export default TeacherAddCourse