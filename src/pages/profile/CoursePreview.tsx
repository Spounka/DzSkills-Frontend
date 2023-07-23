import { CardContent, CardMedia, Slider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { Course } from '../../types/course';

interface props {
    course: Course;
}
export function CoursePreview({ course }: props) {
    const theme = useTheme();
    let value = 12;
    return (
        <Card
            elevation={1}
            onClick={() => {
                value += 12;
            }}
            sx={{
                transition: 'all ease 300ms',
                position: 'relative',
                height: 'auto',
                width: 'auto',
                maxWidth: `calc(50% - ${theme.spacing(2)})`,
                aspectRatio: '16/10',
                borderRadius: 0,
                '&:hover': {
                    '.Content': {
                        transition: 'all ease 300ms',
                        top: '200%',
                        zIndex: 1,
                    },
                },
            }}
        >
            <CardMedia
                component={'img'}
                image={course.thumbnail ?? ''}
                sx={{ aspectRatio: '16/10' }}
            />
            <CardContent
                className="Content"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(),
                }}
            >
                <Box>
                    <Typography
                        color={'gray.dark'}
                        variant={'body2'}
                        fontWeight={600}
                    >
                        {course.title}
                    </Typography>
                    <Typography
                        color={'gray.light'}
                        variant={'subtitle2'}
                        fontWeight={400}
                        fontSize={10}
                    >
                        {`${course.owner.first_name} ${course.owner.last_name}`}
                    </Typography>
                </Box>
                <Box
                    gap={0}
                    display={'flex'}
                    flexDirection={'column'}
                    sx={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                    }}
                >
                    <Typography
                        sx={{ px: 2 }}
                        color={'gray.light'}
                        variant={'subtitle2'}
                        fontWeight={400}
                        fontSize={10}
                    >
                        5%
                    </Typography>
                    <Slider
                        defaultValue={20}
                        disabled
                        value={value}
                        sx={{
                            width: '100%',
                            margin: 0,
                            padding: '0 !important',
                            borderRadius: 0,
                            // scale: '-1 1',
                            '&.Mui-disabled': {
                                color: `${theme.palette.primary.main} !important`,
                            },
                            '.MuiSlider-thumb': {
                                display: 'none',
                            },
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}
