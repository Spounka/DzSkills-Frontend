import { Star } from '@mui/icons-material';
import { Divider, Rating, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'mui-image';
import { Link } from 'react-router-dom';
import { Course } from '../../types/course';

interface props {
    course: Course;
    link: string;
}

function CourseCard({ course, link }: props) {
    const theme = useTheme();
    return (
        <Link to={link}>
            <Box
                sx={{
                    transition: 'scale ease-in-out 200ms',
                    maxHeight: {
                        sm: '80hmax',
                        md: '55dvh',
                        lg: '80vh',
                        // xl: '50vh',
                    },
                    display: 'flex',
                    height: '100%',
                    // height: {
                    //     sm: 'auto',
                    //     // lg: '100%',
                    // },
                    width: '100%',
                    flexDirection: 'column',
                    borderRadius: theme.spacing(2),
                    bgcolor: 'white',
                    borderColor:
                        course.status === 'rej'
                            ? theme.palette.error.dark
                            : course.status === 'pend'
                            ? theme.palette.warning.light
                            : 'none',
                    borderWidth:
                        course.status === 'rej' || course.status === 'pend' ? '2px' : 0,
                    aspectRatio: {
                        xs: '9/16',
                        md: '9/10',
                    },
                    pb: 2,
                    ':hover': {
                        transitionDelay: '100ms',
                        scale: '1.05',
                    },
                }}
            >
                <Box
                    sx={{
                        borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 50% 50%`,
                        flex: '0 0 30%',
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
                        style={{
                            borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
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
                        flex: '0 1 20%',
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
        </Link>
    );
}

export default CourseCard;
