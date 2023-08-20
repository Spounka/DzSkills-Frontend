import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { Course } from '../../types/course';
import Image from 'mui-image';

interface props {
    data: Course;
    index: number;
    currentCourseIndex: number;
}

export function BestCourseCard({ data, index, currentCourseIndex }: props) {
    const theme = useTheme();
    function getTransformValue() {
        return `translate(${110 * (index - currentCourseIndex)}%, 0)`;
    }
    if (!data) return <></>;
    return (
        <Card
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column-reverse',
                    md: 'row',
                },
                width: '100%',
                height: '100%',
                flexShrink: 0,
                borderRadius: 0,
                gap: 0,
                zIndex: index,
                transition: 'all ease-in 200ms',
                position: 'absolute',
                transform: getTransformValue(),
            }}
        >
            <Box
                sx={{
                    flex: {
                        xs: '1 1 40%',
                        md: '1 1 50%',
                    },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    py: 4,
                    px: 4,
                    gap: 2,
                }}
            >
                <Typography color={'gray.main'}>{data.title}</Typography>
                <Divider
                    sx={{
                        mx: -4,
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        gap: 2,
                        py: 2,
                        px: 0,
                    }}
                >
                    <Typography
                        color={'#707070'}
                        variant={'h3'}
                        fontWeight={600}
                    >
                        {data.title}
                    </Typography>
                    <Typography
                        color={'gray.main'}
                        variant={'subtitle2'}
                        fontWeight={400}
                    >
                        {`${data.owner.first_name} ${data.owner.last_name}`}
                    </Typography>
                    <Typography
                        color={'#707070'}
                        maxWidth={'70%'}
                        textOverflow={'ellipsis'}
                        variant={'caption'}
                        fontWeight={300}
                        flexGrow={1}
                    >
                        {data.description}
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography
                            color={'#707070'}
                            variant={'h4'}
                            fontWeight={600}
                        >
                            {`DA ${data.price}`}
                        </Typography>
                        <NavLink
                            to={'/courses/' + data.id}
                            style={{
                                textAlign: 'center',
                                verticalAlign: 'center',
                                paddingLeft: theme.spacing(5),
                                paddingRight: theme.spacing(5),
                            }}
                        >
                            <Typography
                                variant={'subtitle1'}
                                fontWeight={600}
                                color={'#393939'}
                                style={{
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: '3px solid #393939',
                                }}
                            >
                                المزيد
                            </Typography>
                        </NavLink>
                    </Box>
                </Box>
            </Box>
            <Box
                flex={{
                    xs: '1 1 60%',
                    md: '1 1 50%',
                }}
            >
                <Image
                    fit="contain"
                    src={data.thumbnail}
                />
            </Box>
        </Card>
    );
}
