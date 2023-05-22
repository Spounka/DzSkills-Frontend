import { Avatar, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useTheme from '@mui/system/useTheme';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import facebook from '../../assets/svg/Facebook_Square.svg';
import instagram from '../../assets/svg/Instagram_Square.svg';
import linkedin from '../../assets/svg/LinkedIn_Square.svg';
import twitter from '../../assets/svg/Twitter_Square.svg';
import TopNavigationBar from '../../components/top-bar';
import { User } from '../../types/user';
import NotFound from '../not-found/NotFound';
import { getCourse } from './api/getCourse';
import { CourseCells } from './CourseCells';
import { CourseHeader } from './CourseHeader';

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
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                    توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل
                    هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
                    الحروف التى يولدها التطبيق
                </Typography>
                <Box
                    display={'flex'}
                    gap={2}
                >
                    <img
                        style={{
                            width: theme.spacing(4),
                            height: theme.spacing(4),
                        }}
                        src={instagram}
                        alt="instagram logo"
                    />
                    <img
                        style={{
                            width: theme.spacing(4),
                            height: theme.spacing(4),
                        }}
                        src={linkedin}
                        alt="linkedin logo"
                    />
                    <img
                        style={{
                            width: theme.spacing(4),
                            height: theme.spacing(4),
                        }}
                        src={facebook}
                        alt="facebook logo"
                    />
                    <img
                        style={{
                            width: theme.spacing(4),
                            height: theme.spacing(4),
                        }}
                        src={twitter}
                        alt="twitter logo"
                    />
                </Box>
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
                <Avatar
                    src={user.profile_image}
                    sx={{
                        width: '50%',
                        height: 'auto',
                        aspectRatio: '1/1',
                    }}
                />
            </Box>
        </>
    );
}
export default ViewCourse;
