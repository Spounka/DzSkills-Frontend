import { Star } from '@mui/icons-material';
import {
    Avatar,
    Divider,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import Image from 'mui-image';
import { useQuery } from 'react-query';
import { StyledCard } from '../../../components/StyledCard';
import { MainButton } from '../../../components/ui/MainButton';
import { getCourseRelatedStudents } from '../../admin-panel/course-details/api/relatedStudent';
import { DisplayTableDataGrid } from '../../admin-panel/payment-management/DisplayTableDataGrid';
import { getCourse } from '../../course/api/getCourse';
import TeacherDashboardLayout from '../layout';
import { useRouteID } from '../../../globals/hooks';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 60,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'avatar',
        headerName: '',
        width: 100,
        sortable: false,
        align: 'center',
        headerClassName: 'super-app-theme--header',
        renderCell: params => {
            return (
                <Avatar
                    src={params.value}
                    sx={{
                        alignItems: 'center',
                        justifyItems: 'center',
                        justifySelf: 'center',
                        placeSelf: 'center',
                        mx: 'auto',
                    }}
                >
                    A
                </Avatar>
            );
        },
    },
    {
        field: 'username',
        headerName: 'اسم المستخدم',
        width: 160,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'fullName',
        headerName: 'الاسم',
        width: 210,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        align: 'left',
        flex: 2,
        headerClassName: 'super-app-theme--header',
    },
];

function CourseDetailsTeacherDashboard() {
    const id: number = useRouteID();

    const theme = useTheme();
    const navigate = useNavigate();

    const courseQuery = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
    });

    const relatedStudentsQuery = useQuery({
        queryKey: ['courses', id, 'students'],
        queryFn: () => getCourseRelatedStudents(id),
    });



    const rows = relatedStudentsQuery.data?.map(user => {
        return {
            id: user.user.pk,
            avatar: user.user.profile_image,
            fullName: user.user.first_name + ' ' + user.user.last_name,
            username: user.user.username,
            email: user.user.email,
        };
    });

    return (
        <TeacherDashboardLayout
            topbar_title={'كورساتي'}
            fullScreen
        >
            <Stack gap={8}>
                <Stack
                    direction={'row'}
                    gap={4}
                >
                    <StyledCard
                        sx={{
                            flex: '1 0 60%',
                            px: 2,
                            py: 2,
                            gap: 3,
                        }}
                    >
                        <Image
                            src={courseQuery.data?.thumbnail ?? ''}
                            errorIcon={false}
                        />
                        <Divider />
                        <Typography variant="h4">{courseQuery.data?.title}</Typography>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            gap={8}
                            alignItems={'center'}
                        >
                            <Typography
                                variant="body1"
                                flex={'0 1 70%'}
                                color={'gray.main'}
                            >
                                {courseQuery.data?.description}
                            </Typography>
                            <Typography variant="h5">
                                {`${courseQuery.data?.price}DA`}
                            </Typography>
                        </Stack>
                        <Typography variant={'h5'}>التعليقات</Typography>
                    </StyledCard>
                    <Stack
                        gap={2}
                        sx={{
                            flex: `0 0 calc(40% - ${theme.spacing(4)})`,
                            alignContent: 'flex-end',
                        }}
                    >
                        <MainButton
                            color={theme.palette.primary.main}
                            text="تعديل الكورس"
                            sx={{ alignSelf: 'flex-end' }}
                            onClick={() => {
                                navigate('edit')
                            }}
                        />
                        <StyledCard sx={{ gap: 4 }}>
                            <Stack gap={2}>
                                <TeacherCourseDetailsRow
                                    title={'إجمالي المبيعات'}
                                    value={
                                        courseQuery.data?.students_count.toString() ??
                                        '0'
                                    }
                                />
                                <TeacherCourseDetailsRatingRow
                                    title={'متوسط التقييم'}
                                    value={
                                        courseQuery.data?.average_rating.toFixed(1) ||
                                        '-'
                                    }
                                />
                                <TeacherCourseDetailsRow
                                    title={'أرباح الكورس'}
                                    value={`${(courseQuery.data?.price ?? 0) *
                                        (courseQuery.data?.students_count ?? 0) *
                                        (courseQuery.data?.owner.groups?.some(g => g.name === 'AdminGroup') ? 1 : 0.6)
                                        }DA`}
                                />
                            </Stack>
                            <Divider />
                            <Stack gap={2}>
                                <TeacherCourseDetailsRow
                                    invert
                                    title={'المستوى'}
                                    value={courseQuery.data?.course_level?.name ?? ''}
                                />
                                <TeacherCourseDetailsRow
                                    invert
                                    title={'الدروس'}
                                    value={
                                        courseQuery.data?.videos_count.toString() ?? ''
                                    }
                                />
                                <TeacherCourseDetailsRow
                                    invert
                                    title={'المدة'}
                                    value={courseQuery.data?.duration ?? ''}
                                />
                                <TeacherCourseDetailsRow
                                    invert
                                    title={'البرامج المستعملة'}
                                    value={courseQuery.data?.used_programs ?? ''}
                                />
                                <TeacherCourseDetailsRow
                                    invert
                                    title={'اللغة'}
                                    value={courseQuery.data?.language ?? ''}
                                />
                            </Stack>
                        </StyledCard>
                    </Stack>
                </Stack>
                <DisplayTableDataGrid
                    rows={rows ?? []}
                    columns={columns}
                />
            </Stack>
        </TeacherDashboardLayout>
    );
}

export default CourseDetailsTeacherDashboard;

interface courseDetailsProps {
    title: string;
    value: string;
    invert?: boolean;
}
function TeacherCourseDetailsRow({ title, value, invert }: courseDetailsProps) {
    return (
        <Stack
            sx={{
                justifyContent: 'space-between',
            }}
            direction={'row'}
        >
            {invert ? (
                <>
                    <Typography
                        fontWeight={600}
                        variant={'body1'}
                    >
                        {title}
                    </Typography>
                    <Typography
                        fontWeight={300}
                        variant={'subtitle2'}
                    >
                        {value}
                    </Typography>
                </>
            ) : (
                <>
                    <Typography
                        fontWeight={300}
                        variant={'subtitle2'}
                    >
                        {title}
                    </Typography>
                    <Typography variant={'subtitle1'}>{value}</Typography>
                </>
            )}
        </Stack>
    );
}

function TeacherCourseDetailsRatingRow({ title, value }: courseDetailsProps) {
    return (
        <Stack
            sx={{
                justifyContent: 'space-between',
            }}
            direction={'row'}
        >
            <Typography
                fontWeight={300}
                variant={'subtitle2'}
            >
                {title}
            </Typography>
            <Stack
                direction="row"
                gap={1}
            >
                <Typography variant={'subtitle1'}>{value}</Typography>
                <Star sx={{ fill: 'orange' }} />
            </Stack>
        </Stack>
    );
}
