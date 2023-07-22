import { CircularProgress, Switch, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import money from '../../../assets/svg/money-white.svg';
import students from '../../../assets/svg/school-blue.svg';
import starsBlue from '../../../assets/svg/stars-blue.svg';
import studiesBlue from '../../../assets/svg/studies-blue.svg';
import { InformationCard } from '../../../components/InformationCard';
import { Course } from '../../../types/course';
import useLogin from '../../authenticate/hooks/useLogin';
import NotFound from '../../not-found/NotFound';
import { getStudentRelatedCourses } from '../../profile/getStudentRelatedCourses';
import { handleCourseStateChange } from '../../teacher-dashboard/courses';
import AdminDashboardLayout from '../layout';
import { getRelatedCourses, getUserByID } from './api/getUserById';
import { UserDetailsWideRibbon } from './components/UserDetailsWideRibbon';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 40,
    },
    {
        field: 'name',
        headerName: 'الاسم',
        width: 250,
        flex: 1,
    },
    {
        field: 'sales',
        headerName: 'المبيعات',
        width: 100,
        flex: 0,
    },
    {
        field: 'rating',
        headerName: 'التقييم',
        width: 100,
    },
    {
        field: 'profit',
        headerName: 'المداخيل',
        width: 200,
    },
    {
        field: 'visits',
        headerName: 'الزيارات',
        width: 100,
        flex: 1,
    },
    {
        field: 'state',
        headerName: 'الحالة',
        width: 250,
        flex: 0,
        renderCell: params => {
            return (
                <>
                    <Typography
                        variant={'subtitle2'}
                        color={params.value.checked ? 'gray.main' : 'inherit'}
                    >
                        {params.value.blocked || params.value.state === 'blocked'
                            ? 'محظور'
                            : 'متوقف مؤقتا'}
                    </Typography>
                    <Switch
                        sx={{ scale: '-1 1' }}
                        color="secondary"
                        checked={params.value.checked}
                        onChange={params.value.handleChange}
                        disabled={params.value.isSubmitting}
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

const UserDetails = () => {
    const params = useParams();

    if (!params?.id) return <Typography>Error</Typography>;

    // @ts-ignore
    if (isNaN(params.id)) return <NotFound />;

    const id: number = parseInt(params.id);
    const theme = useTheme();
    const [user] = useLogin();
    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ['users', id],
        queryFn: () => getUserByID(id),
        staleTime: 1000 * 60 * 60,
    });

    const [selectedCourseID, setSelectedCourseID] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const relatedCoursesQuery = useQuery({
        queryKey: ['users', id, 'courses'],
        queryFn: () => getRelatedCourses(id),
        staleTime: 1000 * 60 * 60 * 24,
    });

    const studentRelatedCoursesQuery = useQuery({
        queryKey: ['users', id, 'courses', 'student'],
        queryFn: () => getStudentRelatedCourses(id),
    });

    const courseData = useMemo(() => {
        const data = relatedCoursesQuery.data?.filter(c => c.id === selectedCourseID);
        if (data && data?.length > 0) return { ...data[0] };
    }, [selectedCourseID]);

    const setSelectedCourse = useCallback(
        (e: GridRowParams<Course>) => {
            setSelectedCourseID(e.row.id);
        },
        [selectedCourseID]
    );
    const courseStateMutation = useMutation({
        mutationKey: ['course', user.data?.pk, 'state', 'mutation'],
        mutationFn: ({ id }: { id: number }) => handleCourseStateChange(id),
        onSuccess: () => {
            relatedCoursesQuery.refetch();
            studentRelatedCoursesQuery.refetch();
            setIsSubmitting(false);
        },
        onError: () => setIsSubmitting(false),
    });

    if (query.isLoading) return <>Loading..</>;
    if (query.isError) return <>Error...</>;

    let teacherCoursesRows: any = [];
    let studentCoursesRows: any = [];
    if (relatedCoursesQuery.data && relatedCoursesQuery.data?.length > 0)
        teacherCoursesRows = relatedCoursesQuery.data?.map(
            (course: Course | undefined) => {
                return {
                    id: course?.id,
                    name: course?.title,
                    sales: course?.students_count ?? 0,
                    rating: course?.average_rating.toFixed(1),
                    profit: (course?.price ?? 0) * (course?.students_count ?? 0) ?? 0,
                    visits: 0,
                    state: {
                        state: course?.state === 'running',
                        status: course?.status ?? '',
                        checked: course?.state === 'running',
                        isSubmitting: isSubmitting,
                        blocked: course?.state === 'blocked',
                        handleChange: () => {
                            setIsSubmitting(true);
                            courseStateMutation.mutate({ id: course?.id ?? 0 });
                        },
                    },
                };
            }
        );
    else if (
        studentRelatedCoursesQuery.data &&
        studentRelatedCoursesQuery.data?.length > 0
    )
        studentCoursesRows = studentRelatedCoursesQuery.data?.map(
            (course: Course | undefined) => {
                return {
                    id: course?.id,
                    name: course?.title,
                    sales: course?.students_count ?? 0,
                    rating: course?.average_rating.toFixed(1),
                    profit: (course?.price ?? 0) * (course?.students_count ?? 0) ?? 0,
                    state: {
                        state: course?.state === 'running',
                        status: course?.status ?? '',
                        checked: course?.state === 'running',
                        blocked:
                            course?.status !== 'app' ||
                            (course?.state === 'blocked' &&
                                !user.data?.groups.some(
                                    group => group.name === 'AdminGroup'
                                )),
                        handleChange: () => {
                            setIsSubmitting(true);
                            courseStateMutation.mutate({ id: course?.id ?? 0 });
                        },
                    },
                };
            }
        );

    return (
        <AdminDashboardLayout topbar_title={'المستخدمين'}>
            {isSubmitting && (
                <CircularProgress
                    id={'progress'}
                    color={'secondary'}
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 0,
                }}
            >
                {/* <DisplayTableDataGrid rows={rows} columns={columns} /> */}
                <UserDetailsWideRibbon user={query.data} />

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        p: 0,
                    }}
                >
                    <InformationCard
                        title={'الكورسات'}
                        subtitle={
                            ((!courseData?.id &&
                                relatedCoursesQuery.data?.length.toString()) ??
                                studentRelatedCoursesQuery.data?.length.toString()) ||
                            '0'
                        }
                        icon={studiesBlue}
                        sx={{
                            flexBasis: '20%',
                            flexShrink: '1',
                        }}
                    />
                    <InformationCard
                        title={'عدد الطلبة'}
                        subtitle={
                            courseData?.students_count.toString() ||
                            (relatedCoursesQuery.data &&
                                relatedCoursesQuery.data?.length > 0 &&
                                relatedCoursesQuery.data
                                    ?.reduce((acc, val) => {
                                        return {
                                            ...acc,
                                            students_count:
                                                acc?.students_count +
                                                val?.students_count,
                                        };
                                    })
                                    ?.students_count.toString()) ||
                            '-'
                        }
                        icon={students}
                        sx={{
                            flexBasis: '25%',
                            flexGrow: '1',
                        }}
                    />

                    <InformationCard
                        title={'متوسط التقييم'}
                        subtitle={user.data?.average_rating.toString() ?? '-'}
                        icon={starsBlue}
                        sx={{
                            flexBasis: '25%',
                            flexGrow: '1',
                        }}
                    />

                    <InformationCard
                        title={'إجمالي الأرباح'}
                        subtitle={
                            (relatedCoursesQuery.data &&
                                relatedCoursesQuery.data?.length > 0 &&
                                relatedCoursesQuery.data
                                    ?.reduce((acc, curr) => {
                                        return {
                                            ...acc,
                                            price:
                                                acc.price +
                                                curr.price * curr.students_count,
                                        };
                                    })
                                    .price.toString()) ||
                            '0'
                        }
                        icon={money}
                        sx={{
                            flexBasis: '20%',
                            flexShrink: '1',
                            bgcolor: theme.palette.secondary.main,
                            color: 'white',
                        }}
                    />
                </Box>
                {teacherCoursesRows.length > 0 && (
                    <Box
                        sx={{
                            bgcolor: 'white',
                            borderRadius: theme.spacing(),
                            p: 2,
                        }}
                    >
                        <Typography color={'secondary.main'}>
                            احصائيات الكورسات
                        </Typography>
                        <DataGrid
                            sx={{
                                border: 'none',
                            }}
                            columns={columns}
                            rows={teacherCoursesRows ?? []}
                            autoHeight
                            onRowClick={setSelectedCourse}
                        />
                    </Box>
                )}
                <Box
                    sx={{
                        bgcolor: 'white',
                        borderRadius: theme.spacing(),
                        p: 2,
                    }}
                >
                    <Typography color={'secondary.main'}>احصائيات الكورسات</Typography>
                    <DataGrid
                        sx={{
                            border: 'none',
                        }}
                        columns={columns}
                        rows={studentCoursesRows ?? []}
                        autoHeight
                        onRowClick={e => navigate(`/admin/courses/${e.row.id}`)}
                    />
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
};

export default UserDetails;
