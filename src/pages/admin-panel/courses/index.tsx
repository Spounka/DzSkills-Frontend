import { Avatar, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../../../types/course';
import useLogin from '../../authenticate/hooks/useLogin';
import CourseCard from '../../landing-page/CourseCard';
import { getCourses } from '../../landing-page/api/getAllCourses';
import { AdminPanelTopBar } from '../landing-page/components/AdminPanelTopBar';
import { NotificationsBar } from '../landing-page/components/NotificationsBar';
import { AdminPanelSidebar } from '../landing-page/components/Sidebar';

function AdminCourses() {
    const theme = useTheme()
    useLogin()
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer() {
        setDrawerOpen(val => !val)
    }

    const token = localStorage.getItem('access_token')

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(token),
        staleTime: 1000 * 60 * 60,
    })
    if (query.isError)
        return <Typography>Error Occured</Typography>
    if (query.isLoading)
        return <Typography>Loading...</Typography>

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
                            width: '100%',
                            flexDirection: 'row',
                            gap: 2,
                            height: '100%',
                            // p: 2,
                            pb: 8,
                        }}

                    >
                        <Box
                            sx={{
                                flexBasis: '50%',
                                height: '100%',
                                width: '100%',
                                bgcolor: 'white',
                                mt: theme.spacing(),
                                pb: theme.spacing(),
                                maxHeight: '100%',
                                overflowY: 'scroll',
                                scrollBehavior: 'smooth',
                            }}
                        >
                            {query.data?.map((course: Course) => {
                                return (
                                    <React.Fragment key={uuidv4()}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                gap: 2,
                                                alignItems: 'center',
                                                cursor: 'pointer'

                                            }}>
                                            <Checkbox color={'secondary'} />
                                            <Avatar
                                                src={course.owner.profile_image}
                                                sx={{
                                                    width: theme.spacing(12),
                                                    height: theme.spacing(12),
                                                }}
                                            />
                                            <Box display={'flex'} flexDirection={'column'}>
                                                <Typography variant='h6'>
                                                    {course.owner.first_name + " " + course.owner.last_name}
                                                </Typography>
                                                <Typography variant='subtitle2' color={'gray.main'}>
                                                    category
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </React.Fragment>
                                )
                            })}
                        </Box>
                        <Box
                            sx={{
                                display: 'grid',
                                flexBasis: '50%',
                                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                                overflowY: 'scroll',
                                width: '100%',
                                maxHeight: '90vh',
                            }}>
                            {query.data?.map((info: Course) => {
                                return (
                                    <Box
                                        key={uuidv4()}
                                    >

                                        <CourseCard course={info} link={info.id.toString() + '/'} />
                                    </Box>
                                )
                            })}
                        </Box>


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