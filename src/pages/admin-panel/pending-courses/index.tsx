import { Box, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { User } from '../../../types/user';
import useLogin from '../../authenticate/hooks/useLogin';
import { getCourses } from '../../courses-page/api/getAllCourses';
import AdminDashboardLayout from '../layout';
import { CoursesGrid } from '../../courses-page/courses-grid';

function PendingCoursesAdmin() {
    useLogin();

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });

    if (query.isError) return <Typography>Error Occured</Typography>;
    if (query.isLoading) return <Typography>Loading...</Typography>;

    const users = query.data
        ?.filter(course => course.status !== 'app')
        .map(course => course.owner);
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
    const pending_courses = query.data?.filter(course => course.status === 'pend');
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
                        flex: '1 0 60%',
                        overflowY: 'scroll',
                        width: '100%',
                        maxHeight: '90dvh',
                        px: 2,
                    }}
                >
                    {(pending_courses?.length ?? 0) > 0 ? (
                        <CoursesGrid
                            activeCourses={query.data?.filter(
                                course => course.status === 'pend'
                            )}
                            sx={{
                                px: 0,
                            }}
                            cardsPerRow={{ md: 3, xl: 4 }}
                        />
                    ) : (
                        <Box
                            sx={{
                                height: '100%',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h5">لا توجد دورات معلقة</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default PendingCoursesAdmin;
