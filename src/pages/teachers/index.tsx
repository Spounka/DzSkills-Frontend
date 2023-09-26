import { Avatar, Box, Container, Stack, Typography, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { ProfileSocialMedia } from '../../components/ProfileSocialMedia';
import { StyledCard } from '../../components/StyledCard';
import { User } from '../../types/user';
import { getAllUsers } from '../admin-panel/user-management/api/getUsers';

function TeachersPage() {
    const theme = useTheme();
    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    });
    if (usersQuery.isLoading || !usersQuery.data)
        return <Typography>Hello there</Typography>;
    return (
        <Stack
            height={'100dvh'}
            bgcolor={theme.palette.gray.secondary}
        >
            <Container sx={{ height: '100%', py: 2 }}>
                <StyledCard
                    sx={{
                        height: '100%',
                        gap: 4,
                    }}
                >
                    <Stack
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Typography variant="h3">المدربون</Typography>
                    </Stack>
                    <Stack
                        direction={'row'}
                        gap={4}
                        flexWrap={'wrap'}
                        sx={{
                            overflowY: 'auto',
                            py: 4,
                        }}
                    >
                        {usersQuery.data
                            ?.filter(
                                u =>
                                    u.groups.some(g => g.name === 'TeacherGroup') &&
                                    u.is_favorite
                            )
                            .map((u, index) => {
                                return (
                                    <TeacherCard
                                        key={u.pk}
                                        user={u}
                                    />
                                );
                            })}
                    </Stack>
                </StyledCard>
            </Container>
        </Stack>
    );
}

export default TeachersPage;

interface TeacherCardProps {
    user: User;
}
function TeacherCard({ user }: TeacherCardProps) {
    return (
        <StyledCard
            key={user.pk}
            sx={{
                display: 'flex',
                flexBasis: {
                    xs: '100%',
                    md: '50%',
                    lg: '30%',
                },
                alignItems: 'center',
                gap: 3,
            }}
        >
            <Avatar
                src={user.profile_image}
                sx={{
                    width: 80,
                    height: 'auto',
                    aspectRatio: '1/1',
                }}
            />
            <Stack
                gap={0}
                alignItems={'center'}
            >
                <Typography>
                    {user.first_name} {user.last_name}
                </Typography>
                <Typography
                    variant={'body2'}
                    color={'gray.main'}
                >
                    {user.username}
                </Typography>
            </Stack>
            <Box
                maxHeight={'2lh'}
                py={1}
                textOverflow={'ellipsis'}
                overflow={'hidden'}
            >
                <Typography
                    color={'gray.dark'}
                    variant="body2"
                    textAlign={'center'}
                    maxWidth={'25ch'}
                    textOverflow={'ellipsis'}
                >
                    {user.description}
                </Typography>
            </Box>
            <ProfileSocialMedia user={user} />
        </StyledCard>
    );
}
