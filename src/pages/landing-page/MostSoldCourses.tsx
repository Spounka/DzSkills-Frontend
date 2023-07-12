import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/ui/MainButton';
import { CoursesGrid } from '../courses-page';
import { getCourses } from '../courses-page/api/getAllCourses';

export function MostSoldCourses() {
    const theme = useTheme();
    const navigate = useNavigate();
    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });

    if (query.isError) return <>Error in courses...</>;

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
                activeCourses={query.data?.slice(0, 4)}
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
