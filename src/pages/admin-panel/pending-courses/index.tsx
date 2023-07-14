import { Box, Typography, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../types/user';
import useLogin from '../../authenticate/hooks/useLogin';
import { CoursesGrid } from '../../courses-page';
import { getCourses } from '../../courses-page/api/getAllCourses';
import AdminDashboardLayout from '../layout';

function PendingCoursesAdmin() {
    const theme = useTheme();
    useLogin();

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });

    const navigate = useNavigate();

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
                        maxHeight: '90vh',
                        px: 2,
                    }}
                >
                    <CoursesGrid
                        activeCourses={query.data?.filter(
                            course => course.status !== 'app'
                        )}
                        sx={{
                            px: 0,
                        }}
                        cardsPerRow={{ md: 3, xl: 4 }}
                    />
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default PendingCoursesAdmin;
