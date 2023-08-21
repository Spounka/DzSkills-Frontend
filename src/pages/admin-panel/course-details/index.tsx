import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Rating,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete-red.svg';
import { InformationCard } from '../../../components/InformationCard';
import { getCourses } from '../../courses-page/api/getAllCourses';

import { Favorite, MoreHoriz, Star } from '@mui/icons-material';
import Image from 'mui-image';
import { useSnackbar } from 'notistack';
import { ReactComponent as MoneyIcon } from '../../../assets/svg/money-white.svg';
import students from '../../../assets/svg/school-blue.svg';
import timeBlue from '../../../assets/svg/time-transparent.svg';
import { ProfileSocialMedia } from '../../../components/ProfileSocialMedia';
import axiosInstance from '../../../globals/axiosInstance';
import { Course } from '../../../types/course';
import { getCourse } from '../../course/api/getCourse';
import AdminDashboardLayout from '../layout';
import { getCourseRelatedStudents, RelatedStudent } from './api/relatedStudent';
import { CourseStudent } from './components/courseStudent';
import { useRouteID } from '../../../globals/hooks';

function CourseDetails() {
    const id: number = useRouteID();
    const theme = useTheme();

    const [checkedStudents, setCheckedStudents] = useState<number[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const course = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
    });

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });

    const relatedStudentsQuery = useQuery({
        queryKey: ['courses', id, 'students'],
        queryFn: () => getCourseRelatedStudents(id),
    });

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const removeStudentsMutation = useMutation({
        mutationKey: ['courses', id, 'students', 'remove'],
        mutationFn: async (body: FormData) => {
            const { data } = await axiosInstance.patch(
                `/courses/${id}/students/remove/`,
                body,
            );
            return data;
        },
        onSuccess: async () => {
            setCheckedStudents([]);
            await queryClient.invalidateQueries(['courses', id, 'students']);
            enqueueSnackbar('تمت إزالة الطلاب بنجاح', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('لقد حدث خطأ، رجاء أعد المحاولة لاحقا', {
                variant: 'error',
            });
        },
    });

    const flipCourseTrending = useMutation({
        mutationKey: ['course', course.data?.id, 'trending'],
        mutationFn: async () => {
            return (await axiosInstance.patch(
                `/courses/${id}/flip-trending/`,
            )) as Course;
        },
        onSuccess: async () => {
            enqueueSnackbar('تم التحديث بنجاح', { variant: 'success' });
            await queryClient.invalidateQueries(['courses', id]);
        },
        onError: () => {
            enqueueSnackbar('فشل في تحديث', { variant: 'error' });
        },
    });

    const handleCourseTrendingMutation = () => {
        flipCourseTrending.mutate();
    };

    const handleRemoveStudentsFormSubmission = (form: FormEvent<HTMLFormElement>) => {
        form.preventDefault();
        let formData = new FormData(form.currentTarget);
        formData.set('course', id.toString());
        if (checkedStudents.length) {
            for (let i = 0; i < checkedStudents.length; i++) {
                formData.set(`students[${i}]`, checkedStudents[i].toString());
            }
        }
        removeStudentsMutation.mutate(formData);
    };

    if (query.isError) return <Typography>Error Occured In courses</Typography>;
    if (query.isLoading) return <Typography>Loading courses...</Typography>;

    if (relatedStudentsQuery.isError)
        return <Typography>Error occured getting related students</Typography>;
    if (relatedStudentsQuery.isLoading)
        return <Typography>Loading related students...</Typography>;

    return (
        <AdminDashboardLayout topbar_title={'الكورسات'}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 0,
                }}
            >
                <InformationCard
                    title={'متوسط التقييم'}
                    subtitle={course.data?.average_rating.toFixed(1).toString() ?? '-'}
                    icon={timeBlue}
                    sx={{
                        flexBasis: '20%',
                        flexShrink: '1',
                    }}
                />
                <InformationCard
                    title={'عدد الطلبة'}
                    subtitle={relatedStudentsQuery.data?.length.toString() ?? '0'}
                    icon={students}
                    sx={{
                        flexBasis: '25%',
                        flexGrow: '0',
                    }}
                />

                <InformationCard
                    title={'إجمالي الأرباح'}
                    subtitle={
                        (
                            course.data && course.data.students_count * course.data.price
                        )?.toString() ?? ''
                    }
                    iconNode={<MoneyIcon fill={'white'} />}
                    sx={{
                        flexBasis: '20%',
                        flexShrink: '1',
                        bgcolor: theme.palette.secondary.main,
                        color: 'white',
                    }}
                />

                <>
                    <IconButton
                        aria-label='more'
                        id='long-button'
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup='true'
                        onClick={handleClick}
                    >
                        <MoreHoriz />
                    </IconButton>
                    <Menu
                        id='long-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <IconButton
                                onClick={handleCourseTrendingMutation}
                                color={course.data?.trending ? 'error' : 'default'}
                            >
                                <Favorite />
                            </IconButton>
                        </MenuItem>
                    </Menu>
                </>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    gap: 2,
                    p: 0,
                }}
            >
                <Box
                    sx={{
                        flexBasis: '50%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {
                        <Image
                            width={'auto'}
                            src={course.data?.thumbnail ?? ''}
                            {...{
                                sx: {
                                    aspectRatio: '16/9',
                                },
                            }}
                        />
                    }
                    <Box
                        sx={{
                            px: theme.spacing(8),
                            bgcolor: '#F9FAF5',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            py: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography variant='h6'>
                                    {course.data?.title}
                                </Typography>
                                <Typography
                                    variant={'subtitle1'}
                                    color={'gray.main'}
                                >
                                    {course.data?.owner.first_name +
                                        ' ' +
                                        course.data?.owner.last_name}
                                </Typography>
                            </Box>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                                gap={1}
                            >
                                <Typography
                                    color={'gray.main'}
                                    variant={'subtitle1'}
                                >
                                    {course.data?.average_rating.toFixed(1)}
                                </Typography>
                                <Rating
                                    max={1}
                                    readOnly
                                    value={1}
                                    emptyIcon={
                                        <Star
                                            style={{ opacity: 0.55 }}
                                            fontSize='inherit'
                                        />
                                    }
                                />
                            </Box>
                        </Box>
                        <Typography
                            variant={'body2'}
                            color={'gray.dark'}
                        >
                            {course.data?.description}
                        </Typography>
                        <Typography
                            sx={{
                                direction: 'ltr',
                                mr: 'auto',
                                float: 'right',
                            }}
                        >
                            {course.data?.price} DA
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: 'purple.main',
                            p: 8,
                            pb: 4,
                            color: 'white',
                        }}
                    >
                        <Avatar
                            src={course.data?.owner.profile_image}
                            sx={{
                                width: theme.spacing(12),
                                height: theme.spacing(12),
                                float: 'left',
                            }}
                        ></Avatar>
                        <Box
                            display={'flex'}
                            gap={3}
                            flexDirection={'column'}
                            height='100%'
                        >
                            <Typography variant='h6'>
                                {course.data?.owner.first_name +
                                    ' ' +
                                    course.data?.owner.last_name}
                            </Typography>
                            <Typography variant='body2'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Dolor eveniet deserunt provident numquam animi suscipit
                                id! Consectetur, ea a. Saepe vero ea quae placeat enim
                                amet quasi quisquam beatae maxime!
                            </Typography>

                            <ProfileSocialMedia user={course.data?.owner} />
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexBasis: '50%',
                        height: '100%',
                        width: '100%',
                        bgcolor: 'white',
                        pb: theme.spacing(),
                        maxHeight: '100%',
                        overflowY: 'scroll',
                        scrollBehavior: 'smooth',
                    }}
                >
                    <Box
                        sx={{
                            p: theme.spacing(4),
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <form onSubmit={handleRemoveStudentsFormSubmission}>
                            <Stack
                                direction='row'
                                justifyContent={'space-between'}
                                sx={{
                                    alignItems: 'center',
                                }}
                            >
                                <Typography color={'secondary.main'}>الطلبة</Typography>
                                <Tooltip
                                    title={
                                        checkedStudents.length > 0
                                            ? 'قم بإزالة الطلاب من الدورة'
                                            : 'يرجى تحديد الطلاب المراد إزالتهم'
                                    }
                                >
                                    <IconButton
                                        type={'submit'}
                                        disabled={checkedStudents.length === 0}
                                        sx={{
                                            fill: theme.palette.error.main,
                                            '&.Mui-disabled': {
                                                fill: theme.palette.gray.main,
                                            },
                                        }}
                                    >
                                        <DeleteIcon fill='inherit' />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </form>
                        <Divider />
                    </Box>
                    {relatedStudentsQuery.data?.map((student: RelatedStudent) => {
                        return (
                            <CourseStudent
                                key={uuidv4()}
                                student={student}
                                checked={checkedStudents.some(
                                    cs => cs === student.user.pk,
                                )}
                                handleChecked={(id: number) => {
                                    if (
                                        checkedStudents.some(
                                            cs => cs === student.user.pk,
                                        )
                                    )
                                        setCheckedStudents(list =>
                                            list.filter(u => u !== student.user.pk),
                                        );
                                    else
                                        setCheckedStudents(list => [
                                            ...list,
                                            student.user.pk,
                                        ]);
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default CourseDetails;
