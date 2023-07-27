import { Avatar, Card, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileSocialMedia } from '../../components/ProfileSocialMedia';
import { MainButton } from '../../components/ui/MainButton';
import { getCourse } from '../course/api/getCourse';
import { UserFullNameAndSpeciality } from './UserFullNameAndSpeciality';

export function TeacherDetailsPanel() {
    const params = useParams();
    let id = 0;
    if (params.id && !Number.isNaN(id)) {
        id = parseInt(params.id);
    }

    const theme = useTheme();
    const navigate = useNavigate();

    const courseQuery = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
        enabled: id > 0,
    });
    const teacher = useMemo(() => {
        return { ...courseQuery.data?.owner };
    }, [courseQuery.data?.owner]);

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
                    src={teacher?.profile_image}
                    sx={{
                        width: {
                            sm: '35%',
                            xl: '40%',
                        },
                        height: 'auto',
                        aspectRatio: '1',
                    }}
                />
                <UserFullNameAndSpeciality
                    first_name={teacher.first_name ?? ''}
                    last_name={teacher.last_name ?? ''}
                    speciality={teacher.speciality ?? 'speciality'}
                />
                <ProfileSocialMedia user={teacher} />
                <Typography
                    variant={'caption'}
                    color={'gray.main'}
                >
                    {teacher?.description ?? ''}
                </Typography>
                <Stack gap={2}>
                    <MainButton
                        text={'إغلاق المحادثة'}
                        color={theme.palette.secondary.lighter}
                        {...{
                            onClick: () => navigate('../watch/'),
                        }}
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
                            onClick: () => navigate('/support/contact/'),
                        }}
                    />
                </Stack>
            </Stack>
        </Card>
    );
}
