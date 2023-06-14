import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MainButton } from '../../components/ui/MainButton';
import { Course } from '../../types/course';
import CourseCard from '../courses-page/CourseCard';
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
            alignItems={'center'}
        >
            <Box textAlign={'center'}>
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
                {query.data?.slice(0, 4).map((info: Course) => {
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
