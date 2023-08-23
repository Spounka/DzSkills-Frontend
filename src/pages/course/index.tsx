import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { AboutMentor } from './AboutMentor';
import { CourseCells } from './CourseCells';
import { CourseHeader } from './CourseHeader';
import { CourseVideoShowcase } from './CourseVideoShowcase';
import { getCourse } from './api/getCourse';
import { useRouteID } from '../../globals/hooks';

function ViewCourse() {
    const id: number = useRouteID();
    const theme = useTheme();

    const query = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
    });

    return (
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
                    px: {
                        xs: theme.spacing(4),
                        lg: theme.spacing(16),
                    },
                    py: {
                        xs: theme.spacing(4),
                        lg: theme.spacing(16),
                    },
                }}
            >
                <Box
                    display={'flex'}
                    flexDirection={{
                        xs: 'column-reverse',
                        md: 'row',
                    }}
                    sx={{
                        width: '100%',
                        height: '100%',
                        minHeight: '350px',
                        gap: 4,
                    }}
                >
                    <CourseHeader course={query.data} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'row',
                            lg: 'row',
                        },
                        width: '100%',
                        flexWrap: 'wrap',
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
                    minHeight: {
                        xs: '100px',
                        lg: '300px',
                    },
                    px: {
                        xs: theme.spacing(4),
                        lg: theme.spacing(16),
                    },
                    py: {
                        xs: theme.spacing(2),
                        lg: theme.spacing(8),
                    },
                    display: 'flex',
                    flexDirection: {
                        xs: 'row',
                    },
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    gap: { xs: 2, lg: 2 },
                }}
            >
                <AboutMentor user={query.data?.owner} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: theme.palette.gray.secondary,
                    width: '100%',
                    px: {
                        xs: theme.spacing(4),
                        lg: theme.spacing(32),
                    },
                    py: 2,
                    gap: 5,
                }}
            >
                <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                        display: {
                            xs: 'none',
                            lg: 'flex',
                        },
                    }}
                >
                    <Typography
                        color={'gray.dark'}
                        variant={'h4'}
                    >
                        الدروس
                    </Typography>
                </Stack>
                {query.data?.chapters?.at(0)?.videos.at(0) && (
                    <CourseVideoShowcase
                        video={query.data?.chapters?.at(0)?.videos.at(0)}
                    />
                )}

                {query.data?.chapters?.at(0)?.videos.at(1) && (
                    <CourseVideoShowcase
                        video={query.data?.chapters?.at(0)?.videos.at(1)}
                    />
                )}
            </Box>
            <Stack gap={4}>
                <Stack gap={1}></Stack>
            </Stack>
        </Grid>
    );
}

export default ViewCourse;
