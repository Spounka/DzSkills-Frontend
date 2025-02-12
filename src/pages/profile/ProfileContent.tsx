import { Avatar, Rating, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { ReactComponent as GpsImage } from '../../assets/svg/place gray.svg';
import { ProfileSocialMedia } from '../../components/ProfileSocialMedia';
import useReduxData from '../../stores/reduxUser';
import { getStudentRelatedCourses } from './getStudentRelatedCourses';
import { CoursesGrid } from '../courses-page/courses-grid';

export function ProfileContent() {
    const theme = useTheme();
    const user = useReduxData().user.user;

    const ownedCoursesQuery = useQuery({
        queryKey: ['courses', 'student', user?.pk],
        queryFn: () => getStudentRelatedCourses(),
    });

    return (
        <Card
            elevation={0}
            sx={{
                gridColumnStart: {
                    xs: 2,
                    lg: 4,
                },
                gridColumnEnd: {
                    xs: -2,
                    lg: 11,
                },
                maxWidth: '100%',
                minHeight: '70vh',
                py: theme.spacing(8),
                px: {
                    xs: theme.spacing(2),
                    lg: theme.spacing(6),
                    xl: theme.spacing(12),
                },
                borderRadius: theme.spacing(2),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(4),
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'column-reverse',
                        md: 'row',
                    },
                    gap: theme.spacing(8),
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1',
                        justifyContent: 'center',
                        gap: theme.spacing(1),
                        height: '100%',
                    }}
                >
                    <Typography variant={'h5'}>
                        {`${user?.first_name} ${user?.last_name}`}
                    </Typography>
                    <Typography
                        variant={'subtitle2'}
                        color={'gray.light'}
                    >
                        {`${user?.speciality ?? 'speciality'}`}
                    </Typography>
                    <Typography
                        variant={'body2'}
                        color={'gray.light'}
                        sx={{
                            display: 'flex',
                            gap: theme.spacing(),
                        }}
                    >
                        <GpsImage style={{ alignSelf: 'center' }} />
                        {`${user?.nationality ?? ' الجنسية'}`}
                    </Typography>

                    <Box
                        display={'flex'}
                        mt={2}
                    >
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={{
                                xs: 'flex-start',
                                md: 'flex-end',
                            }}
                            gap={0.5}
                            sx={{
                                placeContent: {
                                    xs: 'flex-start',
                                    md: 'flex-end',
                                },
                                width: '100%',
                            }}
                        >
                            <Typography
                                px={0.5}
                                component="legend"
                                variant={'body2'}
                            >
                                {user?.average_rating.toFixed(1)}
                            </Typography>
                            <Rating
                                size={'small'}
                                name="read-only"
                                precision={0.5}
                                value={user?.average_rating}
                                dir={'ltr'}
                                readOnly
                                sx={{
                                    padding: 0,
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: 'auto',
                        gap: theme.spacing(6),
                    }}
                    flexGrow={'1'}
                >
                    <Avatar
                        src={user?.profile_image}
                        sx={{
                            width: theme.spacing(26),
                            height: theme.spacing(26),
                        }}
                    />

                    <ProfileSocialMedia user={user} />
                </Box>
            </Box>

            <Typography
                variant="body1"
                fontWeight={600}
                color={'secondary.dark'}
            >
                معلومات شخصية
            </Typography>
            <Typography
                variant="caption"
                fontWeight={400}
                color={'gray.dark'}
            >
                {user?.description}
            </Typography>

            <Typography
                variant="body1"
                fontWeight={600}
                color={'secondary.dark'}
            >
                كورساتي
            </Typography>

            <Box sx={{ width: '100%' }} aria-label={'course grid container'}>

                <CoursesGrid activeCourses={ownedCoursesQuery.data}
                             cardsPerRow={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
                             sx={{
                                 px: 0,
                             }}
                />
            </Box>
            {/*<Box*/}
            {/*    display={'flex'}*/}
            {/*    gap={2}*/}
            {/*    flexWrap={'wrap'}*/}
            {/*    sx={{*/}
            {/*        flex: '1',*/}
            {/*        width: '100%',*/}
            {/*        px: -2,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {ownedCoursesQuery.data?.map(course => {*/}
            {/*        return (*/}
            {/*            <Box*/}
            {/*                key={uuidv4()}*/}
            {/*                sx={{*/}
            {/*                    maxWidth: {*/}
            {/*                        xs: '100%',*/}
            {/*                        sm: '35%',*/}
            {/*                        lg: '50%',*/}
            {/*                    },*/}
            {/*                    boxShadow: '0 5px 10px #0000001A',*/}
            {/*                    borderRadius: theme.spacing(2),*/}
            {/*                    flex: '1 1 30%',*/}
            {/*                    width: '100%',*/}
            {/*                    height: 'auto',*/}
            {/*                    // flexBasis: '30%',*/}
            {/*                    aspecRatio: '16/9',*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                <CourseCard*/}
            {/*                    course={course}*/}
            {/*                    link={`/courses/${course.id}/watch/`}*/}
            {/*                />*/}
            {/*            </Box>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</Box>*/}
        </Card>
    );
}
