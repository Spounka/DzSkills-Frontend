import { Divider, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { StyledCard } from '../../../components/StyledCard';
import { getRelatedCourses } from '../../admin-panel/user-details/api/getUserById';
import useLogin from '../../authenticate/hooks/useLogin';
import { CoursesInformationCards } from '../courses/CoursesInformationCards';
import TeacherDashboardLayout from '../layout';
import { GraphData } from './GraphData';
import { MostSold } from './MostSold';
import { Reminders } from './Reminders';

export const data = [
    {
        name: 'January',
        gains: 100,
        visits: 1400,
    },
    {
        name: 'February',
        gains: 1000,
        visits: 1800,
    },
    {
        name: 'March',
        gains: 1200,
        visits: 2400,
    },
    {
        name: 'April',
        gains: 1300,
        visits: 1400,
    },
    {
        name: 'May',
        gains: 1350,
        visits: 400,
    },
    {
        name: 'June',
        gains: 1500,
        visits: 600,
    },
    {
        name: 'July',
        gains: 3000,
        visits: 3200,
    },
    {
        name: 'August',
        gains: 2700,
        visits: 2400,
    },
    {
        name: 'September',
        gains: 1000,
        visits: 800,
    },
    {
        name: 'October',
        gains: 4000,
        visits: 4500,
    },
    {
        name: 'November',
        gains: 2000,
        visits: 2400,
    },
    {
        name: 'December',
        gains: 1600,
        visits: 2400,
    },
];

function TeacherLandingPage() {
    const [user] = useLogin();

    const relatedCoursesQuery = useQuery({
        queryKey: ['users', user.data?.pk, 'courses'],
        queryFn: () => getRelatedCourses(user.data?.pk ?? 0),
        staleTime: 1000 * 60 * 60 * 24,
        enabled: !!user.data?.pk,
    });
    return (
        <TeacherDashboardLayout
            topbar_title={'مرحبا بك'}
            topbar_subtitle="المنصة الأفضل لتنظيم دوراتك"
            fullScreen
        >
            <Stack
                gap={4}
                height={'auto'}
            >
                <CoursesInformationCards
                    user={user.data}
                    coursesCount={relatedCoursesQuery.data?.length ?? 0}
                    //@ts-expect-error
                    studentsCount={
                        //@ts-expect-error
                        (relatedCoursesQuery.data?.length > 0 &&
                            relatedCoursesQuery.data?.reduce((accumulator, curr) => {
                                return {
                                    ...accumulator,
                                    students_count:
                                        accumulator.students_count + curr.students_count,
                                };
                            }).students_count) ??
                        0
                    }
                    //@ts-expect-error
                    earnings={
                        //@ts-expect-error
                        (relatedCoursesQuery.data?.length > 0 &&
                            relatedCoursesQuery.data?.reduce((acc, curr) => {
                                return {
                                    ...acc,
                                    price: acc.price + curr.price * curr.students_count,
                                };
                            }).price) ??
                        0
                    }
                />
                <GraphData data={data} />
                <Stack
                    direction={'row'}
                    alignItems={'stretch'}
                    width={'100%'}
                    gap={4}
                >
                    <MostSold />
                    <Reminders />
                </Stack>
                <StyledCard>
                    <Typography
                        variant={'h6'}
                        color={'purple.main'}
                    >
                        احصائيات الكورسات
                    </Typography>
                    <Divider />
                    <Stack>
                        <Typography>No Data</Typography>
                    </Stack>
                </StyledCard>
            </Stack>
        </TeacherDashboardLayout>
    );
}
export default TeacherLandingPage;
