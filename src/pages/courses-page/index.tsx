import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SxProps, useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import blurredBg from '../../assets/svg/blured image.svg';
import Footer from '../../components/footer';
import TopNavigationBar from '../../components/top-bar';
import useReduxData from '../../stores/reduxUser';
import { Category, Course, Level } from '../../types/course';
import { getStudentRelatedCourses } from '../profile/getStudentRelatedCourses';
import CourseCard from './CourseCard';
import { TrendingCoursesCarousel } from './TrendingCoursesCarousel';
import { getCourses } from './api/getAllCourses';
import FilterComponent from './components/filter';

function CoursesPage() {
    const theme = useTheme();
    const user = useReduxData().user;

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });

    const ownedCoursesQuery = useQuery({
        queryKey: ['courses', 'student', user.user.pk],
        queryFn: () => getStudentRelatedCourses(),
        enabled: user.user.pk > 0,
    });

    const [activeCategories, setActiveCategories] = useState<Category[]>([]);
    const [activeLevels, setActiveLevels] = useState<Level[]>([]);
    const [activeCourses, setActiveCourses] = useState<Course[]>();

    // update active levels acronym
    const _ual = (level: Level) => {
        if (level.id === 0) {
            setActiveLevels([]);
            return;
        }
        if (activeLevels.includes(level))
            setActiveLevels(oldList => oldList.filter(l => l.id != level.id));
        else
            setActiveLevels(oldList => {
                return [...oldList, level];
            });
    };

    // update active categories acronym
    const _uac = (category: Category) => {
        if (category.id === 0) {
            setActiveCategories([]);
            return;
        }
        if (activeCategories.includes(category))
            setActiveCategories(oldList => oldList.filter(l => l.id != category.id));
        else
            setActiveCategories(oldList => {
                return [...oldList, category];
            });
    };

    useEffect(() => {
        setActiveCourses(query.data);
    }, [query.isFetched]);

    useEffect(() => {
        let displayCourses = query.data;
        if (activeLevels.length > 0) {
            displayCourses = displayCourses?.filter(course =>
                activeLevels.some(level => level?.id === course.course_level?.id)
            );
        }
        setActiveCourses(displayCourses);
    }, [activeLevels]);

    useEffect(() => {
        let displayCourses = query.data;
        if (activeCategories.length > 0) {
            displayCourses = displayCourses?.filter(course => {
                return activeCategories.some(
                    category => category?.id === course.category?.id
                );
            });
        }
        setActiveCourses(displayCourses);
    }, [activeCategories]);

    const updateActiveLevels = useCallback(_ual, [activeLevels]);
    const updateActiveCategories = useCallback(_uac, [activeCategories]);

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
            <Helmet>
                <meta charSet="utf-8" />
                <title>DzSkills | Courses</title>
            </Helmet>
            <Grid
                item
                xs={0}
                md={14}
                sx={{
                    width: '100%',
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
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
                <FilterComponent
                    activeLevels={activeLevels}
                    activeCategories={activeCategories}
                    updateActiveLevels={updateActiveLevels}
                    updateActiveCategories={updateActiveCategories}
                />
                <CoursesGrid
                    cardsPerRow={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 5 }}
                    activeCourses={activeCourses
                        ?.filter(course => course.status === 'app')
                        ?.filter(
                            course =>
                                !ownedCoursesQuery.data?.some(c => c.id === course.id)
                        )
                        ?.filter(course => !course.trending)}
                />
            </Grid>
            <Footer />
        </Grid>
    );
}

export default CoursesPage;

interface gridProps {
    activeCourses: Course[] | undefined;
    cardsPerRow: any;
    sx?: SxProps;
    baseUrl?: string;
    useBoxShadow?: boolean;
}

export function CoursesGrid({
    activeCourses,
    cardsPerRow,
    baseUrl,
    useBoxShadow,
    sx,
}: gridProps) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: `repeat(${cardsPerRow.xs || cardsPerRow}, minmax(0, 1fr))`,
                    sm: `repeat(${cardsPerRow.sm || cardsPerRow}, minmax(0, 1fr))`,
                    md: `repeat(${cardsPerRow.md || cardsPerRow}, minmax(0, 1fr))`,
                    lg: `repeat(${cardsPerRow.lg || cardsPerRow}, minmax(0, 1fr))`,
                    xl: `repeat(${cardsPerRow.xl || cardsPerRow}, minmax(0, 1fr))`,
                },
                gridTemplateRows: 'auto auto 1fr',
                justifyContent: 'flex-start',
                flexFlow: 'wrap',
                px: { xs: theme.spacing(4), lg: theme.spacing(14) },
                pb: 5,
                gap: 2,
                overflow: 'hidden',
                ...sx,
            }}
        >
            {activeCourses?.map((info: Course) => {
                return useBoxShadow ? (
                    <Box
                        key={info.id}
                        sx={{
                            width: '100%',
                            boxShadow: '0 5px 10px #0000001A',
                            borderRadius: theme.spacing(2),
                            // flex: '1 1 30%',
                            // aspecRatio: '16/10',
                        }}
                    >
                        <CourseCard
                            course={info}
                            link={(baseUrl ?? '') + info.id + '/'}
                        />
                    </Box>
                ) : (
                    <CourseCard
                        key={info.id}
                        course={info}
                        link={(baseUrl ?? '') + info.id + '/'}
                    />
                );
            })}
        </Box>
    );
}
