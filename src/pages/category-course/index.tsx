import { CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { NavLink, useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/top-bar';
import { Course } from '../../types/course';
import { CoursesGrid } from '../courses-page';
import { getCourses } from '../courses-page/api/getAllCourses';

function CategorizedCoursesList() {
    const [urlParams, setURLParams] = useState<URLSearchParams>();
    const theme = useTheme();
    const [courses, setCourses] = useState<Course[]>([]);
    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
        onSuccess: res =>
            setCourses(
                res.filter(course => course.category.name === urlParams?.get('category'))
            ),
        enabled: !!urlParams,
    });

    useEffect(() => {
        const qString = window.location.search;
        const urlParams = new URLSearchParams(qString);
        if (!urlParams.has('category')) navigate('/courses/');
        setURLParams(urlParams);
        if (query.isSuccess && courses.length === 0) setCourses(query.data);
    }, []);
    return (
        <div
            style={{
                backgroundColor: '#F5F5F5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100dvh',
                height: '100%',
                gap: theme.spacing(24),
            }}
        >
            <TopNavigationBar />
            {!query.isLoading && !query.isSuccess && courses.length === 0 && (
                <Stack
                    textAlign={'center'}
                    gap={2}
                >
                    <Typography variant={'h4'}>لا توجد دورات بالفئة المحددة</Typography>
                    <Typography color={'secondary'}>
                        <NavLink to={'/'}>العودة إلى الصفحة الرئيسية</NavLink>
                    </Typography>
                </Stack>
            )}
            {query.isLoading ? (
                <CircularProgress color={'secondary'} />
            ) : (
                <CoursesGrid activeCourses={courses} />
            )}
        </div>
    );
}

export default CategorizedCoursesList;
