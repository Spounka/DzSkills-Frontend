import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/ui/MainButton';
import axiosInstance from '../../globals/axiosInstance';
import { Course } from '../../types/course';

import { CoursesGrid } from '../courses-page/courses-grid';

export async function getMostSoldCourses() {
    const { data } = await axiosInstance.get('/courses/most-sold/');
    return data as Course[];
}

export function MostSoldCourses() {
    const theme = useTheme();
    const navigate = useNavigate();
    const query = useQuery({
        queryKey: ['courses', 'most_sold'],
        queryFn: () => getMostSoldCourses(),
    });

    return (
        <Box
            bgcolor={theme.palette.gray.secondary}
            display={'flex'}
            flexDirection={'column'}
            py={16}
            gap={8}
            width={'100%'}
            alignItems={'center'}
            px={{
                xs: theme.spacing(2),
                lg: theme.spacing(16),
            }}
        >
            <Stack
                textAlign={'center'}
                gap={2}
            >
                <Typography variant="h5">الأكثر مبيعا</Typography>
                <Typography
                    variant="subtitle2"
                    color={'gray.main'}
                    maxWidth={450}
                    textAlign={'center'}
                >
                    أكثر ما يتم شراءه من مستخدمي الموقع مقدم من خبراء في مجالاتهم لضمان
                    ان تكون الدروس عملية و تلبي كامل الفائدة للمستخدم
                </Typography>
            </Stack>

            <CoursesGrid
                baseUrl="/courses/"
                activeCourses={query.data
                    ?.filter(c => c.status === 'app' && c.state === 'running')
                    ?.slice(0, 4)}
                cardsPerRow={{
                    xs: 1,
                    sm: 2,
                    lg: 4,
                }}
                sx={{ px: 0 }}
            />
            <MainButton
                color={theme.palette.primary.main}
                text={'المزيد'}
                {...{
                    onClick: () => navigate('/courses/'),
                }}
            />
        </Box>
    );
}
