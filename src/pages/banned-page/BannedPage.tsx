import { Container, Stack, Typography } from '@mui/material';
import useLogin from '../authenticate/hooks/useLogin';
import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';
import {StyledCard} from '../../components/StyledCard';
import {useQuery} from "react-query";
import {getUser} from "../edit-profile/api/getUser";

export function BannedPage() {
    const [user] = useLogin();
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
                            {user.data?.last_ban.toString()}
                        </Typography>
                    </Stack>
                </StyledCard>
            </Container>
        </Stack>
    );
}

export function useIsBanned() {
    const token = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
    });
    return {
        banned: userQuery.data?.is_banned,
        BannedPageComponent: BannedPage,
        ban_duration: userQuery.data?.last_ban,
    };
}
