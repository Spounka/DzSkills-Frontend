import { Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { DataGrid, GridEventListener, GridRowParams } from '@mui/x-data-grid';
import React, { useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { columns, handleCourseStateChange } from '.';
import { Course } from '../../../types/course';
import { getRelatedCourses } from '../../admin-panel/user-details/api/getUserById';
import useLogin from '../../authenticate/hooks/useLogin';
import TeacherDashboardLayout from '../layout';
import { CoursesInformationCards } from './CoursesInformationCards';

export function TeacherCourses() {
    const theme = useTheme();
    const [user] = useLogin();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const navigate = useNavigate();

    const courseStateMutation = useMutation({
        mutationKey: ['course', user.data?.pk, 'state', 'mutation'],
        mutationFn: ({ id }: { id: number }) => handleCourseStateChange(id),
        onSuccess: () => {
            relatedCoursesQuery.refetch();
            setIsSubmitting(false);
        },
        onError: () => setIsSubmitting(false),
    });

    const relatedCoursesQuery = useQuery({
        queryKey: ['users', user.data?.pk, 'courses'],
        queryFn: () => getRelatedCourses(user.data?.pk ?? 0),
        staleTime: 1000 * 60 * 60 * 24,
        enabled: !!user.data?.pk,
    });

    const getStateFromString = (state: string) => {
        if (state === 'running') return 'جار';
        if (state === 'paused') return 'متوقف مؤقتا';
        return 'محظور';
    };
    const getStatusFromString = (status: string) => {
        if (status === 'app') return 'مُوَافَق';
        if (status === 'pend') return 'قيد انتظار موافقة';
        if (status === 'edi') return 'بحاجة للمراجعة';
        return 'مرفوض';
    };
    const handleChange = useCallback(
        (id: number) => {
            setIsSubmitting(true);
            courseStateMutation.mutate({ id: id });
        },
        [relatedCoursesQuery.isFetching]
    );

    const rows = relatedCoursesQuery.data?.map(course => {
        return {
            id: course?.id,
            name: course?.title,
            sales: course.students_count,
            rating: course?.average_rating.toFixed(1),
            profit: course?.price * course.students_count,
            visits: 0,
            state: getStateFromString(course?.state),
            status: getStatusFromString(course?.status),
            action: {
                state: course?.state,
                status: course?.status,
                checked: course?.state === 'running',
                isSubmitting: isSubmitting,
                blocked:
                    isSubmitting ||
                    (course?.state === 'blocked' &&
                        !user.data?.groups.some(group => group.name === 'AdminGroup')),
                handleChange: () => handleChange(course.id),
            },
        };
    });

    const handleRowClick: GridEventListener<'rowClick'> = (
        params: GridRowParams<Course>
    ) => {
        navigate(`/dashboard/teacher/courses/${params.row.id}/`);
    };

    return (
        <TeacherDashboardLayout
            topbar_title={'كورساتي'}
            topbar_subtitle="كلها في مكـــــان واحد لك"
            fullScreen
        >
            {isSubmitting && (
                <CircularProgress
                    id={'progress'}
                    //@ts-expect-error
                    color={'purple'}
                    style={{
                        position: 'absolute',
                        bottom: `10%`,
                        left: `calc(50% - ${theme.spacing(12)})`,
                        height: theme.spacing(6),
                        width: theme.spacing(6),
                        zIndex: 10,
                    }}
                />
            )}
            <Stack gap={4}>
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
                <Box
                    sx={{
                        bgcolor: 'white',
                        borderRadius: theme.spacing(),
                        p: 3,
                        pb: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography color={'purple.main'}>احصائيات الكورسات</Typography>
                    <DataGrid
                        sx={{
                            border: 'none',
                        }}
                        onRowClick={handleRowClick}
                        columns={columns}
                        rows={rows ?? []}
                        autoHeight
                    />
                </Box>
            </Stack>
        </TeacherDashboardLayout>
    );
}
