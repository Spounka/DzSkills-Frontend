import { Card, Stack } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';
import FullWidthTab from '../../components/ui/FullWidthTab';
import { verifyOrRefreshToken } from '../edit-profile/api/getUser';
import Login from './components/login';
import NewAccount from './components/new-account';

interface props {
    startPanel?: 0 | 1;
}

function Autenticate({ startPanel }: props) {
    const tabs = ['حساب جديد', 'تسجيل الدخول'];

    const panels = [<NewAccount />, <Login />];
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const navigate = useNavigate();
    const checkUser = useQuery({
        queryKey: ['login'],
        queryFn: () => verifyOrRefreshToken(access, refresh),
        onSuccess: () => {
            const url = new URL(window.location.href);
            const searchParams = url.searchParams;
            if (searchParams.get('next') !== null)
                navigate(searchParams.get('next') ?? '');
            navigate('/profile/');
        },
        onError: error => console.error(error),
        enabled: !!access && !!refresh,
    });

    return (
        <Stack
            gap={8}
            bgcolor={'gray.secondary'}
            minHeight={'100dvh'}
            pb={'100px'}
        >
            <AuthenticationTopBar />
            <Card
                elevation={0}
                sx={{
                    height: '100%',
                    flex: '1 0 90%',
                    mx: {
                        xs: 3,
                        sm: 16,
                        lg: 48,
                        xl: '30%',
                    },
                }}
            >
                <FullWidthTab
                    tabLabels={tabs}
                    panels={panels}
                    startState={startPanel}
                />
            </Card>
        </Stack>
    );
}

export default Autenticate;
