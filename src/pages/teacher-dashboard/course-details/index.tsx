import { MoreHoriz, Star } from '@mui/icons-material';
import { Avatar, Divider, IconButton, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import Image from 'mui-image';
import React from 'react';
import { useQuery } from 'react-query';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete-red.svg';
import { ReactComponent as MessageIcon } from '../../../assets/svg/message-blue.svg';
import { StyledCard } from '../../../components/StyledCard';
import { MainButton } from '../../../components/ui/MainButton';
import theme from '../../../theme';
import { getCourseRelatedStudents } from '../../admin-panel/course-details/api/relatedStudent';
import { DisplayTableDataGrid } from '../../admin-panel/payment-management/DisplayTableDataGrid';
import useLogin from '../../authenticate/hooks/useLogin';
import { getCourse } from '../../course/api/getCourse';
import TeacherDashboardLayout from '../layout';
import { useRouteID } from '../../../globals/hooks';

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
    {
        field: 'actions',
        headerName: '',
        align: 'left',
        flex: 0,
        filterable: false,
        sortable: false,
        headerClassName: 'super-app-theme--header',
        renderCell: params => {
            return (
                <div>
                    <IconButton onClick={params.value.open}>
                        <MoreHoriz />
                    </IconButton>
                    <Menu
                        anchorEl={params.value.anchor}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(params.value.anchor)}
                        onClose={() => params.value.close()}
                        sx={{
                            px: 5,
                            py: 2,
                        }}
                    >
                        <MenuItem onClick={() => params.value.close(params.row.id)}>
                            {/* <IconButton color={'primary'}> */}
                            <DeleteIcon
                                style={{
                                    fill: theme.palette.error.main,
                                }}
                            />
                            {/* </IconButton> */}
                        </MenuItem>
                        <MenuItem onClick={params.value.close}>
                            <IconButton color={'secondary'}>
                                <MessageIcon
                                    style={{
                                        fill: theme.palette.primary.main,
                                    }}
                                />
                            </IconButton>
                        </MenuItem>
                    </Menu>
                </div>
            );
        },
    },
];

function CourseDetailsTeacherDashboard() {
    const id: number = useRouteID();

    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const courseQuery = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
    });

    const relatedStudentsQuery = useQuery({
        queryKey: ['courses', id, 'students'],
        queryFn: () => getCourseRelatedStudents(id),
    });

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value: any) => {
        setAnchorEl(null);
        if (value) alert(value);
    };

    const onMenuClick = React.useCallback(handleMenuClick, [anchorEl]);
    const onMenuClose = React.useCallback(handleClose, [anchorEl]);

    const rows = relatedStudentsQuery.data?.map(user => {
        return {
            id: user.user.pk,
            avatar: user.user.profile_image,
            fullName: user.user.first_name + ' ' + user.user.last_name,
            username: user.user.username,
            email: user.user.email,
            actions: {
                open: onMenuClick,
                close: onMenuClose,
                removeUser: removeUser,
                anchor: anchorEl,
            },
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
                        <Image src={courseQuery.data?.thumbnail ?? ''} />
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
                                        (courseQuery.data?.students_count ?? 0)
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
