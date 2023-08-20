import { Avatar, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../../../types/course';
import { User } from '../../../types/user';
import useLogin from '../../authenticate/hooks/useLogin';
import { getCourses } from '../../courses-page/api/getAllCourses';
import AdminDashboardLayout from '../layout';
import { CoursesGrid } from '../../courses-page/courses-grid';

function AdminCourses() {
    const theme = useTheme();
    useLogin();

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
        onSuccess: res => setCourses(res),
    });

    const [selectedUser, setSelectedUser] = useState<Partial<User> | undefined>(
        undefined
    );
    const [courses, setCourses] = useState<Course[] | undefined>(undefined);

    useEffect(() => {
        if (selectedUser?.pk)
            setCourses(
                query.data?.filter(course => course.owner.pk === selectedUser.pk)
            );
        else setCourses(query.data);
    }, [selectedUser?.first_name]);

    if (query.isError) return <Typography>Error Occured</Typography>;
    if (query.isLoading) return <Typography>Loading...</Typography>;

    const users = query.data
        ?.filter(course => course.status === 'app')
        .map(course => course.owner);

    let uniqueUsers: User[] = [];
    if (users) {
        for (const element of users) {
            if (
                uniqueUsers.length === 0 ||
                !uniqueUsers.find(user => user.pk === element.pk)
            ) {
                uniqueUsers.push(element);
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
                    gap: 0,
                    height: '100%',
                    pb: 8,
                }}
            >
                <Box
                    sx={{
                        flexBasis: '40%',
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
                                    // onClick={() => navigate(`/admin/users/${user.pk}/`)}
                                    onClick={() => {
                                        if (selectedUser?.pk === user.pk)
                                            setSelectedUser({ pk: 0 });
                                        else setSelectedUser(user);
                                    }}
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Checkbox
                                        color={'secondary'}
                                        checked={selectedUser?.pk === user.pk}
                                    />
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
                        flex: '1 0 60%',
                        overflowY: 'scroll',
                        width: '100%',
                        maxHeight: '90vh',
                        px: 2,
                    }}
                >
                    <CoursesGrid
                        activeCourses={courses?.filter(
                            course => course.status === 'app'
                        )}
                        sx={{
                            px: 0,
                        }}
                        cardsPerRow={3}
                    />
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default AdminCourses;
