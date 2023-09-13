import { Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { DataGrid, GridEventListener, GridRowParams } from '@mui/x-data-grid';
import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { columns, handleCourseStateChange } from '.';
import axiosInstance from '../../../globals/axiosInstance';
import useReduxData from '../../../stores/reduxUser';
import { getRelatedCourses } from '../../admin-panel/user-details/api/getUserById';
import TeacherDashboardLayout from '../layout';
import { CoursesInformationCards } from './CoursesInformationCards';

export function TeacherCourses() {
    const theme = useTheme();
    const user = useReduxData().user.user
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const courseStateMutation = useMutation({
        mutationKey: ['course', user?.pk, 'state', 'mutation'],
        mutationFn: ({ id }: { id: number }) => handleCourseStateChange(id),
        onSuccess: async () => {
            await relatedCoursesQuery.refetch();
            setIsSubmitting(false);
        },
        onError: () => setIsSubmitting(false),
    });

    const relatedCoursesQuery = useQuery({
        queryKey: ['users', user?.pk, 'courses'],
        queryFn: () => getRelatedCourses(user?.pk ?? 0),
        staleTime: 1000 * 60 * 60 * 24,
        enabled: !!user?.pk,
    });
    const deleteCourseMutation = useMutation({
        mutationKey: ['course', 'delete'],
        mutationFn: async (id: number) => {
            return await axiosInstance.delete(`/courses/${id}/`)
        },
        onSuccess: async () => {
            enqueueSnackbar('تم حذف الدورة بنجاح', { variant: 'success' })
            setIsSubmitting(false)
            await queryClient.invalidateQueries(['users', user?.pk, 'courses'])
        },
        onError: (error: AxiosError) => {
            setIsSubmitting(false)
            const { status } = error;
            if (status === 403)
                enqueueSnackbar('ليس لديك الإذن بحذف هذه الدورة', { variant: 'error' })
            else if (status === 500)
                enqueueSnackbar('حدث خطأ ما', { variant: 'error' })
            else
                enqueueSnackbar('حدث خطأ أثناء معالجة طلبك', { variant: 'error' })
            console.error(error)
        }
    })

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

    const deleteCourse = (id: number) => {
        setIsSubmitting(true)
        deleteCourseMutation.mutate(id)
    }

    const rows = relatedCoursesQuery.data?.map(course => {
        const multiplier = course.owner.username === 'dzskills' ? 1 : 0.6
        return {
            id: course?.id,
            name: course?.title,
            sales: course.students_count,
            rating: course?.average_rating.toFixed(1),
            profit: (course?.price * course.students_count * multiplier).toFixed(0),
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
                        !user?.groups.some(group => group.name === 'AdminGroup')),
                handleChange: () => handleChange(course.id),
                destroy: () => deleteCourse(course.id),
            },
        };
    });

    const handleRowClick: GridEventListener<'rowClick'> = (
        params: GridRowParams
    ) => {
        if (params.row.status !== 'مرفوض')
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
                    user={user}
                    coursesCount={relatedCoursesQuery.data?.length ?? 0}
                    studentsCount={
                        ((relatedCoursesQuery.data?.length ?? 0) > 0 ?
                            relatedCoursesQuery.data?.reduce((accumulator, curr) => {
                                return accumulator + curr.students_count
                            }, 0) : 0)
                    }
                    earnings={
                        ((relatedCoursesQuery.data?.length ?? 0) > 0 ?
                            relatedCoursesQuery.data?.reduce((acc, curr) => {
                                return acc + curr.price * curr.students_count
                            }, 0) : 0)
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
