import { Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
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
        onSuccess: () => navigate('/profile/'),
        onError: error => console.error(error),
        enabled: !!access && !!refresh,
    });

    return (
        <Grid
            container
            direction="column"
            spacing={5}
            id={'main grid container'}
            columns={14}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100%',
            }}
        >
            <Grid
                container
                item
                xs={14}
            >
                <AuthenticationTopBar />
            </Grid>

            <Grid
                item
                xs={14}
                container
                sx={{
                    backgroundColor: 'gray.secondary',
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        width: '100%',
                        marginBottom: '2rem',
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            gridColumnStart: 5,
                            gridColumnEnd: 9,
                        }}
                    >
                        <FullWidthTab
                            tabLabels={tabs}
                            panels={panels}
                            startState={startPanel}
                        />
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Autenticate;
