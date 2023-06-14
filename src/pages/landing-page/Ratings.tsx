import { Avatar, Rating } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../types/user';
import { getAllUsers } from '../admin-panel/user-management/api/getUsers';

export function StudentRatings() {
    const theme = useTheme();
    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    });

    if (query.isLoading) return <>Loading users...</>;
    if (query.isError) return <>Error in users...</>;

    return (
        <>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                my={theme.spacing(25)}
                pb={theme.spacing(12)}
                gap={16}
                px={16}
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
                        آراء الطلبة و المشتركين في موقعنا هو افضل ما نقدمه لإثبات نجاحنا
                        في تقديم الغاية من الموقع
                    </Typography>
                </Box>
                <Box
                    display="grid"
                    gridTemplateColumns={'repeat(3, minmax(0, 1fr))'}
                    gap={8}
                    width={'100%'}
                >
                    {query.data?.slice(6, 9).map((user: User) => {
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
                                        value={5}
                                    />
                                    <Avatar
                                        src={user.profile_image}
                                        sx={{
                                            position: 'absolute',
                                            left: 0,
                                            top: '-400%',
                                            width: '15vmin',
                                            height: 'auto',
                                            maxWidth: '15vmin',
                                            maxHeight: '15vmin',
                                            aspectRatio: '1',
                                        }}
                                    />
                                </Box>
                                <Typography>
                                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
                                    لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك
                                    أن تولد مثل هذا النص أو العديد من النصوص
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        p: 2,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Typography
                                        fontWeight={600}
                                        variant="h6"
                                    >
                                        {`${user.first_name} ${user.last_name}`}
                                    </Typography>
                                    <Typography
                                        fontWeight={300}
                                        variant="overline"
                                    >
                                        {user.speciality}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </>
    );
}
