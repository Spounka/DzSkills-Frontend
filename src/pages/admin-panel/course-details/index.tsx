import {
    Avatar,
    Box,
    Divider,
    IconButton,
    MenuItem,
    Popover,
    Rating,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import createBlack from '../../../assets/svg/create-black.svg';
import deleteWhiteBg from '../../../assets/svg/delete-whitebg.svg';
import messageWhitebg from '../../../assets/svg/message-white.svg';
import { InformationCard } from '../../../components/InformationCard';
import { getCourses } from '../../courses-page/api/getAllCourses';

import { MoreHoriz, Star } from '@mui/icons-material';
import Image from 'mui-image';
import { useParams } from 'react-router-dom';
import money from '../../../assets/svg/money-white.svg';
import students from '../../../assets/svg/school-blue.svg';
import timeBlue from '../../../assets/svg/time-transparent.svg';
import { ProfileSocialMedia } from '../../../components/ProfileSocialMedia';
import { getCourse } from '../../course/api/getCourse';
import NotFound from '../../not-found/NotFound';
import AdminDashboardLayout from '../layout';
import { RelatedStudent, getRelatedStudents } from './api/relatedStudent';
import { CourseStudent } from './components/courseStudent';

function CourseDetails() {
    const params = useParams();

    if (!params?.id) return <Typography>Error</Typography>;

    // @ts-ignore
    if (isNaN(params.id)) return <NotFound />;

    const id: number = parseInt(params.id);
    const theme = useTheme();

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
        queryFn: () => getRelatedStudents(id),
    });

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
                    subtitle={'0'}
                    icon={timeBlue}
                    sx={{
                        flexBasis: '20%',
                        flexShrink: '1',
                    }}
                />
                <InformationCard
                    title={'عدد الطلبة'}
                    subtitle={'5'}
                    icon={students}
                    sx={{
                        flexBasis: '25%',
                        flexGrow: '0',
                    }}
                />

                <InformationCard
                    title={'إجمالي الأرباح'}
                    subtitle={'250000DA'}
                    icon={money}
                    sx={{
                        flexBasis: '20%',
                        flexShrink: '1',
                        bgcolor: theme.palette.secondary.main,
                        color: 'white',
                    }}
                />

                <>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreHoriz />
                    </IconButton>
                    <Popover
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        PaperProps={{
                            elevation: 0,
                            style: {
                                maxHeight: 48 * 4.5,
                                width: '20ch',
                                backgroundColor: 'transparent',
                            },
                            sx: {
                                // root: {
                                '.Popover-menuItem': {
                                    display: 'inline-block',
                                    backgroundColor: 'red',
                                },
                                // }
                            },
                        }}
                        sx={{}}
                    >
                        <MenuItem disableRipple>
                            <IconButton>
                                <Image
                                    src={messageWhitebg}
                                    width={'auto'}
                                />
                            </IconButton>
                        </MenuItem>
                        <MenuItem disableRipple>
                            <IconButton>
                                <Box
                                    sx={{
                                        width: theme.spacing(6.5),
                                        p: theme.spacing(1.5),
                                        bgcolor: 'white',
                                        borderRadius: theme.spacing(),
                                    }}
                                >
                                    <Image
                                        src={createBlack}
                                        width={'auto'}
                                    />
                                </Box>
                            </IconButton>
                        </MenuItem>
                        <MenuItem disableRipple>
                            <IconButton>
                                <Image
                                    src={deleteWhiteBg}
                                    width={'auto'}
                                />
                            </IconButton>
                        </MenuItem>
                    </Popover>
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
                        // @ts-ignore
                        <Image
                            width={'auto'}
                            src={
                                (course.data?.thumbnail && course.data?.thumbnail) || ''
                            }
                            // @ts-ignore
                            sx={{
                                aspectRatio: '16/9',
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
                                <Typography variant="h6">
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
                                    {2.5}
                                </Typography>
                                <Rating
                                    max={1}
                                    readOnly
                                    value={1}
                                    emptyIcon={
                                        <Star
                                            style={{ opacity: 0.55 }}
                                            fontSize="inherit"
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
                            height="100%"
                        >
                            <Typography variant="h6">
                                {course.data?.owner.first_name +
                                    ' ' +
                                    course.data?.owner.last_name}
                            </Typography>
                            <Typography variant="body2">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Dolor eveniet deserunt provident numquam animi suscipit
                                id! Consectetur, ea a. Saepe vero ea quae placeat enim
                                amet quasi quisquam beatae maxime!
                            </Typography>

                            <ProfileSocialMedia />
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
                        <Typography color={'secondary.main'}>الطلبة</Typography>
                        <Divider />
                    </Box>
                    {relatedStudentsQuery.data?.map((student: RelatedStudent) => {
                        return (
                            <CourseStudent
                                key={uuidv4()}
                                student={student}
                                theme={theme}
                            />
                        );
                    })}
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default CourseDetails;
