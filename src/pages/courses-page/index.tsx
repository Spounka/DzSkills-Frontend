import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import blurredBg from '../../assets/svg/blured image.svg';
import TopNavigationBar from '../../components/top-bar';
import { Course } from '../../types/course';
import CourseCard from './CourseCard';
import { TrendingCoursesCarousel } from './TrendingCoursesCarousel';
import { getCourses } from './api/getAllCourses';
import Footer from '../../components/footer';

function CoursesPage() {
    const theme = useTheme();

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });
    if (query.isError) return <Typography>Error Occured</Typography>;
    if (query.isLoading) return <Typography>Loading...</Typography>;
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
                    height: '100%',
                }}
                style={{
                    padding: 0,
                    flexGrow: 1,
                    gap: theme.spacing(10),
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: theme.spacing(2),
                        backgroundImage: `url('${blurredBg}')`,
                        backgroundSize: 'cover',
                        minHeight: '90dvh',
                        py: 15,
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            paddingRight: theme.spacing(14),
                            paddingLeft: theme.spacing(14),
                            overflowX: 'hidden',
                        }}
                    >
                        <TrendingCoursesCarousel />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                        width: '100%',
                        px: theme.spacing(14),
                        pb: 5,
                    }}
                >
                    {query.data?.map((info: Course) => {
                        if (info.trending) return;
                        return (
                            <Box key={uuidv4()}>
                                <CourseCard
                                    course={info}
                                    link={'/courses/' + info.id + '/'}
                                />
                            </Box>
                        );
                    })}
                </Box>
            </Grid>
            <Footer />
        </Grid>
    );
}

export default CoursesPage;
