import { Star } from '@mui/icons-material';
import { Divider, Rating, Theme, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'mui-image';
import { Link } from 'react-router-dom';
import { Course } from '../../types/course';

interface props {
    course: Course;
    link: string;
}
function getCourseBorderColor(status: string, theme: Theme) {
    if (status === 'rej') return theme.palette.error.dark;
    if (status === 'pend') return theme.palette.warning.light;
    if (status === 'edi') return theme.palette.gray.main;
    return 'none';
}

function CourseCard({ course, link }: props) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                transition: 'scale ease-in-out 200ms',
                position: 'relative',
                maxHeight: {
                    xs: '75hmax',
                    sm: '60hmax',
                    md: '55dvh',
                    lg: '80vh',
                },
                display: 'flex',
                height: '100%',
                width: '100%',
                flexDirection: 'column',
                borderRadius: theme.spacing(2),
                bgcolor: 'white',
                borderColor: getCourseBorderColor(course.status, theme),
                borderWidth: course.status === 'app' ? 0 : '2px',
                aspectRatio: {
                    xs: '9/10',
                    md: '9/10',
                },
                pb: 2,
                ':hover': {
                    transitionDelay: '100ms',
                    scale: '1.05',
                },
            }}
        >
            <Link
                to={link}
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                }}
            ></Link>
            <Box
                sx={{
                    borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
                    // borderRadius: '0',
                    flex: '0 0 30%',
                    height: '100%',
                    // overflowX: 'hidden',
                }}
            >
                <Image
                    src={course.thumbnail}
                    fit={'cover'}
                    shift={null}
                    shiftDuration={0}
                    distance={0}
                    duration={0}
                    height={'100%'}
                    errorIcon={false}
                    style={{
                        borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
                        aspectRatio: '16/9',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </Box>
            <Box
                sx={{
                    flex: '1 1 10%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    px: 3,
                }}
            >
                <Typography color={'gray.main'}>{course.title}</Typography>
                <Divider
                    sx={{
                        mx: -3,
                    }}
                />

                <Box
                    display="flex"
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{
                        flex: '0 1 5%',
                    }}
                >
                    <Box>
                        <Typography
                            color={'black'}
                            variant={'body2'}
                        >
                            {course.title}
                        </Typography>
                        <Typography color={'gray.main'}>
                            {`${course.owner.first_name} ${course.owner.last_name}`}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                    >
                        <Typography
                            color={'gray.main'}
                            variant={'subtitle2'}
                        >
                            {course.average_rating.toFixed(1) === '0.0'
                                ? '-'
                                : course.average_rating.toFixed(1)}
                        </Typography>
                        <Rating
                            max={1}
                            readOnly
                            value={1}
                            emptyIcon={
                                <Star
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                />
                            }
                        />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    overflow: 'hidden',
                    flex: '0 1 15%',
                    px: 3,
                }}
            >
                <Typography
                    color={'gray.main'}
                    variant={'body2'}
                    sx={{
                        textOverflow: 'ellipsis',
                    }}
                >
                    {course.description}
                </Typography>
            </Box>
            <Box
                justifySelf={'flex-end'}
                display="flex"
                flex={'1 0 10%'}
                justifyContent={'space-between'}
                sx={{
                    alignItems: 'flex-end',
                    px: 3,
                }}
            >
                <Typography
                    color={'black'}
                    variant={'h6'}
                >
                    {course.price} DA
                </Typography>
                <Link to={link}>
                    <Typography
                        variant={'subtitle2'}
                        fontWeight={400}
                        color={'#393939'}
                        style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            borderBottom: '2px solid #393939',
                        }}
                    >
                        المزيد
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}

export default CourseCard;
