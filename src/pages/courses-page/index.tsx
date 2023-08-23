import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import useReduxData from '../../stores/reduxUser';
import { Category, Course, Level } from '../../types/course';
import { getStudentRelatedCourses } from '../profile/getStudentRelatedCourses';
import { TrendingCoursesCarousel } from './TrendingCoursesCarousel';
import { getCourses } from './api/getAllCourses';
import FilterComponent from './components/filter';
import { useIsBanned } from '../banned-page/BannedPage';
import { CoursesGrid } from './courses-grid';
import { Stack } from '@mui/material';

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
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;

    if (query.isError) return <Typography>Error Occured</Typography>;
    if (query.isLoading) return <Typography>Loading...</Typography>;

    return (
        <Stack
            gap={5}
            px={2}
            maxWidth={'100%'}
            overflow={'hidden'}
        >
            <Helmet>
                <meta charSet="utf-8" />
                <title>DzSkills | Courses</title>
            </Helmet>

            <Box
                sx={{
                    width: '100%',
                    // height: 'fit-content',
                    overflowY: 'hidden',
                    height: '50dvh',
                    position: 'relative',
                    px: {
                        xs: theme.spacing(2),
                        lg: theme.spacing(14),
                    },
                    overflowX: 'hidden',
                }}
            >
                <TrendingCoursesCarousel />
            </Box>
            <Box
                sx={{
                    px: {
                        xs: theme.spacing(4),
                        lg: theme.spacing(14),
                    },
                }}
            >
                <FilterComponent
                    activeLevels={activeLevels}
                    activeCategories={activeCategories}
                    updateActiveLevels={updateActiveLevels}
                    updateActiveCategories={updateActiveCategories}
                />
            </Box>
            <CoursesGrid
                cardsPerRow={{ xs: 1, sm: 2, lg: 4, xl: 5 }}
                activeCourses={activeCourses
                    ?.filter(course => course.status === 'app')
                    ?.filter(
                        course => !ownedCoursesQuery.data?.some(c => c.id === course.id)
                    )
                    ?.filter(course => !course.trending)}
            />
        </Stack>
    );
}

export default CoursesPage;
