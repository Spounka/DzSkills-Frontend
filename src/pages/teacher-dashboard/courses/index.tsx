import {
    Box,
    CircularProgress,
    Stack,
    Switch,
    Typography,
    useTheme,
} from '@mui/material';
import { InformationCard } from '../../../components/InformationCard';
import TeacherDashboardLayout from '../layout';

import {
    DataGrid,
    GridColDef,
    GridEventListener,
    GridRowParams,
} from '@mui/x-data-grid';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MoneyIcon } from '../../../assets/svg/money-white.svg';
import playButton from '../../../assets/svg/play-purple.svg';
import school from '../../../assets/svg/school-purple.svg';
import stars from '../../../assets/svg/stars-purple.svg';
import axiosInstance from '../../../globals/axiosInstance';
import { Course } from '../../../types/course';
import { User } from '../../../types/user';
import { getRelatedCourses } from '../../admin-panel/user-details/api/getUserById';
import useLogin from '../../authenticate/hooks/useLogin';

async function handleCourseStateChange(id: number) {
    const { data } = await axiosInstance.patch(`/courses/${id}/flip/`);
    return data;
}

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 40,
    },
    {
        field: 'name',
        headerName: 'الاسم',
        width: 200,
        flex: 0,
    },
    {
        field: 'sales',
        headerName: 'المبيعات',
        width: 100,
    },
    {
        field: 'rating',
        headerName: 'التقييم',
        width: 100,
    },
    {
        field: 'profit',
        headerName: 'المداخيل',
        width: 150,
    },
    {
        field: 'visits',
        headerName: 'الزيارات',
        width: 100,
        // flex: 1,
    },
    {
        field: 'status',
        headerName: 'الوضعية',
        width: 10,
        flex: 1,
    },
    {
        field: 'action',
        headerName: '',
        type: 'actions',
        width: 150,
        sortable: false,
        filterable: false,
        flex: 1,
        renderCell: params => {
            return (
                <>
                    <Typography
                        variant={'subtitle2'}
                        color={params.value.checked ? 'gray.main' : 'inherit'}
                    >
                        {params.value.blocked ? 'محظور' : 'متوقف مؤقتا'}
                    </Typography>
                    <Switch
                        sx={{ scale: '-1 1' }}
                        //@ts-expect-error
                        color="purple"
                        checked={params.value.checked}
                        onChange={params.value.handleChange}
                        disabled={params.value.blocked}
                    />
                    <Typography
                        variant={'subtitle2'}
                        color={params.value.checked ? 'inherit' : 'gray.main'}
                    >
                        جار
                    </Typography>
                </>
            );
        },
    },
];

function TeacherCourses() {
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
                checked: course?.state === 'running',
                blocked:
                    course?.status !== 'app' ||
                    (course?.state === 'blocked' &&
                        !user.data?.groups.some(group => group.name === 'AdminGroup')),
                handleChange: () => {
                    setIsSubmitting(true);
                    courseStateMutation.mutate({ id: course?.id ?? 0 });
                },
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

export function CoursesInformationCards({
    user,
    coursesCount,
    studentsCount,
    earnings,
}: {
    coursesCount: number;
    user?: User;
    studentsCount?: number;
    earnings?: number;
}) {
    const theme = useTheme();
    return (
        <Stack
            direction={'row'}
            width={'100%'}
            gap={2}
        >
            <InformationCard
                title={'كورساتي'}
                subtitle={coursesCount.toString()}
                icon={playButton}
                link={'/dashboard/teacher/courses/'}
                sx={{
                    flex: '0 1 20%',
                    flexBasis: '20%',
                    flexShrink: '1',
                    color: theme.palette.purple.main,
                }}
            />
            <InformationCard
                title={'عدد الطلبة'}
                subtitle={studentsCount?.toString() ?? '0'}
                icon={school}
                sx={{
                    flex: '1 1 25%',
                    flexBasis: '25%',
                    flexGrow: '1',
                    color: theme.palette.purple.main,
                }}
            />

            <InformationCard
                title={'متوسط التقييم'}
                subtitle={user?.average_rating.toFixed(1) ?? '-'}
                icon={stars}
                sx={{
                    flex: '1 1 25%',
                    flexBasis: '25%',
                    flexGrow: '1',
                    color: theme.palette.purple.main,
                }}
            />

            <InformationCard
                title={'إجمالي الأرباح'}
                subtitle={earnings?.toString() ?? '0'}
                iconNode={<MoneyIcon fill="white" />}
                sx={{
                    flex: '0 1 20%',
                    flexBasis: '20%',
                    flexShrink: '1',
                    bgcolor: theme.palette.purple.main,
                    color: 'white',
                }}
            />
        </Stack>
    );
}

export default TeacherCourses;
