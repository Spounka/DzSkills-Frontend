import { ArrowRightAlt } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { BestCourseCard } from './BestCourseCard';
import { getTrendingCourses } from './api/getAllCourses';
import useTheme from '@mui/system/useTheme';

export function TrendingCoursesCarousel({ }: any) {
    const [activeCourse, setActiveCourse] = useState<number>(0);
    const theme = useTheme();

    const query = useQuery({
        queryKey: ['courses', 'trending'],
        queryFn: () => getTrendingCourses(),
    });

    if (query.isError) return <Typography>Error</Typography>;

    if (query.isLoading) return <Typography>Loading...</Typography>;
    if (!query.isSuccess) return <Typography>Error</Typography>;
    return (
        <Box
            id={'carouselContainer'}
            sx={{
                height: '100%',
                flex: '1 0 100%',
                position: 'relative',
                width: '100%',
                maxWidth: `calc(100vw - ${theme.spacing(8)})`,
                zIndex: 0,
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    lg: 'row-reverse',
                },
                pt: 4,
            }}
        >
            <IconButton
                disableRipple
                // disabled={activeCourse >= query.data?.length - 1}
                onClick={() => setActiveCourse((l: any) => ((l + 1) % 3))}
                sx={{
                    zIndex: 4,
                    position: 'absolute',
                    right: '-1.5%',
                    top: {
                        xs: '25%',
                        md: '50%',
                    },
                    bgcolor: 'primary.main',
                    borderRadius: 0,
                    '&.Mui-disabled': {
                        bgcolor: 'gray.main',
                    },
                }}
            >
                <ArrowRightAlt
                    sx={{
                        color: 'white',
                    }}
                />
            </IconButton>

            <IconButton
                disableRipple
                disabled={activeCourse <= 0}
                onClick={() => setActiveCourse((l: any) => (l > 0 ? l - 1 : 0))}
                sx={{
                    zIndex: 4,
                    position: 'absolute',
                    bgcolor: activeCourse === 0 ? 'gray.main' : 'primary.main',
                    borderRadius: 0,
                    left: '-1.5%',
                    top: {
                        xs: '25%',
                        md: '50%',
                    },
                    '&.Mui-disabled': {
                        bgcolor: 'gray.main',
                    },
                }}
            >
                <ArrowRightAlt
                    sx={{
                        scale: '-1 1',
                        color: 'white',
                    }}
                />
            </IconButton>
            <BestCourseCard
                index={0}
                currentCourseIndex={activeCourse}
                data={query.data[0]}
            />
            <BestCourseCard
                index={1}
                currentCourseIndex={activeCourse}
                data={query.data[1]}
            />
            <BestCourseCard
                index={2}
                currentCourseIndex={activeCourse}
                data={query.data[2]}
            />
        </Box>
    );
}
