import { Avatar, Card, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from 'react-query';
import { ProfileSocialMedia } from '../../components/ProfileSocialMedia';
import { MainButton } from '../../components/ui/MainButton';
import { Course } from '../../types/course';
import { User } from '../../types/user';

export function TeacherDetailsPanel({
    course,
}: {
    course: UseQueryResult<Course, unknown>;
}) {
    const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                flexBasis: '40%',
                bgcolor: 'white',
                width: '100%',
                py: theme.spacing(6),
            }}
        >
            <Stack
                gap={4}
                alignItems={'center'}
                px={4}
                textAlign={'center'}
            >
                <Avatar
                    src={course.data?.owner.profile_image}
                    sx={{
                        width: '40%',
                        height: 'auto',
                        aspectRatio: '1',
                    }}
                />
                <UserFullNameAndSpeciality user={course.data?.owner} />
                <ProfileSocialMedia />
                <Typography
                    variant={'caption'}
                    color={'gray.main'}
                >
                    {course.data?.owner.description ||
                        `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Aliquam magni blanditiis quidem saepe aperiam consequatur tempora mollitia corrupti,
                                        atque natus corporis, sit ea perspiciatis beatae alias nisi, inventore ab nemo.`}
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

function UserFullNameAndSpeciality({ user }: { user?: User }) {
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
