import { Avatar, Rating, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { ReactComponent as GpsImage } from '../../assets/svg/place gray.svg';
import { ProfileSocialMedia } from '../../components/ProfileSocialMedia';
import useReduxData from '../../stores/reduxUser';
import { CoursePreview } from './CoursePreview';

export function ProfileContent() {
    const theme = useTheme();
    const user = useReduxData().user;
    return (
        <Card
            elevation={0}
            sx={{
                gridColumnStart: 4,
                gridColumnEnd: 11,
                maxWidth: '100%',
                minHeight: '70vh',
                py: theme.spacing(8),
                px: theme.spacing(12),
                borderRadius: theme.spacing(2),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(4),
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: theme.spacing(8),
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1',
                        justifyContent: 'center',
                        gap: theme.spacing(1),
                        height: '100%',
                    }}
                >
                    <Typography variant={'h5'}>
                        {`${user.user.first_name} ${user.user.last_name}`}
                    </Typography>
                    <Typography
                        variant={'subtitle2'}
                        color={'gray.light'}
                    >
                        {`${user.user.speciality || 'speciality'}`}
                    </Typography>
                    <Typography
                        variant={'body2'}
                        color={'gray.light'}
                        sx={{
                            display: 'flex',
                            gap: theme.spacing(),
                        }}
                    >
                        <GpsImage style={{ alignSelf: 'center' }} />
                        {`${user.user.nationality || ' الجنسية'}`}
                    </Typography>

                    <Box
                        display={'flex'}
                        mt={2}
                    >
                        <Box
                            flexGrow={'1'}
                            display={'flex'}
                            flexDirection={'column'}
                        >
                            <Typography
                                variant={'subtitle2'}
                                color={'gray.dark'}
                            >
                                اجمالي الطلبة
                            </Typography>
                            <Typography
                                variant={'subtitle2'}
                                color={'secondary.dark'}
                            >
                                166
                            </Typography>
                        </Box>

                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'flex-end'}
                            gap={0.5}
                        >
                            <Typography
                                px={0.5}
                                component="legend"
                                variant={'body2'}
                            >
                                {user.user.average_rating.toFixed(1)}
                            </Typography>
                            <Rating
                                size={'small'}
                                name="read-only"
                                value={user.user.average_rating}
                                dir={'ltr'}
                                readOnly
                                sx={{
                                    padding: 0,
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: 'auto',
                        gap: theme.spacing(6),
                    }}
                    flexGrow={'1'}
                >
                    <Avatar
                        src={user.user.profile_image}
                        sx={{
                            width: theme.spacing(26),
                            height: theme.spacing(26),
                        }}
                    />

                    <ProfileSocialMedia />
                </Box>
            </Box>

            <Typography
                variant="body1"
                fontWeight={600}
                color={'secondary.dark'}
            >
                معلومات شخصية
            </Typography>
            <Typography
                variant="caption"
                fontWeight={400}
                color={'gray.dark'}
            >
                {user.user.description}
            </Typography>

            <Typography
                variant="body1"
                fontWeight={600}
                color={'secondary.dark'}
            >
                كورساتي
            </Typography>

            <Box
                display={'flex'}
                gap={2}
                flexWrap={'wrap'}
                sx={{
                    flex: '1',
                    width: '100%',
                }}
            >
                <CoursePreview />
                <CoursePreview />
                <CoursePreview />
                <CoursePreview />
                <CoursePreview />
                <CoursePreview />
            </Box>
        </Card>
    );
}
