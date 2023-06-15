import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import blurredBg from '../../assets/svg/blured image.svg';
import Footer from '../../components/footer';
import TopNavigationBar from '../../components/top-bar';
import { Category, Course, Level } from '../../types/course';
import CourseCard from './CourseCard';
import { TrendingCoursesCarousel } from './TrendingCoursesCarousel';
import { getCourses } from './api/getAllCourses';
import FilterComponent from './components/filter';

function CoursesPage() {
    const theme = useTheme();

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
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
                activeLevels.some(level => level.id === course.course_level.id)
            );
        }
        setActiveCourses(displayCourses);
    }, [activeLevels]);

    useEffect(() => {
        let displayCourses = query.data;
        if (activeCategories.length > 0) {
            displayCourses = displayCourses?.filter(course => {
                return activeCategories.some(
                    category => category.id === course.category.id
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
                <FilterComponent
                    activeLevels={activeLevels}
                    activeCategories={activeCategories}
                    updateActiveLevels={updateActiveLevels}
                    updateActiveCategories={updateActiveCategories}
                />
                <CoursesGrid activeCourses={activeCourses} />
            </Grid>
            <Footer />
        </Grid>
    );
}

export default CoursesPage;

export function CoursesGrid({ activeCourses }: { activeCourses: Course[] | undefined }) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                width: '100%',
                px: theme.spacing(14),
                pb: 5,
            }}
        >
            {activeCourses?.map((info: Course) => {
                if (info.trending) return;
                return (
                    <Box key={uuidv4()}>
                        <CourseCard
                            key={info.id}
                            course={info}
                            link={'/courses/' + info.id + '/'}
                        />
                    </Box>
                );
            })}
        </Box>
    );
}
