import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import useTheme from '@mui/system/useTheme';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/ui/MainButton';
import { Course } from '../../types/course';
import Image from 'mui-image';

interface CourseHeaerProps {
    course?: Course;
}
export function CourseHeader({ course }: CourseHeaerProps) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <>
            <Box
                sx={{
                    flexBasis: '50%',
                    flexGrow: '1',
                    flexShrink: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 8,
                }}
            >
                <Typography
                    color={'#707070'}
                    variant={'h3'}
                    fontWeight={600}
                >
                    {course?.title}
                </Typography>
                <Typography
                    color={'#707070'}
                    maxWidth={'80%'}
                    variant={'body1'}
                    fontWeight={400}
                    flexGrow={0}
                >
                    {course?.description}
                </Typography>
                <Box
                    display="flex"
                    gap={4}
                    alignItems={'center'}
                >
                    <MainButton
                        sx={{
                            px: theme.spacing(6),
                            py: 0.5,
                        }}
                        text="شراء الآن"
                        color={theme.palette.primary.main}
                        {...{
                            onClick: () => {
                                navigate('/courses/' + course?.id + '/buy/');
                            },
                        }}
                    />
                    <Typography
                        color={'gray.dark'}
                        variant={'h6'}
                        fontWeight={600}
                        sx={{
                            direction: 'ltr',
                        }}
                    >
                        {`${course?.price} DA`}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    flex: '1 1 50%',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Image src={course?.thumbnail ?? ''} />
            </Box>
        </>
    );
}
