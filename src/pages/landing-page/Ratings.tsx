import { Avatar, Rating } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../types/user';
import { getAllUsers } from '../admin-panel/user-management/api/getUsers';
import axiosInstance from '../../globals/axiosInstance';
import { AdminRating } from '../../types/AdminConfig';

export function StudentRatings() {
    const theme = useTheme();
    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    });

    const ratingsQuery = useQuery({
        queryFn: async () => {
            const { data } = await axiosInstance.get('/configs/ratings/');
            return data as AdminRating[];
        },
        queryKey: ['ratings'],
    });

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            my={theme.spacing(25)}
            pb={theme.spacing(12)}
            gap={16}
            px={{
                xs: 2,
                lg: 16,
            }}
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                gap={2}
            >
                <Typography
                    variant={'h4'}
                    fontWeight={600}
                >
                    تقييمات
                </Typography>

                <Typography
                    variant="subtitle2"
                    color={'gray.main'}
                >
                    آراء الطلبة و المشتركين في موقعنا هو افضل ما نقدمه لإثبات نجاحنا في
                    تقديم الغاية من الموقع
                </Typography>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, minmax(0, 1fr))',
                    sm: 'repeat(2, minmax(0, 1fr))',
                    md: 'repeat(3, minmax(0, 1fr))',
                }}
                gap={8}
                width={'100%'}
            >
                {ratingsQuery.data?.slice(0, 3).map((rating: AdminRating) => {
                    return (
                        <Box
                            key={uuidv4()}
                            sx={{
                                bgcolor: 'white',
                                p: 4,
                                // pl: 0,
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 4,
                                    position: 'relative',
                                }}
                            >
                                <Rating
                                    readOnly={true}
                                    value={rating.rating}
                                />
                                <Avatar
                                    src={rating.image}
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
                                        top: {
                                            xs: '-300%',
                                            xl: '-400%',
                                        },
                                        width: '100%',
                                        height: 'auto',
                                        maxWidth: {
                                            xs: '10vmax',
                                            lg: '5vmax',
                                        },
                                        maxHeight: {
                                            xs: '10vmax',
                                            lg: '5vmax',
                                        },
                                        aspectRatio: '1',
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    overflowX: 'hidden',
                                    wordWrap: 'break-word',
                                }}
                            >
                                <Typography>{rating.description}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: 2,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                    overflowX: 'hidden',
                                }}
                            >
                                <Typography
                                    fontWeight={600}
                                    variant="h6"
                                >
                                    {rating.full_name}
                                </Typography>
                                {/* <Typography
                                    fontWeight={300}
                                    variant="overline"
                                >
                                    {user.speciality}
                                </Typography> */}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
