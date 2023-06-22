import { Avatar, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../types/user';
import useLogin from '../../authenticate/hooks/useLogin';
import { CoursesGrid } from '../../courses-page';
import { getCourses } from '../../courses-page/api/getAllCourses';
import AdminDashboardLayout from '../layout';

function AdminCourses() {
    const theme = useTheme();
    useLogin();

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });

    const navigate = useNavigate();

    if (query.isError) return <Typography>Error Occured</Typography>;
    if (query.isLoading) return <Typography>Loading...</Typography>;

    const users = query.data?.map(course => course.owner);
    let uniqueUsers: User[] = [];
    if (users) {
        for (let i = 0; i < users.length; i++) {
            if (uniqueUsers.length === 0) {
                uniqueUsers.push(users[i]);
            } else if (!uniqueUsers.find(user => user.pk === users[i].pk)) {
                uniqueUsers.push(users[i]);
            }
        }
    }
    return (
        <AdminDashboardLayout topbar_title={'الكورسات'}>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    gap: 2,
                    height: '100%',
                    pb: 8,
                }}
            >
                <Box
                    sx={{
                        flexBasis: '50%',
                        height: '100%',
                        width: '100%',
                        bgcolor: 'white',
                        // mt: theme.spacing(),
                        pb: theme.spacing(),
                        maxHeight: '90dvh',
                        overflowY: 'scroll',
                        scrollBehavior: 'smooth',
                    }}
                >
                    {uniqueUsers.map((user: User) => {
                        return (
                            <React.Fragment key={uuidv4()}>
                                <Box
                                    onClick={() => navigate(`/admin/users/${user.pk}/`)}
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Checkbox color={'secondary'} />
                                    <Avatar
                                        src={user.profile_image}
                                        sx={{
                                            width: theme.spacing(12),
                                            height: theme.spacing(12),
                                        }}
                                    />
                                    <Box
                                        display={'flex'}
                                        flexDirection={'column'}
                                    >
                                        <Typography variant="h6">
                                            {user.first_name + ' ' + user.last_name}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            color={'gray.main'}
                                        >
                                            {user.speciality}
                                        </Typography>
                                    </Box>
                                </Box>
                            </React.Fragment>
                        );
                    })}
                </Box>
                <Box
                    sx={{
                        flex: '1 0 50%',
                        overflowY: 'scroll',
                        width: '100%',
                        maxHeight: '90vh',
                    }}
                >
                    <CoursesGrid
                        activeCourses={query.data}
                        sx={{
                            px: 0,
                        }}
                        cardsPerRow={2}
                    />
                    {/* {query.data?.map((info: Course) => {
                        return (
                            <Box key={uuidv4()}>
                                <CourseCard
                                    course={info}
                                    link={info.id.toString() + '/'}
                                />
                            </Box>
                        );
                    })} */}
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default AdminCourses;
