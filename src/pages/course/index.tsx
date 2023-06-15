import { Avatar, Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useTheme from '@mui/system/useTheme';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import TopNavigationBar from '../../components/top-bar';
import { User } from '../../types/user';
import NotFound from '../not-found/NotFound';
import { getCourse } from './api/getCourse';
import { CourseCells } from './CourseCells';
import { CourseHeader } from './CourseHeader';
import { ProfileSocialMedia } from '../../components/ProfileSocialMedia';
import { Suspense } from 'react';

function ViewCourse() {
    const params = useParams();

    if (!params || !params.id) return <Typography>Error</Typography>;
    // @ts-ignore
    if (isNaN(params.id)) return <NotFound />;

    const id: number = parseInt(params.id);
    const theme = useTheme();

    const query = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
    });
    if (query.isError || !query.data) return <>Error</>;
    if (query.isLoading) return <>Loading...</>;
    if (query.isFetching) return <>Fetching...</>;
    return (
        <Grid
            container
            columns={14}
            direction="column"
            spacing={5}
            id={'main-grid-container'}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100%',
            }}
        >
            <Grid
                item
                xs={14}
                sx={{
                    width: '100%',
                }}
                style={{
                    paddingLeft: '0',
                    paddingRight: '0',
                }}
            >
                <TopNavigationBar />
            </Grid>

            <Grid
                xs={13}
                item
                container
                sx={{
                    backgroundColor: 'gray.secondary',
                    pt: theme.spacing(10),
                }}
                style={{
                    padding: 0,
                    gap: theme.spacing(10),
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                        height: '100%',
                        width: '100%',
                        px: theme.spacing(16),
                        py: theme.spacing(16),
                    }}
                >
                    <Box
                        display={'flex'}
                        sx={{
                            width: '100%',
                            height: '100%',
                            minHeight: '350px',
                        }}
                    >
                        <CourseHeader data={query.data} />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            gap: 6,
                            textAlign: 'center',
                        }}
                    >
                        <CourseCells data={query.data} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        bgcolor: theme.palette.purple.main,
                        width: '100%',
                        minHeight: '300px',
                        px: theme.spacing(16),
                        py: theme.spacing(8),
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                    }}
                >
                    <AboutMentor user={query.data.owner} />
                </Box>
            </Grid>
        </Grid>
    );
}

interface AboutMentorProps {
    user: User;
}

export function AboutMentor({ user }: AboutMentorProps) {
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    flexBasis: '50%',
                    width: '100%',
                    px: theme.spacing(10),
                }}
            >
                <Typography variant={'h3'}>عن المرشد</Typography>
                <Typography
                    variant={'subtitle2'}
                    color={'gray.secondary'}
                >
                    {user.description}
                </Typography>
                <ProfileSocialMedia />
            </Box>
            <Box
                sx={{
                    flexBasis: '50%',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Suspense fallback={<Skeleton />}>
                    <Avatar
                        src={user.profile_image}
                        sx={{
                            width: '50%',
                            height: 'auto',
                            aspectRatio: '1/1',
                        }}
                    />
                </Suspense>
            </Box>
        </>
    );
}
export default ViewCourse;
