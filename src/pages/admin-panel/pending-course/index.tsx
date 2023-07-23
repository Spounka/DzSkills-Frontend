import { Divider, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Image from 'mui-image';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { StyledCard } from '../../../components/StyledCard';
import { getCourse } from '../../course/api/getCourse';
import { NewCourseCard } from '../../teacher-dashboard/add-course/components/new-course-card/NewCourseCard';
import AdminDashboardLayout from '../layout';

function PendingCourse() {
    const theme = useTheme();
    const params = useParams();

    if (!params?.id) return <Typography>Error</Typography>;

    // @ts-ignore
    if (isNaN(params.id)) return <NotFound />;

    const id: number = parseInt(params.id);
    const course = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
    });

    if (!course.data || course.isLoading)
        return <Typography>Course Loading...</Typography>;
    if (course.isError) return <Typography>Course Error...</Typography>;

    return (
        <AdminDashboardLayout topbar_title={'الكورسات'}>
            <Stack gap={3}>
                <Stack
                    direction={'row'}
                    gap={4}
                >
                    <Image
                        src={course.data?.thumbnail ?? ''}
                        fit="cover"
                        style={{
                            flex: '1 1 40%',
                        }}
                    />
                    <StyledCard
                        sx={{
                            flex: '1 0 60%',
                            py: 3,
                        }}
                    >
                        <Stack gap={2}>
                            <Typography
                                variant={'body1'}
                                color={'gray.main'}
                            >
                                {course.data?.category?.name}
                            </Typography>
                            <Divider />
                            <Stack
                                gap={2}
                                direction={'row'}
                                alignItems={'center'}
                                justifyContent={'space-between'}
                                alignContent={'space-between'}
                                width={'100%'}
                            >
                                <Stack
                                    gap={2}
                                    width={'100%'}
                                    // flex={'1 0 60%'}
                                >
                                    <Stack>
                                        <Typography variant={'h6'}>
                                            {course.data?.title}
                                        </Typography>
                                        <Typography
                                            variant={'body1'}
                                            color={'gray.main'}
                                        >
                                            {`${course.data?.owner.first_name} ${course.data?.owner.last_name}`}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant={'body2'}
                                        // color={'gray.main'}
                                    >
                                        {`${course.data?.description}`}
                                    </Typography>
                                </Stack>
                                <Typography
                                    textAlign={'left'}
                                    variant={'h6'}
                                    flex={'1 1 40%'}
                                    // width={'100%'}
                                >
                                    {`${course.data?.price}DA`}
                                </Typography>
                            </Stack>
                        </Stack>
                    </StyledCard>
                </Stack>
                <NewCourseCard
                    readonly
                    course={course.data}
                    color={theme.palette.secondary.main}
                />
            </Stack>
        </AdminDashboardLayout>
    );
}

export default PendingCourse;
