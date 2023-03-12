import { Card } from '@mui/material';
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
    const [drawerOpen, setDrawerOpen] = useState(true);
    const query = useMutation({
        mutationFn: (p: any) => submitCourse(p),
        onSuccess: () => console.log('hello there'),
        mutationKey: ['course-submit'],

    })

    async function mutate(e: any) {
        e.preventDefault()
        const form = document.querySelector('form')
        if (form) {
            let formData = new FormData(form)
            console.log("Mutating!!");
            console.log(formData);
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

                <DashboardTopbar />
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
                    mt: 3,
                    width: '100%',
                    overflow: 'hidden',

                }}>
                    <Card sx={{
                        transition: 'all ease-out 300ms',
                        width: '100%',
                        transform: 'translate(-100%, 0)'
                    }}>
                        Hello There
                    </Card>
                </Box>
            </Box >
        </Box >
    )
}


export default TeacherAddCourse