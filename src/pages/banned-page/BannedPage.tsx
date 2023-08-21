import { Container, Stack, Typography } from '@mui/material';
import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';
import { StyledCard } from '../../components/StyledCard';
import { useGetUser } from '../../globals/hooks';
import useReduxData from '../../stores/reduxUser';

export function BannedPage() {
    const user = useReduxData().user.user;
    return (
        <Stack
            gap={2}
            bgcolor={'gray.secondary'}
            height={'100dvh'}
        >
            <AuthenticationTopBar />
            <Container>
                <StyledCard>
                    <Stack
                        alignItems={'center'}
                        gap={4}
                    >
                        <Typography variant="h6">هذا الحساب محظور حتى</Typography>
                        <Typography
                            variant="h6"
                            color={'error.main'}
                        >
                            {user?.last_ban.toString()}
                        </Typography>
                    </Stack>
                </StyledCard>
            </Container>
        </Stack>
    );
}

export function useIsBanned() {
    const user = useGetUser({});
    return {
        banned: user?.is_banned,
        BannedPageComponent: BannedPage,
        ban_duration: user?.last_ban,
    };
}
