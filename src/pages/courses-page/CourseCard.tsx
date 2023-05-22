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
        <Box
            sx={{
                p: theme.spacing(),
                gap: 2,
                borderRadius: theme.spacing(2),
                height: '100%',
            }}
        >
            <Box
                sx={{
                    transition: 'all ease-in-out 200ms',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexShrink: '1',
                    flexGrow: '0',
                    flexDirection: 'column',
                    alignContent: 'space-evenly',
                    gap: 2,
                    borderRadius: theme.spacing(2),
                    bgcolor: 'white',
                    pb: 2,
                    ':hover': {
                        transitionDelay: '150ms',
                        scale: '1.05',
                    },
                }}
            >
                <Box
                    sx={{
                        borderRadius: `${theme.spacing(2)} ${theme.spacing(
                            2
                        )} 50% 50%`,
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
                            borderRadius: `${theme.spacing(2)} ${theme.spacing(
                                2
                            )} 0 0`,
                            aspectRatio: '16/9',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        flexShrink: '1',
                        flexGrow: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '100%',
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
                                {2.5}
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

                    <Box
                        flexGrow={'1'}
                        sx={{
                            overflow: 'hidden',
                            maxHeight: '30%',
                        }}
                    >
                        <Typography
                            color={'gray.main'}
                            variant={'body2'}
                            sx={{
                                maxHeight: '20%',
                                textOverflow: 'ellipsis',
                                maxWidth: '80%',
                            }}
                        >
                            {course.description}
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexGrow={'0'}
                        justifyContent={'space-between'}
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
            </Box>
        </Box>
    );
}

export default CourseCard;
