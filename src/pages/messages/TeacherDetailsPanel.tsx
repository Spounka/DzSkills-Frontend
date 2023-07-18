import { Avatar, Card, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ProfileSocialMedia } from '../../components/ProfileSocialMedia';
import { MainButton } from '../../components/ui/MainButton';
import { User } from '../../types/user';

export function TeacherDetailsPanel({ teacher }: { teacher: User }) {
    const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                flexBasis: '40%',
                bgcolor: 'white',
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                py: { xs: theme.spacing(1), md: theme.spacing(2), lg: theme.spacing(3) },
            }}
        >
            <Stack
                gap={4}
                alignItems={'center'}
                px={4}
                textAlign={'center'}
            >
                <Avatar
                    src={teacher.profile_image}
                    sx={{
                        width: {
                            sm: '35%',
                            xl: '40%',
                        },
                        height: 'auto',
                        aspectRatio: '1',
                    }}
                />
                <UserFullNameAndSpeciality user={teacher} />
                <ProfileSocialMedia />
                <Typography
                    variant={'caption'}
                    color={'gray.main'}
                >
                    {teacher.description ?? ''}
                </Typography>
                <Stack gap={2}>
                    <MainButton
                        text={'إغلاق المحادثة'}
                        color={theme.palette.secondary.lighter}
                    />
                    <MainButton
                        text={'إبلاغ عن مشكلة'}
                        color={theme.palette.gray.main}
                        {...{
                            variant: 'text',
                            sx: {
                                bgcolor: 'none',
                                color: theme.palette.gray.main,
                                '&:hover': {
                                    color: theme.palette.warning.main,
                                    borderColor: theme.palette.warning.main,
                                    border: `${theme.palette.warning.main} 2px solid`,
                                },
                            },
                        }}
                    />
                </Stack>
            </Stack>
        </Card>
    );
}

export function UserFullNameAndSpeciality({ user }: { user?: User }) {
    if (!user) return <></>;
    return (
        <Stack gap={1}>
            <Typography variant={'h6'}>
                {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography
                variant={'caption'}
                color={'gray.main'}
            >
                {user.speciality || 'speciality'}
            </Typography>
        </Stack>
    );
}
